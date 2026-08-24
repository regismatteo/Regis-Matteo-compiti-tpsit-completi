// --- 1. DATI DI GIOCO ---
let punteggio = 0;
let navi = [];
let celleCliccate = new Set(); // Gestisce le celle già selezionate

// --- 2. INIZIALIZZAZIONE E RESET DEL GIOCO ---
function inizializzaGioco() {
    punteggio = 0;
    celleCliccate.clear();
    document.getElementById("punteggio").innerText = punteggio;
    document.getElementById("messaggio").innerText = "";

    // Array di oggetti contenente le navi
    const posizioniNave1 = generaPosizioniNave(3);
    const posizioniNave2 = generaPosizioniNave(1, posizioniNave1);

    navi = [
        {
            nome: "Incrociatore (3 celle)",
            posizioni: posizioniNave1,
            colpite: 0,
            affondata: false,
            puntiPerColpo: 10
        },
        {
            nome: "Sottomarino (1 cella)",
            posizioni: posizioniNave2,
            colpite: 0,
            affondata: false,
            puntiPerColpo: 20
        }
    ];

    creaGriglia();
    aggiornaListaNavi();
}

// Genera casualmente le celle per una nave verificando che rimanga nei margini della griglia 5x5
function generaPosizioniNave(lunghezza, posizioniOccupate = []) {
    let posizioni = [];
    let valida = false;

    while (!valida) {
        posizioni = [];
        let orizzontale = Math.random() < 0.5;
        let inizio = Math.floor(Math.random() * 25) + 1;

        let riga = Math.ceil(inizio / 5);
        let colonna = ((inizio - 1) % 5) + 1;

        if (orizzontale && colonna + lunghezza - 1 <= 5) {
            for (let i = 0; i < lunghezza; i++) posizioni.push(inizio + i);
        } else if (!orizzontale && riga + lunghezza - 1 <= 5) {
            for (let i = 0; i < lunghezza; i++) posizioni.push(inizio + (i * 5));
        }

        if (posizioni.length === lunghezza) {
            valida = !posizioni.some(pos => posizioniOccupate.includes(pos));
        }
    }
    return posizioni;
}

// --- 3. CREAZIONE DELLA GRIGLIA NEL DOM ---
function creaGriglia() {
    const griglia = document.getElementById("griglia");
    griglia.innerHTML = "";

    for (let i = 1; i <= 25; i++) {
        let cella = document.createElement("div");
        cella.classList.add("cella");

        // Evento di click sulla singola cella
        cella.addEventListener("click", function gestisciClick() {
            if (celleCliccate.has(i)) return;

            celleCliccate.add(i);

            // Verifica presenza di una nave
            let naveColpita = navi.find(n => n.posizioni.includes(i));

            if (naveColpita) {
                cella.style.backgroundColor = "#e74c3c"; // Cella colpita (Rosso)
                punteggio += naveColpita.puntiPerColpo;
                naveColpita.colpite++;

                if (naveColpita.colpite === naveColpita.posizioni.length) {
                    naveColpita.affondata = true;
                    document.getElementById("messaggio").innerText = `${naveColpita.nome} AFFONDATA!`;
                } else {
                    document.getElementById("messaggio").innerText = "Colpito!";
                }
            } else {
                cella.style.backgroundColor = "#3498db"; // Acqua (Blu)
                document.getElementById("messaggio").innerText = "Acqua! 0 punti.";
            }

            document.getElementById("punteggio").innerText = punteggio;
            aggiornaListaNavi();

            // Disabilita la modifica della cella dopo il primo click
            cella.removeEventListener("click", gestisciClick);
            cella.style.cursor = "default";
        });

        griglia.appendChild(cella);
    }
}

// --- 4. AGGIORNAMENTO LISTA NAVI ---
function aggiornaListaNavi() {
    const listaNavi = document.getElementById("lista-navi");
    listaNavi.innerHTML = "";

    navi.forEach(nave => {
        let li = document.createElement("li");
        
        if (nave.affondata) {
            li.innerText = `${nave.nome} - AFFONDATA!`;
            li.classList.add("stato-affondata");
        } else {
            li.innerText = `${nave.nome} - Colpi: ${nave.colpite}/${nave.posizioni.length}`;
        }

        listaNavi.appendChild(li);
    });
}

// Avvio al caricamento della pagina
window.onload = inizializzaGioco;