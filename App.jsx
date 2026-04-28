import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════════════

const PAPERS = [
  { id:1, num:"01", title:"The Foundation", sub:"What is a number, really?",
    color:"#00FFB3", doi:"10.5281/zenodo.19697119", published:true,
    desc:"1 is the only complete unit. Zero is non-existence. Every number is a fraction of a declared reference.",
    visual:"foundation",
    claims:[
      {t:"Every number is n/R", trad:"Numbers are abstract objects on the real line", urp:"Every number is a fraction of a declared reference. No reference → no number."},
      {t:"1 is the only complete unit", trad:"1 is just another number", urp:"1 = n/R where n=R. The only value where the measurement equals the reference. Complete wholeness."},
      {t:"Zero is non-existence", trad:"0 is a number. You can compute with it freely.", urp:"0 is the absence of a declared reference. Not a small number — structural absence."},
      {t:"0/R is contextual depletion", trad:"No distinction between types of zero", urp:"0/R: frame declared, content empty. Different from true zero. The container exists. The content is gone."},
    ]
  },
  { id:2, num:"02", title:"Division", sub:"Declared partition, not reduction",
    color:"#00D4FF", doi:"10.5281/zenodo.19733441", published:true,
    desc:"Division is a structural description. Why 0.333... is a process not an answer. Why division by zero is unconstructable.",
    visual:"division",
    claims:[
      {t:"Division by zero is unconstructable", trad:"Division by zero is undefined — a rule to memorize", urp:"Zero has no declared reference. You cannot divide by what doesn't exist as a frame. Not a rule — a structural impossibility."},
      {t:"The fraction is the exact answer", trad:"1/3 = 0.333... (infinite decimal)", urp:"1/3 is the arrival. 0.333... is base-10 struggling to express it. The fraction is exact. The decimal is an infinite journey."},
      {t:"Fractions are irreducible when irrational", trad:"Irrational numbers need decimal approximation", urp:"arccos(1/3)/π is exact. Its decimal ≈ 0.3918... never terminates because the value is genuinely irrational relative to base-10."},
    ]
  },
  { id:3, num:"03", title:"Riemann Hypothesis", sub:"Why ½? Finally answered.",
    color:"#FF6B6B", doi:"10.5281/zenodo.19735713", published:true,
    desc:"The $1M unsolved problem. The critical strip is the URP domain (0,1). The zeros must sit at 1/2.",
    visual:"riemann",
    claims:[
      {t:"The critical strip IS the URP domain", trad:"The strip 0<σ<1 is a region of convergence", urp:"The strip is the domain of fractional reality. Zero = non-existence. One = complete wholeness. All partial states live between."},
      {t:"Zeros are 0/R depletion events", trad:"Zeros are where ζ(s)=0 — analytical zeros", urp:"Not true zero — contextual depletion. The zeta function is analytic (non-zero derivative) at every zero. Frame persists, content momentarily exhausted."},
      {t:"½ is the only self-symmetric position", trad:"The functional equation maps σ to 1−σ. Zeros come in pairs.", urp:"A zero off ½ creates two depletion events. Two depletions in one declared reference require the frame to go negative — a deficit. Deficit cannot serve as reference. Only ½ maps to itself."},
    ]
  },
  { id:4, num:"04", title:"Geometry", sub:"All measurement is a fraction of R",
    color:"#FFB347", doi:"10.5281/zenodo.19847459", published:true,
    desc:"π is a bridge reference. The Pythagorean theorem is Step 2. Every geometry formula from one declaration.",
    visual:"geometry",
    claims:[
      {t:"π is a bridge reference, not a number > 1", trad:"π ≈ 3.14159... — a transcendental constant", urp:"π connects the diameter domain to the circumference domain. C = π × d means π is R(bridge). It bridges two incommensurable declared references."},
      {t:"Angles are fractions of R = 2π", trad:"Angle formulas (triangle sum, polygon sum) are separate theorems", urp:"Declare R = 1 full rotation = 2π. Every angle formula follows structurally. Triangle sum = ½R. Not a theorem — a consequence of the declaration."},
      {t:"Pythagorean theorem is Step 2", trad:"a² + b² = c² — proved by Euclid via similar triangles", urp:"Declare R = hypotenuse. Step 1: sin θ = a/R, cos θ = b/R. Step 2: verify R persists: sin²θ + cos²θ = 1. a² + b² = c² is that verification."},
      {t:"D(cube)=0 is 0/R, not non-existence", trad:"D(cube) = 0 — algebraic result from tensor product", urp:"The angle frame Rθ = π is always active for any polyhedron. D=0 means irrational content depleted to 0/Rθ. Frame present, content empty."},
    ]
  },
  { id:5, num:"05", title:"Physical Reality", sub:"The universe lives in (0,1)",
    color:"#C77DFF", doi:"10.5281/zenodo.19853265", published:true,
    desc:"Binary, fiber optics, quantum mechanics, thermodynamics — all expressions of the same domain.",
    visual:"physics",
    claims:[
      {t:"Physical reality operates in (0,1)", trad:"Physical quantities range from 0 to ∞", urp:"Every physical quantity is a fraction of a declared reference. A signal at 60% power = 0.6/R. Energy at rest = R preserved. The universe never reaches standalone zero."},
      {t:"Conservation laws are frame persistence", trad:"Energy is conserved — an empirical law", urp:"Energy cannot reach standalone zero because that would require a receiving frame of non-existence. Conservation is structural, not empirical."},
      {t:"Binary is operating at domain boundaries", trad:"Binary is 0 and 1 — two values", urp:"Binary operates at the two extreme states of the URP domain: 0/R (depleted) and R (complete). Classical computing is boundary-only. Quantum computing uses the full (0,1) interior."},
    ]
  },
  { id:6, num:"06", title:"Algebra", sub:"Declared reference structures",
    color:"#00FFB3", doi:null, published:false,
    desc:"Groups, rings, fields reframed. Why −1 × −1 = 1 is structural. Euler's formula as Step 2.",
    visual:"algebra", claims:[
      {t:"−1 × −1 = 1 is structural", trad:"Rule to memorize: negative times negative is positive", urp:"Negation is movement away from R. Double negation returns to R. The rule follows from frame structure, not arithmetic convention."},
      {t:"Euler's formula is Step 2", trad:"e^(iπ) + 1 = 0 — mysterious beautiful coincidence", urp:"e^(iπ) = −1 is Step 2 verification: rotating by π in the complex plane (half of R = 2π) reaches the opposite of the starting reference. +1 brings it back to 0. The formula is frame completion."},
    ]
  },
  { id:7, num:"07", title:"Goldbach", sub:"Primes always pair", color:"#00D4FF", doi:null, published:false,
    desc:"Every even number is the sum of two primes. Self-referencing positions find symmetry about the midpoint.",
    visual:"goldbach", claims:[
      {t:"Primes are self-referencing wholes", trad:"Primes are numbers with no factors other than 1 and themselves", urp:"p/p = 1. Primes are the only integers that are their own declared reference. They cannot be expressed as n/R for any smaller R."},
      {t:"Even numbers have URP symmetry", trad:"Goldbach's conjecture: unproven for 280+ years", urp:"Every even number 2n is symmetric about n. Primes distribute such that self-referencing positions always find symmetric pairs. The midpoint n is the declared reference for the pair search."},
    ]
  },
  { id:8, num:"08", title:"Navier-Stokes", sub:"Fluid motion without singularities",
    color:"#FF6B6B", doi:null, published:false,
    desc:"The equations of fluid flow as declared reference conservation. Why smooth solutions must exist.",
    visual:"navier", claims:[
      {t:"Fluid velocity is a fraction of declared R", trad:"Navier-Stokes: velocity can blow up to infinity in finite time (open problem)", urp:"Velocity is n/R where R is the declared flow reference. Reaching infinity would require a reference of zero — unconstructable. Smooth solutions must exist."},
    ]
  },
  { id:9, num:"09", title:"BSD Conjecture", sub:"Rational points on elliptic curves",
    color:"#FFB347", doi:null, published:false,
    desc:"L-functions as generators of rational points. Zero at s=1 means infinitely many rational solutions.",
    visual:"bsd", claims:[
      {t:"L-function zero at s=1 is 0/R", trad:"BSD: L(E,1)=0 iff rank ≥ 1 — numerical observation unproven", urp:"L(E,1)=0 is contextual depletion at the declared reference point s=1. Frame present, content empty → infinitely many rational points exist as the frame seeks completion."},
    ]
  },
  { id:10, num:"10", title:"P vs NP", sub:"Finding ≠ Checking", color:"#C77DFF", doi:null, published:false,
    desc:"Step 0 cannot be shortcut by Steps 1+2. Finding is structurally different from checking.",
    visual:"pvsnp", claims:[
      {t:"Step 0 cannot be skipped", trad:"P vs NP: unknown whether polynomial-time solving = checking", urp:"Step 0 (declare R) is structurally prior to all computation. Checking verifies a declared answer. Finding must perform Step 0. These are different structural operations. P ≠ NP."},
    ]
  },
  { id:11, num:"11", title:"Calculus", sub:"Approach without arrival", color:"#00FFB3", doi:null, published:false,
    desc:"Limits as approach-without-arrival. Derivatives as instantaneous fraction rates.", visual:"calculus", claims:[
      {t:"Limits are approach-without-arrival", trad:"The limit of f(x) as x→a equals L — formal ε-δ definition", urp:"A limit approaches a declared reference without the variable arriving at it. The limit IS the declared reference. The variable is the process."},
    ]
  },
  { id:12, num:"12", title:"Statistics", sub:"Declared denominators required", color:"#00D4FF", doi:null, published:false,
    desc:"Every statistic requires a declared reference. Why most misleading statistics have undeclared denominators.", visual:"stats", claims:[
      {t:"Every statistic requires a declared R", trad:"Statistics are computed from data", urp:"Without a declared denominator R, any fraction is meaningless. '60% of people...' — 60% of which R? Undeclared R is the source of all statistical manipulation."},
    ]
  },
  { id:13, num:"13", title:"Number Theory", sub:"Primes as self-referencing wholes", color:"#FF6B6B", doi:null, published:false,
    desc:"Integers as counts of declared wholes. Primes: p/p = 1.", visual:"numtheory", claims:[
      {t:"The Fundamental Theorem is a URP statement", trad:"Every integer factors uniquely into primes — algebraic theorem", urp:"Every integer is a product of self-referencing wholes (primes). The Euler product is the Fundamental Theorem in analytic form: each prime contributes its own independent reference frame."},
    ]
  },
  { id:14, num:"14", title:"Dehn Invariant", sub:"Scissors congruence & the 0/R distinction",
    color:"#FFB347", doi:null, published:false,
    desc:"D(cube)=0 is 0/R — not non-existence. A structural prediction for dimensions ≥ 5.",
    visual:"dehn", claims:[
      {t:"D(P)=0 is contextual depletion", trad:"D(cube)=0: algebraic result, rational angles vanish in tensor product", urp:"The angle frame Rθ=π is active for every polyhedron. D=0 means irrational content=0/Rθ. Frame present, depleted. Not non-existence."},
      {t:"New invariants at even dimensions ≥ 6", trad:"Dimensions ≥ 5: open since 1968. No progress.", urp:"Independent references = 1 + ⌊(n-2)/2⌋. Volume+D(P) sufficient through 5D. New invariant required at 6D. Testable prediction."},
    ]
  },
  { id:15, num:"15", title:"Linear Algebra", sub:"Reference frame transformations", color:"#C77DFF", doi:null, published:false,
    desc:"Vectors as declared positional fractions. Eigenvalues as self-referencing scaling.", visual:"linalg", claims:[
      {t:"Eigenvalues are self-referencing scalings", trad:"Ax = λx — the eigenvalue equation", urp:"An eigenvector is a direction that maps to itself under transformation. λ is the n/R value of that self-reference. λ=1: the vector is its own reference. λ=0: depletion."},
    ]
  },
  { id:16, num:"16", title:"Topology", sub:"Declared neighborhood persistence", color:"#00FFB3", doi:null, published:false,
    desc:"Open sets as declared reference neighborhoods. Continuity preserves neighborhoods.", visual:"topology", claims:[
      {t:"Continuity is frame preservation", trad:"Continuous: small changes in input → small changes in output", urp:"A continuous function preserves declared reference neighborhoods. The open set (neighborhood) is the frame. Continuity = the frame is not torn."},
    ]
  },
  { id:17, num:"17", title:"People's Edition", sub:"For everyone", color:"#00FFB3", doi:null, published:false,
    desc:"The complete framework in plain language. No equations required.", visual:"peoples", claims:[] },
];

