import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════
const C = {
  bg:"#080C08", bg1:"rgba(255,255,255,0.02)", bg2:"rgba(255,255,255,0.04)",
  border:"rgba(255,255,255,0.06)", accent:"#00FFB3",
  text:"#F5F0E8", muted:"#888", dim:"#444", faint:"#222",
  mono:"'JetBrains Mono',monospace", sans:"'Space Mono',monospace",
};

// ═══════════════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════════════
const PAPERS = [
  { id:1,num:"01",title:"The Foundation",sub:"What is a number, really?",color:"#00FFB3",doi:"10.5281/zenodo.19697119",published:true,
    desc:"1 is the only complete unit. Zero is non-existence. Every number is a fraction of a declared reference.",visual:"foundation",
    claims:[
      {t:"Every number is n/R",trad:"Numbers are abstract objects on the real line",urp:"Every number is a fraction of a declared reference. No reference → no number."},
      {t:"1 is the only complete unit",trad:"1 is just another number",urp:"1 = n/R where n=R. The only value where measurement equals reference. Complete wholeness."},
      {t:"Zero is non-existence",trad:"0 is a number you can compute with freely",urp:"0 is the absence of a declared reference. Not small — structurally absent."},
      {t:"0/R is contextual depletion",trad:"No distinction between types of zero",urp:"0/R: frame declared, content empty. The container exists. The content is gone."},
      {t:"Surplus: n/R > 1",trad:"Numbers greater than 1 are just... bigger numbers",urp:"n > R means one complete declared whole is achieved and a new R begins. 251 apples with R=250: one complete R + 1/250 of R₂."},
    ]},
  { id:2,num:"02",title:"Division",sub:"Declared partition, not reduction",color:"#00D4FF",doi:"10.5281/zenodo.19733441",published:true,
    desc:"Why 0.333... is a process not an answer. Why division by zero is unconstructable.",visual:"division",
    claims:[
      {t:"Division by zero is unconstructable",trad:"Division by zero is undefined — a rule to memorize",urp:"Zero has no declared reference. You cannot divide by what doesn't exist as a frame. Not a rule — structural impossibility."},
      {t:"The fraction is the exact answer",trad:"1/3 = 0.333... (infinite decimal)",urp:"1/3 is the arrival. 0.333... is base-10 struggling to express it. The decimal is an infinite journey toward the fraction."},
      {t:"Fractions are irreducible when irrational",trad:"Irrational numbers need decimal approximation",urp:"arccos(1/3)/π is exact. Its decimal ≈ 0.3918... never terminates because the value is genuinely irrational relative to base-10."},
    ]},
  { id:3,num:"03",title:"Riemann Hypothesis",sub:"Why ½? Finally answered.",color:"#FF6B6B",doi:"10.5281/zenodo.19735713",published:true,
    desc:"The $1M unsolved problem. The critical strip is the URP domain (0,1). The zeros must sit at ½.",visual:"riemann",
    claims:[
      {t:"The critical strip IS the URP domain",trad:"The strip 0<σ<1 is a region of convergence",urp:"The strip is the domain of fractional reality. Zero = non-existence. One = complete wholeness. All partial states live between."},
      {t:"Zeros are 0/R depletion events",trad:"Zeros are where ζ(s)=0 — analytical zeros",urp:"Not true zero — contextual depletion. Frame persists, content momentarily exhausted."},
      {t:"½ is the only self-symmetric position",trad:"The functional equation maps σ to 1−σ",urp:"A zero off ½ creates two depletion events requiring the frame to go negative — a deficit. Only ½ maps to itself."},
    ]},
  { id:4,num:"04",title:"Geometry",sub:"All measurement is a fraction of R",color:"#FFB347",doi:"10.5281/zenodo.19847459",published:true,
    desc:"π is a bridge reference. The Pythagorean theorem is Step 2. Every formula from one declaration.",visual:"geometry",
    claims:[
      {t:"π is a bridge reference",trad:"π ≈ 3.14159... — a transcendental constant",urp:"π bridges the diameter domain to the circumference domain. C = π×d where π = R(bridge) between two incommensurable declared references."},
      {t:"Angles are fractions of R = 2π",trad:"Angle formulas are separate theorems",urp:"Declare R = 2π. Triangle sum = ½R. Not a theorem — a structural consequence of the declaration."},
      {t:"Pythagorean theorem is Step 2",trad:"a²+b²=c² — proved via similar triangles",urp:"Declare R = hypotenuse. sin²θ+cos²θ=1 verifies R persists. a²+b²=c² is that verification."},
      {t:"D(cube)=0 is 0/R, not non-existence",trad:"D(cube)=0 — algebraic result",urp:"The angle frame Rθ=π is always active. D=0 means irrational content depleted to 0/Rθ. Frame present, content empty."},
    ]},
  { id:5,num:"05",title:"Physical Reality",sub:"The universe lives in (0,1)",color:"#C77DFF",doi:"10.5281/zenodo.19853265",published:true,
    desc:"Binary, fiber optics, quantum mechanics, thermodynamics — all expressions of the same domain.",visual:"physics",
    claims:[
      {t:"Physical reality operates in (0,1)",trad:"Physical quantities range from 0 to ∞",urp:"Every physical quantity is n/R. The universe never reaches standalone zero — that would require a receiving frame of non-existence."},
      {t:"Conservation laws are frame persistence",trad:"Energy is conserved — an empirical law",urp:"Energy cannot reach standalone zero. Conservation is structural, not empirical."},
      {t:"Binary operates at domain boundaries",trad:"Binary is 0 and 1 — two values",urp:"Binary uses 0/R (depleted) and R (complete). Classical computing is boundary-only. Quantum computing uses the full (0,1) interior."},
    ]},
  { id:6,num:"06",title:"Algebra",sub:"Declared reference structures",color:"#00FFB3",published:false,desc:"Groups, rings, fields reframed. Why −1×−1=1. Euler's formula as Step 2.",visual:"generic",claims:[{t:"−1×−1=1 is structural",trad:"Rule to memorize",urp:"Double negation returns to R. Follows from frame structure."},{t:"Euler's formula is Step 2",trad:"e^(iπ)+1=0 — mysterious identity",urp:"Rotating by π (half of R=2π) reaches the opposite of the starting reference. Frame completion."}]},
  { id:7,num:"07",title:"Goldbach",sub:"Primes always pair",color:"#00D4FF",published:false,desc:"Every even number is the sum of two primes.",visual:"generic",claims:[{t:"Primes are self-referencing wholes",trad:"Primes have no factors other than 1 and themselves",urp:"p/p = 1. Primes are their own declared reference."}]},
  { id:8,num:"08",title:"Navier-Stokes",sub:"Fluid motion without singularities",color:"#FF6B6B",published:false,desc:"The equations of fluid flow as declared reference conservation.",visual:"generic",claims:[{t:"Velocity cannot reach infinity",trad:"May blow up in finite time — open problem",urp:"Velocity is n/R. Reaching infinity requires R=0 — unconstructable."}]},
  { id:9,num:"09",title:"BSD Conjecture",sub:"Rational points on elliptic curves",color:"#FFB347",published:false,desc:"L-functions as generators of rational points.",visual:"generic",claims:[{t:"L(E,1)=0 is 0/R depletion",trad:"Numerical observation unproven",urp:"Contextual depletion at s=1 → infinitely many rational points."}]},
  { id:10,num:"10",title:"P vs NP",sub:"Finding ≠ Checking",color:"#C77DFF",published:false,desc:"Step 0 cannot be shortcut. P≠NP.",visual:"generic",claims:[{t:"Step 0 cannot be skipped",trad:"Unknown whether solving = checking",urp:"Step 0 (declare R) is prior to all computation. Finding and checking are structurally different."}]},
  { id:11,num:"11",title:"Calculus",sub:"Approach without arrival",color:"#00FFB3",published:false,desc:"Limits as approach-without-arrival.",visual:"generic",claims:[{t:"Limits are approach-without-arrival",trad:"ε-δ definition",urp:"A limit approaches a declared reference without arriving. The limit IS the declared reference."}]},
  { id:12,num:"12",title:"Statistics",sub:"Declared denominators required",color:"#00D4FF",published:false,desc:"Every statistic requires a declared reference.",visual:"generic",claims:[{t:"Every statistic needs a declared R",trad:"Statistics are computed from data",urp:"Without a declared denominator R, any fraction is meaningless. Undeclared R is the source of all statistical manipulation."}]},
  { id:13,num:"13",title:"Number Theory",sub:"Primes as self-referencing wholes",color:"#FF6B6B",published:false,desc:"Integers as counts of declared wholes.",visual:"generic",claims:[{t:"Fundamental Theorem is a URP statement",trad:"Every integer factors uniquely into primes",urp:"Every integer is a product of self-referencing wholes. Each prime contributes an independent reference frame."}]},
  { id:14,num:"14",title:"Dehn Invariant",sub:"Scissors congruence & 0/R",color:"#FFB347",published:false,desc:"D(cube)=0 is 0/R — not non-existence. Structural prediction for dimensions ≥ 5.",visual:"dehn",claims:[{t:"D(P)=0 is contextual depletion",trad:"D(cube)=0: algebraic result",urp:"The angle frame Rθ=π is active for every polyhedron. D=0 means 0/Rθ. Frame present, depleted."},{t:"New invariants at even dimensions ≥ 6",trad:"Dimensions ≥ 5: open since 1968",urp:"Independent references = 1+⌊(n-2)/2⌋. New invariant required at dimension 6. Testable prediction."}]},
  { id:15,num:"15",title:"Linear Algebra",sub:"Reference frame transformations",color:"#C77DFF",published:false,desc:"Eigenvalues as self-referencing scalings.",visual:"generic",claims:[{t:"Eigenvalues are self-referencing scalings",trad:"Ax=λx",urp:"λ is the n/R value. λ=1: vector is its own reference. λ=0: depletion."}]},
  { id:16,num:"16",title:"Topology",sub:"Declared neighborhood persistence",color:"#00FFB3",published:false,desc:"Continuity is frame preservation.",visual:"generic",claims:[{t:"Continuity is frame preservation",trad:"Small input changes → small output changes",urp:"A continuous function preserves declared reference neighborhoods. The frame is not torn."}]},
  { id:17,num:"17",title:"People's Edition",sub:"For everyone",color:"#00FFB3",published:false,desc:"The complete framework in plain language. No equations required.",visual:"generic",claims:[]},
];

