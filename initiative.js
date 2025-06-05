// Tracker inicjatywy
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
