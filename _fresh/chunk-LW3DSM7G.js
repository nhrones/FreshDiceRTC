import{c,d as p,e as f,f as g}from"./chunk-FW6O5JPS.js";var i=!0,v=2,n={id:"0",idx:0,playerName:"Player1",color:"brown",score:0,lastScore:""},a,u="snow",o=new Set;var R=(e,r)=>{a=e,u=r,o.clear(),f("PeerDisconnected",()=>{x([...o][1].id)}),f("SetID",t=>{console.info("players.when.SetID",t);let{id:s,name:l}=t;P(s,l),n.id=s,n.playerName=l,y(n),d(n),a&&a.resetGame()}),c("RegisterPeer",t=>{console.log("RegisterPeer playerid: ",t.id);let{id:s,name:l}=t;i&&console.log(`Players.RegisterPeer ${s}  ${l}`),P(s,l),d([...o][0]),a.resetGame(),p({event:"UpdatePeers",data:Array.from(o.values())})}),c("UpdatePeers",t=>{i&&console.info("Players.UpdatePeers",t),o.clear(),G(),t.forEach((s,l)=>{o.add({id:s.id,idx:l,playerName:s.playerName,color:s.color,score:0,lastScore:""}),n.id===s.id&&y(s),m(s.idx,s.color,s.playerName)}),d([...o][0]),a.resetGame()}),c("RemovePeer",t=>{x(t),a.resetGame()})},G=()=>{for(let e=0;e<v;e++)m(e,u,"")},E=()=>{for(let e of o)e.score=0,m(e.idx,e.color,e.playerName)},z=(e,r)=>{e.score+=r;let t=e.score===0?e.playerName:`${e.playerName} = ${e.score}`;m(e.idx,e.color,t)},m=(e,r,t)=>{i&&console.log("players.updatePlayer"+e,t),g("UpdatePlayer",{index:e,color:r,text:t})},P=(e,r)=>{i&&console.log("add player ",e+"  "+r),r==="Player"&&(r="Player"+(o.size+1)),n.id===""?(n.id=e,n.playerName=r,o.add(n)):(i&&console.log(`Players adding, id:${e} name: ${r}`),o.add({id:e,idx:o.size,playerName:r,color:S[o.size],score:0,lastScore:""})),i&&console.info(" added player",Array.from(o.values()))},x=e=>{let r=N(e);i&&console.info(" removing player",r),r!==null&&(o.delete(r),h(),y([...o][0]),d([...o][0]))},N=e=>{for(let r of o)if(r.id===e)return r;return null},B=e=>{let r=e.idx+1;return r===o.size&&(r=0),[...o][r]},h=()=>{let e=0;for(let r of o)r.idx=e,r.color=S[e],e++},S=["Brown","Green","RoyalBlue","Red"],y=e=>{i&&console.info("Step-4 - Players.setThisPlayer: ",e);let r=document.getElementById("favicon");n=e,document.title=n.playerName,console.log(`./icons/${e.idx}.png`),r.href=`./icons/${e.idx}.png`},$={id:"0",idx:0,playerName:"Player1",color:"brown",score:0,lastScore:""},d=e=>{$=e};export{n as a,o as b,R as c,G as d,E as e,z as f,B as g,$ as h,d as i};