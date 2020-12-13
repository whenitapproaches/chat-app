<template>
	<div class="sidebar-wrapper">
		<aside class="menu sidebar">
			<ul class="menu-list">
				<li v-for="route in routes" :key="route.name">
					<router-link
						active-class="is-active"
						:to="{
							name: route.name,
							params: {
								partnerUsername: currentPartnerUsername
							}
						}"
					>
						<base-icon class="is-medium" :icon="route.icon" />
						<p>{{ route.name }}</p>
					</router-link>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script>
import { computed, ref } from "vue"
import { routes as sidebarRoutes } from "./data"
import { useStore } from "@/store"
export default {
	name: "TheSidebar",
	setup() {
		const routes = ref(sidebarRoutes)

		const store = useStore()

		const currentPartnerUsername = computed(
			() => store.getters["chat/currentPartnerUsername"]
		)

		return {
			routes,
			currentPartnerUsername
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>