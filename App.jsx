import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════
const T = {
  bg:"#05080A", bg1:"rgba(255,255,255,0.03)", bg2:"rgba(255,255,255,0.055)",
  border:"rgba(255,255,255,0.08)", borderHov:"rgba(0,255,179,0.35)",
  accent:"#00FFB3", accentDim:"rgba(0,255,179,0.15)",
  text:"#F0EDE8", sub:"#B8B0A8", muted:"#7A7470", dim:"#3A3632", faint:"#1E1C1A",
  mono:"'JetBrains Mono',monospace",
  head:"Georgia,'Times New Roman',serif",
  body:"system-ui,-apple-system,'Segoe UI',sans-serif",
  warn:"#FF6B6B", gold:"#FFB347", blue:"#00D4FF", purple:"#C77DFF",
};

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const PAPERS = [
  {id:1,num:"01",title:"The Foundation",sub:"What is a number, really?",color:T.accent,doi:"10.5281/zenodo.19697119",published:true,
   desc:"1 is the only complete unit. Zero is non-existence. Every number is a fraction of a declared reference — and that single claim restructures all of mathematics.",
   visual:"foundation",
   claims:[
     {t:"Every number is n/R",trad:"Numbers are abstract objects — points on an infinite real line. They exist independently of context.",urp:"Every number is a fraction of a declared reference R. 3 means nothing without 'three of what.' Remove the declared reference and you don't have a small number — you have nothing."},
     {t:"1 is the only complete whole",trad:"1 is just another number. It has no special structural status.",urp:"1 = n/R where n = R. The only value where measurement equals reference exactly. Complete wholeness. Every other number is a partial state or a count of completed wholes."},
     {t:"Zero is non-existence",trad:"0 is a number. You can add it, subtract it, compute with it freely.",urp:"0 is the absence of any declared reference. Not a small quantity — structural absence. The question 'what is 0 of something?' assumes a frame that 0 itself denies."},
     {t:"0/R is contextual depletion",trad:"There is only one kind of zero.",urp:"0/R: the frame R is declared and active, but the content within it has been fully exhausted. The container exists. The content is gone. Structurally different from non-existence."},
     {t:"Surplus: n/R > 1",trad:"Numbers greater than 1 simply have a larger value.",urp:"n > R means one complete declared whole has been achieved and a new R begins. 251 apples against a declared R of 250: one complete R, sealed, plus 1/250 of a new declared R."},
   ]},
  {id:2,num:"02",title:"Division",sub:"Declared partition, not reduction",color:T.blue,doi:"10.5281/zenodo.19733441",published:true,
   desc:"Division is not a shrinking operation. It is a structural description of how one quantity partitions into another declared reference — with exact consequences for what 0.333... actually means.",
   visual:"division",
   claims:[
     {t:"Division by zero is unconstructable",trad:"Division by zero is undefined — a rule students memorize without explanation.",urp:"Zero has no declared reference. You cannot divide by what doesn't exist as a frame. Not 'undefined' — unconstructable. The question itself has no structural foundation."},
     {t:"The fraction is the exact answer",trad:"1/3 = 0.333... — the decimal is the answer.",urp:"1/3 is the arrival. 0.333... is base-10 arithmetic struggling to represent it. The non-termination of the decimal is the signal of genuine irrational representation, not the answer."},
     {t:"Fractions are irreducible when irrational",trad:"Irrational numbers need decimal approximation — we accept imprecision.",urp:"arccos(1/3)/π is the exact answer. Its decimal approximation never terminates because the fraction is genuinely irrational relative to base-10. The fraction is more precise than any decimal."},
   ]},
  {id:3,num:"03",title:"Riemann Hypothesis",sub:"Why ½? Finally answered.",color:T.warn,doi:"10.5281/zenodo.19735713",published:true,
   desc:"165 years. Trillions of verified zeros. The question everyone asked but nobody answered: why exactly one-half? The URP gives a structural answer.",
   visual:"riemann",
   claims:[
     {t:"The critical strip IS the URP domain",trad:"The strip 0 < σ < 1 is a region of analytic continuation for the zeta function.",urp:"The strip is the domain of fractional reality. σ = 0 is non-existence. σ = 1 is complete wholeness. The zeta function operates entirely within the URP's fractional domain."},
     {t:"Zeros are 0/R depletion events",trad:"Zeros of ζ(s) are analytical zeros — points where the function value vanishes.",urp:"Not true zero — contextual depletion. The zeta function is analytic (non-zero derivative) at every zero. Frame persists, content momentarily exhausted. 0/R, not standalone zero."},
     {t:"½ is the only self-symmetric position",trad:"The functional equation maps σ to 1−σ. Zeros pair symmetrically. No deeper explanation given.",urp:"A zero off ½ creates two distinct depletion events in one declared frame. Two depletions require the frame to go negative — a deficit state. Deficit cannot serve as reference. Only ½ maps to itself: one event, self-symmetric, no deficit required."},
   ]},
  {id:4,num:"04",title:"Geometry",sub:"All measurement is a fraction of R",color:T.gold,doi:"10.5281/zenodo.19847459",published:true,
   desc:"π is not a strange constant — it's a bridge reference connecting two incommensurable domains. Every geometric formula, derived separately for centuries, follows from one structural declaration.",
   visual:"geometry",
   claims:[
     {t:"π is a bridge reference",trad:"π ≈ 3.14159... — a transcendental constant that appears mysteriously throughout mathematics.",urp:"π bridges the diameter domain to the circumference domain. C = π×d means π = R(bridge): the declared reference that translates between two incommensurable measurement frames."},
     {t:"Angles are fractions of R = 2π",trad:"The triangle angle sum theorem, polygon formulas — separate theorems requiring separate proofs.",urp:"Declare R = one full rotation = 2π. Every angle formula follows structurally. Triangle sum = ½R. Not theorems — consequences of a single declaration."},
     {t:"Pythagorean theorem is Step 2",trad:"a² + b² = c² — proved by Euclid via similar triangles. A fundamental theorem of geometry.",urp:"Declare R = hypotenuse. Step 1: sin θ = a/R, cos θ = b/R. Step 2: verify R persists: sin²θ + cos²θ = 1. The theorem is verification that the declared reference is preserved."},
   ]},
  {id:5,num:"05",title:"Physical Reality",sub:"The universe lives in (0,1)",color:T.purple,doi:"10.5281/zenodo.19853265",published:true,
   desc:"Binary. Fiber optics. Quantum mechanics. Thermodynamics. Seven fundamental domains of physics — all expressions of the same structural domain between non-existence and complete wholeness.",
   visual:"physics",
   claims:[
     {t:"Physical reality operates in (0,1)",trad:"Physical quantities range continuously from 0 to infinity. There's no upper bound.",urp:"Every physical quantity is n/R where R is a declared reference. The universe never reaches standalone zero — that would require a receiving frame of non-existence. Conservation laws are structural, not empirical."},
     {t:"Binary operates at domain boundaries",trad:"Binary is 0 and 1 — two arbitrary values chosen for engineering convenience.",urp:"Binary uses exactly the two extreme states of the URP domain: 0/R (contextual depletion) and R (complete wholeness). Classical computing is fundamentally boundary-only."},
     {t:"Quantum computing uses the full domain",trad:"Quantum computing is exponentially faster for certain problems. The reason is debated.",urp:"Quantum states exist throughout the full interior (0,1). Classical computers cannot natively represent partial states. Quantum advantage is structural: operating across the entire domain, not just its boundaries."},
   ]},
  {id:6,num:"06",title:"Algebra",sub:"Declared reference structures",color:T.accent,published:false,desc:"Groups, rings, fields reframed as reference structures. Why −1×−1=1. Euler's formula as Step 2 verification.",visual:"generic",claims:[{t:"−1×−1=1 is structural",trad:"Rule to memorize: negative times negative is positive.",urp:"Negation is movement away from R. Double negation returns to R. The rule follows from frame structure, not arithmetic convention."},{t:"Euler's formula is Step 2",trad:"e^(iπ)+1=0 — mysterious beautiful coincidence.",urp:"Rotating by π (half of R=2π) reaches the opposite of the starting reference. Adding 1 restores to 0. Frame completion. Not mysterious — structurally necessary."}]},
  {id:7,num:"07",title:"Goldbach",sub:"Primes always pair",color:T.blue,published:false,desc:"Every even number is the sum of two primes. Self-referencing positions find symmetry about the midpoint.",visual:"generic",claims:[{t:"Primes are self-referencing wholes",trad:"Primes have no factors other than 1 and themselves — a property of divisibility.",urp:"p/p = 1. Primes are their own declared reference. They cannot be expressed as n/R for any smaller R. Self-referencing is the structural definition of primeness."}]},
  {id:8,num:"08",title:"Navier-Stokes",sub:"Fluid motion without singularities",color:T.warn,published:false,desc:"The equations of fluid flow as declared reference conservation. Why smooth solutions must exist.",visual:"generic",claims:[{t:"Velocity cannot reach infinity",trad:"Navier-Stokes: velocity may blow up to infinity in finite time — the $1M open problem.",urp:"Velocity is n/R. Reaching infinity requires R=0 — unconstructable. The declared reference of the fluid system cannot reach non-existence from an existing state. Smooth solutions must exist."}]},
  {id:9,num:"09",title:"BSD Conjecture",sub:"Rational points on elliptic curves",color:T.gold,published:false,desc:"L-functions as generators of rational points.",visual:"generic",claims:[{t:"L(E,1)=0 is 0/R depletion",trad:"Birch and Swinnerton-Dyer: L(E,1)=0 iff rank ≥ 1. Numerical observation, unproven.",urp:"Contextual depletion at the declared reference point s=1 means infinitely many rational points as the frame seeks completion."}]},
  {id:10,num:"10",title:"P vs NP",sub:"Finding ≠ Checking",color:T.purple,published:false,desc:"Step 0 cannot be shortcut by Steps 1+2. P≠NP.",visual:"generic",claims:[{t:"Step 0 cannot be skipped",trad:"P vs NP: unknown whether polynomial-time solving equals polynomial-time checking.",urp:"Step 0 (declare R) is structurally prior to all computation. Checking verifies a declared answer. Finding must perform Step 0. These are different structural operations. P ≠ NP."}]},
  {id:11,num:"11",title:"Calculus",sub:"Approach without arrival",color:T.accent,published:false,desc:"Limits as approach-without-arrival.",visual:"generic",claims:[{t:"Limits are approach-without-arrival",trad:"The limit of f(x) as x→a equals L — formal ε-δ definition.",urp:"A limit approaches a declared reference without the variable arriving. The limit IS the declared reference. The variable is the process. Infinitesimals are approaches, never arrivals."}]},
  {id:12,num:"12",title:"Statistics",sub:"Declared denominators required",color:T.blue,published:false,desc:"Every statistic requires a declared reference. Undeclared R is the source of all statistical manipulation.",visual:"generic",claims:[{t:"Every statistic needs a declared R",trad:"Statistics are computed from data — the analysis speaks for itself.",urp:"Without a declared denominator R, any fraction is meaningless. '60% of people...' — 60% of which R? Undeclared R is the mechanism of every misleading statistic."}]},
  {id:13,num:"13",title:"Number Theory",sub:"Primes as self-referencing wholes",color:T.warn,published:false,desc:"Integers as counts of declared wholes. The Fundamental Theorem as a URP statement.",visual:"generic",claims:[{t:"Fundamental Theorem is a URP statement",trad:"Every integer factors uniquely into primes — an algebraic theorem.",urp:"Every integer is a product of self-referencing wholes. Each prime contributes an independent reference frame. The Euler product is the analytic form of this structure."}]},
  {id:14,num:"14",title:"Dehn Invariant",sub:"Scissors congruence & 0/R",color:T.gold,published:false,desc:"D(cube)=0 is 0/R — not non-existence. A structural prediction for dimensions ≥ 5 that is testable.",visual:"dehn",claims:[{t:"D(P)=0 is contextual depletion",trad:"D(cube)=0: algebraic result, rational angles vanish in the tensor product over ℚ.",urp:"The angle frame Rθ=π is always active for any polyhedron. D=0 means irrational content depleted to 0/Rθ. Frame present, content empty. Not non-existence."},{t:"New invariants at even dimensions ≥ 6",trad:"Dimensions ≥ 5: open since 1968. No structural progress.",urp:"Independent references for scissors congruence in dimension n: 1+⌊(n-2)/2⌋. Volume+D(P) sufficient through 5D. A new independent invariant is required at dimension 6. Testable against algebraic K-theory."}]},
  {id:15,num:"15",title:"Linear Algebra",sub:"Reference frame transformations",color:T.purple,published:false,desc:"Eigenvalues as self-referencing scalings.",visual:"generic",claims:[{t:"Eigenvalues are self-referencing scalings",trad:"Ax=λx — the eigenvalue equation defines special vectors.",urp:"An eigenvector maps to itself under transformation. λ is the n/R value of that self-reference. λ=1: vector is its own reference. λ=0: depletion."}]},
  {id:16,num:"16",title:"Topology",sub:"Declared neighborhood persistence",color:T.accent,published:false,desc:"Continuity as frame preservation.",visual:"generic",claims:[{t:"Continuity is frame preservation",trad:"Continuous functions: small input changes produce small output changes.",urp:"A continuous function preserves declared reference neighborhoods. The open set is the frame. Continuity = the frame is not torn. Discontinuity = a declared reference is violated."}]},
  {id:17,num:"17",title:"People's Edition",sub:"For everyone",color:T.accent,published:false,desc:"The complete framework in plain language. No equations required. For anyone who ever felt mathematics was withholding something.",visual:"generic",claims:[]},
];

const HISTORY=[
  {year:"c.300 BCE",name:"Euclid",era:"Ancient",color:"#C8A96E",contrib:"Axioms, proofs, geometry. Elements establishes deductive mathematics from first principles.",gap:"No framework for zero. Numbers are geometric magnitudes — ratios of lengths. Fractions exist but have no structural theory.",urp:"URP names what Euclid intuited: all measurement requires a declared reference (his 'unit'). His axioms ARE URP Step 0 applied to geometry. He was building the framework without knowing it."},
  {year:"c.628 CE",name:"Brahmagupta",era:"Medieval",color:"#E8A87C",contrib:"First mathematical rules for arithmetic with zero. Treats zero as a number, not just a placeholder.",gap:"Treats division by zero as yielding 0/0 or infinity — acknowledges the problem without resolving it structurally.",urp:"Division by zero is unconstructable, not undefined or infinite. Brahmagupta sensed the wall but couldn't explain why it exists. He needed the concept of a declared reference."},
  {year:"1202",name:"Fibonacci",era:"Medieval",color:"#D4B896",contrib:"Introduces Hindu-Arabic numerals to Europe. Zero as a computational placeholder that enables positional notation.",gap:"Zero as placeholder only — useful but structurally unexplained.",urp:"The placeholder zero is exactly 0/R: the positional frame exists, the content is empty. Fibonacci was using the concept correctly without naming the structure."},
  {year:"1637",name:"Descartes",era:"Early Modern",color:"#7EB8C9",contrib:"Coordinate geometry. Unites algebra and geometry. Extends numbers to negatives.",gap:"Negative numbers as 'below zero' — direction without structural explanation. What does it mean to have less than nothing?",urp:"Negatives are movement away from R. Not below zero — a declared opposite direction from the reference. The deficit state. Structurally motivated, not just defined by rule."},
  {year:"1665",name:"Newton & Leibniz",era:"Scientific Revolution",color:"#88C9A8",contrib:"Calculus. Limits, derivatives, integrals. Infinitesimals. The language of motion and change.",gap:"Infinitesimals are logically incoherent — 'ghosts of departed quantities' (Bishop Berkeley). Division by dx: what is dx, exactly?",urp:"dx is approach-without-arrival. The derivative is the instantaneous n/R rate. The limit IS the declared reference. Infinitesimals are processes, not quantities — approaches without arrivals."},
  {year:"1859",name:"Riemann",era:"19th Century",color:"#A888C9",contrib:"Riemann Hypothesis. Zeta function. Prime number distribution. Critical strip 0<σ<1.",gap:"Why ½? Riemann observed that all zeros appear on the line σ=½ but never explained why that specific line. Left it as a conjecture.",urp:"The critical strip IS the URP domain (0,1). Zeros are 0/R events. ½ is the only self-symmetric position — the only point that maps to itself under the functional equation without creating a deficit."},
  {year:"1874",name:"Cantor",era:"19th Century",color:"#C988A8",contrib:"Set theory. Infinite cardinalities. ℵ₀, ℵ₁ — there are different sizes of infinity.",gap:"Paradoxes (Russell's). Infinity treated as a completed object. What does it mean to 'arrive at' infinity?",urp:"Infinity is approach-without-arrival. ∞ is not a declared reference — it is the direction of unbounded approach. Treating the approach as an arrival is the source of every set-theoretic paradox."},
  {year:"1900",name:"Hilbert",era:"20th Century",color:"#88A8C9",contrib:"23 problems shaping 20th century mathematics. Hilbert's Third: can equal-volume polyhedra always be cut and reassembled?",gap:"Couldn't explain why volume alone is insufficient for scissors congruence. Needed a second invariant but had no structural reason for its existence.",urp:"Scissors congruence requires ALL declared reference frames to match — volume AND angle references independently. Hilbert's Third is a reference structure problem. The Dehn invariant exists because it captures the angle frame."},
  {year:"1901",name:"Dehn",era:"20th Century",color:"#8BA888",contrib:"Solved Hilbert's Third in one year. Dehn invariant: a second invariant beyond volume that distinguishes scissors-non-congruent polyhedra.",gap:"Why does the Dehn invariant work? Why do rational dihedral angles vanish and irrational ones persist? No structural explanation — it works, but why?",urp:"Rational angles are complete fractions of Rθ=π — their irrational content depletes to 0/Rθ under any scissors operation. Irrational angles are irreducible within the declared reference — they persist. Dehn found the invariant. URP explains why it has to exist."},
  {year:"1931",name:"Gödel",era:"20th Century",color:"#C9A888",contrib:"Incompleteness theorems. Any sufficient formal system contains true statements it cannot prove.",gap:"Incompleteness treated as a fundamental ceiling — mathematics is necessarily incomplete. No deeper structural explanation offered.",urp:"Unprovable true statements are statements about declared references the formal system hasn't declared. Incompleteness is a frame problem: the system lacks the Step 0 declarations needed to reach certain truths."},
  {year:"1948",name:"Shannon",era:"Modern",color:"#88C9C9",contrib:"Information theory. Entropy. The bit. Mathematical foundation of all digital communication.",gap:"The bit is defined operationally (0 or 1). No structural explanation of why binary specifically, or why two states.",urp:"Binary operates at exactly the two extreme states of the URP domain: 0/R (depleted) and R (complete). Shannon entropy is a URP measurement of expected depletion across a declared reference set. The bit is structurally motivated."},
  {year:"1965",name:"Sydler",era:"Modern",color:"#A8C988",contrib:"Proved volume + Dehn invariant are sufficient for scissors congruence in 3D. Completed what Dehn started.",gap:"Sufficiency proof does not extend beyond 4D. Open in 5 dimensions and above since 1968.",urp:"URP formula: independent references for scissors congruence in dimension n = 1+⌊(n-2)/2⌋. New invariants emerge at even dimensions ≥ 6. A testable structural prediction."},
  {year:"1982",name:"Feynman",era:"Modern",color:"#C9C988",contrib:"Proposed quantum computing. Argued quantum systems require quantum computers to simulate efficiently.",gap:"Why exactly can't classical computers simulate quantum systems? The answer 'exponential overhead' describes the problem without explaining the cause.",urp:"Classical computing is boundary-only: 0/R and R. Quantum systems inhabit the full interior (0,1). Classical computers cannot natively represent partial states. The simulation overhead is the cost of approximating a continuous domain with boundary points."},
  {year:"2026",name:"Brogley",era:"Contemporary",color:T.accent,contrib:"Unitary Reference Principle. Every number is n/R. The structural framework underlying all of mathematics.",gap:"—",urp:"Every number is n/R. 0 is non-existence. 0/R is contextual depletion. 1 is complete wholeness. Surplus: n/R > 1 initiates a new declared reference. The framework that completes what every mathematician above was building."},
];

