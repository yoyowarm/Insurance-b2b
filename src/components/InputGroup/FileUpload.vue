<template>
  <p v-if="fileName !== ''" class="text-blue-500 px-4 pr-5 text-lg truncate relative">
    <span @click="downloadFile" class="select-none">{{fileName}}</span>
    <font-awesome-icon @click="deleteFile" icon="times-circle" class="cursor-pointer text-lg text-main absolute right-2 top-1" />
  </p>
  <div v-else class="w-full">
    <label :for="id" class="text-gray-400 pl-4 text-lg w-full cursor-pointer">
      上傳檔案{{index}}
    </label>
    <input :id="id" type="file" name="fileUpload"  accept=".csv,.pdf,.xls,.txt,.doc" class="w-full" @change="newFile">
  </div>
</template>

<script>
import FileSaver from 'file-saver'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 1
    },
    attachment: {
      type: Object,
      default: () => ({})
    },
    uuid: {
      type: String,
      default: ''
    },
    policyAttachmentId: {
      type: String,
      default: ''
    },
    fileAttachmentId: {
      type: [String,Number],
      default: ''
    },
    verify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileName: '',
    }
  },
  watch: {
    attachment: {
      handler(val) {
        if(val.fileName) {
          this.fileName = val.fileName
        }
      },
      deep: true
    }
  },
  methods: {
    async newFile(e) {
      this.fileName = e.target.files[0].name
      await this.$store.dispatch('common/UploadFile',{
        policyAttachmentId: this.uuid,
        file: e.target.files[0]
      })
      this.$emit('updatedFile')
    },
    async deleteFile() {
      const res = await this.$store.dispatch('common/DeleteFile',{
        policyAttachmentId: this.attachment.policyAttachmentId,
        fileAttachmentId: this.attachment.id
      })
      if(res.data.code == 1) {
        this.fileName = ''
        this.$emit('updatedFile')
      }
    },
    async downloadFile() {
      if(this.verify && this.policyAttachmentId && this.fileAttachmentId) {
        const res = await this.$store.dispatch('common/DownloadFile',{
          policyAttachmentId: this.policyAttachmentId,
          fileAttachmentId: this.fileAttachmentId
        })
        const blob = new Blob([res.data], {type: "application/octet-stream"});
        FileSaver.saveAs(blob, `${this.fileName}`);
      }
    }
  },
  mounted() {
    if(this.attachment.fileName) {
      this.fileName = this.attachment.fileName
    }
  }
  
}
</script>

<style scoped lang="scss">
[name="fileUpload"] {
  display: none;
}
</style>