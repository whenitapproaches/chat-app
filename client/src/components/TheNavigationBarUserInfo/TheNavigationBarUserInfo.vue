<template>
	<div class="user-info">
		<BaseAvatar />
		<a
			href="#"
			class="user-dropdown-toggler ml-2"
			@click.prevent="toggleDropdown"
		>
			<p>{{ username }}</p>
			<BaseIcon class="is-small ml-2" icon="las la-angle-down" />
		</a>
		<ul
			class="user-dropdown dropdown box"
			:class="{ 'is-active': isDropdownActive }"
		>
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
import { computed, ref } from "vue"
import { useStore } from "@/store"
import socketService from "@/services/socket.service"
export default {
	components: {},
	setup() {
		let isDropdownActive = ref(false)

		const toggleDropdown = () => {
			isDropdownActive.value = !isDropdownActive.value
		}

		const store = useStore()

		const username = computed(() => store.getters["user/username"])

		const logOut = () => {
			store.dispatch("authentication/signOut")
		}

		return {
			isDropdownActive,
			toggleDropdown,
			username,
			logOut,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>