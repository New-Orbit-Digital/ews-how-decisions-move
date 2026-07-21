/* ============================================================
   EWS · How Decisions Move — data module v0.2.0
   ------------------------------------------------------------
   THE single source of truth for everything the page shows.
   Merged from ews-decision-map.html v0.1 (REALMS, FN_LABEL,
   ROLES, DECISIONS, GROUP_ORDER) and pathways data v0.2
   (REVIEW_LINE, CONFIG, SITUATIONS, ROLE_KEYWORDS).

   This file is inlined into ews-decision-map.html by build.js.
   Edit content HERE, never in the built file.

   Register rules (apply to any copy edits):
   - Descriptive, never promissory. "This is where concerns are
     raised first," not "most concerns resolve here."
   - Role titles only. No employee names, ever.
   - Sequence is not rank: steps describe travel, not hierarchy.

   Changelog
   v0.2   — 2026-07: situations dataset created (10 cards, signpost
            model), synonym lists, role keywords, review line.
   v0.2.0 — 2026-07: v0.1 map data lifted out of the HTML and
            merged here. No content changed in the move.
   ============================================================ */


/* ============================================================
   MAP DATA — from v0.1. Unchanged.
   ------------------------------------------------------------
   ROLES:  id → { label, realm (ped|adm|brd), group, ptc?, chair?, desc, conduit? }
   DECISIONS: { id, title, group, plain, collab, src,
                roles: [ [roleId, FN, optional note], ... ] }
   FN codes → labels are defined in FN_LABEL below.
   ============================================================ */

const FN_LABEL = {
  HOME:    "Decision home",
  CONSULT: "Consulted",
  PROCESS: "Runs the process",
  COMMS:   "Communicates updates",
  RESOLVE: "Owns follow-through",
  APPROVE: "Approves",
  NOTIFY:  "Notified right away"
};

const REALMS = {
  ped:{name:"Pedagogical", tag:"Freedom · Idealism", cls:"ped"},
  adm:{name:"Administrative", tag:"Equity · mediates · facilitates · executes", cls:"adm"},
  brd:{name:"Board of Trustees", tag:"Economic · General Welfare", cls:"brd"}
};

