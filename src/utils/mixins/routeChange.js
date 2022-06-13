import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			'viewModel': state => state.common.viewModel,
		})
	},
	beforeRouteLeave(to, from, next) {
		if (this.viewModel) {
			Popup.create({
				hasHtml: true,
				maskClose: false,
				confirm: true,
				ok: '確定',
				cancel: '取消',
				htmlText: `<p>尚未核保完成，確定離開頁面嗎？</p>`,
			}).then(() => {
				this.$store.dispatch('common/updatedViewModel', false)
				this.$store.dispatch('common/updatedEditModel', false)
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