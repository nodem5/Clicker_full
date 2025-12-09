let score = 0;
let autoScore = 0;
let upgradeCost = 10;
let clickValue = 1;
let clickUpgradeCost = 5;
let doubleClickUpgradeCost = 50;

let autoCollectorIntervals = []; // Store intervals for auto collectors

const clickSound = new Audio('click.wav');
const upgradeSound = new Audio('upgrade.wav');

let collectors = [
    { interval: 5000, points: 10, cost: 50, level: 1, unlocked: false, working: false },
    { interval: 10000, points: 20, cost: 100, level: 1, unlocked: false, working: false },
    { interval: 30000, points: 50, cost: 300, level: 1, unlocked: false, working: false },
    { interval: 60000, points: 100, cost: 500, level: 1, unlocked: false, working: false }
];

const collectorSounds = [
    new Audio('collector1.mp3'),
    new Audio('collector2.mp3'),
    new Audio('collector3.mp3'),
    new Audio('collector4.mp3')
];

const upgradeSounds = [
    new Audio('upgrade1.mp3'),
    new Audio('upgrade2.mp3'),
    new Audio('upgrade3.mp3'),
    new Audio('upgrade4.mp3')
];

const translations = {
    en: {
        clickMe: "Click Me!",
        upgrades: "Upgrades",
        resetGame: "Reset Game",
        collectors: "Collectors",
        darkMode: "Dark Mode",
    },
    pl: {
        clickMe: "Kliknij mnie!",
        upgrades: "Ulepszenia",
        resetGame: "Resetuj grę",
        collectors: "Zbieracze",
        darkMode: "Tryb Ciemny",
    },
};

function setLanguage(lang) {
    document.getElementById("clicker").textContent = translations[lang].clickMe;
    document.getElementById("reset").textContent = translations[lang].resetGame;
    document.querySelector("h2").textContent = translations[lang].collectors;
    document.getElementById("dark-mode-toggle").textContent = translations[lang].darkMode;
}

document.getElementById("clicker").addEventListener("click", () => {
    score += clickValue;
    clickSound.play(); // Odtwarzanie dźwięku kliknięcia
    updateScore();
});

function buyUpgrade() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        autoScore++;
        upgradeCost = Math.ceil(upgradeCost * 1.5);
        upgradeSound.play(); // Odtwarzanie dźwięku ulepszenia
        updateScore();
    }
}

function buyClickUpgrade() {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        clickValue++;
        clickUpgradeCost = Math.ceil(clickUpgradeCost * 1.5);
        upgradeSound.play(); // Odtwarzanie dźwięku ulepszenia
        updateScore();
    }
}

function buyDoubleClickUpgrade() {
    if (score >= doubleClickUpgradeCost) {
        score -= doubleClickUpgradeCost;
        clickValue *= 2;
        doubleClickUpgradeCost = Math.ceil(doubleClickUpgradeCost * 2);
        upgradeSound.play(); // Odtwarzanie dźwięku ulepszenia
        updateScore();
    }
}

function resetGame() {
    // Reset core game variables
    score = 0;
    autoScore = 0;
    upgradeCost = 10;
    clickValue = 1;
    clickUpgradeCost = 5;
    doubleClickUpgradeCost = 50;

    // Reset collectors
    collectors.forEach((collector, index) => {
        collector.interval = [5000, 10000, 30000, 60000][index];
        collector.points = [10, 20, 50, 100][index];
        collector.cost = [50, 100, 300, 500][index];
        collector.level = 1;
        collector.unlocked = false;
        collector.working = false;

        // Reset collector UI
        document.getElementById(`collector${index + 1}`).disabled = true;
        document.getElementById(`upgrade-collector${index + 1}`).disabled = true;
        document.getElementById(`unlock-collector${index + 1}`).style.display = 'inline-block';
        const autoButton = document.getElementById(`auto-collector${index + 1}`);
        if (autoButton) {
            autoButton.disabled = true;
            autoButton.style.display = 'inline-block'; // Ensure the button is visible again
        }
        updateCollectorInfo(index + 1);
    });

    // Clear auto collector intervals
    autoCollectorIntervals.forEach(clearInterval);
    autoCollectorIntervals = [];

    // Reset special upgrades
    document.querySelectorAll(".special-upgrades button").forEach(button => {
        button.disabled = false; // Re-enable special upgrade buttons
    });

    updateScore();
}

function updateScore() {
    document.getElementById("score").textContent = score;
    document.getElementById("auto-score").textContent = autoScore;
    document.getElementById("upgrade-cost").textContent = upgradeCost;
    document.getElementById("click-upgrade-cost").textContent = clickUpgradeCost;
    document.getElementById("double-click-upgrade-cost").textContent = doubleClickUpgradeCost;
}

