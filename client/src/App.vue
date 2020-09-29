<template>
	<div class="columns is-gapless">
		<div class="column is-narrow">
			<TheSidebar />
		</div>
		<div class="column">
			<div class="section" ref="navbar">
				<TheNavigationBar />
			</div>
			<div class="section py-0" :style="{ height: mainHeight }">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar/TheSidebar.vue"
import TheNavigationBar from "@/components/TheNavigationBar/TheNavigationBar.vue"
import mainHeightCalculator from "./mainHeightCalculator"
import { onMounted, provide, reactive, ref, readonly, watchEffect } from "vue"

import { useStore } from "@/store"

import { useRouter } from "vue-router"

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
			mainHeight.value = mainHeightCalculator(navbar)
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

		return {
			navbar,
			mainHeight,
		}
	},
}
</script>

<style scoped>
</style>
