// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { firestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANmHTIUeRiBP9UGcDmCJS82HoT68JwM7E",
  authDomain: "social-network-migraruni-950b7.firebaseapp.com",
  projectId: "social-network-migraruni-950b7",
  storageBucket: "social-network-migraruni-950b7.appspot.com",
  messagingSenderId: "185329185729",
  appId: "1:185329185729:web:b6929fde86929fe2f9f540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
//Registro de nuevos usuarios

const auth = getAuth();
export const signUp = (email, password) => {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    updateProfile(auth.currentUser, {
      userEmail: email,
    });
    alert('Usuario Registrado');
    emailCheck();
  });
}

.catch((error) => {
  const errorCode = error.code;
  console.log(errorCode);
  const errorMessage = error.message;
  console.log(errorMessage);
  alert('Correo ya registrado');
  // ..
});


const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });