<template>
	<div class="your-friends">
		<h1 class="title is-5 mb-3">Your friends</h1>
		<ul class="friends columns is-variable is-3">
			<li
				class="column is-3"
				v-for="friend in transformedFriends"
				:key="friend.userId"
			>
				<div class="box friend">
					<BaseAvatar />
					{{ friend.partnerUsername }}
					<p class="subtitle">
						<!-- {{ friend.user.profile.displayName }} -->
					</p>
					<button class="button" @click="message(friend.partnerUsername)">
						Message
					</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import { computed } from "vue"
export default {
	setup() {
		const store = useStore()

		store.dispatch("account/fetchRelationships")

		const friends = computed(() => store.getters["account/friends"])

		const currentUsername = computed(() => store.getters["user/username"])

		const router = useRouter()

		const message = (username) => {
			router.push({
				name: "Chat",
				params: {
					partnerUsername: username,
				},
			})
		}

		const transformedFriends = computed(() =>
			friends.value.map((friend) => ({
				partnerUsername:
					friend.sender !== currentUsername.value
						? friend.sender
						: friend.receiver,
			}))
		)

		return {
			transformedFriends,
			message,
			currentUsername,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>