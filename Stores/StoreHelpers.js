// Vendor
import AppStore from './AppStore'

export default {

	getApiStore() {
		return AppStore.getState().ApiStore
	},

	getAuthStore() {
		return AppStore.getState().AuthStore
	},

	isAuthenticated() {
		return !this.getApiStore().userBalanceResponse.error
	}
}