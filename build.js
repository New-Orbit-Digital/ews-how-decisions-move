#!/usr/bin/env node
/* ============================================================
   EWS · How Decisions Move — build step
   ------------------------------------------------------------
   Inlines ews-pathways-data.js into ews-decision-map.src.html
   and writes the single self-contained ews-decision-map.html.
   That output is the deliverable: it opens from file://, works
   as an email attachment, and needs no server.

   Run:  node build.js

   Edit content in ews-pathways-data.js.
   Edit markup/CSS/rendering in ews-decision-map.src.html.
   Never edit ews-decision-map.html — it is overwritten.
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT     = __dirname;
const TEMPLATE = path.join(ROOT, "ews-decision-map.src.html");
const DATA     = path.join(ROOT, "ews-pathways-data.js");
const OUT      = path.join(ROOT, "ews-decision-map.html");

const MARKER = "/* @inline ews-pathways-data.js */";
const BANNER_MARKER = "<!-- @banner -->";

function die(msg){ console.error("build: " + msg); process.exit(1); }

if(!fs.existsSync(TEMPLATE)) die("missing template " + path.basename(TEMPLATE));
if(!fs.existsSync(DATA))     die("missing data file " + path.basename(DATA));

const template = fs.readFileSync(TEMPLATE, "utf8");
const data     = fs.readFileSync(DATA, "utf8");

if(!template.includes(MARKER)) die(`template has no inline marker — expected the line: ${MARKER}`);
/* A literal </script> anywhere in the data would close the tag early. */
if(/<\/script/i.test(data)) die("data file contains a literal </script> — escape it before inlining");

/* ---- content check: every role id the data references must exist ---- */
(function validate(){
  let mod;
  try{
    mod = new Function(data + "\nreturn {ROLES, SITUATIONS, ROLE_KEYWORDS, DECISIONS};")();
  }catch(e){
    die("data file did not parse — " + e.message);
  }
  const known = new Set(Object.keys(mod.ROLES));
  const bad = [];
  const check = (ids, where) => (ids||[]).forEach(id=>{ if(!known.has(id)) bad.push(`${where} → "${id}"`); });

  mod.SITUATIONS.forEach(s=>{
    if(s.start) check(s.start.roles, `${s.id}.start`);
    if(s.alt)   check(s.alt.roles,   `${s.id}.alt`);
    (s.steps    || []).forEach((st,i)=>check(st.roles, `${s.id}.steps[${i}]`));
    (s.branches || []).forEach((b,i)=>check(b.roles,   `${s.id}.branches[${i}]`));
    (s.list     || []).forEach((r,i)=>check(r.roles,   `${s.id}.list[${i}]`));
  });
  Object.keys(mod.ROLE_KEYWORDS).forEach(id=>{
    if(!known.has(id)) bad.push(`ROLE_KEYWORDS → "${id}"`);
  });
  mod.DECISIONS.forEach(d=>d.roles.forEach(([rid])=>{
    if(!known.has(rid)) bad.push(`DECISIONS.${d.id} → "${rid}"`);
  }));

  if(bad.length){
    console.warn("build: WARNING — unknown role ids referenced:");
    bad.forEach(b=>console.warn("  " + b));
  }
  console.log(`build: ${mod.SITUATIONS.length} situations · ${Object.keys(mod.ROLES).length} roles · ${mod.DECISIONS.length} decisions`);
})();

const banner =
`<!-- ============================================================
     GENERATED FILE — do not edit.
     Built by build.js from:
       ews-decision-map.src.html  (markup, CSS, rendering)
       ews-pathways-data.js       (all content)
     Rebuild with: node build.js
     ============================================================ -->`;

const out = template
  .replace(BANNER_MARKER, banner)
  .replace(MARKER, data.trim());

fs.writeFileSync(OUT, out, "utf8");
console.log(`build: wrote ${path.basename(OUT)} (${(Buffer.byteLength(out)/1024).toFixed(1)} kB, self-contained)`);