function collectPoints(collectorIndex) {
    const collector = collectors[collectorIndex - 1];
    const progressBar = document.getElementById(`progress-collector${collectorIndex}`);

    if (!collector.unlocked) {
        alert("Ten zbieracz nie jest jeszcze odblokowany!");
        return;
    }
    if (collector.working) {
        alert("Ten zbieracz już pracuje!");
        return;
    }

    collector.working = true;
    let progress = 0;
    const interval = 100; // Aktualizacja co 100ms
    const step = (interval / collector.interval) * 100;

    progressBar.style.width = '0%';
    progressBar.textContent = `0 / ${collector.points}`;
    const progressInterval = setInterval(() => {
        progress += step;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.floor((progress / 100) * collector.points)} / ${collector.points}`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            score += collector.points;
            collectorSounds[collectorIndex - 1].play();
            updateScore();
            collector.working = false;
        }
    }, interval);
}

function unlockCollector(collectorIndex) {
    const collector = collectors[collectorIndex - 1];
    if (score >= collector.cost) {
        score -= collector.cost;
        collector.unlocked = true;
        updateScore();

        document.getElementById(`collector${collectorIndex}`).disabled = false;
        document.getElementById(`upgrade-collector${collectorIndex}`).disabled = false;
        document.getElementById(`unlock-collector${collectorIndex}`).style.display = 'none';

        // Enable auto collector button
        const autoButton = document.getElementById(`auto-collector${collectorIndex}`);
        if (autoButton) autoButton.disabled = false;

        updateCollectorInfo(collectorIndex);
    } else {
        alert("Nie masz wystarczającej liczby punktów, aby odblokować ten zbieracz!");
    }
}

let autoCollectorCosts = [100, 200, 500, 1000];

function startAutoCollector(collectorIndex) {
    const collector = collectors[collectorIndex - 1];
    const autoCollectorCost = autoCollectorCosts[collectorIndex - 1];

    if (!collector.unlocked) {
        alert("Najpierw odblokuj ten zbieracz!");
        return;
    }

    if (score >= autoCollectorCost) {
        score -= autoCollectorCost;
        updateScore();

        // Start auto collection and store interval ID
        const intervalId = setInterval(() => {
            if (!collector.working) {
                collectPoints(collectorIndex);
            }
        }, collector.interval);
        autoCollectorIntervals.push(intervalId);

        // Remove auto collector button
        document.getElementById(`auto-collector${collectorIndex}`).remove();
    } else {
        alert("Nie masz wystarczającej liczby punktów, aby zautomatyzować ten zbieracz!");
    }
}

function upgradeCollector(collectorIndex) {
    const collector = collectors[collectorIndex - 1];
    if (score >= collector.cost) {
        score -= collector.cost;
        collector.level++;
        collector.points = Math.ceil(collector.points * 1.1); // Zwiększ punkty o 1.1 raza
        collector.cost = Math.ceil(collector.cost * 2); // Koszt rośnie 2x

        // Co 10 poziom: zwiększ punkty 2x i skróć czas o 1.7 raza
        if (collector.level % 10 === 0) {
            collector.points *= 2;
            collector.interval = Math.ceil(collector.interval / 1.7);
        }

        updateCollectorInfo(collectorIndex);
        updateScore();
    } else {
        alert("Nie masz wystarczającej liczby punktów, aby ulepszyć ten zbieracz!");
    }
}

function updateCollectorInfo(collectorIndex) {
    const collector = collectors[collectorIndex - 1];
    const infoElement = document.getElementById(`collector${collectorIndex}-info`);
    infoElement.textContent = `Punkty: ${collector.points} | Czas: ${(collector.interval / 1000).toFixed(1)}s`;

    const upgradeButton = document.getElementById(`upgrade-collector${collectorIndex}`);
    upgradeButton.textContent = `Ulepsz zbieracz ${collectorIndex} (koszt: ${collector.cost})`;
}

setInterval(() => {
    score += autoScore;
    updateScore();
}, 1000);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function buySpecialUpgrade(type) {
    if (type === 1 && score >= 1000) {
        score -= 1000;
        collectors.forEach(collector => collector.points *= 2);
    } else if (type === 2 && score >= 2000) {
        score -= 2000;
        collectors.forEach(collector => collector.interval = Math.ceil(collector.interval / 2));
    } else {
        alert("Nie masz wystarczającej liczby punktów!");
    }
    updateScore();
}