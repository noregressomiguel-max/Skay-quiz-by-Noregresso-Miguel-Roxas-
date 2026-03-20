const grid = document.getElementById('levels-grid');

// Génère la grille de 500 niveaux
for (let i = 1; i <= 500; i++) {
    const box = document.createElement('div');
    box.className = 'lvl-box' + (i === 1 ? ' active' : '');
    box.innerText = i;
    if (i > 10) box.innerText = "..."; // Pour l'effet visuel de la photo
    if (i === 11) box.innerText = "500";
    if (i > 11) box.style.display = "none";
    grid.appendChild(box);
}

function startCurrentLevel() {
    alert("Lancement du Quiz !");
    // Ici on ajoute la logique de questions que je t'ai donnée avant
}
