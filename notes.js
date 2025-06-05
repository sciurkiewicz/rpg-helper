// Notatnik
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
