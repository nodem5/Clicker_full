document.addEventListener('DOMContentLoaded', function() {

    // ---- STAN GRY ----
    let counter = 0.0;
    let clickValue = 0.20;
    let dollarsPerSec = 0;
    let workerInterval = null;
    let currentBackground = 'stragan1.png';  // NOWE: śledzenie tła

    // Flagi ulepszeń
    let upgradeBought = false;
    let fruitsUpgradeBought = false;
    let adUpgradeBought = false;
    let workerUpgradeBought = false;
    let investUpgradeBought = false;
    let vehicleRentalBought = false;
    let securityUpgradeBought = false;
    let carsUpgradeBought = false;

    // ---- ELEMENTY DOM ----
    const counterDiv = document.getElementById('counter');
    const clickBtn = document.getElementById('clickBtn');
    const resetBtn = document.getElementById('resetBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const upgradeBtn = document.getElementById('upgradeSort');
    const upgradeFruitsBtn = document.getElementById('upgradeFruits');
    const upgradeAdBtn = document.getElementById('upgradeAd');
    const upgradeWorkerBtn = document.getElementById('upgradeWorker');
    const upgradeInvestBtn = document.getElementById('upgradeInvest');
    const vehicleRentalBtn = document.getElementById('vehicleRental');
    const upgradeSecurityBtn = document.getElementById('upgradeSecurity');
    const upgradeCarsBtn = document.getElementById('upgradeCars'); // <- zgodne z HTML
    const dollarsPerSecDiv = document.getElementById('dollarsPerSec');
    const investmentsPanel = document.getElementById('investmentsPanel');
    // Ustawienie początkowego tekstu przycisku kliknięcia
    clickBtn.textContent = 'Sprzedaj jabłko';


    // ---- FUNKCJE POMOCNICZE ----
    function formatNumber(number) {
        // zachowujemy dwie liczby po przecinku, używamy apostrofu jako separatora tysięcy
        const n = Number(number);
        return n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}).replace(/,/g, "'");
    }

    function setBackground(image) {
        currentBackground = image;
        document.documentElement.style.setProperty('--bg-image', `url('${image}')`);
    }

    function updateCounter() {
        counterDiv.textContent = `$${formatNumber(counter)}`;
        dollarsPerSecDiv.textContent = `$${formatNumber(dollarsPerSec)}/s`;

        // highlight dla dostępnych ulepszeń
        if (!upgradeBought && counter >= 2) upgradeBtn.classList.add('highlight'); else upgradeBtn.classList.remove('highlight');
        if (!fruitsUpgradeBought && counter >= 10 && upgradeFruitsBtn.style.display !== 'none') upgradeFruitsBtn.classList.add('highlight'); else upgradeFruitsBtn.classList.remove('highlight');
        if (!adUpgradeBought && counter >= 100 && upgradeAdBtn.style.display !== 'none') upgradeAdBtn.classList.add('highlight'); else upgradeAdBtn.classList.remove('highlight');
        if (!workerUpgradeBought && counter >= 200 && upgradeWorkerBtn.style.display !== 'none') upgradeWorkerBtn.classList.add('highlight'); else upgradeWorkerBtn.classList.remove('highlight');
        if (!investUpgradeBought && counter >= 200 && upgradeInvestBtn.style.display !== 'none') upgradeInvestBtn.classList.add('highlight'); else upgradeInvestBtn.classList.remove('highlight');
        if (!vehicleRentalBought && counter >= 10000 && vehicleRentalBtn.style.display !== 'none') vehicleRentalBtn.classList.add('highlight'); else vehicleRentalBtn.classList.remove('highlight');
        if (!securityUpgradeBought && counter >= 5000 && upgradeSecurityBtn.style.display !== 'none') upgradeSecurityBtn.classList.add('highlight'); else upgradeSecurityBtn.classList.remove('highlight');
        if (!carsUpgradeBought && counter >= 30000 && upgradeCarsBtn.style.display !== 'none') upgradeCarsBtn.classList.add('highlight'); else upgradeCarsBtn.classList.remove('highlight');
    }

    // ---- OBSŁUGA KLIKÓW ----
    clickBtn.addEventListener('click', function() {
        counter += clickValue;
        updateCounter();
    });

    // Ulepszenia
    // Ulepszenie 1: Sortowanie jabłek
    upgradeBtn.addEventListener('click', function() {
        if (!upgradeBought && counter >= 2) {
            counter -= 2;
            clickValue += 0.20;
            upgradeBought = true;
            upgradeBtn.disabled = true;
            upgradeBtn.textContent = 'Sortowanie jabłek (kupione)';
            upgradeFruitsBtn.style.display = 'inline-block';
            updateCounter();
        }
    });

    // Ulepszenie 2: Więcej owoców
    upgradeFruitsBtn.addEventListener('click', function() {
        if (!fruitsUpgradeBought && counter >= 10) {
            counter -= 10;
            clickValue += 0.80;
            fruitsUpgradeBought = true;
            upgradeFruitsBtn.disabled = true;
            upgradeFruitsBtn.textContent = 'Więcej owoców (kupione)';
            upgradeAdBtn.style.display = 'inline-block';
            setBackground('stragan2.png');  // NOWE: zmiana tła
            updateCounter();
        }
    });

    // Ulepszenie 3: Reklama
    upgradeAdBtn.addEventListener('click', function() {
        if (!adUpgradeBought && counter >= 100) {
            counter -= 100;
            clickValue += 1.20;
            adUpgradeBought = true;
            upgradeAdBtn.disabled = true;
            upgradeAdBtn.textContent = 'Reklama (kupione)';
            upgradeWorkerBtn.style.display = 'inline-block';
            updateCounter();
        }
    });

    // Ulepszenie 4: Pracownik
    upgradeWorkerBtn.addEventListener('click', function() {
        if (!workerUpgradeBought && counter >= 200) {
            counter -= 200;
            workerUpgradeBought = true;
            upgradeWorkerBtn.disabled = true;
            upgradeWorkerBtn.textContent = 'Pracownik (kupione)';
            clickBtn.textContent = 'Pomóż pracownikowi';
            clickValue = 1.00;
            dollarsPerSec = 4;
            dollarsPerSecDiv.style.display = 'block';
            upgradeInvestBtn.style.display = 'inline-block';
            if (workerInterval) clearInterval(workerInterval);
            workerInterval = setInterval(function(){ counter += 4; updateCounter(); }, 1000);
            updateCounter();
        }
    });

    // Ulepszenie 5: Inwestycje
    upgradeInvestBtn.addEventListener('click', function() {
        if (!investUpgradeBought && counter >= 200) {
            counter -= 200;
            vehicleRentalBtn.style.display = 'inline-block';
            investUpgradeBought = true;
            upgradeInvestBtn.disabled = true;
            upgradeInvestBtn.textContent = 'Inwestycje (kupione)';
            investmentsPanel.style.display = 'block';
            const investmentsList = document.getElementById('investmentsList');
            investmentsList.innerHTML = '';
            const investments = [
                { title: 'Lokata bankowa 1', cost: 200, profit: 250, time: 10 },
                { title: 'Lokata bankowa 2', cost: 500, profit: 650, time: 10 },
                { title: 'Lokata bankowa 3', cost: 1000, profit: 1400, time: 10 }
            ];
            investments.forEach((inv, idx) => {
                const investmentDiv = document.createElement('div');
                investmentDiv.className = 'investment';
                investmentDiv.innerHTML = `
                    <div class="investment-title">${inv.title}</div>
                    <div>Koszt: $${inv.cost}, Zysk: $${inv.profit}, Czas: ${inv.time}s</div>
                    <div class="progress-bar"><div class="progress" id="progress${idx}"></div></div>
                    <button class="investment-btn" id="btn${idx}">Zainwestuj</button>
                `;
                investmentsList.appendChild(investmentDiv);
                const investBtn = document.getElementById(`btn${idx}`);
                investBtn.addEventListener('click', function() {
                    if (counter >= inv.cost && !investBtn.disabled) {
                        counter -= inv.cost;
                        investBtn.disabled = true;
                        let progress = 0;
                        const progressBar = document.getElementById(`progress${idx}`);
                        progressBar.style.width = '0%';
                        const interval = setInterval(function() {
                            progress++;
                            progressBar.style.width = (progress * 100 / inv.time) + '%';
                            if (progress >= inv.time) {
                                clearInterval(interval);
                                counter += inv.profit;
                                investBtn.textContent = 'Zysk odebrany!';
                                setTimeout(() => {
                                    investBtn.textContent = 'Zainwestuj';
                                    investBtn.disabled = false;
                                    progressBar.style.width = '0%';
                                }, 1200);
                                updateCounter();
                            }
                            updateCounter();
                        }, 1000);
                    }
                });
            });
            updateCounter();
        }
    });

    // Ulepszenie 6: Wypożyczalnia samochodów
    vehicleRentalBtn.addEventListener('click', function() {
        if (!vehicleRentalBought && counter >= 10000) {
            counter -= 10000;
            vehicleRentalBought = true;
            setBackground('wypożyczalnia.png');  // NOWE: zmiana tła
            vehicleRentalBtn.disabled = true;
            vehicleRentalBtn.textContent = 'Wypożyczalnia samochodów (kupione)';
            clickValue += 199;
            dollarsPerSec += 100;
            if (workerInterval) clearInterval(workerInterval);
            workerInterval = setInterval(function(){ counter += 100; updateCounter(); }, 1000);
            upgradeSecurityBtn.style.display = 'inline-block';
            updateCounter();
        }
    });

    // Ulepszenie 7: Zabezpieczenia
    upgradeSecurityBtn.addEventListener('click', function() {
        if (!securityUpgradeBought && counter >= 5000) {
            counter -= 5000;
            securityUpgradeBought = true;
            upgradeSecurityBtn.disabled = true;
            upgradeSecurityBtn.textContent = 'Zabezpieczenia (kupione)';
            clickValue += 75;
            dollarsPerSec += 50;
            if (workerInterval) clearInterval(workerInterval);
            workerInterval = setInterval(function(){ counter += 50; updateCounter(); }, 1000);
            updateCounter();
        }
    });

    // Ulepszenie 8: Lepsze samochody
    upgradeCarsBtn.addEventListener('click', function() {
        if (!carsUpgradeBought && counter >= 30000) {
            counter -= 30000;
            carsUpgradeBought = true;
            upgradeCarsBtn.disabled = true;
            upgradeCarsBtn.textContent = 'Lepsze samochody (kupione)';
            clickValue += 100;
            dollarsPerSec += 75;
            if (workerInterval) clearInterval(workerInterval);
            workerInterval = setInterval(function(){ counter += 75; updateCounter(); }, 1000);
            updateCounter();
        }
    });

    // Reset
    resetBtn.addEventListener('click', function() {
        if (!confirm('Czy na pewno chcesz zresetować grę?')) return;
        counter = 0.0;
        clickValue = 0.20;
        dollarsPerSec = 0;
        if (workerInterval) clearInterval(workerInterval);
        upgradeBought = fruitsUpgradeBought = adUpgradeBought = workerUpgradeBought = investUpgradeBought = vehicleRentalBought = securityUpgradeBought = carsUpgradeBought = false;

        // reset UI buttons
        clickBtn.textContent = 'Sprzedaj jabłko';
        upgradeBtn.disabled = false; upgradeBtn.textContent = 'Sortowanie jabłek (+0.20$/klik, koszt: 2$)';
        upgradeFruitsBtn.style.display = 'none'; upgradeFruitsBtn.disabled = false; upgradeFruitsBtn.textContent = 'Więcej owoców (+0.80$/klik, koszt: 10$)';
        upgradeAdBtn.style.display = 'none'; upgradeAdBtn.disabled = false; upgradeAdBtn.textContent = 'Reklama (+2$/klik, koszt: 100$)';
        upgradeWorkerBtn.style.display = 'none'; upgradeWorkerBtn.disabled = false; upgradeWorkerBtn.textContent = 'Pracownik (+4$/s, koszt: 200$)';
        upgradeInvestBtn.style.display = 'none'; upgradeInvestBtn.disabled = false; upgradeInvestBtn.textContent = 'Inwestycje (koszt: 200$)';
        vehicleRentalBtn.style.display = 'none'; vehicleRentalBtn.disabled = false; vehicleRentalBtn.textContent = 'Wypożyczalnia samochodów (koszt: 10000$)';
        upgradeSecurityBtn.style.display = 'none'; upgradeSecurityBtn.disabled = false; upgradeSecurityBtn.textContent = 'Zabezpieczenia (koszt: 5000$)';
        upgradeCarsBtn.style.display = 'none'; upgradeCarsBtn.disabled = false; upgradeCarsBtn.textContent = 'Lepsze samochody (koszt: 30000$)';
        investmentsPanel.style.display = 'none';
        setBackground('stragan1.png');  // NOWE: reset tła
        dollarsPerSecDiv.style.display = 'none';
        updateCounter();
    });

    // ---- THEME (dark/light) z localStorage ----
    function setTheme(mode) {
        document.body.classList.remove('dark-mode','light-mode');
        document.body.classList.add(mode);
        localStorage.setItem('theme', mode);
        darkModeBtn.textContent = (mode === 'dark-mode') ? 'Włącz tryb jasny' : 'Włącz tryb ciemny';
    }

    // inicjalizacja: jeśli zapisany wybór w localStorage — wczytaj, w przeciwnym razie użyj preferencji systemu
    const saved = localStorage.getItem('theme');
    if (saved === 'dark-mode' || saved === 'light-mode') {
        setTheme(saved);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark-mode' : 'light-mode');
    }

    darkModeBtn.addEventListener('click', function() {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        setTheme(newTheme);
    });

    // Jeżeli preferencja systemowa zmieni się, zastosuj ją tylko jeśli użytkownik nie zapisał własnego wyboru:
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark-mode' : 'light-mode');
            }
        });
    }

    // jeśli user nigdy nie zmienił ręcznie → stosuj preferencje systemu
    if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark-mode" : "light-mode");
    }

    // ---- start ----
    updateCounter();
});