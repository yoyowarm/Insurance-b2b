import request from './index'
//取得處所問券係數
export const GetPlaceQuestionnaireCoefficient = (data) => request('post', '/Questionnaire/GetPlaceQuestionnaireCoefficient', data)
//取得活動問券係數
export const GetActivityQuestionnaireCoefficient = (data) => request('post', '/Questionnaire/GetActivityQuestionnaireCoefficient', data)
