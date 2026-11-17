(function(g){g.Reports={
 csv(rows){if(!rows.length)return "";const cols=[...new Set(rows.flatMap(r=>Object.keys(r)))];const q=v=>'"'+String(v??"").replace(/"/g,'""')+'"';return [cols.map(q).join(","),...rows.map(r=>cols.map(c=>q(r[c])).join(","))].join("\r\n")},
 download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
}})(window);