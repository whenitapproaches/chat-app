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
			<div class="loading">
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
							@click="respondFriend({ userId: user._id, status: true })"
							class="button is-success is-small"
						>
							<BaseIcon icon="las la-check" />
						</button>
						<button
							@click="respondFriend({ userId: user._id, status: false })"
							class="button is-small"
						>
							<BaseIcon icon="las la-times" />
						</button>
					</div>
					<button
						@click="addFriend(user._id)"
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
						@click="removeFriend(user._id)"
					>
						Remove friend
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue"
import useSearchUser from "./composables/useSearchUser"
import BaseAvatar from "../BaseAvatar/BaseAvatar.vue"

import { useStore } from "@/store"

export default {
	components: { BaseAvatar },
	setup(props) {
		const username = ref("")

		const users = ref([])

		useSearchUser(username, users)

		const store = useStore()

		const currentUserId = computed(() => store.getters["user/id"])

		const currentUserRelationships = computed(
			() => store.state.account.relationships
		)

		const currentUsername = computed(() => store.getters["user/username"])

		const transformedRelationships = computed(() =>
			currentUserRelationships.value.map((relationship) => {
				const isPassive =
					relationship.sender.username === currentUsername.value ? false : true

				const partnerUsername = isPassive
					? relationship.sender.username
					: relationship.receiver.username

				return {
					isPassive,
					partnerUsername,
					isPending: relationship.isPending,
				}
			})
		)

		const transformedUsers = computed(() => {
			if (!username.value) return []
			return users.value.map((user) => ({
				_id: user._id,
				username: user.username,
				status: getStatusFriend(user.username),
			}))
		})

		function getStatusFriend(username) {
			const hasAnyRelationship = transformedRelationships.value.find(
				(relationship) => relationship.partnerUsername === username
			)

			if (!hasAnyRelationship) return "none"

			if (!hasAnyRelationship.isPending) return "friend"

			if (hasAnyRelationship.isPassive) return "passive"

			return "active"
		}

		const removeFriend = (userId) => {
			store.dispatch("account/removeFriend", userId)
		}

		const addFriend = (userId) => {
			store.dispatch("account/addFriend", userId)
		}
		const respondFriend = ({ userId, status }) => {
			store.dispatch("account/respondFriend", { userId, status })
		}

		return {
			username,
			transformedUsers,
			removeFriend,
			addFriend,
			respondFriend,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>