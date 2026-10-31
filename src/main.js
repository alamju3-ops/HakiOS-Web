import {state,saveState,makeId,formatTime} from "./state.js";
import {renderLockScreen} from "./screens/lock-screen.js";
import {renderHomeScreen} from "./screens/home-screen.js";
import {renderControlCenter} from "./screens/control-center.js";
import {renderApp} from "./apps/app-shell.js";
import {renderNotes,renderNoteEditor,createNote,updateNote} from "./apps/notes.js";
import {renderMessages,renderChat,createChat,sendMessage} from "./apps/messages.js";
import {renderContacts,addContact,deleteContact} from "./apps/contacts.js";
import {addSearch} from "./apps/safari.js";

const $=s=>document.querySelector(s);
const device=$("#device"),lock=$("#lock-screen"),home=$("#home-screen"),appScreen=$("#app-screen"),cc=$("#control-center"),toast=$("#toast"),gesture=$("#gesture-area");
let activeNote=null,activeChat=null,toastTimer=null,touchStart=null,flashOn=false,mediaPlaying=false;
function showToast(message){toast.textContent=message;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),1800)}
function updateStatus(){const now=new Date();$("#status-time").textContent=formatTime(now);device.classList.toggle("theme-light",state.theme==="light");device.classList.toggle("theme-dark",state.theme!=="light");device.style.setProperty("--brightness",String(state.brightness/100));const bgs={aurora:"radial-gradient(ellipse at 18% 20%,#5584ffdd,transparent 37%),radial-gradient(ellipse at 83% 34%,#c251ffb8,transparent 36%),radial-gradient(ellipse at 48% 88%,#12cebe99,transparent 42%),linear-gradient(155deg,#111b3c,#24205b 48%,#071a31)",violet:"radial-gradient(ellipse at 20% 20%,#ffb2d9,transparent 38%),radial-gradient(ellipse at 80% 40%,#7d61ff,transparent 42%),linear-gradient(145deg,#170d37,#512c83)",ocean:"radial-gradient(ellipse at 30% 25%,#9af3ee,transparent 38%),radial-gradient(ellipse at 78% 65%,#197ad5,transparent 45%),linear-gradient(145deg,#061d42,#096b91)"};$(".wallpaper").style.background=bgs[state.wallpaper]||bgs.aurora}
function renderHome(){home.innerHTML=renderHomeScreen();home.classList.remove("hidden");lock.classList.add("hidden");appScreen.classList.add("hidden");cc.classList.add("hidden");state.locked=false;state.app=null;activeChat=null;activeNote=null;saveState();updateStatus()}
function renderLock(){lock.innerHTML=renderLockScreen();lock.classList.remove("hidden");home.classList.add("hidden");appScreen.classList.add("hidden");cc.classList.add("hidden");updateStatus()}
function unlock(){state.locked=false;saveState();renderHome();let island=$(".dynamic-island");if(!island){island=document.createElement("div");island.className="dynamic-island";island.innerHTML='<span class="island-dot"></span><span class="island-label">HakiOS</span>';device.append(island)}setTimeout(()=>island.classList.add("expanded"),100);setTimeout(()=>island.classList.remove("expanded"),1400)}
function openApp(id){if(state.locked)unlock();state.app=id;activeChat=null;activeNote=null;appScreen.innerHTML=renderApp(id);appScreen.classList.remove("hidden");home.classList.add("hidden");lock.classList.add("hidden");cc.classList.add("hidden");updateStatus();if(id==="clock")updateLiveClock()}
function updateLiveClock(){const el=$("#clock-live");if(el&&!appScreen.classList.contains("hidden")){el.textContent=formatTime();setTimeout(updateLiveClock,1000)}}
function renderAppContent(html){const content=$("[data-app-content]");if(content)content.innerHTML=html}
function openCC(){if(state.locked)return;cc.innerHTML=renderControlCenter();cc.classList.remove("hidden")}
function closeCC(){cc.classList.add("hidden")}
function escapeHtml(s=""){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function applySetting(el){if(el.dataset.setting){state[el.dataset.setting]=el.checked;saveState();showToast(el.checked?"켬":"끔");if(!cc.classList.contains("hidden"))cc.innerHTML=renderControlCenter()}if(el.dataset.settingRange){state[el.dataset.settingRange]=Number(el.value);saveState();updateStatus()}if(el.dataset.settingSelect){state[el.dataset.settingSelect]=el.value;saveState();updateStatus();showToast("설정이 변경되었습니다")}}
function openNote(id){activeNote=id;renderAppContent(renderNoteEditor(id))}
function openChat(id){activeChat=id;renderAppContent(renderChat(id));const list=$("#chat-messages");if(list)list.scrollTop=list.scrollHeight}
document.addEventListener("click",e=>{
 const app=e.target.closest("[data-app]");if(app){openApp(app.dataset.app);return}
 const action=e.target.closest("[data-action]")?.dataset.action;
 if(action){switch(action){
  case"home":renderHome();break;
  case"close-control":closeCC();break;
  case"lock":state.locked=true;saveState();renderLock();break;
  case"flashlight":flashOn=!flashOn;showToast(flashOn?"손전등 켬":"손전등 끔");break;
  case"camera-shortcut":openApp("camera");break;
  case"new-note":openNote(createNote());break;
  case"notes-back":activeNote=null;renderAppContent(renderNotes());break;
  case"new-chat":{const name=prompt("대화 상대 이름을 입력하세요");if(name?.trim())openChat(createChat(name.trim()));break}
  case"new-contact":{const name=prompt("이름을 입력하세요");if(name?.trim()){const phone=prompt("전화번호를 입력하세요")||"";addContact(name.trim(),phone);openApp("contacts")}break}
  case"app-action":showToast("추가 동작은 준비 중입니다");break;
  case"media-toggle":mediaPlaying=!mediaPlaying;e.target.textContent=mediaPlaying?"Ⅱ":"▶";showToast(mediaPlaying?"재생 중":"일시 정지");break;
  case"shutter":showToast("카메라 데모에서는 사진이 저장되지 않습니다");break;
  case"call":showToast("실제 전화는 연결되지 않는 데모입니다");break;
  case"add-alarm":showToast("알람 기능은 데모입니다");break;
  case"stopwatch":showToast("스톱워치 데모");break;
  case"timer":showToast("1분 타이머 데모");break;
 }return}
 const edit=e.target.closest("[data-edit-note]");if(edit){openNote(edit.dataset.editNote);return}
 const chat=e.target.closest("[data-chat]");if(chat){openChat(chat.dataset.chat);return}
 const delNote=e.target.closest("[data-delete-note]");if(delNote&&confirm("이 메모를 삭제할까요?")){state.notes=state.notes.filter(n=>n.id!==delNote.dataset.deleteNote);saveState();activeNote=null;renderAppContent(renderNotes());return}
 const delContact=e.target.closest("[data-delete-contact]");if(delContact){deleteContact(delContact.dataset.deleteContact);openApp("contacts");return}
 const toggle=e.target.closest("[data-toggle]");if(toggle){const key=toggle.dataset.toggle;state[key]=!state[key];saveState();cc.innerHTML=renderControlCenter();return}
 const repeat=e.target.closest("[data-repeat-search]");if(repeat){const q=decodeURIComponent(repeat.dataset.repeatSearch);window.open("https://www.google.com/search?q="+encodeURIComponent(q),"_blank","noopener");return}
 const dial=e.target.closest("[data-dial]");if(dial){const el=$("#dial-display");if(el)el.textContent+=dial.dataset.dial;return}
});
document.addEventListener("input",e=>{
 if((e.target.matches("#note-title")||e.target.matches("#note-body"))&&activeNote)updateNote(activeNote,$("#note-title")?.value||"",$("[data-app-content] #note-body")?.value||"");
 if(e.target.matches("[data-brightness]")){state.brightness=Number(e.target.value);saveState();updateStatus()}
 if(e.target.matches("[data-setting-range],[data-setting],[data-setting-select]"))applySetting(e.target);
 if(e.target.matches("#note-search")){const q=e.target.value.toLowerCase();document.querySelectorAll("[data-edit-note]").forEach(el=>el.style.display=el.textContent.toLowerCase().includes(q)?"":"none")}
 if(e.target.matches("#contact-search")){const q=e.target.value.toLowerCase();document.querySelectorAll(".list-row").forEach(el=>el.style.display=el.textContent.toLowerCase().includes(q)?"":"none")}
});
document.addEventListener("change",e=>{if(e.target.matches("[data-setting],[data-setting-select],[data-setting-range]"))applySetting(e.target)});
document.addEventListener("submit",e=>{
 if(e.target.id==="message-form"){e.preventDefault();const id=e.target.dataset.chatId,text=$("#message-text")?.value||"";sendMessage(id,text);openChat(id);return}
 if(e.target.id==="search-form"){e.preventDefault();const q=$("#google-query")?.value.trim();if(q){state.searches=[q,...state.searches.filter(x=>x!==q)].slice(0,12);saveState();addSearch(q);window.open("https://www.google.com/search?q="+encodeURIComponent(q),"_blank","noopener");showToast("Google 검색을 열었습니다")}return}
});
function gestureStart(y,x){touchStart={y,x}}
function gestureEnd(y,x){if(!touchStart)return;const dy=y-touchStart.y,dx=x-touchStart.x;if(state.locked&&dy<-55)unlock();else if(!state.locked&&touchStart.y<80&&dy>70&&Math.abs(dy)>Math.abs(dx))openCC();else if(!state.locked&&touchStart.y>window.innerHeight-85&&dy<-65)renderHome();touchStart=null}
device.addEventListener("touchstart",e=>{const t=e.changedTouches[0];gestureStart(t.clientY,t.clientX)},{passive:true});
device.addEventListener("touchend",e=>{const t=e.changedTouches[0];gestureEnd(t.clientY,t.clientX)},{passive:true});
let pointerY=0;device.addEventListener("pointerdown",e=>{pointerY=e.clientY});device.addEventListener("pointerup",e=>{const dy=e.clientY-pointerY;if(state.locked&&dy<-60)unlock();else if(!state.locked&&pointerY<70&&dy>70)openCC()});
gesture.addEventListener("click",()=>{if(state.locked)unlock();else if(!cc.classList.contains("hidden"))closeCC();else renderHome()});
lock.addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(b){if(b.dataset.action==="camera-shortcut")openApp("camera");else if(b.dataset.action==="flashlight"){flashOn=!flashOn;showToast(flashOn?"손전등 켬":"손전등 끔")}return}unlock()});
window.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!cc.classList.contains("hidden"))closeCC();else renderHome()}});
window.addEventListener("load",()=>{updateStatus();if(state.locked)renderLock();else renderHome();setInterval(()=>{if(!lock.classList.contains("hidden")){const clock=lock.querySelector(".lock-clock");if(clock)clock.textContent=formatTime()}},1000)});
