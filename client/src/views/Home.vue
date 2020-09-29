<template>
	<div class="home">
		<base-trans appear mode='out-in' extraClass="animate__faster">
			<TheAuthentication v-if="!isLoggedIn" />
			<div v-else>Welcome back</div>
		</base-trans>
	</div>
</template>

<script>
import TheAuthentication from "@/components/TheAuthentication/TheAuthentication.vue"
import { useStore } from "@/store"
import { components } from "vue"

export default {
	name: "Home",
	components: {
		TheAuthentication,
	},
	setup(props, context) {
		const userStore = useStore("User")

		const isLoggedIn = userStore.isLoggedIn

		return {
			isLoggedIn,
		}
	},
}
</script>
