function conferma() {
    if (document.getElementById("nome").value === "") {
        alert("Per favore, inserisci il tuo nome.");
        return;
    }
    document.getElementById("messaggio-personalizzato").innerHTML = "Benvenuto " + document.getElementById("nome").value + "!";
}
let cont = 0;
function contatore() {
    cont++;
    document.getElementById("numero").innerHTML = cont;
}

function cambiaColoreverde() {
    document.getElementById("riquadrocolore").style.backgroundColor = "green";
}

function cambiaColoreblu() {
    document.getElementById("riquadrocolore").style.backgroundColor = "blue";
}

function cambiaColorerosso() {
    document.getElementById("riquadrocolore").style.backgroundColor = "red";
}

function cambiaColoregiallo() {
    document.getElementById("riquadrocolore").style.backgroundColor = "yellow";
}
let isVisible = true;
function nascondimostra() {
    if (isVisible) {
        document.getElementById("messaggio-nascondi-mostra").style.display = "none";
        isVisible = false;
    } else {
        document.getElementById("messaggio-nascondi-mostra").style.display = "block";
        isVisible = true;
    }
}