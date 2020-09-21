<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a
				role="button"
				class="navbar-burger burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<div class="navbar-item">
					<h1 class="title">{{routeName}}</h1>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item mr-5">
					<TheNavigationBarNotification v-show="isLoggedIn" />
				</div>
				<div class="navbar-item">
					<TheNavigationBarUserInfo v-show="isLoggedIn" />
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { onMounted, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import TheNavigationBarUserInfo from "@/components/TheNavigationBarUserInfo/TheNavigationBarUserInfo.vue"
import TheNavigationBarNotification from "@/components/TheNavigationBarNotification/TheNavigationBarNotification.vue"
export default {
	components: {
		TheNavigationBarUserInfo,
		TheNavigationBarNotification,
	},
	setup(props, context) {
		const router = useRouter()

		const routeName = computed(() => router.currentRoute.value.name)

		const userStore = useStore('User')

		const isLoggedIn = userStore.isLoggedIn

		return {
			routeName,
			isLoggedIn,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>