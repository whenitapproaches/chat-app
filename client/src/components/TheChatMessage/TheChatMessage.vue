<template>
	<div
		class="chat-message"
		:class="[sender, { 'is-pending': isPending }]"
		:title="formattedDate"
	>
		<figure v-if="media" @click="openImageModal(imageSrc)" class="image">
			<img :src="imageSrc" />
		</figure>
		<p v-else class="content">{{ content }}</p>
	</div>
</template>

<script>
import { toRefs, onMounted, ref } from "vue"
import moment from "moment"
import { useStore } from "@/store"
import { ImageService } from "@/services/api.service"
export default {
	props: {
		sender: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		createdAt: {
			type: String,
		},
		isPending: {
			type: Boolean,
		},
		media: {
			type: String,
		},
	},
	setup(props) {
		const { createdAt } = toRefs(props)

		const formattedDate = moment
			.utc(createdAt.value)
			.local()
			.format("HH:mm:ss DD/MM/YYYY")

		const store = useStore()

		const openImageModal = (media) => {
			store.dispatch("imageModal/openImageModal", media)
		}

		const imageSrc =  ref('')

		onMounted(async () => {
			if(!props.media) return
			if(props.isPending) return imageSrc.value = props.media
			const reader = new FileReader()
			const src = (await ImageService.read(props.media)).data
			
			reader.onload = function(e) {
				imageSrc.value = e.target.result
			}

			reader.readAsDataURL(src)
		})

		return {
			formattedDate,
			openImageModal,
			imageSrc,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>