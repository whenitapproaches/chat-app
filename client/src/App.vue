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
		<TheImageModal />
	</div>
</template>

<script>
import TheSidebar from "@/components/TheSidebar/TheSidebar.vue"
import TheNavigationBar from "@/components/TheNavigationBar/TheNavigationBar.vue"
import mainHeightCalculator from "./mainHeightCalculator"
import TheImageModal from "@/components/TheImageModal/TheImageModal"
import { onMounted, ref } from "vue"

import { useStore } from "@/store"

import { useRouter } from "vue-router"
const router = useRouter()

import ApiService, { AuthService } from "@/services/api.service"

ApiService.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		let responseStatus = error.response.status

		switch (responseStatus) {
			case 401:
				router.push({
					name: "Home",
				})
				break
			case 404:
				router.push({
					name: "NotFound",
				})
				break
		}

		return Promise.reject(error)
	}
)

export default {
	components: {
		TheSidebar,
		TheNavigationBar,
		TheImageModal,
	},
	setup() {
		const navbar = ref(null)
		const mainHeight = ref(0)

		onMounted(() => {
			mainHeight.value = mainHeightCalculator(navbar)
		})

		const store = useStore()

		store.dispatch("authentication/refreshJWT")

		return {
			navbar,
			mainHeight,
		}
	},
}
</script>

<style scoped>
</style>
