import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
  },
  mutations: {
    setTareas(state, tareas){
      state.tareas = tareas
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
    }

  },
  modules: {
  }
})
