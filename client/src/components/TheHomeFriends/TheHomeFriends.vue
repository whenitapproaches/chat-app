<template>
	<div class="your-friends">
		<ul class="friends columns">
			<li class="column is-4" v-for="friend in friends" :key="friend.userId">
				<div class="box">
					{{ friend.userId }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { useStore } from "@/store"
export default {
	setup() {
		const profileStore = useStore("Profile")
		const profile = profileStore.profile

		profileStore.fetchFriends()

		const { friends } = profile

		return {
			friends,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>