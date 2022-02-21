export const register = () => {
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

  // inputPassword.setAttribute('pattern', '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
  //inputPassword.setAttribute('title','Debe contener al menos un número y una letra mayúsculay minúscula,y al menos 8 o más caracteres');

  inputPassword2.setAttribute('placeholder', 'Repetir contraseña');
  // inputPassword2.setAttribute('pattern', '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
  // inputPassword2.setAttribute('title', 'Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres');
  inputPassword2.setAttribute('type', 'password');
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
  submit.innerHTML = 'Register';
  //
  const divContenedor = document.createElement('form'); // ya no es un div sino un form
  divContenedor.classList.add('signup');
  //
  // divContenedor.appendChild(inputName);
  // divContenedor.appendChild(inputSurname);
  // divContenedor.appendChild(inputUser);
  divContenedor.appendChild(inputMail);
  divContenedor.appendChild(inputPassword);
  divContenedor.appendChild(inputPassword2);
  // divContenedor.appendChild(inputAge);
  // divContenedor.appendChild(inputNationality);
  // divContenedor.appendChild(inputResident);
  // divContenedor.appendChild(inputResident);
  divContenedor.appendChild(submit);

  return divContenedor;
};
