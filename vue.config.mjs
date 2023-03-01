const timestamp = new Date().getTime()
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
    path: '/quotation-ist',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/DefaultLayout.vue'),
    children: [
      { //報價明細
        path: '/quotation-ist',
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
export default {
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        ws: true,
      }
    }
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${timestamp}.js`,
      chunkFilename: `js/[name].${timestamp}.js`,
    },
  },
  pluginOptions: {
    sitemap: { baseURL: 'https://gcp.goodarc.com', routes }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "公共意外責任保險報價系統";
        return args;
      })
  },
  publicPath: process.env.NODE_ENV === 'uat' || process.env.NODE_ENV === 'production'
    ? '/PLIB2B/'
    : '/'

}
