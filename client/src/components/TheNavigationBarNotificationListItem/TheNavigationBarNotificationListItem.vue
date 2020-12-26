<template>
	<div class="notification-item">
		<div class="notification-content">
			<div class="columns is-gapless is-vcentered">
				<div class="column is-narrow">
					<BaseAvatar class="mr-2 is-large" />
				</div>
				<div class="column">
					<div class="notification-sender">whenitapproaches:</div>
					<div class="notification-message">Hello!!~</div>
					<div class="notification-time">3m</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		sender: {
			type: String,
			required: true
		},
		message: {
			
		}
	}
}
</script>

<style scoped src="./styles.css">
</style>