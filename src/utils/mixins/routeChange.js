import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			'viewModel': state => state.common.viewModel,
		})
	},
	beforeRouteLeave(to, from, next) {
		if (this.InsuranceActive !== 0 && !(to.path.includes('-quotation/step2') || (to.path.includes('-quotation/step1')) || (to.path.includes('-quotation/step3'))) ||
			(this.InsuranceActive !== 0 && from.path.includes('/place-quotation/') && to.path.includes('/activity-quotation')) ||
			(this.InsuranceActive !== 0 && from.path.includes('/activity-quotation/') && to.path.includes('/place-quotation'))
		) {
			Popup.create({
				hasHtml: true,
				maskClose: false,
				confirm: true,
				ok: '確定',
				cancel: '取消',
				htmlText: this.InsuranceActive === 7 ? '<p>尚未審核完成，確定離開頁面嗎？</p>' : `<p>目前更正尚未報價完成，確定離開頁面嗎？</p>`,
			}).then(() => {
				this.$store.dispatch('place/clearAll')
				this.$store.dispatch('activity/clearAll')
				this.$store.dispatch('common/updateOrderNo', { orderNo: '', mainOrderNo: '' })
				this.$store.dispatch('common/updatedCalculateModel', false)
				this.$store.dispatch('place/updatedInsuranceActive', 0)
				this.$store.dispatch('activity/updatedInsuranceActive', 0)
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
			if (this.viewModel) {
				e = e || window.event
				if (e) {
					e.returnValue = '尚未核保完成，確定離開頁面嗎？'
				}
				return '尚未核保完成，確定離開頁面嗎？'
			}
		},
	}
}