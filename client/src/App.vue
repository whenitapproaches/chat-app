<template>
	<div class="columns is-gapless">
		<div v-if="isLoggedIn" class="column is-narrow">
			<TheSidebar />
		</div>
		<div v-show="isLoggedIn" class="column">
			<div class="section" ref="navbar">
				<TheNavigationBar />
			</div>
			<div class="section py-0" :style="{'height': `calc(100vh - ${mainHeight}px)`}">
				<router-view />
			</div>
		</div>
		<base-transition enterClass="fadeIn">
			<div v-if="!isLoggedIn" class="column">
				<TheLogin />
			</div>
		</base-transition>
	</div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar/TheSidebar.vue"
import TheNavigationBar from "@/components/TheNavigationBar/TheNavigationBar.vue"
import TheLogin from "@/components/TheLogin/TheLogin.vue"
import { onMounted, provide, reactive, ref, readonly } from "vue"

import { useStore } from "@/store"

import { useRouter } from "vue-router"

import ApiService, { AuthService } from "@/services/api.service"

export default {
	components: {
		TheSidebar,
		TheNavigationBar,
		TheLogin,
	},
	setup() {
		const navbar = ref(null)
		const mainHeight = ref(0)

		onMounted(() => {
			mainHeight.value = navbar.value.clientHeight
		})

		const router = useRouter()

		ApiService.interceptors.response.use(
			function (response) {
				return response
			},
			function (error) {
				let responseStatus = error.response.status

				if (responseStatus === 401) {
					router.push({
						name: "Home",
					})
				}

				return Promise.reject(error)
			}
		)

		const userStore = useStore("User")

		userStore.refreshJWT()

		const isLoggedIn = userStore.isLoggedIn

		return {
			navbar,
			mainHeight,
			isLoggedIn,
		}
	},
}
</script>

<style scoped>
</style>
