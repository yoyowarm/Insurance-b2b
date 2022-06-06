<template>
  <div class="w-full my-4">
    <div class="column-4">
      <InputGroup title="是否有出口規劃">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="是否有疏散標示">
        <SwitchInput slot="input"/>
      </InputGroup>
      <InputGroup title="是否有人員管制計畫">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-4 mt-4">
      <InputGroup title="是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)">
        <SwitchInput slot="input"/>
      </InputGroup>
    </div>
    <div class="column-5 mt-4">
      <InputGroup title="如有下列設施，請勾選" min border0>
        <Checkbox
          id="緊急照明"
          class="text-md"
          text="緊急照明"
          slot="input"
        />
      </InputGroup>
      <InputGroup :noMt="marginTop(560)" min  border0>
        <Checkbox
          id="緊急廣播"
          class="text-md"
          text="緊急廣播"
          slot="input"
        />
      </InputGroup>
      <InputGroup :noMt="marginTop(1180)" min border0>
        <Checkbox
          id="安全門"
          class="text-md"
          text="安全門"
          slot="input"
        />
      </InputGroup>
      <InputGroup :noMt="marginTop(1180)" min border0>
        <Checkbox
          id="安全逃生通道"
          class="text-md"
          text="安全逃生通道"
          slot="input"
        />
      </InputGroup>
      <InputGroup :noMt="marginTop(1615)" min border0>
        <Checkbox
          id="排煙通道"
          class="text-md"
          text="排煙通道"
          slot="input"
        />
      </InputGroup>
    </div>
    <div class="column-5 mt-4 dashed-border">
      <InputGroup noMt min border0>
        <Checkbox
          id="緊急電源"
          class="text-md"
          text="緊急電源"
          slot="input"
        />
      </InputGroup>
    </div>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch/index.vue'
import Checkbox from '@/components/Checkbox'
import WindowResizeListener from '@/components/WindowResizeListener'
export default {
  components: {
    InputGroup,
    SwitchInput,
    Checkbox,
    WindowResizeListener
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    marginTop (width = 1180) {
      return this.windowWidth <= width
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
  }
}
</script>

<style scoped lang="scss">
  
</style>