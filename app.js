// Panel switching logic and feature initialization
function showPanel(panelId) {
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
  });
  const panel = document.getElementById(panelId);
  panel.classList.add('active');
  // Renderuj panel jeśli wymaga dynamicznego ładowania
  if(panelId === 'character' && typeof renderCharacterPanel === 'function') renderCharacterPanel();
  if(panelId === 'dice' && typeof renderDicePanel === 'function') renderDicePanel();
  if(panelId === 'players' && typeof renderPlayersPanel === 'function') renderPlayersPanel();
  if(panelId === 'notes' && typeof renderNotesPanel === 'function') renderNotesPanel();
  if(panelId === 'battlemap' && typeof renderBattleMapPanel === 'function') renderBattleMapPanel();
  if(panelId === 'sound' && typeof renderSoundPanel === 'function') renderSoundPanel();

  const activePanel = document.getElementById(panelId);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Render dynamic content for specific panels
  if (panelId === 'character' && typeof renderCharacterPanel === 'function') renderCharacterPanel();
  if (panelId === 'dice' && typeof renderDicePanel === 'function') renderDicePanel();
  if (panelId === 'npc' && typeof renderNpcPanel === 'function') renderNpcPanel();
  if (panelId === 'notes' && typeof renderNotesPanel === 'function') renderNotesPanel();
  if (panelId === 'battlemap' && typeof renderBattleMapPanel === 'function') renderBattleMapPanel();
  if (panelId === 'sound' && typeof renderSoundPanel === 'function') renderSoundPanel();
}

// --- Panel walki ---
let wallDrawingMode = false;

function renderBattleMapPanel() {
  const el = document.getElementById('battlemap');
  el.innerHTML = `
    <h2>Plansza walki</h2>
    <div id="battlemap-canvas-container" style="display:flex; justify-content:center; margin: 24px 0;">
      <canvas id="battlemap-canvas" width="1000" height="700" style="background:#23262f; border:2px solid #ffd700; border-radius:10px; cursor:grab;"></canvas>
    </div>
    <div style="text-align:center; margin-bottom:12px;">
      <select id="add-player-pin-select" style="min-width:180px;">
        <option value="">Dodaj postać z karty na planszę...</option>
      </select>
      <button onclick="addPlayerPinToBattlemap()" id="add-player-pin-btn" disabled>Dodaj na planszę</button>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:24px; justify-content:center; margin-bottom:10px;">
      <div style="display:flex; flex-direction:column; gap:8px; align-items:center; min-width:180px;">
        <div style="font-weight:bold; color:#ffd700; margin-bottom:2px;">Pionki</div>
        <button onclick="addBattlePin()">Dodaj pionek</button>
        <button onclick="addEnemyPin()">Dodaj przeciwnika</button>
        <button onclick="removeEnemyPin()">Usuń przeciwnika</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; align-items:center; min-width:180px;">
        <div style="font-weight:bold; color:#ffd700; margin-bottom:2px;">Teren</div>
        <button onclick="addRandomRoom()">Losowe pomieszczenie</button>
        <button onclick="addRandomTree()">Losowe drzewo</button>
        <button onclick="generateCity()">Generuj miasto</button>
        <button onclick="generateVillage()">Generuj wioskę</button>
        <button onclick="generateForest()">Generuj las</button>
        <button onclick="saveBattleMap()">Zapisz mapę</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; align-items:center; min-width:180px;">
        <div style="font-weight:bold; color:#ffd700; margin-bottom:2px;">Strzałki i ściany</div>
        <button onclick="clearBattleArrows()">Wyczyść strzałki</button>
        <button onclick="toggleWallDrawing()" id="wall-draw-btn">Rysuj ściany</button>
        <button onclick="clearBattleWalls()">Wyczyść ściany</button>
      </div>
    </div>
    <div style="text-align:center; margin-bottom:8px;">
      <span style="margin-left:16px; color:#aaa;">Przeciągaj pionki myszką, rysuj strzałki trzymając Shift, ściany tryb: Alt</span>
    </div>
  `;
  setupBattleMapCanvas();
  renderPlayerPinSelect();
}

