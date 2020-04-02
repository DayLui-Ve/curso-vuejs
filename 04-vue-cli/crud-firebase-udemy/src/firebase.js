import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCFSfRtF-cchEPv1FkJwWZ6iOOoQ5epqpM",
    authDomain: "crud-udemy-luijo.firebaseapp.com",
    databaseURL: "https://crud-udemy-luijo.firebaseio.com",
    projectId: "crud-udemy-luijo",
    storageBucket: "crud-udemy-luijo.appspot.com",
    messagingSenderId: "95618741045",
    appId: "1:95618741045:web:66968c746574738ac2527c"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app.firestore();