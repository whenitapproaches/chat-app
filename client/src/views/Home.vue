<template>
	<div class="home">
		<base-trans appear mode="out-in" extraClass="animate__faster">
			<TheAuthentication v-if="!username" />
			<TheHome v-else />
		</base-trans>
	</div>
</template>

<script>
import TheAuthentication from "@/components/TheAuthentication/TheAuthentication.vue"
import TheHome from "@/components/TheHome/TheHome.vue"
import { useStore } from "@/store"
import { computed } from "vue"

export default {
	name: "Home",
	components: {
		TheAuthentication,
		TheHome,
	},
	setup(props, context) {
		const store = useStore()

		const username = computed(() => store.getters["user/username"])

		return {
			username,
		}
	},
}
</script>
