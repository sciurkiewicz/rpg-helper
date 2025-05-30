// Panel switching logic and feature initialization
function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
  document.getElementById(panelId).style.display = 'block';
}

// --- Generator postaci ---
function renderCharacterPanel() {
  const el = document.getElementById('character');
  el.innerHTML = `
    <h2>Generator postaci</h2>
    <button onclick="generateCharacter()">Wygeneruj postać</button>
    <div id="character-result" style="margin-top:16px;"></div>
  `;
}
function generateCharacter() {
  const names = ['Aldar', 'Mira', 'Thorin', 'Lira', 'Grom', 'Elena'];
  const classes = ['Wojownik', 'Mag', 'Łotrzyk', 'Kapłan', 'Łowca'];
  const races = ['Człowiek', 'Elf', 'Krasnolud', 'Ork', 'Gnom'];
  const char = {
    name: names[Math.floor(Math.random()*names.length)],
    class: classes[Math.floor(Math.random()*classes.length)],
    race: races[Math.floor(Math.random()*races.length)],
    stats: Array.from({length:6},()=>Math.floor(Math.random()*10+8))
  };
  document.getElementById('character-result').innerHTML =
    `<b>Imię:</b> ${char.name}<br><b>Klasa:</b> ${char.class}<br><b>Rasa:</b> ${char.race}<br><b>Statystyki:</b> ${char.stats.join(', ')}`;
}

// --- Kostka do gry ---
function renderDicePanel() {
  const el = document.getElementById('dice');
  el.innerHTML = `
    <h2>Kostka do gry</h2>
    <div id="dice-graphics" style="display:flex; gap:18px; flex-wrap:wrap; margin-bottom:18px; justify-content:center;"></div>
    <div style="margin-top:16px; text-align:center;">
      <div style="font-size:1.3rem; font-weight:bold;">Wynik</div>
      <div id="dice-result"></div>
    </div>
  `;
  // Dodaj przyciski graficzne po wygenerowaniu panelu
  const diceTypes = [4,6,8,10,12,20,100];
  const graphicsDiv = document.getElementById('dice-graphics');
  graphicsDiv.innerHTML = diceTypes.map(s=>`
    <button class="dice-graphic" onclick="rollDiceGraphic(${s})" title="Rzuć d${s}">
      <span class="dice-shape">d${s}</span>
    </button>
  `).join('');
}
function rollDiceGraphic(sides) {
  const resultDiv = document.getElementById('dice-result');
  resultDiv.innerHTML = '';
  let interval = 0;
  let rollCount = 0;
  interval = setInterval(() => {
    const fake = Math.floor(Math.random()*sides)+1;
    resultDiv.innerHTML = `<span style='font-size:2.2rem;'>${fake}</span>`;
    rollCount++;
    if (rollCount > 12) {
      clearInterval(interval);
      const result = Math.floor(Math.random()*sides)+1;
      let color = '#fff';
      if(result === 1) color = '#ff3b3b';
      else if(result === sides) color = '#ffd700';
      resultDiv.innerHTML = `<span style='font-size:2.6rem; color:${color}; text-shadow:0 0 8px ${color === '#ffd700' ? '#fff7' : color === '#ff3b3b' ? '#ff000055' : '#000a'};'>${result}</span>`;
    }
  }, 80);
}

// --- Tracker inicjatywy ---
function renderInitiativePanel() {
  const el = document.getElementById('initiative');
  el.innerHTML = `
    <h2>Tracker inicjatywy</h2>
    <form id="initiative-form" onsubmit="addInitiative(event)">
      <input id="init-name" placeholder="Imię postaci/NPC" required />
      <input id="init-value" type="number" placeholder="Inicjatywa" required style="width:80px" />
      <button type="submit">Dodaj</button>
    </form>
    <ul id="initiative-list"></ul>
  `;
  window.initiative = [];
  updateInitiativeList();
}
function addInitiative(e) {
  e.preventDefault();
  const name = document.getElementById('init-name').value;
  const value = parseInt(document.getElementById('init-value').value);
  window.initiative.push({name, value});
  window.initiative.sort((a,b)=>b.value-a.value);
  updateInitiativeList();
  e.target.reset();
}
function updateInitiativeList() {
  const ul = document.getElementById('initiative-list');
  if (!ul) return;
  ul.innerHTML = window.initiative.map(i=>`<li><b>${i.name}</b>: ${i.value}</li>`).join('');
}

// --- Lista NPC ---
function renderNpcPanel() {
  const el = document.getElementById('npc');
  el.innerHTML = `
    <h2>Lista NPC</h2>
    <form id="npc-form" onsubmit="addNpc(event)">
      <input id="npc-name" placeholder="Imię NPC" required />
      <input id="npc-desc" placeholder="Opis" />
      <button type="submit">Dodaj</button>
    </form>
    <ul id="npc-list"></ul>
  `;
  window.npcs = [];
  updateNpcList();
}
function addNpc(e) {
  e.preventDefault();
  const name = document.getElementById('npc-name').value;
  const desc = document.getElementById('npc-desc').value;
  window.npcs.push({name, desc});
  updateNpcList();
  e.target.reset();
}
function updateNpcList() {
  const ul = document.getElementById('npc-list');
  if (!ul) return;
  ul.innerHTML = window.npcs.map(n=>`<li><b>${n.name}</b>: ${n.desc}</li>`).join('');
}

// --- Notatnik ---
function renderNotesPanel() {
  const el = document.getElementById('notes');
  el.innerHTML = `
    <h2>Notatnik</h2>
    <textarea id="notes-area" rows="8" style="width:100%"></textarea>
    <div><button onclick="saveNotes()">Zapisz notatki</button></div>
  `;
  document.getElementById('notes-area').value = localStorage.getItem('rpg-notes')||'';
}
function saveNotes() {
  const val = document.getElementById('notes-area').value;
  localStorage.setItem('rpg-notes', val);
  alert('Notatki zapisane!');
}

// --- Panel initialization ---
function initPanels() {
  renderCharacterPanel();
  renderDicePanel();
  renderInitiativePanel();
  renderNpcPanel();
  renderNotesPanel();
  showPanel('character');
}
window.onload = initPanels;
