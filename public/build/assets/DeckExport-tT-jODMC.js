import{d as Y,p as B,f as C,j as k,b as K,c as j,i as S,k as X,a as P,w as V}from"./render-E7Pnc9l2.js";import{i as z,s as M}from"./sql-wasm-Dqo77-Fe.js";import"./_commonjsHelpers-Cpj98o6Y.js";var Q=X('<li><button class="dropdown-item">JSON Archive</button></li> <li><button class="dropdown-item">SQLite Archive</button></li>',1);function J(g,w){B(w,!0);let f;const N=1,T={deck:["id","name","description","exam_at"],case:["id","text"],question:["id","text","hint","comment","type","correct_answer_id","is_invalid","needs_review","case_id"],image:["id","question_id"],answer:["id","question_id","text","hint"]};async function v(){return f||(f=await z({locateFile:()=>M})),f}async function U(r=!1){try{const i=await fetch(`/api/decks/${w.deckId}`);if(!i.ok)throw new Error;const t=await i.json(),s=t.questions,n=await Promise.all(s.map(async a=>{if(a.images&&a.images.length>0){const p=await Promise.all(a.images.map(async E=>{const c=await fetch("/"+E.path);if(!c.ok)throw new Error;const u=await c.blob();let o=null;return r?(o=await new Promise(R=>{const d=new FileReader;d.onload=()=>R(d.result),d.readAsDataURL(u)}),{...E,base64:o}):{...E,blob:u}}));return{...a,images:p}}return a}));return{...t,questions:n,schema_version:N}}catch(i){return console.error("Failed to fetch deck data",i),null}}async function I(r){try{const i=await U(r==="json");if(!i)return;const t=q(i,!0);let s,n,a;if(r==="json")s=JSON.stringify(t,null,2),n="application/json",a="json";else if(r==="sqlite"){const u=await v(),o=new u.Database;o.run(`
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
                `);const R=o.prepare("INSERT INTO decks VALUES (?, ?, ?, ?)");R.run([t.id,t.name,t.description,t.exam_at]),R.free();const d=o.prepare("INSERT INTO cases VALUES (?, ?)");for(const e of t.cases)d.run([e.id,e.text]);d.free();const _=o.prepare("INSERT INTO questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");for(const e of t.questions){_.run([e.id,t.id,e.text,e.hint,e.comment,e.type,e.correct_answer_id,e.is_invalid,e.needs_review,e.case_id]);const b=o.prepare("INSERT INTO images VALUES (?, ?, ?)");if(e.images&&e.images.length>0)for(const l of e.images){const G=await l.blob.arrayBuffer(),D=new Uint8Array(G);b.run([l.id,e.id,D])}b.free();const A=o.prepare("INSERT INTO answers VALUES (?, ?, ?, ?)");if(e.answers&&e.answers.length>0)for(const l of e.answers)A.run([l.id,e.id,l.text,l.hint]);A.free()}_.free(),o.run("INSERT INTO omcarchive VALUES (?)",[N]),s=o.export(),n="application/x-sqlite3",a="sqlite"}const p=new Blob([s],{type:n}),E=window.URL.createObjectURL(p),c=document.createElement("a");c.href=E,c.download=`${t.name}.omcarchive.${a}`,document.body.appendChild(c),c.click(),window.URL.revokeObjectURL(E),c.remove()}catch(i){console.error("Failed to export deck",i)}}function m(r,i){const t={};for(const s of i)s in r&&(t[s]=r[s]);return t}function q(r,i=!0){return{...m(r,T.deck),omcarchive:{schemaVersion:N},cases:r.cases?.map(s=>m(s,T.case))||[],questions:r.questions?.map(s=>({...m(s,T.question),images:s.images?.map(n=>{const a=m(n,T.image);return i&&(n.base64&&(a.base64=n.base64),n.blob&&(a.blob=n.blob)),a})||[],answers:s.answers?.map(n=>m(n,T.answer))||[]}))||[]}}var L=Q(),h=C(L),x=S(h),y=P(h,2),F=S(y);k("click",x,()=>I("json")),k("click",F,()=>I("sqlite")),K(g,L),j()}Y(["click"]);const O=document.getElementById("DeckExport");V(J,{target:O,props:{deckId:O.dataset.deckId}});
