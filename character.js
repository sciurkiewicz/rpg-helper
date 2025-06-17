// Generator postaci
function renderCharacterPanel() {
  const el = document.getElementById('character');
  el.innerHTML = `
    <h2>Generator postaci</h2>
    <button id="roll-all-stats" type="button" style="min-width:220px; margin-bottom:10px;">Wylosuj wszystkie statystyki (0-10)</button>
    <form id="char-gen-form" style='margin-bottom:10px; display:flex; flex-direction:column; gap:10px; align-items:center; width:100%;' onsubmit="event.preventDefault(); generateCharacter();">
      <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
        <div><label>Siła:<select id='char-sila'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===2?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Zręczność:<select id='char-zrecz'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===5?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Wiedza:<select id='char-wiedza'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===7?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Sprawność:<select id='char-spraw'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===2?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Percepcja:<select id='char-perc'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===5?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Siła Woli:<select id='char-will'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===7?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
        <div><label>Rzemiosło:<select id='char-rzem'>
          ${[...Array(11).keys()].map(i=>`<option value='${i}'${i===5?' selected':''}>${i}</option>`).join('')}
        </select></label></div>
      </div>
      <button type="submit" style="min-width:220px; margin-top:10px;">Wygeneruj postać</button>
    </form>
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
