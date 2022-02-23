import { logout } from '../lib/index.js';

export const wall = () => {
  const walls = `
<header class="headerWall">
<button class = "logo"><img src="./img/pruebaDeLogo.png"></button>
<button class = "addComent"><img src="./img/agregar.png"></button>
<button class = "home"><img src="./img/home.png"></button>
<button class = "perfile"><img src="./img/perfil.png"></button>
<button class="logout" id="logout"><img src="./img/salir.png"></button>
</header>
`;
  const divHeader = document.createElement('div');
  divHeader.classList.add('divHeader');
  divHeader.innerHTML = walls;
  const buttonLogout = divHeader.querySelector('.logout');
  if (buttonLogout) {
    buttonLogout.addEventListener('click', () => {
      logout();
    });
  }

  return divHeader;
};