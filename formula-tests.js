// Run in browser console after opening index.html, or load after calculation-engine.js.
(function(){
 const cases=[
  ["two outcome 2.10/2.10",()=>Math.abs(Calc.implied([2.1,2.1])-0.95238095238)<1e-9],
  ["three outcome 1.40/3.25/17",()=>Math.abs(Calc.implied([1.4,3.25,17])-1.0808015)<1e-6],
  ["1.50/2.00 is overround (corrected spec check)",()=>Math.abs(Calc.implied([1.5,2])-(1/1.5+1/2))<1e-10],
  ["break even 2.00/2.00",()=>Math.abs(Calc.implied([2,2])-1)<1e-10],
  ["lay liability",()=>Calc.lay(3,10).liability===20],
  ["back return",()=>Calc.back(2,10).grossReturn===20],
  ["zero return monthly FV",()=>Calc.futureValue(100,0,1,10)===220],
  ["CAGR 100 to 100000 in 5 years",()=>Math.abs(Calc.cagr(100,100000,5)*100-298.107)<0.02],
  ["drawdown",()=>Calc.drawdown(200,150).percent===25],
  ["EV",()=>Calc.ev(.5,2,100)===0],
  ["invalid odds rejected",()=>{try{Calc.odds(1);return false}catch(e){return true}}]
 ];
 const out=cases.map(([name,fn])=>({name,pass:!!fn()}));
 console.table(out);return out.every(x=>x.pass);
})();