// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// // import { firestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

import {
  getFirestore,

} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // sendEmailVerification,
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

const app = initializeApp(firebaseConfig);

// // Initialize Firebase

export const auth = getAuth(app);

export const eventsRegister = () => {
  const signupForm = document.querySelector('.signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('User created: ', cred.user);
        signupForm.reset();

        window.location.hash = '#/home';
      }).catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  });
};
// export const logout = () => {
//   const logoutButton = document.querySelector('.logout');
//   logoutButton.addEventListener('click', () => {
//     signOut(auth)
//       .then(() => {
//         console.log('el usuario salió');

//         window.location.hash = '';
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   });
// };

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
        console.log('user logged in:', cred.user);

        window.location.hash = '#/wall';
      })
      .catch((err) => {
        console.log(err.message);
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
  // window.location.hash = '#/wall';
});
// export const passwordRecovery = () => {
//   const emailAddress = document.querySelector('#email3').value;
//   auth.sendPasswordResetEmail(emailAddress).then(() => {
//     document.querySelector('.result').innerHTML = 'Tu email fue enviado con exito';
//     // Email sent.
//     window.location.hash = '';
//   }).catch((error) => {
//     // An error happened.
//     document.querySelector('.result').innerHTML = error.message;
//     window.location.hash = '';
//   });
// };
