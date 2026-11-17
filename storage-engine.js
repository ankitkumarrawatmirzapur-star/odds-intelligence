(function(g){const KEY="oiwbos_v3";const fresh=()=>({transactions:[],snapshots:[],history:[],settings:{target:100000,lossLimit:0,reserve:0,theme:"light"},createdAt:new Date().toISOString()});let state;
function load(){try{state=JSON.parse(localStorage.getItem(KEY))||fresh()}catch(e){state=fresh()}["transactions","snapshots","history"].forEach(k=>{if(!Array.isArray(state[k]))state[k]=[]});state.settings={...fresh().settings,...state.settings};return state}
function save(){localStorage.setItem(KEY,JSON.stringify(state));return true}
function get(){return state||load()}
function add(collection,item){get()[collection].unshift(item);save()}
function backup(){return JSON.stringify(get(),null,2)}
function restore(obj){if(!obj||typeof obj!=="object"||!Array.isArray(obj.transactions)||!Array.isArray(obj.snapshots)||!Array.isArray(obj.history))throw Error("Invalid backup file");state={...fresh(),...obj,settings:{...fresh().settings,...obj.settings}};save()}
g.Store={load,get,save,add,backup,restore,KEY};
})(window);