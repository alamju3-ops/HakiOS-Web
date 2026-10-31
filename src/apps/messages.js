import {state,saveState,makeId,formatTime} from "../state.js";

export function renderMessages(){
  return `
    <section class="orbit-message-list">
      <div class="orbit-list-heading">
        <div><div class="orbit-eyebrow">MESSAGES</div><h2>메시지</h2></div>
        <button class="orbit-new-chat" data-action="new-chat" aria-label="새 대화">＋</button>
      </div>
      <label class="orbit-search"><span>⌕</span><input class="app-input" id="message-search" placeholder="검색" autocomplete="off"></label>
      <div class="orbit-list-items">
        ${state.messages.map(c=>`
          <button class="orbit-conversation" data-chat="${c.id}">
            <span class="orbit-avatar">${esc(initials(c.name))}<i></i></span>
            <span class="orbit-conversation-copy">
              <span class="orbit-conversation-top"><strong>${esc(c.name)}</strong><time>${c.items.at(-1)?formatTime(new Date(c.items.at(-1).time)):""}</time></span>
              <span class="orbit-preview">${esc(c.items.at(-1)?.text||"새로운 대화를 시작하세요")}</span>
            </span>
          </button>`).join("")||'<div class="app-empty">대화가 없습니다.</div>'}
      </div>
    </section>`;
}

export function renderChat(id){
  const c=state.messages.find(x=>x.id===id);
  if(!c)return renderMessages();
  return `
    <section class="orbit-thread">
      <header class="orbit-thread-header">
        <button class="orbit-back" data-action="messages-back" aria-label="대화 목록">‹</button>
        <span class="orbit-avatar orbit-avatar-small">${esc(initials(c.name))}<i></i></span>
        <div class="orbit-thread-person"><strong>${esc(c.name)}</strong><span>iMessage · 메시지</span></div>
        <button class="orbit-more" data-action="app-action" aria-label="더 보기">•••</button>
      </header>
      <div class="orbit-thread-date">오늘</div>
      <div class="message-list orbit-bubble-list" id="chat-messages">
        ${c.items.map(m=>`
          <div class="orbit-message-row ${m.out?"is-outgoing":"is-incoming"}">
            <div class="message-bubble ${m.out?"outgoing":"orbit-incoming"}" data-message-id="${m.id}">${esc(m.text)}</div>
          </div>`).join("")}
      </div>
      <form class="message-composer orbit-composer" id="message-form" data-chat-id="${id}">
        <button type="button" class="orbit-attach" data-action="app-action" aria-label="첨부">＋</button>
        <input id="message-text" autocomplete="off" placeholder="iMessage" aria-label="메시지 입력">
        <button class="orbit-send" aria-label="보내기">↑</button>
      </form>
    </section>`;
}

export function createChat(name){const c={id:makeId(),name,items:[]};state.messages.unshift(c);saveState();return c.id}
export function sendMessage(id,text){const c=state.messages.find(x=>x.id===id);if(c&&text.trim()){c.items.push({id:makeId(),text:text.trim(),out:true,time:Date.now()});saveState()}}
function initials(name=""){return String(name).trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase()||"?"}
function esc(s=""){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