const ROLES = {
  /* ---- Pedagogical ---- */
  pedChair:{label:"Pedagogical Chair", realm:"ped", chair:true,
    desc:"Point of contact for the Pedagogical realm.",
    conduit:"A conduit, not a command node — carries information and questions in and out of the realm rather than sitting above it."},
  ecCoChairs:{label:"EC Section Co-Chairs", realm:"ped", group:"Early Childhood",
    desc:"Coordinate the Early Childhood section and represent it in cross-school work."},
  ecTeachers:{label:"EC Teachers", realm:"ped", group:"Early Childhood",
    desc:"Nursery and kindergarten classroom teachers."},
  ecAftercare:{label:"EC Aftercare", realm:"ped", group:"Early Childhood",
    desc:"Afternoon care for Early Childhood students."},
  g14CoChair:{label:"Grades 1–4 Co-Chair", realm:"ped", group:"Grades 1–8",
    desc:"Coordinates the Grades 1–4 section and represents it in cross-school work."},
  g58CoChair:{label:"Grades 5–8 Co-Chair", realm:"ped", group:"Grades 1–8",
    desc:"Coordinates the Grades 5–8 section and represents it in cross-school work."},
  gradesTeachers:{label:"Grades 1–8 Teachers", realm:"ped", group:"Grades 1–8",
    desc:"Class teachers for Grades 1 through 8."},
  gradesAftercare:{label:"Grades Aftercare", realm:"ped", group:"Grades 1–8",
    desc:"Afternoon care for grades students."},
  hsCoChairs:{label:"HS Section Co-Chairs", realm:"ped", group:"High School",
    desc:"Coordinate the High School section and represent it in cross-school work."},
  hsTeachers:{label:"HS Teachers", realm:"ped", group:"High School",
    desc:"High School classroom teachers."},
  hsCollegeCounselor:{label:"HS College Counselor (Admin)", realm:"ped", group:"High School",
    desc:"Guides students through the college search and applications."},
  hsCounselor:{label:"HS Counselor (Social/Emotional)", realm:"ped", group:"High School",
    desc:"Social-emotional counseling for High School students."},
  subjCoChair:{label:"Subject Teacher Co-Chair", realm:"ped", group:"Subject Teachers",
    desc:"Coordinates subject teachers across the grades."},
  subjTeachers:{label:"Grades Subject Teachers", realm:"ped", group:"Subject Teachers",
    desc:"Specialty teachers — handwork, movement, languages, and more — across the grades."},
  afterSchoolMusic:{label:"After School Music", realm:"ped", group:"Subject Teachers",
    desc:"After-school music program teachers."},
  n8Counselor:{label:"N–8 Counselor (Social/Emotional)", realm:"ped", group:"Student Support (N–8)",
    desc:"Social-emotional counseling for Nursery through Grade 8."},
  edSupport:{label:"Educational Support (Admin)", realm:"ped", group:"Student Support (N–8)",
    desc:"Coordinates learning-support plans and services for students."},
  ptcClassReps:{label:"PTC Class Reps", realm:"ped", group:"Parent Teacher Council", ptc:true,
    desc:"Parent volunteers who connect each class's families with teachers and the PTC."},

  /* ---- Administrative ---- */
  adminChair:{label:"Admin Chair", realm:"adm", chair:true,
    desc:"Point of contact for the Administrative realm.",
    conduit:"A conduit, not a command node — the Administrative realm mediates, facilitates, and executes on behalf of the whole school."},
  athleticDir:{label:"Athletic Director", realm:"adm", group:"Pedagogical Support",
    desc:"Leads the athletics program and its coaches."},
  ecCoord:{label:"EC Coordinator (Ped Support)", realm:"adm", group:"Pedagogical Support",
    desc:"Administrative support for the Early Childhood section — scheduling, logistics, follow-through."},
  gradesCoord:{label:"Grades Coordinator (Ped Support)", realm:"adm", group:"Pedagogical Support",
    desc:"Administrative support for the grades — scheduling, logistics, follow-through."},
  hsCoord:{label:"HS Coordinator (Ped Support)", realm:"adm", group:"Pedagogical Support",
    desc:"Administrative support for the High School — scheduling, logistics, follow-through."},
  businessDir:{label:"Business Director", realm:"adm", group:"Business & Office",
    desc:"Finances, payroll, contracts, and the school's business operations."},
  registrar:{label:"Registrar + DB Manager", realm:"adm", group:"Business & Office",
    desc:"Enrollment records and the school database."},
  mainOffice:{label:"Main Office Coordinator", realm:"adm", group:"Business & Office",
    desc:"Front-office hub for daily school life."},
  hsOffice:{label:"HS Office Coordinator", realm:"adm", group:"Business & Office",
    desc:"Front office for the High School."},
  enrollDir:{label:"Enrollment + Outreach Director", realm:"adm", group:"Enrollment & Outreach",
    desc:"Admissions, enrollment, and outreach to prospective families."},
  campAdmin:{label:"Summer Camp Admin", realm:"adm", group:"Enrollment & Outreach",
    desc:"Administration of the summer camp program."},
  campEC:{label:"Camp Manager (EC)", realm:"adm", group:"Enrollment & Outreach",
    desc:"Runs summer camp for Early Childhood ages."},
  campGrades:{label:"Camp Manager (Grades)", realm:"adm", group:"Enrollment & Outreach",
    desc:"Runs summer camp for grades ages."},
  devDir:{label:"Development Director", realm:"adm", group:"Development",
    desc:"Fundraising and development for the school."},
  facilitiesMgr:{label:"Facilities Manager", realm:"adm", group:"Facilities",
    desc:"Care of buildings and grounds."},
  facilitiesAsst:{label:"Facilities Assistants", realm:"adm", group:"Facilities",
    desc:"Hands-on care of campus spaces."},
  marketingDir:{label:"Marketing + Comms Director", realm:"adm", group:"Marketing",
    desc:"School communications and marketing."},
  ptcCoChairs:{label:"PTC Co-Chairs", realm:"adm", group:"Parent Teacher Council", ptc:true,
    desc:"Lead the Parent Teacher Council's work across the school year."},
  ptcTreasurer:{label:"PTC Treasurer", realm:"adm", group:"Parent Teacher Council", ptc:true,
    desc:"Stewards PTC funds."},

  /* ---- Board of Trustees ---- */
  boardChair:{label:"Board Chair", realm:"brd", chair:true,
    desc:"Point of contact for the Board of Trustees.",
    conduit:"A conduit, not a command node — convenes trustees and carries information between the Board and the rest of the school."},
  viceChair:{label:"Vice Chair", realm:"brd", group:"Officers",
    desc:"Board officer; serves on the Board Executive Committee."},
  boardTreasurer:{label:"Treasurer", realm:"brd", group:"Officers",
    desc:"Board officer; leads the Board's financial oversight work."},
  boardSecretary:{label:"Secretary", realm:"brd", group:"Officers",
    desc:"Board officer; keeps the Board's records and minutes."},
  generalBoard:{label:"General Board Members", realm:"brd", group:"Trustees",
    desc:"Trustees who share fiduciary responsibility for the school's legal and financial health."},
  ptcBoardRep:{label:"PTC Rep to Board", realm:"brd", group:"Parent Teacher Council", ptc:true,
    desc:"Brings the parent community's voice into Board conversations — one of the PTC's three touchpoints."}
};

