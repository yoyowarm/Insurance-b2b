<template>
  <div class="left-nav bg-main" :class="{'open':openMenu }">
    <div class="user-mobile">
      <div class="avatar">
        <img src="../assets/images/head_pic.png" alt="">
      </div>
      <div class="flex items-start relative">
        <span class="name">Jason Wu</span>
        <TriangleIcon class="bg-main"/>
      </div>
    </div>
    <DynamicLink type="router" path="/" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/'}">
      <div class="icon quotation"/>
        <span class="text-white text-lg font-bold">報價明細</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/place-quotation/step1" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path.includes('/place-quotation/step')}">
      <div class="icon quotationList"/>
        <span class="text-white text-lg font-bold">場所報價</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/activity-quotation/step1" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path.includes('/activity-quotation/step')}">
        <div class="icon product"/>
        <span class="text-white text-lg font-bold">活動報價</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/Office-audit" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/Office-audit'}">
        <div class="icon news"/>
        <span class="text-white text-lg font-bold">總公司核保</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/branch-audit" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/branch-audit'}">
        <div class="icon news"/>
        <span class="text-white text-lg font-bold">分公司核保</span>
      </div>
    </DynamicLink>
  </div>
</template>

<script>
import DynamicLink from '@/components/DynamicLink'
import TriangleIcon from '@/components/TriangleIcon'
export default {
  props: {
    openMenu: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DynamicLink,
    TriangleIcon
  },
  computed: {
    path() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
  .left-nav {
    width: 120px;
    @apply pt-8 pb-20 overflow-auto
  }
  .user-mobile {
    @apply flex items-center mr-3
  }
   .user-mobile {
    border-bottom: 1px solid #EBEEF1;
    @apply hidden mr-0 pb-4 mb-4 justify-center flex-col;
    .avatar img{
      width: 80px;
      height: 80px;
      @apply mb-3
    }
    .name {
      color: #3c3c3c;
      @apply text-lg font-bold mt-0 mr-3
    }
    .triangle {
      @apply absolute right-0 top-2
    }
  }
  .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;
  }
  .nav-item {
    width: 100%;
    height: 110px;
    @apply flex flex-col justify-center items-center cursor-pointer;
    .icon {
      width: 50px;
      min-height: 40px;
      margin-bottom: 4px;
      @apply bg-no-repeat bg-center;
      &.news {
        background-image: url('../assets/images/leftbar_icon_5.png');
      }
      &.product {
        background-image: url('../assets/images/leftbar_icon_4.png');
      }
      &.quotationList {
        background-image: url('../assets/images/leftbar_icon_3.png');
      }
      &.freeQuotation {
        background-image: url('../assets/images/leftbar_icon_2.png');
      }
      &.quotation {
        background-image: url('../assets/images/leftbar_icon_1.png');
      }
    }
    &:hover, &.active {
      background-color: #fafafa;
      .icon {
        &.news {
          background-image: url('../assets/images/leftbar_icon_5_red.png');
        }
        &.product {
          background-image: url('../assets/images/leftbar_icon_4_red.png');
        }
        &.quotationList {
          background-image: url('../assets/images/leftbar_icon_3_red.png');
        }
        &.freeQuotation {
          background-image: url('../assets/images/leftbar_icon_2_red.png');
        }
        &.quotation {
          background-image: url('../assets/images/leftbar_icon_1_red.png');
        }
      }
      span {
        color: #B3112C
      }
    }
  }
  @media screen and (max-width: 770px) {
    .left-nav {
      width: 230px;
      left: -100%;
      @apply fixed top-0 pt-5 z-30 h-full bg-white transition-all duration-300 ease-in-out
    }
    .nav-item {
      height: 50px;
      @apply flex-row justify-start items-center pl-7;
      &:hover, &.active {
        @apply bg-main;
        span {
          color: #fff
        }
      }
      .icon {
        width: 50px;
        min-height: 40px;
        margin-bottom: 4px;
        @apply bg-no-repeat bg-center;
        &.news {
          background-image: url('../assets/images/leftbar_icon_5_black.png');
        }
        &.product {
          background-image: url('../assets/images/leftbar_icon_4_black.png');
        }
        &.quotationList {
          background-image: url('../assets/images/leftbar_icon_3_black.png');
        }
        &.freeQuotation {
          background-image: url('../assets/images/leftbar_icon_2_black.png');
        }
        &.quotation {
          background-image: url('../assets/images/leftbar_icon_1_black.png');
        }
      }
      &.open {
        @apply left-0
      }
      span {
        @apply text-gray-700
      }
      .icon {
        width: 20px;
        min-height: 24px;
        margin-right: 6px;
        @apply bg-no-repeat bg-center bg-contain mb-0;
      }
      &:hover, &.active {
        .icon {
          &.news {
            background-image: url('../assets/images/leftbar_icon_5.png');
          }
          &.product {
            background-image: url('../assets/images/leftbar_icon_4.png');
          }
          &.quotationList {
            background-image: url('../assets/images/leftbar_icon_3.png');
          }
          &.freeQuotation {
            background-image: url('../assets/images/leftbar_icon_2.png');
          }
          &.quotation {
            background-image: url('../assets/images/leftbar_icon_1.png');
          }
        }
      }
    }
    .left-nav.open {
      @apply left-0
    }
    .user-mobile {
      @apply flex
    }
  }
</style>