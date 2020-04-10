import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import router from '../router'

import db from '../main'

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
    tareas: [],
    tarea: {},
  },
  mutations: {

    setUsuario(state, payload){
      state.usuario = payload
    },

    setError(state, payload){
      state.error = payload
    },

    setTareas(state, tareas) {
      state.tareas = tareas
    },
    setTarea(state, tarea) {
      state.tarea = tarea
    },
    removerTarea(state, id) {
      state.tareas = state.tareas.filter(item => {
        return item.id !== id
      })
    },

  },
  actions: {

    crearUsuario({commit}, payload){
      const { email, password } = payload
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          usuarioLogged(commit, res.user)
          router.push({ name: 'inicio' })

          // Crear una colección
          db.collection(res.user.email).add({ nombre: 'Tarea de ejemplo' })
            .then(() => {
              router.push({name:'inicio'})
            })

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
    },

    getTareas: async ({ commit, state }) => {
      let tareas = []
      const snapshots = await db.collection(state.usuario.email).get()

      snapshots.forEach(doc => {
        tareas.push({
          id: doc.id,
          ...doc.data(),
        })
      });

      commit('setTareas', tareas)
    },

    getTarea: async ({ commit, state }, id) => {

      const doc = await db.collection(state.usuario.email).doc(id).get()

      commit('setTarea', {
        id: doc.id,
        ...doc.data(),
      })

    },

    editarTarea({ commit, state }, { id, nombre }) {
      db.collection(state.usuario.email).doc(id).update({
        nombre
      })
        .then(() => {
          router.push({ name: 'inicio' })
        })
    },

    agregarTarea({ commit, state }, nombre) {

      db.collection(state.usuario.email).add({ nombre })
        .then(doc => {
          router.push({ name: 'inicio' })
        })

    },

    eliminarTarea({ commit, state }, id) {
      db.collection(state.usuario.email).doc(id).delete()
        .then(() => {

          console.log('Tarea eliminada')

          commit('removerTarea', id)

        })
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
