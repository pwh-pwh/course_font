<template>
<div id="welcome">
  <h2>
    欢迎来到这里
  </h2>
</div>
</template>

<script>
export default {
  name: "Welcome",
  mounted() {
    this.$parent.activeSidebar("welcome-sidebar")
  }
}
</script>

<style scoped>

</style>