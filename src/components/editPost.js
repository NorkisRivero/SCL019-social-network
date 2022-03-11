import { editDeletePost } from '../lib/index.js';
// Se mantiene el header del wall.
// se cambió el nombre de las clases para el css
export const editPost = () => {
  const edit = `

<header class="headerWall1">
<div class = "logo"><img src="./img/pruebaDeLogo.png" class= "imgLogoPost"></div>
<button class = "home1"><img src="./img/home.png"><span class="tooltiptextP1"> <br>Todos los post</span></button>
<button class = "perfile1"><img src="./img/perfil.png"><span class="tooltiptextP2"> <br>Mis post</span></button>
<button class="logout1" id="logout"><img src="./img/salir.png"><span class="tooltiptextP3"> <br>Salir de la sesión</span></button>
</header>

<section id = "allPost1" class = "allPost1">
</section>
`;
  // addEventListener para escuchar los botones de home y salir
  const divHeader = document.createElement('div');
  divHeader.classList.add('divHeader');
  divHeader.innerHTML = edit; // se establece la sintaxis del divHeader con la const edit
  const buttonHome = divHeader.querySelector('.home1');
  if (buttonHome) {
    buttonHome.addEventListener('click', () => {
      window.location.hash = '#/wall'; // se cambia la ruta con el hash correspondiente
    });
  }
  const buttonLogout = divHeader.querySelector('.logout1');
  if (buttonLogout) {
    buttonLogout.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/logout'; // se cambia la ruta con el hash correspondiente
    });
  }

  editDeletePost(); // se llama a la funcion editDeletePost
  return divHeader;
};
