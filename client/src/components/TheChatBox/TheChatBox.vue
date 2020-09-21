<template>
	<div class="chat-box" ref="root">
		<TheChatBoxHeadbar ref="headbar" />
		<div class="chat-box-content">
			<TheChatMessages :style="{'height': `${messagesHeight}px`}" />
			<TheChatInput ref="input" />
		</div>
	</div>
</template>

<script>
import TheChatBoxHeadbar from "@/components/TheChatBoxHeadbar/TheChatBoxHeadbar.vue"
import TheChatMessages from "@/components/TheChatMessages/TheChatMessages.vue"
import TheChatInput from "@/components/TheChatInput/TheChatInput.vue"
import { onMounted, ref } from "vue"
import chatMessagesHeightCalculator from "./chat-messages-height-calculator"
export default {
	components: {
		TheChatBoxHeadbar,
		TheChatMessages,
		TheChatInput,
	},
	setup() {
		const root = ref(null)
		const headbar = ref(null)
		const input = ref(null)
		const messagesHeight = ref(0)

		onMounted(() => {
			messagesHeight.value = chatMessagesHeightCalculator(root, headbar, input)
		})
		
		window.addEventListener('resize', () => {
			messagesHeight.value = chatMessagesHeightCalculator(root, headbar, input)
		})

		return {
			headbar,
			input,
			root,
			messagesHeight,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>