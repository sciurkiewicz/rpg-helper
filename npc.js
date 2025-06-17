let npcList = JSON.parse(localStorage.getItem('npcList')) || [];

function renderNpcPanel() {
  const el = document.getElementById('npc');
  el.innerHTML = `
    <h2>Lista NPC</h2>
    <form id="npc-form" style="margin-bottom: 10px;">
      <input type="text" id="npc-name" placeholder="Imię NPC" required />
      <button type="button" id="add-npc">Dodaj NPC</button>
    </form>
    <ul id="npc-list">
      ${npcList.map(npc => `<li>${npc}</li>`).join('')}
    </ul>
  `;

  document.getElementById('add-npc').addEventListener('click', () => {
    const npcName = document.getElementById('npc-name').value.trim();
    if (npcName) {
      npcList.push(npcName);
      localStorage.setItem('npcList', JSON.stringify(npcList));
      renderNpcPanel();
    }
  });
}
