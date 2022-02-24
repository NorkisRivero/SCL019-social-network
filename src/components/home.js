// aqui exportaras las funciones que necesites
// import { signUp, loginWithGoogle } from '../lib/index.js';

import { Iniciargoogle } from '../lib/index.js';

export const home = () => {
  // aqui tu codigo del formulario
  // creacion de logo y reseña
//  const generalContainer = document.getElementById('generalContainer');

  const divImg = document.createElement('div');
  divImg.classList.add('divImg');
  const imgLogo = document.createElement('img');
  imgLogo.setAttribute('src', './img/pruebaDeLogo.png');
  imgLogo.classList.add('imgLogo');
  const review = document.createElement('h1');
  review.classList.add('review');
  review.innerText = 'Red informativa para migrantes y futuros migrantes en Chile';
  // creacion de dos articulos y sus clases
  // insertar en el articulo img y reseña
  const asideLogo = document.createElement('aside');
  divImg.appendChild(imgLogo);
  asideLogo.appendChild(divImg);
  asideLogo.appendChild(review);
  // insertar en el articulo los inputs y botones
  // insertar en el elemento con id container los dos articulos
  const headerPart = document.createElement('header');
  headerPart.classList.add('header');
  const footPart = document.createElement('footer');
  footPart.classList.add('footer');
  footPart.innerText = 'Todos los derechos reservados 2022. Propiedad de Cyntia, Norkis y Lidianys';
  // const container = document.createElement('div');
  // creacion de los input y sus atributos
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('name', 'email');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('name', 'password');

  inputEmail.setAttribute('placeholder', ' Email');
  inputPassword.setAttribute('placeholder', ' Contraseña');
  inputEmail.classList.add('inputEmail');
  inputPassword.classList.add('inputPassword');
  // creacion de button para iniciar sesion
  const button = document.createElement('button');
  button.innerText = 'Iniciar Sesión';
  button.classList.add('iniciarSesion');
  // creacion de link y seteo del atributo
  const a = document.createElement('a');
  a.innerText = '¿Olvidaste tu contraseña?';
  // a.classList.add('recoverPassword');
  // a.addEventListener('click', () => {
  //   a.setAttribute('href', '#/restorePassword');
  // });
  // creacion de boton
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerText = 'Continuar con Google';
  buttonGoogle.classList.add('googleButton');
  buttonGoogle.addEventListener('click', () => {
    // console.log('cualquier cosa');
    Iniciargoogle();
  });
  // creacion de link y seteo del atributo
  const aRegister = document.createElement('a');
  aRegister.classList.add('aregister');
  aRegister.setAttribute('href', '#/register');
  aRegister.innerText = 'Registrarse';
  const containerForm = document.createElement('div');
  containerForm.classList.add('containerFormHome');
  const login = document.createElement('form');
  login.classList.add('login');
  login.appendChild(inputEmail);
  login.appendChild(inputPassword);
  login.appendChild(button);
  containerForm.appendChild(login);
  const generalContainer = document.createElement('div');
  generalContainer.classList.add('generalContainer');
  containerForm.appendChild(inputEmail);
  containerForm.appendChild(inputPassword);
  containerForm.appendChild(button);
  // containerForm.appendChild(a);
  containerForm.appendChild(aRegister);
  containerForm.appendChild(buttonGoogle);
  generalContainer.appendChild(headerPart);
  generalContainer.appendChild(asideLogo);
  generalContainer.appendChild(containerForm);
  generalContainer.appendChild(footPart);

  return generalContainer;
};
