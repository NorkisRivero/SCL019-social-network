import { logout, showPost } from '../lib/index.js';
import { post } from './post.js';

export const wall = () => {
  const walls = `
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
  divHeader.innerHTML = walls;
  const buttonLogout = divHeader.querySelector('.logout');
  if (buttonLogout) {
    buttonLogout.addEventListener('click', () => {
      logout();
    });
  }
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
  showPost();

  return divHeader;
};