const BLOGS=[
  {id:1,date:"April 22, 2026",readTime:"5 min",tag:"FOUNDATIONS",tagColor:T.accent,
   title:"Division by Zero Is Not 'Undefined' — It's Unconstructable",
   sub:"Your math teacher wasn't wrong. But the reason they gave wasn't quite right. There's a deeper explanation that changes how you see every equation you've ever written.",
   pullQuote:"You cannot divide by what doesn't exist as a frame. It's not a rule. It's a structural impossibility written into the nature of quantity itself.",
   sections:[
     {h:"The Wall Every Student Hits",b:"There's a moment in every student's mathematical education where the teacher writes something on the board, gives a rule, and moves on. For most of us, that moment involves division by zero. '5 ÷ 0 is undefined,' the teacher says. 'Don't do it. It just is.' And most students, being sensible, accept this and move on. But the answer has always felt incomplete. Not wrong — the teacher isn't wrong, the result really is problematic — but incomplete. 'Undefined' sounds like a gap in the map. Like we've reached the edge of what mathematics has bothered to define yet. Like someone could, in principle, define it, they just haven't gotten around to it. That unease is legitimate. The reason 'undefined' never fully satisfies is that it is an administrative answer to a structural question."},
     {h:"What a Declared Reference Actually Is",b:"To understand why division by zero is not merely 'undefined' but structurally unconstructable, you first have to understand what the Unitary Reference Principle proposes about the nature of numbers themselves. The central claim is simple but far-reaching: every meaningful quantity is a fraction of a declared reference. When you say '3 apples,' the number 3 only means something because there is an implicit declared reference — one apple. 3/R where R = one apple. When you say '60 miles per hour,' the 60 only means something because there is a declared reference of one hour and one mile. Remove the declared reference and you don't have a smaller number. You have nothing — no measurement, no meaning. This is the Unitary Reference Principle in its most compact form: n/R is the minimum unit of meaningful quantity. The denominator R is not optional. It is what makes the number a number."},
     {h:"Why Zero Cannot Be a Reference",b:"Now apply this to division. Division asks: how many times does the divisor fit into the dividend? Or more precisely under the URP: what fraction is the dividend of the divisor as a declared reference? When you calculate 12 ÷ 4, you are declaring R = 4 and asking how many times R fits into 12. The answer is 3 — three complete declared references. When you try to calculate 12 ÷ 0, you are attempting to declare R = 0. But zero, under the URP, is not a quantity. Zero is the absence of any declared reference. Zero is non-existence. You cannot declare non-existence as your reference frame. There is no frame to divide into. The operation is not undefined — meaning we haven't gotten around to defining it. The operation is unconstructable — meaning the conditions required for the operation to exist are not met, and cannot be met, structurally."},
     {h:"The Difference Between Undefined and Unconstructable",b:"This distinction matters more than it might first appear. 'Undefined' implies a missing definition. Mathematics could, in principle, assign a value. Some systems do — IEEE floating point arithmetic returns 'infinity' or 'NaN' for division by zero, as a pragmatic engineering choice. But these are workarounds, not answers. 'Unconstructable' implies a structural barrier. It says: the question itself requests something that cannot exist. Not because we haven't thought about it hard enough. Because the request is incoherent at the foundational level. The reason this matters is that 'undefined' invites students to treat division by zero as an oddity, a special case to memorize, a rule without reason. 'Unconstructable' invites them to ask: what does this reveal about the nature of division, and the nature of zero? And the answer to that question — the URP answer — is that every operation requires a declared reference, and zero cannot be one."},
     {h:"What This Reveals About Zero Itself",b:"The Unitary Reference Principle also distinguishes between two kinds of zero that conventional mathematics treats as one. True zero — standalone zero — is non-existence: no declared reference was ever established. But there is a second kind of zero that appears constantly in real measurement: 0/R, which the URP calls contextual depletion. The frame R is declared and active. The content within it has been fully exhausted. The container exists. The content is gone. An empty bank account is not the same as no bank account. A fully discharged battery is not the same as no battery. A signal that has been fully attenuated is not the same as no signal. These are 0/R states: the frame persists, the content is zero. When you encounter 'zero' in the real world, it is almost always 0/R, not non-existence. The two are structurally different. Conflating them — treating the empty bank account as if the account itself doesn't exist — is the source of a surprising number of mathematical and conceptual errors. Division by zero fails because you cannot declare non-existence as a reference. Division by 0/R — zero content within an active frame — is a different matter, and behaves differently. The URP makes this distinction precise."},
     {h:"Why This Should Be Taught From the Start",b:"None of this makes mathematics harder. In many ways it makes it simpler. When a student is told 'division by zero is undefined, memorize the rule,' they receive a fact with no explanation. When they are told 'division requires a declared reference, and zero has no reference to declare,' they receive a reason. Reasons are stickier than rules. Reasons connect to other things. The reason division by zero is unconstructable is the same reason that every measurement requires a unit, the same reason that probability is always between 0 and 1, the same reason that the Riemann Hypothesis's zeros sit at exactly one-half. It all traces to the same structural claim. That claim is what the Unitary Reference Principle proposes. Not as a replacement for conventional mathematics, which gets the right answers. But as a structural explanation for why mathematics gets those answers — and why the ones it can't get are structured the way they are."},
   ]},
  {id:2,date:"April 24, 2026",readTime:"6 min",tag:"NUMBER THEORY",tagColor:T.blue,
   title:"Does 0.999... Really Equal 1? The Question Is More Important Than the Answer.",
   sub:"Millions of people have seen the algebraic proof. Millions still don't believe it. This isn't irrationality — it's a correct intuition that conventional mathematics cannot fully address. The URP can.",
   pullQuote:"1 is a destination. 0.999... is a journey. They are not the same thing, and the proof that says they are hides an assumption that deserves scrutiny.",
   sections:[
     {h:"The Proof That Doesn't Convince",b:"The standard algebraic proof of 0.999... = 1 goes like this. Let x = 0.999... Multiply both sides by 10: 10x = 9.999... Subtract the first equation from the second: 9x = 9. Divide by 9: x = 1. Therefore 0.999... = 1. The logic is valid. The algebra is correct. And yet, when this proof is presented in classrooms and across the internet, the response is consistently split. Some people find it immediately convincing. Many do not. The doubters are often told they are being irrational, that they don't understand limits, that they are making a philosophical objection to a mathematical fact. But the doubters are not wrong to feel something is being glossed over. They are sensing a genuine assumption buried inside the proof, and the Unitary Reference Principle gives that assumption a name."},
     {h:"The Hidden Assumption",b:"The proof assumes, at its first step, that 0.999... is a completed value — a fixed, determinate quantity that occupies a specific position on the number line. It treats '0.999...' as if it were a number in the same sense that '3' or '1/2' or 'π' are numbers: objects with stable identities that can be manipulated algebraically. But 0.999... is not a number in that sense. It is a process. It is base-10 arithmetic running indefinitely, generating nines, never terminating. The ellipsis '...' is not decoration. It is telling you that the sequence has not ended. The proof treats the destination as if it were already reached. Under the Unitary Reference Principle, approach and arrival are structurally different operations. They are not equivalent. They cannot simply be assumed to be equivalent without argument."},
     {h:"What the Fraction Is",b:"The URP offers a precise way to think about this. The fraction 1/3 is the exact answer to the question 'one divided into three equal parts.' It is not an approximation. It is not a process. It is a declared relationship between a numerator and a denominator — a complete, static mathematical object. The decimal 0.333... is something entirely different: it is what base-10 arithmetic produces when it tries to represent 1/3 in positional decimal notation. Base-10 cannot represent 1/3 exactly. So it generates an infinite sequence of 3s that approaches the correct value asymptotically but never arrives. The non-termination of the decimal is not a property of the number 1/3. It is a property of base-10 arithmetic's inability to express 1/3. The fraction is more precise than the decimal, not less. The fraction is the arrival. The decimal is the journey."},
     {h:"Approach and Arrival Are Structurally Different",b:"This distinction — between approach and arrival — runs throughout the URP and appears in several of the series papers. In calculus, it is the distinction between a limit (the reference being approached) and the variable (which approaches but does not arrive). In the Riemann Hypothesis, it is the distinction between a zero of the zeta function (a 0/R depletion event) and true non-existence. In physical reality, it is the structural reason conservation laws exist: a physical quantity can approach zero indefinitely but cannot reach standalone non-existence, because reaching it would require a receiving frame of non-existence — which cannot be declared. The 0.999... question touches all of this. The question is not really about whether 0.999... equals 1. The question is: when you say two mathematical expressions are equal, what do you mean? Are you saying they describe the same static object? Or are you saying one process converges to one value? These are different claims. The proof conflates them."},
     {h:"What the URP Proposes Instead",b:"The URP does not claim that 0.999... = 1 is false. Depending on how you define equality and limits, it is formally true within standard real analysis. What the URP claims is that the proof reveals a structural distinction that conventional mathematics does not make explicit. When we say 1/3 = 0.333..., we are making a claim about equivalence of representation — the fraction and the decimal represent the same quantity. When we say 0.999... = 1, we are making a similar claim. And it is true in the limiting sense: the sequence of partial sums 0.9, 0.99, 0.999... converges to 1. The limit is 1. But the sequence itself — the process — is not 1. It approaches 1. The distinction between 'the limit of the sequence' and 'the sequence' is what the doubters are sensing, and they are not wrong to sense it. The URP's contribution is to give this distinction a name, a framework, and a place in a larger structural account of what numbers are."},
     {h:"Why Any of This Matters",b:"You might reasonably ask: if the conventional answer is formally correct, why does it matter whether we make this distinction? It matters because mathematical intuition is not noise. When millions of people look at a valid proof and feel it is missing something, that feeling is data. It is evidence that the proof is working harder than it needs to, that it is smuggling in an assumption rather than making it explicit. The history of mathematics is full of cases where popular unease about a formal result turned out to be tracking a genuine structural issue — one that later demanded attention. The URP proposes that the 0.999... discomfort is tracking exactly this: the distinction between a process and its limit, between approach and arrival, between the journey and the destination. That distinction, once named, connects to everything from the foundations of calculus to the structure of physical conservation laws. The question 'does 0.999... equal 1' is far more interesting than its answer."},
   ]},
  {id:3,date:"April 26, 2026",readTime:"7 min",tag:"MILLENNIUM PROBLEMS",tagColor:T.warn,
   title:"The Riemann Hypothesis: Why Nobody Could Answer 'Why Exactly One-Half?'",
   sub:"165 years. Ten trillion verified zeros. The most famous unsolved problem in mathematics. The question everyone asked but nobody could answer. The URP proposes a structural answer.",
   pullQuote:"Only ½ maps to itself under the symmetry of the functional equation. One depletion event. Self-symmetric. No deficit required. Structurally forced.",
   sections:[
     {h:"The Most Expensive Unsolved Problem in Mathematics",b:"In 2000, the Clay Mathematics Institute listed seven 'Millennium Prize Problems' — unsolved problems in mathematics so important that they offered one million dollars for each solution. One of them has stood unanswered since 1859. That's not a typo. The Riemann Hypothesis is 167 years old, has resisted the efforts of the greatest mathematical minds of the 19th, 20th, and 21st centuries, and has accumulated more than ten trillion pieces of computational evidence in its favor — every single one confirming the hypothesis without proving it. This is unusual in mathematics. Most unsolved problems are simply hard. The Riemann Hypothesis is hard and strange. The strangeness is this: everyone can see that it appears to be true. The pattern is unmistakable. Ten trillion examples is not a coincidence. And yet nobody can explain why it is true. More specifically, nobody has been able to answer the deceptively simple question at its heart: why exactly one-half?"},
     {h:"What Riemann Actually Found",b:"In 1859, Bernhard Riemann published a paper on the distribution of prime numbers. To understand why primes thin out as numbers get larger — why there are 25 primes below 100 but only 21 primes between 100 and 200 — he developed a complex-valued function now called the Riemann zeta function. The function takes a complex number s = σ + it as input, where σ is the real part and t is the imaginary part. Riemann's function has what are called 'non-trivial zeros' — input values where the function equals zero. These zeros lie somewhere in the vertical strip of the complex plane where the real part σ is between 0 and 1. Riemann observed that all the zeros he could compute appeared to have real part exactly equal to one-half. He conjectured this was always true. That conjecture — that all non-trivial zeros lie on the line σ = 1/2 — is the Riemann Hypothesis. The question is: why one-half? What is special about exactly that value?"},
     {h:"The Critical Strip Is the URP Domain",b:"The first observation the Unitary Reference Principle makes about the Riemann Hypothesis is about the strip itself, not just the zeros. The strip 0 < σ < 1 is, under the URP, not an arbitrary region of analytic continuation. It is the domain of fractional reality. σ = 0, the left boundary, is non-existence under the URP — the absence of any declared reference. σ = 1, the right boundary, is complete wholeness — the declared reference fully achieved. Every value strictly between 0 and 1 is a partial state: some fraction of a declared reference, the normal condition of all real measurement. The zeta function operates entirely within this domain for its non-trivial zeros. This is not a coincidence under the URP. The zeta function is, in some structural sense, a function about partial states — about what happens between non-existence and complete wholeness. Its zeros appear in the domain of partial states because that is the domain they belong to."},
     {h:"What a Zero of the Zeta Function Actually Is",b:"Conventional mathematics describes a zero of the Riemann zeta function as a point where ζ(s) = 0 — an analytic zero, a point where the function's value vanishes. The URP proposes a different description. Under the URP, the zeros are 0/R depletion events. The zeta function's frame — its analytic structure, its derivative, its continuation — persists at every zero. The function is analytic at its zeros, meaning it has a well-defined non-zero derivative there. The function value momentarily reaches zero, but the function itself — the frame — persists. This is precisely the URP's definition of 0/R: the frame is present and active, but the content within it has been momentarily exhausted. The distinction matters because it explains why the zeros cannot be true non-existence. At a genuine non-existence point, the function would not be analytic — the frame would not persist. But the zeta function's zeros are analytic. The frame persists. The content is depleted. They are 0/R events, not standalone zeros."},
     {h:"Why ½? The Structural Answer",b:"Now the key question: why must these 0/R depletion events occur at σ = 1/2? The Riemann zeta function satisfies what is called a functional equation: a symmetry that relates ζ(s) to ζ(1-s). This equation maps σ to 1-σ: whatever happens at real part σ has a corresponding, symmetric event at real part 1-σ. When there is a zero at σ, the functional equation implies there is a corresponding zero at 1-σ. These zeros are symmetric partners. Now consider what happens if a zero occurs at σ ≠ 1/2. The symmetry creates a partner zero at 1-σ, which is a different value. There are now two distinct zeros — two distinct 0/R depletion events — in the same declared frame, at different positions. Under the URP, two depletion events in the same declared frame require the frame to accommodate both. But accommodating two distinct depletions in a fractional domain forces the frame into a deficit state — a state where n/R < 0, below the declared domain. A deficit state cannot serve as a declared reference. The reference structure breaks."},
     {h:"Only ½ Maps to Itself",b:"The only value of σ where the functional equation does not create a distinct partner is σ = 1/2. At exactly one-half, the symmetry maps σ to 1-σ = 1/2. The zero maps to itself. There is one depletion event, not two. One depletion event in a declared frame does not require a deficit state. The reference structure is maintained. The frame persists. This is the structural answer the URP proposes: zeros must occur at σ = 1/2 because it is the only position in the critical strip where a 0/R depletion event is self-symmetric under the functional equation — where the depletion does not create a distinct partner requiring a deficit. At any other position, the symmetry would create two depletions, force a deficit, and break the declared reference structure. The Riemann Hypothesis is, under this reading, a statement about the structural stability of declared references in the fractional domain."},
     {h:"Why This Is a Proposal, Not a Proof",b:"It is important to be clear about what the URP offers here. This is a structural argument — a proposed explanation for why the Riemann Hypothesis should be true. It is not a formal mathematical proof in the conventional sense. A proof would require establishing precise connections between the URP's structural claims and the analytic properties of the zeta function in rigorous mathematical terms. That work is ongoing and is part of what the paper series is building toward. What the URP offers right now is something that has been absent from the Riemann Hypothesis literature for 167 years: a conceptual answer to 'why one-half?' Not just 'the functional equation forces it' — which is observation, not explanation — but a structural reason why the symmetry of the functional equation produces exactly this constraint. The URP's answer is: because the fractional domain has only one self-symmetric point, and that point is the only position where a depletion event can occur without creating a deficit. Whether that structural argument can be made rigorous is the open question. The argument itself has been absent."},
   ]},

  {id:4,date:"April 28, 2026",readTime:"7 min",tag:"FOUNDATIONS",tagColor:T.accent,
   title:"What Is a Number? A Question Mathematics Has Never Fully Answered",
   sub:"We use numbers every day. We have done so since childhood. But ask a mathematician what a number actually is, and the answer is surprisingly unsatisfying. The Unitary Reference Principle proposes a structural definition.",
   seoQueries:["what is a number in mathematics","definition of a number","what does a number mean","why do numbers need context","number theory foundations"],
   doi:"10.5281/zenodo.19697119",
   pullQuote:"Remove the declared reference and you don't have a smaller number. You have nothing. n/R is the minimum unit of meaningful quantity.",
   sections:[
     {h:"The Question Nobody Asks",b:"What is a number? Most of us learned what numbers do long before we asked what they are. We learned to count, to add, to multiply, to measure. Numbers were tools, and useful ones. The question of what a number fundamentally is — what gives it meaning, what makes it more than an abstract symbol — tends to get deferred. Mathematicians speak of numbers as elements of sets, as points on the real line, as abstract objects satisfying certain axioms. These are formally rigorous answers. They are also, in a certain sense, evasions. They tell you what operations you can perform on numbers. They do not tell you what a number means."},
     {h:"The Conventional Answer and Its Limits",b:"The standard mathematical answer to 'what is a number' goes something like this: a number is an abstract object. The real numbers form a complete ordered field. The natural numbers can be constructed from set theory using the Peano axioms. These are correct and powerful frameworks. But they have a curious property: they describe numbers in terms of their relationships to other numbers, and their formal properties. The number 3 is the successor of 2, the predecessor of 4, the result of adding 1 three times. What 3 means — what it refers to in the world — is treated as outside the scope of mathematics. Mathematics, on this view, is a formal game played with abstract symbols. Meaning is somebody else's problem."},
     {h:"The URP Definition",b:"The Unitary Reference Principle proposes a different answer. A number is a fraction of a declared reference. Written formally: every meaningful quantity Q = n/R, where R is the declared reference unit and n is the measured quantity. The number 3 only means something because there is an implicit declaration: R = one apple, one kilometre, one dollar, one second. Without that declaration, 3 is not a small number. It is no number at all — it is a symbol without referent. This is not a radical claim. It is, in a certain sense, what everyone implicitly knows when they use numbers. 3 apples, 3 kilometres, 3 hours — the 3 has meaning because the unit is declared. The URP makes this explicit and structural, and then asks: what follows from taking it seriously as a foundational definition?"},
     {h:"The Axiom: n/R Is the Minimum Unit of Meaning",b:"The first axiom of the Unitary Reference Principle states: every meaningful quantity is a fraction of a declared reference R. This has several immediate consequences. First, no number is meaningful without a declared R. Writing '7' without context is like writing a fraction with no denominator. Second, the number 1 acquires a special status: it is the unique value where n = R, where the measurement exactly equals the declared reference. 1 is complete wholeness — not just a number, but the state of complete coincidence between measurement and reference. Third, numbers greater than 1 are not single wholes but counts of completed reference frames. 7 is seven complete 1-unit references, stacked. Fourth, zero requires careful treatment, which the URP provides by distinguishing two structurally different zeros."},
     {h:"What This Changes",b:"Taking n/R seriously as the definition of a number restructures many things that conventional mathematics treats separately. The unit — the declared reference R — is not a tag you add after the mathematics. It is constitutive of the mathematics. The arithmetic of fractions, the behaviour of limits, the structure of the number line, the meaning of zero, the properties of integers — all of these follow from the structure of n/R in ways that the URP papers develop in detail. Perhaps most importantly, it changes what it means for two quantities to be equal. 3/4 and 6/8 are equal because they express the same fraction of any declared reference. 0.999... and 1 are not equal in the same sense — one is a process, one is an arrival — a distinction the URP formalises and that conventional mathematics glosses over. The definition n/R is simple. What follows from it is not."},
     {h:"Proof: 1 Is the Only Complete Whole",b:"This follows directly from the definition. Within any declared reference R, the only value where the measured quantity n exactly equals R is n/R = 1. For any n < R, we have n/R < 1: a partial state. For any n > R, we have n/R > 1: a surplus, which initiates a new declared reference (see below). The value 1 = n/R where n = R is the unique completion state. Formally: let R be any declared reference unit. Then the set of values n/R for n ∈ [0, ∞) contains exactly one value equal to 1, occurring at n = R. All values below R yield partial states in (0,1). All values above R yield surplus states initiating new declared references. QED. The integer 7 is not one whole thing. It is seven complete 1-unit references, concatenated. The 'wholeness' is always the unit, always 1, always relative to the declared R."},
   ]},
  {id:5,date:"April 28, 2026",readTime:"7 min",tag:"FOUNDATIONS",tagColor:T.accent,
   title:"Is Zero a Number? The Two Zeros Mathematics Has Always Conflated",
   sub:"Mathematicians treat zero as a number like any other. But zero behaves strangely in ways that have puzzled everyone from Brahmagupta to modern analysts. The URP explains why: there are actually two structurally different zeros, and conflating them is the source of centuries of confusion.",
   seoQueries:["is zero a number","what does zero mean in mathematics","why is zero special","history of zero in math","is zero nothing or a number","what is an empty set"],
   doi:"10.5281/zenodo.19697119",
   pullQuote:"An empty bank account is not the same as no bank account. Mathematics has one symbol for both. That is the problem.",
   sections:[
     {h:"Zero's Strange History",b:"Zero has a more complicated history than any other number. The ancient Greeks resisted it — Aristotle argued against it on philosophical grounds. Indian mathematicians formalised it in the 7th century. Brahmagupta gave the first rules for computing with zero in 628 CE. Fibonacci brought it to Europe in 1202. Yet even today, zero causes problems that no other number causes. Division by zero is undefined. Zero to the power of zero is debated. The limit of functions as they approach zero requires careful handling that other limits don't. These are not coincidences. They are symptoms of a structural issue that the URP makes explicit."},
     {h:"The Two Zeros",b:"The Unitary Reference Principle distinguishes two structurally different zeros. The first is standalone zero, or non-existence: no declared reference was ever established. This zero is outside all declared domains. It is not a value in any frame — it is the absence of any frame. The second is 0/R, or contextual depletion: the frame R is declared and active, but the content within it has been fully exhausted. The reference persists. The content is zero. An empty bank account: the account (frame R) exists. The balance (content) is zero. A fully discharged battery: the battery (frame R) exists. The charge (content) is zero. A dark fiber optic cable: the channel (frame R) is present. The signal (content) is 0/R. These are 0/R states. The frame persists. The content is depleted."},
     {h:"Why the Distinction Matters",b:"Conflating these two zeros — treating non-existence and contextual depletion as the same thing — produces real errors. Division by zero: you cannot declare non-existence as a reference R, because there is no frame. Division by 0/R — zero content within an active frame — is a different matter. The empty account still has an account number; you can still make deposits. The discharged battery still has terminals; you can still charge it. The frame's persistence is what makes these operations possible. In information theory, a signal of zero amplitude is not the same as no signal channel — the channel capacity persists as a declared R, and a zero-amplitude signal is 0/R within that channel. In quantum mechanics, a state with probability amplitude zero is not the same as a non-existent state — the state vector persists, the amplitude is 0/R. In thermodynamics, a system at absolute zero temperature is not non-existence — the system persists, the thermal energy is 0/R."},
     {h:"Brahmagupta Was Right to Distinguish",b:"Brahmagupta's 7th-century rules for zero included the troubling statement that 0 ÷ 0 = 0. This has been criticised as an error. But Brahmagupta was working with a notion of zero that was closer to 0/R — placeholder zero, contextual zero — than to non-existence. He was asking: if you have zero of something divided into zero parts, what do you get? His answer was zero. This is not correct in the non-existence sense (dividing non-existence by non-existence is still unconstructable). But it is closer to correct in the 0/R sense: if your frame has zero content and you are distributing it into zero subframes, the result is a similar depletion state. Brahmagupta was not wrong — he was working with the wrong zero, or rather, with only one zero where two were needed."},
     {h:"Formal Statement: The Two Zeros",b:"Let R be a declared reference. Then: (1) Non-existence zero, written 0, means R has not been declared. There is no frame. No operation that requires a frame (including division) can be performed. (2) Contextual depletion, written 0/R, means R has been declared and is active, but the measured quantity n = 0. The frame persists. Operations that require the frame (including the prospect of future content) remain meaningful. The distinction can be stated formally: 0 ∉ Domain(R) for any R. But 0/R ∈ [0/R, R] for any declared R. The value 0/R is the lower boundary of the URP domain — the depletion state of a declared reference. It is not the same as the absence of any reference. This is the structural distinction that Brahmagupta, Fibonacci, and every mathematician since has been working around without naming."},
     {h:"Implications Across Mathematics",b:"The two-zeros distinction has implications that reach throughout the papers in this series. Division by zero is unconstructable because it requires declaring non-existence as a reference — not because it produces an inconveniently large result (Paper 2). The critical strip of the Riemann Hypothesis is the URP domain (0/R, R), bounded by the two zeros on either side — non-existence at σ = 0, complete wholeness at σ = 1 (Paper 3). Physical conservation laws are structural: a physical quantity can approach 0/R indefinitely but cannot reach standalone zero because that would require a receiving frame of non-existence (Paper 5). The Dehn invariant for a cube is D(cube) = 0/Rθ — the angle frame persists, the irrational content is depleted — and this is why D = 0 does not mean the angle reference doesn't exist (Paper 4). The two zeros distinguish what is empty from what is absent. That distinction is foundational."},
   ]},
  {id:6,date:"April 28, 2026",readTime:"8 min",tag:"FOUNDATIONS",tagColor:T.accent,
   title:"Why Is 1 the Only Whole Number? The URP Answer to a Question Nobody Thought to Ask",
   sub:"We call 1, 2, 3, 4... the 'whole numbers.' But only one of them is structurally whole. The rest are counts. This distinction, once seen, changes how you understand every integer you have ever used.",
   seoQueries:["why is 1 special in mathematics","what makes a whole number whole","is 1 a natural number","what is the number 1","why is 1 not prime","mathematical definition of whole"],
   doi:"10.5281/zenodo.19697119",
   pullQuote:"Seven is not one whole thing. It is seven completed reference frames, stacked. The wholeness is always in the unit.",
   sections:[
     {h:"The Terminology We Never Questioned",b:"In school mathematics, the whole numbers are 0, 1, 2, 3, 4, and so on. The name suggests they are all equally 'whole.' We rarely stop to ask why they are called that, or whether the name is accurate, or what 'whole' would even mean for a number. The Unitary Reference Principle asks exactly this question, and the answer it gives is precise and surprising: within any declared reference frame, exactly one value is a complete whole. That value is 1. The number 7, by contrast, is not one whole thing. It is seven completed wholes — seven instances of the unit, counted. The 'wholeness' belongs to the unit, not to the count. This is more than a terminological point. It is a claim about the structure of quantity itself."},
     {h:"The Definition of Complete Wholeness",b:"The URP defines complete wholeness precisely. Within a declared reference R, a quantity Q = n/R is a complete whole if and only if n = R — that is, if Q = 1. This is the unique state where the measured quantity exactly equals the declared reference. The measurement arrives at the reference. The frame is filled. Nothing is missing, nothing overflows. Formally: for any declared reference R and any quantity n, n/R = 1 if and only if n = R. No other value in the URP domain has this property. For n < R, we have Q < 1: partial. For n > R, we have Q > 1: surplus. For n = 0, we have Q = 0/R: depleted. Only n = R gives Q = 1: complete. The completeness of 1 is not a convention or a definition chosen for convenience. It follows from the structure of n/R."},
     {h:"What Are the Integers, Then?",b:"If 1 is the only complete whole within a declared reference, what are 2, 3, 7, 1000? The URP answer: they are counts of completed reference frames. The integer 7 means: seven complete instances of the declared unit R, concatenated. 7 = 7/R where each of the 7 numerator units is itself a complete R. The integer is a count of wholeness, not a single wholeness. This reframes what the integers are. They are not a sequence of objects of increasing size sitting on a line. They are records of how many times a declared reference has been completed. 1 kilometre: one complete distance-reference. 7 kilometres: seven complete distance-references. The 7 doesn't refer to a single 7-km thing. It refers to seven 1-km things. The unit — the declared R — is the whole. The integer is the count."},
     {h:"Why 1 Is Not a Prime Number — Revisited",b:"Mathematicians define prime numbers as natural numbers greater than 1 that have no positive divisors other than 1 and themselves. The number 1 is explicitly excluded. The conventional reason: if 1 were prime, the Fundamental Theorem of Arithmetic (every integer has a unique prime factorisation) would fail, because you could multiply by 1 arbitrarily many times. But this is a consequence, not a reason. The URP offers a structural reason: 1 cannot be prime because it is not a counting unit in the sense primes are. Primes are self-referencing wholes: p/p = 1, and no smaller R satisfies this. They cannot be expressed as n/R for any R smaller than themselves. But 1 is not self-referencing in the same sense — it is the declared reference itself, not a structure built from smaller references. 1 is the unit of measurement. Primes are the indivisible units of counting. These are different structural roles."},
     {h:"The Surplus State and New Declared References",b:"When n > R — when the measured quantity exceeds the declared reference — the URP describes this as a surplus state, and it requires a new declared reference. 251 apples against a declared R of 250: the 250 constitute one complete R, sealed. The extra 1 begins a new R₂. This is the structural meaning of integers greater than 1: they are not single quantities larger than 1. They are sequences of completed references. 251 = 1 complete R₁ + 1/250 of R₂. Or, declaring R = 1 apple, 251 = 251 complete unit references. The integer representation depends on the declared R. Change R and the integer representation changes. The underlying quantity — 251 apples — does not change. Only the way it is partitioned into complete and partial references changes. The wholeness is always in the unit. The count is always relative to the declared R."},
     {h:"Mathematical Implications",b:"Treating 1 as the unique complete whole, and integers as counts of completed wholes, has structural consequences throughout mathematics. It explains why the multiplicative identity is 1 rather than any other number: multiplying by 1 preserves the declared reference, because 1 is the completion state. It explains why exponentiation to the power 0 yields 1: any base raised to 0 is a count of zero completed self-references, and a count of zero is the identity — not non-existence, but the empty count within a frame where the base is the declared R. It explains why probability is bounded above by 1: a probability of 1 means the event is certain — the reference (the sample space) is fully achieved. Probability > 1 would be a surplus — more certainty than the declared reference allows. The upper bound is structural, not definitional. And it explains why the Riemann Hypothesis's critical line sits at σ = ½: this is the midpoint of the URP domain, the self-symmetric position between 0 and 1. The domain (0,1) is bounded above by complete wholeness. That bound is 1."},
   ]},
  {id:7,date:"April 28, 2026",readTime:"6 min",tag:"FOUNDATIONS",tagColor:T.accent,
   title:"What Does 0.333... Mean? Why the Fraction 1/3 Is More Precise Than Its Decimal",
   sub:"Most people think the decimal 0.333... is the natural way to write one-third. The fraction 1/3 looks like an intermediate step. The URP argues the opposite: the fraction is exact, the decimal is an infinite approximation. This matters more than it seems.",
   seoQueries:["what does 0.333 repeating mean","is 1/3 equal to 0.333","why does 1/3 never terminate","fraction vs decimal which is more accurate","what is a repeating decimal","irrational numbers and fractions"],
   doi:"10.5281/zenodo.19733441",
   pullQuote:"The fraction is the arrival. The decimal is the infinite journey toward expressing it. Base-10 is struggling. The fraction isn't.",
   sections:[
     {h:"The Decimal We Write Without Thinking",b:"One divided by three. Most people, asked to write this, write 0.333... or 0.3̄. It feels natural — we are accustomed to decimal notation, and this is what a calculator displays. The fraction 1/3 feels like an intermediate step, something you simplify further into the decimal. But this intuition has it backwards. The fraction 1/3 is the exact, complete answer. The decimal 0.333... is an incomplete representation — a process that runs forever and never finishes. The non-termination of the decimal is not a property of one-third as a quantity. It is a property of base-10 arithmetic's inability to represent one-third."},
     {h:"Why Base-10 Cannot Express 1/3 Exactly",b:"Base-10 positional notation can represent a fraction p/q exactly if and only if the denominator q has no prime factors other than 2 and 5 — the factors of 10. One-half (1/2) terminates: 0.5. One-quarter (1/4) terminates: 0.25. One-fifth (1/5) terminates: 0.2. One-third does not terminate because 3 is not a factor of 10. The fraction 1/3 is perfectly well-defined — there is nothing partial or incomplete about it as a mathematical object. But base-10 cannot write it finitely. So it runs: 0.3, 0.33, 0.333, forever. Each step is a closer approximation. None is the answer. The process converges to 1/3 without arriving."},
     {h:"The URP Framing: Fraction as Declared Relationship",b:"Under the Unitary Reference Principle, a fraction n/R is a declared relationship between a numerator n and a reference R. 1/3 declares: n = 1, R = 3. The relationship is exact and static — a complete mathematical object. The decimal 0.333... is a representation of this relationship in base-10, and base-10 cannot represent it finitely. The decimal is a process of approximation. The fraction is the object being approximated. This is why the URP treats fractions as primary and decimals as representations: the fraction 1/3 contains more information, and more precision, than any finite decimal approximation of it."},
     {h:"The Connection to Irrational Numbers",b:"The same principle extends to irrational numbers, but with a key difference. The fraction 1/3 cannot be represented in base-10 exactly, but it can be represented as a fraction. The number arccos(1/3)/π cannot be represented exactly in any positional notation — it is genuinely irrational, meaning it cannot be expressed as any ratio of integers. But under the URP, arccos(1/3)/π is still an exact declared relationship: n = arccos(1/3), R = π. The fraction is exact. The decimal approximation (0.39181...) is an approximation of the exact fraction. And crucially, arccos(1/3)/π appears as the exact value of the Dehn invariant ratio for the regular tetrahedron — the dihedral angle expressed as a fraction of the angle reference Rθ = π. The URP treats this as an exact answer, not an approximation. The fact that no finite decimal can represent it is a fact about decimal notation, not a fact about the number."},
     {h:"Why 0.999... = 1 Is Formally True but Structurally Incomplete",b:"The decimal 0.999... is the sum of the series 9/10 + 9/100 + 9/1000 + ... This series converges to 1. In standard real analysis, the limit of the sequence of partial sums is 1, and the notation 0.999... refers to this limit. So 0.999... = 1 is true as a statement about the limit of a sequence. But it conflates the sequence (a process) with its limit (an arrival). The fraction 1 is exact. The series 0.999... is a process that converges to 1. Under the URP, approach and arrival are structurally different. The sequence approaches 1. The fraction 1 is 1. These are not the same object, even if their values coincide in the limit. The discomfort millions of people feel about the proof that 0.999... = 1 is not irrationality. It is a correct structural intuition that conventional analysis resolves by definitional fiat — the limit is the value — rather than by structural argument."},
     {h:"Practical Implications: When Precision Matters",b:"This is not purely philosophical. In any context where precision matters — scientific measurement, financial calculation, cryptography — working with fractions rather than decimal approximations avoids accumulated rounding error. A fraction carries its exact value through any number of algebraic operations. A decimal approximation accumulates error with each operation. Computer scientists know this well: floating-point arithmetic, which uses binary approximations of decimals, introduces small errors that compound in long calculations. The URP's insistence on fractions as primary is structurally motivated: the fraction n/R is the exact declared relationship. Any representation of it in a finite positional system is an approximation. Keeping fractions exact throughout a calculation and converting to decimals only at the end is not just a computational trick. It is fidelity to the structure of what numbers are."},
   ]},
  {id:8,date:"April 28, 2026",readTime:"9 min",tag:"MILLENNIUM PROBLEMS",tagColor:T.warn,
   title:"What Is the Dehn Invariant? And Why Does D(cube) = 0 Not Mean What You Think",
   sub:"The Dehn invariant is one of the most elegant results in geometry — and one of the most misunderstood. When it equals zero, most people assume that means nothing. The URP shows it means the opposite: an active frame with depleted content. The distinction changes everything about scissors congruence in high dimensions.",
   seoQueries:["what is the dehn invariant","hilbert third problem explained","scissors congruence geometry","why cant cube and tetrahedron be cut and reassembled","dehn invariant zero means","hilbert problem solved"],
   doi:"10.5281/zenodo.19847459",
   pullQuote:"D(cube) = 0 does not mean the angle reference doesn't exist. It means the angle frame is present and the irrational content is depleted. The frame persists.",
   sections:[
     {h:"Hilbert's Third Problem",b:"In 1900, David Hilbert posed 23 problems that would define 20th century mathematics. The third was the first to fall — solved within a year by Max Dehn. The problem asked: given two polyhedra with equal volumes, can you always cut the first into finitely many polyhedral pieces and reassemble them to form the second? In two dimensions, the answer is yes (the Bolyai-Gerwien theorem). Hilbert suspected the answer in three dimensions was no, and Dehn proved it. The cube and a regular tetrahedron of equal volume cannot be cut and reassembled into each other. Dehn's proof introduced what is now called the Dehn invariant — a second quantity, beyond volume, that two polyhedra must share to be scissors-congruent."},
     {h:"What the Dehn Invariant Measures",b:"The Dehn invariant of a polyhedron P is defined as: D(P) = Σ (edge length) ⊗ₚ (dihedral angle at that edge), where the sum is over all edges, and ⊗ₚ denotes the tensor product over the rationals. Rational multiples of π vanish in this tensor product. Only irrational fractions of π contribute. For the cube: all dihedral angles are π/2, which is a rational multiple of π (specifically 1/2 · π). So D(cube) = 0. For the regular tetrahedron: all dihedral angles are arccos(1/3) ≈ 70.53°. The ratio arccos(1/3)/π is irrational (proved by Niven, 1956). So D(tetrahedron) ≠ 0. Since the Dehn invariants differ, the cube and tetrahedron are not scissors-congruent, regardless of their volumes."},
     {h:"The URP Reframing: What 0 Actually Means Here",b:"The standard account says D(cube) = 0 because rational angles vanish in the tensor product over ℚ. This is correct but unexplanatory. Why do rational angles vanish? The URP provides a structural answer. Declare the angle reference Rθ = π (the half-rotation — the natural reference for dihedral angles). Every dihedral angle is n/Rθ for some n. For the cube, n = π/2, giving n/Rθ = (π/2)/π = 1/2 — a complete rational fraction of the declared reference. Under any scissors operation, the rational n/Rθ values from each edge recombine into whole multiples of Rθ. The net irrational residual: 0/Rθ. The angle frame Rθ is present and active for every polyhedron — every polyhedron has edges. D(cube) = 0 means the irrational content within the angle frame is depleted to 0/Rθ. The frame persists. The content is exhausted."},
     {h:"Why This Distinction Matters",b:"Under the URP, D(cube) = 0 is not non-existence. It is 0/Rθ — contextual depletion of a declared reference that remains active. This distinction has immediate consequences. If D = 0 meant the angle frame didn't exist, then two polyhedra with D = 0 would both have no angle reference, and there would be no reason they couldn't be scissors-congruent. But they can be congruent — Sydler proved in 1965 that D(P) = 0 and equal volumes is both necessary and sufficient for scissors congruence in 3D. The frame's persistence is what enables this: both polyhedra have active angle frames Rθ, both have zero irrational content (0/Rθ), so their angle reference states match, and scissors congruence is possible (given equal volumes). D = 0/Rθ is a matchable state. Non-existence is not."},
     {h:"The Open Problem: Dimensions ≥ 5",b:"Sydler (1965) proved that volume + D(P) is sufficient for scissors congruence in 3D. Jessen (1968) proved the same for 4D. But for dimensions 5 and above, the question has been open since 1968. The URP proposes a structural answer. In an n-dimensional polytope, faces exist at every dimension from 0 to n-1. Each class of k-faces carries angle information. The question is which classes introduce genuinely independent declared references. In 3D and 4D, only k=1 edges introduce an independent angle reference (the Dehn invariant Rθ₁). In 5D, 2-faces may introduce an independent reference Rθ₂. In 6D, both 2-faces and 3-faces may introduce independent references. The URP predicts the number of independent declared references for scissors congruence in dimension n is: 1 + ⌊(n-2)/2⌋. In dimension 5: 1 + ⌊3/2⌋ = 2. In dimension 6: 1 + ⌊4/2⌋ = 3. New invariants are predicted at even dimensions ≥ 6."},
     {h:"A Testable Prediction",b:"The formula 1 + ⌊(n-2)/2⌋ is not a proof. It is a structural prediction from the URP framework. It predicts that volume + D(P) is sufficient in 5D (consistent with what is known) but that a new independent invariant is required in 6D and at each subsequent even dimension. This prediction is testable against the algebraic K-theory literature, which provides the most precise known results on scissors congruence groups. The full development of this prediction — including the 0/R treatment of D = 0, the structural proof of Hilbert's Third without tensor algebra, and the comparison with traditional methods across all known dimensions — appears in the companion paper on the Dehn invariant (Paper 14 of the URP series, forthcoming)."},
   ]},

];

