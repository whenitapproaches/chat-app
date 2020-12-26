<template>
	<div class="emoji-table box">
		<div class="columns is-multiline is-variable is-1">
			<div class="column is-2" :key="emoji.emoji" v-for="emoji in emojis">
				<a href="#" @click="$emit('select-emoji', emoji.emoji)">{{
					emoji.emoji
				}}</a>
			</div>
		</div>
	</div>
</template>

<script>
import emojis from "./emojis"
export default {
	setup(props) {
		return {
			emojis,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>