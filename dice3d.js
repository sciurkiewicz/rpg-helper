// Minimal Three.js loader for dice 3D animation
// This script loads Three.js from CDN and provides a function to render a 3D dice roll

function loadThreeJs(callback) {
  if (window.THREE) return callback();
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

function show3DDiceResult(sides, result) {
  loadThreeJs(() => {
    let container = document.getElementById('dice-3d-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dice-3d-container';
      container.style.width = '120px';
      container.style.height = '120px';
      container.style.margin = '0 auto';
      document.getElementById('dice-result').appendChild(container);
    } else {
      container.innerHTML = '';
    }
    const width = 120, height = 120;
    // D100: animacja dwóch d10
    if (sides === 100) {
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      container.innerHTML = '';
      // dziesiątki
      const tens = Math.floor(result / 10) * 10;
      const ones = result % 10;
      const d10A = document.createElement('div');
      d10A.style.width = '56px';
      d10A.style.height = '120px';
      d10A.style.display = 'inline-block';
      d10A.style.verticalAlign = 'middle';
      d10A.id = 'd10-tens';
      container.appendChild(d10A);
      const d10B = document.createElement('div');
      d10B.style.width = '56px';
      d10B.style.height = '120px';
      d10B.style.display = 'inline-block';
      d10B.style.verticalAlign = 'middle';
      d10B.id = 'd10-ones';
      container.appendChild(d10B);
      // Renderuj dwie d10
      renderD10Three(d10A, tens === 0 ? 100 : tens, true);
      renderD10Three(d10B, ones === 0 ? 10 : ones, false);
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setClearColor(0x000000, 0); // przezroczyste tło
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1,1,2);
    scene.add(light);
    // Dice geometry
    let geometry, material, mesh;
    let diceColor = 0x2196f3; // niebieski
    function makeTextTexture(text, color) {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,size,size);
      ctx.fillStyle = color || '#fff';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 6;
      ctx.strokeText(text, size/2, size/2);
      ctx.fillText(text, size/2, size/2);
      return new THREE.CanvasTexture(canvas);
    }
    if (sides === 4) {
      geometry = new THREE.TetrahedronGeometry(1);
      // 4 ścianki, na każdej tekstura z wynikiem (1-4)
      material = [1,2,3,4].map(i=>new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i, '#fff'),shininess:80}));
      mesh = new THREE.Mesh(geometry, material);
      // Ustaw wynik na górze
      mesh.rotation.x = Math.PI/6;
      mesh.rotation.y = Math.PI/4 + (result-1)*Math.PI/2;
    } else if (sides === 6) {
      geometry = new THREE.BoxGeometry(1,1,1);
      material = [1,2,3,4,5,6].map(i=>new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i, '#fff'),shininess:80}));
      mesh = new THREE.Mesh(geometry, material);
      // Ustaw wynik na górze
      mesh.rotation.x = Math.PI/4;
      mesh.rotation.y = Math.PI/4 + (result-1)*Math.PI/3;
    } else if (sides === 8) {
      geometry = new THREE.OctahedronGeometry(1);
      material = [1,2,3,4,5,6,7,8].map(i=>new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i, '#fff'),shininess:80}));
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/4;
      mesh.rotation.y = Math.PI/4 + (result-1)*Math.PI/4;
    } else if (sides === 10) {
      geometry = new THREE.CylinderGeometry(1,1,0.5,10);
      material = [];
      for(let i=1;i<=10;i++) material.push(new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i, '#fff'),shininess:80}));
      // top/bottom
      material.push(new THREE.MeshPhongMaterial({color:diceColor}));
      material.push(new THREE.MeshPhongMaterial({color:diceColor}));
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/2;
      mesh.rotation.z = ((result-1)*2*Math.PI/10);
    } else if (sides === 12) {
      geometry = new THREE.DodecahedronGeometry(1);
      material = Array.from({length:12},(_,i)=>new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i+1, '#fff'),shininess:80}));
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/4;
      mesh.rotation.y = Math.PI/4 + (result-1)*Math.PI/6;
    } else if (sides === 20) {
      geometry = new THREE.IcosahedronGeometry(1);
      material = Array.from({length:20},(_,i)=>new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i+1, '#fff'),shininess:80}));
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/4;
      mesh.rotation.y = Math.PI/4 + (result-1)*Math.PI/10;
    } else {
      geometry = new THREE.CylinderGeometry(1,1,0.5,sides);
      material = [];
      for(let i=1;i<=sides;i++) material.push(new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(i, '#fff'),shininess:80}));
      material.push(new THREE.MeshPhongMaterial({color:diceColor}));
      material.push(new THREE.MeshPhongMaterial({color:diceColor}));
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI/2;
      mesh.rotation.z = ((result-1)*2*Math.PI/sides);
    }
    scene.add(mesh);
    camera.position.z = 3;
    // Animation: rotate and stop
    let frame = 0;
    function animate() {
      if (frame < 30) {
        mesh.rotation.x += 0.25;
        mesh.rotation.y += 0.22;
        renderer.render(scene, camera);
        frame++;
        requestAnimationFrame(animate);
      } else {
        renderer.render(scene, camera);
      }
    }
    animate();
  });
}

// Helper do d10
function renderD10Three(dom, value, isTens) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 56/120, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(56, 120);
  dom.appendChild(renderer.domElement);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1,1,2);
  scene.add(light);
  // d10 geometry
  const geometry = new THREE.CylinderGeometry(1,1,0.5,10);
  const diceColor = 0x2196f3;
  function makeTextTexture(text, color) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,size,size);
    ctx.fillStyle = color || '#fff';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.strokeText(text, size/2, size/2);
    ctx.fillText(text, size/2, size/2);
    return new THREE.CanvasTexture(canvas);
  }
  let material = [];
  for(let i=1;i<=10;i++) {
    let label = isTens ? (i*10)%100 : i;
    if(label === 0) label = isTens ? 100 : 10;
    material.push(new THREE.MeshPhongMaterial({color:diceColor,map:makeTextTexture(label, '#fff'),shininess:80}));
  }
  material.push(new THREE.MeshPhongMaterial({color:diceColor}));
  material.push(new THREE.MeshPhongMaterial({color:diceColor}));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI/2;
  mesh.rotation.z = ((value-1)*2*Math.PI/10);
  scene.add(mesh);
  camera.position.z = 3;
  let frame = 0;
  function animate() {
    if (frame < 30) {
      mesh.rotation.x += 0.25;
      mesh.rotation.y += 0.22;
      renderer.render(scene, camera);
      frame++;
      requestAnimationFrame(animate);
    } else {
      renderer.render(scene, camera);
    }
  }
  animate();
}
