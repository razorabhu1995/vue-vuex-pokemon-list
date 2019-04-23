import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   pokemons : null
  },
  mutations: {
   getPokemons(state, pokemons){
      state.pokemons = pokemons
   }
  },
  actions: {

  }
})
