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
  // doc,
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
// creacion de un registro llamado Post
// guardado del comentario
// se recomienda no usar setDoc y doc, salta error invalid document referencia error 94
// export async function createPost(postForm) {
//   console.log('createpost antes de collection');
//   try {
//     const docRef = await addDoc(collection(firestore, 'Post'), {
//       userId: auth.currentUser.uid,
//       name: auth.currentUser.displayName,
//       email: auth.currentUser.email,
//       comentUser: postForm.coment.value,
//       datepost: Timestamp.fromDate(new Date()),
//       likes: [],
//       likesCounter: 0,
//     });
//     console.log('documento escrito con id', docRef.id);
//     postForm.reset();
//     postForm.innerHTML = '';
//     showPost();
//   } catch (err) {
//     console.log('error : ', err);
//   }
// }
export async function showPost() {
  const postAll = query(collection(firestore, 'Post'));
  const querySnapshot = await getDocs(postAll);
  const container = document.getElementById('Container');

  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    // const container = document.getElementById('Container');
    const sectionPost = document.querySelector('#allPost');
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');
    const pPost = document.createElement('p');
    const h1Post = document.createElement('h1');
    h1Post.classList.add('h1Post');
    pPost.classList.add('pPost');
    const dateAll = doc.data();
    const buttonLike = document.createElement('button');
    buttonLike.classList.add('like');
    // buttonLike.innerHTML = '🤍';
    buttonLike.innerHTML = '💗';

    if (dateAll.hasOwnProperty('name')) {
      h1Post.innerHTML = doc.data().name;
      pPost.innerHTML = doc.data().comentUser;
    } else {
      h1Post.innerHTML = 'Anonymus';

      pPost.innerHTML = doc.data().comentUser;
    }
    divPost.appendChild(h1Post);
    divPost.appendChild(pPost);
    divPost.appendChild(buttonLike);
    sectionPost.appendChild(divPost);
    container.appendChild(sectionPost);
  });
}
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
    postForm.innerHTML = '';
    showPost();
  } catch (err) {
    console.log('error : ', err);
  }
}
// export const addPost = (buttonToPost) => {
//   console.log('add post antes de createpost');
//   createPost(buttonToPost.name.value);
// };

export const eventsRegister = () => {
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
              alert('el formato del correo es inválido');
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              alert('El correo ingresado ya está registrado');
              break;
            default:
          }

          // alert(err.message);
        });
    } else {
      alert('Ambas contraseñas deben ser iguales');
    }
    // createUser(email, password);
    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then((cred) => {
    //       console.log('User created: ', cred.user);
    //       emailCheck();
    //       signupForm.reset();

    //       window.location.hash = '#/home';
    //     }).catch((err) => {
    //       console.log(err.message);

    //       switch (err.message) {
    //         case 'Firebase: Error (auth/invalid-email).':
    //           alert('el formato del correo es inválido');
    //           break;
    //         default:
    //           break;
    //       }

  //       // alert(err.message);
  //     });
  // });
  });
};
export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('el usuario salió');

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
        console.log(user);
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
