<template>
	<div class="toolbar">
		<div class="call tool">
			<a href="#">
				<BaseIcon class="is-large" icon="las la-phone" />
			</a>
		</div>
		<div class="video-call tool">
			<a href="#">
				<BaseIcon class="is-large" icon="las la-video" />
			</a>
		</div>
		<div class="info tool">
			<a href class="info-dropdown-toggler">
				<BaseIcon class="is-large" icon="las la-info-circle" />
			</a>
		</div>
		<div class="more tool">
			<a href="#" class="more-dropdown-toggler" @click.prevent="toggleMoreDropdown">
				<BaseIcon class="is-large" icon="las la-ellipsis-v" />
			</a>
			<ul class="dropdown box" :class="{'is-active': isMoreDropdownActive}">
				<li>
					<a href="#">
						<BaseIcon icon="las la-trash" />
						<p class="ml-3">Remove conversation</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from "vue"
export default {
	setup() {
		const isMoreDropdownActive = ref(false)

		const toggleMoreDropdown = () => {
			isMoreDropdownActive.value = !isMoreDropdownActive.value
		}

		return {
			isMoreDropdownActive,
			toggleMoreDropdown,
		}
	},
}
</script>

<style scoped src="./styles.css">
</style>