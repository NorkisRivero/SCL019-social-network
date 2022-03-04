import { editDeletePost } from '../lib/index.js';
// import { wall } from './wall.js';

export const editPost = () => {
  const edit = `
<header class="headerWall">
<button class = "logo"><img src="./img/pruebaDeLogo.png"></button>
<button class = "addComent"><img src="./img/agregar.png"></button>
<button class = "home"><img src="./img/home.png"></button>
<button class = "perfile"><img src="./img/perfil.png"></button>
<button class="logout" id="logout"><img src="./img/salir.png"></button>
</header>
<section id = "allPost" class = "allPost">
</section>
`;
  const divHeader = document.createElement('div');
  divHeader.classList.add('divHeader');
  divHeader.innerHTML = edit;
  const buttonHome = divHeader.querySelector('.home');
  if (buttonHome) {
    buttonHome.addEventListener('click', () => {
      window.location.hash = '#/wall';
    });
  }
  const buttonLogout = divHeader.querySelector('.logout');
  if (buttonLogout) {
    buttonLogout.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/logout';
    });
  }
  editDeletePost();
  return divHeader;
};
