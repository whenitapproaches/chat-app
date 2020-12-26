<template>
	<div
		class="chat-messages-loader"
		:class="{ 'is-active': isFetchingNewMessages }"
	>
		<BaseIcon class="loading-icon" icon="las la-spinner" />
	</div>
</template>

<script>
import { useStore } from "@/store"
import {computed} from 'vue';
export default {
	setup() {
		const store = useStore()

		const conversations = computed(() => store.state.chat.conversations)
		const currentPartnerUsername = computed(() => store.getters["chat/currentPartnerUsername"])

		const isFetchingNewMessages = computed(() => {
			const conversation = conversations.value[currentPartnerUsername.value]
			if(!conversation) return false
			return conversation.isFetchingNewMessages
		})

		return {
			isFetchingNewMessages
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>