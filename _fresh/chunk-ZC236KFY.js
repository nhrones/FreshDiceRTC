import{d as r,e as D}from"./chunk-46ZMC2R5.js";import{a as m,h as s}from"./chunk-56TOBTV2.js";import{a as u,b as a}from"./chunk-I5ONZ64L.js";import{e as o,f as l}from"./chunk-OFI2UGSN.js";import{a as d}from"./chunk-SMIHS7RB.js";import{a as n,b as c}from"./chunk-XHZETVEX.js";function h(e){let[x,t]=n(r[e.index].frozen),[f,z]=n(r[e.index].value);c(()=>{o("ScoreButtonTouched",()=>{t(!1)}),o("UpdateDie",i=>{i.index===e.index&&(z(i.value),t(i.frozen))})},[]);function b(i){m.id===s.id&&l("DieTouched",{index:e.index})}let v=D(x?a[f]:u[f]);return d("img",{src:v,class:"die",onClick:b})}export{h as a};
