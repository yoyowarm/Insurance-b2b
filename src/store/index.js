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
import questionnaire from './questionnaire'
import news from './news'
import documentDownload from './documentDownload'
import verify from './verify'
import underwriteLevelSetting from './underwriteLevelSetting'
import underwrite from './underwrite'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['app', 'home', 'place', 'activity', 'common'],
  reducer: (state) => {
    return {
      home: {
        token: state.home.token,
        userInfo: state.home.userInfo,
        level: state.home.level,
      },
      place: {
        uuid: state.place.uuid,
        terms: state.place.terms,
        period: state.place.period,
        renewal: state.place.renewal,
        placeInfo: state.place.placeInfo,
        Insuraned: state.place.Insuraned,
        Relation: state.place.Relation,
        InputRelation: state.place.InputRelation,
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
        policyTransfer: state.place.policyTransfer,
        questionnaireFinished: state.place.questionnaireFinished,
        InsuranceActive: state.place.InsuranceActive,
        PolicyStatus: state.place.PolicyStatus,
        quotationData: state.place.quotationData,
        underwriteQuotationData: state.place.underwriteQuotationData,
        underwriteQuotationIsChange: state.place.underwriteQuotationIsChange,
        parameter: state.place.parameter,
      },
      activity: {
        uuid: state.activity.uuid,
        terms: state.activity.terms,
        period: state.activity.period,
        activityInfo: state.activity.activityInfo,
        Insuraned: state.activity.Insuraned,
        Relation: state.activity.Relation,
        InputRelation: state.activity.InputRelation,
        Applicant: state.activity.Applicant,
        sameAsInsured: state.activity.sameAsInsured,
        industry: state.activity.industry,
        industryText: state.activity.industryText,
        remark: state.activity.remark,
        questionnaire: state.activity.questionnaire,
        insuranceAmountList: state.activity.insuranceAmountList,
        questionnaireFinished: state.activity.questionnaireFinished,
        activityQuotation: state.activity.activityQuotation,
        policyTransfer: state.activity.policyTransfer,
        additionTerms: state.activity.additionTerms,
        internalControlData: state.activity.internalControlData,
        InsuranceActive: state.activity.InsuranceActive,
        PolicyStatus: state.activity.PolicyStatus,
        quotationData: state.activity.quotationData,
        underwriteQuotationData: state.activity.underwriteQuotationData,
        underwriteQuotationIsChange: state.activity.underwriteQuotationIsChange,
        parameter: state.activity.parameter,
      },
      common: {
        viewModel: state.common.viewModel,
        editModel: state.common.editModel,
        orderNo: state.common.orderNo,
        mainOrderNo: state.common.mainOrderNo,
        chatMessageList: state.common.chatMessageList,
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
    quotation,
    questionnaire,
    news,
    documentDownload,
    verify,
    underwriteLevelSetting,
    underwrite
  },
  plugins: [vuexLocal.plugin]
})
