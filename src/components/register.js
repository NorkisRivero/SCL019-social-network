import { Iniciargoogle } from '../lib/index.js';

export const register = () => {
  // div del logo y reseña
  const divImg = document.createElement('div');
  divImg.classList.add('divImg');
  const imgLogo = document.createElement('img');
  imgLogo.setAttribute('src', './img/pruebaDeLogo.png');
  imgLogo.classList.add('imgLogo');
  const review = document.createElement('h1');
  review.classList.add('review');
  review.innerText = 'Red informativa para migrantes y futuros migrantes en Chile';
  const asideLogo = document.createElement('aside');
  // creacion de un aside que contiene el logo y la reseña
  divImg.appendChild(imgLogo);
  asideLogo.appendChild(divImg);
  asideLogo.appendChild(review);
  // header
  const headerPart = document.createElement('header');
  headerPart.classList.add('header');
  const footPart = document.createElement('footer');
  // footer
  footPart.classList.add('footer');
  footPart.innerText = 'Todos los derechos reservados © 2022. Propiedad de Cyntia, Norkis y Lidianys';
  // creacion de los inputs con sus atributos y clase que serán contenidos por un form
  const inputMail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputPassword2 = document.createElement('input');
  const warnings = document.createElement('div');

  inputMail.classList.add('inputMail');
  inputPassword.classList.add('inputPassword');
  inputPassword2.classList.add('inputPassword2');
  warnings.classList.add('warning');
  warnings.setAttribute('id', 'warning');

  inputMail.setAttribute('placeholder', 'Email');
  inputMail.setAttribute('name', 'email');
  inputPassword.setAttribute('placeholder', 'Crear contraseña de 8 dígitos');
  inputPassword.setAttribute('name', 'password');
  inputPassword.setAttribute('type', 'password');

  inputPassword.setAttribute('pattern', '.{8,}');
  inputPassword.setAttribute('title', 'La contraseña debe contener como minimo 8 digitos');

  inputPassword2.setAttribute('placeholder', 'Repetir contraseña');
  inputPassword2.setAttribute('pattern', '.{8,}');

  inputPassword2.setAttribute('pattern', '.{8,}');
  inputPassword2.setAttribute('title', 'La contraseña debe contener como minimo 8 digitos');

  inputPassword2.setAttribute('type', 'password');
  inputPassword2.setAttribute('name', 'password2');
  // creacion de button con atributo de href
  const buttonHome = document.createElement('button');
  buttonHome.innerText = 'Volver al inicio';
  buttonHome.classList.add('buttonHome');
  const a = document.createElement('a');
  a.setAttribute('href', '#/home');
  // creacion del button para registrarse
  const submit = document.createElement('button');
  submit.innerHTML = 'Registrarse';
  submit.classList.add('registrarse');
  // creacion de anchor con atributo href
  const aHome = document.createElement('a');
  aHome.classList.add('aHome');
  aHome.setAttribute('href', '#/home');
  aHome.innerText = '¿Ya tienes cuenta? Inicia sesión.';
  // creacion de button para google
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerText = 'Continuar con Google';
  buttonGoogle.classList.add('googleButton');
  buttonGoogle.addEventListener('click', () => {
    Iniciargoogle();
  });
  // creacion del form que contiene los inputs y buttons
  const divFormulario = document.createElement('form');
  divFormulario.classList.add('divFormulario');

  const divContenedor = document.createElement('div');
  divContenedor.classList.add('signup');
  divFormulario.appendChild(warnings);
  divFormulario.appendChild(inputMail);
  divFormulario.appendChild(inputPassword);
  divFormulario.appendChild(inputPassword2);
  divFormulario.appendChild(submit);
  divFormulario.appendChild(aHome);
  divFormulario.appendChild(buttonGoogle);

  divContenedor.appendChild(headerPart);
  divContenedor.appendChild(asideLogo);
  divContenedor.appendChild(divFormulario);
  divContenedor.appendChild(footPart);
  // esta funcion devuelve un componente div con todos los elementos creados.

  return divContenedor;
};