const HISTORY=[
  {year:"c.300 BCE",name:"Euclid",era:"Ancient",color:"#C8A96E",contrib:"Axioms, proofs, geometry. Elements establishes deductive mathematics.",gap:"No framework for zero. Numbers are geometric magnitudes. Fractions are ratios of lengths.",urp:"URP names what Euclid intuited: measurement requires a declared reference (his 'unit'). His axioms are URP Step 0 applied to geometry."},
  {year:"c.628 CE",name:"Brahmagupta",era:"Medieval",color:"#E8A87C",contrib:"First rules for arithmetic with zero. Zero as a number you can compute with.",gap:"Treats division by zero as yielding 0/0 or infinity — not structurally resolved.",urp:"Division by zero is unconstructable, not undefined. Brahmagupta got closer than anyone before but lacked the frame concept."},
  {year:"1202",name:"Fibonacci",era:"Medieval",color:"#D4B896",contrib:"Introduces Hindu-Arabic numerals to Europe. Zero as placeholder.",gap:"Zero as placeholder only — no structural theory.",urp:"The placeholder zero is 0/R: the position (frame) exists, the content is empty."},
  {year:"1637",name:"Descartes",era:"Early Modern",color:"#7EB8C9",contrib:"Coordinate geometry. Connects algebra and geometry. Negative numbers as direction.",gap:"Negative numbers as 'below zero' — direction without structural explanation.",urp:"Negatives are movement away from R. Not below zero — a declared opposite direction from the reference."},
  {year:"1665",name:"Newton & Leibniz",era:"Scientific Revolution",color:"#88C9A8",contrib:"Calculus. Limits, derivatives, integrals. Infinitesimals.",gap:"Infinitesimals logically suspect — 'ghosts of departed quantities' (Berkeley).",urp:"dx is approach-without-arrival. The derivative is the instantaneous n/R rate. The limit IS the declared reference."},
  {year:"1859",name:"Riemann",era:"19th Century",color:"#A888C9",contrib:"Riemann Hypothesis. Zeta function. Critical strip 0<σ<1.",gap:"Why ½? Riemann noted it but never explained why zeros must be on the critical line.",urp:"The critical strip IS the URP domain (0,1). Zeros are 0/R events. ½ is the only self-symmetric position."},
  {year:"1874",name:"Cantor",era:"19th Century",color:"#C988A8",contrib:"Set theory. Infinite cardinalities. Different sizes of infinity.",gap:"Paradoxes (Russell's). Infinity treated as a completed object.",urp:"Infinity is approach-without-arrival. Paradoxes arise from treating the approach as an arrival."},
  {year:"1900",name:"Hilbert",era:"20th Century",color:"#88A8C9",contrib:"23 problems. Hilbert's Third: can equal-volume polyhedra always be cut and reassembled?",gap:"Couldn't explain why volume alone is insufficient.",urp:"Scissors congruence requires matching ALL declared reference frames — volume AND angle references."},
  {year:"1901",name:"Dehn",era:"20th Century",color:"#8BA888",contrib:"Solved Hilbert's Third. Dehn invariant: a second invariant beyond volume.",gap:"Why does the Dehn invariant work? Why do rational angles vanish? No structural explanation.",urp:"Rational angles deplete to 0/Rθ. Irrational angles persist. Dehn found the invariant. URP explains why it exists."},
  {year:"1931",name:"Gödel",era:"20th Century",color:"#C9A888",contrib:"Incompleteness theorems. True unprovable statements exist in any sufficient formal system.",gap:"Incompleteness seen as a fundamental limitation with no deeper explanation.",urp:"Unprovable statements are true statements about declared references the formal system hasn't declared. A frame problem."},
  {year:"1948",name:"Shannon",era:"Modern",color:"#88C9C9",contrib:"Information theory. Entropy. The bit. Channel capacity.",gap:"The bit is defined operationally. No structural explanation for why binary.",urp:"Binary operates at the two extreme states of the URP domain: 0/R and R. Shannon entropy is a URP measurement of expected depletion."},
  {year:"1965",name:"Sydler",era:"Modern",color:"#A8C988",contrib:"Proved volume + Dehn invariant sufficient for scissors congruence in 3D.",gap:"No proof for dimensions ≥ 5. Open ever since.",urp:"URP formula: 1+⌊(n-2)/2⌋ independent references. New invariants at even dimensions ≥ 6."},
  {year:"1982",name:"Feynman",era:"Modern",color:"#C9C988",contrib:"Quantum computing concept. Quantum systems need quantum computers to simulate.",gap:"Why can't classical computers simulate quantum? No structural reason given.",urp:"Classical computing is boundary-only (0/R and R). Quantum operates in the full interior (0,1)."},
  {year:"2026",name:"Brogley",era:"Contemporary",color:"#00FFB3",contrib:"Unitary Reference Principle. The structural framework underlying all of mathematics.",gap:"—",urp:"Every number is n/R. Every measurement requires a declared reference. 0 is non-existence. 0/R is contextual depletion. 1 is complete wholeness."},
];

