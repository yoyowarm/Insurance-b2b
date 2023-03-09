<template>
  <div class="left-nav relative bg-main" :class="{'open':openMenu, 'overflow-auto': windowWidth <= 600 }">
    <div class="user-mobile">
      <div class="flex items-start relative">
        <span class="name">{{userInfo.sub}}</span>
        <TriangleIcon class="bg-main"/>
      </div>
    </div>
    <DynamicLink type="router" path="/" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/'}">
      <div class="icon home"/>
        <span class="text-white text-lg font-bold">回首頁</span>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('QuoteDetails')" type="router" path="/quotation-list" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/quotation-list'}">
      <div class="icon quotation"/>
        <span class="text-white text-lg font-bold">報價明細</span>
      </div>
    </DynamicLink>
    <DynamicLink v-if="level > 0" type="router" path="/underwriting-list" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/underwriting-list'}">
      <div class="icon underwriting"/>
        <span class="text-white text-lg font-bold">核保明細</span>
      </div>
    </DynamicLink>
    <DynamicLink data-cy="place-quotation" v-if="permissions.includes('PlaceQuote')" type="router" path="/place-quotation/step1" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path.includes('/place-quotation/step')}">
      <div class="icon placeQuotation"/>
        <span class="text-white text-lg font-bold">場所報價</span>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('ActivityQuote')" type="router" path="/activity-quotation/step1" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path.includes('/activity-quotation/step')}">
        <div class="icon activityQuotation"/>
        <span class="text-white text-lg font-bold">活動報價</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/product/list" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/product/list'}">
        <div class="icon product"/>
        <span class="text-white text-lg font-bold">文件下載</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/news/list" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/news/list'}">
        <div class="icon news"/>
        <span class="text-white text-lg font-bold">最新消息</span>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('QuestionnaireManage')" type="router" path="/questionnaire-management" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path.includes('/questionnaire-management')}">
        <div class="icon questionnaire"/>
        <span class="text-white text-sm font-bold">詢問表填寫及查詢</span>
      </div>
    </DynamicLink>
    <!-- <DynamicLink type="router" path="/Office-audit" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/Office-audit'}">
        <div class="icon branchAudit"/>
        <span class="text-white text-lg font-bold">總公司核保</span>
      </div>
    </DynamicLink>
    <DynamicLink type="router" path="/branch-audit" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/branch-audit'}">
        <div class="icon officeAudit"/>
        <span class="text-white text-lg font-bold">分公司核保</span>
      </div>
    </DynamicLink> -->
    <DynamicLink v-if="permissions.includes('PermissionSetting')" type="router" path="/permissionSetting" @click.native="$emit('update:openMenu', false)">
      <div class="nav-item" :class="{'active': path === '/permissionSetting'}">
        <div class="icon permissionSetting"/>
        <span class="text-white text-lg font-bold">權限群組設定</span>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('PlaceActivityTypeSetting') || permissions.includes('CountyMinimumSetting') || permissions.includes('BasicPremium') || permissions.includes('QuoteInsuranceAmount')" type="router" path="/parameterSetting/category" @click.native="$emit('update:openMenu', false)" >
      <div @mouseover="showCategory = true" @mouseout="showCategory = false" class="nav-item parameterSetting-menu sub-pages relative" :class="{'active': path.includes('parameterSetting'),'h180': (windowWidth <=770 && path.includes('parameterSetting'))}">
        <div class="flex flex-row items-center md:flex-col" ref="parameterSetting">
          <div class="icon parameterSetting"/>
          <span class="text-white text-lg font-bold">參數設定</span>
        </div>
        <div v-show="(windowWidth >770 && showCategory) || (windowWidth <=770 && path.includes('parameterSetting'))" class="fixed-menu md:pl-0 md:items-center">
          <DynamicLink v-if="permissions.includes('PlaceActivityTypeSetting')" type="router" path="/parameterSetting/category" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/category'}">投保行業</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('CountyMinimumSetting')" type="router" path="/parameterSetting/minimumAmount" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/minimumAmount'}">縣市最低保額</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('BasicPremium')" type="router" path="/parameterSetting/basic-premium-setting" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/basic-premium-setting'}">基本純保費</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('QuoteInsuranceAmount')" type="router" path="/parameterSetting/quote-separately" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/quote-separately'}">另行報價保額</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('NewsSetting')" type="router" path="/parameterSetting/news-setting" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/news-setting'}">最新消息設定</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('DocumentDownloadSetting')" type="router" path="/parameterSetting/document-download-setting" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/parameterSetting/document-download-setting'}">文件下載設定</span>
          </DynamicLink>
        </div>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('SuggestTermSetting') || permissions.includes('QuoteAndWeight') || permissions.includes('QuoteAmount')" type="router" path="/termsSetting/proposedTerms" @click.native="$emit('update:openMenu', false)">
      <div @mouseover="showTerms = true" @mouseout="showTerms = false" class="nav-item sub-pages" :class="{'active': path.includes('termsSetting'), 'h180': (windowWidth <=770 && path.includes('termsSetting'))}">
        <div class="flex flex-row items-center md:flex-col" ref="SuggestTermSetting">
          <div class="icon termsSetting"/>
          <span class="text-white text-lg font-bold">條款設定</span>
        </div>
        <div v-show="(windowWidth >770 && showTerms) || (windowWidth <=770 && path.includes('termsSetting'))" class="fixed-menu md:pl-0 md:items-center" >
          <DynamicLink v-if="permissions.includes('SuggestTermSetting')" type="router" path="/termsSetting/proposedTerms" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/termsSetting/proposedTerms'}">建議條款</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('QuoteAndWeight')" type="router" path="/termsSetting/quotationAndWeight" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/termsSetting/quotationAndWeight'}">另行報價和權重</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('QuoteAmount')" type="router" path="/termsSetting/quotationAndAmount" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/termsSetting/quotationAndAmount'}">另行報價額度</span>
          </DynamicLink>
        </div>
      </div>
    </DynamicLink>
    <DynamicLink v-if="permissions.includes('UnderwriteLevel') || permissions.includes('UnderwriteGroup')" type="router" path="/underwritingCooperation/Setting" @click.native="$emit('update:openMenu', false)">
      <div @mouseover="showUnderwriting = true" @mouseout="showUnderwriting = false" class="nav-item sub-pages" :class="{'active': path.includes('underwritingCooperation'), 'h180': (windowWidth <=770 && path.includes('underwritingCooperation'))}">
        <div class="flex flex-row items-center md:flex-col" ref="underwritingCooperation">
          <div class="icon underwritingCooperation"/>
          <span class="text-white text-lg font-bold">核保明細設定</span>
        </div>
        <div v-show="(windowWidth >770 && showUnderwriting) || (windowWidth <=770 && path.includes('underwritingCooperation'))" class="fixed-menu md:pl-0 md:items-center" >
          <DynamicLink v-if="permissions.includes('UnderwriteGroup')" type="router" path="/underwritingCooperation/Setting" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/underwritingCooperation/Setting'}">核保組織</span>
          </DynamicLink>
          <DynamicLink v-if="permissions.includes('UnderwriteLevel')" type="router" path="/underwritingCooperation/Level" @click.native="$emit('update:openMenu', false)">
            <span class="text-white text-lg font-bold" :class="{'pagination': path !== '/underwritingCooperation/Level'}">核保明細階級</span>
          </DynamicLink>
        </div>
      </div>
    </DynamicLink>
    <WindowResizeListener @resize="handleResize"/>
  </div>
