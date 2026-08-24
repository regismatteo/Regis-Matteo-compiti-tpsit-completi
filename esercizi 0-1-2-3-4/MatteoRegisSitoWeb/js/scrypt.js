// Attende che il DOM sia caricato
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const alertContainer = document.getElementById("alertMessage");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Impedisce l'invio del form per gestirlo con JS

      // Recupero dei valori dai campi
      const nomeCognome = document.getElementById("nomeCognome").value.trim();
      const email = document.getElementById("email").value.trim();
      const tipoRichiesta = document.getElementById("tipoRichiesta").value;

      // Validazione base
      if (nomeCognome === "" || email === "" || tipoRichiesta === "") {
        mostraMessaggio("Per favore, compila tutti i campi obbligatori (*).", "danger");
        return;
      }

      // Validazione semplice del formato Email
      if (!validaEmail(email)) {
        mostraMessaggio("Inserisci un indirizzo email valido.", "warning");
        return;
      }

      // Se la validazione ha successo, mostriamo un messaggio dinamico
      mostraMessaggio(
        `Grazie <strong>${nomeCognome}</strong>! La tua richiesta riguardo "<em>${tipoRichiesta}</em>" è stata inviata con successo. Ti risponderemo a breve all'indirizzo <strong>${email}</strong>.`,
        "success"
      );

      // Reset del form
      form.reset();
    });
  }

  // Funzione di supporto per mostrare un Alert dinamico Bootstrap
  function mostraMessaggio(messaggio, tipo) {
    alertContainer.className = `alert alert-${tipo} alert-dismissible fade show my-3`;
    alertContainer.innerHTML = `
      ${messaggio}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.classList.remove("d-none");
  }

  // RegEx di supporto per la validazione dell'email
  function validaEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});