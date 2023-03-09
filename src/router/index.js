import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { routeMatch } from '@/utils/regex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
      }
    ]
  },
  {
    path: '/news',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //最新消息
        path: '/news/list',
        name: 'newsList',
        component: () => import(/* webpackChunkName: "about" */ '../views/NewsListView.vue')
      }
    ]
  },
  {
    path: '/product',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //商品資訊
        path: '/product/list',
        name: 'productList',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductListView.vue')
      }
    ]
  },
  {
    path: '/quotation-list',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //報價明細
        path: '/quotation-list',
        name: 'quotationList',
        component: () => import(/* webpackChunkName: "about" */ '../views/QuotationList.vue')
      },
    ]
  },
  {
    path: '/underwriting-list',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //核保明細
        path: '/underwriting-list',
        name: 'underwritingList',
        component: () => import(/* webpackChunkName: "about" */ '../views/QuotationList.vue')
      },
    ]
  },
  {
    path: '/place-quotation',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { // 場所報價第一步
        path: '/place-quotation/step1',
        name: 'place-quotation-step1',
        component: () => import(/* webpackChunkName: "about" */ '../views/PlaceQuotationStep1.vue')
      },
      { // 場所報價第二步
        path: '/place-quotation/step2',
        name: 'place-quotation-step2',
        component: () => import(/* webpackChunkName: "about" */ '../views/PlaceQuotationStep2.vue')
      },
      { // 場所報價第三步
        path: '/place-quotation/step3',
        name: 'place-quotation-step3',
        component: () => import(/* webpackChunkName: "about" */ '../views/PlaceQuotationStep3.vue')
      },
    ]
  },
  {
    path: '/activity-quotation',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { // 活動報價第一步
        path: '/activity-quotation/step1',
        name: 'activity-quotation-step1',
        component: () => import(/* webpackChunkName: "about" */ '../views/ActivityQuotationStep1.vue')
      },
      { // 活動報價第二步
        path: '/activity-quotation/step2',
        name: 'activity-quotation-step2',
        component: () => import(/* webpackChunkName: "about" */ '../views/ActivityQuotationStep2.vue')
      },
      { // 活動報價第三步
        path: '/activity-quotation/step3',
        name: 'activity-quotation-step3',
        component: () => import(/* webpackChunkName: "about" */ '../views/ActivityQuotationStep3.vue')
      },
    ]
  },
  {
    path: '/questionnaire-management',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { // 詢問表管理
        path: '/questionnaire-management',
        name: 'questionnaire-management',
        component: () => import(/* webpackChunkName: "about" */ '../views/QuestionnaireManagement.vue')
      }
    ]
  },
  {
    path: '/permissionSetting',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //權限設定
        path: '/',
        name: 'permissionSetting',
        component: () => import(/* webpackChunkName: "about" */ '../views/PermissionSetting.vue')
      }
    ]
  },
  {
    path: '/parameterSetting',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //參數設定 類別
        path: '/parameterSetting/category',
        name: 'parameterSetting-category',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/Category.vue')
      },
      { //參數設定 縣市最低保額
        path: '/parameterSetting/minimumAmount',
        name: 'parameterSetting-minimumAmount',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/MinimumAmount.vue')
      },
      {
        path: '/parameterSetting/basic-premium-setting',
        name: 'parameterSetting-basicPremiumSetting',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/BasicPremiumSetting.vue')
      },
      {
        path: '/parameterSetting/quote-separately',
        name: 'parameterSetting-quoteSeparately',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/QuoteSeparately.vue')
      },
      {
        path: '/parameterSetting/news-setting',
        name: 'parameterSetting-news-setting',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/NewsSetting.vue')
      },
      {
        path: '/parameterSetting/document-download-setting',
        name: 'parameterSetting-document-download-setting',
        component: () => import(/* webpackChunkName: "about" */ '../views/ParameterSetting/DocumentDownloadSetting.vue')
      }
    ]
  },
  {
    path: '/termsSetting',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //條款設定 建議條款
        path: '/termsSetting/proposedTerms',
        name: 'termsSetting-proposedTerms',
        component: () => import(/* webpackChunkName: "about" */ '../views/TermsSetting/ProposedTerms.vue')
      },
      { //條款設定 另行報價額度
        path: '/termsSetting/quotationAndWeight',
        name: 'termsSetting-quotationAndWeight',
        component: () => import(/* webpackChunkName: "about" */ '../views/TermsSetting/QuotationAndWeight.vue')
      },
      { //條款設定 另行報價和權重
        path: '/termsSetting/quotationAndAmount',
        name: 'termsSetting-quotationAndAmount',
        component: () => import(/* webpackChunkName: "about" */ '../views/TermsSetting/QuotationAndAmount.vue')
      }
    ]
  },
  {
    path: '/underwritingCooperation',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //核保明細階級設定
        path: '/underwritingCooperation/Level',
        name: 'underwritingCooperationLevel',
        component: () => import(/* webpackChunkName: "about" */ '../views/UnderwritingCooperation/Level.vue')
      },
      { //核保組織設定
        path: '/underwritingCooperation/Setting',
        name: 'underwritingCooperationSetting',
        component: () => import(/* webpackChunkName: "about" */ '../views/UnderwritingCooperation/Setting.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
})

router.beforeEach((to, from, next) => {
  const whitelist = ['/', '/news/list', '/product/list', '/underwriting-list']
  // if (to.path === '/place-quotation/step3' && (!store.state.common.orderNo && !store.state.common.mainOrderNo)) {
  //   next({ name: 'quotationList' })
  // }
  // if (to.path === '/activity-quotation/step3' && (!store.state.common.orderNo && !store.state.common.mainOrderNo)) {
  //   next({ name: 'quotationList' })
  // }
  if (!store.state.home.userInfo.permissions.includes(routeMatch(to.path)) && !whitelist.includes(to.path)) {
    next({ name: 'quotationList' })
  }
  if (to.path === '/place-quotation/step2' && from.path === '/place-quotation/step3') {
    next({ name: 'place-quotation-step3' })
  }
  if (to.path === '/activity-quotation/step2' && from.path === '/activity-quotation/step3') {
    next({ name: 'activity-quotation-step3' })
  }
  if (from.path === '/place-quotation/step3' && store.state.place.InsuranceActive == 0) {
    store.dispatch('place/clearAll')
    store.dispatch('activity/clearAll')
    store.dispatch('common/updateOrderNo', '')
    store.dispatch('common/updatedCalculateModel', false)
  }
  if (from.path === '/activity-quotation/step3' && store.state.activity.InsuranceActive == 0) {
    store.dispatch('place/clearAll')
    store.dispatch('activity/clearAll')
    store.dispatch('common/updateOrderNo', '')
    store.dispatch('common/updatedCalculateModel', false)
  }
  next()
})
export default router
