<template>
	<div class="columns is-gapless main">
		<div class="column is-3">
			<TheChatList />
		</div>
		<div class="column">
			<TheChatBox />
		</div>
	</div>
</template>

<script>
import TheChatList from "@/components/TheChatList/TheChatList.vue"
import TheChatBox from "@/components/TheChatBox/TheChatBox.vue"
export default {
	components: {
		TheChatList,
		TheChatBox,
	},
}
</script>

<style>
</style>