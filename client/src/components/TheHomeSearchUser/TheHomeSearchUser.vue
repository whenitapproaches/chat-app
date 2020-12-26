<template>
	<div class="home-search">
		<h1 class="is-5 title mb-3">Explore more</h1>
		<input
			v-model="username"
			placeholder="Search for a user..."
			type="text"
			class="input"
		/>
		<div class="results">
			<div class="loading" v-show="isSearching">
				<BaseIcon class="loading-icon" icon="las la-spinner" />
			</div>
			<ul class="user-list">
				<li class="item" v-for="user in transformedUsers" :key="user.username">
					<div class="user">
						<base-avatar class="mr-2" />
						<p>{{ user.username }}</p>
					</div>
					<div
						v-if="user.status === 'passive'"
						class="buttons has-addons friend-request"
					>
						<button
							@click="respondFriend({ receiver: user.username, status: true })"
							class="button is-success is-small"
						>
							<BaseIcon icon="las la-check" />
						</button>
						<button
							@click="respondFriend({ receiver: user.username, status: false })"
							class="button is-small"
						>
							<BaseIcon icon="las la-times" />
						</button>
					</div>
					<button
						@click="addFriend(user.username)"
						v-if="user.status === 'none'"
						class="button is-small is-info"
					>
						Add friend
					</button>
					<button
						v-if="user.status === 'active'"
						class="button is-small is-warning"
						disabled
					>
						Pending
					</button>
					<button
						v-if="user.status === 'friend'"
						class="button is-small is-danger"
						@click="removeFriend(user.username)"
					>
						Remove friend
					</button>
				</li>
			</ul>
		</div>
		<div class="results">
			<ul class="user-list">
				<li class="item" v-for="user in requests" :key="user.username">
					<div class="user">
						<base-avatar class="mr-2" />
						<p>{{ user.username }}</p>
					</div>
					<div class="buttons has-addons friend-request">
						<button
							@click="respondFriend({ receiver: user.username, status: true })"
							class="button is-success is-small"
						>
							<BaseIcon icon="las la-check" />
						</button>
						<button
							@click="respondFriend({ receiver: user.username, status: false })"
							class="button is-small"
						>
							<BaseIcon icon="las la-times" />
						</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import useSearchUser from "./composables/useSearchUser"
import useActionUser from "./composables/useActionUser"
import useTransformUser from "./composables/useTransformUser"
import BaseAvatar from "../BaseAvatar/BaseAvatar.vue"
import { computed } from "vue"
import { useStore } from "@/store"

export default {
	components: { BaseAvatar },
	setup(props) {
		const { username, users, isSearching } = useSearchUser()

		const { addFriend, respondFriend, removeFriend } = useActionUser()

		const transformedUsers = useTransformUser(users)

		const store = useStore()
		const currentUserUsername = computed(() => store.getters["user/username"])
		const relationships = computed(() => store.state.account.relationships)

		const requests = computed(() => {
			return relationships.value
				.filter(
					(relationship) =>
						relationship.status === "pending" &&
						relationship.sender !== currentUserUsername.value
				)
				.map((relationship) => {
					return {
						username: relationship.sender,
					}
				})
		})

		return {
			username,
			removeFriend,
			addFriend,
			respondFriend,
			isSearching,
			transformedUsers,
			requests,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>