<template>
  <div>
    <div class="column-4 my-3">
      <InputGroup title="使用道路者，對附近交通之衝擊是否經交通主管機關認許" dash>
        <SwitchInput
          slot="input"
          id="selfOperated1"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3">
      <InputGroup title="未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許">
        <SwitchInput
          slot="input"
          id="dangerousItem1"
        />
      </InputGroup>
    </div>
    <div class="column-4 my-3 dashed-border">
      <InputGroup title="保險處所與車道有無有效區隔(含車道與人員動線安排)">
        <SwitchInput
          slot="input"
          id="dangerousItem1"
        />
      </InputGroup>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
import SwitchInput from '@/components/Switch'
export default {
  components: {
    InputGroup,
    SwitchInput,
  },
  props:{
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      facilityList: [
        '游泳池',
        '健身房',
        '沙灘',
        '兒童遊樂場',
        '餐廳',
      ],
    }
  },
  methods: {
    updateValue(e,type) {
      this.$emit('update:data',{
        ...this.data,
        part3: {
          ...this.data.part3,
          [type]: e
        }
      })
    },
    updateFacility(e,list) {
      let arr = []
      if(e && !this.data.part3.facility.includes(list)) {
        arr.push(list)
      }
      if(!e && this.data.part3.facility.includes(list)) {
        arr = [...this.data.part3.facility]
        const index = arr.findIndex(item => item === list)
        arr.splice(index,1)
      }
      this.$emit('update:data',{
        ...this.data,
        part3: {
          ...this.data.part3,
          facility: e ? [...this.data.part3.facility,...arr] : arr
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  
</style>