import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import router from '../router'

Vue.use(Vuex)

const usuarioLogged = (commit, {email, uid}) => {
  commit('setUsuario', { email, uid })

  router.push({ name: 'inicio' })
}

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
  },
  mutations: {

    setUsuario(state, payload){
      state.usuario = payload
    },

    setError(state, payload){
      state.error = payload
    }

  },
  actions: {

    crearUsuario({commit}, payload){
      const { email, password } = payload
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => usuarioLogged(commit, res.user))
        .catch(function (error) {
          console.log(error.message)
          commit('setError', error.message)
        });
    },

    ingresoUsuario({commit}, payload){
      const { email, password } = payload
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => usuarioLogged(commit, res.user))
        .catch(function (error) {
          console.log(error.message)
          commit('setError', error.message)
        });
    },

    detectarUsuario({commit}, payload){

      usuarioLogged(commit, payload)

    }

  },
  modules: {
  }
})
