<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    let params = (new URL(document.location)).searchParams
    const key = params.get("k");
    if (key) {
      this.$store.dispatch('home/setToken', key)
    }
  }
}
</script>
<style lang="scss">
</style>
