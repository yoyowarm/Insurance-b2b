import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//modules
import app from './app'
import home from './home'
import place from './place'
import activity from './activity'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['app', 'home', 'place'],
  reducer: (state) => {
    return {
      app: {
      },
      home: {
        token: state.home.token,
        userInfo: state.home.userInfo,
      },
      place: {
        terms: state.place.terms,
      }
    }
  }
})

export default new Vuex.Store({
  modules: {
    app,
    home,
    place,
    activity
  },
  plugins: [vuexLocal.plugin]
})
