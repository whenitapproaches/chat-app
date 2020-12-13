<template>
	<div class="chat-box-headbar">
		<div class="columns is-gapless">
			<div class="column is-narrow">
				<div class="partner">
					<div class="columns is-vcentered">
						<div class="column is-narrow">
							<BaseAvatar class="is-extra-large" />
						</div>
						<div class="column">
							<div class="partner-username">
								{{ currentPartnerUsername }}
							</div>
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
import { useStore } from "@/store"
import { computed } from 'vue'
export default {
	components: {
		TheChatBoxHeadbarToolbar,
	},
	setup() {
		const store = useStore()
		const currentPartnerUsername = computed(() => store.getters["chat/currentPartnerUsername"])

		return {
			currentPartnerUsername,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>