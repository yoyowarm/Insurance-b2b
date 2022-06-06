<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="經營業務種類">
        <Select slot="input" defaultText="選擇種類"/>
      </InputGroup>
      <div class="col-span-2">
        <div class="column-3 w-full">
          <InputGroup title="創立日期">
            <Select slot="input" defaultText="選擇年"/>
          </InputGroup>
          <InputGroup >
            <Select slot="input" defaultText="選擇月"/>
          </InputGroup>
          <InputGroup >
            <Select slot="input" defaultText="選擇日"/>
          </InputGroup>
        </div>
      </div>
      <InputGroup title="員工人數">
        <Input slot="input" placeholder="輸入人數"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <div class="column-3">
        <InputGroup title="營業開始時間">
          <Select slot="input" defaultText="- - 點"/>
        </InputGroup>
        <InputGroup >
          <Select slot="input" defaultText="- - 分"/>
        </InputGroup>
        <InputGroup >
          <Select slot="input" defaultText="AM"/>
        </InputGroup>
      </div>
      <div class="column-3">
        <InputGroup title="營業結束時間">
          <Select slot="input" defaultText="- - 點"/>
        </InputGroup>
        <InputGroup >
          <Select slot="input" defaultText="- - 分"/>
        </InputGroup>
        <InputGroup >
          <Select slot="input" defaultText="AM"/>
        </InputGroup>
      </div>
      <InputGroup title="基地面積">
        <Input slot="input" placeholder="輸入面積"/>
      </InputGroup>
      <InputGroup title="總面積">
        <Input slot="input" placeholder="輸入面積"/>
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="每日平均出入人數">
        <Input slot="input" placeholder="輸入人數"/>
      </InputGroup>
      <InputGroup title="單日最高出入人數">
        <Input slot="input" placeholder="輸入人數"/>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import Input from '@/components/InputGroup/Input'
import Select from '@/components/Select/index.vue'
export default {
  components: {
    InputGroup,
    Input,
    Select
  }
}
</script>

<style scoped lang="scss">
  
</style>