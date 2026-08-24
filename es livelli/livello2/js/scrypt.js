function verificaparidisp() {
    let numero = document.getElementById("pardisp").value;
    if ( numero == 0){
        document.getElementById("risposta").innerHTML = "Il numero 0 non è né pari né dispari";
    }
    else if (numero % 2 == 0) {
        document.getElementById("risposta").innerHTML = "Il numero " + numero + " è pari";
    }
    else {
        document.getElementById("risposta").innerHTML = "Il numero " + numero + " è dispari";
    }
}

function verificaposneg() {
    let numero = document.getElementById("posneg").value;
    if ( numero == 0){
        document.getElementById("posnegris").innerHTML = "Il numero 0 non è né positivo né negativo";
    }
    else if (numero > 0) {
        document.getElementById("posnegris").innerHTML = "Il numero " + numero + " è positivo";
    }
    else {
        document.getElementById("posnegris").innerHTML = "Il numero " + numero + " è negativo";
    }
}

let numerorandom = Math.floor(Math.random() * 20)

function indovina() {
    let numerotentato = document.getElementById("scelta").value;
    if (numerotentato == numerorandom) 
    {
        document.getElementById("indovinaris").innerHTML = "Hai indovinato!";
        numerorandom = Math.floor(Math.random() * 20)
    }
    else if (numerotentato < numerorandom)
    {
        document.getElementById("indovinaris").innerHTML = "Il numero da indovinare è più grande";
    }
    else {
        document.getElementById("indovinaris").innerHTML = "Il numero da indovinare è più piccolo";
    }
}

function validaform() {
    if(document.getElementById("nome").value == "" )
    {
        document.getElementById("formris").innerHTML = "Compila il campo nome";
    }
    else if(document.getElementById("email").value == "" )
    {
        document.getElementById("formris").innerHTML = "Compila il campo email";
    }
    else if(document.getElementById("messaggio").value == "" )
    {
        document.getElementById("formris").innerHTML = "Compila il campo messaggio";
    }
    else
    {
        document.getElementById("formris").innerHTML = "Formulario inviato con successo";
    }
}