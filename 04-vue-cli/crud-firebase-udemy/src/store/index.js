import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea:{}
  },
  mutations: {
    setTareas(state, tareas){
      state.tareas = tareas
    },
    setTarea(state,tarea){
      state.tarea = tarea
    },
    removerTarea(state, id){
      state.tareas = state.tareas.filter(item => {
        return item.id !== id
      })
    }
  },
  actions: {

    getTareas: async ({commit}) => {
      let tareas = []
      const snapshots = await db.collection('tareas').get()

      snapshots.forEach(doc => {
        tareas.push({
          id: doc.id,
          ...doc.data(),
        })
      });

      commit('setTareas', tareas)
    },

    getTarea: async ({commit}, id) => {

      const doc = await db.collection('tareas').doc(id).get()

      commit('setTarea', {
        id: doc.id,
        ...doc.data(),
      })

    },

    editarTarea({commit}, {id, nombre}){
      db.collection('tareas').doc(id).update({
        nombre
      })
      .then(() => {
        router.push({name:'inicio'})
      })
    },

    agregarTarea({commit}, nombre){

      db.collection('tareas').add({nombre})
        .then(doc => {
          router.push({ name: 'inicio' })
        })

    },

    eliminarTarea({commit}, id){
      db.collection('tareas').doc(id).delete()
        .then(() => {

          console.log('Tarea eliminada')

          commit('removerTarea', id)

        })
    }

  },
  modules: {
  }
})