const HISTORY = [
  { year:"c.300 BCE", name:"Euclid", era:"Ancient", color:"#C8A96E",
    contrib:"Axioms, proofs, geometry. Elements establishes deductive mathematics.",
    gap:"No framework for zero. Numbers are geometric magnitudes. Fractions are ratios of lengths.",
    urp:"URP names what Euclid intuited: measurement requires a declared reference (his 'unit'). His axioms are URP Step 0 applied to geometry." },
  { year:"c.628 CE", name:"Brahmagupta", era:"Medieval", color:"#E8A87C",
    contrib:"First rules for arithmetic with zero. Zero as a number you can compute with.",
    gap:"Treats division by zero as yielding 0/0 or infinity — not structurally resolved.",
    urp:"URP: division by zero is unconstructable, not undefined or infinite. Brahmagupta got closer than anyone before him but lacked the frame concept." },
  { year:"1202", name:"Fibonacci", era:"Medieval", color:"#D4B896",
    contrib:"Introduces Hindu-Arabic numerals to Europe. Positional notation. Zero as placeholder.",
    gap:"Zero as placeholder only — no structural theory of what zero is.",
    urp:"The placeholder zero is 0/R: the position (frame) exists, the content is empty. Fibonacci used the concept without naming it." },
  { year:"1637", name:"Descartes", era:"Early Modern", color:"#7EB8C9",
    contrib:"Coordinate geometry. Connects algebra and geometry. Negative numbers as direction.",
    gap:"Negative numbers as 'below zero' — direction away from origin, not explained structurally.",
    urp:"URP: negatives are movement away from R. −1 is not below zero — it is a declared opposite direction from the reference." },
  { year:"1665", name:"Newton & Leibniz", era:"Scientific Revolution", color:"#88C9A8",
    contrib:"Calculus. Limits, derivatives, integrals. Infinite sums and infinitesimals.",
    gap:"Infinitesimals are logically suspect — 'ghosts of departed quantities' (Berkeley). Division by dx? What is dx?",
    urp:"URP: dx is approach-without-arrival. The derivative is the instantaneous n/R rate. The limit IS the declared reference. Infinitesimals are approaches, not arrivals." },
  { year:"1859", name:"Riemann", era:"19th Century", color:"#A888C9",
    contrib:"Riemann Hypothesis. Zeta function. Prime number distribution. Critical strip 0<σ<1.",
    gap:"Why ½? Riemann noted it but never explained why zeros must be on the critical line.",
    urp:"The critical strip IS the URP domain (0,1). Zeros are 0/R events. ½ is the only self-symmetric position. The question Riemann couldn't answer is structurally answered." },
  { year:"1874", name:"Cantor", era:"19th Century", color:"#C988A8",
    contrib:"Set theory. Infinite cardinalities. ℵ₀, ℵ₁. Different sizes of infinity.",
    gap:"Paradoxes (Russell's paradox). Infinity treated as a completed object.",
    urp:"URP: infinity is approach-without-arrival. ∞ is not a declared reference — it is the direction of unbounded approach. Cantor's paradoxes arise from treating the approach as an arrival." },
  { year:"1900", name:"Hilbert", era:"20th Century", color:"#88A8C9",
    contrib:"23 problems. Formalism. Mathematics as a complete formal system.",
    gap:"Hilbert's Third: can equal-volume polyhedra always be cut and reassembled? Couldn't explain why.",
    urp:"URP: scissors congruence requires matching ALL declared reference frames — volume AND angle references. Hilbert's Third is a reference structure problem." },
  { year:"1901", name:"Dehn", era:"20th Century", color:"#8BA888",
    contrib:"Solved Hilbert's Third. Dehn invariant: a second invariant beyond volume.",
    gap:"Why does the Dehn invariant work? Why do rational angles vanish? No structural explanation.",
    urp:"Rational angles vanish because they are complete fractions of Rθ=π — their irrational content depletes to 0/Rθ. Dehn found the invariant. URP explains why it exists." },
  { year:"1931", name:"Gödel", era:"20th Century", color:"#C9A888",
    contrib:"Incompleteness theorems. Any sufficient formal system has true unprovable statements.",
    gap:"Incompleteness seen as a limitation. Mathematics cannot be fully formalized.",
    urp:"URP: Gödel's unprovable statements are true statements about declared references that the formal system cannot reach because the system hasn't declared sufficient references. Incompleteness is a frame problem." },
  { year:"1948", name:"Shannon", era:"Modern", color:"#88C9C9",
    contrib:"Information theory. Entropy. The bit. Channel capacity.",
    gap:"The bit is defined operationally (0 or 1). No structural explanation of why binary.",
    urp:"Binary operates at the two extreme states of the URP domain: 0/R and R. Shannon's entropy is a URP measurement of expected depletion across a declared reference set." },
  { year:"1965", name:"Sydler", era:"Modern", color:"#A8C988",
    contrib:"Proved volume + Dehn invariant sufficient for scissors congruence in 3D.",
    gap:"No proof for dimensions ≥ 5. Open ever since.",
    urp:"In 3D, only edge angles (k=1) are independent. URP formula: 1+⌊(n-2)/2⌋ independent references. New invariants at even dimensions ≥ 6. Testable prediction." },
  { year:"1982", name:"Feynman", era:"Modern", color:"#C9C988",
    contrib:"Quantum computing concept. Simulating quantum systems requires quantum computers.",
    gap:"Why can't classical computers simulate quantum? No structural reason given.",
    urp:"Classical computing is boundary-only (0/R and R). Quantum systems operate in the full interior (0,1). Classical computers cannot natively represent partial states." },
  { year:"2026", name:"Brogley", era:"Contemporary", color:"#00FFB3",
    contrib:"Unitary Reference Principle. Declares the structural framework underlying all of mathematics.",
    gap:"—",
    urp:"Every number is n/R. Every measurement requires a declared reference. 0 is non-existence. 0/R is contextual depletion. 1 is complete wholeness. The framework that unifies all of the above." },
];

