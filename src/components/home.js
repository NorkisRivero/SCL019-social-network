import { Iniciargoogle } from '../lib/index.js';

export const home = () => {
  // creación de elementos del home
  const divImg = document.createElement('div');
  divImg.classList.add('divImg');
  const imgLogo = document.createElement('img');
  imgLogo.setAttribute('src', './img/pruebaDeLogo.png');
  imgLogo.classList.add('imgLogo');
  const review = document.createElement('h1');
  review.classList.add('review');
  review.innerText = 'Red informativa para migrantes y futuros migrantes en Chile';
  // creacion de un aside para contener el div de la imagen y la review
  const asideLogo = document.createElement('aside');
  divImg.appendChild(imgLogo);
  asideLogo.appendChild(divImg);
  asideLogo.appendChild(review);
  // creacion de un header y footer
  const headerPart = document.createElement('header');
  headerPart.classList.add('header');
  const footPart = document.createElement('footer');
  footPart.classList.add('footer');
  footPart.innerText = 'Todos los derechos reservados © 2022. Propiedad de Cyntia, Norkis y Lidianys';
  // creacion de los inputs y button que contendrá el form con sus atributos
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
  const button = document.createElement('button');
  button.innerText = 'Iniciar Sesión';
  button.classList.add('iniciarSesion');
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerText = 'Continuar con Google';
  buttonGoogle.classList.add('googleButton');
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault(); // Para evitar comportamiento por defecto
    Iniciargoogle();
  });
  // Estamos href como atributo al elemento al anchor
  const aRegister = document.createElement('a');
  aRegister.classList.add('aregister');
  aRegister.setAttribute('href', '#/register');
  aRegister.innerText = 'Registrarse';
  const containerForm = document.createElement('form');
  containerForm.classList.add('containerForm');
  const login = document.createElement('form');
  login.classList.add('login');
  // los elementos son insertados en orden en sus respectivos contenedores
  login.appendChild(inputEmail);
  login.appendChild(inputPassword);
  login.appendChild(button);
  containerForm.appendChild(login);
  const generalContainer = document.createElement('div');
  generalContainer.classList.add('generalContainer');
  containerForm.appendChild(inputEmail);
  containerForm.appendChild(inputPassword);
  containerForm.appendChild(button);
  containerForm.appendChild(aRegister);
  containerForm.appendChild(buttonGoogle);
  generalContainer.appendChild(headerPart);
  generalContainer.appendChild(asideLogo);
  generalContainer.appendChild(containerForm);
  generalContainer.appendChild(footPart);
  // esta funcion devuelve un componente div con todos los elementos creados.
  return generalContainer;
};
