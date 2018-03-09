<template>
     <!-- <div class="read-view"> -->
       <div class="read-view">
         <div class="read-content" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}">
        <text ref="p-title" class="p-title" :style="{'color':readTheme?readTheme.color:'#333'}">{{nowChapterTitle}}</text>
        
        <text v-for="(item,index) in chapterBodyList" :key="index" class="p-item"  :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">
          {{item}}
        </text>
        </div>
        <!-- <div class="read-footer">
        <text class="now-time" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">{{nowTime}}</text>
       </div>
       </div> -->
      </div>
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
    nowTime() {
      return this.moment().format('HH:mm')
    },
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
  width:750px;
  height: 1334px;
}
.read-content{
  /* width:auto; */
  height: 1334px;/*1294px;*/
  /* flex: 1; */
  /* flex-direction: column; */
  /* display: inline-flex; */
  /* padding-top: 20px; */
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  flex-wrap: wrap;
  /* column-width: 750px; */
}
.p-title {
  width:750px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
  font-size: 50;
}
.p-item {
  width:750px;
  padding-left: 20px;
  padding-right: 20px;
}
.now-time {
  font-size: 35px;
}
.read-footer {
  position:absolute;
  bottom:0;
  left:0;
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
}
.chapter-next {
}
</style>
