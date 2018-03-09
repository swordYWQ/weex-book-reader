<template>
  <div class="read-setting">
    <div class="seting-none" @click="HideSetting"></div>
    <div class="setting-top">
      <text class="exit-icon" @click="exit">&#xe641;</text>
      <text class="book-title">{{bookTitle}}</text>
    </div>

    <div class="setting-body">
    <div class="setting-view" v-if="isShowSetting">
      <list>
        <cell class="setting-row">
          <text class="setting-btn" @click="changeFontSize(-1)">-</text>
          <text class="setting-text">字号:{{settingConfig?settingConfig.readFontSize:'undefined'}}</text>
          <text class="setting-btn" @click="changeFontSize(1)">+</text>
        </cell>
        <cell>
          <div class="setting-row">
            <text class="setting-text">无</text>
          </div>
        </cell>
        <cell class="setting-row">
            <div class="color-box" :style="{'background-color':item.bgcolor,'border-color':settingConfig.readTheme === item.name?'red':'#FFF'}" v-for="(item,index) in settingConfig.readThemeList" :key="index" @click="changeReadTheme(item)">
              <text class="setting-view-text" :style="{'color':item.color}">{{item.title}}</text>
            </div>
        </cell>
      </list>
    </div>
    <div class="setting-group" v-else>
      <div class="setting-item" @click="lookMenu">
        <text class="setting-icon">&#xe62e;</text>
        <text class="setting-text">查看目录</text>
      </div>
       <div class="setting-item">
        <text class="setting-icon">&#xe64a;</text>
        <text class="setting-text">缓存章节</text>
      </div>
      <div class="setting-item" @click="showSetting">
        <text class="setting-icon">&#xe632;</text>
        <text class="setting-text">阅读设置</text>
      </div>
      <div class="setting-item" @click="$emit('on-exit')">
        <text class="setting-icon">&#xe642;</text>
        <text class="setting-text">退出阅读</text>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'read-setting',
  data() {
    return {
      isShowSetting: false
    }
  },
  props: {
    bookTitle: {
      type: String,
      default: '-'
    }
  },
  computed: {
    settingConfig() {
      return this.$store.state.settingConfig
    }
  },
  methods: {
    lookMenu(){
      this.$emit('on-menu')
    },
    exit(){
      // this.$emit('on-exit')
      this.$router.back()
    },
    HideSetting(){
      this.$emit('on-hide-setting')
    },
    showSetting() {
      this.isShowSetting = true
    },
    changeFontSize(num) {
      if (this.settingConfig) {
        let config = Object.assign({}, this.settingConfig)
        config.readFontSize = config.readFontSize + num
        this.$store.dispatch('SET_SETTINGCONFIG', config)
      }
    },
    changeReadTheme(item) {
      if (this.settingConfig) {
        let config = Object.assign({}, this.settingConfig)
        config.readTheme = item.name
        this.$store.dispatch('SET_SETTINGCONFIG', config)
      }
    }
  }
}
</script>
<style scoped>
.read-setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 1334px;
  /* z-index: 1; */
}
.setting-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 100px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #555;
  /* z-index: 2; */
}
.seting-none {
  width: 750px;
  height: 1334px;
  /* z-index: 1; */
}
.exit-icon {
  font-family: iconfont1;
  font-size: 40px;
  color: #fff;
  margin-left: 20px;
}
.book-title {
  flex: 1;
  font-weight: 700;
  font-size: 40px;
  color: #fff;
  text-align: center;
}

.setting-body {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: #555;
}

.setting-view {
  width: 750px;
  height: 300px;
}

.setting-group {
  width: 750px;
  height: 150px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.setting-item {
  flex: 1;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.setting-icon {
  font-family: iconfont1;
  font-size: 50px;
  color: #fff;
  text-align: center;
}
.setting-text {
  /* flex:1; */
  font-size: 30px;
  color: #fff;
  text-align: center;
}

.setting-row {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100px;
}

.color-box {
  width: 80px;
  height: 80px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-width: 1px;
  border-style: solid;
}
.setting-btn{
  width:50px;
  height:50px;
  font-size: 35px;
  color: #fff;
  text-align: center;
}

.setting-view-text {
  font-size: 30px;
  text-align: center;
}
</style>
