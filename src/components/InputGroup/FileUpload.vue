<template>
  <p v-if="fileName !== ''" class="text-blue-500 px-4 pr-5 text-lg truncate relative">
    <span class="select-none">{{fileName}}</span>
    <font-awesome-icon @click="fileName = ''" icon="times-circle" class="cursor-pointer text-lg text-main absolute right-2 top-1" />
  </p>
  <div v-else class="w-full">
    <label :for="id" class="text-gray-400 pl-4 text-lg w-full cursor-pointer">
      上傳檔案{{index}}
    </label>
    <input :id="id" type="file" name="fileUpload"  accept="image/*" class="w-full" @change="newFile">
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileName: '',
    }
  },
  methods: {
    newFile(e) {
      console.log(e.target.files[0].name)
      this.fileName = e.target.files[0].name
    }
  }
  
}
</script>

<style scoped lang="scss">
[name="fileUpload"] {
  display: none;
}
</style>