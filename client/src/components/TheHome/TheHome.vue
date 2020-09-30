<template>
	<div class="home">
		<TheHomeWelcome />
		<TheHomeFriends />
	</div>
</template>

<script>
import TheHomeWelcome from "@/components/TheHomeWelcome/TheHomeWelcome.vue"
import TheHomeFriends from "@/components/TheHomeFriends/TheHomeFriends.vue"
export default {
	components: { TheHomeWelcome, TheHomeFriends },
}
</script>

<style>
</style>