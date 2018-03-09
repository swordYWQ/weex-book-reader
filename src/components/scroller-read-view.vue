<template>
     <scroller class="read-view" @click="showSetting" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}">
        <text ref="p-title" class="p-title" :style="{'color':readTheme?readTheme.color:'#333','background-color':readTheme?readTheme.bgcolor:'#FFF'}">{{nowChapterTitle}}</text>
        <text v-for="(item,index) in chapterBodyList" :key="index" class="p-item"  :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}">
          {{item}}
        </text>
        <div class="toggle-chapter" v-if="chapterBodyList.length>0" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}">
          <text class="chapter-prev" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}" @click="prevChapter">上一章</text>
          <text class="chapter-next" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||40 +'px','background-color':readTheme?readTheme.bgcolor:'#FFF'}" @click="nextChapter">下一章</text>
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
  computed: {
    settingConfig() {
      return this.$store.state.settingConfig
    },
    readTheme() {
      let index = this.settingConfig.readTheme
      let list = this.settingConfig.readThemeList
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.name === index) {
          return item
        }
      }
      return null
    }
  },
  methods: {
    showSetting(){
      this.$emit('showSetting')
    },
    scrollToTop() {
      let pTitle = this.$refs['p-title']
      if (pTitle) {
        dom.scrollToElement(pTitle, {})
      }
    },
    prevChapter() {
      // this.nowmark = this.nowmark === 0 ? 0 : this.nowmark - 1
      // this.getChapterContent(this.chapterList[this.nowmark])
      this.scrollToTop()
      this.$emit('prevChapter')
    },
    nextChapter() {
      this.scrollToTop()
      this.$emit('nextChapter')
      // this.nowmark =
      //   this.nowmark === this.chapterList.length - 1 ? 0 : this.nowmark + 1
      // this.getChapterContent(this.chapterList[this.nowmark])
    }
  }
}
</script>
<style scoped>
.read-view {
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:750px;
  height: 1334px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}
.p-title {
   padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
  font-size: 50;
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
  /* padding-bottom: 20px; */
}
.chapter-prev {
  /* font-size:40px; */
}
.chapter-next {
  /* font-size:40px; */
}
</style>
