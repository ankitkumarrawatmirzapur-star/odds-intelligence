(function(g){
 const finite=(v,n)=>{const x=Number(v);if(!Number.isFinite(x))throw Error((n||"Value")+" must be a valid number");return x};
 const positive=(v,n,min=0)=>{const x=finite(v,n);if(x<min)throw Error((n||"Value")+" must be ≥ "+min);return x};
 const odds=(v,n)=>{const x=positive(v,n,1.0000001);return x};
 const money=v=>Math.round((v+Number.EPSILON)*100)/100;
 const pct=v=>v*100;
 function implied(oddsArr){if(!oddsArr.length)throw Error("At least one outcome required");return oddsArr.reduce((s,o)=>s+1/odds(o,"Odds"),0)}
 function allocate(bank,oddsArr){const B=positive(bank,"Bankroll");const S=implied(oddsArr);return {sum:S,stakes:oddsArr.map(o=>B*(1/o)/S),payout:B/S,grossProfit:B*(1/S-1),roi:(1/S-1)*100}}
 function commission(gross,rate,model="market",winningStake=0){const c=positive(rate,"Commission",0)/100;if(c>1)throw Error("Commission cannot exceed 100%");if(model==="none")return 0;if(model==="winning")return winningStake*c;return Math.max(0,gross)*c}
 function back(o,s){o=odds(o);s=positive(s,"Stake");return {grossReturn:s*o,profit:s*(o-1),loss:-s}}
 function lay(o,s,rate=0){o=odds(o);s=positive(s,"Lay stake");const liability=s*(o-1),fee=commission(s,rate,"winning",s);return {stake:s,liability,winIfSelectionLoses:s-fee,lossIfSelectionWins:-liability}}
 function futureValue(pv,annualRate,years,pmt=0){pv=positive(pv,"Present value");years=positive(years,"Years");pmt=positive(pmt,"Monthly contribution");const r=finite(annualRate,"Annual return")/100;if(r<=-1)throw Error("Annual return must be greater than -100%");const n=Math.round(years*12),i=Math.pow(1+r,1/12)-1;return i===0?pv+pmt*n:pv*Math.pow(1+i,n)+pmt*(Math.pow(1+i,n)-1)/i}
 function cagr(start,target,years){start=positive(start,"Starting capital",0.0000001);target=positive(target,"Target");years=positive(years,"Years",0.0000001);return Math.pow(target/start,1/years)-1}
 function drawdown(peak,current){peak=positive(peak,"Peak wealth");current=positive(current,"Current wealth");return {amount:Math.max(0,peak-current),percent:Math.max(0,(peak-current)/peak*100)}}
 function ev(prob,o,stake){prob=positive(prob,"Probability");if(prob>1)throw Error("Probability must be between 0 and 1");o=odds(o);stake=positive(stake,"Stake");return prob*stake*(o-1)-(1-prob)*stake}
 function plForOutcome(positions,outcome,totalInvestment,feeRate=0){let ret=0,winningStake=0;for(const p of positions){if(p.outcome===outcome){ret+=p.stake*p.odds;winningStake+=p.stake}}const gross=ret-totalInvestment;const fee=commission(gross,feeRate,"market");return {grossReturn:ret,grossPL:gross,commission:fee,netPL:gross-fee}}
 g.Calc={finite,positive,odds,money,implied,allocate,commission,back,lay,futureValue,cagr,drawdown,ev,plForOutcome};
})(window);