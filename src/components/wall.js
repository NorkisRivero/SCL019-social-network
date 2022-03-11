import { logout, showPost } from '../lib/index.js';
import { post } from './post.js';

export const wall = () => {
  // creacion de una const que contiene el header(innerHtml)
  const walls = `
<header class="headerWall">
<div class = "logo"><img src="./img/pruebaDeLogo.png" class= "imgLogoPost"> </div>
<button class = "addComent"><img src="./img/agregar.png"> <span class="tooltiptext">Agregar comentarios</span></button>
<button class = "home"><img src="./img/home.png"> <span class="tooltiptext1"> <br>Todos los post</span></button>
<button class = "perfile"><img src="./img/perfil.png"><span class="tooltiptext2"> <br>Mis post</span></button>
<button class="logout" id="logout"><img src="./img/salir.png"><span class="tooltiptext3"> <br>Cerrar sesión</span>
</button>
</header>
<section id = "allPost" class = "allPost">
</section>
`;
  // creacion de un div que contendrá la const creada anteriormente y los post
  const divHeader = document.createElement('div');
  divHeader.classList.add('divHeader');
  divHeader.innerHTML = walls; // devuelve la sintaxis del header con sus respectivos elementos
  const buttonLogout = divHeader.querySelector('.logout');
  // Devuelve el primer elemento del documento que coincida con el grupo especificado de selectores.
  if (buttonLogout) {
    buttonLogout.addEventListener('click', () => {
      logout();
    });
  }

  showPost(); // llama a la funcion del index.js para imprimir todos los post

  const buttonAddComent = divHeader.querySelector('.addComent');
  if (buttonAddComent) {
    buttonAddComent.addEventListener('click', () => {
      const postAdd = post(); // la const postAdd guarda el return de la funcion post()
      const sectionPostAdd = document.createElement('section');
      // creo una section que contendrá la const postAdd con todos los post
      sectionPostAdd.classList.add('sectionPostAdd');
      sectionPostAdd.appendChild(postAdd);
      // el divHeader establece la sintaxis para los post y el header propiamente dicho
      divHeader.appendChild(sectionPostAdd);
    });
  }
  // Al dar click en home
  // llamamos a la funcion showPost del index.js para que muestre todos los post
  const buttonHome = divHeader.querySelector('.home');
  if (buttonHome) {
    buttonHome.addEventListener('click', () => {
      showPost();
    });
  }
  // Al dar clic en .perfile
  // cambiamos el hash para direccionar la url a #/editPost
  // location.hash se puede usar para obtener o establecer el valor de etiqueta de la página
  const buttonEdit = divHeader.querySelector('.perfile');
  if (buttonEdit) {
    buttonEdit.addEventListener('click', () => {
      window.location.hash = '#/editPost';
    });
  }
  // retorna el componente divHeader que contiene el header y la section con los post
  return divHeader;
};
