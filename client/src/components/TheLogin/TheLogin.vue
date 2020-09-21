<template>
	<div>
		<div class="field">
			<label class="label">Username</label>
			<p class="control">
				<input v-model="username" type="text" class="input" />
			</p>
		</div>
		<div class="field">
			<label class="label">Password</label>
			<p class="control">
				<input v-model="password" type="password" class="input" />
			</p>
		</div>
		<button class="button" @click="login">Login</button>
	</div>
</template>

<script>
import { inject, ref } from "vue"
import { useStore } from "@/store"
export default {
	setup() {
		const username = ref("")
		const password = ref("")

		const userStore = useStore('User')

		const login = () => {
			userStore.login({
				username: username.value,
				password: password.value,
			})
		}

		return {
			username,
			password,
			login,
		}
	},
}
</script>

<style>
</style>