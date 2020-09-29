<template>
	<base-trans mode="out-in" extraClass="animate__faster">
		<TheLogin v-if="isLoggingIn" />
		<TheSignUp v-else />
	</base-trans>
</template>

<script>
import TheLogin from "@/components/TheLogin/TheLogin.vue"
import TheSignUp from "@/components/TheSignUp/TheSignUp.vue"
import { useStore } from "@/store"
export default {
	components: {
		TheLogin,
		TheSignUp,
	},
	setup() {
		const loginPageStore = useStore("LoginPage")

		const isLoggingIn = loginPageStore.isLoggingIn

		return {
			isLoggingIn,
		}
	},
}
</script>

<style>
</style>