// ═══════════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════════
function useBreakpoint() {
  const [bp,setBp]=useState({mobile:false});
  useEffect(()=>{
    const c=()=>setBp({mobile:window.innerWidth<720});
    c(); window.addEventListener("resize",c);
    return()=>window.removeEventListener("resize",c);
  },[]);
  return bp;
}

// ═══════════════════════════════════════════════════════════════════════
//  PARTICLE FIELD
// ═══════════════════════════════════════════════════════════════════════
function ParticleField({mobile}) {
  const [pts,setPts]=useState([]);
  const animRef=useRef();
  const chars="0123456789/1nR∞×÷+−∫∑π½⅓";
  useEffect(()=>{
    const n=mobile?18:50;
    const p=Array.from({length:n},(_,i)=>({
      id:i,x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
      vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
      char:chars[Math.floor(Math.random()*chars.length)],
      op:Math.random()*.1+.02,sz:Math.floor(Math.random()*10+8),ct:Math.floor(Math.random()*200)
    }));
    setPts(p);
    const loop=()=>{
      setPts(prev=>prev.map(p=>{
        let x=p.x+p.vx,y=p.y+p.vy;
        if(x<0)x=window.innerWidth; if(x>window.innerWidth)x=0;
        if(y<0)y=window.innerHeight; if(y>window.innerHeight)y=0;
        const ct=p.ct-1;
        return {...p,x,y,ct:ct<=0?150+Math.floor(Math.random()*200):ct,
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
          color:`rgba(0,255,179,${p.op})`,fontFamily:"'JetBrains Mono',monospace",
          fontWeight:700,userSelect:"none",transition:"none"}}>
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
      background:"rgba(8,12,8,0.94)",backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(0,255,179,0.08)",
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:mobile?"0 1rem":"0 2.5rem",height:56}}>
      <button onClick={()=>go("Home")} style={{background:"none",border:"none",cursor:"pointer",
        fontFamily:"'JetBrains Mono',monospace",fontSize:18,color:"#00FFB3",fontWeight:700,padding:0,
        textShadow:"0 0 20px rgba(0,255,179,0.5)"}}>
        n/R
      </button>
      {mobile?(
        <>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",
            cursor:"pointer",color:"#F5F0E8",fontSize:22,padding:"4px 8px"}}>
            {open?"✕":"☰"}
          </button>
          {open&&(
            <div style={{position:"absolute",top:56,left:0,right:0,
              background:"rgba(8,12,8,0.98)",borderBottom:"1px solid rgba(0,255,179,0.08)",
              padding:"0.5rem 0",zIndex:300}}>
              {links.map(l=>(
                <button key={l} onClick={()=>{go(l);setOpen(false);}} style={{
                  display:"block",width:"100%",textAlign:"left",background:"none",border:"none",
                  color:page===l?"#00FFB3":"#666",fontFamily:"'Space Mono',monospace",
                  fontSize:12,letterSpacing:"0.12em",padding:"0.9rem 1.5rem",cursor:"pointer",
                  borderBottom:"1px solid rgba(0,255,179,0.04)"}}>
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
              color:page===l?"#00FFB3":"#555",
              fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.14em",
              cursor:"pointer",padding:"0.35rem 0.8rem",transition:"all 0.15s",borderRadius:2}}
              onMouseEnter={e=>{if(page!==l){e.currentTarget.style.color="#aaa";e.currentTarget.style.borderColor="rgba(0,255,179,0.1)";}}}
              onMouseLeave={e=>{if(page!==l){e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="transparent";}}}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  VISUAL PROOFS — per-paper interactive diagrams
// ═══════════════════════════════════════════════════════════════════════
function VisualProof({type, color}) {
  const [active,setActive]=useState(null);
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),80);return()=>clearInterval(t);},[]);

  if(type==="foundation") {
    const vals=[{n:1,R:4,label:"1/4"},{n:3,R:4,label:"3/4"},{n:4,R:4,label:"4/4 = 1 ✓"},{n:0,R:4,label:"0/R (empty frame)"}];
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1.2rem",fontFamily:"'Space Mono',monospace"}}>CLICK TO EXPLORE n/R</div>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
          {vals.map((v,i)=>{
            const pct=v.R===0?0:v.n/v.R;
            const isSel=active===i;
            return (
              <div key={i} onClick={()=>setActive(active===i?null:i)}
                style={{width:120,cursor:"pointer",textAlign:"center",
                  border:`1px solid ${isSel?color:"rgba(255,255,255,0.08)"}`,
                  padding:"1rem 0.5rem",background:isSel?"rgba(0,255,179,0.05)":"transparent",
                  transition:"all 0.2s"}}>
                <div style={{width:80,height:80,margin:"0 auto 0.8rem",position:"relative"}}>
                  <svg width={80} height={80} viewBox="0 0 80 80">
                    <circle cx={40} cy={40} r={34} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10}/>
                    {v.n>0&&<circle cx={40} cy={40} r={34} fill="none" stroke={color}
                      strokeWidth={10} strokeDasharray={`${pct*213.6} 213.6`}
                      strokeLinecap="round" transform="rotate(-90 40 40)"
                      strokeOpacity={v.n===v.R?1:0.7}/>}
                  </svg>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:color,fontWeight:700}}>
                    {v.label}
                  </div>
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:v.n===v.R?color:"#888"}}>
                  {v.n===0?"0/R":v.n===v.R?"COMPLETE":v.label}
                </div>
                {isSel&&<div style={{fontSize:11,color:"#aaa",marginTop:"0.5rem",lineHeight:1.5}}>
                  {v.n===0?"Frame declared. Content empty. Not non-existence.":
                   v.n===v.R?"n = R. The only complete whole.":
                   `${v.n} of ${v.R} declared units.`}
                </div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if(type==="riemann") {
    const [dragSig,setDragSig]=useState(0.5);
    const symmetric=1-dragSig;
    const creates2=Math.abs(dragSig-0.5)>0.05;
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1rem",fontFamily:"'Space Mono',monospace"}}>DRAG THE ZERO — SEE WHY ½ IS THE ONLY VALID POSITION</div>
        <div style={{position:"relative",height:120,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:"1rem"}}>
          {/* Domain */}
          <div style={{position:"absolute",left:"10%",right:"10%",top:0,bottom:0,background:"rgba(255,107,107,0.04)"}}/>
          {/* Labels */}
          <div style={{position:"absolute",left:"8%",top:4,fontSize:10,color:"#666",fontFamily:"'JetBrains Mono',monospace"}}>0</div>
          <div style={{position:"absolute",right:"8%",top:4,fontSize:10,color:"#666",fontFamily:"'JetBrains Mono',monospace"}}>1</div>
          <div style={{position:"absolute",left:"50%",top:4,fontSize:10,color:color,fontFamily:"'JetBrains Mono',monospace",transform:"translateX(-50%)"}}>½</div>
          {/* Critical line */}
          <div style={{position:"absolute",left:"50%",top:20,bottom:10,width:1,background:`${color}40`}}/>
          {/* Symmetric mirror */}
          {creates2&&<div style={{position:"absolute",left:`${symmetric*80+10}%`,top:20,bottom:10,width:1,background:"rgba(255,100,100,0.5)",borderLeft:"1px dashed rgba(255,100,100,0.5)"}}/>}
          {/* Draggable zero */}
          <div draggable={false}
            style={{position:"absolute",left:`${dragSig*80+10}%`,top:"50%",
              width:14,height:14,borderRadius:"50%",background:creates2?"#FF6B6B":color,
              border:`2px solid ${creates2?"#FF6B6B":color}`,
              transform:"translate(-50%,-50%)",cursor:"ew-resize",
              boxShadow:`0 0 12px ${creates2?"rgba(255,107,107,0.8)":`rgba(0,255,179,0.8)`}`,
              zIndex:10}}
            onMouseDown={e=>{
              const rect=e.currentTarget.parentElement.getBoundingClientRect();
              const move=ev=>{
                const x=(ev.clientX-rect.left)/rect.width;
                const σ=Math.max(0.01,Math.min(0.99,(x-0.1)/0.8));
                setDragSig(σ);
              };
              const up=()=>{document.removeEventListener("mousemove",move);document.removeEventListener("mouseup",up);};
              document.addEventListener("mousemove",move);
              document.addEventListener("mouseup",up);
            }}/>
          {/* Symmetric point */}
          {creates2&&<div style={{position:"absolute",left:`${symmetric*80+10}%`,top:"50%",
            width:14,height:14,borderRadius:"50%",background:"rgba(255,107,107,0.3)",
            border:"2px solid rgba(255,107,107,0.6)",transform:"translate(-50%,-50%)"}}/>}
        </div>
        <div style={{padding:"0.8rem 1rem",background:"rgba(255,255,255,0.02)",border:`1px solid ${creates2?"rgba(255,107,107,0.2)":"rgba(0,255,179,0.12)"}`,fontSize:12,fontFamily:"'Space Mono',monospace",lineHeight:1.7,color:creates2?"#FF9999":color}}>
          {creates2
            ?`Zero at σ=${dragSig.toFixed(2)} creates a SECOND zero at 1−σ=${symmetric.toFixed(2)}. Two depletions in one declared reference require the frame to go negative. A negative reference is a deficit — unconstructable.`
            :`Zero at σ=${dragSig.toFixed(2)} ≈ ½. Maps to itself under the functional equation. ONE depletion event. Self-symmetric. No deficit. This is the only valid position.`}
        </div>
      </div>
    );
  }

  if(type==="geometry") {
    const [angle,setAngle]=useState(60);
    const rad=angle*Math.PI/180;
    const R=70, cx=90, cy=90;
    const x2=cx+R*Math.cos(-rad/2+Math.PI/2), y2=cy-R*Math.sin(-rad/2+Math.PI/2);
    const x3=cx+R*Math.cos(-rad/2-rad+Math.PI/2), y3=cy-R*Math.sin(-rad/2-rad+Math.PI/2);
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1rem",fontFamily:"'Space Mono',monospace"}}>DRAG — ANGLE AS FRACTION OF R = 2π</div>
        <div style={{display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={90} r={70} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2}/>
            <path d={`M${cx},${cy} L${x2},${y2} A${R},${R} 0 0,1 ${x3},${y3} Z`}
              fill={`${color}20`} stroke={color} strokeWidth={1.5}/>
            <circle cx={90} cy={90} r={3} fill={color}/>
            <text x={90} y={170} textAnchor="middle" fill="#444" fontSize={10} fontFamily="'JetBrains Mono',monospace">R = 2π = 360°</text>
          </svg>
          <div style={{textAlign:"center"}}>
            <input type="range" min={1} max={359} value={angle} onChange={e=>setAngle(+e.target.value)}
              style={{width:160,accentColor:color,marginBottom:"0.8rem",display:"block"}}/>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,color,fontWeight:700,marginBottom:"0.3rem"}}>
              {(angle/360).toFixed(3)} of R
            </div>
            <div style={{fontSize:12,color:"#666"}}>{angle}° = {angle}/360 of R = {(angle*Math.PI/180).toFixed(3)} rad</div>
            <div style={{fontSize:11,color:"#444",marginTop:"0.5rem"}}>
              {angle===180?"= ½R — triangle angle sum":""}
              {angle===90?"= ¼R — right angle":""}
              {angle===360?"= R — complete rotation":""}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(type==="division") {
    const [num,setNum]=useState(1);
    const [den,setDen]=useState(3);
    const isDivByZero=den===0;
    const isZeroNum=num===0&&den>0;
    const isComplete=num===den&&den>0;
    const isOver=num>den&&den>0;
    const wholes=den>0?Math.floor(num/den):0;
    const rem=den>0?num%den:0;
    const decimal=isDivByZero?"—":(num/den).toFixed(8).replace(/0+$/,"...");
    const frac=`${num}/${den}`;
    // border color by case
    const borderCol=isDivByZero?"rgba(255,107,107,0.3)":isZeroNum?"rgba(255,107,107,0.2)":isComplete?"rgba(0,255,179,0.35)":isOver?"rgba(255,179,70,0.3)":"rgba(0,212,255,0.12)";
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1rem",fontFamily:"'Space Mono',monospace"}}>EXPLORE THE FRACTION VS DECIMAL</div>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center",flexWrap:"wrap",justifyContent:"center",marginBottom:"1.2rem"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"#444",letterSpacing:"0.1em",marginBottom:"4px"}}>NUMERATOR n</div>
            <input type="range" min={0} max={10} value={num} onChange={e=>setNum(+e.target.value)} style={{width:140,accentColor:color}}/>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:isOver?"#FFB347":isDivByZero?"#FF6B6B":color,marginTop:4}}>{num}</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"#444",letterSpacing:"0.1em",marginBottom:"4px"}}>REFERENCE R</div>
            <input type="range" min={0} max={10} value={den} onChange={e=>setDen(+e.target.value)} style={{width:140,accentColor:color}}/>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:isDivByZero?"#FF6B6B":color,marginTop:4}}>{den}</div>
          </div>
        </div>
        <div style={{padding:"1rem",background:"rgba(255,255,255,0.02)",border:`1px solid ${borderCol}`,fontFamily:"'JetBrains Mono',monospace"}}>
          {isDivByZero&&<>
            <div style={{fontSize:24,fontWeight:700,color:"#FF6B6B",marginBottom:"0.5rem",textAlign:"center"}}>UNCONSTRUCTABLE</div>
            <div style={{fontSize:12,color:"#FF9999",textAlign:"center"}}>Zero has no declared reference. There is nothing to divide into. Not undefined — structurally impossible.</div>
          </>}
          {isZeroNum&&<>
            <div style={{fontSize:24,fontWeight:700,color:"#FF6B6B",marginBottom:"0.5rem",textAlign:"center"}}>0/R — Contextual Depletion</div>
            <div style={{fontSize:12,color:"#FF9999",lineHeight:1.8}}>The frame R is declared and active. The content is empty. This is NOT non-existence (Axiom IV zero) — the reference persists. The container exists. Nothing is in it.</div>
          </>}
          {isComplete&&<>
            <div style={{fontSize:24,fontWeight:700,color:"#00FFB3",marginBottom:"0.5rem",textAlign:"center"}}>{frac} = 1 — COMPLETE</div>
            <div style={{fontSize:12,color:"#88E8C8",lineHeight:1.8}}>n = R. The declared reference is fully achieved. 1 is the only complete whole within any declared frame. This is the arrival — not a journey.</div>
          </>}
          {isOver&&<>
            <div style={{fontSize:20,fontWeight:700,color:"#FFB347",marginBottom:"0.6rem"}}>{frac} → A New R Is Required</div>
            <div style={{fontSize:12,color:"#C8A882",lineHeight:1.9,marginBottom:"0.5rem"}}>
              Under the URP, n cannot exceed R within a single declared frame.<br/>
              Axiom I: 1 is the only complete whole. No fraction within a frame exceeds 1.<br/>
              <span style={{color:"#00FFB3"}}>{wholes} complete R{wholes>1?"s":""}</span>{rem>0&&<> + <span style={{color:"#FFB347"}}>{rem}/{den} of a new declared R</span></>}<br/>
              Each whole is a completed reference. Moving beyond it means declaring a new R.
            </div>
            <div style={{fontSize:11,color:"#555"}}>Decimal: {Number.isInteger(num/den)?(num/den).toString():decimal}{!Number.isInteger(num/den)&&" ← approximation"}</div>
          </>}
          {!isDivByZero&&!isZeroNum&&!isComplete&&!isOver&&<>
            <div style={{fontSize:26,fontWeight:700,color,marginBottom:"0.4rem",textAlign:"center"}}>{frac}</div>
            <div style={{fontSize:12,color:"#555",textAlign:"center"}}>
              Exact: <span style={{color}}>{frac}</span>{" | "}Decimal: <span style={{color:"#666"}}>{decimal}</span>
              {!Number.isInteger(num/den)&&<span style={{color:"#444"}}> ← infinite approximation</span>}
            </div>
          </>}
        </div>
      </div>
    );
  }

  if(type==="physics") {
    const [power,setPower]=useState(60);
    const states=["0/R — depleted","Partial state","Partial state","R — complete"];
    const binary=power<10||power>90;
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1rem",fontFamily:"'Space Mono',monospace"}}>SIGNAL POWER — THE URP DOMAIN IN PHYSICAL REALITY</div>
        <input type="range" min={0} max={100} value={power} onChange={e=>setPower(+e.target.value)}
          style={{width:"100%",accentColor:color,marginBottom:"1rem"}}/>
        <div style={{display:"flex",gap:4,marginBottom:"1rem"}}>
          {[0,33,66,100].map((v,i)=>(
            <div key={i} style={{flex:1,height:8,background:power>=v?color:"rgba(255,255,255,0.06)",borderRadius:2,transition:"background 0.2s"}}/>
          ))}
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",textAlign:"center",marginBottom:"0.8rem"}}>
          <span style={{fontSize:32,fontWeight:700,color}}>{power}</span>
          <span style={{fontSize:16,color:"#666"}}>/100 of R</span>
        </div>
        <div style={{padding:"0.8rem",background:"rgba(255,255,255,0.02)",border:`1px solid rgba(255,255,255,0.06)`,fontSize:12,fontFamily:"'Space Mono',monospace",color:"#888",lineHeight:1.7}}>
          {power===0&&"0/R — contextual depletion. The channel (frame) exists. The signal is gone."}
          {power===100&&"R — complete. Full signal. The declared reference is achieved."}
          {power>0&&power<100&&`${power}/100 of R — operating in the URP interior (0,1).${binary?"":" Classical binary cannot represent this state natively."}`}
          {(power<10||power>90)&&power>0&&power<100&&" Classical binary approximates this to the nearest boundary."}
        </div>
      </div>
    );
  }

  if(type==="dehn") {
    const [shape,setShape]=useState("cube");
    const shapes={
      cube:{name:"Cube",angle:"90°",ratio:"π/2 / π = 1/2",rational:true,D:"0/Rθ",color:"#00FFB3"},
      tetra:{name:"Tetrahedron",angle:"arccos(1/3) ≈ 70.53°",ratio:"arccos(1/3)/π (exact, irrational)",rational:false,D:"arccos(1/3)/π of Rθ",color:"#FF6B6B"},
    };
    const s=shapes[shape];
    return (
      <div style={{padding:"1.5rem 0"}}>
        <div style={{fontSize:11,letterSpacing:"0.2em",color:"#444",marginBottom:"1rem",fontFamily:"'Space Mono',monospace"}}>DEHN INVARIANT — THE 0/R DISTINCTION</div>
        <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.2rem"}}>
          {Object.entries(shapes).map(([k,v])=>(
            <button key={k} onClick={()=>setShape(k)} style={{
              flex:1,padding:"0.6rem",background:shape===k?"rgba(0,255,179,0.08)":"transparent",
              border:`1px solid ${shape===k?v.color:"rgba(255,255,255,0.1)"}`,
              color:shape===k?v.color:"#666",fontFamily:"'Space Mono',monospace",fontSize:11,cursor:"pointer"}}>
              {v.name.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
          {[
            ["Dihedral angle",s.angle],
            ["n/R value",s.ratio],
            ["Rational?",s.rational?"Yes — complete fraction":"No — irreducible irrational"],
            ["D(P)",s.D],
          ].map(([k,v])=>(
            <div key={k} style={{padding:"0.75rem",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontSize:10,color:"#444",letterSpacing:"0.1em",marginBottom:"3px",fontFamily:"'Space Mono',monospace"}}>{k}</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:s.color,lineHeight:1.4}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"0.8rem",padding:"0.8rem",background:"rgba(255,255,255,0.02)",border:`1px solid ${s.rational?"rgba(0,255,179,0.12)":"rgba(255,107,107,0.12)"}`,fontSize:12,fontFamily:"'Space Mono',monospace",color:s.rational?"#aaa":"#FF9999",lineHeight:1.7}}>
          {s.rational
            ?"Rational n/R → irrational content depletes to 0/Rθ under any scissors operation. Frame Rθ=π is present and EMPTY."
            :"Irrational n/R → content persists through any scissors operation. Frame Rθ=π is present and NON-EMPTY. Cannot be transformed into the cube."}
        </div>
      </div>
    );
  }

  // Default — generic n/R viz for other papers
  return (
    <div style={{padding:"2rem",textAlign:"center",color:"#333",fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700}}>
      <span style={{color}}>{type}</span>
      <div style={{fontSize:12,color:"#444",marginTop:"0.5rem",letterSpacing:"0.15em"}}>INTERACTIVE VISUAL — COMING SOON</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  PAPER DEEP DIVE PAGE
// ═══════════════════════════════════════════════════════════════════════
function PaperPage({paper, onBack}) {
  const [activeClaimIdx,setActiveClaimIdx]=useState(0);
  const [tradVis,setTradVis]=useState(true);
  const claim=paper.claims[activeClaimIdx];
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:"#080C08"}}>
      {/* Header */}
      <div style={{padding:"2rem 2rem 0",maxWidth:900,margin:"0 auto"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#444",
          fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:"0.1em",
          cursor:"pointer",padding:0,marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"0.5rem"}}
          onMouseEnter={e=>e.currentTarget.style.color=paper.color}
          onMouseLeave={e=>e.currentTarget.style.color="#444"}>
          ← BACK TO PAPERS
        </button>
        <div style={{display:"flex",alignItems:"baseline",gap:"1rem",marginBottom:"0.5rem"}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:paper.color,letterSpacing:"0.2em",opacity:0.6}}>PAPER {paper.num}</span>
          {paper.published&&<span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#080C08",background:paper.color,padding:"2px 6px",letterSpacing:"0.1em"}}>PUBLISHED</span>}
        </div>
        <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(28px,4vw,48px)",fontWeight:700,color:"#F5F0E8",margin:"0 0 0.4rem",lineHeight:1.1}}>
          {paper.title}
        </h1>
        <div style={{fontSize:14,color:"#555",fontFamily:"'Space Mono',monospace",marginBottom:"0.8rem"}}>{paper.sub}</div>
        <div style={{fontSize:14,color:"#888",lineHeight:1.8,maxWidth:600,marginBottom:"2rem"}}>{paper.desc}</div>
        {paper.doi&&(
          <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:paper.color,
              textDecoration:"none",letterSpacing:"0.08em",borderBottom:`1px solid ${paper.color}40`}}>
            doi.org/{paper.doi} →
          </a>
        )}
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"2rem"}}>
        {/* Interactive visual */}
        <div style={{border:`1px solid rgba(255,255,255,0.06)`,padding:"0 1.5rem",marginBottom:"2rem",background:"rgba(255,255,255,0.01)"}}>
          <div style={{borderBottom:"1px solid rgba(255,255,255,0.04)",padding:"1rem 0",marginBottom:"0.5rem",
            fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.2em",color:"#333"}}>
            INTERACTIVE PROOF SPACE
          </div>
          <VisualProof type={paper.visual} color={paper.color}/>
        </div>

        {/* Claims — Traditional vs URP */}
        {paper.claims.length > 0 && (
          <>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.2em",color:"#333",marginBottom:"1rem"}}>
              TRADITIONAL UNDERSTANDING vs URP — SELECT A CLAIM
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",marginBottom:"1.5rem"}}>
              {paper.claims.map((c,i)=>(
                <button key={i} onClick={()=>setActiveClaimIdx(i)} style={{
                  textAlign:"left",padding:"0.75rem 1rem",background:activeClaimIdx===i?"rgba(0,255,179,0.05)":"transparent",
                  border:`1px solid ${activeClaimIdx===i?paper.color:"rgba(255,255,255,0.06)"}`,
                  cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:12,
                  color:activeClaimIdx===i?paper.color:"#555",transition:"all 0.15s",display:"flex",alignItems:"center",gap:"0.75rem"}}>
                  <span style={{color:activeClaimIdx===i?paper.color:"#2a2a2a",fontSize:10}}>▶</span>
                  {c.t}
                </button>
              ))}
            </div>
            {claim&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                <div style={{padding:"1.5rem",background:"rgba(139,69,19,0.06)",border:"1px solid rgba(139,69,19,0.2)"}}>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:"#8B4513",marginBottom:"0.8rem"}}>TRADITIONAL MATHEMATICS</div>
                  <div style={{fontSize:13,color:"#C8A882",lineHeight:1.8}}>{claim.trad}</div>
                </div>
                <div style={{padding:"1.5rem",background:`rgba(0,255,179,0.04)`,border:`1px solid ${paper.color}30`}}>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:paper.color,marginBottom:"0.8rem"}}>URP FRAMEWORK</div>
                  <div style={{fontSize:13,color:"#C8E8D8",lineHeight:1.8}}>{claim.urp}</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  PAPERS LIST PAGE
// ═══════════════════════════════════════════════════════════════════════
function PapersPage({onSelectPaper, mobile}) {
  const [hov,setHov]=useState(null);
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:"#080C08",maxWidth:1100,margin:"0 auto",padding:"72px 2rem 4rem"}}>
      <div style={{marginBottom:"2.5rem"}}>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.25em",color:"#333",marginBottom:"0.6rem"}}>THE SERIES</div>
        <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"#F5F0E8",margin:0}}>
          17 Papers. One Framework.
        </h1>
        <div style={{fontSize:13,color:"#555",fontFamily:"'Space Mono',monospace",marginTop:"0.5rem"}}>Click any paper to explore the proof, visual, and Traditional vs URP comparison.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(300px,1fr))",gap:"1px",background:"rgba(255,255,255,0.04)"}}>
        {PAPERS.map(p=>(
          <div key={p.id} onClick={()=>onSelectPaper(p)}
            onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
            style={{background:hov===p.id?"rgba(255,255,255,0.025)":"#080C08",cursor:"pointer",padding:"1.5rem",
              transition:"background 0.15s",borderLeft:`2px solid ${hov===p.id?p.color:"transparent"}`,
              display:"flex",flexDirection:"column",gap:"0.4rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#2a2a2a",letterSpacing:"0.15em"}}>
                {p.num}
              </span>
              {p.published
                ?<span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#080C08",background:p.color,padding:"2px 6px",letterSpacing:"0.08em"}}>LIVE</span>
                :<span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2a2a2a",border:"1px solid #1a1a1a",padding:"2px 6px",letterSpacing:"0.08em"}}>COMING</span>}
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:hov===p.id?p.color:"#D0C8C0",lineHeight:1.2}}>
              {p.title}
            </div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444",letterSpacing:"0.05em"}}>
              {p.sub}
            </div>
            <div style={{fontSize:12,color:"#333",lineHeight:1.6,marginTop:"0.3rem"}}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  HISTORY PAGE
// ═══════════════════════════════════════════════════════════════════════
function HistoryPage({mobile}) {
  const [active,setActive]=useState(null);
  const [filterEra,setFilterEra]=useState("All");
  const eras=["All",...[...new Set(HISTORY.map(h=>h.era))]];
  const filtered=filterEra==="All"?HISTORY:HISTORY.filter(h=>h.era===filterEra);
  const person=active!==null?HISTORY[active]:null;

  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:"#080C08"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem 2rem 4rem"}}>
        <div style={{marginBottom:"2rem"}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.25em",color:"#333",marginBottom:"0.6rem"}}>MATHEMATICAL HISTORY</div>
          <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"#F5F0E8",margin:"0 0 0.5rem"}}>
            They Were Building the Framework.<br/>They Didn't Know It Yet.
          </h1>
          <div style={{fontSize:13,color:"#555",fontFamily:"'Space Mono',monospace",maxWidth:600}}>
            Every mathematician in history was working toward the same framework. Click each figure to see what they understood, where they stopped, and how the URP completes their work.
          </div>
        </div>

        {/* Era filter */}
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          {eras.map(e=>(
            <button key={e} onClick={()=>setFilterEra(e)} style={{
              padding:"0.3rem 0.9rem",background:filterEra===e?"rgba(0,255,179,0.1)":"transparent",
              border:`1px solid ${filterEra===e?"rgba(0,255,179,0.4)":"rgba(255,255,255,0.08)"}`,
              color:filterEra===e?"#00FFB3":"#555",fontFamily:"'Space Mono',monospace",
              fontSize:10,letterSpacing:"0.12em",cursor:"pointer",transition:"all 0.15s"}}>
              {e.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":`${person?"1fr 1fr":"1fr"}`,gap:"1rem"}}>
          {/* Timeline */}
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {filtered.map((h,i)=>{
              const idx=HISTORY.indexOf(h);
              const isActive=active===idx;
              const isLast=h.name==="Brogley";
              return (
                <div key={h.name} onClick={()=>setActive(isActive?null:idx)}
                  style={{display:"flex",cursor:"pointer",position:"relative"}}>
                  {/* Timeline line */}
                  <div style={{width:40,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:12,height:12,borderRadius:"50%",flexShrink:0,marginTop:16,
                      background:isActive?h.color:"transparent",
                      border:`2px solid ${isActive?h.color:"#222"}`,
                      boxShadow:isActive?`0 0 12px ${h.color}80`:"none",
                      transition:"all 0.2s",zIndex:1}}/>
                    {!isLast&&<div style={{width:1,flex:1,background:"#1a1a1a",minHeight:20}}/>}
                  </div>
                  {/* Content */}
                  <div style={{flex:1,padding:"0.75rem 0.75rem 0.75rem 0.5rem",
                    background:isActive?"rgba(255,255,255,0.02)":"transparent",
                    borderLeft:isActive?`1px solid ${h.color}30`:"1px solid transparent",
                    transition:"all 0.2s",marginBottom:4}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"0.2rem"}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,
                        color:isActive?h.color:"#888"}}>{h.name}</span>
                      <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#333"}}>{h.year}</span>
                    </div>
                    <div style={{fontSize:12,color:"#444",fontFamily:"'Space Mono',monospace",letterSpacing:"0.05em"}}>{h.era}</div>
                    {isActive&&(
                      <div style={{marginTop:"0.6rem",fontSize:12,color:"#888",lineHeight:1.7}}>
                        {h.contrib}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {person&&(
            <div style={{position:mobile?"static":"sticky",top:72,height:"fit-content",
              border:"1px solid rgba(255,255,255,0.06)",padding:"1.5rem",background:"rgba(255,255,255,0.01)"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:"1rem",marginBottom:"1.2rem"}}>
                <h2 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:700,
                  color:person.color,margin:0}}>{person.name}</h2>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444"}}>{person.year}</span>
              </div>

              <div style={{marginBottom:"1.2rem"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:"#444",marginBottom:"0.5rem"}}>WHAT THEY CONTRIBUTED</div>
                <div style={{fontSize:13,color:"#C8C0B8",lineHeight:1.8,padding:"0.8rem",
                  background:"rgba(255,255,255,0.02)",borderLeft:"2px solid rgba(255,255,255,0.08)"}}>
                  {person.contrib}
                </div>
              </div>

              {person.gap!=="—"&&(
                <div style={{marginBottom:"1.2rem"}}>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:"#8B4513",marginBottom:"0.5rem"}}>WHERE THEY STOPPED</div>
                  <div style={{fontSize:13,color:"#C8A882",lineHeight:1.8,padding:"0.8rem",
                    background:"rgba(139,69,19,0.05)",borderLeft:"2px solid rgba(139,69,19,0.2)"}}>
                    {person.gap}
                  </div>
                </div>
              )}

              <div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.2em",color:"#00FFB3",marginBottom:"0.5rem"}}>HOW THE URP COMPLETES IT</div>
                <div style={{fontSize:13,color:"#A8E8C8",lineHeight:1.8,padding:"0.8rem",
                  background:"rgba(0,255,179,0.03)",borderLeft:`2px solid rgba(0,255,179,0.25)`}}>
                  {person.urp}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════════════════════════════════
function Hero({go, mobile}) {
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),65);return()=>clearInterval(t);},[]);
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",padding:mobile?"6rem 1.5rem 3rem":"0 2rem",
      position:"relative",zIndex:1,textAlign:"center"}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.35em",
        color:"#00FFB3",opacity:0.5,marginBottom:"1.5rem"}}>
        UNITARY REFERENCE PRINCIPLE
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",
        fontSize:`clamp(56px,10vw,120px)`,fontWeight:700,color:"#F5F0E8",
        lineHeight:1,marginBottom:"0.3rem",
        textShadow:"0 0 60px rgba(245,240,232,0.04)"}}>
        n/R
      </div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#333",
        letterSpacing:"0.2em",marginBottom:"2.5rem"}}>
        = meaning
      </div>
      <p style={{fontSize:"clamp(14px,2vw,18px)",color:"#555",lineHeight:1.9,
        maxWidth:540,fontFamily:"'Space Mono',monospace",marginBottom:"3rem"}}>
        Every number is a fraction of a declared reference.<br/>
        Every formula follows from one declaration.<br/>
        17 papers. From primes to quantum gravity.
      </p>
      <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>go("Papers")} style={{
          background:"#00FFB3",color:"#080C08",border:"none",
          fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:"0.15em",
          padding:"0.9rem 2rem",cursor:"pointer",fontWeight:700,
          transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#00DDA0";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#00FFB3";}}>
          EXPLORE THE PAPERS
        </button>
        <button onClick={()=>go("History")} style={{
          background:"transparent",color:"#00FFB3",
          border:"1px solid rgba(0,255,179,0.3)",
          fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:"0.15em",
          padding:"0.9rem 2rem",cursor:"pointer",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,255,179,0.7)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,255,179,0.3)";}}>
          EXPLORE HISTORY
        </button>
      </div>
      {/* Published count */}
      <div style={{marginTop:"4rem",display:"flex",gap:"2.5rem",flexWrap:"wrap",justifyContent:"center"}}>
        {[
          {n:"5",l:"Published"},
          {n:"17",l:"Total Papers"},
          {n:"2026",l:"Year"},
        ].map(({n,l})=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:"#00FFB3"}}>{n}</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#333",letterSpacing:"0.2em",marginTop:2}}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  IDEAS
// ═══════════════════════════════════════════════════════════════════════
function IdeasPage({mobile}) {
  const ideas=[
    {n:"I",title:"Everything is a fraction",body:"Remove the declared reference and you don't have a smaller number. You have nothing. No measurement. No meaning. n/R is the minimum unit of meaning in mathematics."},
    {n:"II",title:"Zero has two forms",body:"True zero is non-existence — no declared reference. 0/R is contextual depletion — the frame exists, the content is empty. These are structurally different. Conflating them is the source of mathematical paradoxes going back 2,500 years."},
    {n:"III",title:"One is the only complete whole",body:"1 = n/R where n = R. The only value where the measurement equals the reference. All of mathematics lives between 0 and 1 in this sense. Infinity is approach. 1 is arrival."},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:72,background:"#080C08",maxWidth:900,margin:"0 auto",padding:"72px 2rem 4rem"}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.25em",color:"#333",marginBottom:"0.6rem"}}>THREE IDEAS</div>
      <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"#F5F0E8",margin:"0 0 2rem"}}>The Framework in Three Sentences</h1>
      <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
        {ideas.map(idea=>(
          <div key={idea.n} style={{display:"grid",gridTemplateColumns:"60px 1fr",gap:"1.5rem",
            padding:"2rem",border:"1px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.01)"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:48,fontWeight:700,
              color:"rgba(0,255,179,0.15)",lineHeight:1}}>{idea.n}</div>
            <div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,
                color:"#F5F0E8",marginBottom:"0.75rem"}}>{idea.title}</div>
              <div style={{fontSize:14,color:"#666",lineHeight:1.9}}>{idea.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  BLOG
// ═══════════════════════════════════════════════════════════════════════
const BLOGS=[
  {id:1,date:"April 22, 2026",readTime:"5 min",tag:"FOUNDATIONS",tagColor:"#00FFB3",
   title:"Division by Zero Is Not 'Undefined' — It's Unconstructable",
   sub:"Your math teacher wasn't wrong. But the reason they gave wasn't quite right.",
   body:"Every student hits the wall. 5 ÷ 0 on the board and: 'That's undefined. Don't do it. Move on.' The Unitary Reference Principle gives the real answer: zero has no declared reference. You cannot divide by what doesn't exist as a frame. It's not undefined — it's unconstructable. Structurally impossible. The question itself has no foundation."},
  {id:2,date:"April 24, 2026",readTime:"6 min",tag:"NUMBER THEORY",tagColor:"#00D4FF",
   title:"Does 0.999... Really Equal 1?",
   sub:"Millions have seen the algebraic proof. Millions still don't believe it. They might be onto something.",
   body:"The proof is technically valid. But it hides an assumption: that 0.999... is already a completed value. It is not. It is a process — an infinite sequence that never terminates. 1 is a destination. 0.999... is a journey. The URP makes this distinction fundamental: approach and arrival are structurally different. The fraction 1/3 is exact. The decimal 0.333... is base-10 struggling to express it."},
  {id:3,date:"April 26, 2026",readTime:"8 min",tag:"MILLENNIUM PROBLEMS",tagColor:"#FF6B6B",
   title:"The Riemann Hypothesis: Why Nobody Could Answer 'Why ½?'",
   sub:"165 years. Trillions of verified zeros. Nobody could explain WHY that specific line.",
   body:"In 1859, Riemann noted that zeros of his zeta function all sat on one vertical line — where the real part equals exactly one-half. Ten trillion zeros computed. All on that line. The missing question: WHY one-half? The URP answers it: the critical strip is the domain of fractional reality. A zero off ½ creates two depletion events in one declared reference — requiring the frame to go negative. Only ½ maps to itself. One event. Self-symmetric. Structurally forced."},
];

function BlogPage({mobile}) {
  const [active,setActive]=useState(null);
  if(active!==null){
    const post=BLOGS[active];
    return (
      <div style={{minHeight:"100vh",paddingTop:72,maxWidth:700,margin:"0 auto",padding:"72px 2rem 4rem",background:"#080C08"}}>
        <button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:"#444",
          fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:"0.1em",
          cursor:"pointer",padding:0,marginBottom:"2rem"}}
          onMouseEnter={e=>e.currentTarget.style.color="#00FFB3"}
          onMouseLeave={e=>e.currentTarget.style.color="#444"}>
          ← BACK TO BLOG
        </button>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.2em",
          color:post.tagColor,marginBottom:"0.5rem"}}>{post.tag}</div>
        <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(22px,3vw,36px)",
          fontWeight:700,color:"#F5F0E8",margin:"0 0 0.75rem",lineHeight:1.2}}>{post.title}</h1>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444",marginBottom:"2rem"}}>{post.date} · {post.readTime} read</div>
        <p style={{fontSize:15,color:"#888",lineHeight:2}}>{post.body}</p>
      </div>
    );
  }
  return (
    <div style={{minHeight:"100vh",paddingTop:72,maxWidth:900,margin:"0 auto",padding:"72px 2rem 4rem",background:"#080C08"}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.25em",color:"#333",marginBottom:"0.6rem"}}>BLOG</div>
      <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"#F5F0E8",margin:"0 0 2rem"}}>Notes on the Framework</h1>
      <div style={{display:"flex",flexDirection:"column",gap:"1px",background:"rgba(255,255,255,0.04)"}}>
        {BLOGS.map((post,i)=>(
          <div key={post.id} onClick={()=>setActive(i)}
            style={{background:"#080C08",padding:"1.5rem 2rem",cursor:"pointer",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}
            onMouseLeave={e=>e.currentTarget.style.background="#080C08"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:post.tagColor,letterSpacing:"0.15em"}}>{post.tag}</span>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#333"}}>{post.date}</span>
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:17,fontWeight:700,color:"#D0C8C0",marginBottom:"0.4rem",lineHeight:1.3}}>{post.title}</div>
            <div style={{fontSize:13,color:"#444",fontFamily:"'Space Mono',monospace"}}>{post.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  ABOUT
// ═══════════════════════════════════════════════════════════════════════
function AboutPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:72,maxWidth:700,margin:"0 auto",padding:"72px 2rem 4rem",background:"#080C08"}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.25em",color:"#333",marginBottom:"0.6rem"}}>ABOUT</div>
      <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"#F5F0E8",margin:"0 0 1.5rem"}}>Joshua Steven Brogley</h1>
      <div style={{fontSize:14,color:"#666",lineHeight:2,marginBottom:"2rem"}}>
        Independent researcher. Head coach, Uitsmijters '55 Baseball, Almelo, Netherlands. Father of two.<br/><br/>
        I'm not a professional mathematician. I'm someone who spent years asking why the foundations of mathematics feel incomplete — why division by zero is "undefined" rather than explained, why the Riemann Hypothesis has trillions of verified examples but no proof, why geometric formulas feel disconnected from each other.<br/><br/>
        The Unitary Reference Principle is my answer. It started as a single observation about fractions and became a framework that reframes everything from primes to quantum mechanics. Published independently on Zenodo. Four papers out. Thirteen more in progress.
      </div>
      <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
        {PAPERS.filter(p=>p.published).map(p=>(
          <a key={p.id} href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:p.color,
              textDecoration:"none",border:`1px solid ${p.color}30`,padding:"0.4rem 0.9rem",
              letterSpacing:"0.05em",transition:"all 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=p.color}
            onMouseLeave={e=>e.currentTarget.style.borderColor=`${p.color}30`}>
            Paper {p.num}: {p.title} ↗
          </a>
        ))}
      </div>
    </div>
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

  const handleSelectPaper=(paper)=>{
    setSelectedPaper(paper);
    setPage("PaperDetail");
    window.scrollTo(0,0);
  };

  return (
    <div style={{background:"#080C08",minHeight:"100vh",color:"#F5F0E8",
      fontFamily:"'Space Mono',monospace"}}>
      <ParticleField mobile={mobile}/>
      <Nav page={page} go={go} mobile={mobile}/>
      {page==="Home"&&<Hero go={go} mobile={mobile}/>}
      {page==="Papers"&&<PapersPage onSelectPaper={handleSelectPaper} mobile={mobile}/>}
      {page==="PaperDetail"&&selectedPaper&&<PaperPage paper={selectedPaper} onBack={()=>go("Papers")}/>}
      {page==="History"&&<HistoryPage mobile={mobile}/>}
      {page==="Ideas"&&<IdeasPage mobile={mobile}/>}
      {page==="Blog"&&<BlogPage mobile={mobile}/>}
      {page==="About"&&<AboutPage/>}
    </div>
  );
}
