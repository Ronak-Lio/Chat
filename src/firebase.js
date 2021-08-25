import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAgbQqn0mtAN7269I16EUIpqWlHJIV-lqs",
    authDomain: "chat-be7ee.firebaseapp.com",
    projectId: "chat-be7ee",
    storageBucket: "chat-be7ee.appspot.com",
    messagingSenderId: "29940358799",
    appId: "1:29940358799:web:2d1b840c87cd660ebe5afa"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth , provider , storage };

  export default db;