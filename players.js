// Karty postaci graczy
function renderPlayersPanel() {
  const el = document.getElementById('players');
  if (!window.playerCards) window.playerCards = [];
  el.innerHTML = `
    <h2>Karty postaci graczy</h2>
    <form id="player-form" onsubmit="addPlayerCard(event)">
      <input id="player-name" placeholder="Imię gracza" required />
      <input id="player-class" placeholder="Klasa" required />
      <input id="player-race" placeholder="Rasa" required />
      <input id="player-spraw" type="number" placeholder="Sprawność" required style="width:90px" />
      <input id="player-perc" type="number" placeholder="Percepcja" required style="width:90px" />
      <input id="player-will" type="number" placeholder="Siła Woli" required style="width:90px" />
      <input id="player-zr" type="number" placeholder="Zręczność" required style="width:90px" />
      <input id="player-rzem" type="number" placeholder="Rzemiosło" required style="width:90px" />
      <input id="player-wiedza" type="number" placeholder="Wiedza" required style="width:90px" />
      <input id="player-kp" type="number" placeholder="KP" required style="width:70px" />
      <input id="player-desc" placeholder="Krótki opis" style="width:220px" />
      <button type="submit">Dodaj kartę</button>
    </form>
    <div id="player-cards-list" style="display:flex; flex-wrap:wrap; gap:18px; margin-top:18px;"></div>
  `;
  updatePlayerCardsList();
  if (typeof renderPlayerPinSelect === 'function') renderPlayerPinSelect();
}

function addPlayerCard(e) {
  e.preventDefault();
  const name = document.getElementById('player-name').value;
  const playerClass = document.getElementById('player-class').value;
  const race = document.getElementById('player-race').value;
  const spraw = parseInt(document.getElementById('player-spraw').value);
  const perc = parseInt(document.getElementById('player-perc').value);
  const will = parseInt(document.getElementById('player-will').value);
  const zr = parseInt(document.getElementById('player-zr').value);
  const rzem = parseInt(document.getElementById('player-rzem').value);
  const wiedza = parseInt(document.getElementById('player-wiedza').value);
  const kp = parseInt(document.getElementById('player-kp').value);
  const desc = document.getElementById('player-desc').value;
  window.playerCards.push({name, playerClass, race, spraw, perc, will, zr, rzem, wiedza, kp, desc});
  updatePlayerCardsList();
  e.target.reset();
}

function updatePlayerCardsList() {
  const list = document.getElementById('player-cards-list');
  if (!list) return;
  list.innerHTML = window.playerCards.map((p,i)=>
    p._editMode ? `
    <form onsubmit="saveEditPlayerCard(event,${i})" style='background:#23262f; border:2px solid #ffd700; border-radius:10px; padding:18px; min-width:240px; min-height:140px; display:flex; flex-direction:column; align-items:flex-start; position:relative;'>
      <input name='name' value="${p.name}" placeholder="Imię" required style='margin-bottom:4px;'/>
      <input name='playerClass' value="${p.playerClass}" placeholder="Klasa" required style='margin-bottom:4px;'/>
      <input name='race' value="${p.race}" placeholder="Rasa" required style='margin-bottom:4px;'/>
      <div style='display:grid; grid-template-columns:repeat(3,auto); gap:4px 12px; margin-bottom:4px;'>
        <input name='spraw' type='number' value="${p.spraw}" placeholder="Sprawność" required style='width:70px;'/>
        <input name='perc' type='number' value="${p.perc}" placeholder="Percepcja" required style='width:70px;'/>
        <input name='will' type='number' value="${p.will}" placeholder="Siła Woli" required style='width:70px;'/>
        <input name='zr' type='number' value="${p.zr}" placeholder="Zręczność" required style='width:70px;'/>
        <input name='rzem' type='number' value="${p.rzem}" placeholder="Rzemiosło" required style='width:70px;'/>
        <input name='wiedza' type='number' value="${p.wiedza}" placeholder="Wiedza" required style='width:70px;'/>
      </div>
      <div style='margin-bottom:4px;'><b>KP:</b> <input name='kp' type='number' value="${p.kp}" min='0' style='width:60px; font-size:1.1rem; padding:2px 6px;'/></div>
      <textarea name='desc' placeholder='Opis' style='width:100%; min-height:32px;'>${p.desc||''}</textarea>
      <div style='margin-top:8px; display:flex; gap:8px;'>
        <button type='submit'>Zapisz</button>
        <button type='button' onclick='cancelEditPlayerCard(${i})'>Anuluj</button>
      </div>
    </form>
    ` : `
    <div style="background:#23262f; border:2px solid #ffd700; border-radius:10px; padding:18px; min-width:240px; min-height:140px; display:flex; flex-direction:column; align-items:flex-start; position:relative;">
      <div style='font-size:1.2rem; font-weight:bold;'>${p.name}</div>
      <div><b>Klasa:</b> ${p.playerClass} <b>Rasa:</b> ${p.race}</div>
      <div style='margin:4px 0 2px 0;'><b>Statystyki:</b></div>
      <div style='display:grid; grid-template-columns:repeat(3,auto); gap:4px 12px; margin-bottom:2px;'>
        <span>Sprawność: <b>${p.spraw}</b></span>
        <span>Percepcja: <b>${p.perc}</b></span>
        <span>Siła Woli: <b>${p.will}</b></span>
        <span>Zręczność: <b>${p.zr}</b></span>
        <span>Rzemiosło: <b>${p.rzem}</b></span>
        <span>Wiedza: <b>${p.wiedza}</b></span>
      </div>
      <div style='margin-bottom:2px;'><b>KP:</b> <input type='number' value='${p.kp}' min='0' style='width:60px; font-size:1.1rem; padding:2px 6px;' onchange='updatePlayerKP(${i}, this.value)' /></div>
      <div style='font-size:0.98rem; color:#ccc; margin-bottom:2px;'><b>Opis:</b> ${p.desc||''}</div>
      <button onclick="editPlayerCard(${i})" style="position:absolute; top:8px; right:38px; font-size:1.1rem; padding:2px 10px;">✎</button>
      <button onclick="removePlayerCard(${i})" style="position:absolute; top:8px; right:8px; font-size:1.1rem; padding:2px 10px;">✕</button>
    </div>
  `).join('');
}

function editPlayerCard(idx) {
  window.playerCards[idx]._editMode = true;
  updatePlayerCardsList();
}

function cancelEditPlayerCard(idx) {
  delete window.playerCards[idx]._editMode;
  updatePlayerCardsList();
}

function saveEditPlayerCard(e, idx) {
  e.preventDefault();
  const f = e.target;
  window.playerCards[idx] = {
    name: f.name.value,
    playerClass: f.playerClass.value,
    race: f.race.value,
    spraw: parseInt(f.spraw.value)||0,
    perc: parseInt(f.perc.value)||0,
    will: parseInt(f.will.value)||0,
    zr: parseInt(f.zr.value)||0,
    rzem: parseInt(f.rzem.value)||0,
    wiedza: parseInt(f.wiedza.value)||0,
    kp: parseInt(f.kp.value)||0,
    desc: f.desc.value
  };
  updatePlayerCardsList();
  if (typeof renderPlayerPinSelect === 'function') renderPlayerPinSelect();
}

function updatePlayerKP(idx, val) {
  window.playerCards[idx].kp = parseInt(val)||0;
}

function removePlayerCard(idx) {
  window.playerCards.splice(idx,1);
  updatePlayerCardsList();
}
