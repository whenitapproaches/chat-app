<template>
	<div class="chat-input">
		<div class="columns is-vcentered is-fullwidth is-gapless">
			<div class="column is-narrow">
				<div class="toolbar">
					<a class="photo-video tool">
						<BaseIcon class="is-medium" icon="las la-photo-video" />
					</a>
					<a class="file tool">
						<BaseIcon class="is-medium" icon="las la-paperclip" />
					</a>
				</div>
			</div>
			<div class="column">
				<div class="input-wrapper">
					<input class="message-input input" type="text" placeholder="Write your message here..." />
				</div>
			</div>
			<div class="column is-narrow">
				<div class="toolbar pr-4">
					<a href="#" class="emoji tool">
						<BaseIcon class="is-medium" icon="las la-smile-beam" />
					</a>
				</div>
			</div>
			<div class="column is-narrow">
				<a class="is-circle send-button">
					<BaseIcon icon="las la-paper-plane" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style src="./styles.css">
</style>