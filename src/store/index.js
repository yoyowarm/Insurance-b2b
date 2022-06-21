import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//modules
import app from './app'
import home from './home'
import place from './place'
import activity from './activity'
import common from './common'
import resource from './resource'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['app', 'home', 'place', 'common'],
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
        period: state.place.period,
      },
      activity: {
        terms: state.activity.terms,
        period: state.activity.period,
      },
      common: {
        viewModel: state.common.viewModel,
        editModel: state.common.editModel,
      }
    }
  }
})

export default new Vuex.Store({
  modules: {
    app,
    home,
    place,
    activity,
    common,
    resource
  },
  plugins: [vuexLocal.plugin]
})
