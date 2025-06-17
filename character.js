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
  // Dodaj obsługę losowania wszystkich statystyk
  document.getElementById('roll-all-stats').onclick = function() {
    const statIds = [
      'char-sila', 'char-zrecz', 'char-wiedza', 'char-spraw', 'char-perc', 'char-will', 'char-rzem'
    ];
    statIds.forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;
      const val = Math.floor(Math.random()*11);
      select.value = val;
    });
  };
}

function generateCharacter() {
  const names = ['Aldar', 'Mira', 'Thorin', 'Lira', 'Grom', 'Elena'];
  const classes = ['Wojownik', 'Mag', 'Łotrzyk', 'Kapłan', 'Łowca'];
  const races = ['Człowiek', 'Elf', 'Krasnolud', 'Ork', 'Gnom'];
  const sila = parseInt(document.getElementById('char-sila').value);
  const zrecz = parseInt(document.getElementById('char-zrecz').value);
  const wiedza = parseInt(document.getElementById('char-wiedza').value);
  const spraw = parseInt(document.getElementById('char-spraw').value);
  const perc = parseInt(document.getElementById('char-perc').value);
  const will = parseInt(document.getElementById('char-will').value);
  const rzem = parseInt(document.getElementById('char-rzem').value);
  const char = {
    name: names[Math.floor(Math.random()*names.length)],
    class: classes[Math.floor(Math.random()*classes.length)],
    race: races[Math.floor(Math.random()*races.length)],
    stats: [sila, zrecz, wiedza, spraw, perc, will, rzem]
  };
  document.getElementById('character-result').innerHTML =
    `<b>Imię:</b> ${char.name}<br><b>Klasa:</b> ${char.class}<br><b>Rasa:</b> ${char.race}<br><b>Statystyki:</b> Siła: ${sila}, Zręczność: ${zrecz}, Wiedza: ${wiedza}, Sprawność: ${spraw}, Percepcja: ${perc}, Siła Woli: ${will}, Rzemiosło: ${rzem}`;
}

function randomizeAllStats() {
  // Lista id dropdownów i ich zakresów (0-10, ale ograniczone do dostępnych opcji)
  const statIds = [
    'char-sila', 'char-zrecz', 'char-wiedza', 'char-spraw', 'char-perc', 'char-will', 'char-rzem'
  ];
  statIds.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    // Zbierz dostępne wartości z dropdowna
    const options = Array.from(select.options).map(opt => parseInt(opt.value));
    // Wylosuj liczbę 0-10
    let val = Math.floor(Math.random()*11);
    // Znajdź najbliższą dostępną wartość
    let closest = options.reduce((prev, curr) => Math.abs(curr-val)<Math.abs(prev-val)?curr:prev);
    select.value = closest;
  });
}
