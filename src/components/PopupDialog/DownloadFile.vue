<template>
   <div class="popup" ref="modal" :class="{'open':open }">
    <div class="dialog">
      <div class="header">{{headerText}}
        <div class="icon" @click="$emit('update:open',false)">
          <font-awesome-icon icon="times-circle" />
        </div>
      </div>
      <div class="body">
        <div class="flex flex-row">
          <span class="mr-4">關聯號:{{item.SerialNo}}</span>
          <span class="mr-4">要保人:{{item.InsuredName}}</span>
          <span>被保人:{{item.ApplicantName}}</span>
        </div>
        <div class="downloadList">
          <div class="head">
            <span>文件名稱</span>
            <span>列印</span>
          </div>
          <ul class="body">
            <li>
              <span>要保書</span>
              <a v-if="loading.length === 0" class="print cursor-pointer" :href="`${apiURL}Document/GetInsuranceDocument?orderNo=${orderNo}&insuranceProjectId=${item.id}`" download><font-awesome-icon :icon="['fa','print']" /></a>
            </li>
            <li>
              <span>報價明細</span>
              <a v-if="loading.length === 0" class="print cursor-pointer" :href="`${apiURL}Document/GetPlaceQuotationDocument?orderNo=${orderNo}&insuranceProjectId=${item.id}`" download><font-awesome-icon :icon="['fa','print']" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="confirm" class="flex w-full justify-around py-4">
        <Button @click.native="$emit('update:open',false)">{{cancel}}</Button>
        <Button @click.native="$emit('ok')">{{ok}}</Button>
      </div>
    </div>
    <div class="mask-bg download" @click="() => { if(maskClose){$emit('update:open',false)} }"/>
  </div>
</template>

<script>
import Button from '@/components/Button'
import { mapState } from 'vuex'
export default {
  components: {
    Button,
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: ''
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    ok: {
      type: String,
      default: 'ok'
    },
    cancel: {
      type: String,
      default: 'cancel'
    },
    item: {
      type: Object,
      default: () => ({})
    },
    orderNo: {
      type: String,
      default: ''
    },
  },
   data () {
    return {
      apiURL: process.env.VUE_APP_API_URL,
      value: false,
      whitelist: ['H182','H307','H076','G975','H408','A242','F306','G345','F418','G863']
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo,
      'loading': state => state.app.loading,
    }),
  },
  methods: {
    show () {
      this.value = true
    }
  }
}
</script>

<style lang="scss" scoped>
.downloadList {
  @apply mt-2;
  .head {
    background: #F5F5F5;
    @apply flex flex-row justify-between items-center rounded-md w-full px-3 py-2 text-sm
  }
  .body {
    padding: 0px!important;
    @apply flex flex-row flex-wrap;
    li {
      border-bottom: 1px solid #E0E0E0;
      @apply flex flex-row justify-between items-center w-full px-3 py-3 text-sm
    }
  }
  .print {
    @apply text-blue-500 text-lg
  }
}
  .popup {
    @apply hidden relative;
    &.open {
      @apply block;
    }
  }
  .dialog {
    position: fixed;
    top: 20%;
    left: 0;
    right:0;
    margin: 0 auto;
    max-width: 640px;
    width: 100%;
    z-index: 100;
    @apply bg-white rounded-2xl;
    .header {
      height: 50px;
      @apply flex items-center justify-center relative bg-main w-full rounded-t-2xl text-white text-lg;
    }
    .icon {
      @apply absolute inset-y-0 my-auto right-0 mr-3 text-3xl cursor-pointer;
    }
    .body {
      overflow: scroll;
      max-height: 60vh;
      @apply  p-6
    }
  }
  .mask-bg {
    @apply inset-0 bg-black opacity-75 w-screen h-screen z-20 overflow-hidden fixed
  }

  @media (max-width: 770px) {
    .dialog {
      width: 90%;
      @apply bg-white rounded-2xl;

    }
  }
</style>