// ═══════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════
function useBreakpoint(){
  const [bp,setBp]=useState({mobile:false});
  useEffect(()=>{
    const c=()=>setBp({mobile:window.innerWidth<768});
    c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c);
  },[]);return bp;
}

// ═══════════════════════════════════════════
// PARTICLE FIELD
// ═══════════════════════════════════════════
function ParticleField(){
  const [pts,setPts]=useState([]);
  const animRef=useRef();
  const chars="01nR/∑π∞÷×½⅓∫";
  useEffect(()=>{
    const n=30;
    const p=Array.from({length:n},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,
      vx:(Math.random()-.5)*.015,vy:(Math.random()-.5)*.015,
      char:chars[Math.floor(Math.random()*chars.length)],op:Math.random()*.06+.01,sz:Math.floor(Math.random()*7+7),ct:Math.floor(Math.random()*300)}));
    setPts(p);
    const loop=()=>{
      setPts(prev=>prev.map(p=>{
        let x=(p.x+p.vx+100)%100,y=(p.y+p.vy+100)%100;
        const ct=p.ct-1;
        return{...p,x,y,ct:ct<=0?200+Math.floor(Math.random()*300):ct,char:ct<=0?chars[Math.floor(Math.random()*chars.length)]:p.char};
      }));
      animRef.current=requestAnimationFrame(loop);
    };
    animRef.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(animRef.current);
  },[]);
  return(
    <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {pts.map(p=>(
        <div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,fontSize:p.sz,
          color:`rgba(0,255,179,${p.op})`,fontFamily:T.mono,fontWeight:700,userSelect:"none"}}>
          {p.char}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════
function Nav({page,go,mobile}){
  const [open,setOpen]=useState(false);
  const links=["Home","Papers","History","Demo","Ideas","Blog","About"];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(5,8,10,0.96)",
      backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`,
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:mobile?"0 1.25rem":"0 3rem",height:60}}>
      <button onClick={()=>go("Home")} style={{background:"none",border:"none",cursor:"pointer",
        fontFamily:T.mono,fontSize:20,color:T.accent,fontWeight:700,padding:0,
        letterSpacing:"-.02em",textShadow:`0 0 24px rgba(0,255,179,.5)`}}>n/R</button>
      {mobile?(
        <>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",color:T.sub,fontSize:22,padding:"4px 8px"}}>{open?"✕":"☰"}</button>
          {open&&<div style={{position:"absolute",top:60,left:0,right:0,background:"rgba(5,8,10,.99)",borderBottom:`1px solid ${T.border}`,zIndex:300}}>
            {links.map(l=><button key={l} onClick={()=>{go(l);setOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",color:page===l?T.accent:T.muted,fontFamily:T.mono,fontSize:12,letterSpacing:".12em",padding:".9rem 1.5rem",cursor:"pointer",borderBottom:`1px solid ${T.faint}`}}>{l.toUpperCase()}</button>)}
          </div>}
        </>
      ):(
        <div style={{display:"flex",gap:2,alignItems:"center"}}>
          {links.map(l=>(
            <button key={l} onClick={()=>go(l)} style={{
              background:page===l?T.accentDim:"transparent",
              border:`1px solid ${page===l?"rgba(0,255,179,.25)":"transparent"}`,
              color:page===l?T.accent:T.muted,fontFamily:T.mono,fontSize:10,
              letterSpacing:".14em",cursor:"pointer",padding:".38rem .9rem",
              transition:"all .15s",borderRadius:2}}
              onMouseEnter={e=>{if(page!==l){e.currentTarget.style.color=T.sub;e.currentTarget.style.background=T.bg1;}}}
              onMouseLeave={e=>{if(page!==l){e.currentTarget.style.color=T.muted;e.currentTarget.style.background="transparent";}}}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════
function Footer({go}){
  return(
    <footer style={{borderTop:`1px solid ${T.border}`,background:T.bg,padding:"3.5rem 3rem 2rem",marginTop:"5rem",position:"relative",zIndex:10}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gap:"3rem"}}>
        <div>
          <div style={{fontFamily:T.mono,fontSize:24,fontWeight:700,color:T.accent,marginBottom:".75rem",letterSpacing:"-.02em"}}>n/R</div>
          <div style={{fontFamily:T.body,fontSize:14,color:T.muted,lineHeight:1.9,maxWidth:260}}>
            Unitary Reference Principle<br/>
            Independent mathematical research<br/>
            Joshua Steven Brogley<br/>
            Almelo, Netherlands · 2026
          </div>
        </div>
        <div>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:T.dim,marginBottom:"1.1rem"}}>PUBLISHED PAPERS</div>
          {PAPERS.filter(p=>p.published).map(p=>(
            <a key={p.id} href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer"
              style={{display:"block",fontFamily:T.body,fontSize:13,color:T.muted,textDecoration:"none",marginBottom:".5rem",transition:"color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.color=p.color}
              onMouseLeave={e=>e.currentTarget.style.color=T.muted}>
              <span style={{fontFamily:T.mono,fontSize:10,color:T.dim,marginRight:".5rem"}}>{p.num}</span>{p.title} ↗
            </a>
          ))}
        </div>
        <div>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:T.dim,marginBottom:"1.1rem"}}>NAVIGATE</div>
          {["Papers","History","Demo","Ideas","Blog","About"].map(l=>(
            <button key={l} onClick={()=>go(l)} style={{display:"block",fontFamily:T.body,fontSize:13,color:T.muted,background:"none",border:"none",cursor:"pointer",padding:"0 0 .5rem",textAlign:"left",transition:"color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.color=T.accent}
              onMouseLeave={e=>e.currentTarget.style.color=T.muted}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"2.5rem auto 0",paddingTop:"1.5rem",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".5rem"}}>
        <div style={{fontFamily:T.body,fontSize:12,color:T.dim}}>© 2026 Joshua Steven Brogley · CC BY 4.0 · All papers open access</div>
        <div style={{fontFamily:T.mono,fontSize:11,color:T.dim}}>unitaryreference.com</div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════
// VISUALS
// ═══════════════════════════════════════════
function VisualProof({type,color}){
  if(type==="foundation"){
    const [sel,setSel]=useState(null);
    const states=[
      {n:0,R:4,label:"0/R",state:"DEPLETED",col:T.warn,desc:"Frame declared. Content empty. This is NOT non-existence — the reference R persists. The container exists. Nothing is in it."},
      {n:1,R:4,label:"1/4",state:"PARTIAL",col:color,desc:"Normal measurement. Living in (0,1). The normal state of almost all real-world quantities."},
      {n:3,R:4,label:"3/4",state:"PARTIAL",col:color,desc:"Approaching complete. Still within the declared frame. Still partial."},
      {n:4,R:4,label:"4/4 = 1",state:"COMPLETE",col:T.accent,desc:"n = R. The declared reference is fully achieved. The only complete whole. The arrival."},
      {n:5,R:4,label:"5/4",state:"SURPLUS",col:T.gold,desc:"Exceeds the declared frame. One complete R, sealed. Plus 1/4 of a new declared R₂. A new reference is initiated."},
    ];
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1.25rem"}}>CLICK TO EXPLORE — ALL FIVE STRUCTURAL STATES</div>
        <div style={{display:"flex",gap:".75rem",flexWrap:"wrap",marginBottom:"1rem"}}>
          {states.map((s,i)=>{
            const pct=Math.min(s.n/s.R,1);
            const arc=pct*2*Math.PI*26;
            const isS=sel===i;
            return(
              <button key={i} onClick={()=>setSel(isS?null:i)} style={{
                width:110,border:`1px solid ${isS?s.col:T.border}`,padding:"1rem .5rem",
                background:isS?`${s.col}10`:T.bg1,cursor:"pointer",textAlign:"center",
                transition:"all .2s",outline:"none"}}>
                <svg width={64} height={64} viewBox="0 0 64 64" style={{display:"block",margin:"0 auto .5rem"}}>
                  <circle cx={32} cy={32} r={26} fill="none" stroke={T.faint} strokeWidth={7}/>
                  {s.n>0&&<circle cx={32} cy={32} r={26} fill="none" stroke={s.col}
                    strokeWidth={7} strokeDasharray={`${arc} 200`} strokeLinecap="round"
                    transform="rotate(-90 32 32)" opacity={s.n>=s.R?1:.8}/>}
                  <text x={32} y={36} textAnchor="middle" fill={s.col} fontSize={9} fontFamily={T.mono} fontWeight={700}>{s.label}</text>
                </svg>
                <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".08em",color:s.col}}>{s.state}</div>
              </button>
            );
          })}
        </div>
        {sel!==null&&<div style={{padding:"1.1rem 1.25rem",background:T.bg1,borderLeft:`3px solid ${states[sel].col}`,marginTop:".5rem"}}>
          <div style={{fontFamily:T.mono,fontSize:10,color:states[sel].col,letterSpacing:".12em",marginBottom:".4rem"}}>{states[sel].state}</div>
          <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.85}}>{states[sel].desc}</div>
        </div>}
      </div>
    );
  }

  if(type==="riemann"){
    const [sig,setSig]=useState(.5);
    const off=Math.abs(sig-.5)>.04;
    const sym=1-sig;
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1rem"}}>DRAG THE ZERO — WHY MUST IT SIT AT ½?</div>
        <div style={{position:"relative",height:96,background:T.bg1,border:`1px solid ${T.border}`,marginBottom:"1rem",cursor:"ew-resize",userSelect:"none"}}
          onMouseDown={e=>{
            const rect=e.currentTarget.getBoundingClientRect();
            const mv=ev=>{const x=(ev.clientX-rect.left)/rect.width;setSig(Math.max(.02,Math.min(.98,(x-.1)/.8)));};
            const up=()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("mouseup",up);};
            document.addEventListener("mousemove",mv);document.addEventListener("mouseup",up);
            const x=(e.clientX-rect.left)/rect.width;setSig(Math.max(.02,Math.min(.98,(x-.1)/.8)));
          }}>
          <div style={{position:"absolute",left:"10%",right:"10%",top:0,bottom:0,background:"rgba(255,107,107,.03)"}}/>
          <div style={{position:"absolute",left:"9%",top:6,fontSize:10,color:T.dim,fontFamily:T.mono}}>0</div>
          <div style={{position:"absolute",right:"7%",top:6,fontSize:10,color:T.dim,fontFamily:T.mono}}>1</div>
          <div style={{position:"absolute",left:"50%",top:6,fontSize:10,color:T.accent,fontFamily:T.mono,transform:"translateX(-50%)",fontWeight:700}}>½</div>
          <div style={{position:"absolute",left:"50%",top:20,bottom:8,width:1,background:"rgba(0,255,179,.2)"}}/>
          {off&&<div style={{position:"absolute",left:`${sym*80+10}%`,top:20,bottom:8,width:1,borderLeft:"1px dashed rgba(255,107,107,.5)"}}/>}
          <div style={{position:"absolute",left:`${sig*80+10}%`,top:"50%",
            width:16,height:16,borderRadius:"50%",
            background:off?T.warn:T.accent,border:`2px solid ${off?T.warn:T.accent}`,
            transform:"translate(-50%,-50%)",
            boxShadow:`0 0 14px ${off?"rgba(255,107,107,.7)":"rgba(0,255,179,.7)"}`,zIndex:5}}/>
        </div>
        <div style={{padding:"1rem 1.25rem",background:T.bg1,borderLeft:`3px solid ${off?T.warn:T.accent}`}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".12em",color:off?T.warn:T.accent,marginBottom:".4rem"}}>{off?"INVALID POSITION":"VALID POSITION"}</div>
          <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.85}}>
            {off?`Zero at σ=${sig.toFixed(2)} creates a mirror zero at 1−σ=${sym.toFixed(2)}. Two depletion events in one declared frame require it to go negative — a deficit state. Deficit cannot serve as a declared reference. This position is structurally impossible.`
              :`Zero at σ=${sig.toFixed(2)} ≈ ½. Maps to itself under 1−σ. One depletion event. Self-symmetric. No deficit created. The only position that works.`}
          </div>
        </div>
      </div>
    );
  }

  if(type==="geometry"){
    const [ang,setAng]=useState(60);
    const rad=ang*Math.PI/180;
    const R=54,cx=72,cy=72;
    const x3=cx+R*Math.sin(rad),y3=cy-R*Math.cos(rad);
    const big=ang>180?1:0;
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1rem"}}>ANY ANGLE IS A FRACTION OF R = 2π</div>
        <div style={{display:"flex",gap:"2rem",alignItems:"center",flexWrap:"wrap"}}>
          <svg width={144} height={144} viewBox="0 0 144 144">
            <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.faint} strokeWidth={1.5}/>
            <path d={`M${cx},${cy} L${cx},${cy-R} A${R},${R} 0 ${big},1 ${x3},${y3} Z`} fill={`${color}18`} stroke={color} strokeWidth={2}/>
            <circle cx={cx} cy={cy} r={3} fill={color}/>
            <text x={cx} y={138} textAnchor="middle" fill={T.dim} fontSize={9} fontFamily={T.mono}>R = 2π = 360°</text>
          </svg>
          <div style={{flex:1,minWidth:140}}>
            <input type="range" min={1} max={359} value={ang} onChange={e=>setAng(+e.target.value)} style={{width:"100%",accentColor:color,marginBottom:".85rem",display:"block"}}/>
            <div style={{fontFamily:T.mono,fontSize:28,fontWeight:700,color,marginBottom:".3rem"}}>{(ang/360).toFixed(4)}</div>
            <div style={{fontFamily:T.body,fontSize:14,color:T.muted}}>of R = {ang}°</div>
            {ang===180&&<div style={{fontFamily:T.body,fontSize:13,color:T.accent,marginTop:".5rem"}}>= ½R — triangle angle sum</div>}
            {ang===90&&<div style={{fontFamily:T.body,fontSize:13,color:T.accent,marginTop:".5rem"}}>= ¼R — the right angle</div>}
            {ang===360&&<div style={{fontFamily:T.body,fontSize:13,color:T.accent,marginTop:".5rem"}}>= R — complete rotation</div>}
          </div>
        </div>
      </div>
    );
  }

  if(type==="division"){
    const [n,setN]=useState(1);
    const [d,setD]=useState(3);
    const states=d===0?"unconstructable":n===0&&d>0?"depleted":n===d&&d>0?"complete":n>d&&d>0?"surplus":"partial";
    const stateInfo={
      unconstructable:{col:T.warn,label:"UNCONSTRUCTABLE",desc:"Zero has no declared reference. There is nothing to divide into. Not undefined — structurally impossible."},
      depleted:{col:T.warn,label:"0/R — CONTEXTUAL DEPLETION",desc:"The frame R is declared and active. The content is empty. This is NOT non-existence — the reference persists."},
      complete:{col:T.accent,label:"COMPLETE — n/R = 1",desc:"n = R. The declared reference is fully achieved. The only complete whole within this declared frame."},
      surplus:{col:T.gold,label:`SURPLUS — NEW R REQUIRED`,desc:`Axiom I: 1 is the only complete whole. ${Math.floor(n/d)} complete R${Math.floor(n/d)>1?"s":""} achieved${n%d>0?` + ${n%d}/${d} of a new declared R`:""}.`},
      partial:{col:color,label:"PARTIAL STATE",desc:`${n}/${d} — living in the URP domain (0,1). Exact fraction: ${n}/${d}. Decimal: ${(n/d).toFixed(8).replace(/0+$/,"...")} (approximation).`},
    };
    const s=stateInfo[states];
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1.25rem"}}>EXPLORE ALL FIVE URP STATES</div>
        <div style={{display:"flex",gap:"2rem",flexWrap:"wrap",marginBottom:"1.25rem",alignItems:"flex-end"}}>
          <div><div style={{fontFamily:T.mono,fontSize:10,color:T.dim,letterSpacing:".1em",marginBottom:4}}>NUMERATOR n</div>
            <input type="range" min={0} max={12} value={n} onChange={e=>setN(+e.target.value)} style={{width:150,accentColor:color,display:"block",marginBottom:6}}/>
            <div style={{fontFamily:T.mono,fontSize:24,fontWeight:700,color:states==="surplus"?T.gold:states==="unconstructable"?T.muted:color}}>{n}</div></div>
          <div><div style={{fontFamily:T.mono,fontSize:10,color:T.dim,letterSpacing:".1em",marginBottom:4}}>REFERENCE R</div>
            <input type="range" min={0} max={10} value={d} onChange={e=>setD(+e.target.value)} style={{width:150,accentColor:color,display:"block",marginBottom:6}}/>
            <div style={{fontFamily:T.mono,fontSize:24,fontWeight:700,color:d===0?T.warn:color}}>{d}</div></div>
          <div style={{textAlign:"center",padding:"1rem 1.5rem",background:T.bg1,border:`1px solid ${s.col}40`,minWidth:120}}>
            <div style={{fontFamily:T.mono,fontSize:32,fontWeight:700,color:s.col,lineHeight:1}}>{d===0?"∅":n===0?`0/${d}`:n===d?`1`:`${n}/${d}`}</div>
            <div style={{fontFamily:T.mono,fontSize:10,color:s.col,marginTop:4,letterSpacing:".1em"}}>{s.label.split("—")[0].trim()}</div>
          </div>
        </div>
        <div style={{padding:"1rem 1.25rem",background:T.bg1,borderLeft:`3px solid ${s.col}`}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".12em",color:s.col,marginBottom:".4rem"}}>{s.label}</div>
          <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.85}}>{s.desc}</div>
        </div>
      </div>
    );
  }

  if(type==="physics"){
    const [pwr,setPwr]=useState(60);
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1rem"}}>SIGNAL POWER — THE URP DOMAIN IN PHYSICAL REALITY</div>
        <input type="range" min={0} max={100} value={pwr} onChange={e=>setPwr(+e.target.value)} style={{width:"100%",accentColor:color,marginBottom:"1rem",display:"block"}}/>
        <div style={{display:"flex",height:8,gap:2,marginBottom:"1.25rem"}}>
          {Array.from({length:20},(_,i)=><div key={i} style={{flex:1,background:pwr>=i*5?color:`${color}18`,borderRadius:1,transition:"background .1s"}}/>)}
        </div>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center",marginBottom:"1.25rem",flexWrap:"wrap"}}>
          <div style={{fontFamily:T.mono,fontSize:48,fontWeight:700,color,lineHeight:1}}>{pwr}</div>
          <div style={{fontFamily:T.body,fontSize:16,color:T.muted}}>/100 of R</div>
          <div style={{fontFamily:T.mono,fontSize:11,color:pwr===0?T.warn:pwr===100?T.accent:color,letterSpacing:".1em",
            padding:".3rem .8rem",border:`1px solid ${pwr===0?T.warn:pwr===100?T.accent:color}40`,background:T.bg1}}>
            {pwr===0?"0/R DEPLETED":pwr===100?"R COMPLETE":"PARTIAL STATE"}
          </div>
        </div>
        <div style={{padding:"1rem 1.25rem",background:T.bg1,borderLeft:`3px solid ${pwr===0?T.warn:pwr===100?T.accent:color}`}}>
          <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.85}}>
            {pwr===0?"0/R — Contextual depletion. The channel (frame) exists. The signal is gone. The fiber persists. Conservation is maintained — the frame cannot reach non-existence.":
             pwr===100?"R — Complete. Full signal. The declared reference is fully achieved. This state is instantaneous in real physical systems.":
             `${pwr}/100 of R — Operating in the URP interior (0,1). ${pwr<15||pwr>85?"Classical binary approximates this to the nearest boundary state.":"Classical binary cannot natively represent this state."}`}
          </div>
        </div>
      </div>
    );
  }

  if(type==="dehn"){
    const [shape,setShape]=useState("cube");
    const D={cube:{a:"90°",nr:"π/2 / π = 1/2 (exact rational)",rat:"Yes — complete rational fraction",dp:"0/Rθ — Frame present, irrational content depleted",c:T.accent,msg:"Rational n/R → irrational content depletes to 0/Rθ under any scissors operation. Frame Rθ=π is present and EMPTY. This is why the cube and tetrahedron cannot be scissors-congruent — their angle frames are in incompatible states."},
      tetra:{a:"arccos(1/3) ≈ 70.53°",nr:"arccos(1/3)/π — exact irreducible irrational",rat:"No — irreducible irrational fraction",dp:"arccos(1/3)/π of Rθ ≠ 0",c:T.warn,msg:"Irrational n/R → content PERSISTS through any scissors operation. Frame Rθ=π is present and NON-EMPTY. This irrational residual cannot be removed by any cutting or reassembling."}};
    const s=D[shape];
    return(
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".18em",color:T.dim,marginBottom:"1rem"}}>DEHN INVARIANT — THE 0/R DISTINCTION</div>
        <div style={{display:"flex",gap:".65rem",marginBottom:"1.25rem"}}>
          {[["cube","Cube"],["tetra","Tetrahedron"]].map(([k,l])=><button key={k} onClick={()=>setShape(k)} style={{flex:1,padding:".65rem",background:shape===k?`${D[k].c}12`:T.bg1,border:`1px solid ${shape===k?D[k].c:T.border}`,color:shape===k?D[k].c:T.muted,fontFamily:T.body,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>{l}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".65rem",marginBottom:"1rem"}}>
          {[["Dihedral angle",s.a],["n/R value",s.nr],["Rational?",s.rat],["D(P)",s.dp]].map(([k,v])=>(
            <div key={k} style={{padding:".85rem 1rem",background:T.bg1,border:`1px solid ${T.border}`}}>
              <div style={{fontFamily:T.mono,fontSize:9,color:T.dim,letterSpacing:".1em",marginBottom:4}}>{k}</div>
              <div style={{fontFamily:T.body,fontSize:13,color:s.c,lineHeight:1.5}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"1rem 1.25rem",background:T.bg1,borderLeft:`3px solid ${s.c}`}}>
          <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.85}}>{s.msg}</div>
        </div>
      </div>
    );
  }

  return<div style={{padding:"2.5rem",textAlign:"center"}}>
    <div style={{fontFamily:T.mono,fontSize:32,fontWeight:700,color,marginBottom:".5rem"}}>n/R</div>
    <div style={{fontFamily:T.mono,fontSize:10,color:T.dim,letterSpacing:".2em"}}>INTERACTIVE VISUAL — COMING WITH PAPER PUBLICATION</div>
  </div>;
}

// ═══════════════════════════════════════════
// BODY EXPLORER (Demo Page)
// ═══════════════════════════════════════════
function BodyExplorer(){
  const canvasRef=useRef();
  const [mode,setMode]=useState("ALL");
  const [tick,setTick]=useState(0);
  const [selected,setSelected]=useState(null);
  const figuresRef=useRef([]);

  useEffect(()=>{
    const t=setInterval(()=>setTick(n=>n+1),50);return()=>clearInterval(t);
  },[]);

  const domains=[
    {id:"heart",label:"Heart",ch:"❤",note:"Heartbeat: n/R where R = one complete cardiac cycle. 72 beats/min = 72 complete Rs per minute.",col:"#FF6B6B"},
    {id:"lungs",label:"Lungs",ch:"🫁",note:"Lung capacity: tidal volume / total capacity = n/R. At rest: ~0.5L / 6L = 0.083/R.",col:"#88C9C9"},
    {id:"brain",label:"Brain",ch:"🧠",note:"Neural firing: spike/threshold = n/R. Action potential = R achieved. Resting potential = 0/R (frame maintained, content depleted).",col:"#C77DFF"},
    {id:"blood",label:"Blood O₂",ch:"🩸",note:"Oxygen saturation: SpO₂ = n/R where R = full haemoglobin capacity. 98% SpO₂ = 0.98/R.",col:"#FF4444"},
    {id:"temp",label:"Temperature",ch:"🌡",note:"Body temp: 98.6°F is the declared R. Fever = surplus state. Hypothermia = depleted state approaching 0/R.",col:"#FFB347"},
  ];

  const t=tick*0.05;
  const figures=Array.from({length:6},(_,i)=>{
    const isFemale=i%2===0;
    const baseX=80+i*140;
    const baseY=280;
    const walk=Math.sin(t+i*1.1)*8;
    const breathe=Math.sin(t*1.3+i)*2;
    const hue=200+i*30;
    return{i,isFemale,x:baseX,y:baseY+walk,breathe,hue};
  });

  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:"#020608"}}>
      {/* Header */}
      <div style={{padding:"3rem 3rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".5rem"}}>VISUAL DEMO</div>
        <h1 style={{fontFamily:T.head,fontSize:"clamp(28px,4vw,52px)",fontWeight:400,color:T.text,margin:"0 0 .5rem",lineHeight:1.1}}>The Human Body as URP Domain</h1>
        <p style={{fontFamily:T.body,fontSize:16,color:T.muted,maxWidth:560,lineHeight:1.85,marginBottom:"1.5rem"}}>Every biological system operates in the fractional domain (0,1). Every vital sign is n/R. Click a domain to see the URP reading.</p>
      </div>

      {/* Domain selector */}
      <div style={{padding:"0 3rem",maxWidth:1100,margin:"0 auto",display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
        {domains.map(d=>(
          <button key={d.id} onClick={()=>setSelected(selected===d.id?null:d.id)} style={{
            padding:".5rem 1.1rem",background:selected===d.id?`${d.col}18`:T.bg1,
            border:`1px solid ${selected===d.id?d.col:T.border}`,color:selected===d.id?d.col:T.muted,
            fontFamily:T.body,fontSize:13,cursor:"pointer",transition:"all .2s",
            display:"flex",alignItems:"center",gap:".4rem"}}>
            <span>{d.ch}</span><span>{d.label}</span>
          </button>
        ))}
      </div>

      {/* Selected domain info */}
      {selected&&(()=>{const d=domains.find(x=>x.id===selected);return d?<div style={{margin:"0 3rem 2rem",maxWidth:1100,padding:"1.1rem 1.5rem",background:T.bg1,borderLeft:`3px solid ${d.col}`,marginLeft:"max(1.5rem,calc(50vw - 518px))",maxWidth:900}}>
        <div style={{fontFamily:T.mono,fontSize:10,color:d.col,letterSpacing:".15em",marginBottom:".4rem"}}>{d.label.toUpperCase()} — URP READING</div>
        <div style={{fontFamily:T.body,fontSize:15,color:T.sub,lineHeight:1.85}}>{d.note}</div>
      </div>:null;})()}

      {/* SVG visualization */}
      <div style={{padding:"0 3rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <svg width="100%" viewBox="0 0 980 420" style={{background:"linear-gradient(180deg,rgba(0,20,30,.8),rgba(0,10,20,.95))",border:`1px solid ${T.border}`,display:"block"}}>
          {/* Grid lines */}
          {[100,200,300].map(y=><line key={y} x1={0} y1={y} x2={980} y2={y} stroke="rgba(0,255,179,.03)" strokeWidth={1}/>)}
          {/* Ground */}
          <rect x={0} y={340} width={980} height={2} fill="rgba(0,255,179,.08)"/>

          {figures.map(fig=>{
            const{i,isFemale,x,y,breathe,hue}=fig;
            const col=`hsl(${hue},70%,65%)`;
            const glow=`hsl(${hue},80%,70%)`;
            const hipW=isFemale?28:22;
            const shoulderW=isFemale?24:30;
            const bodyH=isFemale?95:100;
            const headR=isFemale?16:15;
            const isHighlighted=!selected||(selected==="heart"&&i===0)||(selected==="lungs"&&i===1)||(selected==="brain"&&i===2)||(selected==="blood"&&i===3)||(selected==="temp"&&i===4);
            const opacity=isHighlighted?1:.3;

            return(
              <g key={i} transform={`translate(${x},${y})`} style={{transition:"opacity .4s"}} opacity={opacity}>
                {/* Glow behind */}
                <ellipse cx={0} cy={-bodyH/2} rx={shoulderW+10} ry={bodyH/2+10} fill={`${glow}05`}/>

                {/* Body shell — translucent */}
                <ellipse cx={0} cy={-bodyH/2} rx={shoulderW} ry={bodyH/2} fill={`${col}12`} stroke={col} strokeWidth={1} strokeOpacity={.5}/>
                {/* Hip section */}
                <ellipse cx={0} cy={-20} rx={hipW} ry={28} fill={`${col}08`} stroke={col} strokeWidth={.8} strokeOpacity={.4}/>

                {/* Organs */}
                {/* Heart */}
                <g transform={`translate(${isFemale?-6:-6},-62)`}>
                  <circle r={5+Math.sin(tick*.15)*1.5} fill="rgba(255,80,80,.7)" filter="url(#glow)"/>
                  <circle r={3+Math.sin(tick*.15)*1} fill="rgba(255,120,120,.9)"/>
                </g>
                {/* Lungs */}
                <ellipse cx={-10} cy={-60} rx={8} ry={12+breathe} fill="rgba(150,220,220,.18)" stroke="rgba(150,220,220,.4)" strokeWidth={.8}/>
                <ellipse cx={10} cy={-60} rx={8} ry={12+breathe} fill="rgba(150,220,220,.18)" stroke="rgba(150,220,220,.4)" strokeWidth={.8}/>
                {/* Spine */}
                {Array.from({length:8},(_,j)=><rect key={j} x={-2} y={-bodyH+10+j*12} width={4} height={8} rx={1} fill={`${col}40`} stroke={col} strokeWidth={.5} strokeOpacity={.4}/>)}
                {/* Ribs */}
                {[-72,-60,-50].map((ry,j)=>[
                  <path key={`lr${j}`} d={`M0,${ry} Q-${shoulderW-4},${ry+4} -${shoulderW-8},${ry+10}`} fill="none" stroke={`${col}35`} strokeWidth={1}/>,
                  <path key={`rr${j}`} d={`M0,${ry} Q${shoulderW-4},${ry+4} ${shoulderW-8},${ry+10}`} fill="none" stroke={`${col}35`} strokeWidth={1}/>
                ])}

                {/* Head */}
                <circle cx={0} cy={-bodyH-headR-4} r={headR} fill={`${col}15`} stroke={col} strokeWidth={1} strokeOpacity={.6}/>
                {/* Brain indicator */}
                <circle cx={0} cy={-bodyH-headR-4} r={5} fill="rgba(180,100,255,.5)"/>
                {/* Face */}
                <circle cx={-5} cy={-bodyH-headR-6} r={1.5} fill={col} opacity={.8}/>
                <circle cx={5} cy={-bodyH-headR-6} r={1.5} fill={col} opacity={.8}/>
                {isFemale&&<ellipse cx={0} cy={-bodyH-headR+2} rx={headR+2} ry={4} fill="none" stroke={col} strokeWidth={1} strokeOpacity={.25}/>}

                {/* Legs */}
                <line x1={-8} y1={-5} x2={-10+Math.sin(tick*.1+i)*(isFemale?4:5)} y2={55} stroke={col} strokeWidth={isFemale?9:10} strokeOpacity={.35} strokeLinecap="round"/>
                <line x1={8} y1={-5} x2={10-Math.sin(tick*.1+i)*(isFemale?4:5)} y2={55} stroke={col} strokeWidth={isFemale?9:10} strokeOpacity={.35} strokeLinecap="round"/>
                {/* Feet */}
                <ellipse cx={-10+Math.sin(tick*.1+i)*(isFemale?4:5)} cy={56} rx={8} ry={4} fill={col} opacity={.4}/>
                <ellipse cx={10-Math.sin(tick*.1+i)*(isFemale?4:5)} cy={56} rx={8} ry={4} fill={col} opacity={.4}/>

                {/* Arms */}
                <line x1={-shoulderW} y1={-bodyH+15} x2={-shoulderW-8+Math.sin(tick*.1)*4} y2={-20} stroke={col} strokeWidth={7} strokeOpacity={.3} strokeLinecap="round"/>
                <line x1={shoulderW} y1={-bodyH+15} x2={shoulderW+8-Math.sin(tick*.1)*4} y2={-20} stroke={col} strokeWidth={7} strokeOpacity={.3} strokeLinecap="round"/>

                {/* n/R label */}
                <text x={0} y={75} textAnchor="middle" fontSize={8} fill={col} fontFamily={T.mono} opacity={.7}>{((selected?Math.random()*.4+.55:.8+i*.03)).toFixed(2)}/R</text>
              </g>
            );
          })}

          {/* Title overlay */}
          <text x={490} y={30} textAnchor="middle" fontSize={11} fill="rgba(0,255,179,.3)" fontFamily={T.mono} letterSpacing={3}>HUMAN BIOLOGY AS URP DOMAIN</text>
          <text x={490} y={50} textAnchor="middle" fontSize={9} fill="rgba(0,255,179,.15)" fontFamily={T.mono} letterSpacing={2}>EVERY VITAL SIGN IS n/R</text>

          {/* Filter: blur glow effect definition */}
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation={3} result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
        </svg>
      </div>

      {/* URP readings panel */}
      <div style={{padding:"0 3rem 2rem",maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1px",background:T.bg2}}>
        {domains.map(d=>(
          <div key={d.id} style={{background:T.bg,padding:"1.1rem 1.25rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".5rem"}}>
              <span style={{fontSize:18}}>{d.ch}</span>
              <span style={{fontFamily:T.mono,fontSize:10,color:d.col,letterSpacing:".1em"}}>{d.label.toUpperCase()}</span>
            </div>
            <div style={{fontFamily:T.mono,fontSize:20,fontWeight:700,color:d.col,marginBottom:".25rem"}}>
              {d.id==="heart"?"0.83/R":d.id==="lungs"?"0.083/R":d.id==="brain"?"0.98/R":d.id==="blood"?"0.98/R":"0.99/R"}
            </div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.muted,lineHeight:1.6}}>
              {d.id==="heart"?"72/86.4 bpm":d.id==="lungs"?"0.5L / 6L capacity":d.id==="brain"?"SpO₂ resting":d.id==="blood"?"Haemoglobin saturation":"98.6°F / 99.5°F max"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PAPER DETAIL
// ═══════════════════════════════════════════
function PaperPage({paper,onBack,go}){
  const [ci,setCi]=useState(0);
  const claim=paper.claims[ci];
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      {/* Hero band */}
      <div style={{background:`linear-gradient(135deg,${T.bg} 0%,${paper.color}08 100%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:T.dim,fontFamily:T.mono,fontSize:11,letterSpacing:".1em",cursor:"pointer",padding:"0 0 1.5rem",display:"block"}}
            onMouseEnter={e=>e.currentTarget.style.color=paper.color}
            onMouseLeave={e=>e.currentTarget.style.color=T.dim}>← BACK TO PAPERS</button>
          <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:".75rem"}}>
            <span style={{fontFamily:T.mono,fontSize:11,color:paper.color,opacity:.6,letterSpacing:".2em"}}>PAPER {paper.num}</span>
            {paper.published&&<span style={{fontFamily:T.mono,fontSize:9,background:paper.color,color:T.bg,padding:"3px 8px",letterSpacing:".1em"}}>PUBLISHED</span>}
            {!paper.published&&<span style={{fontFamily:T.mono,fontSize:9,border:`1px solid ${T.border}`,color:T.dim,padding:"3px 8px",letterSpacing:".1em"}}>FORTHCOMING</span>}
          </div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(28px,4vw,54px)",fontWeight:400,color:T.text,margin:"0 0 .5rem",lineHeight:1.1}}>{paper.title}</h1>
          <div style={{fontFamily:T.body,fontSize:16,color:paper.color,marginBottom:"1rem",opacity:.8}}>{paper.sub}</div>
          <p style={{fontFamily:T.body,fontSize:16,color:T.muted,maxWidth:600,lineHeight:1.9,marginBottom:paper.doi?"1.25rem":"0"}}>{paper.desc}</p>
          {paper.doi&&<a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:T.mono,fontSize:11,color:paper.color,textDecoration:"none",letterSpacing:".06em",borderBottom:`1px solid ${paper.color}50`,paddingBottom:1}}>
            doi.org/{paper.doi} ↗
          </a>}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"2.5rem 3rem 4rem"}}>
        {/* Visual */}
        <div style={{border:`1px solid ${T.border}`,marginBottom:"3rem",background:T.bg1}}>
          <div style={{padding:"1rem 1.5rem",borderBottom:`1px solid ${T.border}`,fontFamily:T.mono,fontSize:9,letterSpacing:".25em",color:T.dim}}>INTERACTIVE PROOF SPACE</div>
          <div style={{padding:"0 1.5rem 1rem"}}><VisualProof type={paper.visual} color={paper.color}/></div>
        </div>

        {/* Claims */}
        {paper.claims.length>0&&<>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:T.dim,marginBottom:"1rem"}}>TRADITIONAL UNDERSTANDING vs URP — SELECT A CLAIM</div>
          <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.75rem"}}>
            {paper.claims.map((c,i)=>(
              <button key={i} onClick={()=>setCi(i)} style={{
                textAlign:"left",padding:".85rem 1.25rem",
                background:ci===i?`${paper.color}0d`:T.bg1,
                border:`1px solid ${ci===i?paper.color:T.border}`,cursor:"pointer",
                fontFamily:T.body,fontSize:14,fontWeight:ci===i?600:400,
                color:ci===i?paper.color:T.muted,transition:"all .15s",
                display:"flex",alignItems:"center",gap:".85rem"}}>
                <span style={{fontFamily:T.mono,fontSize:10,color:ci===i?paper.color:T.dim}}>▶</span>{c.t}
              </button>
            ))}
          </div>
          {claim&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:T.border}}>
            <div style={{padding:"1.75rem",background:"rgba(20,10,5,1)",borderTop:`3px solid rgba(139,69,19,.4)`}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:"#8B6030",marginBottom:"1rem"}}>TRADITIONAL MATHEMATICS</div>
              <div style={{fontFamily:T.body,fontSize:15,color:"#C8B898",lineHeight:2}}>{claim.trad}</div>
            </div>
            <div style={{padding:"1.75rem",background:`rgba(0,15,10,1)`,borderTop:`3px solid ${paper.color}60`}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:paper.color,marginBottom:"1rem"}}>URP FRAMEWORK</div>
              <div style={{fontFamily:T.body,fontSize:15,color:"#B8E0CC",lineHeight:2}}>{claim.urp}</div>
            </div>
          </div>}
        </>}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// PAPERS LIST
