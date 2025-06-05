// Panel dźwięków i ambientów
function renderSoundPanel() {
  const el = document.getElementById('sound');
  el.innerHTML = `
    <h2>Dźwięki i ambient</h2>
    <div style="display:flex; flex-wrap:wrap; gap:18px; margin-bottom:18px;">
      <button onclick="playAmbient('rain')">Deszcz</button>
      <button onclick="playAmbient('city')">Szum miasta</button>
      <button onclick="playAmbient('forest')">Las</button>
      <button onclick="playAmbient('fire')">Ognisko</button>
      <button onclick="playAmbient('tavern')">Karczma</button>
      <button onclick="stopAmbient()">Stop</button>
    </div>
    <audio id="ambient-audio" loop style="width:100%"></audio>
  `;
}

function playAmbient(type) {
  const audio = document.getElementById('ambient-audio');
  let src = '';
  if(type==='rain') src = 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7e2.mp3';
  if(type==='city') src = 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b1b2e2.mp3';
  if(type==='forest') src = 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b1b1b1b.mp3';
  if(type==='fire') src = 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b1b1b1b.mp3';
  if(type==='tavern') src = 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b1b2e2.mp3';
  audio.src = src;
  audio.volume = 0.5;
  audio.play();
}
function stopAmbient() {
  const audio = document.getElementById('ambient-audio');
  audio.pause();
  audio.currentTime = 0;
}
