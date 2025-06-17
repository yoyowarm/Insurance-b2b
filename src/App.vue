<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  async created() {
    let params = (new URL(document.location)).searchParams
    const key = params.get("token");
    if (key) {
      this.$store.dispatch('home/setToken', key)
    }
    // const level = await this.$store.dispatch('underwrite/GetEmployeeUnderwriteLevel')
    this.$store.dispatch('home/setLevel', 3)
    // if(level.data.content) {
    // } else {
    //   this.$store.dispatch('home/setLevel', 0)
    // }
  }
}
</script>
<style lang="scss">
</style>
