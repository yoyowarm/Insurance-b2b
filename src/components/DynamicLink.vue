<template>
  <router-link v-if="type === 'router'" :to="path">
    <slot/>
  </router-link>
  <router-link v-else-if="type === 'blank' && !/^https?:\/\//.test(path)" target="_blank" :to="path" >
    <slot/>
  </router-link>
  <span v-else>
    <slot/>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    path: {
      type: String
    }
  }
}
</script>