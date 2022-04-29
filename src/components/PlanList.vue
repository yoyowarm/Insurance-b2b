<template>
  <div class="flex flex-col">
    
    <div class="name">{{name}}</div>
    <div class="pl-4 my-2.5">
      <slot/>
      <!-- <template v-for="(item,index) in planDetail.list">
        <PaymentItem :key="index" :keyName="item.keyName" :value="item.value" :unit="item.unit" :unitClass="item.unitClass"/>
      </template> -->
    </div>
    <!-- <div>
      <PaymentItem :keyName="planDetail.total.keyName" :value="planDetail.total.value" unit totalStyle/>
    </div> -->
  </div>
</template>

<script>
// import PaymentItem from './PaymentItem'
export default {
  components: {
    // PaymentItem
  },
  props: {
   name: {
    type: String,
    default: ''
    },
    planDetail: {
      type: Object,
      default: () => {}
    }
  }
  
}
</script>

<style scoped lang="scss">
  
</style>