function renderPlayerPinSelect() {
  const select = document.getElementById('add-player-pin-select');
  const btn = document.getElementById('add-player-pin-btn');
  select.innerHTML = '<option value="">Dodaj postać z karty na planszę...</option>';
  if (!window.playerCards || window.playerCards.length === 0) {
    select.disabled = true;
    btn.disabled = true;
    return;
  }
  window.playerCards.forEach((p, i) => {
    select.innerHTML += `<option value="${i}">${p.name} (${p.playerClass}, ${p.race})</option>`;
  });
  select.disabled = false;
  btn.disabled = true;
  select.onchange = function() {
    btn.disabled = !select.value;
  };
}

function addPlayerPinToBattlemap() {
  const select = document.getElementById('add-player-pin-select');
  if (!select || !select.value) return;
  const idx = parseInt(select.value);
  if (isNaN(idx) || !window.playerCards || !window.playerCards[idx]) return;
  const p = window.playerCards[idx];
  const color = '#2196f3';
  window.battlePins = window.battlePins || [];
  // Unikalna etykieta: imię + klasa
  const label = p.name;
  window.battlePins.push({
    x: 60 + Math.random() * 480,
    y: 60 + Math.random() * 280,
    label,
    color
  });
  if(window.redrawBattleMap) window.redrawBattleMap();
}

// --- GENERATORY MAP (przyciski) ---
function generateCity() { generateCityMap(); }
function generateVillage() { generateVillageMap(); }
function generateForest() { generateForestMap(); }

// --- GENERATORY PLANSZ ---
function clearBattleMapAll() {
  window.battlePins = [];
  window.battleArrows = [];
  window.battleWalls = [];
  window.battleTrees = [];
}

