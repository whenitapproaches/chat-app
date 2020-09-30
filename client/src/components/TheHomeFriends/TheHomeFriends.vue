<template>
  <div class="your-friends">
    
  </div>
</template>

<script>
import {useStore } from '@/store';
export default {
  setup() {
    const profileStore = useStore('Profile')

    profileStore.fetchFriends()

    const friends = profileStore.friends

    return {
      friends
    }
  }
}
</script>

<style scoped src="./styles.css">

</style>