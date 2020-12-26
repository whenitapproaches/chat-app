<template>
	<div class="chat-input">
		<div class="columns is-vcentered is-fullwidth is-gapless">
			<div class="column is-narrow">
				<div class="toolbar">
					<label for="photoVideoFileInput" class="photo-video tool">
						<BaseIcon class="is-medium" icon="las la-photo-video" />
					</label>
					<input
						id="photoVideoFileInput"
						type="file"
						@change="uploadPhoto($event)"
					/>
					<label for="fileInput" class="file tool">
						<BaseIcon class="is-medium" icon="las la-paperclip" />
					</label>
					<input id="fileInput" type="file" />
				</div>
			</div>
			<div class="column">
				<div class="input-wrapper">
					<form @submit.prevent="sendMessage">
						<input
							ref="chatInput"
							v-model="messageContent"
							class="message-input input"
							type="text"
							placeholder="Write your message here..."
						/>
					</form>
				</div>
			</div>
			<div class="column is-narrow">
				<div class="toolbar emoji mr-4">
					<a href="#" @click.prevent="toggleEmojiList()" class="emoji tool">
						<BaseIcon class="is-medium" icon="las la-smile-beam" />
					</a>
					<TheChatInputEmojis
						@select-emoji="selectEmoji"
						v-show="isEmojiListOpened"
					/>
				</div>
			</div>
			<div class="column is-narrow">
				<a @click.prevent="sendMessage" class="is-circle send-button">
					<BaseIcon icon="las la-paper-plane" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue"
import SocketService from "@/services/socket.service"
import { useStore } from "@/store"
import { find } from "lodash"
import moment from "moment"
import TheChatInputEmojis from "@/components/TheChatInputEmojis/TheChatInputEmojis.vue"
export default {
	components: { TheChatInputEmojis },
	setup() {
		const messageContent = ref("")
		const store = useStore()

		const currentPartnerUsername = computed(
			() => store.getters["chat/currentPartnerUsername"]
		)

		const currentUserUsername = computed(() => store.getters["user/username"])

		const conversations = computed(() => store.state.chat.conversations)

		const currentUser = computed(() => store.state.user.user)

		const createNewMessage = (message) => {
			store.dispatch("chat/createNewMessage", message)
		}

		const sendMessage = (event, media = "", file) => {
			if (!messageContent.value.trim().length && !media) return
			isEmojiListOpened.value = false

			const message = {
				media,
				file,
				content: messageContent.value,
				sender: currentUserUsername.value,
				receiver: currentPartnerUsername.value,
			}

			createNewMessage({
				...message,
			})

			messageContent.value = ""
		}

		const uploadPhoto = (event) => {
			const file = event.target.files[0]
			if (file) {
				let reader = new FileReader()
				isEmojiListOpened.value = false
				let imageSrc = ""
				reader.onload = function (e) {
					imageSrc = e.target.result
					sendMessage(null, imageSrc, file)
				}

				reader.readAsDataURL(file)
			}
		}

		const isEmojiListOpened = ref(false)

		const toggleEmojiList = () => {
			isEmojiListOpened.value = !isEmojiListOpened.value
		}

		const selectEmoji = (emoji) => {
			console.log(chatInput.value.selectionStart)
			messageContent.value += emoji
		}

		const chatInput = ref(null)

		return {
			sendMessage,
			messageContent,
			uploadPhoto,
			isEmojiListOpened,
			toggleEmojiList,
			selectEmoji,
			chatInput,
		}
	},
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader()

		reader.onload = function (e) {
			$("#blah").attr("src", e.target.result)
		}

		reader.readAsDataURL(input.files[0]) // convert to base64 string
	}
}
</script>

<style src="./styles.css">
</style>