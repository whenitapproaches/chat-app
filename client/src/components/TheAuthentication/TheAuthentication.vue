<template>
	<base-trans mode="out-in" extraClass="animate__faster">
		<TheLogin v-if="isOnPageLogin" />
		<TheSignUp v-else />
	</base-trans>
</template>

<script>
import TheLogin from "@/components/TheLogin/TheLogin.vue"
import TheSignUp from "@/components/TheSignUp/TheSignUp.vue"
import { useStore } from "@/store"
import { computed } from "vue"
export default {
	components: {
		TheLogin,
		TheSignUp,
	},
	setup() {
		const store = useStore()
		const isOnPageLogin = computed(
			() => store.state.authentication.isOnPageLogin
		)

		return {
			isOnPageLogin,
		}
	},
}
</script>

<style>
</style>