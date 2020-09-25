<template>
	<div class="chat main">
		<div class="columns is-gapless is-fullheight">
			<div class="column is-3">
				<TheChatList />
			</div>
			<div class="column">
				<TheChatBox />
			</div>
		</div>
	</div>
</template>

<script>
import TheChatList from "@/components/TheChatList/TheChatList.vue"
import TheChatBox from "@/components/TheChatBox/TheChatBox.vue"
import { useStore } from "@/store"
export default {
	components: {
		TheChatList,
		TheChatBox,
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