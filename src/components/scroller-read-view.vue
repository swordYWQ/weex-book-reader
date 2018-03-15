<template>
     <scroller class="read-view" @click="showSetting" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF',height:deviceHeight+'px'}">
        <text ref="p-title" class="p-title" :style="{'color':readTheme?readTheme.color:'#333','background-color':readTheme?readTheme.bgcolor:'#FFF'}">{{nowChapterTitle}}</text>
        <text v-for="(item,index) in chapterBodyList" :key="index" class="p-item"  :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40+'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}">
          {{item}}
        </text>
        <div class="none-read-view" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}" v-if="!chapterBodyList||!chapterBodyList.length">
          <text class="none-read-view-text" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}" >正在加载书籍,请稍后...</text>
        </div>
        <div class="toggle-chapter" v-if="chapterBodyList.length>0" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}">
          <text class="chapter-prev" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}" @click="prevChapter">上一章</text>
          <text class="chapter-next" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}" @click="nextChapter">下一章</text>
        </div>
      </scroller>
</template>
<script>
var dom = weex.requireModule('dom')
export default {
  props: {
    nowChapterTitle: {
      type: String,
      default: '-'
    },
    chapterBodyList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      deviceHeight: 0
    }
  },
  computed: {
    settingConfig() {
      return this.$store.state.settingConfig
    },
    readTheme() {
      let index = this.settingConfig ? this.settingConfig.readTheme : ''
      let list = this.settingConfig ? this.settingConfig.readThemeList : []
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.name === index) {
          return item
        }
      }
      return null
    }
  },
  created() {
    let env = weex.config.env
    this.deviceHeight = env.deviceHeight * env.scale
  },
  methods: {
    showSetting() {
      this.$emit('showSetting')
    },
    scrollToTop() {
      let pTitle = this.$refs['p-title']
      if (pTitle) {
        dom.scrollToElement(pTitle, {
          animated: false
        })
      }
    },
    prevChapter() {
      // this.nowmark = this.nowmark === 0 ? 0 : this.nowmark - 1
      // this.getChapterContent(this.chapterList[this.nowmark])
      this.$emit('prevChapter')
      this.scrollToTop()
    },
    nextChapter() {
      this.$emit('nextChapter')
      this.scrollToTop()
      // this.nowmark =
      //   this.nowmark === this.chapterList.length - 1 ? 0 : this.nowmark + 1
      // this.getChapterContent(this.chapterList[this.nowmark])
    }
  }
}
</script>
<style scoped>
.read-view {
  position: fixed;
  left: 0;
  top: 0;
  width: 750px;
  /* height: 1334px; */
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
}
.p-title {
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
  font-size: 50px;
}
.p-item {
  padding-left: 20px;
  padding-right: 20px;
}
.now-time {
  font-size: 40px;
}
.content-footer {
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
}

.toggle-chapter {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.chapter-prev {
  /* font-size:40px; */
}
.chapter-next {
  /* font-size:40px; */
}
</style>
