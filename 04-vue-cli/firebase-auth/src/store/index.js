import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import router from '../router'

Vue.use(Vuex)

const usuarioLogged = (commit, payload) => {

  if (payload != null) {
    const { email, uid } = payload
    commit('setUsuario', { email, uid })
  }else {
    commit('setUsuario', null)
  }


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
        .then(res => {
          usuarioLogged(commit, res.user)
          router.push({ name: 'inicio' })
        })
        .catch(function (error) {
          console.log(error.message)
          commit('setError', error.message)
        });
    },

    ingresoUsuario({commit}, payload){
      const { email, password } = payload
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          usuarioLogged(commit, res.user)
          router.push({ name: 'inicio' })
        })
        .catch(function (error) {
          console.log(error.message)
          commit('setError', error.message)
        });
    },

    detectarUsuario({commit}, payload){
      
      usuarioLogged(commit, payload)

    },

    cerrarSesion({commit}){
      firebase.auth().signOut()
      commit('setUsuario', null)
      router.push({ name: 'ingreso' })
    }

  },
  modules: {
  },
  getters: {
    existeUsuario(state){
      return !(state.usuario === null || state.usuario === undefined || state.usuario === '')
    }
  }
})
