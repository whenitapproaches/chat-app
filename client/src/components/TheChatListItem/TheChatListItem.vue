<template>
	<li class="chat-list-item">
		<router-link
			:to="{
				name: 'Chat',
				params: {
					partnerUsername: username,
				},
			}"
			exact-active-class="is-active"
		>
			<div class="columns is-gapless is-vcentered is-fullwidth">
				<div class="column is-narrow mr-4">
					<BaseAvatar class="is-large" />
				</div>
				<div class="column">
					<div class="chat-username">
						<div class="online"></div>
						{{ username }}
					</div>
					<div class="chat-last-message">{{ recentMessageContent.trim() || "[Attachment]" }}</div>
				</div>
				<div class="column is-narrow">
					<div class="chat-time">{{ timeFromNow }}</div>
					<div class="badge">5</div>
				</div>
			</div>
		</router-link>
	</li>
</template>

<script>
import { computed, ref, toRefs, watchEffect } from "vue"
import { useStore } from "@/store"
import moment from "moment"
import { useRouter } from "vue-router"
export default {
	name: "TheChatListItem",
	props: {
		recentMessageContent: {
			type: String,
		},
		username: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			default: "",
		},
		createdAt: {
			type: String,
		},
		userId: {
			type: String,
		},
	},
	setup(props) {
		const { createdAt } = toRefs(props)

		const store = useStore()

		let timeFromNow = computed(() => {
			const nowEveryMinute = store.state.clock.nowEveryMinute
			return moment.utc(createdAt.value).from(nowEveryMinute)
		})

		return {
			timeFromNow,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>