// ═══════════════════════════════════════════
function PapersPage({onSelectPaper,mobile,go}){
  const [filter,setFilter]=useState("All");
  const [hov,setHov]=useState(null);
  const filtered=filter==="Published"?PAPERS.filter(p=>p.published):PAPERS;
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      <div style={{background:`linear-gradient(180deg,rgba(0,255,179,.04) 0%,transparent 100%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".6rem"}}>THE SERIES</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(28px,4vw,54px)",fontWeight:400,color:T.text,margin:"0 0 .5rem"}}>17 Papers. One Framework.</h1>
          <p style={{fontFamily:T.body,fontSize:16,color:T.muted,marginBottom:"1.5rem",maxWidth:520,lineHeight:1.8}}>Click any paper to explore the proof, interactive visual, and a direct Traditional vs URP comparison.</p>
          <div style={{display:"flex",gap:".5rem"}}>
            {["All","Published"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:".4rem 1.1rem",background:filter===f?T.accentDim:"transparent",
                border:`1px solid ${filter===f?T.borderHov:T.border}`,
                color:filter===f?T.accent:T.muted,fontFamily:T.body,fontSize:13,
                cursor:"pointer",transition:"all .15s"}}>
                {f}{f==="Published"?` (${PAPERS.filter(p=>p.published).length})`:""}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 3rem 4rem"}}>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(320px,1fr))",gap:"1px",background:T.bg2}}>
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>onSelectPaper(p)}
              onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
              style={{background:hov===p.id?T.bg1:T.bg,cursor:"pointer",
                padding:"1.75rem",transition:"all .2s",
                borderLeft:`3px solid ${hov===p.id?p.color:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".6rem"}}>
                <span style={{fontFamily:T.mono,fontSize:11,color:T.dim,letterSpacing:".15em"}}>{p.num}</span>
                <span style={{fontFamily:T.mono,fontSize:9,background:p.published?p.color:T.faint,color:p.published?T.bg:T.dim,padding:"2px 8px",letterSpacing:".1em"}}>
                  {p.published?"LIVE":"COMING"}
                </span>
              </div>
              <h3 style={{fontFamily:T.head,fontSize:20,fontWeight:400,color:hov===p.id?p.color:T.text,marginBottom:".25rem",margin:"0 0 .25rem"}}>{p.title}</h3>
              <div style={{fontFamily:T.body,fontSize:13,color:p.color,opacity:.7,marginBottom:".6rem"}}>{p.sub}</div>
              <p style={{fontFamily:T.body,fontSize:13,color:T.muted,lineHeight:1.75,margin:0}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// HISTORY
// ═══════════════════════════════════════════
function HistoryPage({mobile,go}){
  const [active,setActive]=useState(null);
  const [era,setEra]=useState("All");
  const eras=["All",...[...new Set(HISTORY.map(h=>h.era))]];
  const filtered=era==="All"?HISTORY:HISTORY.filter(h=>h.era===era);
  const person=active!==null?HISTORY[active]:null;
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      <div style={{background:`linear-gradient(180deg,rgba(160,136,200,.05) 0%,transparent 100%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".6rem"}}>MATHEMATICAL HISTORY</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(26px,4vw,50px)",fontWeight:400,color:T.text,margin:"0 0 .25rem",lineHeight:1.15}}>They Were Building the Framework.</h1>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(26px,4vw,50px)",fontWeight:700,fontStyle:"italic",color:T.accent,margin:"0 0 1rem",lineHeight:1.15}}>They Didn't Know It Yet.</h1>
          <p style={{fontFamily:T.body,fontSize:16,color:T.muted,maxWidth:540,lineHeight:1.85,marginBottom:"1.5rem"}}>From Euclid to Feynman — every mathematician was approaching the same declaration from a different angle. Click to see where they stopped and how the URP completes their work.</p>
          <div style={{display:"flex",gap:".4rem",flexWrap:"wrap"}}>
            {eras.map(e=><button key={e} onClick={()=>setEra(e)} style={{padding:".3rem .9rem",background:era===e?T.accentDim:"transparent",border:`1px solid ${era===e?T.borderHov:T.border}`,color:era===e?T.accent:T.dim,fontFamily:T.body,fontSize:12,cursor:"pointer",transition:"all .15s"}}>{e}</button>)}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 3rem 4rem",display:"grid",gridTemplateColumns:person&&!mobile?"360px 1fr":"1fr",gap:"2rem"}}>
        <div>
          {filtered.map(h=>{
            const idx=HISTORY.indexOf(h),isA=active===idx,isL=h.name==="Brogley";
            return(
              <div key={h.name} style={{display:"flex",cursor:"pointer"}} onClick={()=>setActive(isA?null:idx)}>
                <div style={{width:36,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:11,height:11,borderRadius:"50%",flexShrink:0,marginTop:18,
                    background:isA?h.color:"transparent",border:`2px solid ${isA?h.color:"#2a2520"}`,
                    boxShadow:isA?`0 0 12px ${h.color}80`:"none",transition:"all .2s"}}/>
                  {!isL&&<div style={{width:1,flex:1,background:"#1a1715",minHeight:12}}/>}
                </div>
                <div style={{flex:1,padding:".75rem .75rem .75rem .5rem",borderLeft:`2px solid ${isA?h.color:"transparent"}`,transition:"border-color .2s",marginLeft:2,marginBottom:4}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:".5rem"}}>
                    <span style={{fontFamily:T.head,fontSize:16,fontWeight:isA?700:400,color:isA?h.color:T.sub}}>{h.name}</span>
                    <span style={{fontFamily:T.mono,fontSize:10,color:T.dim,flexShrink:0}}>{h.year}</span>
                  </div>
                  <div style={{fontFamily:T.body,fontSize:12,color:T.dim,marginBottom:isA?".5rem":"0"}}>{h.era}</div>
                  {isA&&<div style={{fontFamily:T.body,fontSize:13,color:T.muted,lineHeight:1.75}}>{h.contrib}</div>}
                </div>
              </div>
            );
          })}
        </div>
        {person&&(
          <div style={{position:mobile?"static":"sticky",top:68,height:"fit-content",background:T.bg1,border:`1px solid ${T.border}`,padding:"2rem",borderTop:`3px solid ${person.color}`}}>
            <div style={{display:"flex",alignItems:"baseline",gap:".75rem",marginBottom:".25rem"}}>
              <h2 style={{fontFamily:T.head,fontSize:28,fontWeight:700,color:person.color,margin:0}}>{person.name}</h2>
              <span style={{fontFamily:T.mono,fontSize:11,color:T.dim}}>{person.year}</span>
            </div>
            <div style={{fontFamily:T.body,fontSize:13,color:T.dim,marginBottom:"1.75rem"}}>{person.era}</div>
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:T.dim,marginBottom:".6rem"}}>CONTRIBUTED</div>
              <div style={{fontFamily:T.body,fontSize:14,color:T.sub,lineHeight:1.9,padding:"1rem 1.25rem",background:"rgba(255,255,255,0.02)",borderLeft:`2px solid ${T.border}`}}>{person.contrib}</div>
            </div>
            {person.gap!=="—"&&<div style={{marginBottom:"1.5rem"}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:"#8B6030",marginBottom:".6rem"}}>WHERE THEY STOPPED</div>
              <div style={{fontFamily:T.body,fontSize:14,color:"#C8A878",lineHeight:1.9,padding:"1rem 1.25rem",background:"rgba(30,15,0,.4)",borderLeft:"2px solid rgba(139,96,48,.4)"}}>{person.gap}</div>
            </div>}
            <div>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:T.accent,marginBottom:".6rem"}}>HOW THE URP COMPLETES IT</div>
              <div style={{fontFamily:T.body,fontSize:14,color:"#A8D8BC",lineHeight:1.9,padding:"1rem 1.25rem",background:"rgba(0,20,12,.4)",borderLeft:`2px solid rgba(0,255,179,.25)`}}>{person.urp}</div>
            </div>
          </div>
        )}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// IDEAS
// ═══════════════════════════════════════════
function IdeasPage({go}){
  const ideas=[
    {n:"I",title:"Every number is n/R",sub:"The minimum unit of meaning",body:"Remove the declared reference and you don't have a smaller number. You have nothing. No measurement, no meaning. Every quantity you have ever measured — a temperature, a price, a probability, a speed — is a fraction of a declared reference, whether you declared it explicitly or not. n/R is the minimum unit of meaningful quantity."},
    {n:"II",title:"Zero has two forms",sub:"Non-existence and contextual depletion",body:"True zero is non-existence — no declared reference was ever established. The number line doesn't reach it; it is outside all declared domains. 0/R is something entirely different: the frame R is declared and active, but the content within it has been fully exhausted. The container exists. The content is gone. Every mathematical paradox involving zero traces to conflating these two structurally different states."},
    {n:"III",title:"1 is the only complete whole",sub:"Arrival, not just a number",body:"1 = n/R where n = R. The only value where the measurement equals the reference exactly. Every integer greater than 1 is a count of completed wholes — seven sealed reference frames, not a position at point 7 on an infinite line. Infinity is the direction of unbounded approach. 1 is the arrival. All of mathematics lives between 0 and 1 in this structural sense."},
  ];
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      <div style={{background:`linear-gradient(180deg,rgba(0,255,179,.04) 0%,transparent 100%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".6rem"}}>THREE IDEAS</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(26px,4vw,50px)",fontWeight:400,color:T.text,margin:0}}>The Framework in Three Sentences</h1>
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"3rem 3rem 4rem",display:"flex",flexDirection:"column",gap:"2px",background:T.bg}}>
        {ideas.map((idea,i)=>(
          <div key={idea.n} style={{display:"grid",gridTemplateColumns:"80px 1fr",padding:"2.5rem",border:`1px solid ${T.border}`,background:T.bg1,marginBottom:"1px"}}>
            <div style={{fontFamily:T.head,fontSize:64,fontWeight:700,color:`rgba(0,255,179,.1)`,lineHeight:1,marginTop:"-0.1em"}}>{idea.n}</div>
            <div>
              <h2 style={{fontFamily:T.head,fontSize:24,fontWeight:700,color:T.text,margin:"0 0 .2rem"}}>{idea.title}</h2>
              <div style={{fontFamily:T.body,fontSize:13,color:T.accent,opacity:.8,marginBottom:"1.1rem"}}>{idea.sub}</div>
              <p style={{fontFamily:T.body,fontSize:15,color:T.muted,lineHeight:2,margin:0}}>{idea.body}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// BLOG
// ═══════════════════════════════════════════
function BlogPage({go}){
  const [active,setActive]=useState(null);
  useEffect(()=>{
    const handler=(e)=>{
      const blogId=e.detail;
      const idx=BLOGS.findIndex(b=>b.id===blogId);
      if(idx>=0)setActive(idx);
    };
    window.addEventListener("openBlog",handler);
    return()=>window.removeEventListener("openBlog",handler);
  },[]);
  if(active!==null){
    const post=BLOGS[active];
    return(
      <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
        <div style={{maxWidth:720,margin:"0 auto",padding:"2.5rem 3rem 0"}}>
          <button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:T.dim,fontFamily:T.mono,fontSize:11,letterSpacing:".1em",cursor:"pointer",padding:"0 0 2rem",display:"block"}}
            onMouseEnter={e=>e.currentTarget.style.color=T.accent}
            onMouseLeave={e=>e.currentTarget.style.color=T.dim}>← BACK TO BLOG</button>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:post.tagColor,marginBottom:".65rem"}}>{post.tag}</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(22px,3vw,38px)",fontWeight:700,color:T.text,margin:"0 0 .75rem",lineHeight:1.2}}>{post.title}</h1>
          <p style={{fontFamily:T.body,fontSize:17,color:T.dim,fontStyle:"italic",marginBottom:"1.5rem",lineHeight:1.7}}>{post.sub}</p>
          <div style={{display:"flex",gap:"1.5rem",fontFamily:T.body,fontSize:13,color:T.dim,marginBottom:"2.5rem",paddingBottom:"2rem",borderBottom:`1px solid ${T.border}`}}>
            <span>{post.date}</span><span style={{color:T.faint}}>·</span><span>{post.readTime} read</span><span style={{color:T.faint}}>·</span><span style={{color:post.tagColor}}>{post.tag}</span>
          </div>
        </div>
        {/* Pull quote */}
        <div style={{maxWidth:720,margin:"0 auto",padding:"0 3rem 2.5rem"}}>
          <blockquote style={{margin:0,padding:"1.5rem 2rem",borderLeft:`4px solid ${post.tagColor}`,background:T.bg1,fontFamily:T.head,fontSize:"clamp(16px,2vw,22px)",color:T.text,fontStyle:"italic",lineHeight:1.65}}>
            "{post.pullQuote}"
          </blockquote>
        </div>
        {/* Body sections */}
        <div style={{maxWidth:720,margin:"0 auto",padding:"0 3rem 4rem"}}>
          {post.sections.map((s,i)=>(
            <div key={i} style={{marginBottom:"2.75rem"}}>
              <h2 style={{fontFamily:T.head,fontSize:"clamp(18px,2.2vw,24px)",fontWeight:700,color:T.text,marginBottom:"1rem",margin:"0 0 1rem"}}>{s.h}</h2>
              <p style={{fontFamily:T.body,fontSize:16,color:"#9A9590",lineHeight:2.1,margin:0}}>{s.b}</p>
            </div>
          ))}
          <div style={{paddingTop:"2.5rem",borderTop:`1px solid ${T.border}`,display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontFamily:T.mono,fontSize:9,color:post.tagColor,border:`1px solid ${post.tagColor}40`,padding:"4px 10px",letterSpacing:".1em"}}>{post.tag}</span>
            <span style={{fontFamily:T.mono,fontSize:9,color:T.dim,border:`1px solid ${T.border}`,padding:"4px 10px",letterSpacing:".1em"}}>URP SERIES</span>
            <span style={{fontFamily:T.mono,fontSize:9,color:T.dim,border:`1px solid ${T.border}`,padding:"4px 10px",letterSpacing:".1em"}}>OPEN ACCESS</span>
            {post.doi&&<a href={`https://doi.org/${post.doi}`} target="_blank" rel="noopener noreferrer"
              style={{fontFamily:T.mono,fontSize:9,color:T.accent,border:`1px solid rgba(0,255,179,.3)`,
                padding:"4px 10px",letterSpacing:".1em",textDecoration:"none"}}>
              PAPER ↗ doi.org/{post.doi}
            </a>}
          </div>
        </div>
        <Footer go={go}/>
      </div>
    );
  }
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      <div style={{background:`linear-gradient(180deg,rgba(0,100,80,.05) 0%,transparent 100%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".6rem"}}>BLOG</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(26px,4vw,50px)",fontWeight:400,color:T.text,margin:"0 0 .5rem"}}>Notes on the Framework</h1>
          <p style={{fontFamily:T.body,fontSize:15,color:T.muted,margin:0}}>Plain language. No equations required. The ideas behind the papers.</p>
        </div>
      </div>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"2.5rem 3rem 4rem",display:"flex",flexDirection:"column",gap:"1px",background:T.bg}}>
        {BLOGS.map((post,i)=>(
          <div key={post.id} onClick={()=>setActive(i)}
            style={{background:T.bg,padding:"2rem 2.5rem",cursor:"pointer",transition:"all .2s",
              borderLeft:"4px solid transparent"}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.bg1;e.currentTarget.style.borderLeftColor=post.tagColor;}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.bg;e.currentTarget.style.borderLeftColor="transparent";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".65rem",flexWrap:"wrap",gap:".5rem"}}>
              <span style={{fontFamily:T.mono,fontSize:9,color:post.tagColor,letterSpacing:".18em",border:`1px solid ${post.tagColor}35`,padding:"3px 8px"}}>{post.tag}</span>
              <span style={{fontFamily:T.body,fontSize:12,color:T.dim}}>{post.date} · {post.readTime} read</span>
            </div>
            <h2 style={{fontFamily:T.head,fontSize:"clamp(16px,2vw,22px)",fontWeight:700,color:T.text,margin:"0 0 .5rem",lineHeight:1.3}}>{post.title}</h2>
            <p style={{fontFamily:T.body,fontSize:14,color:T.muted,margin:"0 0 .85rem",lineHeight:1.7}}>{post.sub}</p>
            <div style={{fontFamily:T.head,fontSize:15,color:T.dim,fontStyle:"italic"}}>"{post.pullQuote}"</div>
          </div>
        ))}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════
function AboutPage({go}){
  return(
    <div style={{minHeight:"100vh",paddingTop:60,background:T.bg}}>
      <div style={{background:`linear-gradient(135deg,rgba(0,255,179,.04) 0%,transparent 60%)`,borderBottom:`1px solid ${T.border}`,padding:"3rem 3rem 2.5rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".25em",color:T.dim,marginBottom:".6rem"}}>ABOUT</div>
          <h1 style={{fontFamily:T.head,fontSize:"clamp(28px,4vw,54px)",fontWeight:400,color:T.text,margin:"0 0 .35rem"}}>Joshua Steven Brogley</h1>
          <div style={{fontFamily:T.body,fontSize:15,color:T.accent,opacity:.8}}>Independent Researcher · Almelo, Netherlands · 2026</div>
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"3rem 3rem 4rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:"3rem",alignItems:"start",flexWrap:"wrap"}}>
          <div>
            <p style={{fontFamily:T.body,fontSize:16,color:T.muted,lineHeight:2.1,marginBottom:"1.75rem",marginTop:0}}>
              I'm not a professional mathematician. I'm a head baseball coach, a father of two young children, and someone who spent years asking why the foundations of mathematics feel incomplete.
            </p>
            <p style={{fontFamily:T.body,fontSize:16,color:T.muted,lineHeight:2.1,marginBottom:"1.75rem",marginTop:0}}>
              Why is division by zero "undefined" rather than structurally explained? Why does the Riemann Hypothesis have ten trillion verified examples but no proof — and why hasn't anyone explained why the line is exactly one-half? Why do geometric formulas feel like disconnected memorization rather than a single coherent framework?
            </p>
            <p style={{fontFamily:T.body,fontSize:16,color:T.muted,lineHeight:2.1,marginTop:0,marginBottom:"2.5rem"}}>
              The Unitary Reference Principle is my answer. It started as a single observation about fractions — that every meaningful quantity is n/R, a fraction of a declared reference — and became a framework that reframes everything from primes to quantum mechanics to physical reality. Five papers published independently on Zenodo. Twelve more in progress.
            </p>
            <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:T.dim,marginBottom:"1.1rem"}}>PUBLISHED PAPERS</div>
            <div style={{display:"flex",flexDirection:"column",gap:"1px",background:T.bg2}}>
              {PAPERS.filter(p=>p.published).map(p=>(
                <a key={p.id} href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer"
                  style={{display:"grid",gridTemplateColumns:"52px 1fr auto",gap:"1rem",padding:"1.1rem 1.25rem",background:T.bg,textDecoration:"none",transition:"background .15s",alignItems:"center"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.bg1}
                  onMouseLeave={e=>e.currentTarget.style.background=T.bg}>
                  <span style={{fontFamily:T.mono,fontSize:11,color:p.color,letterSpacing:".1em"}}>P{p.num}</span>
                  <div>
                    <div style={{fontFamily:T.body,fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>{p.title}</div>
                    <div style={{fontFamily:T.body,fontSize:12,color:T.dim}}>{p.sub}</div>
                  </div>
                  <span style={{fontFamily:T.mono,fontSize:11,color:p.color}}>↗</span>
                </a>
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div style={{position:"sticky",top:68}}>
            <div style={{background:T.bg1,border:`1px solid ${T.border}`,padding:"1.75rem",marginBottom:"1px"}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:T.dim,marginBottom:"1rem"}}>THE SERIES</div>
              <div style={{fontFamily:T.body,fontSize:26,fontWeight:700,color:T.accent,marginBottom:".25rem"}}>17</div>
              <div style={{fontFamily:T.body,fontSize:13,color:T.muted,marginBottom:"1.25rem"}}>papers planned</div>
              <div style={{fontFamily:T.body,fontSize:26,fontWeight:700,color:T.accent,marginBottom:".25rem"}}>5</div>
              <div style={{fontFamily:T.body,fontSize:13,color:T.muted,marginBottom:"1.25rem"}}>papers published</div>
              <div style={{fontFamily:T.body,fontSize:26,fontWeight:700,color:T.accent,marginBottom:".25rem"}}>Open</div>
              <div style={{fontFamily:T.body,fontSize:13,color:T.muted}}>access · CC BY 4.0</div>
            </div>
            <div style={{background:T.bg1,border:`1px solid ${T.border}`,padding:"1.75rem"}}>
              <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:T.dim,marginBottom:"1rem"}}>CONTACT</div>
              <div style={{fontFamily:T.body,fontSize:13,color:T.muted,lineHeight:1.9}}>
                For academic inquiries, correspondence, or collaboration on the URP series, reach out via Zenodo or through the research community.<br/><br/>
                <span style={{color:T.accent}}>unitaryreference.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}


// ═══════════════════════════════════════════
// AXIOMS SECTION — home page scroll section
// ═══════════════════════════════════════════
function AxiomsSection({go}){
  const [hovAxiom,setHovAxiom]=useState(null);

  const axioms=[
    {
      num:"I",
      title:"Every number is n/R",
      sub:"The declared reference is not optional",
      body:"Remove the declared reference and you don't have a smaller number — you have nothing. Every quantity, every measurement, every mathematical object derives its meaning from a declared reference R. This is the foundational axiom from which everything else follows.",
      equation:"Q = n / R",
      eqNote:"Q is any quantity. n is the measured amount. R is the declared reference.",
      color:T.accent,
      blogId:4,
      blogTitle:"What Is a Number? A Question Mathematics Has Never Fully Answered",
    },
    {
      num:"II",
      title:"1 is the only complete whole",
      sub:"Completeness requires a declared reference to be equalled",
      body:"Within any declared reference R, exactly one state is complete: when n = R, giving n/R = 1. All integers greater than 1 are counts of completed reference frames — not single wholes of increasing size. The unit is always the whole. The integer is always a count.",
      equation:"n/R = 1  ⟺  n = R",
      eqNote:"Unique solution. The only arrival point.",
      color:T.accent,
      blogId:6,
      blogTitle:"Why Is 1 the Only Whole Number?",
    },
    {
      num:"III",
      title:"Zero is non-existence",
      sub:"Not a small number — structural absence",
      body:"Standalone zero is not the smallest positive quantity. It is the absence of any declared reference. You cannot perform operations that require a frame when no frame exists. This is why division by zero is not undefined but unconstructable.",
      equation:"0 ∉ Domain(R)  for any R",
      eqNote:"Zero is outside all declared domains.",
      color:T.warn,
      blogId:5,
      blogTitle:"Is Zero a Number? The Two Zeros Mathematics Has Always Conflated",
    },
    {
      num:"IV",
      title:"0/R is contextual depletion",
      sub:"The frame persists — the content is empty",
      body:"When a declared reference R is active but its content is fully exhausted, the result is 0/R — not non-existence. An empty bank account is not the same as no bank account. A discharged battery is not the same as no battery. The frame persists. This is the lower boundary of the fractional domain.",
      equation:"0/R ∈ Domain(R)",
      eqNote:"Zero content within an active frame. Structurally different from standalone zero.",
      color:T.blue,
      blogId:5,
      blogTitle:"Is Zero a Number? The Two Zeros Mathematics Has Always Conflated",
    },
    {
      num:"V",
      title:"n/R > 1 is surplus — a new R begins",
      sub:"Exceeding the frame initiates a new declared reference",
      body:"When n exceeds R, the current frame is complete and sealed. The surplus initiates a new declared reference R₂. 251 apples against a declared R of 250: one complete R, then 1/250 of R₂. This is the structural meaning of integers: counts of completed wholes, not single quantities larger than 1.",
      equation:"n/R > 1  ⟹  1·R complete + (n−R)/R of R₂",
      eqNote:"One complete reference, then a new partial state.",
      color:T.gold,
      blogId:4,
      blogTitle:"What Is a Number? A Question Mathematics Has Never Fully Answered",
    },
    {
      num:"VI",
      title:"The fraction is the exact answer",
      sub:"Decimals are representations — fractions are the reality",
      body:"1/3 is the exact answer. 0.333... is base-10 arithmetic struggling to represent it. The non-termination of a decimal is the signal that the fraction is irrational relative to that base — not that the fraction is wrong. Fractions are primary. Decimals are approximations.",
      equation:"1/3 ≡ exact   |   0.333... ≡ approach",
      eqNote:"The fraction is the arrival. The decimal is the journey.",
      color:T.blue,
      blogId:7,
      blogTitle:"What Does 0.333... Mean? Why the Fraction Is More Precise",
    },
    {
      num:"VII",
      title:"All measurement is Step 0 + Step 1 + Step 2",
      sub:"Every calculation has a mandatory first step that is usually skipped",
      body:"Step 0: declare R. Step 1: calculate n/R. Step 2: verify R is preserved. Division by zero fails at Step 0. The Pythagorean theorem is a Step 2 verification. Every geometric formula follows from a single Step 0 declaration. The missing step is always Step 0.",
      equation:"Step 0: declare R  →  Step 1: n/R  →  Step 2: verify",
      eqNote:"The mandatory structure underlying every calculation.",
      color:T.purple,
      blogId:1,
      blogTitle:"Division by Zero Is Not Undefined — It's Unconstructable",
    },
  ];

  return(
    <section style={{background:T.bg,borderTop:`1px solid ${T.border}`,padding:"6rem 3rem",position:"relative",zIndex:1}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"4.5rem"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".35em",color:T.dim,marginBottom:".75rem"}}>THE FRAMEWORK</div>
          <h2 style={{fontFamily:T.head,fontSize:"clamp(26px,4vw,48px)",fontWeight:700,color:T.text,margin:"0 0 1.25rem",lineHeight:1.1}}>Seven Axioms.<br/>One Declaration.</h2>
          <p style={{fontFamily:T.body,fontSize:17,color:T.muted,maxWidth:540,margin:"0 auto",lineHeight:1.9}}>Every claim in the 17-paper series follows from these structural axioms. Each has a dedicated essay that defends it, proves it, and answers the questions you're already forming.</p>
        </div>

        {/* Axioms grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1px",background:T.bg2,marginBottom:"3rem"}}>
          {axioms.map((ax,i)=>{
            const isHov=hovAxiom===i;
            return(
              <div key={ax.num}
                onMouseEnter={()=>setHovAxiom(i)}
                onMouseLeave={()=>setHovAxiom(null)}
                style={{background:isHov?`${ax.color}08`:T.bg,padding:"2rem",
                  transition:"all .25s",borderTop:`3px solid ${isHov?ax.color:"transparent"}`,
                  display:"flex",flexDirection:"column",gap:"1rem"}}>
                {/* Number + title */}
                <div style={{display:"flex",alignItems:"baseline",gap:".75rem"}}>
                  <span style={{fontFamily:T.head,fontSize:36,fontWeight:700,
                    color:`${ax.color}30`,lineHeight:1,flexShrink:0}}>{ax.num}</span>
                  <div>
                    <h3 style={{fontFamily:T.mono,fontSize:14,fontWeight:700,color:isHov?ax.color:T.text,margin:0,lineHeight:1.3}}>{ax.title}</h3>
                    <div style={{fontFamily:T.body,fontSize:12,color:ax.color,opacity:.7,marginTop:".2rem"}}>{ax.sub}</div>
                  </div>
                </div>
                {/* Body */}
                <p style={{fontFamily:T.body,fontSize:14,color:T.muted,lineHeight:1.85,margin:0}}>{ax.body}</p>
                {/* Equation box */}
                <div style={{background:T.faint,padding:".75rem 1rem",borderLeft:`2px solid ${ax.color}40`}}>
                  <div style={{fontFamily:T.mono,fontSize:13,color:ax.color,marginBottom:".25rem",fontWeight:700}}>{ax.equation}</div>
                  <div style={{fontFamily:T.body,fontSize:11,color:T.dim}}>{ax.eqNote}</div>
                </div>
                {/* Learn more link */}
                <button onClick={()=>{go("Blog");setTimeout(()=>{window.dispatchEvent(new CustomEvent("openBlog",{detail:ax.blogId}));},100);}}
                  style={{background:"transparent",border:`1px solid ${ax.color}30`,color:ax.color,
                    fontFamily:T.mono,fontSize:10,letterSpacing:".12em",padding:".45rem .85rem",
                    cursor:"pointer",transition:"all .2s",textAlign:"left",marginTop:"auto",
                    display:"flex",alignItems:"center",gap:".5rem"}}
                  onMouseEnter={e=>e.currentTarget.style.background=`${ax.color}10`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span>READ THE PROOF</span>
                  <span style={{opacity:.6}}>↗</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{textAlign:"center",paddingTop:"2rem",borderTop:`1px solid ${T.border}`}}>
          <div style={{fontFamily:T.body,fontSize:15,color:T.muted,marginBottom:"1.5rem"}}>All seven axioms are developed formally across the published papers.</div>
          <button onClick={()=>go("Papers")} style={{background:T.accent,color:"#020A06",border:"none",fontFamily:T.body,fontSize:14,fontWeight:700,padding:"1rem 2.5rem",cursor:"pointer",transition:"all .2s",letterSpacing:".03em"}}
            onMouseEnter={e=>e.currentTarget.style.background="#00DDA0"}
            onMouseLeave={e=>e.currentTarget.style.background=T.accent}>
            Explore the Papers →
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// PROVOCATIONS — Interactive Homepage Section
// ═══════════════════════════════════════════
function Provocations({go}){
  const [active,setActive]=useState(null);
  const [answered,setAnswered]=useState({});

  const questions=[
    {
      id:"whole",
      q:"Is 7 a whole number?",
      hint:"Most people say yes immediately.",
      choices:[
        {val:"yes",label:"Yes — 7 is a whole number"},
        {val:"no",label:"No — it depends on context"},
      ],
      reveal:{
        yes:`Your answer is conventional and completely reasonable. But consider what "whole" means structurally. The URP proposes that 1 is the only complete whole — the only value where a measurement exactly equals its declared reference. 7 is not one whole thing. It is seven completed reference frames, stacked. 7 apples is seven complete 1-apple references. 7 kilometres is seven complete 1-km references. The "7" is a count of completed wholes, not a whole itself. This isn't saying you're wrong — it's asking: what does "whole" actually mean? And the answer changes what integers are.`,
        no:`You're already thinking structurally. The URP formalises exactly this intuition: "whole" requires a declared reference, and whether 7 is whole depends entirely on what that reference is. 7/7 = 1, which is complete. 7/10 = 0.7, which is partial. 7/3 creates a surplus — more than one complete frame. The number 7 has no wholeness on its own. It is a count of completed units of a declared reference. This is the starting point of the Unitary Reference Principle.`,
      }
    },
    {
      id:"zero",
      q:"What is zero?",
      hint:"There might be more than one answer.",
      choices:[
        {val:"nothing",label:"Nothing — the absence of quantity"},
        {val:"number",label:"A number like any other"},
        {val:"placeholder",label:"A placeholder — an empty position"},
      ],
      reveal:{
        nothing:`This intuition is structurally correct in one sense, and the URP preserves it. Standalone zero — true zero — is non-existence: no declared reference was ever established. But there is a second kind of zero the URP calls 0/R, or contextual depletion. An empty bank account is not the same as no bank account. A fully discharged battery is not the same as no battery. In both cases, the frame persists — the account, the battery — but the content is exhausted. 0/R is "nothing within a declared frame." It behaves differently from non-existence. Conflating them is the source of centuries of mathematical confusion, including why division by zero has never been properly explained.`,
        number:`Convention treats zero this way, but the URP challenges it. If zero is a number like 3 or 7, then it should be expressible as n/R for some reference R. But what is the reference for zero? There is none — zero is the absence of any declared reference. This is why dividing by zero is not just "undefined" but structurally unconstructable: you cannot declare non-existence as a reference frame. Zero has a legitimate role in the URP, but not as a number. It is the boundary condition: the state before any reference is declared.`,
        placeholder:`You're thinking of 0/R — contextual depletion — which is one of the two zeros the URP distinguishes. The placeholder zero in positional notation (the "0" in 104 or 0.3) is exactly this: the frame exists (the positional column is declared), but the content is empty. This is structurally different from non-existence. The URP formalises the placeholder intuition: 0/R means the reference persists, the content is zero. Fibonacci was using this concept correctly in 1202 without having a name for it. You just named it.`,
      }
    },
    {
      id:"division",
      q:"Why is division by zero 'undefined'?",
      hint:"You were probably taught a rule without a reason.",
      choices:[
        {val:"rule",label:"It just is — that's the rule"},
        {val:"infinity",label:"Because it would be infinite"},
        {val:"noframe",label:"There's no reference frame to divide into"},
      ],
      reveal:{
        rule:`This is what most of us were taught, and there's nothing wrong with accepting it. But "undefined" is an administrative answer. It says we haven't defined it, not that it cannot be defined. Some systems do assign a value — IEEE arithmetic returns "infinity" or NaN. The URP goes deeper: division requires a declared reference R. When you divide 12 by 4, you declare R = 4 and ask how many times R fits into 12. When you try to divide by zero, you are attempting to declare R = 0. But zero has no declared reference to be a frame for. The operation is not undefined — it is unconstructable. The conditions for the operation's existence are not met, and cannot be met.`,
        infinity:`This is the limit argument: as the divisor approaches zero, the quotient grows without bound. It's a meaningful observation and has applications in analysis. But it confuses the limit of a process with the value at a point. The limit of 1/x as x→0 from the right is +∞. But that's the limit of the approach — it doesn't assign a value to 1/0 itself. The URP's answer is different: the problem is not that the result is too large to name. The problem is that the operation requires declaring R = 0 as a reference frame, and zero cannot be a reference frame. The issue is structural, not a matter of the result being large.`,
        noframe:`You've arrived at the URP answer directly. Every division operation requires a declared reference — a frame to divide into. Zero cannot be that reference because zero is the absence of any declared reference. There is no frame. The operation cannot be constructed. This is why the URP describes division by zero not as "undefined" but as "unconstructable" — a structural impossibility, not a definitional gap. The distinction matters: an undefined thing might be definable with more thought. An unconstructable thing cannot be constructed because the structural requirements for its existence are not satisfied.`,
      }
    },
    {
      id:"riemann",
      q:"The Riemann Hypothesis says all non-trivial zeros sit at exactly σ = ½. Why one-half?",
      hint:"165 years of mathematics hasn't answered this.",
      choices:[
        {val:"symmetry",label:"Because of the functional equation's symmetry"},
        {val:"unknown",label:"Nobody knows — that's why it's unsolved"},
        {val:"domain",label:"Because ½ is the midpoint of the fractional domain (0,1)"},
      ],
      reveal:{
        symmetry:`This is the standard mathematical observation, and it's true. The functional equation of the zeta function relates ζ(s) to ζ(1-s), creating a symmetry that pairs zeros at σ with zeros at 1-σ. But symmetry is an observation, not an explanation. Why does the symmetry force σ = ½ specifically? The URP's answer: because at any other position, the symmetric pairing creates two distinct depletion events in the same declared frame, forcing the frame into a deficit state. A deficit state cannot serve as a declared reference. Only σ = ½ maps to itself under the symmetry — one depletion event, self-symmetric, no deficit required.`,
        unknown:`That's exactly right, and it's been the honest answer for 167 years. But the URP proposes a structural reason. The critical strip 0 < σ < 1 is the domain of fractional reality: σ = 0 is non-existence, σ = 1 is complete wholeness, everything in between is a partial state. Zeros of the zeta function are 0/R depletion events — the function's frame persists, but its content momentarily exhausts. The only position in the strip where a depletion event is self-symmetric under the functional equation — where it doesn't require a partner depletion creating a structural deficit — is exactly σ = ½. That's the proposed structural answer. It's not a proof. But it's the first attempt at a reason.`,
        domain:`You're thinking structurally, and this is close to the URP's answer. The critical strip is indeed the fractional domain (0,1) in the URP framework — σ = 0 is non-existence, σ = 1 is complete wholeness. And ½ is the unique self-symmetric point of this domain under the functional equation's symmetry. More precisely: a depletion event at any σ ≠ ½ creates a symmetric partner at 1-σ, producing two distinct depletion events that force a structural deficit. Only ½ avoids this. The URP calls this self-symmetry without deficit: one depletion event that maps to itself, requiring no partner, creating no deficit. Structurally forced.`,
      }
    },
  ];

  const q=questions[active!==null?active:0];
  const currentAnswer=active!==null?answered[q.id]:null;

  return(
    <section style={{background:T.bg,padding:"5rem 3rem",position:"relative",zIndex:1,borderTop:`1px solid ${T.border}`}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        {/* Section header */}
        <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
          <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".3em",color:T.dim,marginBottom:".75rem"}}>BEFORE YOU READ THE PAPERS</div>
          <h2 style={{fontFamily:T.head,fontSize:"clamp(24px,3.5vw,42px)",fontWeight:700,color:T.text,margin:"0 0 1rem",lineHeight:1.15}}>What Does Your Intuition Say?</h2>
          <p style={{fontFamily:T.body,fontSize:17,color:T.muted,maxWidth:560,margin:"0 auto",lineHeight:1.9}}>The URP doesn't ask you to abandon what you know. It asks: what does your existing answer reveal about the structure underneath? Answer each question, then see what the framework finds there.</p>
        </div>

        {/* Question tabs */}
        <div style={{display:"flex",gap:0,marginBottom:"2rem",borderBottom:`1px solid ${T.border}`,overflowX:"auto"}}>
          {questions.map((q,i)=>(
            <button key={q.id} onClick={()=>setActive(i)} style={{
              padding:".75rem 1.25rem",background:"transparent",
              border:"none",borderBottom:`2px solid ${active===i?T.accent:"transparent"}`,
              color:active===i?T.text:T.dim,fontFamily:T.body,fontSize:13,
              cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",flexShrink:0,
              fontWeight:active===i?600:400}}>
              {answered[q.id]&&<span style={{color:T.accent,marginRight:".4rem",fontSize:10}}>✓</span>}
              {`Q${i+1}`}
            </button>
          ))}
        </div>

        {/* Active question */}
        {active!==null&&(()=>{
          const q=questions[active];
          const ans=answered[q.id];
          return(
            <div>
              <div style={{marginBottom:"2rem"}}>
                <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".2em",color:T.dim,marginBottom:".75rem"}}>QUESTION {active+1} OF {questions.length}</div>
                <h3 style={{fontFamily:T.head,fontSize:"clamp(20px,2.8vw,32px)",fontWeight:700,color:T.text,margin:"0 0 .5rem",lineHeight:1.2}}>{q.q}</h3>
                <div style={{fontFamily:T.body,fontSize:14,color:T.muted,fontStyle:"italic"}}>{q.hint}</div>
              </div>
              {!ans&&<div style={{display:"flex",flexDirection:"column",gap:".65rem",marginBottom:"1.5rem"}}>
                {q.choices.map(ch=>(
                  <button key={ch.val} onClick={()=>setAnswered(prev=>({...prev,[q.id]:ch.val}))} style={{
                    textAlign:"left",padding:"1.1rem 1.5rem",
                    background:T.bg1,border:`1px solid ${T.border}`,
                    color:T.sub,fontFamily:T.body,fontSize:15,cursor:"pointer",
                    transition:"all .2s",lineHeight:1.5}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.color=T.text;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}>
                    {ch.label}
                  </button>
                ))}
              </div>}
              {ans&&<>
                <div style={{padding:".6rem 1rem",background:T.bg1,border:`1px solid ${T.border}`,display:"inline-flex",alignItems:"center",gap:".75rem",marginBottom:"1.5rem"}}>
                  <span style={{fontFamily:T.mono,fontSize:10,color:T.dim,letterSpacing:".1em"}}>YOUR ANSWER</span>
                  <span style={{fontFamily:T.body,fontSize:14,color:T.accent}}>
                    {q.choices.find(c=>c.val===ans)?.label}
                  </span>
                </div>
                <div style={{padding:"1.75rem 2rem",background:"rgba(0,20,12,.4)",borderLeft:`4px solid ${T.accent}`,marginBottom:"1.75rem"}}>
                  <div style={{fontFamily:T.mono,fontSize:9,letterSpacing:".2em",color:T.accent,marginBottom:".85rem"}}>WHAT THE URP FINDS IN YOUR ANSWER</div>
                  <div style={{fontFamily:T.body,fontSize:15,color:"#B8D8C8",lineHeight:2.05}}>{q.reveal[ans]}</div>
                </div>
                <div style={{display:"flex",gap:".75rem",alignItems:"center",flexWrap:"wrap"}}>
                  {active<questions.length-1&&<button onClick={()=>setActive(active+1)} style={{background:T.accent,color:T.bg,border:"none",fontFamily:T.body,fontSize:13,fontWeight:700,padding:".65rem 1.5rem",cursor:"pointer"}}>Next Question →</button>}
                  {active===questions.length-1&&Object.keys(answered).length===questions.length&&<button onClick={()=>go("Papers")} style={{background:T.accent,color:T.bg,border:"none",fontFamily:T.body,fontSize:13,fontWeight:700,padding:".65rem 1.75rem",cursor:"pointer"}}>Explore the Papers →</button>}
                  <button onClick={()=>setAnswered(prev=>{const n={...prev};delete n[q.id];return n;})} style={{background:"transparent",color:T.dim,border:`1px solid ${T.border}`,fontFamily:T.body,fontSize:13,padding:".65rem 1.25rem",cursor:"pointer"}}>Change my answer</button>
                </div>
              </>}
            </div>
          );
        })()}

        {/* Start prompt if none active */}
        {active===null&&<div style={{textAlign:"center",padding:"2.5rem",border:`1px solid ${T.border}`,background:T.bg1}}>
          <div style={{fontFamily:T.body,fontSize:16,color:T.muted,marginBottom:"1.25rem"}}>Four questions. Your answers reveal the structure underneath your intuitions.</div>
          <button onClick={()=>setActive(0)} style={{background:T.accent,color:T.bg,border:"none",fontFamily:T.body,fontSize:14,fontWeight:700,padding:".8rem 2rem",cursor:"pointer"}}>Start with Question 1</button>
        </div>}
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════
function Hero({go}){
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setTimeout(()=>setLoaded(true),100);},[]);
  return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",padding:"0 3rem",position:"relative",zIndex:1,textAlign:"center",
      background:`radial-gradient(ellipse at 50% 60%,rgba(0,255,179,.06) 0%,transparent 65%)`}}>
      <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 1.2s ease"}}>
        <div style={{fontFamily:T.mono,fontSize:10,letterSpacing:".4em",color:"rgba(0,255,179,.5)",marginBottom:"2rem"}}>
          UNITARY REFERENCE PRINCIPLE
        </div>
        <div style={{fontFamily:T.head,fontSize:"clamp(72px,14vw,130px)",fontWeight:700,color:T.text,
          lineHeight:.9,marginBottom:".5rem",letterSpacing:"-.03em",
          textShadow:"0 0 80px rgba(245,240,232,.06)"}}>
          n/R
        </div>
        <div style={{fontFamily:T.body,fontSize:18,color:"rgba(0,255,179,.45)",letterSpacing:".1em",marginBottom:"3rem",fontStyle:"italic"}}>
          = meaning
        </div>
        <p style={{fontSize:"clamp(15px,1.8vw,19px)",color:T.muted,lineHeight:1.95,maxWidth:520,marginBottom:"3.5rem",fontFamily:T.body}}>
          Every number is a fraction of a declared reference.<br/>
          Every formula follows from one declaration.<br/>
          17 papers. From primes to quantum gravity.
        </p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",marginBottom:"5rem"}}>
          <button onClick={()=>go("Papers")} style={{background:T.accent,color:"#020A06",border:"none",fontFamily:T.body,fontSize:14,fontWeight:700,letterSpacing:".05em",padding:"1rem 2.5rem",cursor:"pointer",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#00DDA0"}
            onMouseLeave={e=>e.currentTarget.style.background=T.accent}>
            Explore the Papers
          </button>
          <button onClick={()=>go("History")} style={{background:"transparent",color:T.accent,border:`1px solid rgba(0,255,179,.35)`,fontFamily:T.body,fontSize:14,letterSpacing:".05em",padding:"1rem 2.5rem",cursor:"pointer",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,255,179,.35)"}>
            14 Mathematicians
          </button>
        </div>
        <div style={{display:"flex",gap:"4rem",flexWrap:"wrap",justifyContent:"center"}}>
          {[{n:"5",l:"Papers Published"},{n:"17",l:"Total Series"},{n:"14",l:"Mathematicians"}].map(({n,l})=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:T.head,fontSize:40,fontWeight:700,color:T.accent,lineHeight:1}}>{n}</div>
              <div style={{fontFamily:T.body,fontSize:13,color:T.dim,marginTop:".3rem"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
export default function App(){
  const {mobile}=useBreakpoint();
  const [page,setPage]=useState("Home");
  const [selectedPaper,setSelectedPaper]=useState(null);
  const go=useCallback((p)=>{if(p==="Demo"){window.open("/body-explorer.html","_blank");return;}setPage(p);setSelectedPaper(null);window.scrollTo(0,0);},[]);
  const handleSelectPaper=(paper)=>{setSelectedPaper(paper);setPage("PaperDetail");window.scrollTo(0,0);};
  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:T.body}}>
      <ParticleField/>
      <Nav page={page} go={go} mobile={mobile}/>
      {page==="Home"&&<><Hero go={go}/><AxiomsSection go={go}/><Provocations go={go}/><Footer go={go}/></>}
      {page==="Papers"&&<PapersPage onSelectPaper={handleSelectPaper} mobile={mobile} go={go}/>}
      {page==="PaperDetail"&&selectedPaper&&<PaperPage paper={selectedPaper} onBack={()=>go("Papers")} go={go}/>}
      {page==="History"&&<HistoryPage mobile={mobile} go={go}/>}
      
      {page==="Ideas"&&<IdeasPage go={go}/>}
      {page==="Blog"&&<BlogPage go={go}/>}
      {page==="About"&&<AboutPage go={go}/>}
    </div>
  );
}
