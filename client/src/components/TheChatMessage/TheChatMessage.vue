<template>
	<div class="chat-message" :class="[sender]" title="HGolladws">
		<p class="content">{{content}}</p>
	</div>
</template>

<script>
export default {
	props: {
		sender: {
			type: String,
			required: true,
    },
    content: {
      type: String,
      required: true
    }
	},
	setup() {},
}
</script>

<style scoped src="./styles.css">
</style>