<template>
	<div class="chat-messages">
		<TheChatMessage sender="owner" content="Well, bye!" />
		<TheChatMessage
			sender="partner"
			content="Dignissimos aut minus accusantium sed ea est commodi dolore."
		/>
		<TheChatMessage
			sender="partner"
			content="Inventore dolore odit sint sint odio tenetur. Perspiciatis aut cum nobis et. Eum voluptatum aperiam est et aut aut dolor molestiae aut."
		/>
		<TheChatMessage sender="owner" content="recusandae modi nihil" />
		<TheChatMessage
			sender="partner"
			content="Quas atque impedit. Aspernatur eveniet et eveniet sit eveniet ea. Corporis et illo. Est quo iste consequatur quaerat vero quisquam adipisci iusto. Eius reprehenderit velit numquam cupiditate vero molestiae culpa quia. Eum sint doloribus."
		/>
		<TheChatMessage sender="partner" content="Omnis expedita aliquid." />
		<TheChatMessage
			sender="owner"
			content="Iusto mollitia voluptatem. Qui ut nihil. Aut eum dicta possimus."
		/>
		<TheChatMessage
			sender="owner"
			content="Et eos eaque at esse deleniti doloribus. Qui sit illum eum quia explicabo nisi magnam suscipit repudiandae. Illum aperiam rerum delectus."
		/>
		<TheChatMessage sender="partner" content="Porro optio eveniet ex." />
		<TheChatMessageSeparator date="Today" />
	</div>
</template>

<script>
import TheChatMessage from "@/components/TheChatMessage/TheChatMessage.vue"
import TheChatMessageSeparator from "@/components/TheChatMessageSeparator/TheChatMessageSeparator.vue"
export default {
	components: {
		TheChatMessage,
		TheChatMessageSeparator,
	},
}
</script>

<style scoped src="./styles.css">
</style>