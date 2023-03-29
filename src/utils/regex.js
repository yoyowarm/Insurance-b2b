export const MobileRegex = (mobile, phoneOnly = false) => {
	const isPhone = new RegExp(/^09.*/)
	const isPhoneRepeat = new RegExp(/^09+([0-9])\1{7}/, 'g')
	const isPhoneContinuous = ['0912345678', '0923456789', '0934567890', '0909876543', '0998765432', '0987654321', '0976543210']
	const isTelephone = new RegExp(/^0+[2-8]{1}.*/)
	const isTelephoneRepeat = new RegExp(/^0+[2-8]{1}([0-9])\1{6,8}/, 'g')
	const isTelephoneContinuous = ['1234567890', '234567890', '34567890', '987654321', '87654321', '0987654321']

	if (phoneOnly && !isPhone.test(mobile)) {
		return '手機號碼格式錯誤'
	}
	if (isPhone.test(mobile) && mobile.toString().length !== 10) {
		return '手機號碼長度不正確'
	}
	if (!phoneOnly && isTelephone.test(mobile)) {
		if (mobile.toString().length > 11) {
			return '市話格式錯誤'
		}
	}

	if (!phoneOnly && !(isPhone.test(mobile) || isTelephone.test(mobile))) {
		return '市話格式錯誤，請填寫區碼'
	}
	if (isPhoneRepeat.test(mobile)) {
		return '手機號碼不可重複'
	}
	if (isPhone.test(mobile) && isPhoneContinuous.includes(mobile)) {
		return '電話異常，請確認是否繼續完成報價'
	}

	if (!phoneOnly && isTelephoneRepeat.test(mobile)) {
		return '電話號碼不可重複'
	}
	if (!phoneOnly && isTelephone.test(mobile) && isTelephoneContinuous.map(item => mobile.includes(item)).some(i => i === true)) {
		return '電話異常，請確認是否繼續完成報價'
	}
}
export const isPhone = (mobile) => {
	const isPhone = new RegExp(/^09+[0-9]{8}/, 'g')
	if (!isPhone.test(mobile)) {
		return '號碼格式錯誤'
	}
}
export const isEmail = (email) => {
	const isEmail = new RegExp(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
	if (!isEmail.test(email)) {
		return '信箱格式錯誤'
	}
}
export const ObjCompare = (obj1, obj2) => {
	const Obj1_keys = Object.keys(obj1);
	const Obj2_keys = Object.keys(obj2);
	if (Obj1_keys.length !== Obj2_keys.length) {
		return false;
	}
	for (let k of Obj1_keys) {
		if (obj1[k] !== obj2[k]) {
			return false;
		}
	}
	return true;
}

export const numFormat = (num) => {
	if (!num) return
	return num.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const IDRegex = (id) => {
	const isID = new RegExp(/^[A-Z]{1}[1-2]{1}[0-9]{8}$/, 'g')
	const UniformNumber = new RegExp(/^[0-9]{8}$/, 'g')
	return [isID.test(id), UniformNumber.test(id)]
}

export const routeMatch = (path) => {
	switch (path.split('?')[0]) {
		case '/quotation-list':
			return 'QuoteDetails'
		case '/place-quotation/step1':
		case '/place-quotation/step2':
		case '/place-quotation/step3':
			return 'PlaceQuote'
		case '/activity-quotation/step1':
		case '/activity-quotation/step2':
		case '/activity-quotation/step3':
			return 'ActivityQuote'
		case '/permissionSetting':
			return 'PermissionSetting'
		case '/parameterSetting/category':
			return 'PlaceActivityTypeSetting'
		case '/parameterSetting/minimumAmount':
			return 'CountyMinimumSetting'
		case '/parameterSetting/basic-premium-setting':
			return 'BasicPremium'
		case '/parameterSetting/document-download-setting':
			return 'DocumentDownloadSetting'
		case '/parameterSetting/news-setting':
			return 'NewsSetting'
		case '/parameterSetting/quote-separately':
			return 'QuoteInsuranceAmount'
		case '/termsSetting/proposedTerms':
			return 'SuggestTermSetting'
		case '/termsSetting/quotationAndWeight':
			return 'QuoteAndWeight'
		case '/termsSetting/quotationAndAmount':
			return 'QuoteAmount'
		case '/underwritingCooperation/Level':
			return 'UnderwriteLevel'
		case '/underwritingCooperation/Setting':
			return 'UnderwriteGroup'
		case '/questionnaire-management':
			return 'QuestionnaireManage'
		default:
			return ''
	}
}