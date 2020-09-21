<template>
	<div class="separator">{{date}}</div>
</template>

<script>
import { ref } from "vue"
export default {
	props: {
		date: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		// let content = ref("")
		// if (props.date === Date.now()) content.value = "Today"
		// return {
		// 	content,
		// }
	},
}
</script>

<style scoped src="./styles.css">
</style>