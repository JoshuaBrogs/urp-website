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
   sub:"Your math teacher wasn't wrong. But the reason they gave wasn't quite right.",
   pullQuote:"You cannot divide by what doesn't exist as a frame. It's not a rule. It's a structural impossibility.",
   sections:[
     {h:"The Wall Every Student Hits",b:"5 ÷ 0. It appears on the board and the explanation follows: 'That's undefined. Don't do it. Move on.' Most of us memorize the rule and carry on. But 'undefined' never sat right. It sounds like the mathematical community just hasn't gotten around to defining it — like a gap in the map, not a wall."},
     {h:"What the URP Says",b:"The Unitary Reference Principle gives a structural answer: zero has no declared reference. There is no R. Without R, there is no frame to divide into. Division requires a declared partition — a reference that says 'this is what we're splitting.' Zero cannot be that reference, because zero is the absence of any declared reference. It's not undefined. It's unconstructable. The question itself requests something that cannot structurally exist."},
     {h:"Why the Distinction Matters",b:"'Undefined' implies a missing definition. 'Unconstructable' implies a structural barrier. One is a gap in our knowledge. The other is a feature of reality. Every time a student is told division by zero is undefined, they're being given an administrative answer to a structural question. The URP replaces administration with reason."},
   ]},
  {id:2,date:"April 24, 2026",readTime:"6 min",tag:"NUMBER THEORY",tagColor:T.blue,
   title:"Does 0.999... Really Equal 1?",
   sub:"Millions have seen the algebraic proof. Millions still don't believe it. They might be onto something.",
   pullQuote:"1 is a destination. 0.999... is a journey. They are not the same thing.",
   sections:[
     {h:"The Proof That Doesn't Convince",b:"Let x = 0.999... Multiply both sides by 10: 10x = 9.999... Subtract x: 9x = 9. Therefore x = 1. The logic is valid. And yet millions who see this proof remain unconvinced. They're not being irrational. They're sensing something the proof glosses over."},
     {h:"The Hidden Assumption",b:"The proof assumes that 0.999... is already a completed value — a fixed point on the number line. But it isn't. 0.999... is a process: base-10 arithmetic running forever, generating 9s, never terminating. It approaches 1 without arriving. The proof treats the destination as if it were already reached. Under the URP, approach and arrival are structurally different."},
     {h:"The Fraction Is the Exact Answer",b:"The fraction 1/3 is the exact answer. The decimal 0.333... is what base-10 arithmetic produces when it struggles to represent 1/3. The non-termination is the signal that the fraction is irrational relative to base-10 — not that the fraction is wrong, but that the representation is incomplete. The fraction is the declared reference. The decimal is the infinite journey toward expressing it."},
   ]},
  {id:3,date:"April 26, 2026",readTime:"8 min",tag:"MILLENNIUM PROBLEMS",tagColor:T.warn,
   title:"The Riemann Hypothesis: Why Nobody Could Answer 'Why ½?'",
   sub:"165 years. Trillions of verified zeros. Nobody could explain WHY that specific line.",
   pullQuote:"Only ½ maps to itself. One depletion event. Self-symmetric. Structurally forced.",
   sections:[
     {h:"The Most Famous Unsolved Problem",b:"In 1859, Bernhard Riemann published a paper on the distribution of prime numbers. It contained an observation: the non-trivial zeros of his zeta function all appear to have real part exactly equal to one-half. Since then, ten trillion zeros have been computed. Every single one sits on that line. And nobody has been able to prove it — or to explain why ½ specifically."},
     {h:"The Critical Strip Is the URP Domain",b:"The critical strip 0 < σ < 1 is not an arbitrary region of analytic continuation. It is the domain of fractional reality under the URP. σ = 0 is non-existence — no declared reference. σ = 1 is complete wholeness — the declared reference fully achieved. Every value between 0 and 1 is a partial state. The Riemann zeta function operates entirely within the URP's domain."},
     {h:"The Structural Answer",b:"A zero of the zeta function is a point of 0/R depletion. The functional equation maps σ to 1−σ. A zero at σ creates a mirror zero at 1−σ. If σ ≠ ½, there are two distinct depletion events in the same declared frame. Two depletions require the frame to go negative — a deficit state. A deficit cannot serve as a declared reference. The frame breaks. Only σ = ½ maps to itself: one depletion event, self-symmetric, no deficit required. Structurally forced."},
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
          <div style={{paddingTop:"2.5rem",borderTop:`1px solid ${T.border}`,display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            <span style={{fontFamily:T.mono,fontSize:9,color:post.tagColor,border:`1px solid ${post.tagColor}40`,padding:"4px 10px",letterSpacing:".1em"}}>{post.tag}</span>
            <span style={{fontFamily:T.mono,fontSize:9,color:T.dim,border:`1px solid ${T.border}`,padding:"4px 10px",letterSpacing:".1em"}}>URP SERIES</span>
            <span style={{fontFamily:T.mono,fontSize:9,color:T.dim,border:`1px solid ${T.border}`,padding:"4px 10px",letterSpacing:".1em"}}>OPEN ACCESS</span>
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
  const go=useCallback((p)=>{setPage(p);setSelectedPaper(null);window.scrollTo(0,0);},[]);
  const handleSelectPaper=(paper)=>{setSelectedPaper(paper);setPage("PaperDetail");window.scrollTo(0,0);};
  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:T.body}}>
      <ParticleField/>
      <Nav page={page} go={go} mobile={mobile}/>
      {page==="Home"&&<><Hero go={go}/><Footer go={go}/></>}
      {page==="Papers"&&<PapersPage onSelectPaper={handleSelectPaper} mobile={mobile} go={go}/>}
      {page==="PaperDetail"&&selectedPaper&&<PaperPage paper={selectedPaper} onBack={()=>go("Papers")} go={go}/>}
      {page==="History"&&<HistoryPage mobile={mobile} go={go}/>}
      {page==="Demo"&&<BodyExplorer/>}
      {page==="Ideas"&&<IdeasPage go={go}/>}
      {page==="Blog"&&<BlogPage go={go}/>}
      {page==="About"&&<AboutPage go={go}/>}
    </div>
  );
}