/* Convenience sets used below */
const ALL_TEACHERS = ["ecTeachers","gradesTeachers","hsTeachers","subjTeachers"];
const SECTION_CHAIRS = ["ecCoChairs","g14CoChair","g58CoChair","hsCoChairs","subjCoChair"];

const DECISIONS = [
/* ---------- Education & Classroom ---------- */
{ id:"curriculum", title:"What's taught (curriculum)", group:"Education & Classroom",
  plain:"Deciding and refining the curriculum — what students learn, and how it evolves.",
  collab:"The faculty develops the curriculum under pedagogical leadership, in dialogue with AWSNA's principles. The Board joins the conversation when a change needs funding or is large enough to affect enrollment.",
  src:"Decision Matrix draft · Curriculum Development",
  roles:[["pedChair","HOME"],
         ...ALL_TEACHERS.map(t=>[t,"PROCESS","develops and reviews the program"]),
         ["boardChair","CONSULT","funding or large changes"],
         ["generalBoard","CONSULT","funding or large changes"]]},

{ id:"classroom", title:"Day-to-day classroom life", group:"Education & Classroom",
  plain:"The daily activities, materials, and rhythms of each classroom.",
  collab:"Teachers hold their own classrooms, drawing on the Pedagogical Chair and mentors for guidance. Administration steps in when something needs ordering or a budget line.",
  src:"Decision Matrix draft · Day-to-day classroom activities",
  roles:[...ALL_TEACHERS.map(t=>[t,"HOME"]),
         ["pedChair","CONSULT","guidance and mentoring"],
         ["businessDir","CONSULT","ordering and budget, as needed"]]},

{ id:"programAdmin", title:"Adding or changing a program", group:"Education & Classroom",
  plain:"Bigger changes to how the program runs — think a new eurythmy offering, a third-grade yurt, a science lab.",
  collab:"The idea starts with teachers and pedagogical leadership; making it real requires collaboration — a budget request through Administration and the Board's finance work.",
  src:"Decision Matrix draft · Administering the Program",
  roles:[...ALL_TEACHERS.map(t=>[t,"HOME","where ideas originate"]),
         ["pedChair","RESOLVE"],
         ["businessDir","CONSULT","budget request"],
         ["boardTreasurer","CONSULT","Board finance work"]]},

{ id:"assignments", title:"Program offering & teaching assignments", group:"Education & Classroom",
  plain:"Each year's class offerings and who teaches what.",
  collab:"The full faculty and its sections shape the annual offering; Administration is consulted so schedules, rooms, and contracts line up.",
  src:"Decision Matrix draft · Annual Program Offering",
  roles:[...SECTION_CHAIRS.map(c=>[c,"HOME","with their sections"]),
         ["pedChair","RESOLVE"],
         ["adminChair","CONSULT","scheduling and operations"]]},

/* ---------- Students & Wellbeing ---------- */
{ id:"welfare", title:"Student welfare & safety reporting", group:"Students & Wellbeing",
  plain:"How serious concerns about a student's safety or wellbeing are raised and handled.",
  collab:"Counselors and pedagogical leadership carry the day-to-day work; the Board is notified right away for serious events. The draft is explicit that Board and Pedagogy must talk to each other in a timely way.",
  src:"Decision Matrix draft · Student Welfare Reporting",
  roles:[["n8Counselor","HOME"],["hsCounselor","HOME"],["pedChair","HOME"],
         ["adminChair","CONSULT"],
         ["boardChair","NOTIFY","serious injury, mandated reports, police involvement"]]},

{ id:"behavior", title:"Classroom behavior & discipline", group:"Students & Wellbeing",
  plain:"Everyday behavior questions, and what happens if they escalate.",
  collab:"The class teacher holds behavior in their own room, with section co-chairs and student support drawn in as things escalate. Administration and — if dismissal is ever considered — Board officers and Enrollment join the conversation.",
  src:"Decision Matrix draft · Classroom behavior / Suspension & Dismissal",
  roles:[...ALL_TEACHERS.map(t=>[t,"HOME"]),
         ...SECTION_CHAIRS.map(c=>[c,"RESOLVE","if it escalates"]),
         ["edSupport","CONSULT"],["adminChair","CONSULT"],
         ["boardChair","NOTIFY","only if dismissal is on the table"],
         ["enrollDir","CONSULT","only if dismissal is on the table"]]},

{ id:"bullying", title:"Bullying, harassment & threat response", group:"Students & Wellbeing",
  plain:"How reports of bullying, harassment, or threats are investigated and resolved.",
  collab:"Pedagogical leadership owns the investigation, with student support and Administration alongside. The Board is always notified for harassment and threat cases, and for bullying when a pattern emerges.",
  src:"Decision Matrix draft · Bullying / Harassment / Threat Assessments",
  roles:[["pedChair","HOME"],
         ["n8Counselor","CONSULT"],["hsCounselor","CONSULT"],["edSupport","CONSULT"],
         ["adminChair","CONSULT"],
         ...SECTION_CHAIRS.map(c=>[c,"RESOLVE","follow-through with families"]),
         ["boardChair","NOTIFY","always for harassment and threats"]]},

{ id:"ssp", title:"Student support plans & counseling", group:"Students & Wellbeing",
  plain:"Learning-support plans, accommodations, and counseling services.",
  collab:"The student support team and counselors build and carry the plans, teachers bring classroom knowledge, and Administration keeps policy and documentation consistent.",
  src:"Decision Matrix draft · Student Support / Counseling Services",
  roles:[["edSupport","HOME"],["n8Counselor","HOME"],["hsCounselor","HOME"],
         ...ALL_TEACHERS.map(t=>[t,"CONSULT","classroom perspective"]),
         ["pedChair","CONSULT"],["adminChair","PROCESS","policy and documentation"]]},

{ id:"admissions", title:"Accepting new students", group:"Students & Wellbeing",
  plain:"How a prospective family moves from inquiry to enrollment.",
  collab:"Enrollment manages the journey — visits, paperwork, communication with the family — while teachers make the actual decision about whether a student joins their class.",
  src:"Decision Matrix draft · Student Acceptance Process",
  roles:[["enrollDir","PROCESS"],["enrollDir","COMMS"],
         ["ecTeachers","HOME","decide for their class"],
         ["gradesTeachers","HOME","decide for their class"],
         ["hsTeachers","HOME","decide for their class"],
         ["registrar","PROCESS","records and database"]]},

{ id:"grievance", title:"Parent concerns & conflict resolution", group:"Students & Wellbeing",
  plain:"Where a family's concern goes, and who works to resolve it.",
  collab:"Pedagogical leadership holds the process, with the Admin Chair, teachers, and student support in the same conversation — the draft is explicit that everyone should be aligned and in the room together rather than in separate, siloed meetings.",
  src:"Decision Matrix draft · Parent grievances and conflict resolution",
  roles:[["pedChair","HOME"],
         ["adminChair","CONSULT"],["adminChair","COMMS"],
         ...ALL_TEACHERS.map(t=>[t,"CONSULT"]),
         ["edSupport","CONSULT"],
         ["boardChair","NOTIFY","only for legal risk or repeated patterns"]]},

/* ---------- People & Hiring ---------- */
{ id:"hireTeachers", title:"Hiring teachers & pedagogical staff", group:"People & Hiring",
  plain:"How new teachers and pedagogical support staff are chosen and brought on.",
  collab:"A clear handoff: pedagogical leadership writes the job description, forms the hiring committee, interviews, and recommends — then Administration posts the role, runs background checks, handles the offer letter, salary, and benefits, and the two sides coordinate onboarding together.",
  src:"Decision Matrix draft · Hiring Pedagogical Staff",
  roles:[["pedChair","HOME"],
         ...SECTION_CHAIRS.map(c=>[c,"HOME","hiring committee"]),
         ["adminChair","PROCESS","posting, checks, HR"],
         ["businessDir","PROCESS","offer letter, salary, benefits"]]},

{ id:"hireAdmin", title:"Hiring administrative staff", group:"People & Hiring",
  plain:"How new administrative staff are chosen and brought on.",
  collab:"The Admin Chair and Business Director lead the search and the HR process; faculty are invited to meet candidates so the pedagogical side has a voice.",
  src:"Decision Matrix draft · Hiring Admin Staff",
  roles:[["adminChair","HOME"],["businessDir","HOME"],
         ["pedChair","CONSULT","faculty meet-and-greet"]]},

{ id:"evaluation", title:"Teacher mentoring, evaluation & growth", group:"People & Hiring",
  plain:"How teachers are mentored, evaluated, and supported in their development.",
  collab:"Pedagogy evaluates using its own process; Administration verifies that documentation is complete, the ped-support coordinators carry the logistics, and money for training flows through the Business Director and the Board.",
  src:"Decision Matrix draft · Faculty & Staff Development",
  roles:[["pedChair","HOME"],
         ["ecCoord","PROCESS"],["gradesCoord","PROCESS"],["hsCoord","PROCESS"],
         ["adminChair","PROCESS","verifies documentation"],
         ["businessDir","CONSULT","training budget"],
         ["boardChair","CONSULT","funding and required Board training"]]},

{ id:"coaches", title:"Hiring athletic coaches", group:"People & Hiring",
  plain:"How coaches join the athletics program.",
  collab:"The Athletic Director leads, consulting other coaches and at least one middle- or high-school faculty member.",
  src:"Decision Matrix draft · Hiring/Firing Athletic Coaches",
  roles:[["athleticDir","HOME"],["athleticDir","RESOLVE"],
         ["gradesTeachers","CONSULT","faculty voice"],
         ["hsTeachers","CONSULT","faculty voice"]]},

/* ---------- Money & Budget ---------- */
{ id:"budget", title:"The annual budget", group:"Money & Budget",
  plain:"How the school's yearly budget is built and approved.",
  collab:"The Business Director builds the budget in consultation with pedagogical leadership, the full faculty, the Admin Chair, and the Board's finance work — and the full Board approves it.",
  src:"Decision Matrix draft · Establishing the annual budget",
  roles:[["businessDir","HOME"],
         ["pedChair","CONSULT"],
         ...ALL_TEACHERS.map(t=>[t,"CONSULT","full-faculty input"]),
         ["adminChair","CONSULT"],
         ["boardTreasurer","CONSULT","Board finance work"],
         ["boardChair","APPROVE"],["generalBoard","APPROVE"],
         ["boardChair","NOTIFY","deficits, cash-flow issues, audit findings"]]},

{ id:"tuition", title:"Tuition, assistance & financial aid", group:"Money & Budget",
  plain:"Setting tuition and shaping the financial-aid policy.",
  collab:"The Business Director leads, consulting the Admin Chair, Pedagogical Chair, Enrollment, and the Board's finance work; the Board approves.",
  src:"Decision Matrix draft · Tuition Rate / Financial Aid Policy",
  roles:[["businessDir","HOME"],
         ["adminChair","CONSULT"],["pedChair","CONSULT"],["enrollDir","CONSULT"],
         ["boardTreasurer","CONSULT","Board finance work"],
         ["boardChair","APPROVE"],["generalBoard","APPROVE"]]},

{ id:"spend", title:"Spending priorities", group:"Money & Budget",
  plain:"Deciding where money goes once the budget exists.",
  collab:"Two homes, one conversation: priorities for educating children sit with the Pedagogical Chair, priorities for running a sound business sit with the Admin Chair — each consults the other, and the Board approves.",
  src:"Decision Matrix draft · Prioritizing budgetary spending",
  roles:[["pedChair","HOME","education priorities"],
         ["adminChair","HOME","business priorities"],
         ["businessDir","CONSULT"],
         ["boardTreasurer","CONSULT","Board finance work"],
         ["generalBoard","APPROVE"],["boardChair","APPROVE"]]},

/* ---------- Campus & Operations ---------- */
{ id:"facilities", title:"Care of campus & buildings", group:"Campus & Operations",
  plain:"Maintaining and improving the physical campus.",
  collab:"The Facilities Manager leads with the facilities team; pedagogy is consulted so campus work serves the classrooms, and the Board is drawn in through its grounds-related work.",
  src:"Decision Matrix draft · Facilities & physical properties",
  roles:[["facilitiesMgr","HOME"],["facilitiesAsst","PROCESS"],
         ["adminChair","RESOLVE"],
         ["pedChair","CONSULT","classroom needs"],
         ["generalBoard","CONSULT","grounds-related Board work"]]},

{ id:"safety", title:"Health, safety & legal policies", group:"Campus & Operations",
  plain:"The administrative policies that keep the school safe and compliant.",
  collab:"The Admin Chair establishes and implements these policies, consulting pedagogy — and the Board where its expertise is needed.",
  src:"Decision Matrix draft · Health, safety, legal areas",
  roles:[["adminChair","HOME"],
         ["pedChair","CONSULT"],
         ["boardChair","CONSULT","as-needed expertise"]]},

{ id:"crisis", title:"Crisis response", group:"Campus & Operations",
  plain:"Who acts, and who is told, when something urgent happens.",
  collab:"The Admin Chair coordinates the response with pedagogy and the counselors; the Board Chair is notified immediately, and the full Board according to policy.",
  src:"Decision Matrix draft · Crisis Management Situations",
  roles:[["adminChair","HOME"],
         ["pedChair","CONSULT"],
         ["n8Counselor","CONSULT"],["n8Counselor","COMMS"],["hsCounselor","CONSULT"],
         ["boardChair","NOTIFY","immediately"]]},

/* ---------- Community & Events ---------- */
{ id:"festivals", title:"Festivals & the rhythm of the year", group:"Community & Events",
  plain:"The festival life that shapes the school year.",
  collab:"Festival life is held by the faculty as pedagogical work, with Administration and the PTC — including class parents — collaborating on implementation. Teachers carry communication to families.",
  src:"Decision Matrix draft · Festival Life / Community Life & Culture",
  roles:[["pedChair","HOME"],
         ...ALL_TEACHERS.map(t=>[t,"PROCESS","carry the festivals"]),
         ...ALL_TEACHERS.map(t=>[t,"COMMS","to families"]),
         ["adminChair","PROCESS","implementation support"],
         ["ptcCoChairs","PROCESS","parent collaboration"],
         ["ptcClassReps","PROCESS","class-level coordination"]]},

{ id:"community", title:"Community building & parent engagement", group:"Community & Events",
  plain:"Volunteering, class community, and the ways parents participate in school life.",
  collab:"This is the PTC's home ground — one body working through three touchpoints: class reps at the classroom level, co-chairs and treasurer coordinating across the school, and the rep to Board carrying the community's voice upward.",
  src:"Family Handbook 2026–27 · PTC responsibilities",
  roles:[["ptcCoChairs","HOME"],
         ["ptcClassReps","PROCESS","class-level connection"],
         ["ptcTreasurer","PROCESS","stewards PTC funds"],
         ["ptcBoardRep","COMMS","community voice to the Board"]]},

/* ---------- Board & Bylaws ---------- */
{ id:"bylaws", title:"Changing the bylaws", group:"Board & Bylaws",
  plain:"How the school's founding rules are amended.",
  collab:"The Board's officers hold the process, in consultation with WEANC (the school's nonprofit membership), pedagogy, Administration, and AWSNA.",
  src:"Decision Matrix draft · Changing the Bylaws",
  roles:[["boardChair","HOME"],["viceChair","HOME"],["boardTreasurer","HOME"],["boardSecretary","HOME"],
         ["pedChair","CONSULT"],["adminChair","CONSULT"]]},

{ id:"stewardship", title:"Legal & financial stewardship", group:"Board & Bylaws",
  plain:"The Board's ongoing responsibility for the school's legal and financial health.",
  collab:"Trustees hold fiduciary responsibility under North Carolina nonprofit law; the Business Director carries the financial work day to day, with the Admin Chair and Pedagogical Chair consulted so stewardship stays connected to school life.",
  src:"Decision Matrix draft · Legal / Financial well-being",
  roles:[["boardChair","HOME"],["generalBoard","HOME"],["boardTreasurer","HOME"],
         ["businessDir","PROCESS","day-to-day financial work"],
         ["adminChair","CONSULT"],["pedChair","CONSULT"]]}
];

