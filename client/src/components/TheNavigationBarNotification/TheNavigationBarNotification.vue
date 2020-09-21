<template>
	<div class="notification-wrapper">
		<a href="#" class="notification-dropdown-toggler" @click="toggleDropdown">
			<div>
				Notification
				<div class="has-new-notification"></div>
			</div>
			<div class="badge ml-2">5</div>
		</a>
		<div class="dropdown notification-dropdown box" :class="{'is-active': isDropdownActive }">
			<TheNavigationBarNotificationList />
		</div>
	</div>
</template>

<script>
import { ref } from "vue"
import TheNavigationBarNotificationList from "@/components/TheNavigationBarNotificationList/TheNavigationBarNotificationList.vue"
export default {
	components: {
		TheNavigationBarNotificationList,
	},
	setup() {
		const isDropdownActive = ref(false)

		const toggleDropdown = () => {
			isDropdownActive.value = !isDropdownActive.value
		}

		return {
			isDropdownActive,
			toggleDropdown,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>