const BLOGS=[
  {id:1,date:"April 22, 2026",readTime:"5 min",tag:"FOUNDATIONS",tagColor:"#00FFB3",
   title:"Division by Zero Is Not 'Undefined' — It's Unconstructable",
   sub:"Your math teacher wasn't wrong. But the reason they gave wasn't quite right.",
   pullQuote:"You cannot divide by what doesn't exist as a frame.",
   sections:[
     {heading:"The Wall Every Student Hits",body:"5 ÷ 0. It appears on the board and the explanation comes: 'That's undefined. Don't do it. Move on.' Most of us memorize the rule and carry on. But the rule never sat right. 'Undefined' sounds like the mathematical community just hasn't gotten around to defining it yet. Like it's a gap in the map, not a structural impossibility."},
     {heading:"The URP Answer",body:"The Unitary Reference Principle gives a precise structural answer: zero has no declared reference. There is no R. Without R, there is no frame to divide into. Division requires a declared partition — a reference that says 'this is what we're splitting.' Zero cannot be that reference, because zero is the absence of any declared reference. It's not undefined. It's unconstructable. The question has no foundation, not because mathematicians haven't answered it, but because the question itself requests something that cannot structurally exist."},
     {heading:"Why This Matters",body:"The distinction matters beyond pedantry. 'Undefined' implies a missing definition. 'Unconstructable' implies a structural barrier. One is a gap in our knowledge. The other is a feature of reality. Every time a student is told division by zero is 'undefined,' they're being given a bureaucratic answer to a structural question. The URP replaces that bureaucracy with a reason."},
   ]},
  {id:2,date:"April 24, 2026",readTime:"6 min",tag:"NUMBER THEORY",tagColor:"#00D4FF",
   title:"Does 0.999... Really Equal 1?",
   sub:"Millions have seen the algebraic proof. Millions still don't believe it. They might be onto something.",
   pullQuote:"1 is a destination. 0.999... is a journey toward it.",
   sections:[
     {heading:"The Proof That Doesn't Convince",body:"The algebraic proof is elegant. Let x = 0.999... Multiply both sides by 10: 10x = 9.999... Subtract x from both sides: 9x = 9. Therefore x = 1. The logic is valid. And yet millions who see this proof feel unconvinced. They're not being irrational. They're sensing something the proof glosses over."},
     {heading:"The Hidden Assumption",body:"The proof assumes that 0.999... is already a completed value — a fixed point on the number line. But it isn't. 0.999... is a process. It's base-10 arithmetic running forever, generating 9s, never terminating. It approaches 1 without arriving. The proof treats the destination as if it were already reached. Under the URP, approach and arrival are structurally different operations. 0.999... is the approach. 1 is the arrival."},
     {heading:"The Fraction Is the Answer",body:"The URP makes this precise: the fraction 1/3 is the exact answer. The decimal 0.333... is what base-10 arithmetic produces when it struggles to express 1/3. The non-termination of the decimal is the signal that the fraction is irrational relative to base-10 — not that the fraction is wrong, but that the representation is incomplete. The fraction is the declared reference. The decimal is the infinite journey toward expressing it."},
   ]},
  {id:3,date:"April 26, 2026",readTime:"8 min",tag:"MILLENNIUM PROBLEMS",tagColor:"#FF6B6B",
   title:"The Riemann Hypothesis: Why Nobody Could Answer 'Why ½?'",
   sub:"165 years. Trillions of verified zeros. Nobody could explain WHY that specific line.",
   pullQuote:"Only ½ maps to itself. One depletion event. Self-symmetric. Structurally forced.",
   sections:[
     {heading:"The Most Famous Unsolved Problem",body:"In 1859, Bernhard Riemann published a paper on the distribution of prime numbers. It contained a hypothesis: the non-trivial zeros of his zeta function all have real part equal to exactly one-half. Since then, ten trillion zeros have been computed. Every single one sits on that line. The hypothesis has never been proven — and more strikingly, nobody has been able to explain why ½ specifically."},
     {heading:"The Critical Strip Is the URP Domain",body:"The answer starts with recognising what the critical strip is. The strip 0 < σ < 1 is the domain of fractional reality under the URP. σ = 0 is non-existence — no declared reference. σ = 1 is complete wholeness — the declared reference fully achieved. Everything in between is the space of partial states, the domain where real measurement happens. The Riemann zeta function is operating entirely within the URP domain."},
     {heading:"Why ½? The Structural Answer",body:"A zero of the zeta function is a point of 0/R depletion — the function's frame persists, its content momentarily exhausted. The functional equation of the zeta function maps σ to 1−σ. A zero at position σ creates a mirror zero at 1−σ. If σ ≠ ½, there are two distinct depletion events in the same declared frame. Two depletions require the frame to go negative to accommodate both — a deficit state. A deficit cannot serve as a declared reference. The frame breaks. Only σ = ½ maps to itself under 1−σ. One depletion event. Self-symmetric. No deficit required. Structurally forced."},
   ]},
];

// ═══════════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════════
function useBreakpoint(){
  const [bp,setBp]=useState({mobile:false});
  useEffect(()=>{
    const c=()=>setBp({mobile:window.innerWidth<720});
    c(); window.addEventListener("resize",c);
    return()=>window.removeEventListener("resize",c);
  },[]);
  return bp;
}

