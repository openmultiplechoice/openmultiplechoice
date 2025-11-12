<script>
    import initSqlJs from "sql.js"
    import sqliteUrl from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"

    let { deckId } = $props();

    let SQL;

    const schemaVersion = 1;
    const FIELD_WHITELIST = {
        deck: ['id', 'name', 'description', 'exam_at'],
        case: ['id', 'text'],
        question: ['id', 'text', 'hint', 'comment', 'type', 'correct_answer_id', 'is_invalid', 'needs_review', 'case_id'],
        image: ['id', 'question_id'],
        answer: ['id', 'question_id', 'text', 'hint']
    };

    async function initSQL() {
        if (!SQL) {
            SQL = await initSqlJs({
                locateFile: () => sqliteUrl,
            });
        }
        return SQL;
    }

    async function fetchDeckData(base64Images = false) {
        try {
            const deckResponse = await fetch(`/api/decks/${deckId}`);
            if (!deckResponse.ok) throw new Error();

            const deck = await deckResponse.json();
            const questions = deck.questions;

            // Retrieve associated images for each question and convert to base64 if needed
            const questionsWithImages = await Promise.all(
                questions.map(async (question) => {
                    if (question.images && question.images.length > 0) {
                        const imagesWithData = await Promise.all(
                            question.images.map(async (image) => {
                                // Fetch image
                                const response = await fetch('/' + image.path);
                                if (!response.ok) throw new Error();
                                const blob = await response.blob();

                                let base64 = null;
                                if (base64Images) {
                                    base64 = await new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = () => resolve(reader.result);
                                        reader.readAsDataURL(blob);
                                    });
                                    return {...image, base64}
                                }
                                return {...image, blob}
                            })
                        );
                        return { ...question, images: imagesWithData };
                    }
                    return question;
                })
            )

            return { ...deck, questions: questionsWithImages, schema_version: schemaVersion };
        } catch (error) {
            console.error('Failed to fetch deck data', error);
            return null;
        }
    }

    async function exportDeck(format) {
        try {
            const rawData = await fetchDeckData(format === 'json');
            if (!rawData) return;

            const data = sanitizeDeckData(rawData, true);

            let content, type, extension;

            if (format === 'json') {
                content = JSON.stringify(data, null, 2);
                type = 'application/json';
                extension = 'json';
            } else if (format === 'sqlite') {
                const SQL = await initSQL();
                const db = new SQL.Database();

                // Prepare database schema
                db.run(`
                    CREATE TABLE decks (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        description TEXT,
                        exam_at DATETIME
                    );
                    CREATE TABLE cases (
                        id INTEGER PRIMARY KEY,
                        text TEXT
                    );
                    CREATE TABLE questions (
                        id INTEGER PRIMARY KEY,
                        deck_id INTEGER NOT NULL,
                        text TEXT,
                        hint TEXT,
                        comment TEXT,
                        type TEXT NOT NULL,
                        correct_answer_id INTEGER,
                        is_invalid BOOLEAN DEFAULT 0,
                        needs_review BOOLEAN DEFAULT 0,
                        case_id INTEGER,
                        FOREIGN KEY(deck_id) REFERENCES decks(id),
                        FOREIGN KEY(correct_answer_id) REFERENCES answers(id),
                        FOREIGN KEY(case_id) REFERENCES cases(id)
                    );
                    CREATE TABLE images (
                        id INTEGER PRIMARY KEY,
                        question_id INTEGER NOT NULL,
                        blob BLOB NOT NULL,
                        FOREIGN KEY(question_id) REFERENCES questions(id)
                    );
                    CREATE TABLE answers (
                        id INTEGER PRIMARY KEY,
                        question_id INTEGER NOT NULL,
                        text TEXT,
                        hint TEXT,
                        FOREIGN KEY (question_id) REFERENCES questions(id)
                    );
                    CREATE TABLE omcarchive (
                        schema_version INTEGER NOT NULL
                    )
                `);

                // Insert deck data
                const deckStmt = db.prepare(
                    'INSERT INTO decks VALUES (?, ?, ?, ?)'
                );
                deckStmt.run([data.id, data.name, data.description, data.exam_at]);
                deckStmt.free();

                // Insert case data
                const caseStmt = db.prepare(
                    'INSERT INTO cases VALUES (?, ?)'
                );
                for (const c of data.cases) {
                    caseStmt.run([
                        c.id,
                        c.text
                    ]);
                }
                caseStmt.free();

                // Insert question data
                const questionStmt = db.prepare(
                    'INSERT INTO questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                );
                for (const q of data.questions) {
                    questionStmt.run([
                        q.id,
                        data.id,
                        q.text,
                        q.hint,
                        q.comment,
                        q.type,
                        q.correct_answer_id,
                        q.is_invalid,
                        q.needs_review,
                        q.case_id
                    ]);

                    // Insert image data
                    const imageStmt = db.prepare(
                        'INSERT INTO images VALUES (?, ?, ?)'
                    );
                    if (q.images && q.images.length > 0) {
                        for (const img of q.images) {
                            // Convert blob to binary format for SQLite
                            const arrayBuffer = await img.blob.arrayBuffer();
                            const uint8Array = new Uint8Array(arrayBuffer);

                            imageStmt.run([
                                img.id,
                                q.id,
                                uint8Array
                            ]);
                        }
                    }
                    imageStmt.free();

                    // Insert answer data
                    const answerStmt = db.prepare(
                        'INSERT INTO answers VALUES (?, ?, ?, ?)'
                    );
                    if (q.answers && q.answers.length > 0) {
                        for (const a of q.answers) {
                            answerStmt.run([
                                a.id,
                                q.id,
                                a.text,
                                a.hint
                            ]);
                        }
                    }
                    answerStmt.free();
                }
                questionStmt.free();

                db.run('INSERT INTO omcarchive VALUES (?)', [schemaVersion]);

                content = db.export();
                type = 'application/x-sqlite3';
                extension = 'sqlite';
            }

            const blob = new Blob([content], { type });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${data.name}.omcarchive.${extension}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Failed to export deck', error);
        }
    }

    function sanitizeObject(obj, whitelist) {
        const sanitized = {};
        for (const field of whitelist) {
            if (field in obj) {
                sanitized[field] = obj[field];
            }
        }
        return sanitized;
    }

    function sanitizeDeckData(data, includeImageData = true) {
        const sanitized = {
            ...sanitizeObject(data, FIELD_WHITELIST.deck),
            omcarchive: {"schemaVersion": schemaVersion},
            cases: data.cases?.map(c => sanitizeObject(c, FIELD_WHITELIST.case)) || [],
            questions: data.questions?.map(q => ({
                ...sanitizeObject(q, FIELD_WHITELIST.question),
                images: q.images?.map(img => {
                    const sanitizedImg = sanitizeObject(img, FIELD_WHITELIST.image);
                    if (includeImageData) {
                        if (img.base64) sanitizedImg.base64 = img.base64;
                        if (img.blob) sanitizedImg.blob = img.blob;
                    }
                    return sanitizedImg;
                }) || [],
                answers: q.answers?.map(a => sanitizeObject(a, FIELD_WHITELIST.answer)) || []
            })) || []
        };
        return sanitized;
    }
</script>

<li><button class="dropdown-item" onclick={() => exportDeck('json')}>JSON Archive</button></li>
<li><button class="dropdown-item" onclick={() => exportDeck('sqlite')}>SQLite Archive</button></li>
