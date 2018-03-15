<template>
  <div>
    <view-header :title="activeViewTitle" @tabTo="onTabTo"></view-header>
    <tab-bar :activeName="activeBarName" :list="viewList" @tabTo="onTabTo"></tab-bar>
    <!-- <div class="header">
      <text class="header-title">{{activeViewTitle}}</text>
    </div> -->
    <!-- <keep-alive> -->
      <router-view ref="homeview" class="home-view" :style="{height:deviceHeight+'px'}"></router-view>
    <!-- </keep-alive> -->
    <!-- <component :is="activeBarName" style="flex:1"></component> -->
    
  </div>
</template>
<script>
import viewHeader from '../components/view-header.vue'
import tabBar from '../components/tabBar.vue'

// import BookShelf from './BookShelf.vue'
// import FindingView from './FindingView.vue'
// import MineView from './MineView.vue'
export default {
  components: {
    // WxcTabBar,
    'tab-bar': tabBar,
    'view-header': viewHeader
    // 'bookshelf': BookShelf,
    // 'findingview': FindingView,
    // 'mineview': MineView
  },
  data() {
    return {
      // activeName: 'bookshelf',
      deviceHeight: 0,
      viewList: [
        {
          content: '书架',
          name: 'bookshelf',
          icon: '\ue67c'
        },
        {
          content: '发现',
          name: 'find',
          icon: '\ue61d'
        },
        {
          content: '我的',
          name: 'mine',
          icon: '\ue611'
        }
      ]
    }
  },
  computed: {
    activeBarName() {
      return this.$store.state.activeBarName
    },
    activeViewTitle() {
      for (let i = 0; i < this.viewList.length; i++) {
        let item = this.viewList[i]
        if (item.name === this.activeBarName) {
          return item.content
        }
      }
    }
  },
  created() {
    let env = weex.config.env
    this.deviceHeight = (env.deviceHeight - 240) * env.scale
    this.initLocalData()
  },
  methods: {
    onTabTo(_key) {
      // let _key = _result.data.key || ''
      // this.$router && this.$router.push('/' + _key)
      // this.activeName = _key
      this.$store.commit('SET_ACTIVE_BAR_NAME', { name: _key })

      this.jump({ name: _key })
    },
    initLocalData() {
      // this.$store.dispatch('GET_BOOKLIST') // 初始化从本地获取书架列表
      this.$store.dispatch('GET_CHAPTERINFO') // 初始化本地缓存的章节列表
      this.$store.dispatch('GET_MARKINFO') // 初始化书签信息
      this.$store.dispatch('GET_SETTINGCONFIG') // 初始化本地配置
      this.$store.dispatch('getApiCache') // 初始化缓存的api结果
    }
  }
}
</script>
<style scoped>
.home-view {
  /* flex: 1; */
  width:750px;
  margin-top:120px;
  margin-bottom:120px;
}
</style>
