import { editDeletePost } from '../lib/index.js';
// import { wall } from './wall.js';

export const editPost = () => {
  const edit = `
<header class="headerWall">
<div class = "logo"><img src="./img/pruebaDeLogo.png" class= "imgLogo"></div>
<button class="home"><img src="./img/home.png"><span class="tooltiptext1">Ver todos los post</span></button>
<button class="perfile"><img src="./img/perfil.png"><span class="tooltiptext2">Ver mis post</span></button>
<button class="logout" id="logout"><img src="./img/salir.png"><span class="tooltiptext3">Salir de la sesion</span>

<section id = "allPost1" class = "allPost1">
</section>
`;
  const divHeader = document.createElement('div');
  divHeader.classList.add('divHeader1');
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
