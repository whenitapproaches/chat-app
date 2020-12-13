<template>
	<div class="chat main">
		<div v-if="username" class="columns is-gapless is-fullheight">
			<div class="column is-3">
				<TheChatList />
			</div>
			<div class="column">
				<base-trans
					appear
					appearClass="fadeInRight"
					enterClass="fadeInRight"
					extraClass="animate__faster"
				>
					<TheChatBox v-show="currentPartnerUsername" />
				</base-trans>
			</div>
		</div>
		<div class="is-fullheight" v-else>
			<TheUnauthorisedAlert />
		</div>
	</div>
</template>

<script>
import TheChatList from "@/components/TheChatList/TheChatList.vue"
import TheChatBox from "@/components/TheChatBox/TheChatBox.vue"
import TheUnauthorisedAlert from "@/components/TheUnauthorisedAlert/TheUnauthorisedAlert.vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import { computed, watchEffect } from "vue"
export default {
	components: {
		TheChatList,
		TheChatBox,
		TheUnauthorisedAlert,
	},
	setup() {
		const store = useStore()
		const router = useRouter()

		const username = computed(() => store.getters['user/username'])

		const updateCurrentPartnerUsername = (username) => {
			store.dispatch("chat/updateCurrentPartnerUsername", username)
		}

		watchEffect(() => {
			const {
				partnerUsername,
			} = router.currentRoute.value.params
			if (!partnerUsername || !username.value) return
			updateCurrentPartnerUsername(partnerUsername)
		})

		const currentPartnerUsername = computed(() => store.getters["chat/currentPartnerUsername"])

		return {
			username,
			currentPartnerUsername,
		}
	},
}
</script>

<style>
</style>