<template>
  <div class="fixed bottom-5 right-5">
    <Button outline class="mb-4 h-20 w-20 shadow-md text-tiny" @click.native="() => $emit('openDialog', true)">報價單歷程</Button>
    <Button class=" h-20 w-20 shadow-md text-tiny" @click.native="() => $store.dispatch('common/updatedEditModel', !editModel)">
      <span v-if="!editModel">報價單修改</span><span v-else>報價單儲存</span></Button>
  </div>
</template>

<script>
import Button from '@/components/Button'
import { mapState } from 'vuex'
export default {
  components: {
    Button
  },
  computed: {
    ...mapState({
      'editModel': state => state.common.editModel,
    }),
  },
}
</script>

<style scoped lang="postcss">
  
</style>