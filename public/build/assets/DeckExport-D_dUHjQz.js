import{r as e}from"./chunk-BmiCtRTb.js";import{$ as t,B as n,D as r,H as i,M as a,Q as o,T as s,V as c,j as l,k as u,tt as d}from"./client-CIsKR49I.js";import{n as f,t as p}from"./sql-wasm-DtLlKuWw.js";var m=e(f()),h=u(`<li><button class="dropdown-item">JSON Archive</button></li> <li><button class="dropdown-item">SQLite Archive</button></li>`,1);function g(e,s){t(s,!0);let l,u={deck:[`id`,`name`,`description`,`exam_at`],case:[`id`,`text`],question:[`id`,`text`,`hint`,`comment`,`type`,`correct_answer_id`,`is_invalid`,`needs_review`,`case_id`],image:[`id`,`question_id`],answer:[`id`,`question_id`,`text`,`hint`]};async function f(){return l||=await(0,m.default)({locateFile:()=>p}),l}async function g(e=!1){try{let t=await fetch(`/api/decks/${s.deckId}`);if(!t.ok)throw Error();let n=await t.json(),r=n.questions,i=await Promise.all(r.map(async t=>{if(t.images&&t.images.length>0){let n=await Promise.all(t.images.map(async t=>{let n=await fetch(`/`+t.path);if(!n.ok)throw Error();let r=await n.blob(),i=null;return e?(i=await new Promise(e=>{let t=new FileReader;t.onload=()=>e(t.result),t.readAsDataURL(r)}),{...t,base64:i}):{...t,blob:r}}));return{...t,images:n}}return t}));return{...n,questions:i,schema_version:1}}catch(e){return console.error(`Failed to fetch deck data`,e),null}}async function _(e){try{let t=await g(e===`json`);if(!t)return;let n=y(t,!0),r,i,a;if(e===`json`)r=JSON.stringify(n,null,2),i=`application/json`,a=`json`;else if(e===`sqlite`){let e=new(await(f())).Database;e.run(`
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
                `);let t=e.prepare(`INSERT INTO decks VALUES (?, ?, ?, ?)`);t.run([n.id,n.name,n.description,n.exam_at]),t.free();let o=e.prepare(`INSERT INTO cases VALUES (?, ?)`);for(let e of n.cases)o.run([e.id,e.text]);o.free();let s=e.prepare(`INSERT INTO questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);for(let t of n.questions){s.run([t.id,n.id,t.text,t.hint,t.comment,t.type,t.correct_answer_id,t.is_invalid,t.needs_review,t.case_id]);let r=e.prepare(`INSERT INTO images VALUES (?, ?, ?)`);if(t.images&&t.images.length>0)for(let e of t.images){let n=await e.blob.arrayBuffer(),i=new Uint8Array(n);r.run([e.id,t.id,i])}r.free();let i=e.prepare(`INSERT INTO answers VALUES (?, ?, ?, ?)`);if(t.answers&&t.answers.length>0)for(let e of t.answers)i.run([e.id,t.id,e.text,e.hint]);i.free()}s.free(),e.run(`INSERT INTO omcarchive VALUES (?)`,[1]),r=e.export(),i=`application/x-sqlite3`,a=`sqlite`}let o=new Blob([r],{type:i}),s=window.URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=`${n.name}.omcarchive.${a}`,document.body.appendChild(c),c.click(),window.URL.revokeObjectURL(s),c.remove()}catch(e){console.error(`Failed to export deck`,e)}}function v(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}function y(e,t=!0){return{...v(e,u.deck),omcarchive:{schemaVersion:1},cases:e.cases?.map(e=>v(e,u.case))||[],questions:e.questions?.map(e=>({...v(e,u.question),images:e.images?.map(e=>{let n=v(e,u.image);return t&&(e.base64&&(n.base64=e.base64),e.blob&&(n.blob=e.blob)),n})||[],answers:e.answers?.map(e=>v(e,u.answer))||[]}))||[]}}var b=h(),x=c(b),S=n(x);d(x);var C=i(x,2),w=n(C);d(C),a(`click`,S,()=>_(`json`)),a(`click`,w,()=>_(`sqlite`)),r(e,b),o()}l([`click`]);var _=document.getElementById(`DeckExport`);s(g,{target:_,props:{deckId:_.dataset.deckId}});