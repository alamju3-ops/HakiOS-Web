const tracks = [
  { title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", time: "4:03", art: "art-sunset", tag: "Dream pop" },
  { title: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", time: "3:36", art: "art-orbit", tag: "Indie" },
  { title: "After Dark", artist: "Mr.Kitty", album: "Time", time: "4:17", art: "art-night", tag: "Electronic" },
  { title: "Space Song", artist: "Beach House", album: "Depression Cherry", time: "5:20", art: "art-space", tag: "Dream pop" },
  { title: "Sweater Weather", artist: "The Neighbourhood", album: "I Love You.", time: "4:00", art: "art-mono", tag: "Alternative" }
];
let currentTrack = 0;
let isPlaying = false;
let liked = new Set([1, 3]);
let activeTab = "Home";
let progress = 31;

function artwork(track, large = false) {
  return `<div class="wave-art ${track.art} ${large ? "wave-art-large" : ""}" aria-label="Album artwork"><span></span><i></i></div>`;
}
function trackRow(track, index) {
  return `<button class="wave-track ${index === currentTrack ? "is-current" : ""}" data-wave-action="play-track" data-track-index="${index}">
    ${artwork(track)}<span class="wave-track-copy"><strong>${track.title}</strong><small>${track.artist} · ${track.album}</small></span>
    <span class="wave-track-time">${track.time}</span><span class="wave-track-more" aria-hidden="true">···</span>
  </button>`;
}
function playerBar() {
  const track = tracks[currentTrack];
  return `<div class="wave-mini-player">
    ${artwork(track)}<div class="wave-mini-copy"><strong>${track.title}</strong><small>${track.artist}</small></div>
    <button class="wave-icon-button" data-wave-action="like-current" aria-label="좋아요">${liked.has(currentTrack) ? "♥" : "♡"}</button>
    <button class="wave-play-small" data-wave-action="toggle-play" aria-label="${isPlaying ? "일시 정지" : "재생"}">${isPlaying ? "Ⅱ" : "▶"}</button>
    <div class="wave-mini-progress"><span style="width:${progress}%"></span></div>
  </div>`;
}
function homeView() {
  return `<section class="wave-view wave-home-view">
    <div class="wave-greeting"><span class="wave-eyebrow">MONDAY, YOUR SOUNDTRACK</span><h2>Good evening<span>.</span></h2><p>A little music for wherever you are.</p></div>
    <div class="wave-featured">
      <div class="wave-featured-copy"><span class="wave-label">MADE FOR YOU</span><h3>In your<br>own orbit.</h3><p>Soft sounds. Long nights.</p><button data-wave-action="play-featured">Listen now <span>↗</span></button></div>
      <div class="wave-featured-art"><div class="wave-orb orb-one"></div><div class="wave-orb orb-two"></div><div class="wave-orb orb-three"></div></div>
    </div>
    <div class="wave-section-heading"><h3>Recently played</h3><button data-wave-action="tab" data-tab="Library">See all</button></div>
    <div class="wave-album-shelf">${tracks.slice(0, 4).map((track, i) => `<button class="wave-album-card" data-wave-action="play-track" data-track-index="${i}">${artwork(track)}<strong>${track.album}</strong><small>${track.artist}</small></button>`).join("")}</div>
    <div class="wave-section-heading"><h3>Picked for you</h3><button data-wave-action="tab" data-tab="Search">Explore</button></div>
    <div class="wave-pick-card">${artwork(tracks[3])}<div><strong>Slow down, stay awhile</strong><small>24 songs · Dream pop, ambient</small></div><button data-wave-action="play-track" data-track-index="3" aria-label="재생">▶</button></div>
    <div class="wave-track-list">${tracks.slice(0, 3).map((track, i) => trackRow(track, i)).join("")}</div>
  </section>`;
}
function searchView() {
  return `<section class="wave-view"><div class="wave-page-heading"><span class="wave-eyebrow">FIND YOUR FREQUENCY</span><h2>Search</h2></div>
    <label class="wave-search-box"><span>⌕</span><input id="wave-search-input" type="search" placeholder="Songs, artists, albums" autocomplete="off"><kbd>⌘ K</kbd></label>
    <div class="wave-section-heading"><h3>Browse all</h3></div><div class="wave-genres">
      <button data-wave-action="genre" data-genre="Dream pop" class="genre-lilac">Dream pop <span>✳</span></button>
      <button data-wave-action="genre" data-genre="Electronic" class="genre-blue">Electronic <span>◌</span></button>
      <button data-wave-action="genre" data-genre="Indie" class="genre-orange">Indie <span>✦</span></button>
      <button data-wave-action="genre" data-genre="Alternative" class="genre-green">Alternative <span>⌁</span></button>
    </div><div class="wave-section-heading"><h3 id="wave-results-title">Popular right now</h3></div><div id="wave-search-results" class="wave-track-list">${tracks.map(trackRow).join("")}</div>
  </section>`;
}
function libraryView() {
  const saved = tracks.filter((_, i) => liked.has(i));
  return `<section class="wave-view"><div class="wave-page-heading"><span class="wave-eyebrow">YOUR PERSONAL COLLECTION</span><h2>Library</h2></div>
    <div class="wave-library-filters"><button class="selected">All</button><button>Playlists</button><button>Artists</button><button>Albums</button></div>
    <button class="wave-library-feature" data-wave-action="play-track" data-track-index="1"><div class="wave-liked-art">♥</div><span><strong>Liked songs</strong><small>${saved.length} tracks · Your favorites</small></span><span class="wave-library-arrow">›</span></button>
    <div class="wave-section-heading"><h3>Recently added</h3><button data-wave-action="sort">↕ Sort</button></div><div class="wave-track-list">${tracks.map(trackRow).join("")}</div>
  </section>`;
}
function nowPlayingView() {
  const track = tracks[currentTrack];
  return `<section class="wave-now-playing"><div class="wave-now-top"><button data-wave-action="back-home" aria-label="뒤로">⌄</button><div><span>NOW PLAYING</span><small>Playing from your mix</small></div><button data-wave-action="show-queue" aria-label="대기열">···</button></div>
    <div class="wave-now-art-wrap">${artwork(track, true)}<div class="wave-art-glow"></div></div>
    <div class="wave-now-meta"><div><h2>${track.title}</h2><p>${track.artist}</p></div><button class="wave-now-like" data-wave-action="like-current">${liked.has(currentTrack) ? "♥" : "♡"}</button></div>
    <div class="wave-progress-area"><input id="wave-progress" type="range" min="0" max="100" value="${progress}" aria-label="재생 위치"><div class="wave-time-labels"><span>${Math.floor(progress * 2.4 / 60)}:${String(Math.floor(progress * 1.44) % 60).padStart(2, "0")}</span><span>−${track.time}</span></div></div>
    <div class="wave-transport"><button data-wave-action="shuffle" aria-label="셔플">⤨</button><button data-wave-action="previous" aria-label="이전 곡">‹</button><button class="wave-main-play" data-wave-action="toggle-play" aria-label="${isPlaying ? "일시 정지" : "재생"}">${isPlaying ? "Ⅱ" : "▶"}</button><button data-wave-action="next" aria-label="다음 곡">›</button><button data-wave-action="repeat" aria-label="반복">↻</button></div>
    <div class="wave-now-bottom"><span>◖ ▰ ▰ ▰ ◗</span><span>♫ &nbsp; Queue</span></div>
  </section>`;
}
function renderBody() {
  const body = document.querySelector("#wave-body");
  if (!body) return;
  if (activeTab === "Search") body.innerHTML = searchView();
  else if (activeTab === "Library") body.innerHTML = libraryView();
  else body.innerHTML = homeView();
}
function renderMusic() {
  return `<div class="wave-app">
    <header class="wave-header"><div class="wave-brand"><span class="wave-brand-mark">w.</span><span>WAVE</span></div><button class="wave-avatar" data-wave-action="profile" aria-label="프로필">a</button></header>
    <main id="wave-body" class="wave-body">${homeView()}</main>
    <nav class="wave-tabbar" aria-label="음악 메뉴"><button class="wave-tab active" data-wave-action="tab" data-tab="Home"><span>⌂</span>Home</button><button class="wave-tab" data-wave-action="tab" data-tab="Search"><span>⌕</span>Search</button><button class="wave-tab" data-wave-action="tab" data-tab="Library"><span>▤</span>Library</button></nav>
    ${playerBar()}<div class="wave-screen-shade" hidden></div>
  </div>`;
}
function updatePlayer() {
  const app = document.querySelector(".wave-app");
  if (!app) return;
  const old = app.querySelector(".wave-mini-player");
  if (old) old.outerHTML = playerBar();
  const now = app.querySelector(".wave-now-playing");
  if (now) {
    const replacement = nowPlayingView();
    now.outerHTML = replacement;
  }
}
function setTrack(index) {
  currentTrack = (index + tracks.length) % tracks.length;
  isPlaying = true;
  progress = 0;
  updatePlayer();
  if (activeTab === "Home" || activeTab === "Library" || activeTab === "Search") {
    document.querySelectorAll(".wave-track").forEach(el => el.classList.toggle("is-current", Number(el.dataset.trackIndex) === currentTrack));
  }
}
document.addEventListener("click", event => {
  const button = event.target.closest("[data-wave-action]");
  if (!button || !document.querySelector(".wave-app")?.contains(button)) return;
  const action = button.dataset.waveAction;
  if (action === "tab") {
    activeTab = button.dataset.tab;
    document.querySelectorAll(".wave-tab").forEach(el => el.classList.toggle("active", el.dataset.tab === activeTab));
    renderBody();
  } else if (action === "play-track") {
    setTrack(Number(button.dataset.trackIndex));
  } else if (action === "play-featured") {
    setTrack(0);
  } else if (action === "toggle-play") {
    isPlaying = !isPlaying;
    updatePlayer();
  } else if (action === "like-current") {
    liked.has(currentTrack) ? liked.delete(currentTrack) : liked.add(currentTrack);
    updatePlayer();
    if (activeTab === "Library") renderBody();
  } else if (action === "next" || action === "previous") {
    setTrack(currentTrack + (action === "next" ? 1 : -1));
  } else if (action === "back-home") {
    activeTab = "Home";
    renderBody();
    document.querySelector(".wave-now-playing")?.remove();
  } else if (action === "genre") {
    activeTab = "Search";
    document.querySelectorAll(".wave-tab").forEach(el => el.classList.toggle("active", el.dataset.tab === "Search"));
    renderBody();
    const input = document.querySelector("#wave-search-input");
    if (input) input.value = button.dataset.genre;
    filterSearch(button.dataset.genre);
  } else if (action === "show-queue") {
    const shade = document.querySelector(".wave-screen-shade");
    if (shade) { shade.hidden = false; shade.innerHTML = '<div class="wave-queue"><button data-wave-action="close-queue">×</button><span class="wave-eyebrow">UP NEXT</span><h3>Queue</h3>' + tracks.map(trackRow).join("") + '</div>'; }
  } else if (action === "close-queue") {
    const shade = document.querySelector(".wave-screen-shade");
    if (shade) shade.hidden = true;
  } else if (action === "profile") {
    const app = document.querySelector(".wave-app");
    if (app) app.insertAdjacentHTML("beforeend", '<div class="wave-toast">Your profile · Coming soon</div>');
    setTimeout(() => document.querySelector(".wave-toast")?.remove(), 1700);
  } else if (action === "shuffle" || action === "repeat" || action === "sort") {
    button.classList.toggle("is-on");
  }
});
function filterSearch(query) {
  const q = (query || "").trim().toLowerCase();
  const results = document.querySelector("#wave-search-results");
  const title = document.querySelector("#wave-results-title");
  if (!results) return;
  const found = tracks.map((track, index) => ({track, index})).filter(({track}) => !q || [track.title, track.artist, track.album, track.tag].some(value => value.toLowerCase().includes(q)));
  results.innerHTML = found.length ? found.map(({track, index}) => trackRow(track, index)).join("") : '<div class="wave-empty">No matches yet. Try another search.</div>';
  if (title) title.textContent = q ? "Search results" : "Popular right now";
}
document.addEventListener("input", event => {
  if (event.target.matches("#wave-search-input")) filterSearch(event.target.value);
  if (event.target.matches("#wave-progress")) {
    progress = Number(event.target.value);
    const fill = document.querySelector(".wave-mini-progress span");
    if (fill) fill.style.width = progress + "%";
  }
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    const input = document.querySelector("#wave-search-input");
    if (input) { event.preventDefault(); input.focus(); }
  }
});
document.addEventListener("click", event => {
  if (event.target.closest(".wave-mini-player") && !event.target.closest("button")) {
    const app = document.querySelector(".wave-app");
    if (!app || app.querySelector(".wave-now-playing")) return;
    app.querySelector("#wave-body").innerHTML = nowPlayingView();
  }
});
export { renderMusic };