/* Realm group order on the map. */
const GROUP_ORDER = {
  ped:["Early Childhood","Grades 1–8","High School","Subject Teachers","Student Support (N–8)","Parent Teacher Council"],
  adm:["Pedagogical Support","Business & Office","Enrollment & Outreach","Development","Facilities","Marketing","Parent Teacher Council"],
  brd:["Officers","Trustees","Parent Teacher Council"]
};


/* ============================================================
   SIGNPOST DATA — from pathways v0.2. Unchanged.
   ============================================================ */

/* One canonical review sentence, appended when review:true.
   Careful: the review body is itself still a proposal in the
   matrix, so this stays framework-level and descriptive. */
const REVIEW_LINE =
  "If resolution can't be reached, the working framework provides for a review of the steps taken — a check that the agreed process was followed.";

/* ------------------------------------------------------------
   Site config.

   feedbackEndpoint — the Apps Script web-app URL that writes to the
     feedback Sheet. Paste it here after deploying; see SETUP.md.
     While it is null the form still works and falls back to email.
   feedbackEmail / feedbackSubject — the fallback path. Used when
     there is no endpoint, or when the POST fails. If BOTH are null
     the form explains itself and offers the message to copy.
   ------------------------------------------------------------ */
const CONFIG = {
  feedbackEndpoint: null,  // e.g. "https://script.google.com/macros/s/AKfy.../exec"
  feedbackEmail: null,     // e.g. "governance@..." — fallback when the endpoint is unset or fails
  feedbackSubject: "How Decisions Move — feedback",
};

