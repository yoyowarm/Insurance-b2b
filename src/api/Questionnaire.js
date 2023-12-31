import request from './index'
//取得處所詢問表係數
export const GetPlaceQuestionnaireCoefficient = (data) => request('post', '/Questionnaire/GetPlaceQuestionnaireCoefficient', data)
//取得活動詢問表係數
export const GetActivityQuestionnaireCoefficient = (data) => request('post', '/Questionnaire/GetActivityQuestionnaireCoefficient', data)
//取得詢問表管理清單
export const GetQusetionnaireList = (Parameters) => {
    return request('get', '/Questionnaire/GetQusetionnaireList', Parameters)
}
//取得處所詢問表資料
export const GetPlaceQuestionnaireWithoutOrder = (questionnarieNo) => request('get', '/Questionnaire/GetPlaceQuestionnaireWithoutOrder', { questionnarieNo })
//取得活動詢問表資料
export const GetActivityQuestionnaireWithoutOrder = (questionnarieNo) => request('get', '/Questionnaire/GetActivityQuestionnaireWithoutOrder', { questionnarieNo })
//新增無報價單處所詢問表
export const AddPlaceQuestionnaireWithoutOrder = (data) => request('post', '/Questionnaire/AddPlaceQuestionnaireWithoutOrder', data)
//新增無報價單活動詢問表
export const AddActivityQuestionnaireWithoutOrder = (data) => request('post', '/Questionnaire/AddActivityQuestionnaireWithoutOrder', data)
//更新無報價單處所詢問表
export const UpdatePlaceQuestionnaireWithoutOrder = (data) => request('put', '/Questionnaire/UpdatePlaceQuestionnaireWithoutOrder', data)
//更新無報價單活動詢問表
export const UpdateActivityQuestionnaireWithoutOrder = (data) => request('put', '/Questionnaire/UpdateActivityQuestionnaireWithoutOrder', data)
