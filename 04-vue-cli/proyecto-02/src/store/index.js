import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frutas:[
      {nombre:'Manzanas', cantidad:0},
      {nombre:'Naranja', cantidad:0},
      {nombre:'Pera', cantidad:0},
    ]
  },
  mutations: {
    aumentar(state, index){
      console.log(index)
      state.frutas[index].cantidad ++
    },
    reiniciarFruta(state, index){
      state.frutas[index].cantidad = 0
    }
  },
  actions: {
    reiniciar({commit, state}){
      state.frutas.forEach((fruta, index) => {
        commit('reiniciarFruta', index)
      })
    }
  },
  modules: {
  }
})
