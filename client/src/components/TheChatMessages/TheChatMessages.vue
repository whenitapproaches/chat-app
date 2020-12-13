<template>
	<div ref="root" class="chat-messages">
		<TheChatMessage
			v-for="message in conversation.messages"
			:key="message._id"
			:sender="message.senderId === userId ? 'owner' : ''"
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
import useChatMessagesListener from "./useChatMessagesListener"
import useChatMessageInfiniteLoader from "./useChatMessageInfiniteLoader"
import { onMounted, ref, computed } from "vue"
export default {
	components: {
		TheChatMessage,
		// TheChatMessageSeparator,
		TheChatMessagesLoading,
	},
	setup() {
		const store = useStore()

		const conversations = computed(() => store.state.chat.conversations)

		const userId = computed(() => store.getters["user/id"])

		useChatMessagesListener()

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

		return {
			userId,
			root,
			loadingElement,
			conversation,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>