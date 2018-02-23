<template>
  <div>
    <view-header :title="activeViewTitle" @tabTo="onTabTo"></view-header>
    <!-- <div class="header">
      <text class="header-title">{{activeViewTitle}}</text>
    </div> -->
    <router-view style="flex:1;"></router-view>
    <tab-bar :activeName="activeBarName" :list="viewList" @tabTo="onTabTo"></tab-bar>
  </div>
</template>
<script>
import viewHeader from '../components/view-header.vue'
import tabBar from '../components/tabBar.vue'
export default {
  components: {
    // WxcTabBar,
    'tab-bar': tabBar,
    'view-header': viewHeader
  },
  data() {
    return {
      // activeName: 'bookshelf',
      viewList: [
        {
          content: '书架',
          name: 'bookshelf',
          icon: '\ue67c'
        },
        {
          content: '发现',
          name: 'findingview',
          icon: '\ue61d'
        },
        {
          content: '我的',
          name: 'mineview',
          icon: '\ue611'
        }
      ]
    }
  },
  computed: {
    activeBarName(){
      return this.$store.state.activeBarName
    },
    activeViewTitle() {
      for (let i = 0; i < this.viewList.length; i++) {
        let item = this.viewList[i]
        console.log(item.name, this.activeBarName)
          if (item.name === this.activeBarName) {
            return item.content
          }
      }
    }
  },
  methods: {
    onTabTo(_key) {
      // let _key = _result.data.key || ''
      // this.$router && this.$router.push('/' + _key)
      // this.activeName = _key
      this.$store.commit('SET_ACTIVE_BAR_NAME' , {name:_key})
      
      this.jump({ name: _key })
    }
  }
}
</script>
<style scoped>
/* .header {
  position: relative;
  height: 120px;
  line-height: 120px;
  margin-bottom: 3px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #dddddd;
  background-color: skyblue;
  padding: 25px;
  justify-content: center;
  align-items: center;
}
.header-title {
  text-align: center;
  font-size: 45px;
} */
</style>