function generateCityMap() {
  clearBattleMapAll();
  const canvas = document.getElementById('battlemap-canvas');
  const grid = 40;
  // Siatka ulic: 3 poziome, 4 pionowe
  for(let i=1;i<=3;i++) {
    window.battleWalls.push({x1:grid, y1:i*200, x2:canvas.width-grid, y2:i*200});
  }
  for(let j=1;j<=4;j++) {
    window.battleWalls.push({x1:j*200, y1:grid, x2:j*200, y2:canvas.height-grid});
  }
  // Domy (prostokąty)
  for(let d=0;d<7;d++) {
    const x0 = grid*2 + Math.floor(Math.random()*20)*grid;
    const y0 = grid*2 + Math.floor(Math.random()*13)*grid;
    const w = 2+Math.floor(Math.random()*2);
    const h = 2+Math.floor(Math.random()*2);
    for(let i=0;i<w;i++) {
      window.battleWalls.push({x1:x0+i*grid, y1:y0, x2:x0+(i+1)*grid, y2:y0});
      window.battleWalls.push({x1:x0+i*grid, y1:y0+h*grid, x2:x0+(i+1)*grid, y2:y0+h*grid});
    }
    for(let j=0;j<h;j++) {
      window.battleWalls.push({x1:x0, y1:y0+j*grid, x2:x0, y2:y0+(j+1)*grid});
      window.battleWalls.push({x1:x0+w*grid, y1:y0+j*grid, x2:x0+w*grid, y2:y0+(j+1)*grid});
    }
  }
  // Kilka drzew
  for(let t=0;t<6;t++) {
    const x = grid*2 + Math.floor(Math.random()*22)*grid;
    const y = grid*2 + Math.floor(Math.random()*15)*grid;
    window.battleTrees.push({x, y});
  }
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function generateVillageMap() {
  clearBattleMapAll();
  const canvas = document.getElementById('battlemap-canvas');
  const grid = 40;
  // Domki (małe prostokąty, rozrzucone)
  for(let d=0;d<6;d++) {
    const x0 = grid*2 + Math.floor(Math.random()*22)*grid;
    const y0 = grid*2 + Math.floor(Math.random()*15)*grid;
    const w = 1+Math.floor(Math.random()*2);
    const h = 1+Math.floor(Math.random()*2);
    for(let i=0;i<w;i++) {
      window.battleWalls.push({x1:x0+i*grid, y1:y0, x2:x0+(i+1)*grid, y2:y0});
      window.battleWalls.push({x1:x0+i*grid, y1:y0+h*grid, x2:x0+(i+1)*grid, y2:y0+h*grid});
    }
    for(let j=0;j<h;j++) {
      window.battleWalls.push({x1:x0, y1:y0+j*grid, x2:x0, y2:y0+(j+1)*grid});
      window.battleWalls.push({x1:x0+w*grid, y1:y0+j*grid, x2:x0+w*grid, y2:y0+(j+1)*grid});
    }
  }
  // Dużo drzew
  for(let t=0;t<18;t++) {
    const x = grid*2 + Math.floor(Math.random()*22)*grid;
    const y = grid*2 + Math.floor(Math.random()*15)*grid;
    window.battleTrees.push({x, y});
  }
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function generateForestMap() {
  clearBattleMapAll();
  const canvas = document.getElementById('battlemap-canvas');
  const grid = 40;
  // Bardzo dużo drzew
  for(let t=0;t<40;t++) {
    const x = grid*1 + Math.floor(Math.random()*24)*grid;
    const y = grid*1 + Math.floor(Math.random()*17)*grid;
    window.battleTrees.push({x, y});
  }
  // Kilka "skał" (krótkie ściany)
  for(let s=0;s<6;s++) {
    const x0 = grid*2 + Math.floor(Math.random()*22)*grid;
    const y0 = grid*2 + Math.floor(Math.random()*15)*grid;
    const dir = Math.random()<0.5 ? 'h' : 'v';
    if(dir==='h') {
      window.battleWalls.push({x1:x0, y1:y0, x2:x0+grid*2, y2:y0});
    } else {
      window.battleWalls.push({x1:x0, y1:y0, x2:x0, y2:y0+grid*2});
    }
  }
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function setupBattleMapCanvas() {
  const canvas = document.getElementById('battlemap-canvas');
  const ctx = canvas.getContext('2d');
  window.battlePins = window.battlePins || [];
  window.battleArrows = window.battleArrows || [];
  window.battleWalls = window.battleWalls || [];
  window.battleTrees = window.battleTrees || [];
  let wallDrawingMode = false;
  let drawingWall = false;
  let wallStart = null;
  let dragging = null;
  let offsetX = 0, offsetY = 0;
  let drawingArrow = false;
  let arrowStart = null;
  let drawingWalls = false;

  function snapToGrid(val, grid=40) {
    return Math.round(val/grid)*grid;
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Siatka
    ctx.strokeStyle = '#444';
    for(let x=0;x<canvas.width;x+=40) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke();
    }
    for(let y=0;y<canvas.height;y+=40) {
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke();
    }
    // Kropki na przecięciach siatki
    ctx.save();
    ctx.fillStyle = '#666';
    for(let x=0;x<=canvas.width;x+=40) {
      for(let y=0;y<=canvas.height;y+=40) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 2*Math.PI);
        ctx.fill();
      }
    }
    ctx.restore();
    // Ściany
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 22;
    ctx.globalAlpha = 1.0;
    window.battleWalls.forEach(wall => {
      ctx.beginPath();
      ctx.moveTo(wall.x1, wall.y1);
      ctx.lineTo(wall.x2, wall.y2);
      ctx.stroke();
    });
    ctx.restore();
    // Strzałki
    window.battleArrows.forEach(arr => {
      drawArrow(arr.x1, arr.y1, arr.x2, arr.y2, arr.color);
    });
    // Pionki
    window.battlePins.forEach(pin => {
      ctx.beginPath();
      ctx.arc(pin.x, pin.y, 18, 0, 2*Math.PI);
      ctx.fillStyle = pin.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pin.label, pin.x, pin.y);
    });
    // Drzewa
    window.battleTrees.forEach(tree => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(tree.x, tree.y, 18, 0, 2*Math.PI);
      ctx.fillStyle = '#388e3c';
      ctx.shadowColor = '#222';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });
  }

  function drawArrow(x1, y1, x2, y2, color) {
    ctx.save();
    ctx.strokeStyle = color || '#ffd700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // Grot
    const angle = Math.atan2(y2-y1, x2-x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2-14*Math.cos(angle-Math.PI/7), y2-14*Math.sin(angle-Math.PI/7));
    ctx.lineTo(x2-14*Math.cos(angle+Math.PI/7), y2-14*Math.sin(angle+Math.PI/7));
    ctx.lineTo(x2, y2);
    ctx.fillStyle = color || '#ffd700';
    ctx.fill();
    ctx.restore();
  }

  canvas.onmousedown = function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (wallDrawingMode || e.altKey) {
      drawingWall = true;
      wallStart = {x: snapToGrid(mx), y: snapToGrid(my)};
      return;
    }
    if (e.shiftKey) {
      // Rysowanie strzałki
      drawingArrow = true;
      arrowStart = {x: snapToGrid(mx), y: snapToGrid(my)};
    } else {
      for(let i=window.battlePins.length-1;i>=0;i--) {
        const pin = window.battlePins[i];
        if(Math.hypot(pin.x-mx, pin.y-my)<20) {
          dragging = pin;
          offsetX = mx - pin.x;
          offsetY = my - pin.y;
          canvas.style.cursor = 'grabbing';
          break;
        }
      }
    }
  };
  canvas.onmousemove = function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if(dragging) {
      dragging.x = snapToGrid(mx - offsetX);
      dragging.y = snapToGrid(my - offsetY);
      draw();
    } else if (drawingArrow && arrowStart) {
      draw();
      drawArrow(arrowStart.x, arrowStart.y, snapToGrid(mx), snapToGrid(my), '#ffd700');
    } else if (drawingWall && wallStart) {
      draw();
      ctx.save();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 22;
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(wallStart.x, wallStart.y);
      ctx.lineTo(snapToGrid(mx), snapToGrid(my));
      ctx.stroke();
      ctx.restore();
    }
  };
  canvas.onmouseup = function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (drawingWall && wallStart) {
      window.battleWalls.push({
        x1: wallStart.x,
        y1: wallStart.y,
        x2: snapToGrid(mx),
        y2: snapToGrid(my)
      });
      drawingWall = false;
      wallStart = null;
      draw();
      return;
    }
    if (drawingArrow && arrowStart) {
      window.battleArrows.push({
        x1: arrowStart.x,
        y1: arrowStart.y,
        x2: snapToGrid(mx),
        y2: snapToGrid(my),
        color: '#ffd700'
      });
      drawingArrow = false;
      arrowStart = null;
      draw();
      return;
    }
    dragging = null;
    canvas.style.cursor = 'grab';
  };
  canvas.onmouseleave = function() {
    dragging = null;
    drawingArrow = false;
    arrowStart = null;
    drawingWall = false;
    wallStart = null;
    canvas.style.cursor = 'grab';
    draw();
  };
  draw();
  window.redrawBattleMap = draw;
}

