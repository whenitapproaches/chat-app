<template>
	<div
		class="columns is-variable is-6 is-vcentered"
		:style="{ 'justify-content': 'center' }"
	>
		<div class="column is-4">
			<h3 class="title is-4">Log In</h3>
			<p class="subtitle">Let's enter the awesome world awaiting you ahead</p>
			<form ref="loginForm">
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error }"
							required
							v-model="username"
							type="text"
							class="input"
						/>
						<label class="label">Username</label>
					</p>
				</div>
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error }"
							required
							v-model="password"
							type="password"
							class="input"
						/>
						<label class="label">Password</label>
					</p>
				</div>
				<p v-show="error" class="help mb-2 is-danger">
					{{ error }}
				</p>
				<div class="field mb-3">
					<label class="checkbox">
						<input type="checkbox" v-model="remember" />
						Remember me
					</label>
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
				<p>
					Not a member yet?
					<a href="#" @click.prevent="updateIsOnPageLogin(false)"
						>Create an account</a
					>
				</p>
			</form>
		</div>
		<div class="column is-narrow">
			<figure class="image" :style="{ width: '400px' }">
				<img :src="loginImage" alt="login image" />
			</figure>
		</div>
	</div>
</template>

<script>
import { computed, inject, ref } from "vue"
import { useStore } from "@/store"
import loginImage from "./login.png"
export default {
	setup() {
		const username = ref("")
		const password = ref("")
		const remember = ref(false)
		const loginForm = ref(null)

		const store = useStore()

		const error = computed(() => store.state.authentication.errorSignIn)

		const updateIsOnPageLogin = (status) => {
			store.dispatch("authentication/updateIsOnPageLogin", status)
		}

		const login = () => {
			store.dispatch("authentication/signIn", {
				username: username.value,
				password: password.value,
				remember: remember.value,
			})
		}

		return {
			username,
			password,
			login,
			remember,
			loginImage,
			updateIsOnPageLogin,
			loginForm,
			error,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>