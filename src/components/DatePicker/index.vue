<template>
  <div class="flex flex-row w-full justify-between items-center my-1.5 ml-1 mr-3 datePicker">
    <div class="flex flex-row w-full items-center">
      <!-- <font-awesome-icon class="mr-1 text-gray-800 pt-1 text-xl" :icon="['far','calendar-alt']" /> -->
      <Select
        defaultText="民國"
        hiddenArrow
        @emitItem="(e) => emitSelectItem('year', e.Value)"
        :selected="dateObject.year.toString()"
        :options="yearOptions"
        :disabled="disabled"
      />
      <span>/</span>
      <Select
        defaultText="月"
        hiddenArrow
        @emitItem="(e) => emitSelectItem('month', e.Value)"
        :selected="dateObject.month.toString()"
        :options="monthOptions"
        :disabled="disabled"
      />
      <span>/</span>
      <Select
        defaultText="日"
        hiddenArrow
        @emitItem="(e) => emitSelectItem('day', e.Value)"
        :selected="dateObject.day.toString()"
        :options="dayOptions"
        :disabled="disabled"
      />
    </div>
    <span v-if="suffix">{{suffix}}</span>
  </div>
</template>

<script>
import Select from '@/components/Select'
export default {
  props: {
    suffix: {
      type: String,
      default: ''
    },
    dateObject: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    formerYears: {
      type: Boolean,
      default: false
    }

  },
   components: {
      Select
    },
   data () {
     return {
      time1: null,
      year: '年',
      month: '月',
      day: '日',
     }
   },
   computed: {
     yearOptions () {
        const arr = []
        if(this.formerYears) {
          for (let i = 99; i < (new Date().getFullYear()-1911); i++) {
            arr.push({
              Value: i + 1,
              Text: i + 1
            })
          }
        } else {
          for (let i = (new Date().getFullYear()-1911); i <= 140; i++) {
          arr.push({
            Text: i,
            Value: i
          })
       }
        }
       return arr 
     },
     pastYear() {
      return this.dateObject.year && (Number(this.dateObject.year) < (new Date().getFullYear()-1911)) ? 12 : new Date().getMonth() + 1
     },
     pastMonth() {
      return this.dateObject.year && this.dateObject.month && (Number(this.dateObject.year) < (new Date().getFullYear()-1911))
        ? new Date(Number(this.dateObject.year)+1911,Number(this.dateObject.month),0).getDate()
        : this.dateObject.year && this.dateObject.month && (Number(this.dateObject.year) == (new Date().getFullYear()-1911))
          ? Number(this.dateObject.month) == new Date().getMonth() +1
            ? new Date().getDate()
            : new Date(Number(this.dateObject.year)+1911,Number(this.dateObject.month),0).getDate()
          : 31
     },
     monthOptions () {
       const arr = []
       if(this.formerYears) {
        for (let i = 1; i <= this.pastYear; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
       } else {
        for (let i = 1; i <= 12; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
       }
      
       return arr 
     },
      dayOptions () {
        const arr = []
        for (let i = 1; i <= this.pastMonth; i++) {
          arr.push({
            Text: i,
            Value: i
          })
        }
        return arr 
      }
   },
   methods: {
      emitSelectItem(key, value) {
        const dateObject = JSON.parse(JSON.stringify(this.dateObject))
        dateObject[key] = value
        this.$emit('emitDateItem', dateObject)
      }
   }
}
</script>

<style lang="scss">
.datePicker {
  select {
    font-size: 16px!important;
    @apply text-center 
  }
}
</style>