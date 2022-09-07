import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard, faCalendarAlt, faTrashAlt, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faPlusCircle,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faExternalLinkAlt,
  faMagnifyingGlass,
  faBriefcase,
  faEye,
  faEyeSlash,
  faPrint,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faInfoCircle, faClipboard, faExclamationCircle, faCalendarAlt, faTimesCircle, faPlusCircle, faAngleDown, faAngleUp, faAngleLeft, faAngleRight, faExternalLinkAlt, faArrowUp, faTrashAlt, faMagnifyingGlass, faBriefcase, faEye, faEyeSlash, faPrint, faPenToSquare)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