// ═══════════════════════════════════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════════════════════════════════
function Footer({go}) {
  return (
    <footer style={{borderTop:`1px solid ${C.border}`,background:C.bg,padding:"3rem 2rem",
      marginTop:"4rem",position:"relative",zIndex:10}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",gap:"2rem",flexWrap:"wrap"}}>
        {/* Brand */}
        <div>
          <div style={{fontFamily:C.mono,fontSize:22,fontWeight:700,color:C.accent,
            marginBottom:"0.5rem",textShadow:"0 0 20px rgba(0,255,179,0.3)"}}>n/R</div>
          <div style={{fontSize:11,color:C.dim,lineHeight:1.8,maxWidth:220}}>
            Unitary Reference Principle<br/>
            Independent Research · 2026<br/>
            Joshua Steven Brogley<br/>
            Almelo, Netherlands
          </div>
        </div>
        {/* Published Papers */}
        <div>
          <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:"0.2em",color:C.faint,
            marginBottom:"1rem"}}>PUBLISHED PAPERS</div>
          {PAPERS.filter(p=>p.published).map(p=>(
            <a key={p.id} href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer"
              style={{display:"block",fontFamily:C.mono,fontSize:11,color:C.dim,
                textDecoration:"none",marginBottom:"0.4rem",transition:"color .15s"}}
              onMouseEnter={e=>e.currentTarget.style.color=p.color}
              onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
              {p.num} — {p.title} ↗
            </a>
          ))}
        </div>
        {/* Links */}
        <div>
          <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:"0.2em",color:C.faint,
            marginBottom:"1rem"}}>NAVIGATION</div>
          {["Papers","History","Ideas","Blog","About"].map(l=>(
            <button key={l} onClick={()=>go(l)}
              style={{display:"block",fontFamily:C.mono,fontSize:11,color:C.dim,
                background:"none",border:"none",cursor:"pointer",marginBottom:"0.4rem",
                padding:0,transition:"color .15s",textAlign:"left"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.accent}
              onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{maxWidth:1100,margin:"2rem auto 0",paddingTop:"1.5rem",
        borderTop:`1px solid ${C.border}`,
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.5rem"}}>
        <div style={{fontFamily:C.sans,fontSize:10,color:C.faint}}>
          © 2026 Joshua Steven Brogley · CC BY 4.0
        </div>
        <div style={{fontFamily:C.mono,fontSize:10,color:C.faint}}>
          unitaryreference.com
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  PARTICLE FIELD
// ═══════════════════════════════════════════════════════════════════════
function ParticleField({mobile}) {
  const [pts,setPts]=useState([]);
  const animRef=useRef();
  const chars="0123456789/1nR∞×÷+−∫∑π½⅓";
  useEffect(()=>{
    const n=mobile?14:40;
    const p=Array.from({length:n},(_,i)=>({
      id:i,x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      char:chars[Math.floor(Math.random()*chars.length)],
      op:Math.random()*.08+.02,sz:Math.floor(Math.random()*8+7),ct:Math.floor(Math.random()*200)
    }));
    setPts(p);
    const loop=()=>{
      setPts(prev=>prev.map(p=>{
        let x=p.x+p.vx,y=p.y+p.vy;
        if(x<0)x=window.innerWidth; if(x>window.innerWidth)x=0;
        if(y<0)y=window.innerHeight; if(y>window.innerHeight)y=0;
        const ct=p.ct-1;
        return{...p,x,y,ct:ct<=0?150+Math.floor(Math.random()*200):ct,
          char:ct<=0?chars[Math.floor(Math.random()*chars.length)]:p.char};
      }));
      animRef.current=requestAnimationFrame(loop);
    };
    animRef.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(animRef.current);
  },[]);
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {pts.map(p=>(
        <div key={p.id} style={{position:"absolute",left:p.x,top:p.y,fontSize:p.sz,
          color:`rgba(0,255,179,${p.op})`,fontFamily:C.mono,fontWeight:700,userSelect:"none"}}>
          {p.char}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  NAV
// ═══════════════════════════════════════════════════════════════════════
function Nav({page,go,mobile}) {
  const [open,setOpen]=useState(false);
  const links=["Home","Papers","History","Ideas","Blog","About"];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,
      background:"rgba(8,12,8,0.96)",backdropFilter:"blur(20px)",
      borderBottom:`1px solid ${C.border}`,
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:mobile?"0 1rem":"0 2.5rem",height:56}}>
      <button onClick={()=>go("Home")} style={{background:"none",border:"none",cursor:"pointer",
        fontFamily:C.mono,fontSize:18,color:C.accent,fontWeight:700,padding:0,
        textShadow:"0 0 20px rgba(0,255,179,0.5)"}}>n/R</button>
      {mobile?(
        <>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",
            cursor:"pointer",color:C.text,fontSize:20,padding:"4px 8px"}}>
            {open?"✕":"☰"}
          </button>
          {open&&(
            <div style={{position:"absolute",top:56,left:0,right:0,
              background:"rgba(8,12,8,0.99)",borderBottom:`1px solid ${C.border}`,
              padding:"0.5rem 0",zIndex:300}}>
              {links.map(l=>(
                <button key={l} onClick={()=>{go(l);setOpen(false);}} style={{
                  display:"block",width:"100%",textAlign:"left",background:"none",border:"none",
                  color:page===l?C.accent:C.dim,fontFamily:C.sans,
                  fontSize:11,letterSpacing:"0.12em",padding:"0.9rem 1.5rem",cursor:"pointer",
                  borderBottom:`1px solid ${C.border}`}}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </>
      ):(
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {links.map(l=>(
            <button key={l} onClick={()=>go(l)} style={{
              background:page===l?"rgba(0,255,179,0.08)":"none",
              border:page===l?"1px solid rgba(0,255,179,0.25)":"1px solid transparent",
              color:page===l?C.accent:"#444",
              fontFamily:C.sans,fontSize:10,letterSpacing:"0.14em",
              cursor:"pointer",padding:"0.35rem 0.9rem",transition:"all 0.15s"}}
              onMouseEnter={e=>{if(page!==l){e.currentTarget.style.color="#aaa";}}}
              onMouseLeave={e=>{if(page!==l){e.currentTarget.style.color="#444";}}}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  VISUAL PROOFS
// ═══════════════════════════════════════════════════════════════════════
function VisualProof({type,color}) {
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),80);return()=>clearInterval(t);},[]);

  if(type==="foundation") {
    const [sel,setSel]=useState(null);
    const vals=[{n:1,R:4,lbl:"1/4",state:"PARTIAL"},{n:3,R:4,lbl:"3/4",state:"PARTIAL"},{n:4,R:4,lbl:"4/4=1",state:"COMPLETE"},{n:0,R:4,lbl:"0/R",state:"DEPLETED"},{n:5,R:4,lbl:"5/4",state:"SURPLUS"}];
    const stateColors={"PARTIAL":color,"COMPLETE":"#00FFB3","DEPLETED":"#FF6B6B","SURPLUS":"#FFB347"};
    const descs={"PARTIAL":"Normal measurement — living in (0,1).","COMPLETE":"n = R. The only complete whole.","DEPLETED":"Frame declared. Content empty. Not non-existence.","SURPLUS":"Exceeds declared frame. New R is required."};
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:"1rem",fontFamily:C.sans}}>CLICK TO EXPLORE ALL FIVE STATES</div>
        <div style={{display:"flex",gap:".65rem",flexWrap:"wrap"}}>
          {vals.map((v,i)=>{
            const pct=Math.min(v.n/v.R,1);
            const sc=stateColors[v.state];
            const isS=sel===i;
            return (
              <div key={i} onClick={()=>setSel(isS?null:i)}
                style={{width:100,cursor:"pointer",textAlign:"center",
                  border:`1px solid ${isS?sc:C.border}`,padding:".85rem .4rem",
                  background:isS?"rgba(0,255,179,0.04)":"transparent",transition:"all .2s"}}>
                <svg width={60} height={60} viewBox="0 0 60 60" style={{display:"block",margin:"0 auto .4rem"}}>
                  <circle cx={30} cy={30} r={24} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={7}/>
                  {v.n>0&&<circle cx={30} cy={30} r={24} fill="none" stroke={sc}
                    strokeWidth={7} strokeDasharray={`${pct*150.8} 200`}
                    strokeLinecap="round" transform="rotate(-90 30 30)" opacity={v.n>=v.R?1:.75}/>}
                  <text x={30} y={34} textAnchor="middle" fill={sc} fontSize={9} fontFamily={C.mono} fontWeight={700}>{v.lbl}</text>
                </svg>
                <div style={{fontSize:9,color:sc,letterSpacing:".05em"}}>{v.state}</div>
                {isS&&<div style={{fontSize:9,color:C.muted,marginTop:".35rem",lineHeight:1.5}}>{descs[v.state]}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if(type==="riemann") {
    const [sig,setSig]=useState(0.5);
    const sym=1-sig; const off=Math.abs(sig-.5)>.04;
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:".75rem",fontFamily:C.sans}}>DRAG THE ZERO — SEE WHY ½ IS THE ONLY VALID POSITION</div>
        <div id="rtk" style={{position:"relative",height:88,background:C.bg1,border:`1px solid ${C.border}`,marginBottom:".75rem",userSelect:"none"}}>
          <div style={{position:"absolute",left:"10%",right:"10%",top:0,bottom:0,background:"rgba(255,107,107,0.03)"}}/>
          <div style={{position:"absolute",left:"9%",top:5,fontSize:9,color:C.dim,fontFamily:C.mono}}>0</div>
          <div style={{position:"absolute",right:"7%",top:5,fontSize:9,color:C.dim,fontFamily:C.mono}}>1</div>
          <div style={{position:"absolute",left:"50%",top:5,fontSize:9,color:C.accent,fontFamily:C.mono,transform:"translateX(-50%)"}}>½</div>
          <div style={{position:"absolute",left:"50%",top:18,bottom:6,width:1,background:"rgba(0,255,179,0.25)"}}/>
          {off&&<div style={{position:"absolute",left:`${sym*80+10}%`,top:18,bottom:6,width:1,borderLeft:"1px dashed rgba(255,107,107,0.5)"}}/>}
          <div style={{position:"absolute",left:`${sig*80+10}%`,top:"50%",width:14,height:14,
            borderRadius:"50%",background:off?"#FF6B6B":C.accent,border:`2px solid ${off?"#FF6B6B":C.accent}`,
            transform:"translate(-50%,-50%)",cursor:"ew-resize",
            boxShadow:`0 0 10px ${off?"rgba(255,107,107,.6)":"rgba(0,255,179,.6)"}`,zIndex:5}}
            onMouseDown={e=>{
              const trk=document.querySelector('[data-riemann]');
              function mv(ev){if(!trk)return;const r=trk.getBoundingClientRect();const x=(ev.clientX-r.left)/r.width;setSig(Math.max(.01,Math.min(.99,(x-.1)/.8)));}
              function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);}
              document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
            }}/>
        </div>
        <div style={{padding:".65rem",background:off?"rgba(255,107,107,0.04)":"rgba(0,255,179,0.03)",
          border:`1px solid ${off?"rgba(255,107,107,.2)":"rgba(0,255,179,.12)"}`,
          fontSize:11,fontFamily:C.mono,color:off?"#FF9999":C.accent,lineHeight:1.7}}>
          {off?`Zero at σ=${sig.toFixed(2)} creates a mirror zero at 1−σ=${sym.toFixed(2)}. Two depletions → frame goes negative → deficit → impossible.`
            :`Zero at σ=${sig.toFixed(2)} ≈ ½. Maps to itself. ONE depletion event. Self-symmetric. The only valid position.`}
        </div>
      </div>
    );
  }

  if(type==="geometry") {
    const [angle,setAngle]=useState(60);
    const rad=angle*Math.PI/180;
    const R=52,cx=68,cy=68;
    const x2=cx+R*Math.sin(0),y2=cy-R*Math.cos(0);
    const x3=cx+R*Math.sin(rad),y3=cy-R*Math.cos(rad);
    const big=angle>180?1:0;
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:".75rem",fontFamily:C.sans}}>DRAG — ANGLE AS FRACTION OF R = 2π</div>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center",flexWrap:"wrap"}}>
          <svg width={136} height={136} viewBox="0 0 136 136">
            <circle cx={68} cy={68} r={52} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={2}/>
            <path d={`M${cx},${cy} L${x2},${y2} A${R},${R} 0 ${big},1 ${x3},${y3} Z`}
              fill="rgba(255,179,70,0.12)" stroke={color} strokeWidth={1.5}/>
            <circle cx={68} cy={68} r={3} fill={color}/>
            <text x={68} y={128} textAnchor="middle" fill={C.dim} fontSize={9} fontFamily={C.mono}>R = 2π = 360°</text>
          </svg>
          <div>
            <input type="range" min={1} max={359} value={angle} onChange={e=>setAngle(+e.target.value)}
              style={{width:150,accentColor:color,display:"block",marginBottom:".65rem"}}/>
            <div style={{fontSize:20,fontWeight:700,color,fontFamily:C.mono,marginBottom:".25rem"}}>{(angle/360).toFixed(3)} of R</div>
            <div style={{fontSize:11,color:C.dim}}>{angle}° = {angle}/360 of R</div>
            <div style={{fontSize:10,color:C.muted,marginTop:".3rem"}}>
              {angle===180?"= ½R — triangle angles sum here":angle===90?"= ¼R — right angle":angle===360?"= R — complete rotation":""}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(type==="division") {
    const [num,setNum]=useState(1);
    const [den,setDen]=useState(3);
    const isOver=num>den&&den>0;
    const isZero=num===0&&den>0;
    const isComp=num===den&&den>0;
    const isDivZ=den===0;
    const wholes=den>0?Math.floor(num/den):0;
    const rem=den>0?num%den:0;
    const bc=isDivZ?"rgba(255,107,107,.3)":isOver?"rgba(255,179,70,.3)":isComp?"rgba(0,255,179,.3)":isZero?"rgba(255,107,107,.2)":"rgba(0,212,255,.12)";
    const dec=isDivZ?"—":Number.isInteger(num/den)?(num/den).toString():(num/den).toFixed(8).replace(/0+$/,"")+"...";
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:"1rem",fontFamily:C.sans}}>EXPLORE ALL FIVE URP STATES</div>
        <div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap",marginBottom:"1rem",alignItems:"center"}}>
          <div><div style={{fontSize:9,color:C.dim,letterSpacing:".1em",marginBottom:3}}>NUMERATOR n</div>
            <input type="range" min={0} max={12} value={num} onChange={e=>setNum(+e.target.value)} style={{width:130,accentColor:color}}/>
            <div style={{fontFamily:C.mono,fontSize:18,color:isOver?"#FFB347":isDivZ?"#888":color,marginTop:3}}>{num}</div></div>
          <div><div style={{fontSize:9,color:C.dim,letterSpacing:".1em",marginBottom:3}}>REFERENCE R</div>
            <input type="range" min={0} max={10} value={den} onChange={e=>setDen(+e.target.value)} style={{width:130,accentColor:color}}/>
            <div style={{fontFamily:C.mono,fontSize:18,color:isDivZ?"#FF6B6B":color,marginTop:3}}>{den}</div></div>
        </div>
        <div style={{padding:".9rem",background:C.bg1,border:`1px solid ${bc}`,fontFamily:C.mono}}>
          {isDivZ&&<><div style={{fontSize:22,fontWeight:700,color:"#FF6B6B",marginBottom:".35rem",textAlign:"center"}}>UNCONSTRUCTABLE</div><div style={{fontSize:11,color:"#FF9999",textAlign:"center"}}>Zero has no declared reference. There is nothing to divide into.</div></>}
          {isZero&&<><div style={{fontSize:22,fontWeight:700,color:"#FF6B6B",marginBottom:".35rem",textAlign:"center"}}>0/R — Contextual Depletion</div><div style={{fontSize:11,color:"#FF9999",lineHeight:1.8}}>Frame R is declared and active. Content is empty. NOT non-existence — the reference persists.</div></>}
          {isComp&&<><div style={{fontSize:22,fontWeight:700,color:"#00FFB3",marginBottom:".35rem",textAlign:"center"}}>{num}/{den} = 1 — COMPLETE</div><div style={{fontSize:11,color:"#88E8C8",lineHeight:1.8}}>n = R. The declared reference is fully achieved. 1 is the only complete whole.</div></>}
          {isOver&&<><div style={{fontSize:18,fontWeight:700,color:"#FFB347",marginBottom:".5rem"}}>{num}/{den} → New R Required</div><div style={{fontSize:11,color:"#C8A882",lineHeight:1.9,marginBottom:".4rem"}}>Axiom I: 1 is the only complete whole within a declared frame.<br/><span style={{color:"#00FFB3"}}>{wholes} complete R{wholes>1?"s":""}</span>{rem>0?<> + <span style={{color:"#FFB347"}}>{rem}/{den} of a new declared R</span></>:""}</div><div style={{fontSize:11,color:C.dim}}>Decimal: {dec}{!Number.isInteger(num/den)?" ← approximation":""}</div></>}
          {!isDivZ&&!isZero&&!isComp&&!isOver&&<><div style={{fontSize:24,fontWeight:700,color,marginBottom:".35rem",textAlign:"center"}}>{num}/{den}</div><div style={{fontSize:11,color:C.dim,textAlign:"center"}}>Exact: <span style={{color}}>{num}/{den}</span>{" | "}Decimal: <span style={{color:C.muted}}>{dec}</span>{!Number.isInteger(num/den)&&<span style={{color:C.faint}}> ← approximation</span>}</div></>}
        </div>
      </div>
    );
  }

  if(type==="physics") {
    const [power,setPower]=useState(60);
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:".75rem",fontFamily:C.sans}}>SIGNAL POWER — THE URP DOMAIN IN PHYSICAL REALITY</div>
        <input type="range" min={0} max={100} value={power} onChange={e=>setPower(+e.target.value)} style={{width:"100%",accentColor:color,marginBottom:".65rem"}}/>
        <div style={{display:"flex",gap:3,marginBottom:".65rem"}}>
          {[0,20,40,60,80,100].map(v=><div key={v} style={{flex:1,height:5,background:power>=v?color:"rgba(255,255,255,0.05)",borderRadius:2,transition:"background .15s"}}/>)}
        </div>
        <div style={{textAlign:"center",marginBottom:".65rem"}}>
          <span style={{fontSize:28,fontWeight:700,color,fontFamily:C.mono}}>{power}</span>
          <span style={{fontSize:13,color:C.dim}}>/100 of R</span>
        </div>
        <div style={{padding:".65rem",background:C.bg1,border:`1px solid ${power===0?"rgba(255,107,107,.2)":power===100?"rgba(0,255,179,.2)":"rgba(199,125,255,.15)"}`,
          fontSize:11,fontFamily:C.mono,color:power===0?"#FF9999":power===100?"#00FFB3":color,lineHeight:1.7}}>
          {power===0?"0/R — contextual depletion. The channel exists. The signal is gone.":
           power===100?"R — complete. Full signal. The declared reference is achieved.":
           `${power}/100 of R — URP interior (0,1).${power<15||power>85?" Binary approximates to nearest boundary.":""}`}
        </div>
      </div>
    );
  }

  if(type==="dehn") {
    const [shape,setShape]=useState("cube");
    const D={cube:{ang:"90°",nr:"π/2 / π = 1/2 (exact rational)",rat:"Yes",dp:"0/Rθ (depleted)",col:"#00FFB3",msg:"Rational n/R → irrational content depletes to 0/Rθ. Frame PRESENT and EMPTY."},tetra:{ang:"arccos(1/3) ≈ 70.53°",nr:"arccos(1/3)/π (exact irreducible irrational)",rat:"No",dp:"arccos(1/3)/π ≠ 0",col:"#FF6B6B",msg:"Irrational n/R → content PERSISTS through any scissors operation. NON-EMPTY. Cannot scissors-congruent with cube."}};
    const d=D[shape];
    return (
      <div style={{padding:"1.25rem 0"}}>
        <div style={{fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:".75rem",fontFamily:C.sans}}>DEHN INVARIANT — THE 0/R DISTINCTION</div>
        <div style={{display:"flex",gap:".5rem",marginBottom:".9rem"}}>
          {["cube","tetra"].map(s=><button key={s} onClick={()=>setShape(s)} style={{flex:1,padding:".5rem",
            background:shape===s?"rgba(0,255,179,0.06)":"transparent",
            border:`1px solid ${shape===s?D[s].col:C.border}`,color:shape===s?D[s].col:C.dim,
            fontFamily:C.mono,fontSize:10,cursor:"pointer"}}>
            {s==="cube"?"CUBE":"TETRAHEDRON"}
          </button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:".7rem"}}>
          {[["DIHEDRAL ANGLE",d.ang],["n/R VALUE",d.nr],["RATIONAL?",d.rat],["D(P)",d.dp]].map(([k,v])=>(
            <div key={k} style={{padding:".65rem",background:C.bg1,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:9,color:C.dim,letterSpacing:".1em",marginBottom:3}}>{k}</div>
              <div style={{fontSize:11,color:d.col,fontFamily:C.mono,lineHeight:1.4}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{padding:".65rem",background:C.bg1,border:`1px solid ${shape==="cube"?"rgba(0,255,179,.15)":"rgba(255,107,107,.2)"}`,
          fontSize:11,fontFamily:C.mono,color:shape==="cube"?C.muted:"#FF9999",lineHeight:1.7}}>{d.msg}</div>
      </div>
    );
  }

  return <div style={{padding:"2rem",textAlign:"center",fontFamily:C.mono,fontSize:28,fontWeight:700,color}}>{type}<div style={{fontSize:9,color:C.faint,marginTop:".5rem",letterSpacing:".2em"}}>INTERACTIVE VISUAL — COMING WITH PAPER PUBLICATION</div></div>;
}

// ═══════════════════════════════════════════════════════════════════════
//  PAPER DEEP DIVE
// ═══════════════════════════════════════════════════════════════════════
function PaperPage({paper,onBack,go}) {
  const [ci,setCi]=useState(0);
  const claim=paper.claims[ci];
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{padding:"2rem 2rem 0",maxWidth:900,margin:"0 auto"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:C.dim,
          fontFamily:C.sans,fontSize:11,letterSpacing:".1em",cursor:"pointer",padding:0,
          marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:".5rem"}}
          onMouseEnter={e=>e.currentTarget.style.color=paper.color}
          onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
          ← BACK TO PAPERS
        </button>
        <div style={{display:"flex",alignItems:"baseline",gap:"1rem",marginBottom:".5rem"}}>
          <span style={{fontFamily:C.mono,fontSize:11,color:paper.color,letterSpacing:".2em",opacity:.6}}>PAPER {paper.num}</span>
          {paper.published&&<span style={{fontFamily:C.mono,fontSize:9,color:C.bg,background:paper.color,padding:"2px 6px",letterSpacing:".1em"}}>PUBLISHED</span>}
        </div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(26px,4vw,44px)",fontWeight:700,color:C.text,margin:"0 0 .4rem",lineHeight:1.1}}>{paper.title}</h1>
        <div style={{fontSize:14,color:C.dim,fontFamily:C.sans,marginBottom:".8rem"}}>{paper.sub}</div>
        <div style={{fontSize:15,color:C.muted,lineHeight:1.9,maxWidth:600,marginBottom:"1.5rem"}}>{paper.desc}</div>
        {paper.doi&&<a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer"
          style={{fontFamily:C.mono,fontSize:11,color:paper.color,textDecoration:"none",
            letterSpacing:".08em",borderBottom:`1px solid ${paper.color}40`,marginBottom:"1.5rem",display:"inline-block"}}>
          doi.org/{paper.doi} →
        </a>}
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"1.5rem 2rem 4rem"}}>
        <div style={{border:`1px solid ${C.border}`,padding:"0 1.5rem",marginBottom:"2rem",background:C.bg1}}>
          <div style={{borderBottom:`1px solid ${C.border}`,padding:"1rem 0",marginBottom:".5rem",
            fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.faint}}>INTERACTIVE PROOF SPACE</div>
          <VisualProof type={paper.visual} color={paper.color}/>
        </div>
        {paper.claims.length>0&&<>
          <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.faint,marginBottom:".85rem"}}>TRADITIONAL vs URP — SELECT A CLAIM</div>
          <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.5rem"}}>
            {paper.claims.map((c,i)=>(
              <button key={i} onClick={()=>setCi(i)} style={{
                textAlign:"left",padding:".65rem 1rem",
                background:ci===i?"rgba(0,255,179,0.05)":"transparent",
                border:`1px solid ${ci===i?paper.color:C.border}`,
                cursor:"pointer",fontFamily:C.mono,fontSize:12,
                color:ci===i?paper.color:C.dim,transition:"all .15s",display:"flex",alignItems:"center",gap:".75rem"}}>
                <span style={{color:ci===i?paper.color:C.faint,fontSize:10}}>▶</span>{c.t}
              </button>
            ))}
          </div>
          {claim&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            <div style={{padding:"1.5rem",background:"rgba(139,69,19,0.06)",border:"1px solid rgba(139,69,19,0.2)"}}>
              <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:"#8B4513",marginBottom:".8rem"}}>TRADITIONAL MATHEMATICS</div>
              <div style={{fontSize:13,color:"#C8A882",lineHeight:1.9}}>{claim.trad}</div>
            </div>
            <div style={{padding:"1.5rem",background:"rgba(0,255,179,0.04)",border:`1px solid ${paper.color}30`}}>
              <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:paper.color,marginBottom:".8rem"}}>URP FRAMEWORK</div>
              <div style={{fontSize:13,color:"#C8E8D8",lineHeight:1.9}}>{claim.urp}</div>
            </div>
          </div>}
        </>}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  PAPERS LIST
