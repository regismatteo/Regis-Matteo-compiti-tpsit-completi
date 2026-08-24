function calcolaTabellina() 
{
    let risultati = [];
    let numero = document.getElementById("numero").value;
    for (let i = 1; i <= 10; i++) 
    {
        risultati.push(numero * i);
    }
    document.getElementById("risultato").innerHTML = risultati.join(", ");
}

function aggiungiElemento()
{
    let nuovo = document.getElementById("nuovo").value;
    let lista = document.getElementById("lista");
    let li = document.createElement("li");
    li.textContent = nuovo;
    lista.appendChild(li);
}

let elementi = [];
const parolaplus = "colpito";

function aggiungiElementolv3()
{
    let cont = 0;
    let elemento = document.getElementById("elemento").value;
    elementi.push(elemento);
    for (let i = 0; i < elementi.length; i++)
    {
        if(elementi[i] === parolaplus)
        {
            cont++;
        }
    }
    document.getElementById("risultatoelemento").innerHTML = "La parola " + parolaplus + " è stata inserita " + cont + " volte.";
}

let paroleplus2 = ["casa", "cane", "gatto", "albero", "ostrica", "austtralia", "cane", "casa", ];
function ricercaElemento()
{
    let ricerca = document.getElementById("ricerca").value;
    let cont = 0;
    for (let i = 0; i < paroleplus2.length; i++)
    {
        if(paroleplus2[i] === ricerca)
        {
            cont++;
        }
    }
    document.getElementById("risultatoelementolv4").innerHTML = "La parola " + ricerca + " è stata trovata " + cont + " volte.";
}