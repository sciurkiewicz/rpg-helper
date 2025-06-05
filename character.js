// Generator postaci
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
