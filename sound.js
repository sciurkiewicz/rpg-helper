// Create a global audio player to persist across tab changes
if (!window.globalAudioPlayer) {
  window.globalAudioPlayer = document.createElement('audio');
  window.globalAudioPlayer.id = 'ambient-audio';
  window.globalAudioPlayer.controls = true;
  window.globalAudioPlayer.loop = true; // Ensure continuous playback
  window.globalAudioPlayer.style.width = '100%';
  const source = document.createElement('source');
  source.src = 'https://cdn.freesound.org/previews/628/628226_3625175-lq.mp3';
  source.type = 'audio/mpeg';
  window.globalAudioPlayer.appendChild(source);
}

function renderSoundPanel() {
  const el = document.getElementById('sound');
  el.innerHTML = `
    <h2>Dźwięki i ambient</h2>
    <button id="play-ambient" style="margin-bottom: 10px;">Play Ambient</button>
    <p>Muzyka odtwarzana w tle po kliknięciu przycisku.</p>
  `;

  // Append the global audio player if not already in the DOM
  if (!document.getElementById('ambient-audio')) {
    el.appendChild(window.globalAudioPlayer);
  }

  // Add event listener to the play button
  const playButton = document.getElementById('play-ambient');
  playButton.addEventListener('click', () => {
    window.globalAudioPlayer.play();
  });
}