function addBattlePin() {
  const label = prompt('Podaj nazwę pionka:','P');
  if(!label) return;
  const colors = ['#2196f3','#e91e63','#4caf50','#ff9800','#ffd700','#9c27b0'];
  const color = colors[Math.floor(Math.random()*colors.length)];
  window.battlePins = window.battlePins || [];
  window.battlePins.push({x:60+Math.random()*480, y:60+Math.random()*280, label, color});
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function addEnemyPin() {
  window.battlePins = window.battlePins || [];
  // Znajdź najwyższy numer przeciwnika
  let maxNum = 0;
  window.battlePins.forEach(pin => {
    const match = /^Przeciwnik (\d+)$/.exec(pin.label);
    if(match) maxNum = Math.max(maxNum, parseInt(match[1]));
  });
  const label = `Przeciwnik ${maxNum+1}`;
  const color = '#e91e63'; // czerwony lub inny wyróżniający
  window.battlePins.push({x:60+Math.random()*480, y:60+Math.random()*280, label, color});
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function removeEnemyPin() {
  window.battlePins = window.battlePins || [];
  // Usuwa ostatniego przeciwnika (Przeciwnik N)
  for(let i=window.battlePins.length-1;i>=0;i--) {
    if(/^Przeciwnik \d+$/.test(window.battlePins[i].label)) {
      window.battlePins.splice(i,1);
      if(window.redrawBattleMap) window.redrawBattleMap();
      return;
    }
  }
  alert('Brak przeciwników do usunięcia!');
}

function clearBattleArrows() {
  window.battleArrows = [];
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function clearBattleWalls() {
  window.battleWalls = [];
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function toggleWallDrawing() {
  wallDrawingMode = !wallDrawingMode;
  document.getElementById('wall-draw-btn').style.background = wallDrawingMode ? '#ffd700' : '';
}

function addRandomRoom() {
  // Losowy prostokąt na gridzie
  const canvas = document.getElementById('battlemap-canvas');
  const grid = 40;
  const minW = 3, maxW = 8, minH = 3, maxH = 8;
  const w = Math.floor(Math.random()*(maxW-minW+1))+minW;
  const h = Math.floor(Math.random()*(maxH-minH+1))+minH;
  const maxX = Math.floor(canvas.width/grid)-w-1;
  const maxY = Math.floor(canvas.height/grid)-h-1;
  const x0 = grid * (1 + Math.floor(Math.random() * maxX));
  const y0 = grid * (1 + Math.floor(Math.random() * maxY));
  // Dodaj ściany wokół prostokąta
  window.battleWalls = window.battleWalls || [];
  for(let i=0;i<w;i++) {
    window.battleWalls.push({x1:x0+i*grid, y1:y0, x2:x0+(i+1)*grid, y2:y0}); // góra
    window.battleWalls.push({x1:x0+i*grid, y1:y0+h*grid, x2:x0+(i+1)*grid, y2:y0+h*grid}); // dół
  }
  for(let j=0;j<h;j++) {
    window.battleWalls.push({x1:x0, y1:y0+j*grid, x2:x0, y2:y0+(j+1)*grid}); // lewo
    window.battleWalls.push({x1:x0+w*grid, y1:y0+j*grid, x2:x0+w*grid, y2:y0+(j+1)*grid}); // prawo
  }
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function addRandomTree() {
  // Losowe drzewo na gridzie
  const canvas = document.getElementById('battlemap-canvas');
  const grid = 40;
  const maxX = Math.floor(canvas.width/grid)-2;
  const maxY = Math.floor(canvas.height/grid)-2;
  const x = grid * (1 + Math.floor(Math.random() * maxX));
  const y = grid * (1 + Math.floor(Math.random() * maxY));
  window.battleTrees = window.battleTrees || [];
  window.battleTrees.push({x, y});
  if(window.redrawBattleMap) window.redrawBattleMap();
}

function saveBattleMap() {
  const data = {
    pins: window.battlePins || [],
    arrows: window.battleArrows || [],
    walls: window.battleWalls || [],
    trees: window.battleTrees || []
  };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'battlemap.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Po załadowaniu strony pokaż domyślny panel
window.addEventListener('DOMContentLoaded', function() {
  showPanel('character');
  // Renderuj domyślny panel po starcie
  if (typeof renderCharacterPanel === 'function') renderCharacterPanel();
});
