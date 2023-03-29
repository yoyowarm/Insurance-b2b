import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { routeMatch } from '@/utils/regex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      }
    ]
  },
  {
    path: '/news',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //最新消息
        path: '/news/list',
        name: 'newsList',
        component: () => import('../views/NewsListView.vue')
      }
    ]
  },
  {
    path: '/product',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //商品資訊
        path: '/product/list',
        name: 'productList',
        component: () => import('../views/ProductListView.vue')
      }
    ]
  },
  {
    path: '/quotation-list',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //報價明細
        path: '/quotation-list',
        name: 'quotationList',
        component: () => import('../views/QuotationList.vue')
      },
    ]
  },
  {
    path: '/underwriting-list',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //核保明細
        path: '/underwriting-list',
        name: 'underwritingList',
        component: () => import('../views/QuotationList.vue')
      },
    ]
  },
  {
    path: '/place-quotation',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { // 場所報價第一步
        path: '/place-quotation/step1',
        name: 'place-quotation-step1',
        component: () => import('../views/PlaceQuotationStep1.vue')
      },
      { // 場所報價第二步
        path: '/place-quotation/step2',
        name: 'place-quotation-step2',
        component: () => import('../views/PlaceQuotationStep2.vue')
      },
      { // 場所報價第三步
        path: '/place-quotation/step3',
        name: 'place-quotation-step3',
        component: () => import('../views/PlaceQuotationStep3.vue')
      },
    ]
  },
  {
    path: '/activity-quotation',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { // 活動報價第一步
        path: '/activity-quotation/step1',
        name: 'activity-quotation-step1',
        component: () => import('../views/ActivityQuotationStep1.vue')
      },
      { // 活動報價第二步
        path: '/activity-quotation/step2',
        name: 'activity-quotation-step2',
        component: () => import('../views/ActivityQuotationStep2.vue')
      },
      { // 活動報價第三步
        path: '/activity-quotation/step3',
        name: 'activity-quotation-step3',
        component: () => import('../views/ActivityQuotationStep3.vue')
      },
    ]
  },
  {
    path: '/questionnaire-management',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { // 詢問表管理
        path: '/questionnaire-management',
        name: 'questionnaire-management',
        component: () => import('../views/QuestionnaireManagement.vue')
      }
    ]
  },
  {
    path: '/Office-audit',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { // 總公司核保
        path: '/Office-audit',
        name: 'Office-audit',
        component: () => import('../views/OfficeAudit.vue')
      },
    ]
  },
  {
    path: '/branch-audit',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //分公司核保
        path: '/branch-audit',
        name: 'branch-audit',
        component: () => import('../views/BranchAudit.vue')
      }
    ]

  },
  {
    path: '/permissionSetting',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //權限設定
        path: '/',
        name: 'permissionSetting',
        component: () => import('../views/PermissionSetting.vue')
      }
    ]
  },
  {
    path: '/parameterSetting',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //參數設定 類別
        path: '/parameterSetting/category',
        name: 'parameterSetting-category',
        component: () => import('../views/ParameterSetting/Category.vue')
      },
      { //參數設定 縣市最低保額
        path: '/parameterSetting/minimumAmount',
        name: 'parameterSetting-minimumAmount',
        component: () => import('../views/ParameterSetting/MinimumAmount.vue')
      },
      {
        path: '/parameterSetting/basic-premium-setting',
        name: 'parameterSetting-basicPremiumSetting',
        component: () => import('../views/ParameterSetting/BasicPremiumSetting.vue')
      },
      {
        path: '/parameterSetting/quote-separately',
        name: 'parameterSetting-quoteSeparately',
        component: () => import('../views/ParameterSetting/QuoteSeparately.vue')
      },
      {
        path: '/parameterSetting/news-setting',
        name: 'parameterSetting-news-setting',
        component: () => import('../views/ParameterSetting/NewsSetting.vue')
      },
      {
        path: '/parameterSetting/document-download-setting',
        name: 'parameterSetting-document-download-setting',
        component: () => import('../views/ParameterSetting/DocumentDownloadSetting.vue')
      }
    ]
  },
  {
    path: '/termsSetting',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //條款設定 建議條款
        path: '/termsSetting/proposedTerms',
        name: 'termsSetting-proposedTerms',
        component: () => import('../views/TermsSetting/ProposedTerms.vue')
      },
      { //條款設定 另行報價額度
        path: '/termsSetting/quotationAndWeight',
        name: 'termsSetting-quotationAndWeight',
        component: () => import('../views/TermsSetting/QuotationAndWeight.vue')
      },
      { //條款設定 另行報價和權重
        path: '/termsSetting/quotationAndAmount',
        name: 'termsSetting-quotationAndAmount',
        component: () => import('../views/TermsSetting/QuotationAndAmount.vue')
      }
    ]
  },
  {
    path: '/underwritingCooperation',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      { //核保明細階級設定
        path: '/underwritingCooperation/Level',
        name: 'underwritingCooperationLevel',
        component: () => import('../views/UnderwritingCooperation/Level.vue')
      },
      { //核保組織設定
        path: '/underwritingCooperation/Setting',
        name: 'underwritingCooperationSetting',
        component: () => import('../views/UnderwritingCooperation/Setting.vue')
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
