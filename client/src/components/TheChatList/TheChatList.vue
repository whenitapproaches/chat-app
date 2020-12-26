<template>
	<ul class="chat-list">
		<TheChatListItem
			v-for="contact in recentContacts"
			:key="contact._id"
			:username="contact.partner"
			:recentMessageContent="contact.content"
			:createdAt="contact.createdAt"
			:userId="contact.partner?._id"
		/>
	</ul>
</template>

<script>
import TheChatListItem from "@/components/TheChatListItem/TheChatListItem.vue"
import { useStore } from "@/store"
import { computed } from "vue"
export default {
	components: { TheChatListItem },
	setup() {
		const store = useStore()
		const recentContacts = computed(() => store.getters["chat/sortedByDateContacts"])

		// Fetch most recent contacts
		store.dispatch("chat/fetchContacts")

		return {
			recentContacts,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>