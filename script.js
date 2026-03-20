 // Base de données de test (Niveaux 1 et 2)
const levelsData = [
    {
        level: 1,
        questions: [
            { q: "Quelle est la capitale de la France ?", r: ["Lyon", "Paris", "Marseille", "Lille"], correct: 1 },
            { q: "Combien font 2 + 2 ?", r: ["3", "4", "5", "6"], correct: 1 },
            { q: "Couleur du cheval blanc d'Henri IV ?", r: ["Noir", "Blanc", "Gris", "Marron"], correct: 1 },
            { q: "L'inverse de 'Haut' ?", r: ["Gauche", "Bas", "Droite", "Milieu"], correct: 1 },
            { q: "Cri du chat ?", r: ["Aboiement", "Miaulement", "Rugissement", "Bêlement"], correct: 1 }
        ]
    },
    {
        level: 2,
        questions: [
            { q: "Planète rouge ?", r: ["Vénus", "Mars", "Jupiter", "Saturne"], correct: 1 },
            { q: "Roi de la jungle ?", r: ["Tigre", "Lion", "Éléphant", "Girafe"], correct: 1 },
            { q: "Nombre de continents ?", r: ["5", "6", "7", "8"], correct: 2 },
            { q: "Métal précieux ?", r: ["Fer", "Or", "Plomb", "Cuivre"], correct: 1 },
            { q: "Capitale de l'Espagne ?", r: ["Madrid", "Barcelone", "Séville", "Valence"], correct: 0 }
        ]
    }
];

let currentLevelIdx = 0;
let currentQuestionIdx = 0;
let score = 0;

// On récupère les éléments du Dashboard
const dashboard = document.querySelector('.stats-card').parentElement;
const quizOverlay = document.getElementById('quiz-overlay');
const questionText = document.getElementById('q-text');
const optionsContainer = document.getElementById('options');

// Fonction pour lancer un niveau
function startCurrentLevel() {
    currentQuestionIdx = 0;
    score = 0;
    quizOverlay.classList.remove('hidden'); // On affiche la zone de jeu
    loadQuestion();
}

