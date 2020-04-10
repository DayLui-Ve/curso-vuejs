import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from "firebase/app";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

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

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if (user) {
    const { email, uid } = user
    store.dispatch('detectarUsuario', { email, uid })
  }else{
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})
