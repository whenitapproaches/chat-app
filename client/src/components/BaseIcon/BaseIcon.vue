<template>
	<span class="icon">
		<i :class="icon"></i>
	</span>
</template>

<script>
export default {
	name: "BaseIcon",
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
}
</script>

<style scoped src="./styles.css">
</style>