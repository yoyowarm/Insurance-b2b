export const MobileRegex = (mobile) => {
	const isPhone = new RegExp(/^09+[0-9]{8}/, 'g')
	const isPhoneRepeat = new RegExp(/^09+([0-9])\1{7}/, 'g')
	const isPhoneContinuous = ['0912345678', '0923456789', '0934567890', '0909876543', '0998765432', '0987654321', '0976543210']
	const isTelephone = new RegExp(/^0+[2-8]{1}([0-9]){0,8}/, 'g')
	const isTelephoneRepeat = new RegExp(/^0+[2-8]{1}([0-9])\1{6,8}/, 'g')
	const isTelephoneContinuous = ['1234567890', '234567890', '34567890', '987654321', '87654321', '0987654321']


	if (!isPhone.test(mobile) && !isTelephone.test(mobile)) {
		return '號碼格式錯誤'
	}
	if (isPhoneRepeat.test(mobile)) {
		return '手機號碼不可重複'
	}
	if (isPhone.test(mobile) && isPhoneContinuous.includes(mobile)) {
		return '手機號碼不可連續'
	}

	if (isTelephoneRepeat.test(mobile)) {
		return '電話號碼不可重複'
	}
	if (isTelephone.test(mobile) && isTelephoneContinuous.map(item => mobile.includes(item)).some(i => i === true)) {
		return '電話號碼不可連續'
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
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const IDRegex = (id) => {
	const isID = new RegExp(/^[A-Z]{1}[1-2]{1}[0-9]{8}$/, 'g')
	const UniformNumber = new RegExp(/^[0-9]{8}$/, 'g')
	return [isID.test(id), UniformNumber.test(id)]
}