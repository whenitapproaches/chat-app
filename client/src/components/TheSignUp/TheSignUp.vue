<template>
	<div
		class="columns is-variable is-6 is-vcentered"
		:style="{ 'justify-content': 'center' }"
	>
		<div class="column is-4">
			<h3 class="title is-4">Sign Up</h3>
			<p class="subtitle">Join us and become a part of our society</p>
			<form>
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error.username }"
							required
							v-model="username"
							type="text"
							class="input"
						/>
						<label class="label">Username</label>
					</p>
					<p v-show="error.username" class="help is-danger">
						{{ error.username }}
					</p>
				</div>
				<div class="field mb-3">
					<p class="control">
						<input
							:class="{ 'is-danger': error.password }"
							required
							v-model="password"
							type="password"
							class="input"
						/>
						<label class="label">Password</label>
					</p>
					<p v-show="error.password" class="help is-danger">
						{{ error.password }}
					</p>
				</div>
				<div class="field mb-3">
					<p class="control">
						<input
							required
							v-model="confirmedPassword"
							type="password"
							class="input"
							:class="{ 'is-danger': error.confirmedPassword }"
						/>
						<label class="label">Confirm your password</label>
					</p>
					<p v-show="error.confirmedPassword" class="help is-danger">
						{{ error.confirmedPassword }}
					</p>
				</div>
				<div class="field" :style="{ 'align-items': 'center' }">
					<button
						class="button is-primary"
						type="submit"
						@click.prevent="signUp"
					>
						Submit
					</button>
				</div>
				<p>
					Already have an account?
					<a href="#" @click.prevent="updateIsOnPageLogin(true)"
						>Let me enter</a
					>
				</p>
			</form>
		</div>
		<div class="column is-narrow">
			<figure class="image" :style="{ width: '400px' }">
				<img :src="signUpImage" alt="" />
			</figure>
		</div>
	</div>
</template>

<script>
import { computed, reactive, ref, watchEffect } from "vue"
import { useStore } from "@/store"
import signUpImage from "./signup.png"

import useSignUpValidateUsername from "./composables/useSignUpValidateUsername"
import useSignUpValidatePassword from "./composables/useSignUpValidatePassword"
import useSignUpValidateConfirmedPassword from "./composables/useSignUpValidateConfirmedPassword"

export default {
	name: "TheSignUp",
	setup() {
		const store = useStore()

		const updateIsOnPageLogin = (status) => {
			store.dispatch("authentication/updateIsOnPageLogin", status)
		}

		const username = ref("")
		const password = ref("")
		const confirmedPassword = ref("")
		const error = reactive({})

		useSignUpValidateUsername(username, error)

		useSignUpValidatePassword(password, error)

		useSignUpValidateConfirmedPassword(confirmedPassword, password, error)

		const signUp = () => {
			store.dispatch("authentication/signUp", {
				username: username.value,
				password: password.value,
				confirmedPassword: confirmedPassword.value,
			})
		}

		return {
			updateIsOnPageLogin,
			username,
			password,
			confirmedPassword,
			error,
			signUpImage,
			signUp,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>