window.onload = function () {

    let divcontutto = document.getElementById("container")
    for (let i = 1; i <= 10; i++) {
        let button = document.createElement("button");
        button.innerHTML = i;
        divcontutto.appendChild(button);
        button.addEventListener("click", function () {
            document.getElementById("result").innerHTML = i;
        });
    }
    let cellarandom1 = Math.floor(Math.random() * 25) + 1;
    let cellarandom2 = Math.floor(Math.random() * 25) + 1;

    while (cellarandom1 === cellarandom2) {
        cellarandom2 = Math.floor(Math.random() * 25) + 1;
    }

    let divcontutto2 = document.getElementById("container2");

    for (let i = 1; i <= 25; i++) {
        let div = document.createElement("div");
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.backgroundColor = "grey";
        div.style.display = "inline-block";
        div.style.margin = "5px";
        div.style.opacity = "0.5";

        divcontutto2.appendChild(div);

        // Evento Click
        div.addEventListener("click", function cambiaColore() {
            
            div.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
            div.style.opacity = "1";

            // 2. Rimuove il listener: la cella NON è più modificabile
            div.removeEventListener("click", cambiaColore);

            // 3. Controllo se è una delle celle speciali (confronto indice `i`)
            if (i === cellarandom1 || i === cellarandom2) {
                document.getElementById("result2").innerHTML = "Hai preso una cella speciale!";
            }
            else {
                document.getElementById("result2").innerHTML = "";
            }
        });
    }
}