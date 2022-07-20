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
import permissionSetting from './permissionSetting'
import parameterSetting from './parameterSetting'
import additionTermSetting from './additionTermSetting'
import quotation from './quotation'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['app', 'home', 'place', 'activity', 'common'],
  reducer: (state) => {
    return {
      app: {
        uuid: state.app.uuid,
      },
      home: {
        token: state.home.token,
        userInfo: state.home.userInfo,
      },
      place: {
        terms: state.place.terms,
        period: state.place.period,
        renewal: state.place.renewal,
        placeInfo: state.place.placeInfo,
        Insuraned: state.place.Insuraned,
        Relation: state.place.Relation,
        Applicant: state.place.Applicant,
        sameAsInsured: state.place.sameAsInsured,
        InsuranceRecord: state.place.InsuranceRecord,
        industry: state.place.industry,
        industryText: state.place.industryText,
        remark: state.place.remark,
        questionnaire: state.place.questionnaire,
        insuranceAmountList: state.place.insuranceAmountList,
        additionTerms: state.place.additionTerms,
        internalControlData: state.place.internalControlData,
        placeQuotation: state.place.placeQuotation,
        questionnaireFinished: state.place.questionnaireFinished,
      },
      activity: {
        terms: state.activity.terms,
        period: state.activity.period,
        activityInfo: state.activity.activityInfo,
        Insuraned: state.activity.Insuraned,
        Relation: state.activity.Relation,
        Applicant: state.activity.Applicant,
        sameAsInsured: state.activity.sameAsInsured,
        industry: state.activity.industry,
        industryText: state.activity.industryText,
        remark: state.activity.remark,
        questionnaire: state.activity.questionnaire,
        insuranceAmountList: state.activity.insuranceAmountList,
        questionnaireFinished: state.activity.questionnaireFinished,
      },
      common: {
        viewModel: state.common.viewModel,
        editModel: state.common.editModel,
        calculateModel: state.common.calculateModel,
        orderNo: state.common.orderNo,
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
    resource,
    permissionSetting,
    parameterSetting,
    additionTermSetting,
    quotation
  },
  plugins: [vuexLocal.plugin]
})
