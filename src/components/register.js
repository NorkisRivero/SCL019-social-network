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
  // insertar en el articulo img y reseña
  const asideLogo = document.createElement('aside');
  divImg.appendChild(imgLogo);
  asideLogo.appendChild(divImg);
  asideLogo.appendChild(review);
  // header
  const headerPart = document.createElement('header');
  headerPart.classList.add('header');
  const footPart = document.createElement('footer');
  // footer
  footPart.classList.add('footer');
  footPart.innerText = 'Todos los derechos reservados 2022. Propiedad de Cyntia, Norkis y Lidianys';
  // const inputName = document.createElement('input');
  // const inputSurname = document.createElement('input');
  // const inputUser = document.createElement('input');
  const inputMail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputPassword2 = document.createElement('input');
  // const inputAge = document.createElement('input');
  // const inputNationality = document.createElement('input');
  // const inputResident = document.createElement('input');
  //
  // inputName.classList.add('inputName');
  // inputSurname.classList.add('inputSurname');
  // inputUser.classList.add('inputUser');
  inputMail.classList.add('inputMail');
  inputPassword.classList.add('inputPassword');
  inputPassword2.classList.add('inputPassword2');
  // inputAge.classList.add('inputAge');
  // inputNationality.classList.add('inputNationality');
  // inputResident.classList.add('inputResident');
  //
  // inputName.setAttribute('placeholder', 'Nombre');
  // inputSurname.setAttribute('placeholder', 'Apellido');
  // inputUser.setAttribute('placeholder', 'Usuario');
  inputMail.setAttribute('placeholder', 'Email');
  inputMail.setAttribute('name', 'email');
  inputPassword.setAttribute('placeholder', 'Crear Contraseña');
  inputPassword.setAttribute('name', 'password');
  inputPassword.setAttribute('type', 'password');

  inputPassword.setAttribute('pattern', '.{8,}');
  inputPassword.setAttribute('title', 'La contraseña debe contener como minimo 8 digitos');

  inputPassword2.setAttribute('placeholder', 'Repetir contraseña');
  inputPassword2.setAttribute('pattern', '.{8,}');

  // ('title', 'Debe contener al menos un número y una letra mayúscula
  // y minúscula, y al menos 8 o más caracteres';

  inputPassword2.setAttribute('pattern', '.{8,}');
  inputPassword2.setAttribute('title', 'La contraseña debe contener como minimo 8 digitos');

  inputPassword2.setAttribute('type', 'password');
  inputPassword2.setAttribute('name', 'password2');

  // inputAge.setAttribute('placeholder', 'Edad');
  // inputNationality.setAttribute('placeholder', 'Nacionalidad');
  // inputResident.setAttribute('placeholder', 'Reside en Chile');
  // Boton para volver a home
  const buttonHome = document.createElement('button');
  buttonHome.innerText = 'Volver al inicio';
  buttonHome.classList.add('buttonHome');
  const a = document.createElement('a');
  a.setAttribute('href', '#/home');

  const submit = document.createElement('button');
  submit.innerHTML = 'Registrarse';
  submit.classList.add('registrarse');
  // crear a de logearse
  const aHome = document.createElement('a');
  aHome.classList.add('aHome');
  aHome.setAttribute('href', '#/home');
  aHome.innerText = '¿Ya tienes cuenta? Inicia sesión.';

  // creacion de boton
  const buttonGoogle = document.createElement('button');
  buttonGoogle.innerText = 'Continuar con Google';
  buttonGoogle.classList.add('googleButton');
  buttonGoogle.addEventListener('click', () => {
  // console.log('cualquier cosa');
    Iniciargoogle();
  });
  // div del formulario
  const divFormulario = document.createElement('form'); // ya no es un div sino un form
  divFormulario.classList.add('divFormulario');
  // div general
  const divContenedor = document.createElement('div');
  divContenedor.classList.add('signup');
  divFormulario.appendChild(inputMail);
  divFormulario.appendChild(inputPassword);
  divFormulario.appendChild(inputPassword2);
  divFormulario.appendChild(submit);
  divFormulario.appendChild(aHome);
  divFormulario.appendChild(buttonGoogle);
  // divContenedor.appendChild(inputName);
  // divContenedor.appendChild(inputSurname);
  // divContenedor.appendChild(inputUser);
  divContenedor.appendChild(headerPart);
  divContenedor.appendChild(asideLogo);
  divContenedor.appendChild(divFormulario);
  divContenedor.appendChild(footPart);
  // divContenedor.appendChild(inputAge);
  // divContenedor.appendChild(inputNationality);
  // divContenedor.appendChild(inputResident);
  // divContenedor.appendChild(inputResident);
  return divContenedor;
};
