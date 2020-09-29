<template>
	<transition
		:appear-active-class="computedAppearClass"
		:enter-active-class="computedEnterClass"
		:leave-active-class="computedLeaveClass"
	>
    <slot></slot>
	</transition>
</template>

<script>
export default {
  name: "BaseTrans",
  props: {
    enterClass: {
      type: String,
      default: "fadeIn"
    },
    leaveClass: {
      type: String,
      default: "fadeOut"
    },
    appearClass: {
      type: String,
      default: "fadeIn"
    },
    library: {
      type: String,
      default: "animate.css"
    },
    extraClass: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    function classResolver(className) {
      if(props.library === 'animate.css') return `animate__animated animate__${className} ${props.extraClass}`
    }

    const computedAppearClass = classResolver(props.appearClass)
    const computedEnterClass = classResolver(props.enterClass)
    const computedLeaveClass = classResolver(props.leaveClass)

    return {
      computedAppearClass,
      computedEnterClass,
      computedLeaveClass
    }
  }
}
</script>

<style scoped>
</style>