// Generator postaci
function renderCharacterPanel() {
  const el = document.getElementById('character');
  el.innerHTML = `
    <h2>Generator postaci</h2>
    <button id="generate-character" style="margin-bottom: 10px;">Generuj losową postać</button>
    <div id="character-output" style="margin-top: 20px;"></div>
  `;

  const maleNames = ["Jan", "Marek", "Piotr", "Tomasz", "Krzysztof", "Andrzej", "Paweł", "Adam", "Grzegorz", "Łukasz"];
  const femaleNames = ["Anna", "Katarzyna", "Zofia", "Maria", "Ewa", "Magdalena", "Agnieszka", "Joanna", "Barbara", "Monika"];
  const appearances = ["wysoki", "gruby", "szczupły", "niski", "umięśniony", "z długimi włosami", "łysy", "z blizną na twarzy", "o niebieskich oczach", "z brodą"];
  const personalities = ["odważny", "wesoły", "spokojny", "nerwowy", "ambitny", "życzliwy", "złośliwy", "inteligentny", "leniwy", "pracowity", "tajemniczy", "roztrzepany", "pewny siebie", "skromny", "arogancki"];
  const descriptions = [
    "Jest rycerzem z małej wioski.",
    "Uwielbia podróże i przygody.",
    "Jest znany z pomocy innym.",
    "Marzy o zostaniu wielkim magiem.",
    "Jest samotnikiem, który unika tłumów.",
    "Pracuje jako kowal w dużym mieście.",
    "Jest bardem, który śpiewa pieśni o dawnych bohaterach.",
    "Jest łowcą, który spędza większość czasu w lesie.",
    "Jest alchemikiem, który eksperymentuje z różnymi miksturami.",
    "Jest kupcem, który podróżuje między miastami, sprzedając swoje towary."
  ];

  document.getElementById('generate-character').addEventListener('click', () => {
    const gender = Math.random() < 0.5 ? "mężczyzna" : "kobieta";
    const name = gender === "mężczyzna" 
      ? maleNames[Math.floor(Math.random() * maleNames.length)] 
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const appearance = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => appearances[Math.floor(Math.random() * appearances.length)]).join(", ");
    const personality = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => personalities[Math.floor(Math.random() * personalities.length)]).join(", ");
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    const output = `
      <h3>Wygenerowana postać:</h3>
      <p><strong>Imię i płeć:</strong> ${name}, ${gender}</p>
      <p><strong>Cechy wyglądu:</strong> ${appearance}</p>
      <p><strong>Cechy charakteru:</strong> ${personality}</p>
      <p><strong>Krótki opis:</strong> ${description}</p>
    `;

    document.getElementById('character-output').innerHTML = output;
  });
}
