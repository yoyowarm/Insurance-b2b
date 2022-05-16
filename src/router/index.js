import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //報價明細
        path: '/',
        name: 'quotationList',
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
    path: '/Office-audit',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { // 總公司核保
        path: '/Office-audit',
        name: 'Office-audit',
        component: () => import(/* webpackChunkName: "about" */ '../views/OfficeAudit.vue')
      },
    ]
  },
  {
    path: '/branch-audit',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //分公司核保
        path: '/branch-audit',
        name: 'branch-audit',
        component: () => import(/* webpackChunkName: "about" */ '../views/BranchAudit.vue')
      }
    ]

  },
  {
    path: '/admin/permissionSetting',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/AdminLayout.vue'),
    children: [
      { //權限設定
        path: '/admin/permissionSetting',
        name: 'permissionSetting',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/PermissionSetting.vue')
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

export default router
