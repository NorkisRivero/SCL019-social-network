import { logout, showPost } from '../lib/index.js';
import { post } from './post.js';
// import { editPost } from './editPost.js';

export const wall = () => {
  const walls = `
<header class="headerWall">
<div class = "logo"><img src="./img/pruebaDeLogo.png" class= "imgLogoPost"> </div>
<button class = "addComent"><img src="./img/agregar.png"> <span class="tooltiptext">Agregar comentarios</span></button>
<button class = "home"><img src="./img/home.png"> <span class="tooltiptext1"> <br>Todos los post</span></button>
<button class = "perfile"><img src="./img/perfil.png"><span class="tooltiptext2"> <br>Mis post</span></button>
<button class="logout" id="logout"><img src="./img/salir.png"><span class="tooltiptext3"> <br>Cerrar sesión</span>
<section id = "allPost" class = "allPost">
</section>
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
  showPost();
  const buttonAddComent = divHeader.querySelector('.addComent');
  if (buttonAddComent) {
    buttonAddComent.addEventListener('click', () => {
      const postAdd = post();
      const sectionPostAdd = document.createElement('section');
      sectionPostAdd.classList.add('sectionPostAdd');
      sectionPostAdd.appendChild(postAdd);
      divHeader.appendChild(sectionPostAdd);
    });
  }
  const buttonHome = divHeader.querySelector('.home');
  if (buttonHome) {
    buttonHome.addEventListener('click', () => {
      showPost();
    });
  }
  const buttonEdit = divHeader.querySelector('.perfile');
  if (buttonEdit) {
    buttonEdit.addEventListener('click', () => {
      console.log('estoy haciendo clic en el perfile');
      window.location.hash = '#/editPost';
    });
  }
  // showPost();
  return divHeader;
};