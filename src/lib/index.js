// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// import { firestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  singIn,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(app);
export const user = auth.currentUser;

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

// Funcion para registrarte
export const signUp = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: name,
        userEmail: email,
      });
      alert('Usuario Registrado');
      window.location.hash = '#/login';
      emailCheck();
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      alert('Correo ya registrado');
      // ..
    });

  // Envía un mensaje de verificación a un usuario
//   const emailCheck = () => {
//     sendEmailVerification(auth.currentUser)
//       .then(() => {
//         // Email verification sent!
//         console.log('Correo enviado');
//         alert('Hemos enviado un correo de verificación para validar tu cuenta');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

// Iniciar sesión con correo registrado
export const singIn = (emailRegister, passwordRegister) => {
  signInWithEmailAndPassword(auth, emailRegister, passwordRegister)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
      window.location.hash = '#/wallpage';
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      alert('Correo o contraseña inválidos');
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// Iniciar sesión con Google
export const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      console.log('Inicio de sesión con Google');
      window.location.hash = '#/wallpage';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
      // ...
      console.log(errorMessage);
    });
};

// Función observador que nos sirve para autenticar al usuario
export const onAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null && user.emailVerified === true) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const emailUser = user.email;
      const emailVerified = user.emailVerified;
      window.location.hash = '#/wallpage';
      console.log('auth:sing in');
    } else {
      if (!window.location.hash.includes('register')) {
        window.location.hash = '#/login';
      }
      // User is signed out
      console.log('auth: sign out');
    }
  });
};

// Funciones de Firestore

// Agregar datos de post
export const addPost = async (inputTitle, inputReview) => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    title: inputTitle,
    description: inputReview,
    datepost: Date.now(),
    likes: [],
    likesCounter: 0,
  });
  console.log('Document written with ID: ', docRef.id);

  return docRef;
};

// Leer datos de post
export const readPost = () => {
  const q = query(collection(db, 'posts'), orderBy('datepost', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const boxPost = [];
    querySnapshot.forEach((doc) => {
      boxPost.push({
        id: doc.id,
        data: doc.data(),
        title: doc.data.title,
        description: doc.data.description,
      });
    });
    printPosts(boxPost);
    console.log('title', 'description', boxPost.join(', '));
    return boxPost;
  });
};

// Borrar datos
export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
  console.log(await deleteDoc);
};

// Editar datos
export const editPost = async (id, inputTitle, inputReview) => {
  const refreshPost = doc(db, 'posts', id);
  await updateDoc(refreshPost, {
    title: inputTitle,
    description: inputReview,
  });
};

// Dar likes y contador de likes
export const likePost = async (id, userLike) => {
  const likeRef = doc(db, 'posts', id);
  const docSnap = await getDoc(likeRef);
  const postData = docSnap.data();
  const likesCount = postData.likesCounter;

  if (postData.likes.includes(userLike)) {
    await updateDoc(likeRef, {
      likes: arrayRemove(userLike),
      likesCounter: likesCount - 1,
    });
  } else {
    await updateDoc(likeRef, {
      likes: arrayUnion(userLike),
      likesCounter: likesCount + 1,
    });
  }
};
}