// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// // import { firestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

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
  // setDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  // sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  // isSignInWithEmailLink,
  // signInWithEmailLink,
  // sendPasswordResetEmail,
  // updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
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
// realizar un like
export function likePost(Post) {
  updateDoc(Post, { likes: arrayUnion(sessionStorage.getItem('idUserLogin')) });
  return updateDoc(Post, { likesCounter: increment(1) });
}
// eliminar un like
export function unlikePost(Post) {
  updateDoc(Post, { likes: arrayRemove(sessionStorage.getItem('idUserLogin')) });
  return updateDoc(Post, { likesCounter: increment(-1) });
}

export async function showPost() {
  const postAll = query(collection(firestore, 'Post'), orderBy('datepost', 'desc'));
  // const postAll = firestore.collection('Post');

  const querySnapshot = await getDocs(postAll);
  const container = document.getElementById('Container');
  const sectionPost = document.querySelector('#allPost');
  sectionPost.innerHTML = '';
  querySnapshot.forEach((documento) => {
    console.log(documento.id, '=>', documento.data());
    // const container = document.getElementById('Container');
    // const sectionPost = document.querySelector('#allPost');
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');
    const pPost = document.createElement('p');
    const h1Post = document.createElement('h1');
    h1Post.classList.add('h1Post');
    pPost.classList.add('pPost');
    const buttonLike = document.createElement('button');
    buttonLike.classList.add('like');
    // buttonLike.innerHTML = '🤍';
    // buttonLike.innerHTML = '💗';
    // intento de escuchar y cambiar el clic
    // buttonLike.innerHTML = `🤍 ${doc.data().likesCounter}`;
    if (documento.data().likes.includes(sessionStorage.getItem('idUserLogin'))) {
      buttonLike.innerHTML = `💗 ${documento.data().likesCounter}`;
    } else {
      buttonLike.innerHTML = `🤍 ${documento.data().likesCounter}`;
    }
    buttonLike.addEventListener('click', async () => {
      if (documento.data().likes.includes(sessionStorage.getItem('idUserLogin'))) {
        buttonLike.innerHTML = `🤍 ${documento.data().likesCounter - 1}`;
        await unlikePost(doc(firestore, 'Post', documento.id));
        showPost();
      } else {
        await likePost(doc(firestore, 'Post', documento.id));
        buttonLike.innerHTML = `💗 ${documento.data().likesCounter + 1}`;
        showPost();
      }
    });

    h1Post.innerHTML = documento.data().name;
    pPost.innerHTML = documento.data().comentUser;
    divPost.appendChild(h1Post);
    divPost.appendChild(pPost);
    divPost.appendChild(buttonLike);
    sectionPost.appendChild(divPost);
    container.appendChild(sectionPost);
  });
}
//
//

export async function editDeletePost() {
  const postAll = query(collection(firestore, 'Post'), where('userId', '==', sessionStorage.getItem('idUserLogin')), orderBy('datepost', 'desc'));
  // const postAll = query(collection(firestore, 'Post'), orderBy('datepost', 'desc'));

  const querySnapshot = await getDocs(postAll);
  const container = document.getElementById('Container');
  const sectionPost = document.querySelector('#allPost');
  sectionPost.innerHTML = '';
  console.log('cantidad de datos de la base de datos ', querySnapshot.length);
  querySnapshot.forEach((documento) => {
    console.log(documento.id, '=>', documento.data());
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');
    const pPost = document.createElement('p');
    const h1Post = document.createElement('h1');
    h1Post.classList.add('h1Post');
    pPost.classList.add('pPost');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonDelete.classList.add('delete');
    buttonDelete.addEventListener('click', async () => {
      const isBoss = confirm("¿Desea borrar este post?");
      if (isBoss) {
        await deleteDoc(doc(firestore, 'Post', documento.id));
        console.log('post borrado');
        editDeletePost();
      } else {
        editDeletePost();
      }
    });
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
    window.location.hash = '#/editPost';
  });
}
//
export async function createPost(postForm) {
  console.log('createpost antes de collection');
  try {
    const docRef = await addDoc(collection(firestore, 'Post'), {
      userId: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      comentUser: postForm.coment.value,
      datepost: Timestamp.fromDate(new Date()),
      likes: [],
      likesCounter: 0,
    });
    console.log('documento escrito con id', docRef.id);
    postForm.reset();
    // postForm.innerHTML = '';
    showPost();
  } catch (err) {
    console.log('error : ', err);
  }
}

export const eventsRegister = () => {
  const warnings = document.getElementById('warning');
  const signupForm = document.querySelector('.divFormulario');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const password2 = signupForm.password2.value;
    if (password === password2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('User created: ', cred.user);
          emailCheck();
          signupForm.reset();

          window.location.hash = '#/home';
        }).catch((err) => {
          console.log(err.message);
          switch (err.message) {
            case 'Firebase: Error (auth/invalid-email).':
              warnings.innerHTML = 'el formato del correo es inválido';
              console.log('warning', warnings);
              // alert('el formato del correo es inválido');
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              warnings.innerHTML = 'El correo ingresado ya está registrado';
              // alert('El correo ingresado ya está registrado');
              break;
            default:
          }

          // alert(err.message);
        });
    } else {
      warnings.innerHTML = 'Ambas contraseñas deben ser iguales';
      // alert('Ambas contraseñas deben ser iguales');
    }
  });
};
export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('el usuario salió');
      sessionStorage.clear();
      window.location.hash = '#/home';
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const login = () => {
  const loginForm = document.querySelector('.containerForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('cred:', cred);
        // console.log('user logged in:', cred.user);
        const user = cred.user;
        sessionStorage.setItem('idUserLogin', user.uid);
        console.log('imprimo el user iud del storage', sessionStorage.getItem('idUserLogin'));
        console.log('imprimo user', user);
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
          // case 'Firebase: Error (auth/internal-error).':
          //   alert('El ingreso de contraseña es obligatorio.');
          //   break;
          // case 'Firebase: Error (auth/invalid-email).':
          //   alert('Debe ingresar un correo validado');
          //   break;
          default:
        }
      });
  });
};
export const checkgoogle = () => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // console.log('imprimo el user id', user.uid);
      sessionStorage.setItem('idUserLogin', user.uid);
      console.log('imprimo el user iud del storage', sessionStorage.getItem('idUserLogin'));

      console.log(token, user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      // ...
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
