// Lista NPC
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
