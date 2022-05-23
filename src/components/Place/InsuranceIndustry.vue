<template>
  <div class="">
    <template v-for="(category,index) in categoryData">
      <div class="border-b-0 border-dashed mb-6" :class="{'border-b-2': !(index+1 === categoryData.length)}" :key="category.category">
        <FormTitle :title="category.category" classList="text-xl text-gray-700" class="mb-6">
          <font-awesome-icon class="text-xl text-gray-700 mr-1" icon="briefcase" slot="left"/>
        </FormTitle>
          <div class="column-6 mb-8" :class="{'packUp': category.lists.length > 18}">
            <template v-for="list in (category.lists.length > 18 && !switchList[index]) ? category.lists.slice(0, 18) : category.lists">
              <RadioInput :key="list.Value" :class="{'col-span-2': list.Text.length >= 9}" :id="`${list.Value}`" :text="list.Text" :value="false" disabled/>
            </template>
            <span class="more" v-if="category.lists.length > 18 && !switchList[index]" @click="() => switchBtn(index)" >更多<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-down']" /></span>
            <span class="more" v-if="category.lists.length > 18 && switchList[index]" @click="() => switchBtn(index)" >收起<font-awesome-icon class="text-sm ml-3" :icon="['fa', 'angle-up']" /></span>
          </div>
      </div>
    </template>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle'
import RadioInput from '@/components/Radio'
export default {
  components: {
    FormTitle,
    RadioInput
  },
  props: {
    categoryData: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      switchList: []
    }
  },
  methods: {
    categoryList (category,index) {
      if(category.length > 18 && !this.switchList[index]) {
        return category.slice(0, 18)
      } else {
        return category
      }
    },
    switchBtn(index) {
      this.$set(this.switchList,index,!this.switchList[index])
    }
  },
  mounted() {
    this.categoryData.map((item,index) => {
      this.$set(this.switchList,index,false)
    })
  }
}
</script>

<style scoped lang="scss">
.packUp {
  @apply relative;
  .more {
    width: 90px;
    height: 40px;
    margin: 0px auto;
    left: 0px;
    right: 0px;
    @apply absolute text-main cursor-pointer bg-white z-10 text-center -bottom-13 flex justify-center items-center ;
  }
}
</style>