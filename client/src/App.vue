<template>
	<div class="columns is-gapless">
		<div class="column is-narrow">
			<TheSidebar :navbarHeight="mainHeight" />
		</div>
		<div class="column">
			<div class="section" ref="navbar">
				<TheNavigationBar />
			</div>
			<div class="section py-0" :style="{'height': `calc(100vh - ${mainHeight}px)`}">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar/TheSidebar.vue"
import TheNavigationBar from "@/components/TheNavigationBar/TheNavigationBar.vue"
import { onMounted, provide, reactive, ref, readonly } from "vue"

import { useStore } from "@/store"

import ApiService, { AuthService } from "@/services/api.service"

export default {
	components: {
		TheSidebar,
		TheNavigationBar,
	},
	setup() {
		const navbar = ref(null)
		const mainHeight = ref(0)

		onMounted(() => {
			mainHeight.value = navbar.value.clientHeight
		})

		const userStore = useStore("User")

		userStore.refreshJWT()

		ApiService.interceptors.request.use(async (config) => {
			const { token: userToken } = userStore.currentUser

			const shouldRefreshJWT = userStore.shouldRefreshJWT.value

			if (shouldRefreshJWT && !userToken.value) {
				const updateShouldRefreshJWT = userStore.updateShouldRefreshJWT
				try {
					updateShouldRefreshJWT(false)

					let token = await userStore.refreshJWT()
					config.headers["Authorization"] = `Bearer ${token}`
				} catch (err) {
					console.log(err)
				}
			}

			return config
		})

		return {
			navbar,
			mainHeight,
		}
	},
}
</script>

<style scoped>
</style>
