<template>
	<teleport to="body">
		<div v-if="isModalOpened" class="modal" :class="{'is-active': isModalOpened}">
			<div class="modal-background" @click="closeImageModal"></div>
			<div class="modal-content">
				<figure class="image">
          <img :src="imageSrc" alt="">
        </figure>
			</div>
		</div>
	</teleport>
</template>

<script>
import { useStore } from "@/store"
import { computed } from "vue"
export default {
	setup() {
		const store = useStore()

		const isModalOpened = computed(() => store.state.imageModal.isModalOpened)

		const imageSrc = computed(() => store.state.imageModal.imageSrc)

		const closeImageModal = () => {
			store.dispatch("imageModal/closeImageModal")
		}

		return {
			isModalOpened,
      closeImageModal,
      imageSrc
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>