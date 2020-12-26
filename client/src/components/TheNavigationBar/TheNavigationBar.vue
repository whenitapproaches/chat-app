<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-menu">
			<div class="navbar-start">
				<div class="navbar-item">
					<h1 class="title">
						{{ routeName === "NotFound" ? "Not Found" : routeName }}
					</h1>
				</div>
			</div>

			<div class="navbar-end">
				<!-- <div class="navbar-item mr-5">
					<TheNavigationBarNotification v-show="username" />
				</div> -->
				<div class="navbar-item">
					<TheNavigationBarUserInfo v-show="username" />
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import TheNavigationBarUserInfo from "@/components/TheNavigationBarUserInfo/TheNavigationBarUserInfo.vue"
// import TheNavigationBarNotification from "@/components/TheNavigationBarNotification/TheNavigationBarNotification.vue"
export default {
	components: {
		TheNavigationBarUserInfo,
		// TheNavigationBarNotification,
	},
	setup(props, context) {
		const router = useRouter()

		const routeName = computed(() => router.currentRoute.value.name)

		const store = useStore()

		const username = computed(() => store.getters["user/username"])

		return {
			routeName,
			username,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>