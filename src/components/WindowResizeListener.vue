<template>
  <link>
</template>
<script>
export default {
  methods: {
    resize() {
      setTimeout(() => {
        this.$emit('resize')
      }, 300)
    },
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
}
</script>