</template>

<script>
import DynamicLink from '@/components/DynamicLink'
import TriangleIcon from '@/components/TriangleIcon'
import WindowResizeListener from '@/components/WindowResizeListener'
import { mapState } from 'vuex'
export default {
  props: {
    openMenu: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Number,
      default: 0
    }
  },
  components: {
    DynamicLink,
    TriangleIcon,
    WindowResizeListener
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showCategory: false,
      showTerms: false,
      showUnderwriting: false,
      parameterSettingTop: 0,
      SuggestTermSettingTop: 0,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo,
      permissions: state => state.home.userInfo.permissions,
      level: state => state.home.level
    }),
    path() {
      return this.$route.path
    }
  },
  methods: {
    handleResize () {
      this.windowWidth = window.innerWidth
    },
  },
  
}
</script>

<style scoped lang="scss">
  .left-nav {
    width: 130px;
    @apply pt-8 pb-20
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
    &.h160 {
      height: 160px;
    }
    &.h180 {
      height: 190px;
    }
    .icon {
      width: 50px;
      min-height: 40px;
      margin-bottom: 4px;
      @apply bg-no-repeat bg-center;
      &.underwriting {
        background-image: url('../assets/images/12.png');
      }
      &.underwritingCooperation {
        background-image: url('../assets/images/11.png');
      }
      &.home {
        background-image: url('../assets/images/10.png');
      }
      &.questionnaire {
        background-image: url('../assets/images/9.png');
      }
      &.termsSetting {
        background-image: url('../assets/images/8.png');
      }
      &.parameterSetting  {
        background-image: url('../assets/images/7.png');
      }
      &.permissionSetting {
        background-image: url('../assets/images/6.png');
      }
      &.officeAudit {
        background-image: url('../assets/images/5.png');
      }
      &.branchAudit {
        background-image: url('../assets/images/4.png');
      }
      &.activityQuotation {
        background-image: url('../assets/images/3.png');
        height: 45px;
      }
      &.placeQuotation {
        background-image: url('../assets/images/2.png');
      }
      &.quotation {
        background-image: url('../assets/images/1.png');
      }
      &.news {
        background-image: url('../assets/images/leftbar_icon_5.png');
      }
      &.product {
        background-image: url('../assets/images/leftbar_icon_4.png');
      }
      
    }
    .fixed-menu {
      background-color: #fafafa;
      width: 140px;
      height: 125px;
      z-index: 2;
      @apply absolute left-28 ml-2 mt-3 flex flex-col justify-center items-center shadow-xl text-xl rounded-r-lg
    }
    &:hover, &.active {
      background-color: #fafafa;
      .icon {
        &.underwriting {
          background-image: url('../assets/images/12r.png');
        }
        &.underwritingCooperation {
          background-image: url('../assets/images/11r.png');
        }
        &.home {
          background-image: url('../assets/images/10r.png');
        }
        &.questionnaire {
          background-image: url('../assets/images/9r.png');
        }
        &.termsSetting {
          background-image: url('../assets/images/8r.png');
        }
        &.parameterSetting {
          background-image: url('../assets/images/7r.png');
        }
        &.permissionSetting {
          background-image: url('../assets/images/6r.png');
        }
        &.officeAudit {
          background-image: url('../assets/images/5r.png');
        }
        &.branchAudit {
          background-image: url('../assets/images/4r.png');
        }
        &.activityQuotation {
          background-image: url('../assets/images/3r.png');
        }
        &.placeQuotation {
          background-image: url('../assets/images/2r.png');
        }
        &.quotation {
          background-image: url('../assets/images/1r.png');
        }
         &.news {
          background-image: url('../assets/images/leftbar_icon_5_red.png');
        }
        &.product {
          background-image: url('../assets/images/leftbar_icon_4_red.png');
        }
      }
      span {
        color: #B3112C
      }
      .pagination {
        color: black!important;
        font-weight: 400!important;
        font-size: 14px!important;
      }
    }
  }
  .parameterSetting-menu .fixed-menu {
      height: 200px;
      margin-top:90px
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
      &.h160 {
        @apply h-28
      }
      &.h180 {
        height: 230px;
      }
      &.sub-pages {
        @apply flex-col justify-center items-start
      }
      .icon {
        width: 50px;
        min-height: 40px;
        margin-bottom: 4px;
        @apply bg-no-repeat bg-center;
        &.underwriting {
          background-image: url('../assets/images/12b.png');
        }
        &.underwritingCooperation {
          background-image: url('../assets/images/11b.png');
        }
        &.home {
          background-image: url('../assets/images/10b.png');
        }
        &.questionnaire {
          background-image: url('../assets/images/9b.png');
        }
         &.termsSetting {
          background-image: url('../assets/images/8b.png');
        }
        &.parameterSetting  {
          background-image: url('../assets/images/7b.png');
        }
        &.permissionSetting {
          background-image: url('../assets/images/6b.png');
        }
        &.officeAudit {
          background-image: url('../assets/images/5b.png');
        }
        &.branchAudit {
          background-image: url('../assets/images/4b.png');
        }
        &.activityQuotation {
          background-image: url('../assets/images/3b.png');
        }
        &.placeQuotation {
          background-image: url('../assets/images/2b.png');
        }
        &.quotation {
          background-image: url('../assets/images/1b.png');
        }
        &.news {
          background-image: url('../assets/images/leftbar_icon_5_black.png');
        }
        &.product {
          background-image: url('../assets/images/leftbar_icon_4_black.png');
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
          &.underwriting {
            background-image: url('../assets/images/12.png');
          }
          &.underwritingCooperation {
            background-image: url('../assets/images/11.png');
          }
          &.home {
            background-image: url('../assets/images/10.png');
          }
          &.questionnaire {
            background-image: url('../assets/images/9.png');
          }
           &.termsSetting {
            background-image: url('../assets/images/8.png');
          }
          &.parameterSetting  {
            background-image: url('../assets/images/7.png');
          }
          &.permissionSetting {
            background-image: url('../assets/images/6.png');
          }
          &.officeAudit {
            background-image: url('../assets/images/5.png');
          }
          &.branchAudit {
            background-image: url('../assets/images/4.png');
          }
          &.activityQuotation {
            background-image: url('../assets/images/3.png');
          }
          &.placeQuotation {
            background-image: url('../assets/images/2.png');
          }
          &.quotation {
            background-image: url('../assets/images/1.png');
          }
          &.news {
            background-image: url('../assets/images/leftbar_icon_5.png');
          }
          &.product {
            background-image: url('../assets/images/leftbar_icon_4.png');
          }
        }
      }
      .fixed-menu {
        width: auto;
        height: auto;
        @apply relative flex flex-col left-0 mt-0 shadow-none pl-0 items-center text-base;
      }
      &.active .fixed-menu {
        background-color: #B3112C;
        width: auto;
        height: auto;
        @apply flex flex-col justify-center mt-0 items-start shadow-none pl-4 text-xl rounded-none;
        &.parameterSetting-menu {
          height: 230px;
          margin-top:90px
        }
      }
    }
    // .nav-item.parameterSetting-menu {
    //   height: 230px;
    // }
    .left-nav.open {
      @apply left-0
    }
    .user-mobile {
      @apply flex
    }
  }
</style>