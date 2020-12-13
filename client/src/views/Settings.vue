<template>
	<div class="chat main">
		<div v-if="username" class="columns is-gapless is-fullheight">
			<div class="column is-3">
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error.displayName }"
							required
							v-model="displayName"
							type="text"
							class="input"
						/>
						<label class="label">Display name</label>
					</p>
					<p v-show="error.displayName" class="help is-danger">
						{{ error.displayName }}
					</p>
				</div>
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error.gender }"
							required
							v-model="gender"
							type="password"
							class="input"
						/>
						<label class="label">Password</label>
					</p>
					<p v-show="error.gender" class="help is-danger">
						{{ error.gender }}
					</p>
				</div>
				<div class="field" :style="{ 'align-items': 'center' }">
					<button
						class="button is-primary"
						type="submit"
						@click.prevent="login"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
		<div class="is-fullheight" v-else>
			<TheUnauthorisedAlert />
		</div>
	</div>
</template>

<script>
import TheUnauthorisedAlert from "@/components/TheUnauthorisedAlert/TheUnauthorisedAlert.vue"
import { useStore } from "@/store"
import { computed, reactive } from "vue"
export default {
	components: {
		TheUnauthorisedAlert,
	},
	setup() {
		const store = useStore()

		const username = computed(() => store.getters["user/username"])

		const error = reactive({})

		return {
			username,
			error,
		}
	},
}
</script>

<style>
</style>