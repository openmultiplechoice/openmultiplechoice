<script>
    import initSqlJs from "sql.js"
    import sqliteUrl from "../../node_modules/sql.js/dist/sql-wasm.wasm?url"
    import { round } from "lodash";

    let SQL;
    let file = $state(null);
    let fileType = $state(null);
    let importStatus = $state(null);
    let importInProgress = $state(false);
    let importedItems = $state(0);
    let totalItems = $state(0);
    let importProgressPercentage = $derived(round((importedItems / totalItems) * 100));
    let fileName = $state('');
    let fileInputElement = $state(null);

    async function initSQL() {
        if (!SQL) {
            SQL = await initSqlJs({
                locateFile: () => sqliteUrl,
            });
        }
        return SQL;
    }

    // For large decks the import will invoke a lot of requests and eventually hit the rate limits or other server
    // errors. This function will retry the request with a backoff strategy and will respect the retry-after header
    // if available (set if the user hits the Laravel rate limit).
    async function retryAxios(requestFn, maxRetries = 4, initialDelay = 5000, backoffFactor = 2, retryStatusCodes = [429, 500, 502, 503, 504]) {
        let lastError;
        let currentDelay = initialDelay;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await requestFn();
            } catch (error) {
                lastError = error;

                // Only retry on specified status codes
                if (!error.response || !retryStatusCodes.includes(error.response.status)) {
                    throw error;
                }

                if (attempt === maxRetries) {
                    throw error;
                }

                // Get retry delay from response headers if available (for rate limiting)
                let retryDelay = currentDelay;
                if (error.response.headers['retry-after']) {
                    retryDelay = parseInt(error.response.headers['retry-after']) * 1000;
                }

                console.log(`Request failed with status ${error.response.status}. Retrying in ${retryDelay}ms...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));

                // Increase delay for next potential retry
                currentDelay = currentDelay * backoffFactor;
            }
        }
    }

    function handleFileChange(event) {
        file = event.target.files[0];
        if (!file) return;

        fileName = file.name;
        if (file.name.endsWith('.json')) {
            fileType = 'json';
        } else if (file.name.endsWith('.sqlite')) {
            fileType = 'sqlite';
        } else {
            fileType = null;
            importStatus = { type: 'error', message: 'Unsupported file format' };
        }
    }

    async function importDeck() {
        if (!file || !fileType) {
            importStatus = { type: 'error', message: 'Please select a valid file' };
            return;
        }

        importInProgress = true;
        importedItems = 0;
        totalItems = 0;
        importStatus = null;

        try {
            let deckData;

            if (fileType === 'json') {
                deckData = await parseJsonFile(file);
            } else {
                deckData = await parseSqliteFile(file);
            }

            totalItems = deckData.cases.length + deckData.questions.length;

            // Create the deck first
            const deckRequestData = {
                name: deckData.name,
                description: deckData.description,
                exam_at: deckData.exam_at || null,
                access: 'private'
            };

            const deckResponse = await retryAxios(() => axios.post('/api/decks', deckRequestData));
            const newDeck = deckResponse.data;

            const newCases = [];

            // Import associated cases
            if (deckData.cases && deckData.cases.length > 0) {
                for (const caseData of deckData.cases) {
                    const caseRequestData = {
                        name: caseData.name,
                        text: caseData.text,
                        deck_id: newDeck.id
                    };

                    const caseResponse = await retryAxios(() => axios.post(`/api/cases`, caseRequestData));
                    const newCase = caseResponse.data;
                    importedItems++;
                    newCase.export_id = caseData.id;

                    newCases.push(newCase);
                }
            }

            // Import questions
            if (deckData.questions && deckData.questions.length > 0) {
                for (const question of deckData.questions) {
                    // Map case_id if exists
                    let mappedCaseId = null;
                    if (question.case_id && newCases.length > 0) {
                        const matchingCase = newCases.find(c => c.export_id === question.case_id);
                        if (matchingCase) {
                            mappedCaseId = matchingCase.id;
                        }
                    }

                    // Create the question
                    const questionRequestData = {
                        text: question.text,
                        hint: question.hint || null,
                        comment: question.comment || null,
                        type: question.type,
                        correct_answer_id: null,
                        is_invalid: question.is_invalid,
                        needs_review: question.needs_review,
                        case_id: mappedCaseId || null,
                        answers: []
                    };

                    const questionResponse = await retryAxios(() =>
                        axios.post(`/api/decks/${newDeck.id}/questions`, questionRequestData));
                    const newQuestion = questionResponse.data;

                    // Import associated images
                    if (question.images && question.images.length > 0) {
                        for (const image of question.images) {
                            const formData = new FormData();
                            formData.append('image', image.blob);

                            await retryAxios(() => axios.post(
                                `/api/questions/${newQuestion.id}/images`,
                                formData,
                                { headers: { 'Content-Type': 'multipart/form-data' }}
                            ));
                        }
                    }

                    // Import associated answers
                    if (question.answers && question.answers.length > 0) {
                        for (const answer of question.answers) {
                            const answerRequestData = {
                                text: answer.text,
                                hint: answer.hint || null
                            };

                            const answerResponse = await retryAxios(() =>
                                axios.post(`/api/questions/${newQuestion.id}/answers`, answerRequestData));
                            const newAnswer = answerResponse.data;

                            if (answer.id === question.correct_answer_id) {
                                await retryAxios(() =>
                                    axios.put(`/api/questions/${newQuestion.id}`, { correct_answer_id: newAnswer.id }));
                            }
                        }
                    }
                    importedItems++;
                }
            }

            importStatus = {
                type: 'success',
                message: `Deck "${newDeck.name.length > 25 ? newDeck.name.slice(0, 25) + '...' : newDeck.name}" imported successfully!`,
                deckId: newDeck.id
            };

            // Reset form
            file = null;
            fileType = null;
            if (fileInputElement) {
                fileInputElement.value = '';
            }

        } catch (error) {
            importStatus = {
                type: 'error',
                message: error.response?.data?.message || error.message || 'Import failed'
            };
        } finally {
            importInProgress = false;
        }
    }

    async function parseJsonFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Process images and convert base64 to blobs
                    if (data.questions && data.questions.length > 0) {
                        for (const question of data.questions) {
                            if (question.images && question.images.length > 0) {
                                for (const image of question.images) {
                                    if (image.base64) {
                                        const response = await fetch(image.base64);
                                        image.blob = await response.blob();
                                        delete image.base64;
                                    }
                                }
                            }
                        }
                    }
                    resolve(data)
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    async function parseSqliteFile(file) {
        const SQL = await initSQL();
        const arrayBuffer = await file.arrayBuffer();
        const db = new SQL.Database(new Uint8Array(arrayBuffer));

        // Extract deck data
        const deckResult = db.exec('SELECT * FROM decks LIMIT 1');
        if (!deckResult[0] || !deckResult[0].values.length) {
            throw new Error('No deck found in SQLite file');
        }

        const deckColumns = deckResult[0].columns;
        const deckValues = deckResult[0].values[0];
        const deck = {};
        deckColumns.forEach((col, i) => deck[col] = deckValues[i]);

        // Extract cases
        const casesResult = db.exec('SELECT * FROM cases');
        deck.cases = [];

        if (casesResult[0]) {
            const caseColumns = casesResult[0].columns;
            for (const row of casesResult[0].values) {
                const newCase = {};
                caseColumns.forEach((col, i) => newCase[col] = row[i]);
                deck.cases.push(newCase);
            }
        }

        // Extract questions
        const questionsResult = db.exec('SELECT * FROM questions WHERE deck_id = ?', [deck.id]);
        deck.questions = [];

        if (questionsResult[0]) {
            const questionColumns = questionsResult[0].columns;

            for (const row of questionsResult[0].values) {
                const question = {};
                questionColumns.forEach((col, i) => question[col] = row[i]);

                // Extract images for this question
                const imagesResult = db.exec('SELECT * FROM images WHERE question_id = ?', [question.id]);
                question.images = [];

                if (imagesResult[0]) {
                    const imageColumns = imagesResult[0].columns;
                    const blobIndex = imageColumns.indexOf('blob');

                    for (const imgRow of imagesResult[0].values) {
                        const image = {};
                        for (const imageCol of imageColumns) {
                            // Convert blob to JS Blob object, keep all other columns as is
                            if (imageCol === 'blob') {
                                image[imageCol] = new Blob([imgRow[blobIndex]], { type: 'image/jpeg' });
                            } else {
                                image[imageCol] = imgRow[imageColumns.indexOf(imageCol)];
                            }
                        }

                        question.images.push(image);
                    }
                }

                // Extract answers for this question
                const answersResult = db.exec('SELECT * FROM answers WHERE question_id = ?', [question.id]);
                question.answers = [];

                if (answersResult[0]) {
                    const answerColumns = answersResult[0].columns;
                    for (const ansRow of answersResult[0].values) {
                        const answer = {};
                        answerColumns.forEach((col, i) => answer[col] = ansRow[i]);
                        question.answers.push(answer);
                    }
                }

                deck.questions.push(question);
            }
        }

        db.close();
        return deck;
    }
</script>

<button class="btn btn-sm btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#importOffcanvas">
    <i class="bi bi-upload"></i> Import deck
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="importOffcanvas" aria-labelledby="importOffcanvasLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="importOffcanvasLabel">Import deck</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="mb-3">
            <label for="importFile" class="form-label">Select a file to import</label>
            <input class="form-control" type="file" id="importFile" accept=".json,.sqlite" onchange={handleFileChange} bind:this={fileInputElement}>
            <div class="form-text">Supported formats: omcarchive.json or omcarchive.sqlite</div>
        </div>

        {#if file}
            <div class="alert alert-light text-truncate">
                <strong>Selected:</strong> {fileName} ({fileType?.toUpperCase()})
            </div>
        {/if}

        {#if importStatus}
            <div class="alert alert-{importStatus.type === 'success' ? 'success' : 'danger'}">
                {importStatus.message}
                {#if importStatus.type === 'success' && importStatus.deckId}
                    <div class="mt-2">
                        <a href="/decks/{importStatus.deckId}" class="btn btn-sm btn-primary">
                            View imported deck
                        </a>
                    </div>
                {/if}
            </div>
        {/if}

        <div class="d-grid">
            <button class="btn btn-primary mb-3" onclick={importDeck} disabled={!file || !fileType || importInProgress}>
                {#if importInProgress}
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Importing...
                {:else}
                    Import deck
                {/if}
            </button>
            {#if importInProgress && importProgressPercentage}
                <div class="progress" role="progressbar" aria-valuenow="{importProgressPercentage}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: {importProgressPercentage}%">{#if importProgressPercentage > 20}{importProgressPercentage}%{/if}</div>
                </div>
            {/if}
        </div>
    </div>
</div>
