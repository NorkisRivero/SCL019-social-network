// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// // import { firestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
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
      alert('Hemos enviado un correo de verificación para validar tu cuenta');
    })
    .catch((error) => {
      console.log(error);
    });
};
// creacion de un registro llamado users
// guardado del mail y contraseña del usuario
async function createUser(email, password) {
  const docRef = await addDoc(collection(firestore, 'users'), {
    emailUser: email,
    passwordUser: password,
  });
  console.log('documento escrito con id', docRef.id);
}

export const eventsRegister = () => {
  const signupForm = document.querySelector('.divFormulario');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUser(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('User created: ', cred.user);
        emailCheck();
        signupForm.reset();

        window.location.hash = '#/home';
      }).catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
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
});

// Autenticacion de mail
// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   url: 'localhost:3000/social-network-migraruni-950b7',
//   // This must be true.
//   handleCodeInApp: true,
//   iOS: {
//     bundleId: 'com.example.ios',
//   },
//   android: {
//     packageName: 'social-network-migraruni-950b7.firebaseapp.com',
//     installApp: true,
//     minimumVersion: '12',
//   },
//   dynamicLinkDomain: 'social-network-migraruni-950b7.firebaseapp.com',
// };
// export const sendLinkEMail = () => {
//   const signupForm = document.querySelector('.divFormulario');
//   signupForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = signupForm.email.value;
//     sendSignInLinkToEmail(auth, email, actionCodeSettings)
//       .then(() => {
//         // The link was successfully sent. Inform the user.
//         // Save the email locally so you don't need to ask the user for it again
//         // if they open the link on the same device.
//         window.localStorage.setItem('emailForSignIn', email);
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//         // ...
//       });
//   });
// };
// if (isSignInWithEmailLink(auth, window.location.href)) {
//   // Additional state parameters can also be passed via URL.
//   // This can be used to continue the user's intended action before triggering
//   // the sign-in operation.
//   // Get the email if available. This should be available if the user completes
//   // the flow on the same device where they started it.
//   let email = window.localStorage.getItem('emailForSignIn');
//   if (!email) {
//     // User opened the link on a different device. To prevent session fixation
//     // attacks, ask the user to provide the associated email again. For example:
//     email = window.prompt('Please provide your email for confirmation');
//   }
//   // The client SDK will parse the code from the link for you.
//   signInWithEmailLink(auth, email, window.location.href)
//     .then((result) => {
//       // Clear email from storage.
//       window.localStorage.removeItem('emailForSignIn');
//       console.log(result);
//       // You can access the new user via result.user
//       // Additional user info profile not available via:
//       // result.additionalUserInfo.profile == null
//       // You can check if the user is new or existing:
//       // result.additionalUserInfo.isNewUser
//     })
//     .catch((error) => {
//       console.log(error.code);
//       // Some error occurred, you can inspect the code: error.code
//       // Common errors could be invalid email and invalid or expired OTPs.
//     });
// }