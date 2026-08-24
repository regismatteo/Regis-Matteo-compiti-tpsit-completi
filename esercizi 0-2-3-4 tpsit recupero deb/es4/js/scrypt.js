const luceRossa = document.getElementById('luce-rossa');
const luceGialla = document.getElementById('luce-gialla');
const luceVerde = document.getElementById('luce-verde');
const btnStart = document.getElementById('btn-start');

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;

  luceRossa.classList.remove('attiva');
  luceGialla.classList.remove('attiva');
  luceVerde.classList.remove('attiva');

  luceVerde.classList.add('attiva');

  setTimeout(() => {
    luceGialla.classList.add('attiva');
    luceVerde.classList.remove('attiva');
  }, 5000);

  setTimeout(() => {
    luceVerde.classList.remove('attiva');
    luceGialla.classList.remove('attiva');
    luceRossa.classList.add('attiva');

    btnStart.disabled = false;
  }, 7000);
});