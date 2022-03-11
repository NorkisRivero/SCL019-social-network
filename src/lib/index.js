/* -------------------DIFERENCIA ENTRE SESSIONSTORAGE Y LOCALSTORAGE-----------
la única diferencia es que la información almacenada en localStorage
no posee tiempo de expiración, por el contrario la información almacenada en sessionStorage
 es eliminada al finalizar la sesion de la página. La sesión de la página perdura mientras
  el navegador se encuentra abierto, y se mantiene por sobre las recargas y reaperturas de la página
*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
  updateDoc,
  increment,
  doc,
  orderBy,
  where,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

// Importamos todas las funciones de firebase que vamos a utilizar
// Configuracion del proyecto en firebase
// Copiamos directamente la configuracion de firebase

const firebaseConfig = {
  apiKey: 'AIzaSyANmHTIUeRiBP9UGcDmCJS82HoT68JwM7E',
  authDomain: 'social-network-migraruni-950b7.firebaseapp.com',
  projectId: 'social-network-migraruni-950b7',
  storageBucket: 'social-network-migraruni-950b7.appspot.com',
  messagingSenderId: '185329185729',
  appId: '1:185329185729:web:b6929fde86929fe2f9f540',
};

// inicializacion de base de datos y firestore

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

export const auth = getAuth(app);

// Envía un mensaje de verificación a un usuario

const emailCheck = () => {
  // envia un  mail de autenticacion al correo indicado por el usuario
  // Para autenticarse
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      console.log('Correo enviado');
      alert('Hemos enviado un correo de verificación para validar tu cuenta. Es necesario que lo valide para iniciar sesión');
    })
    .catch((error) => {
      console.log(error);
    });
};
// ---------------------------------------- Inicio de funciones de la pagina-------------------
// realizar un like
export function likePost(Post) {
  // la funcion updateDoc recibe una referencia al objeto en la base de datos
  // updateDoc actualiza los atributos de likes y likesCounter
  // sessionStorage.getItem('idUserLogin') guarda en la variable llamada idUserLogin el valor
  // del id del usuario que está logueado
  // Se agrega al array llamado likes[] el id del usuario logueado para registrar quienes han dado
  // like en el post
  updateDoc(Post, { likes: arrayUnion(sessionStorage.getItem('idUserLogin')) });
  // se incrementa en 1 el atributo likesCounter (variable numerica)del post.

  return updateDoc(Post, { likesCounter: increment(1) });
}
//------------------------------------------------------------
// eliminar un like
export function unlikePost(Post) {
  // updateDoc actualiza los atributos de likes y likesCounter
  // se remueve del array likes[] el id del user que está almacenado en sessionStorage
  updateDoc(Post, { likes: arrayRemove(sessionStorage.getItem('idUserLogin')) });
  // se decrementa la variable likesCounter
  return updateDoc(Post, { likesCounter: increment(-1) });
}
//------------------------------------------------------------
// Funcion que muestra todos los post

export async function showPost() {
  // mediante una query(consulta a base de datos) obtengo todos los post
  // en orden descendiente por fecha de creacion
  const postAll = query(collection(firestore, 'Post'), orderBy('datepost', 'desc'));
  // mediante get Docs(intenta proporcionar datos actualizados
  // cuando es posible esperando datos del servidor,
  // pero puede devolver datos almacenados en caché o fallar si está desconectado
  // y no se puede acceder al servidor)

  const querySnapshot = await getDocs(postAll);
  // llamamos al div Container del html y a la section de id allPost
  const container = document.getElementById('Container');
  const sectionPost = document.querySelector('#allPost');
  sectionPost.innerHTML = ''; // retiramos cualquier indicio de elemento anterior de la section
  // Realizamos un forEach de cada dato proporcionado por firestore
  // tantas vueltas como documento hayan.
  querySnapshot.forEach((documento) => {
    // imprimimos por consola cada post
    console.log(documento.id, '=>', documento.data());
    // creamos los elementos para guardar los atributos del post
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');
    const pPost = document.createElement('h1');
    const h1Post = document.createElement('h1');
    h1Post.classList.add('h1Post');
    pPost.classList.add('pPost');
    const buttonLike = document.createElement('button');
    buttonLike.classList.add('like');
    // si el id del usuario está en el array likes
    // quiere decir que ya ha dado like a la publicacion
    // y aparece el corazon rojo.
    // caso contrario, el corazon es blanco
    if (documento.data().likes.includes(sessionStorage.getItem('idUserLogin'))) {
      buttonLike.innerHTML = `💗 ${documento.data().likesCounter}`;
    } else {
      buttonLike.innerHTML = `🤍 ${documento.data().likesCounter}`;
    }
    // al hacer clic, si el usuario ya le ha dado clic anteriormente
    // es decir, su id está incluido en el array likes[]
    // el corazon del boton cambia a blanco, y se imprime en el boton el contador menos 1 y
    // viceversa
    // para luego llamar a la funcion unlikePost
    buttonLike.addEventListener('click', async () => {
      if (documento.data().likes.includes(sessionStorage.getItem('idUserLogin'))) {
        buttonLike.innerHTML = `🤍 ${documento.data().likesCounter - 1}`;
        // Obtiene una instancia de DocumentReference que hace referencia al documento
        // en la ruta de acceso absoluta especificada.
        await unlikePost(doc(firestore, 'Post', documento.id)); // doc(firestore, ruta, rutaSegmentos)
        showPost(); // vuelvo a llamar a showPost para que me actualize los post
      } else {
        await likePost(doc(firestore, 'Post', documento.id)); // doc(firestore, ruta, rutaSegmentos)
        buttonLike.innerHTML = `💗 ${documento.data().likesCounter + 1}`;
        showPost(); // vuelvo a llamar a showPost para que me actualize los post
      }
    });
    // se agrega al div contenedor todos los elementos
    h1Post.innerHTML = documento.data().name;
    pPost.innerHTML = documento.data().comentUser;
    divPost.appendChild(h1Post);
    divPost.appendChild(pPost);
    divPost.appendChild(buttonLike);
    sectionPost.appendChild(divPost);
    container.appendChild(sectionPost);
  });
}
//-------------------------------------------------------------
// funcion para editar o eliminar un post

export async function editDeletePost() {
  // traemos con una query los post donde el id del user coincida con el id guardado en la
  // variable del sessionStorage idUserLogin, ordenados de forma descendente (ordenados por fecha)
  // de la mas reciente a la mas antigua
  // Para ello se tuvo que crear un indice en firestore (Firestore Database / indices)
  const postAll = query(collection(firestore, 'Post'), where('userId', '==', sessionStorage.getItem('idUserLogin')), orderBy('datepost', 'desc'));
  // mediante get Docs(intenta proporcionar datos actualizados
  // cuando es posible esperando datos del servidor,
  // pero puede devolver datos almacenados en caché o fallar si está desconectado
  // y no se puede acceder al servidor)
  const querySnapshot = await getDocs(postAll);
  const container = document.getElementById('Container');
  const sectionPost = document.querySelector('#allPost1');
  sectionPost.innerHTML = '';
  // forEach de los post del usuario logueado
  querySnapshot.forEach((documento) => {
    console.log(documento.id, '=>', documento.data());
    // creacion de los elementos para contener los atributos de cada post
    const divPost = document.createElement('div');
    divPost.classList.add('divPost1');
    const pPost = document.createElement('p');
    const h1Post = document.createElement('h1');
    h1Post.classList.add('h1Post');
    pPost.classList.add('pPost');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');
    const buttonClose = document.createElement('button');
    buttonClose.classList.add('close');
    buttonClose.innerHTML = 'Cerrar';
    buttonEdit.classList.add('edit');
    buttonDelete.classList.add('delete');

    buttonDelete.addEventListener('click', async () => {
      // alerta de confirmacion de borrado de post
      const closeConfirm = confirm('¿Desea borrar este post?');
      if (closeConfirm) {
        // deleteDoc
        await deleteDoc(doc(firestore, 'Post', documento.id));
        console.log('post borrado');
        editDeletePost(); // llama a la funcion para recargar los post editados u eliminados
      } else {
        editDeletePost();// llama a la funcion para recargar los post editados u eliminados
      }
    });

    buttonEdit.addEventListener('click', () => {
      // se crea un form que contendrá un input con el texto a editar
      const form = document.createElement('form');
      form.setAttribute('id', 'idForm');
      const inputComent = document.createElement('input');
      inputComent.setAttribute('type', 'text');
      inputComent.setAttribute('name', 'inputC');

      // en el atributo value, guardamos el comentario del usuario para que lo pueda editar

      inputComent.setAttribute('value', `${documento.data().comentUser}`);// ${} simbología para mostrar el valor de elemento
      console.log(` el valor de la variable es: ${documento.data().comentUser}`);
      const submitButton = document.createElement('button');
      submitButton.innerHTML = 'Guardar edicion';
      // se establece la sintaxis (Sintaxis HTMLLa sintaxis de un lenguaje
      // es el "conjunto de reglas que definen las secuencias
      // correctas de los elementos de un lenguaje)
      form.appendChild(inputComent);
      form.appendChild(submitButton);
      form.appendChild(buttonClose);
      divPost.appendChild(form);
      // al hacer clic en guardar edicion
      // creamos dos constantes formId para rescatar el form creado y obtener así
      // el valor de su input y otra para guardar ese valor del name del input
      submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const formId = document.getElementById('idForm');
        const coment = formId.inputC.value;
        console.log('valor input coment', coment);
        // con el updateDoc actualizo el post
        // El doc Obtiene una instancia de DocumentReference que hace referencia al documento
        // en la ruta de acceso absoluta especificada.
        await updateDoc(doc(firestore, 'Post', documento.id), {
          comentUser: coment,
        });
        console.log('post editado');
        // redirijo al muro
        window.location.hash = '#/wall';
      });
    });
    // Al hacer clic en el boton close, cierro el form y me redirijo al muro
    buttonClose.addEventListener('click', () => {
      const formId = document.getElementById('idForm');
      formId.innerHTML = '';
      window.location.hash = '#/wall';
    });
    // guardo todos los elementos en el contenedor.
    h1Post.innerHTML = documento.data().name;
    pPost.innerHTML = documento.data().comentUser;
    buttonDelete.innerHTML = 'Borrar post';
    buttonEdit.innerHTML = 'Editar post';
    divPost.appendChild(h1Post);
    divPost.appendChild(pPost);
    divPost.appendChild(buttonDelete);
    divPost.appendChild(buttonEdit);
    sectionPost.appendChild(divPost);
    container.appendChild(sectionPost);
    // redirijo a ediPost
    window.location.hash = '#/editPost';
  });
}
//----------------------------------------------------------------------------
// funcion create post
export async function createPost(postForm) {
  // La declaración try...catch señala un bloque de instrucciones a intentar (try)
  // y especifica una respuesta si se produce una excepción (catch).
  try {
    let nameUser;
    // si el usuario se registró sin google (es decir no se guardó su displayName)
    // al momento de crear el post
    // su nombre será el email.
    if (auth.currentUser.displayName === null) {
      nameUser = auth.currentUser.email;
    } else {
      nameUser = auth.currentUser.displayName;
    }
    // addDoc Agregue un nuevo documento a la CollectionReference especificada con los datos
    // proporcionados asignándole una ID de documento automáticamente.
    const docRef = await addDoc(collection(firestore, 'Post'), {
      // especificamos los atributos que contendrá la coleccion
      userId: auth.currentUser.uid,
      name: nameUser,
      email: auth.currentUser.email,
      comentUser: postForm.coment.value,
      // Guarda en la base de datos la fecha en formato legible
      datepost: Timestamp.fromDate(new Date()),
      likes: [], // se guardará los id de los user que hagan like en el post
      likesCounter: 0, // contará los like
    });
    console.log('documento escrito con id', docRef.id);
    postForm.reset(); // Se limpia el input del formulario del post
    showPost(); // llama a la funcion showPost()
  } catch (err) {
    console.log('error : ', err);
  }
}
//-----------------------------------------------------------
// funcion para registrar un usuario
export const eventsRegister = () => {
  // uso warning para luego mostrar un error
  const warnings = document.getElementById('warning');
  const signupForm = document.querySelector('.divFormulario');
  // al hacer clic para registrarse se crean constantes para guardar
  // los valores del name de los inputs
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita el comportamiento por defecto
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const password2 = signupForm.password2.value;
    if (password === password2) {
      // registra el mail y la contraseña
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('User created: ', cred.user);
          // llamamos a la funcion emailcheck para que confirme el correo
          emailCheck();
          signupForm.reset();
          // guardo en el localStorage el email en la variable nameUserRegister
          // para luego utilizar el email.
          localStorage.setItem('nameUserRegister', email);
          // redirecciono la url a #/home
          window.location.hash = '#/home';
        }).catch((err) => {
          console.log(err.message);
          // En caso de algun error, dependendiendo del mismo, se muestra
          // algunos mensajes de error por innerHtml
          switch (err.message) {
            case 'Firebase: Error (auth/invalid-email).':
              warnings.innerHTML = 'el formato del correo es inválido';
              console.log('warning', warnings);
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              warnings.innerHTML = 'El correo ingresado ya está registrado';
              break;
            default:
          }
        });
    } else {
      warnings.innerHTML = 'Ambas contraseñas deben ser iguales';
    }
  });
};
// ---------------------------------- Login logout checkgoogle IniciarGoogle-------------------
export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('el usuario salió');
      // El clear elimina todos los registros del almacen local.
      sessionStorage.clear();
      // redirecciona al #/home
      window.location.hash = '#/home';
    })
    .catch((err) => {
      console.log(err.message);
    });
};
//--------------------------------------------------
export const login = () => {
  // busca el formulario
  const loginForm = document.querySelector('.containerForm');
  // Al darle clic a iniciar sesion
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evito el comportamiento por defecto
    // guardo el valor del name de los inputs
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    // llamo a la funcion del firebase pasandole email y contraseña
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('cred:', cred);
        const user = cred.user;
        // Guardo el id del usuario logueado en la variable idUserLogin del sessionStorage
        sessionStorage.setItem('idUserLogin', user.uid);
        console.log('imprimo el user iud del storage', sessionStorage.getItem('idUserLogin'));
        console.log('imprimo user', user);
        // Si el atributo emailVerified es true lo redirecciono al wall sino al home
        // mostrandole un alert
        if (user.emailVerified) {
          window.location.hash = '#/wall';
        } else {
          window.location.hash = '#/home';
          alert('usuario no verificado');
        }
      })
      .catch((err) => {
        console.log(err.message);
        switch (err.message) {
          case 'Firebase: Error (auth/user-not-found).':
            alert('El correo ingresado no está registrado.');
            break;
          case 'Firebase: Error (auth/wrong-password).':
            alert('la contraseña ingresada es incorrecta');
            break;
          case 'Firebase: Error (auth/internal-error).':
            alert('El ingreso de contraseña es obligatorio.');
            break;
          case 'Firebase: Error (auth/invalid-email).':
            alert('Debe ingresar un correo validado');
            break;
          default:
        }
      });
  });
};
//-----------------------------------------------------
export const checkgoogle = () => {
  getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      // guardo el id del usuario que se está logueando en la variable idUserLogin
      // del sessionStorage
      sessionStorage.setItem('idUserLogin', user.uid);
      console.log('imprimo el user iud del storage', sessionStorage.getItem('idUserLogin'));

      console.log(token, user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};

// autentifizacion de cambios de estado
const provider = new GoogleAuthProvider();

export const Iniciargoogle = () => {
  signInWithRedirect(auth, provider);
  window.location.hash = '#/wall';
};
onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user);
  checkgoogle(auth);
});
