import {renderNotes,renderNoteEditor} from "./notes.js";
import {renderMessages,renderChat} from "./messages.js";
import {renderSettings} from "./settings.js";
import {renderContacts} from "./contacts.js";
import {renderSafari} from "./safari.js";
import {renderCalendar} from "./calendar.js";
import {renderClock} from "./clock.js";
import {renderPhotos} from "./photos.js";
import {renderPhone} from "./phone.js";
import {renderCamera} from "./camera.js";
import {renderWeather} from "./weather.js";
import {renderSimpleApp} from "./simple.js";
import {renderMusic} from "./music.js";
const apps={notes:["메모",renderNotes],messages:["메시지",renderMessages],settings:["설정",renderSettings],contacts:["연락처",renderContacts],safari:["Safari",renderSafari],calendar:["캘린더",renderCalendar],clock:["시계",renderClock],photos:["사진",renderPhotos],phone:["전화",renderPhone],camera:["카메라",renderCamera],weather:["날씨",renderWeather],mail:["메일",renderSimpleApp],maps:["지도",renderSimpleApp],music:["음악",renderMusic],appstore:["App Store",renderSimpleApp],files:["파일",renderSimpleApp]};
export function renderApp(app){const [title,renderer]=apps[app]||["앱",renderSimpleApp];return `<div class="app-panel" data-current-app="${app}"><header class="app-header"><button class="app-back" data-action="home">‹ 홈</button><div class="app-title">${title}</div><button class="app-action" data-action="app-action">···</button></header><div class="app-content" data-app-content>${renderer(app)}</div></div>`}