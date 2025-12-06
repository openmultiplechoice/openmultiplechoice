import{d as D,p as Y,f as B,b as C,i as S,c as K,e as X,h as j,o as P}from"./render-CKlhfUir.js";import{i as V,s as z}from"./sql-wasm-BUfVqOaZ.js";import"./_commonjsHelpers-CE1G-McA.js";var M=B('<li><button class="dropdown-item">JSON Archive</button></li> <li><button class="dropdown-item">SQLite Archive</button></li>',1);function Q(O,w){Y(w,!0);let f;const N=1,T={deck:["id","name","description","exam_at"],case:["id","text"],question:["id","text","hint","comment","type","correct_answer_id","is_invalid","needs_review","case_id"],image:["id","question_id"],answer:["id","question_id","text","hint"]};async function v(){return f||(f=await V({locateFile:()=>z})),f}async function U(r=!1){try{const i=await fetch(`/api/decks/${w.deckId}`);if(!i.ok)throw new Error;const t=await i.json(),s=t.questions,n=await Promise.all(s.map(async a=>{if(a.images&&a.images.length>0){const p=await Promise.all(a.images.map(async E=>{const c=await fetch("/"+E.path);if(!c.ok)throw new Error;const u=await c.blob();let o=null;return r?(o=await new Promise(R=>{const d=new FileReader;d.onload=()=>R(d.result),d.readAsDataURL(u)}),{...E,base64:o}):{...E,blob:u}}));return{...a,images:p}}return a}));return{...t,questions:n,schema_version:N}}catch(i){return console.error("Failed to fetch deck data",i),null}}async function I(r){try{const i=await U(r==="json");if(!i)return;const t=g(i,!0);let s,n,a;if(r==="json")s=JSON.stringify(t,null,2),n="application/json",a="json";else if(r==="sqlite"){const u=await v(),o=new u.Database;o.run(`
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
                `);const R=o.prepare("INSERT INTO decks VALUES (?, ?, ?, ?)");R.run([t.id,t.name,t.description,t.exam_at]),R.free();const d=o.prepare("INSERT INTO cases VALUES (?, ?)");for(const e of t.cases)d.run([e.id,e.text]);d.free();const h=o.prepare("INSERT INTO questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");for(const e of t.questions){h.run([e.id,t.id,e.text,e.hint,e.comment,e.type,e.correct_answer_id,e.is_invalid,e.needs_review,e.case_id]);const b=o.prepare("INSERT INTO images VALUES (?, ?, ?)");if(e.images&&e.images.length>0)for(const l of e.images){const F=await l.blob.arrayBuffer(),G=new Uint8Array(F);b.run([l.id,e.id,G])}b.free();const A=o.prepare("INSERT INTO answers VALUES (?, ?, ?, ?)");if(e.answers&&e.answers.length>0)for(const l of e.answers)A.run([l.id,e.id,l.text,l.hint]);A.free()}h.free(),o.run("INSERT INTO omcarchive VALUES (?)",[N]),s=o.export(),n="application/x-sqlite3",a="sqlite"}const p=new Blob([s],{type:n}),E=window.URL.createObjectURL(p),c=document.createElement("a");c.href=E,c.download=`${t.name}.omcarchive.${a}`,document.body.appendChild(c),c.click(),window.URL.revokeObjectURL(E),c.remove()}catch(i){console.error("Failed to export deck",i)}}function m(r,i){const t={};for(const s of i)s in r&&(t[s]=r[s]);return t}function g(r,i=!0){return{...m(r,T.deck),omcarchive:{schemaVersion:N},cases:r.cases?.map(s=>m(s,T.case))||[],questions:r.questions?.map(s=>({...m(s,T.question),images:s.images?.map(n=>{const a=m(n,T.image);return i&&(n.base64&&(a.base64=n.base64),n.blob&&(a.blob=n.blob)),a})||[],answers:s.answers?.map(n=>m(n,T.answer))||[]}))||[]}}var L=M(),_=C(L),q=S(_);q.__click=()=>I("json");var x=K(_,2),y=S(x);y.__click=()=>I("sqlite"),X(O,L),j()}D(["click"]);const k=document.getElementById("DeckExport");P(Q,{target:k,props:{deckId:k.dataset.deckId}});