// ═══════════════════════════════════════════════════════════════════════
function PapersPage({onSelectPaper,mobile,go}) {
  const [filter,setFilter]=useState("All");
  const [hov,setHov]=useState(null);
  const filtered=filter==="Published"?PAPERS.filter(p=>p.published):PAPERS;
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 2rem 0"}}>
        <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".25em",color:C.faint,marginBottom:".6rem"}}>THE SERIES</div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,38px)",fontWeight:700,color:C.text,margin:"0 0 .5rem"}}>17 Papers. One Framework.</h1>
        <div style={{fontSize:13,color:C.dim,fontFamily:C.sans,marginBottom:"1.25rem"}}>Click any paper to explore the proof, interactive visual, and Traditional vs URP comparison.</div>
        <div style={{display:"flex",gap:".5rem",marginBottom:"1.5rem"}}>
          {["All","Published"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              padding:".3rem .9rem",background:filter===f?"rgba(0,255,179,0.1)":"transparent",
              border:`1px solid ${filter===f?"rgba(0,255,179,0.35)":C.border}`,
              color:filter===f?C.accent:C.dim,fontFamily:C.sans,fontSize:10,
              letterSpacing:".1em",cursor:"pointer",transition:"all .15s"}}>
              {f.toUpperCase()}{f==="Published"?` (${PAPERS.filter(p=>p.published).length})`:""}
            </button>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem 4rem"}}>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:"1px",background:C.bg2}}>
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>onSelectPaper(p)}
              onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
              style={{background:hov===p.id?"rgba(255,255,255,0.025)":C.bg,cursor:"pointer",
                padding:"1.5rem",transition:"all .15s",
                borderLeft:`2px solid ${hov===p.id?p.color:"transparent"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".4rem"}}>
                <span style={{fontFamily:C.mono,fontSize:11,color:C.faint,letterSpacing:".15em"}}>{p.num}</span>
                <span style={{fontFamily:C.mono,fontSize:9,color:p.published?C.bg:"#1a1a1a",
                  background:p.published?p.color:"transparent",
                  border:p.published?"none":"1px solid #1a1a1a",padding:"2px 7px",letterSpacing:".1em"}}>
                  {p.published?"LIVE":"COMING"}
                </span>
              </div>
              <div style={{fontFamily:C.mono,fontSize:14,fontWeight:700,
                color:hov===p.id?p.color:"#C8C0B8",marginBottom:".25rem",lineHeight:1.2}}>{p.title}</div>
              <div style={{fontFamily:C.sans,fontSize:10,color:C.faint,marginBottom:".4rem"}}>{p.sub}</div>
              <div style={{fontSize:12,color:"#2a2a2a",lineHeight:1.7}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  HISTORY
// ═══════════════════════════════════════════════════════════════════════
function HistoryPage({mobile,go}) {
  const [active,setActive]=useState(null);
  const [era,setEra]=useState("All");
  const eras=["All",...[...new Set(HISTORY.map(h=>h.era))]];
  const filtered=era==="All"?HISTORY:HISTORY.filter(h=>h.era===era);
  const person=active!==null?HISTORY[active]:null;
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 2rem 0"}}>
        <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".25em",color:C.faint,marginBottom:".6rem"}}>MATHEMATICAL HISTORY</div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:C.text,margin:"0 0 .3rem"}}>They Were Building the Framework.</h1>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,36px)",fontWeight:700,color:C.accent,margin:"0 0 .75rem"}}>They Didn't Know It Yet.</h1>
        <p style={{fontSize:13,color:C.dim,fontFamily:C.sans,maxWidth:560,marginBottom:"1.25rem",lineHeight:1.8}}>Every mathematician in history was working toward the same structure. Click each figure to see what they understood, where they stopped, and how the URP completes their work.</p>
        <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1.5rem"}}>
          {eras.map(e=>(
            <button key={e} onClick={()=>setEra(e)} style={{
              padding:"3px 9px",background:era===e?"rgba(0,255,179,0.1)":"transparent",
              border:`1px solid ${era===e?"rgba(0,255,179,0.35)":C.border}`,
              color:era===e?C.accent:C.dim,fontFamily:C.mono,fontSize:9,
              letterSpacing:".1em",cursor:"pointer",transition:"all .15s"}}>
              {e.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem 4rem",
        display:"grid",gridTemplateColumns:person&&!mobile?"1fr 1fr":"1fr",gap:"1.5rem"}}>
        <div>
          {filtered.map(h=>{
            const idx=HISTORY.indexOf(h);
            const isA=active===idx;
            const isL=h.name==="Brogley";
            return (
              <div key={h.name} style={{display:"flex"}}>
                <div style={{width:32,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div onClick={()=>setActive(isA?null:idx)} style={{
                    width:10,height:10,borderRadius:"50%",flexShrink:0,marginTop:18,
                    background:isA?h.color:"transparent",border:`2px solid ${isA?h.color:"#222"}`,
                    boxShadow:isA?`0 0 10px ${h.color}80`:"none",
                    transition:"all .2s",zIndex:1,cursor:"pointer"}}/>
                  {!isL&&<div style={{width:1,flex:1,background:"#161616",minHeight:12}}/>}
                </div>
                <div onClick={()=>setActive(isA?null:idx)}
                  style={{flex:1,padding:".65rem .75rem",cursor:"pointer",
                    borderLeft:`2px solid ${isA?h.color:"transparent"}`,
                    transition:"border-color .2s",marginLeft:2,marginBottom:4}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                    <span style={{fontFamily:C.mono,fontSize:14,fontWeight:700,color:isA?h.color:C.muted}}>{h.name}</span>
                    <span style={{fontFamily:C.sans,fontSize:9,color:C.faint}}>{h.year}</span>
                  </div>
                  <div style={{fontSize:10,color:C.faint,fontFamily:C.sans,letterSpacing:".04em"}}>{h.era}</div>
                  {isA&&<div style={{marginTop:".5rem",fontSize:12,color:C.muted,lineHeight:1.8}}>{h.contrib}</div>}
                </div>
              </div>
            );
          })}
        </div>
        {person&&(
          <div style={{position:mobile?"static":"sticky",top:72,height:"fit-content",
            border:`1px solid ${C.border}`,padding:"1.5rem",background:C.bg1}}>
            <div style={{display:"flex",alignItems:"baseline",gap:".75rem",marginBottom:"1.1rem"}}>
              <h2 style={{fontFamily:C.mono,fontSize:22,fontWeight:700,color:person.color,margin:0}}>{person.name}</h2>
              <span style={{fontFamily:C.sans,fontSize:10,color:C.faint}}>{person.year}</span>
            </div>
            <div style={{marginBottom:"1rem"}}>
              <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.dim,marginBottom:".5rem"}}>CONTRIBUTED</div>
              <div style={{fontSize:13,color:C.muted,lineHeight:1.85,padding:".75rem",background:"rgba(255,255,255,0.02)",borderLeft:`2px solid ${C.border}`}}>{person.contrib}</div>
            </div>
            {person.gap!=="—"&&<div style={{marginBottom:"1rem"}}>
              <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:"#8B4513",marginBottom:".5rem"}}>WHERE THEY STOPPED</div>
              <div style={{fontSize:13,color:"#C8A882",lineHeight:1.85,padding:".75rem",background:"rgba(139,69,19,0.05)",borderLeft:"2px solid rgba(139,69,19,0.2)"}}>{person.gap}</div>
            </div>}
            <div>
              <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.accent,marginBottom:".5rem"}}>HOW THE URP COMPLETES IT</div>
              <div style={{fontSize:13,color:"#A8E8C8",lineHeight:1.85,padding:".75rem",background:"rgba(0,255,179,0.03)",borderLeft:`2px solid rgba(0,255,179,0.2)`}}>{person.urp}</div>
            </div>
          </div>
        )}
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  IDEAS
// ═══════════════════════════════════════════════════════════════════════
function IdeasPage({mobile,go}) {
  const ideas=[
    {n:"I",title:"Every number is n/R",body:"Remove the declared reference and you don't have a smaller number. You have nothing. No measurement, no meaning. n/R is the minimum unit of meaning in mathematics. Every quantity you have ever measured, calculated, or estimated is a fraction of a declared reference — whether or not you declared it explicitly."},
    {n:"II",title:"Zero has two forms",body:"True zero is non-existence — no declared reference was ever established. 0/R is contextual depletion — the frame exists, the content is empty. These are structurally different. True zero is outside the domain. 0/R is inside the domain, at the bottom boundary. Conflating them is the source of mathematical paradoxes going back 2,500 years."},
    {n:"III",title:"1 is the only complete whole",body:"1 = n/R where n = R. The only value where the measurement equals the reference. Every integer greater than 1 is a count of completed wholes — seven sealed reference frames, not a value sitting at position 7 on an infinite line. All of mathematics lives between 0 and 1 in this structural sense. Infinity is approach. 1 is arrival."},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"2rem 2rem 4rem"}}>
        <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".25em",color:C.faint,marginBottom:".6rem"}}>THREE IDEAS</div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,38px)",fontWeight:700,color:C.text,margin:"0 0 2rem"}}>The Framework in Three Sentences</h1>
        <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
          {ideas.map(idea=>(
            <div key={idea.n} style={{display:"grid",gridTemplateColumns:"64px 1fr",gap:"1.5rem",
              padding:"2rem",border:`1px solid ${C.border}`,background:C.bg1}}>
              <div style={{fontFamily:C.mono,fontSize:52,fontWeight:700,color:"rgba(0,255,179,0.1)",lineHeight:1}}>{idea.n}</div>
              <div>
                <div style={{fontFamily:C.mono,fontSize:18,fontWeight:700,color:C.text,marginBottom:".75rem"}}>{idea.title}</div>
                <div style={{fontSize:14,color:C.muted,lineHeight:2}}>{idea.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  BLOG
// ═══════════════════════════════════════════════════════════════════════
function BlogPage({mobile,go}) {
  const [active,setActive]=useState(null);
  if(active!==null){
    const post=BLOGS[active];
    return (
      <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
        <div style={{maxWidth:680,margin:"0 auto",padding:"2rem 2rem 0"}}>
          <button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:C.dim,
            fontFamily:C.sans,fontSize:11,letterSpacing:".1em",cursor:"pointer",padding:0,marginBottom:"2rem"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.accent}
            onMouseLeave={e=>e.currentTarget.style.color=C.dim}>
            ← BACK TO BLOG
          </button>
          {/* Article header */}
          <div style={{fontFamily:C.sans,fontSize:10,letterSpacing:".2em",color:post.tagColor,marginBottom:".5rem"}}>{post.tag}</div>
          <h1 style={{fontFamily:C.mono,fontSize:"clamp(20px,3vw,32px)",fontWeight:700,color:C.text,
            margin:"0 0 .75rem",lineHeight:1.25}}>{post.title}</h1>
          <div style={{fontSize:15,color:C.dim,fontFamily:C.sans,marginBottom:"1.5rem",lineHeight:1.7,
            fontStyle:"italic"}}>{post.sub}</div>
          <div style={{display:"flex",gap:"1.5rem",fontFamily:C.sans,fontSize:11,color:C.faint,
            marginBottom:"2.5rem",paddingBottom:"1.5rem",borderBottom:`1px solid ${C.border}`}}>
            <span>{post.date}</span>
            <span>{post.readTime} read</span>
            <span style={{color:post.tagColor}}>{post.tag}</span>
          </div>
        </div>
        {/* Pull quote */}
        <div style={{maxWidth:680,margin:"0 auto",padding:"0 2rem"}}>
          <blockquote style={{margin:"0 0 2.5rem",padding:"1.25rem 1.5rem",
            borderLeft:`3px solid ${post.tagColor}`,background:C.bg1,
            fontFamily:C.mono,fontSize:"clamp(14px,2vw,18px)",color:C.text,
            fontStyle:"italic",lineHeight:1.7}}>
            "{post.pullQuote}"
          </blockquote>
        </div>
        {/* Sections */}
        <div style={{maxWidth:680,margin:"0 auto",padding:"0 2rem 4rem"}}>
          {post.sections.map((s,i)=>(
            <div key={i} style={{marginBottom:"2.5rem"}}>
              <h2 style={{fontFamily:C.mono,fontSize:"clamp(16px,2vw,20px)",fontWeight:700,
                color:C.text,marginBottom:"1rem"}}>{s.heading}</h2>
              <p style={{fontSize:15,color:"#999",lineHeight:2.1,margin:0}}>{s.body}</p>
            </div>
          ))}
          {/* Tags */}
          <div style={{paddingTop:"2rem",borderTop:`1px solid ${C.border}`,
            display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            <span style={{fontFamily:C.sans,fontSize:9,color:post.tagColor,
              border:`1px solid ${post.tagColor}40`,padding:"3px 8px",letterSpacing:".1em"}}>{post.tag}</span>
            <span style={{fontFamily:C.sans,fontSize:9,color:C.faint,
              border:`1px solid ${C.border}`,padding:"3px 8px",letterSpacing:".1em"}}>URP SERIES</span>
          </div>
        </div>
        <Footer go={go}/>
      </div>
    );
  }
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"2rem 2rem 4rem"}}>
        <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".25em",color:C.faint,marginBottom:".6rem"}}>BLOG</div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,38px)",fontWeight:700,color:C.text,margin:"0 0 .5rem"}}>Notes on the Framework</h1>
        <p style={{fontSize:13,color:C.dim,marginBottom:"2rem",lineHeight:1.8}}>Plain language. No equations required. The ideas behind the papers.</p>
        <div style={{display:"flex",flexDirection:"column",gap:"1px",background:C.bg2}}>
          {BLOGS.map((post,i)=>(
            <div key={post.id} onClick={()=>setActive(i)}
              style={{background:C.bg,padding:"1.75rem 2rem",cursor:"pointer",transition:"all .15s",
                borderLeft:"3px solid transparent"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.bg1;e.currentTarget.style.borderLeftColor=post.tagColor;}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.bg;e.currentTarget.style.borderLeftColor="transparent";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".5rem"}}>
                <span style={{fontFamily:C.sans,fontSize:9,color:post.tagColor,letterSpacing:".15em"}}>{post.tag}</span>
                <span style={{fontFamily:C.sans,fontSize:10,color:C.faint}}>{post.date} · {post.readTime} read</span>
              </div>
              <div style={{fontFamily:C.mono,fontSize:17,fontWeight:700,color:"#D0C8C0",marginBottom:".4rem",lineHeight:1.35}}>{post.title}</div>
              <div style={{fontSize:13,color:C.dim,fontFamily:C.sans,lineHeight:1.6}}>{post.sub}</div>
              <div style={{marginTop:".75rem",fontFamily:C.mono,fontSize:12,color:C.faint,fontStyle:"italic"}}>"{post.pullQuote}"</div>
            </div>
          ))}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  ABOUT
// ═══════════════════════════════════════════════════════════════════════
function AboutPage({go}) {
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:C.bg}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"2rem 2rem 0"}}>
        <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".25em",color:C.faint,marginBottom:".6rem"}}>ABOUT</div>
        <h1 style={{fontFamily:C.mono,fontSize:"clamp(22px,3vw,38px)",fontWeight:700,color:C.text,margin:"0 0 .5rem"}}>Joshua Steven Brogley</h1>
        <div style={{fontFamily:C.sans,fontSize:11,color:C.dim,marginBottom:"2rem"}}>Independent Researcher · Almelo, Netherlands · 2026</div>
        {/* Bio */}
        <div style={{fontSize:15,color:C.muted,lineHeight:2.1,marginBottom:"2.5rem"}}>
          I'm not a professional mathematician. I'm a head baseball coach, a father of two, and someone who spent years asking why the foundations of mathematics feel incomplete.
          <br/><br/>
          Why is division by zero "undefined" rather than explained? Why does the Riemann Hypothesis have ten trillion verified examples but no proof? Why do geometric formulas feel like disconnected memorization rather than a single framework?
          <br/><br/>
          The Unitary Reference Principle is my answer. It started as a single observation about fractions — that every meaningful quantity is a fraction of a declared reference — and became a framework that reframes everything from primes to quantum mechanics to physical reality.
          <br/><br/>
          Five papers published independently on Zenodo. Twelve more in progress.
        </div>
        {/* Publication timeline */}
        <div style={{marginBottom:"2.5rem"}}>
          <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.faint,marginBottom:"1rem"}}>PUBLISHED PAPERS</div>
          <div style={{display:"flex",flexDirection:"column",gap:"1px",background:C.bg2}}>
            {PAPERS.filter(p=>p.published).map(p=>(
              <a key={p.id} href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer"
                style={{display:"grid",gridTemplateColumns:"60px 1fr auto",gap:"1rem",
                  padding:"1rem 1.25rem",background:C.bg,textDecoration:"none",
                  transition:"background .15s",alignItems:"center"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg1}
                onMouseLeave={e=>e.currentTarget.style.background=C.bg}>
                <span style={{fontFamily:C.mono,fontSize:11,color:p.color,letterSpacing:".1em"}}>Paper {p.num}</span>
                <div>
                  <div style={{fontFamily:C.mono,fontSize:13,fontWeight:700,color:C.text,marginBottom:2}}>{p.title}</div>
                  <div style={{fontFamily:C.sans,fontSize:10,color:C.dim}}>{p.sub}</div>
                </div>
                <span style={{fontFamily:C.mono,fontSize:10,color:p.color}}>↗</span>
              </a>
            ))}
          </div>
        </div>
        {/* Series overview */}
        <div style={{padding:"1.5rem",background:C.bg1,border:`1px solid ${C.border}`,marginBottom:"2rem"}}>
          <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".2em",color:C.faint,marginBottom:".75rem"}}>THE SERIES</div>
          <div style={{fontFamily:C.mono,fontSize:13,color:C.muted,lineHeight:2}}>
            17 papers total. Foundation → Division → Riemann Hypothesis → Geometry → Physical Reality → Algebra → Goldbach → Navier-Stokes → BSD Conjecture → P vs NP → Calculus → Statistics → Number Theory → Dehn Invariant → Linear Algebra → Topology → People's Edition.
          </div>
        </div>
      </div>
      <div style={{height:"2rem"}}/>
      <Footer go={go}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════════════════════════════════
function Hero({go,mobile}) {
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:mobile?"5rem 1.5rem 3rem":"0 2rem",
      position:"relative",zIndex:1,textAlign:"center"}}>
      <div style={{fontFamily:C.sans,fontSize:9,letterSpacing:".35em",color:"rgba(0,255,179,0.45)",marginBottom:"1.5rem"}}>
        UNITARY REFERENCE PRINCIPLE
      </div>
      <div style={{fontFamily:C.mono,fontSize:"clamp(64px,12vw,108px)",fontWeight:700,color:C.text,
        lineHeight:1,marginBottom:".3rem",textShadow:"0 0 60px rgba(245,240,232,0.04)"}}>
        n/R
      </div>
      <div style={{fontFamily:C.sans,fontSize:12,color:C.faint,letterSpacing:".2em",marginBottom:"2.5rem"}}>= meaning</div>
      <p style={{fontSize:"clamp(13px,1.8vw,16px)",color:"#555",lineHeight:2,
        maxWidth:480,fontFamily:C.sans,marginBottom:"3rem"}}>
        Every number is a fraction of a declared reference.<br/>
        Every formula follows from one declaration.<br/>
        17 papers. From primes to quantum gravity.
      </p>
      <div style={{display:"flex",gap:".75rem",flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>go("Papers")} style={{
          background:C.accent,color:C.bg,border:"none",fontFamily:C.sans,fontSize:11,
          letterSpacing:".15em",padding:".9rem 2rem",cursor:"pointer",fontWeight:700,transition:"all .2s"}}
          onMouseEnter={e=>e.currentTarget.style.background="#00DDA0"}
          onMouseLeave={e=>e.currentTarget.style.background=C.accent}>
          EXPLORE THE PAPERS
        </button>
        <button onClick={()=>go("History")} style={{
          background:"transparent",color:C.accent,border:"1px solid rgba(0,255,179,0.3)",
          fontFamily:C.sans,fontSize:11,letterSpacing:".15em",padding:".9rem 2rem",
          cursor:"pointer",transition:"all .2s"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(0,255,179,0.7)"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,255,179,0.3)"}>
          EXPLORE HISTORY
        </button>
      </div>
      <div style={{marginTop:"4rem",display:"flex",gap:"3rem",flexWrap:"wrap",justifyContent:"center"}}>
        {[{n:"5",l:"Published"},{n:"17",l:"Total Papers"},{n:"2026",l:"Year"}].map(({n,l})=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:C.mono,fontSize:30,fontWeight:700,color:C.accent}}>{n}</div>
            <div style={{fontFamily:C.sans,fontSize:9,color:C.faint,letterSpacing:".2em",marginTop:2}}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════════════
export default function App() {
  const {mobile}=useBreakpoint();
  const [page,setPage]=useState("Home");
  const [selectedPaper,setSelectedPaper]=useState(null);
  const go=useCallback((p)=>{setPage(p);setSelectedPaper(null);window.scrollTo(0,0);},[]);
  const handleSelectPaper=(paper)=>{setSelectedPaper(paper);setPage("PaperDetail");window.scrollTo(0,0);};
  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:C.sans}}>
      <ParticleField mobile={mobile}/>
      <Nav page={page} go={go} mobile={mobile}/>
      {page==="Home"&&<>
        <Hero go={go} mobile={mobile}/>
        <Footer go={go}/>
      </>}
      {page==="Papers"&&<PapersPage onSelectPaper={handleSelectPaper} mobile={mobile} go={go}/>}
      {page==="PaperDetail"&&selectedPaper&&<PaperPage paper={selectedPaper} onBack={()=>go("Papers")} go={go}/>}
      {page==="History"&&<HistoryPage mobile={mobile} go={go}/>}
      {page==="Ideas"&&<IdeasPage mobile={mobile} go={go}/>}
      {page==="Blog"&&<BlogPage mobile={mobile} go={go}/>}
      {page==="About"&&<AboutPage go={go}/>}
    </div>
  );
}
