<template>
	<div class="chat main">
		<div v-if="isLoggedIn" class="columns is-gapless is-fullheight">
			<div class="column is-3">
				<TheChatList />
			</div>
			<div class="column">
				<TheChatBox />
			</div>
		</div>
		<div class="is-fullheight" v-else>
			<TheUnauthorisedAlert />
		</div>
	</div>
</template>

<script>
import TheChatList from "@/components/TheChatList/TheChatList.vue"
import TheChatBox from "@/components/TheChatBox/TheChatBox.vue"
import TheUnauthorisedAlert from '@/components/TheUnauthorisedAlert/TheUnauthorisedAlert.vue';
import { useStore } from "@/store"
export default {
	components: {
		TheChatList,
		TheChatBox,
		TheUnauthorisedAlert
	},
	setup() {
		const userStore = useStore("User")

		const isLoggedIn = userStore.isLoggedIn

		return {
			isLoggedIn,
		}
	},
}
</script>

<style>
</style>