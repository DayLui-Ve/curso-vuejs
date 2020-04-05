import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from "firebase/app";

// Add the Firebase products that you want to use
require("firebase/auth");
// require("firebase/firestore");

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
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  console.log(user.email)
  console.log(user.uid)
  if (user) {
    const { email, uid } = user
    store.dispatch('detectarUsuario', { email, uid })
  }else{
    
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
