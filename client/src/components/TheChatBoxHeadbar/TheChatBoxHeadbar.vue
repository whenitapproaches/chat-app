<template>
	<div class="chat-box-headbar">
		<div class="columns is-gapless">
			<div class="column is-narrow">
				<div class="partner">
					<div class="columns is-vcentered">
						<div class="column is-narrow">
							<AppAvatar class="is-extra-large" />
						</div>
						<div class="column">
							<div class="partner-username">whenitapproaches</div>
							<div class="partner-status">Online</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-narrow is-offset-auto">
				<TheChatBoxHeadbarToolbar />
			</div>
		</div>
	</div>
</template>

<script>
import TheChatBoxHeadbarToolbar from "@/components/TheChatBoxHeadbarToolbar/TheChatBoxHeadbarToolbar.vue"
export default {
	components: {
		TheChatBoxHeadbarToolbar,
	},
}
</script>

<style scoped src="./styles.css">
</style>