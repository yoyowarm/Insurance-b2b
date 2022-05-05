import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard, faCalendarAlt, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import {
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faPlusCircle,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faInfoCircle, faClipboard, faExclamationCircle, faCalendarAlt, faTimesCircle, faPlusCircle, faAngleDown, faAngleLeft, faAngleRight, faExternalLinkAlt, faArrowUp, faTrashAlt)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
