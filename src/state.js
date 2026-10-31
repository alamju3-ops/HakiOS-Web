const KEY="hakios-web-state-v2";
const defaults={theme:"dark",brightness:100,wifi:true,bluetooth:false,airplane:false,focus:false,locked:true,app:null,notes:[{id:"n1",title:"환영합니다",body:"HakiOS Web에 오신 것을 환영합니다. 메모를 눌러 내용을 수정할 수 있습니다.",updated:Date.now()}],messages:[{id:"c1",name:"HakiOS",items:[{id:"m1",text:"HakiOS Web이 준비되었습니다.",out:false,time:Date.now()}]}],contacts:[{id:"p1",name:"HakiOS 지원",phone:"010-0000-0000"}],searches:[],wallpaper:"aurora"};
export function loadState(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...defaults}}}
export const state=loadState();
export function saveState(){localStorage.setItem(KEY,JSON.stringify(state))}
export function patchState(patch){Object.assign(state,patch);saveState()}
export function makeId(){return Math.random().toString(36).slice(2,10)}
export function formatTime(date=new Date()){return new Intl.DateTimeFormat("ko-KR",{hour:"2-digit",minute:"2-digit",hour12:false}).format(date)}
export function formatDate(date=new Date()){return new Intl.DateTimeFormat("ko-KR",{month:"long",day:"numeric",weekday:"long"}).format(date)}