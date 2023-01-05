<template>
  <div class="layout" :class="{'open':openMenu }">
    <header class="header">
      <DynamicLink type="router" path="/" class="flex items-end">
        <img class="logo" src="../assets/images/logo.png" alt="">
        <div class="title md:text-xl sm:text-sm"><span>公共意外責任保險報價系統</span></div>
        <img class="mobile-logo" src="../assets/images/mobile_logo.png" alt="">
      </DynamicLink>
      <div class="user">
        <span class="name">{{userInfo.sub}}</span>
        <TriangleIcon class="bg-main"/>
      </div>
      <div class="menu" @click="openMenu= true">
        <img src="../assets/images/mobile_nav_icon.png" alt="">
      </div>
    </header>
    <div class="flex body bg-main-gray" ref="body" :class="{'mb-20': paginationPage && innerWidth < 771}" @scroll="handleScroll">
      <LeftNavigation :class="{'open':openMenu }" :openMenu.sync="openMenu" :scrollY="scrollY"/>
      <div class="right-block" :class="{'mb-8':paginationPage}">
        <router-view/>
      </div>
    </div>
    <Footer ref="footer" :pagination="paginationPage"/>
    <WindowResizeListener @resize="handleResize"/>
  <div class="mask-bg" :class="{'open':openMenu }" @click="openMenu= false"/>
  </div>
</template>

<script>
import DynamicLink from '@/components/DynamicLink'
import LeftNavigation from '@/components/LeftNavigation'
import TriangleIcon from '@/components/TriangleIcon'
import Footer from '@/components/Footer'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
export default {
  components: {
    DynamicLink,
    LeftNavigation,
    TriangleIcon,
    Footer,
    WindowResizeListener
  },
  data() {
    return {
      openMenu: false,
      scrollY: 0,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.home.userInfo,
    }),
    paginationPage() {
      return ['/parameterSetting/news-setting','/parameterSetting/document-download-setting','/parameterSetting/news-setting','/questionnaire-management','/quotation/list', '/product/list', '/news/list', '/quotation-ist'].includes(this.$route.path)
    },
    innerWidth() {
      return window.innerWidth
    }
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style scoped lang="scss">
  .layout.open {
    max-height: calc(100vh - 50px);
    @apply overflow-hidden
  }
  .header {
    height: 80px;
    border-top:5px solid #B3112C;
    border-bottom: 1px solid #e0e0e0;
    z-index: 20;
     @apply flex justify-between items-center px-5 pb-3 cursor-pointer fixed top-0 w-screen bg-white 
  }
  .header .logo {
    max-width: 489px;
    height: 50px;
  }
  .mobile-logo {
    @apply hidden
  }
  .title {
    @apply border-l-4 border-main pl-3 ml-3.5 h-6 text-main font-bold;
  }
  
  .menu {
    @apply hidden cursor-pointer mr-3
  }
  
  .body {
    min-height: calc(100vh - 80px);
    height: 100%;
    display: flex;
    margin-top: 80px;
  }
  .right-block  {
    width: calc(100vw - 130px);
    @apply  px-12 py-8
  }
  .user {
    @apply flex items-center mr-3
  }

  .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;
  }
  .name {
    color: #3c3c3c;
    @apply text-lg font-bold mt-1 cursor-pointer mr-2
  }
  .mask-bg {
    z-index:20;
    @apply hidden inset-0 bg-black opacity-75 w-screen h-screen 
  }
  
  @media screen and (max-width: 970px) {
    .header .logo {
      height: auto;
      @apply max-w-xs
    }
  }
  @media screen and (max-width: 770px) {
    .header {
      height: 50px;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.32);
      z-index:30;
      @apply fixed w-full bg-white top-0 pb-0
    }
    .body {
      margin-top: 50px;
      min-height: calc(100vh - 50px);
      height: 100%;
    }

    .right-block  {
      width: 100%;
      @apply  px-5 py-6
    }
    .menu {
      @apply block
    }

    .mask-bg.open {
      @apply fixed block overflow-hidden
    }
    .header .logo,.user, .title {
      @apply hidden
    }
    .mobile-logo {
      @apply block
    }
  }
  
</style>