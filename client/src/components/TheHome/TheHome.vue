<template>
	<div>
		<TheHomeWelcome class="mb-5" />
		<div class="columns is-variable is-6">
			<div class="column is-4">
				<TheHomeSearchUser class="mb-5" />
			</div>
			<div class="column is-8">
				<TheHomeFriends class="mb-5" />
			</div>
		</div>
	</div>
</template>

<script>
import TheHomeWelcome from "@/components/TheHomeWelcome/TheHomeWelcome.vue"
import TheHomeFriends from "@/components/TheHomeFriends/TheHomeFriends.vue"
import TheHomeSearchUser from "@/components/TheHomeSearchUser/TheHomeSearchUser.vue"
export default {
	components: { TheHomeWelcome, TheHomeFriends, TheHomeSearchUser },
}
</script>

<style>
</style>