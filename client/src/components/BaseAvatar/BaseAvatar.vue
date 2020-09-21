<template>
	<figure class="avatar image">
		<img :src="src" alt />
	</figure>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: "https://avatars.dicebear.com/api/male/what.svg",
		},
	},
}
</script>

<style scoped src="./styles.css">
</style>