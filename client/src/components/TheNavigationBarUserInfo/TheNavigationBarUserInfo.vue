<template>
	<div class="user-info">
		<BaseAvatar />
		<a href="#" class="user-dropdown-toggler ml-2" @click.prevent="toggleDropdown">
			<p>{{currentUserUsername}}</p>
			<BaseIcon class="is-small ml-2" icon="las la-angle-down" />
		</a>
		<ul class="user-dropdown dropdown box" :class="{'is-active': isDropdownActive}">
			<li>
				<a href="#">Change profile picture</a>
			</li>
			<li>
				<a @click.prevent="logOut" href="#">Log out</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, computed, toRefs } from "vue"
import { useStore } from "@/store"
export default {
	components: {},
	setup() {
		let isDropdownActive = ref(false)

		const toggleDropdown = () => {
			isDropdownActive.value = !isDropdownActive.value
		}

		const userStore = useStore('User')

		const { username: currentUserUsername} = userStore.currentUser

		const logOut = userStore.logOut

		return {
			isDropdownActive,
			toggleDropdown,
			currentUserUsername,
			logOut
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>