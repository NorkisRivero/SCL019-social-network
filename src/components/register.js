export const register = () => {
  const inputName = document.createElement('input');
  const inputSurname = document.createElement('input');
  const inputUser = document.createElement('input');
  const inputMail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputPassword2 = document.createElement('input');
  const inputAge = document.createElement('input');
  const inputNationality = document.createElement('input');
  const inputResident = document.createElement('input');
  //
  inputName.classList.add('inputName');
  inputSurname.classList.add('inputSurname');
  inputUser.classList.add('inputUser');
  inputMail.classList.add('inputMail');
  inputPassword.classList.add('inputPassword');
  inputPassword2.classList.add('inputPassword2');
  inputAge.classList.add('inputAge');
  inputNationality.classList.add('inputNationality');
  inputResident.classList.add('inputResident');
  //
  inputName.setAttribute('placeholder', 'Nombre');
  inputSurname.setAttribute('placeholder', 'Apellido');
  inputUser.setAttribute('placeholder', 'Usuario');
  inputMail.setAttribute('placeholder', 'Email');
  inputPassword.setAttribute('placeholder', 'Crear Contraseña');
  inputPassword2.setAttribute('placeholder', 'Repetir contraseña');
  inputAge.setAttribute('placeholder', 'Edad');
  inputNationality.setAttribute('placeholder', 'Nacionalidad');
  inputResident.setAttribute('placeholder', 'Reside en Chile');
  // Boton para volver a home
  const buttonHome = document.createElement('button');
  buttonHome.innerText = 'Volver al inicio';
  buttonHome.classList.add('buttonHome');
  const a = document.createElement('a');
  a.setAttribute('href', '#/home');
  //
  const divContenedor = document.createElement('div');
  //
  divContenedor.appendChild(inputName);
  divContenedor.appendChild(inputSurname);
  divContenedor.appendChild(inputUser);
  divContenedor.appendChild(inputMail);
  divContenedor.appendChild(inputPassword);
  divContenedor.appendChild(inputPassword2);
  divContenedor.appendChild(inputAge);
  divContenedor.appendChild(inputNationality);
  divContenedor.appendChild(inputResident);
  //
  //
  return divContenedor;
};
