(function(g){g.Hedge={
 analyze(positions,outcomes,feeRate=0){if(!positions.length)throw Error("Add at least one accepted position");const total=positions.reduce((s,p)=>s+p.stake,0);return outcomes.map(o=>({outcome:o,...Calc.plForOutcome(positions,o,total,feeRate)}))},
 // Enumerate candidate hedge stakes on a deterministic grid. It is a transparent bounded search, not a claim of exact LP optimality.
 optimize(positions,outcomes,budget,feeRate=0,steps=120){const B=Calc.positive(budget,"Remaining bankroll");const base=positions.reduce((s,p)=>s+p.stake,0);let best=null;const n=outcomes.length;const evaluate=adds=>{const all=positions.concat(adds.filter(x=>x.stake>0));const total=all.reduce((s,p)=>s+p.stake,0);const rows=outcomes.map(o=>Calc.plForOutcome(all,o,total,feeRate));const min=Math.min(...rows.map(r=>r.netPL));if(!best||min>best.min)best={min,adds:structuredClone(adds),rows,total};};
 if(n===2){for(let i=0;i<=steps;i++){const s=B*i/steps;for(const j of [0])evaluate([{outcome:outcomes[0],stake:s,odds:2},{outcome:outcomes[1],stake:0,odds:2}]);}}
 else {for(let i=0;i<=Math.min(steps,40);i++)for(let j=0;j<=Math.min(steps-i,40);j++){const a=B*i/40,b=B*j/40;if(a+b<=B+1e-8)evaluate([{outcome:outcomes[0],stake:a,odds:2},{outcome:outcomes[1],stake:b,odds:2},{outcome:outcomes[2],stake:0,odds:2}]);}}
 return best;
 }
}})(window);