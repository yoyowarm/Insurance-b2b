<template>
    <div class="triangle" />
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
.triangle {
    position: relative;
  }
  .triangle:before,
  .triangle:after {
    content: '';
    position: absolute;
    background-color: inherit;
  }
  .triangle,
  .triangle:before,
  .triangle:after {
    width:  6px;
    height: 6px;
    border-top-right-radius: 30%;
  }
  .triangle {
    transform: rotate(-120deg) skewX(-30deg) scale(1,.866);
  }
  .triangle:before {
    transform: rotate(135deg) skewY(-45deg) scale(.707, 1.414) translate(50%);
  }
  .triangle:after {
    transform: rotate(-135deg) skewX(-45deg) scale(1.414, .707) translate(0,-50%);
  }
</style>