// Token id : pat3s9r2QAvq4ld8W
// The ID of this base : appSuJ2PifwGW29XD.


// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "your-api-key-here",
//   authDomain: "your-project-id.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project-id.appspot.com",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
//firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgYaDMEiWewG1k62FBQ8FROUcD9Wy_PeY",
  authDomain: "event-management-system-ind.firebaseapp.com",
  projectId: "event-management-system-ind",
  storageBucket: "event-management-system-ind.firebasestorage.app",
  messagingSenderId: "446627397550",
  appId: "1:446627397550:web:0b7257734434df6987923f",
  measurementId: "G-CDHBERKERK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
