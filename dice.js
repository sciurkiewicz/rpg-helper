// Kostka do gry
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
