<template>
  <div class="reading-view">
    <!--小说章节内容-->
    <read-chapter ref="chapter" :isShowChapter="isShowChapter" :bookTitle="bookTitle" :chapterList="chapterList" @on-close="toggleChapterView" @on-select-chapter="goToChapter" style="z-index:5;"></read-chapter>
    <!--小说阅读设置-->
    <read-setting  v-if="isShowSetting" :bookTitle="bookTitle" @on-hide-setting="isShowSetting=false" @on-menu="toggleChapterView" @on-exit="goback" style="z-index:1;"></read-setting>

    <!--小说阅读主体-->
    <div class="reading-content" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF'}">
      <!-- <div class="content-top" :style="{'background-color':readingStyles.bgColor}">
        <text class="p-item">{{nowChapterTitle}}</text>
      </div> -->
      <scroller class="content-body">
        <text ref="p-title" class="p-item" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">{{nowChapterTitle}}</text>
        <text v-for="(item,index) in chapterBodyList" :key="index" class="p-item" @click="isShowSetting=!isShowSetting" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">
          {{item}}
        </text>
        <div class="toggle-chapter" v-if="chapterContent">
          <text class="chapter-prev" @click="prevChapter">上一章</text>
          <text class="chapter-next" @click="nextChapter">下一章</text>
        </div>
      </scroller>
      <div class="content-footer">
        <text class="now-time" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">{{nowTime}}</text>
      </div>
    </div>
  </div>
</template>
<script>
var animation = weex.requireModule('animation')
var dom = weex.requireModule('dom')

import readChapter from '../components/read-chapter.vue'
import readSetting from '../components/read-setting.vue'
export default {
  name: 'readingview',
  components: {
    'read-chapter': readChapter,
    'read-setting': readSetting
  },
  data() {
    return {
      Toc: null,
      isShowChapter: false, // 是否显示章节列表
      isShowSetting: false, //是否显示设置面板

      chapterContent: null, //章节内容

      nowmark: 0
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
    },
    nowTime() {
      return this.moment().format('HH:mm')
    },
    chapterInfo() {
      return this.$store.state.ChapterInfo
    },
    bookTitle() {
      return this.$route.query.bookTitle || ''
    },
    chapterList() {
      let bookId = this.$route.query.bookId
      if (this.chapterInfo && this.chapterInfo.length > 0) {
        for (let i = 0; i < this.chapterInfo.length; i++) {
          let item = this.chapterInfo[i]
          if (item.book === bookId) {
            return item.chapters
          }
        }
      }
      return []
    },
    chapterBodyList() {
      let body = this.chapterContent ? this.chapterContent.body : ''
      return body.replace(/[↵]/g, '\n').split('\n')
    },
    nowChapterTitle() {
      return this.chapterList.length > 0
        ? this.chapterList[this.nowmark].title
        : '-'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.chapterList.length > 0) {
        this.getChapterContent(this.chapterList[this.nowmark])
      } else {
        this.getChapterList()
      }
    },
    goback() {
      console.log('goback')
      this.$router.back()
    },
    toggleChapterView() {
      console.log('chapter%s',this.isShowChapter.toString())
      // this.isShowSetting = false //隐藏设置面板

      this.isShowChapter = !this.isShowChapter
      var chapter = this.$refs.chapter
      animation.transition(chapter, {
        styles: {
          transform: this.isShowChapter ? 'translateX(0)' : 'translateX(-750px)'
        },
        duration: 300, //ms
        timingFunction: 'ease',
        delay: 100 //ms
      })
    },
    // 获取章节列表
    getChapterList() {
      let bookId = this.$route.query.bookId
      this.request(
        '/mix-atoc/' +
          bookId +
          this.translate({
            view: 'chapters'
          }),
        1,
        data => {
          if (data.ok) {
            let chapterInfo = data.mixToc
            this.$store.dispatch('SET_CHAPTERINFO', { info: chapterInfo })
            this.getChapterContent(this.chapterList[0])
          }
        }
      )
    },
    // 获取章节内容
    getChapterContent(item) {
      // let bookId = this.$route.query.bookId
      let link = item ? item.link : ''
      if (link) {
        let p = '' // this.translate({ k: '2124b73d7e2e1945', t: '1468223717' })
        this.request(`/chapter/${encodeURIComponent(link)}${p}`, 2, data => {
          if (data.ok) {
            let pTitle = this.$refs['p-title']
            if (pTitle) {
              dom.scrollToElement(pTitle, {})
            }

            this.chapterContent = data.chapter
          }
        })
      }
    },
    goToChapter(index) {
      this.nowmark = index
      this.getChapterContent(this.chapterList[this.nowmark])
      this.isShowChapter = false
    },
    prevChapter() {
      this.nowmark = this.nowmark === 0 ? 0 : this.nowmark - 1
      this.getChapterContent(this.chapterList[this.nowmark])
    },
    nextChapter() {
      this.nowmark =
        this.nowmark === this.chapterList.length - 1 ? 0 : this.nowmark + 1
      this.getChapterContent(this.chapterList[this.nowmark])
    }
  }
}
</script>
<style scoped>
.reading-view {
  width: 750px;
  height: 1334px;
}

.reading-content {
  width: 750px;
  height: 1334px;
}
/* .content-top {

  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
} */
.content-body {
  height: 1294px;
}
.p-item {
  /* font-size: 56; */
  padding-left: 20px;
  padding-right: 20px;
}
.now-time {
  font-size: 40px;
}
.content-footer {
  /* position: fixed;
  bottom: 0;
  left: 0; */
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
.touch-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 750px;
  height: 1334px;
  flex-direction: row;
}
.prev-box {
  flex: 2;
}
.setting-box {
  flex: 1;
}
.next-box {
  flex: 2;
}
</style>

