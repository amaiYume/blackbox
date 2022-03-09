import  firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
const config = {
  apiKey: "AIzaSyASvM_QFRh0dOdsNcdtaLa1o-E4tMzRkgc",
  authDomain: "blackbox-61a97.firebaseapp.com",
  databaseURL: "https://blackbox-61a97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blackbox-61a97",
  storageBucket: "blackbox-61a97.appspot.com",
  messagingSenderId: "749325103804",
  appId: "1:749325103804:web:f26387ed2c436967b9d6b9",
  measurementId: "G-XZ0Y3NDEBY"
  
};

firebase.initializeApp(config);



  export default firebase;
  export const database = firebase.database().ref('users');
  export const auth = firebase.auth();