/* ------------------------------------------------------------
   SITUATIONS — the signpost door. Order here = order on screen.
   kind: "process" (signpost + collapsed journey)
         "contact" (signpost only)
         "branch"  (one follow-up question, then signpost)
         "list"    (mini-list of contacts)
   start/alt/steps reference role ids from the ROLES map above.
   Multiple ids in a roles[] array = "whichever fits your child"
   (renderer shows the label once; map trace lights all of them).
   flags[] = sub-group review items; render only when ?draft=1.
   ------------------------------------------------------------ */
const SITUATIONS = [

{ id:"classroom",
  card:"Something's going on in my child's classroom",
  kind:"process",
  keywords:["classroom","class","teacher","concern","problem","issue","upset","conflict","behavior","discipline","homework","communication"],
  start:{ roles:["ecTeachers","gradesTeachers","hsTeachers"],
          label:"Your child's class teacher",
          why:"Day-to-day classroom life is held by the class teacher — this is where classroom concerns are raised first." },
  alt:null,
  steps:[
    { roles:["ecCoChairs","g14CoChair","g58CoChair","hsCoChairs"],
      label:"Your section's co-chair",
      text:"If a concern continues, the section co-chair joins the conversation." },
    { roles:["pedChair"],
      label:"Pedagogical Chair",
      text:"Unresolved concerns are held by the Pedagogical Chair, with the Admin Chair alongside — so everyone is hearing the same conversation, not separate ones." }
  ],
  review:true,
  src:"Decision Matrix draft · Classroom behavior / Parent grievances",
  flags:[] },

{ id:"safety",
  card:"I'm worried about my child's safety or wellbeing",
  kind:"process",
  keywords:["safety","safe","wellbeing","well-being","worried","anxious","sad","emotional","mental health","hurt","injury","scared","crisis"],
  start:{ roles:["ecTeachers","gradesTeachers","hsTeachers"],
          label:"Your child's class teacher",
          why:"The adult closest to your child each day. Share what you're seeing — teachers bring support in right away." },
  alt:{ roles:["n8Counselor","hsCounselor"],
        label:"The school counselor",
        why:"N–8 or High School, depending on your child." },
  steps:[
    { roles:["pedChair"],
      label:"Pedagogical Chair",
      text:"Counselors and the Pedagogical Chair carry wellbeing concerns together." },
    { roles:["boardChair"],
      label:"Board Chair",
      text:"Serious safety events reach the Board right away — that notification is built into the framework." }
  ],
  review:true,
  src:"Decision Matrix draft · Student Welfare Reporting",
  flags:["Safety microcopy needs sub-group review before anything public."] },

{ id:"bullying",
  card:"My child is being bullied or harassed",
  kind:"process",
  keywords:["bully","bullying","bullied","mean","teasing","picked on","harass","harassment","excluded","exclusion","threat","threats","unsafe"],
  start:{ roles:["ecTeachers","gradesTeachers","hsTeachers"],
          label:"Your child's class teacher",
          why:"Name what's happening to the class teacher first — patterns in the classroom are theirs to see and act on." },
  alt:{ roles:["n8Counselor","hsCounselor"],
        label:"The school counselor",
        why:"If your child needs support right away, start here." },
  steps:[
    { roles:["pedChair"],
      label:"Pedagogical Chair",
      text:"Investigations are led by the Pedagogical Chair, with student support and the Admin Chair alongside." },
    { roles:["boardChair"],
      label:"Board Chair",
      text:"Harassment and threat cases reach the Board right away; bullying does when a pattern emerges." }
  ],
  review:true,
  src:"Decision Matrix draft · Bullying / Harassment / Threat Assessments",
  flags:["Microcopy for sub-group review — this card speaks for the school on a sensitive process."] },

{ id:"support",
  card:"My child may need learning support",
  kind:"process",
  keywords:["learning","support","struggling","reading","attention","focus","accommodations","IEP","evaluation","tutoring","dyslexia","special needs"],
  start:{ roles:["ecTeachers","gradesTeachers","hsTeachers"],
          label:"Your child's class teacher",
          why:"Start with what you're both seeing — the teacher brings Educational Support into the picture." },
  alt:null,
  steps:[
    { roles:["edSupport"],
      label:"Educational Support",
      text:"Educational Support coordinates a plan with you and the teacher." },
    { roles:["n8Counselor","hsCounselor"],
      label:"Counselors",
      text:"Counselors join when the need is social-emotional." }
  ],
  review:false,  /* dispute/appeal path for support plans is an open
                    question in the matrix — no review line until the
                    sub-groups settle it. */
  src:"Decision Matrix draft · Student Support / Counseling Services",
  flags:["Entry point (teacher first vs. Educational Support directly) and the dispute path for support plans are open questions in the matrix."] },

{ id:"money",
  card:"A question about tuition, billing, or financial aid",
  kind:"contact",
  keywords:["tuition","bill","billing","payment","pay","cost","fee","fees","financial aid","aid","scholarship","assistance","afford","money","invoice"],
  start:{ roles:["businessDir"],
          label:"Business Director",
          why:"Tuition, billing, and financial aid all live with the Business Director." },
  alt:null, steps:[], review:false,
  src:"Decision Matrix draft · Tuition Rate / Financial Aid Policy",
  flags:[] },

{ id:"enroll",
  card:"Admissions, or enrolling a sibling",
  kind:"contact",
  keywords:["admissions","enroll","enrollment","apply","application","tour","visit","sibling","new student","transfer","waitlist"],
  start:{ roles:["enrollDir"],
          label:"Enrollment + Outreach Director",
          why:"Every admissions journey — first inquiry to first day — runs through Enrollment + Outreach." },
  alt:null, steps:[], review:false,
  src:"Decision Matrix draft · Student Acceptance Process",
  flags:[] },

{ id:"programs",
  card:"Aftercare, athletics, music, or camp",
  kind:"list",
  keywords:["aftercare","after care","after school","athletics","sports","team","coach","music","instrument","camp","summer"],
  list:[
    { label:"Aftercare",          roles:["mainOffice"],       contact:"Main Office Coordinator" },
    { label:"Athletics",          roles:["athleticDir"],      contact:"Athletic Director" },
    { label:"After-school music", roles:["afterSchoolMusic"], contact:"After School Music program" },
    { label:"Summer camp",        roles:["campAdmin"],        contact:"Summer Camp Admin" }
  ],
  review:false,
  src:"Interim Structure v0.2 · program roles",
  flags:["Confirm aftercare and music contacts with the office — the matrix doesn't cover these programs."] },

{ id:"involved",
  card:"I want to get involved",
  kind:"contact",
  keywords:["volunteer","involved","help","participate","PTC","class rep","class parent","festival","community","join"],
  start:{ roles:["ptcClassReps"],
          label:"Your PTC class rep",
          why:"Your class rep is the community's nearest door — they'll connect you with the PTC co-chairs and whatever needs hands." },
  alt:null, steps:[], review:false,
  src:"Family Handbook 2026–27 · PTC responsibilities",
  flags:[] },

{ id:"disagree",
  card:"I disagree with a policy or decision",
  kind:"branch",
  keywords:["disagree","policy","decision","object","appeal","complaint","unfair","change","why did","who decided"],
  branchPrompt:"Which kind of decision?",
  branches:[
    { label:"Teaching, curriculum, or classroom policy",
      roles:["pedChair"], person:"Pedagogical Chair",
      why:"Pedagogical policy is held in the Pedagogical realm." },
    { label:"Operations — schedules, safety, campus, admin policy",
      roles:["adminChair"], person:"Admin Chair",
      why:"Administrative policy is held by the Admin Chair." },
    { label:"Board policy, bylaws, or school direction",
      roles:["boardChair"], person:"Board Chair",
      why:"Board-level policy is held by the trustees." }
  ],
  review:true,
  src:"Decision Matrix draft · Changes to Pedagogical / Administrative / Board Policies",
  flags:[] },

{ id:"governance",
  card:"A question about school finances or governance",
  kind:"contact",
  keywords:["governance","board","trustees","finances","budget","bylaws","AWSNA","accreditation","structure","leadership","who decides"],
  start:{ roles:["boardChair"],
          label:"Board Chair",
          why:"The Board holds the school's legal and financial stewardship — the Board Chair is its point of contact." },
  alt:{ roles:["ptcBoardRep"],
        label:"PTC Rep to Board",
        why:"The parent community's standing voice in Board conversations." },
  steps:[], review:false,
  src:"Decision Matrix draft · Legal / Financial well-being",
  flags:["Sub-group call: Board Chair vs. PTC Rep as the community-facing door for governance questions."] }
];

/* ------------------------------------------------------------
   ROLE_KEYWORDS — search synonyms beyond the visible label.
   Roles not listed are searchable by label/group/realm alone.
   ------------------------------------------------------------ */
const ROLE_KEYWORDS = {
  businessDir:   ["billing","tuition","invoice","payroll","payments","finance"],
  enrollDir:     ["admissions","apply","tour","waitlist","new family"],
  registrar:     ["records","transcript","database","forms"],
  mainOffice:    ["front office","attendance","aftercare","front desk"],
  facilitiesMgr: ["building","campus","grounds","maintenance","repairs"],
  athleticDir:   ["sports","coach","teams","games"],
  n8Counselor:   ["counseling","emotional","mental health","wellbeing"],
  hsCounselor:   ["counseling","emotional","mental health","wellbeing"],
  edSupport:     ["learning support","accommodations","IEP","evaluation"],
  ptcClassReps:  ["volunteer","class parent","room parent"],
  ptcCoChairs:   ["parent council","volunteering","community"],
  marketingDir:  ["newsletter","website","communications","ParentSquare"],
  devDir:        ["donations","giving","fundraising","development"],
  pedChair:      ["faculty","teaching","pedagogy"],
  adminChair:    ["administration","operations","office"],
  boardChair:    ["trustees","board of trustees","governance"]
};

/* Export nothing — this file is concatenated into the single-file
   build; all consts land in the page's shared data module. */
