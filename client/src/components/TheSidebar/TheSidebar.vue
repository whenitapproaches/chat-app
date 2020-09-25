<template>
	<div class="sidebar-wrapper">
		<aside
			class="menu sidebar"
			:class="{'is-active': isSidebarActive}"
		>
			<ul class="menu-list">
				<li v-for="route in routes" :key="route.name">
					<router-link active-class="is-active" :to="{name: route.name}">
						<base-icon class="is-medium" :icon="route.icon" />
						<p>{{route.name}}</p>
					</router-link>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script>
import { ref } from "vue"
import { routes as sidebarRoutes } from "./data"
export default {
	name: "TheSidebar",
	setup() {
		const routes = ref(sidebarRoutes)

		return {
			routes,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>