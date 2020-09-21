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
import { onMounted, provide, reactive, ref, readonly, computed } from "vue"
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

		const currentUser = reactive({
			username: "hello"
		})

		provide("currentUser", readonly(currentUser))

		return {
			navbar,
			mainHeight,
		}
	},
}
</script>

<style scoped>
</style>