function loadQuestion() {
    const level = levelsData[currentLevelIdx];
    const qData = level.questions[currentQuestionIdx];

    questionText.innerText = qData.q;
    optionsContainer.innerHTML = "";

    // On crée les 5 boutons (ou 4 selon tes données)
    qData.r.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.style.width = "100%";
        btn.style.marginBottom = "10px";
        btn.style.padding = "15px";
        btn.style.borderRadius = "10px";
        btn.style.border = "none";
        btn.style.background = "#334155";
        btn.style.color = "white";
        btn.style.cursor = "pointer";

        // ACTION AU CLIC
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(choiceIdx) {
    const correctIdx = levelsData[currentLevelIdx].questions[currentQuestionIdx].correct;
    
    if (choiceIdx === correctIdx) {
        score++;
    }

    currentQuestionIdx++;

    if (currentQuestionIdx < 5) {
        loadQuestion(); // Question suivante
    } else {
        finishLevel(); // Fin du niveau
    }
}

function finishLevel() {
    quizOverlay.classList.add('hidden');
    
    if (score >= 4) {
        alert("Bravo ! Niveau " + (currentLevelIdx + 1) + " réussi avec " + score + "/5 !");
        currentLevelIdx++; // On passe au niveau suivant
        updateDashboard();
    } else {
        alert("Échec ! Tu as fait " + score + "/5. Il faut au moins 4 bonnes réponses. Réessaie !");
    }
}

function updateDashboard() {
    document.getElementById('stat-level').innerText = currentLevelIdx + 1;
    document.getElementById('btn-lvl-num').innerText = currentLevelIdx + 1;
    let progress = Math.round((currentLevelIdx / 500) * 100);
    document.getElementById('progression').innerText = progress + "%";
    document.querySelector('.progress-fill').style.width = progress + "%";
    document.querySelector('.progress-text').innerText = currentLevelIdx + " / 500 niveaux complétés";
}

// Initialisation de la grille de niveaux au chargement
window.onload = () => {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = ""; // On vide la grille au cas où
    for (let i = 1; i <= 10; i++) {
        const box = document.createElement('div');
        box.className = 'lvl-box' + (i === 1 ? ' active' : '');
        box.innerText = i;
        grid.appendChild(box);
    }
    // Petit ajout visuel pour le "..."
    const dots = document.createElement('div');
    dots.className = 'lvl-box';
    dots.innerText = "...500";
    grid.appendChild(dots);
};
// 1. Tes questions personnalisées (ajoute-en ici quand tu veux)
const manualLevels = [
    {
        level: 1,
        questions: [
            { q: "Capitale de la France ?", r: ["Lyon", "Paris", "Marseille", "Lille", "Nice"], correct: 1 },
            { q: "2 + 2 ?", r: ["3", "4", "5", "6", "22"], correct: 1 },
            { q: "Couleur du ciel ?", r: ["Vert", "Bleu", "Rouge", "Jaune", "Noir"], correct: 1 },
            { q: "L'inverse de Haut ?", r: ["Gauche", "Bas", "Droite", "Devant", "Derrière"], correct: 1 },
            { q: "Animal qui fait 'Miau' ?", r: ["Chien", "Chat", "Vache", "Lion", "Oiseau"], correct: 1 }
        ]
    }
];

// 2. GÉNÉRATEUR AUTOMATIQUE (Pour atteindre les 500 niveaux sans effort)
function generateLevel(levelNum) {
    // Si le niveau est déjà écrit manuellement, on le prend
    const manual = manualLevels.find(l => l.level === levelNum);
    if (manual) return manual;

    // Sinon, on génère un niveau mathématique/logique de plus en plus dur
    let questions = [];
    for (let i = 0; i < 5; i++) {
        let a = Math.floor(Math.random() * (levelNum + 10));
        let b = Math.floor(Math.random() * (levelNum + 5));
        let res = a + b;
        questions.push({
            q: `Calcul de niveau ${levelNum} : Combien font ${a} + ${b} ?`,
            r: [res - 2, res, res + 3, res + 1, res + 10],
            correct: 1
        });
    }
    return { level: levelNum, questions: questions };
}

// 3. LOGIQUE DU JEU
let currentLevelIdx = 1;
let currentQuestionIdx = 0;
let score = 0;
let currentLevelData = generateLevel(1);

function startCurrentLevel() {
    currentQuestionIdx = 0;
    score = 0;
    currentLevelData = generateLevel(currentLevelIdx);
    document.getElementById('quiz-overlay').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const qData = currentLevelData.questions[currentQuestionIdx];
    document.getElementById('q-text').innerText = qData.q;
    const container = document.getElementById('options');
    container.innerHTML = "";

    qData.r.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.className = "quiz-button"; // Assure-toi d'avoir ce style en CSS
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
}

function checkAnswer(idx) {
    if (idx === currentLevelData.questions[currentQuestionIdx].correct) score++;
    currentQuestionIdx++;

    if (currentQuestionIdx < 5) {
        loadQuestion();
    } else {
        finishLevel();
    }
}

function finishLevel() {
    document.getElementById('quiz-overlay').classList.add('hidden');
    if (score >= 4) {
        alert(`NIVEAU ${currentLevelIdx} RÉUSSI !`);
        currentLevelIdx++;
        updateDashboard();
    } else {
        alert(`ÉCHEC (${score}/5). Réessaie le niveau ${currentLevelIdx}.`);
    }
}

function updateDashboard() {
    document.getElementById('stat-level').innerText = currentLevelIdx;
    document.getElementById('btn-lvl-num').innerText = currentLevelIdx;
    let progress = (currentLevelIdx / 500) * 100;
    document.getElementById('progression').innerText = Math.round(progress) + "%";
    document.querySelector('.progress-fill').style.width = progress + "%";
    document.querySelector('.progress-text').innerText = `${currentLevelIdx - 1} / 500 niveaux complétés`;
}

// Lancement de la grille au départ
window.onload = () => {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
        const box = document.createElement('div');
        box.className = 'lvl-box' + (i === 1 ? ' active' : '');
        box.innerText = i;
        grid.appendChild(box);
    }
};
