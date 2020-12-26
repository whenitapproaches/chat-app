<template>
	<div ref="root" class="chat-messages">
		<TheChatMessage
			v-for="message in conversation.messages"
			:key="message._id"
			:sender="message.sender === currentUserUsername ? 'owner' : ''"
			:content="message.content"
			:media="message.media"
			:createdAt="message.createdAt"
			:isPending="message.isPending"
		/>
		<!-- <TheChatMessageSeparator date="Today" /> -->
		<TheChatMessagesLoading ref="loadingElement" />
	</div>
</template>

<script>
import TheChatMessage from "@/components/TheChatMessage/TheChatMessage.vue"
// import TheChatMessageSeparator from "@/components/TheChatMessageSeparator/TheChatMessageSeparator.vue"
import TheChatMessagesLoading from "@/components/TheChatMessagesLoading/TheChatMessagesLoading.vue"
import { useStore } from "@/store"
import useChatMessageInfiniteLoader from "./useChatMessageInfiniteLoader"
import { onMounted, ref, computed } from "vue"
import useChatMessagesListener from './useChatMessagesListener';
export default {
	components: {
		TheChatMessage,
		// TheChatMessageSeparator,
		TheChatMessagesLoading,
	},
	setup() {
		const store = useStore()

		const conversations = computed(() => store.state.chat.conversations)

		const root = ref(null)
		const loadingElement = ref(null)

		onMounted(() => {
			useChatMessageInfiniteLoader(root, loadingElement)
		})

		const currentPartnerUsername = computed(
			() => store.getters["chat/currentPartnerUsername"]
		)

		const conversation = computed(
			() => store.getters["chat/currentPartnerConversation"] || {}
		)

		const currentUserUsername = computed(() => store.getters["user/username"])

		useChatMessagesListener()

		return {
			root,
			loadingElement,
			conversation,
			currentUserUsername,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>