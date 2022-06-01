import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			'InsuranceActive': state => state.quotationStep1.InsuranceActive,
		})
	},
	beforeRouteLeave(to, from, next) {
		if (this.InsuranceActive === 2 && !(to.path === '/quotation/step2' || to.path === '/quotation/step1')) {
			Popup.create({
				hasHtml: true,
				maskClose: false,
				confirm: true,
				ok: '確定',
				cancel: '取消',
				htmlText: `<p>目前更正尚未報價完成，確定離開頁面嗎？</p>`,
			}).then(() => {
				this.$store.dispatch('quotationStep1/updatedInsuranceActive', 0)
				this.$store.dispatch('quotationStep1/clearAll')
				this.$store.dispatch('quotationStep2/clearAll')
				next()
			}).catch(() => {
				next(false)
			})
		} else {
			next()
		}
	},
	mounted() {
		window.addEventListener('beforeunload', this.beforeUnload, false)
	},
	beforeDestroy() {
		window.removeEventListener('beforeunload', this.beforeUnload, false)
	},
	methods: {
		beforeUnload(e) {
			if (this.InsuranceActive === 2) {
				e = e || window.event
				if (e) {
					e.returnValue = '目前更正尚未報價完成，確定離開頁面嗎？'
				}
				return '目前更正尚未報價完成，確定離開頁面嗎？'
			}
		},
	}
}