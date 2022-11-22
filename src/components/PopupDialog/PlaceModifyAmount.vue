<template>
  <PopupDialog
    :open.sync="openDialog"
    headerText="修改保費-場所"
    @cancel="() => {openDialog = false}"
  >
    <div class="flex flex-row">
      <span class="mr-4 mb-4">報價單標號：070FQ013601</span>
      <span>被保險人：王曉明</span>
    </div>
    <div class="column-2 mb-4">
      <InputGroup title="附加條款加費係數">
        <Input slot="input" class="w-full"/>
      </InputGroup>
      <InputGroup title="AGG>AOA*2係數">
        <Input slot="input" class="w-full"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="己類基本純保費" >
        <Input slot="input" class="w-full" unit="元"/>
      </InputGroup>
    </div>
    <div class="w-full mb-4">
      <InputGroup title="保費">
        <div slot="input" class="w-full pr-24 relative">
          <Input class="w-full"/>
          <Button class="absolute right-0 -top-1 w-16 md:w-20 h-full" style="height: 50px">試算</Button>
        </div>
      </InputGroup>
    </div>
    <div class="w-full flex justify-center mt-8">
      <Button  class="w-40 mr-8" @click.native="() => {openDialog = false}" outline>取消</Button>
      <Button  class="w-40" @click.native="() => {openDialog = false}">確認核壓保費</Button>
    </div>
  </PopupDialog>
</template>

<script>
import PopupDialog from '@/components/PopupDialog/dialog.vue'
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input.vue'
import Button from '@/components/Button'
export default {
  components: {
    PopupDialog,
    InputGroup,
    Input,
    Button
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    openDialog: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('update:open', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>