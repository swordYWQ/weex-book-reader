<template>
  <div class="reading-view">
   
    <!--小说阅读主体-->
    <div class="reading-content">
      <!-- <div class="content-top" :style="{'background-color':readingStyles.bgColor}">
        <text class="p-item">{{nowChapterTitle}}</text>
      </div> -->

      <!--滚动翻阅-->
      <scroller-read-view :nowChapterTitle="nowChapterTitle" :chapterBodyList="chapterBodyList" @prevChapter="prevChapter" @nextChapter="nextChapter" @showSetting="isShowSetting=!isShowSetting"></scroller-read-view>
      
      <!--滑动翻页-->
      <!-- <swipe-read-view :nowChapterTitle="nowChapterTitle" :chapterBodyList="chapterBodyList" @prevChapter="prevChapter" @nextChapter="nextChapter" @click="isShowSetting=!isShowSetting"></swipe-read-view> -->
      <!-- <scroller class="content-body">
        <text ref="p-title" class="p-item" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">{{nowChapterTitle}}</text>
        <text v-for="(item,index) in chapterBodyList" :key="index" class="p-item" @click="isShowSetting=!isShowSetting" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">
          {{item}}
        </text>
        <div class="toggle-chapter" v-if="chapter">
          <text class="chapter-prev" @click="prevChapter">上一章</text>
          <text class="chapter-next" @click="nextChapter">下一章</text>
        </div>
      </scroller> -->
      <!-- <div class="content-footer">
        <text class="now-time" :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig.readFontSize||56}">{{nowTime}}</text>
      </div> -->
    </div>

    <!--小说阅读设置-->
    <!-- <read-setting  v-if="isShowSetting" :bookTitle="bookTitle" @on-hide-setting="isShowSetting=false" @on-menu="toggleChapterView" @on-exit="goback"></read-setting> -->
      <div class="read-setting" v-if="isShowSetting">
    <div class="seting-none" @click="HideSetting"></div>
    <div class="setting-top">
      <text class="exit-icon" @click="exit">&#xe641;</text>
      <text class="book-title">{{bookTitle}}</text>
    </div>

    <div class="setting-body">
    <div class="setting-view" v-if="showSet">
      <list>
        <cell class="setting-row">
          <text class="setting-btn" @click="changeFontSize(-1)">-</text>
          <text class="setting-text">字号:{{settingConfig?settingConfig.readFontSize:'undefined'}}</text>
          <text class="setting-btn" @click="changeFontSize(1)">+</text>
        </cell>
        <cell class="setting-row">
            <div class="color-box" :style="{'background-color':item.bgcolor,'border-color':settingConfig.readTheme === item.name?'#FF0000':'#FFF'}" v-for="(item,index) in settingConfig.readThemeList" :key="index" @click="changeReadTheme(item)">
              <text class="setting-view-text" :style="{'color':item.color}">{{item.title}}</text>
            </div>
        </cell>
        <cell>
          <div class="setting-row">
            <text class="setting-text">无</text>
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
      <div class="setting-item" @click="goback">
        <text class="setting-icon">&#xe642;</text>
        <text class="setting-text">退出阅读</text>
      </div>
    </div>
    </div>
  </div>
     <!--小说章节内容-->
    <!-- <read-chapter ref="chapter" :isShowChapter="isShowChapter" :bookTitle="bookTitle" :chapterList="chapterList" @on-close="toggleChapterView" @on-select-chapter="goToChapter"></read-chapter> -->
 <div class="read-chapter" ref="chapter">
   <!--遮罩-->
    <div ref="covermodal" class="cover-modal" v-if="isShowChapter" @click="toggleChapterView(false)"></div>

    <div class="chapter-group">
      <div class="chapter-header">
        <div class="chapter-header-label">
          <text class="chapter-header-text">目录</text>
        </div>
        <!-- <div class="chapter-book-title">
          <text class="chapter-book-title-text">{{bookTitle}}</text>
        </div> -->
        <div class="chapter-sort-btn">
          <text class="chapter-sort-btn-text" @click="scrollToBottom">顶部/底部</text>
        </div>
      </div>
      <scroller class="chapter-scroller">
        <!-- <list class="chapter-list"> -->
          <div ref="chaptercell" class="chapter-cell" v-for="(item,index) in chapterList" :key="index" @click="goChapter(index)">
            <text class="chapter-cell-text">{{item.title}}</text>
          </div>
        <!-- </list> -->
        </scroller>
      </div>
  </div>

  </div>
</template>
<script>
var animation = weex.requireModule('animation')
var dom = weex.requireModule('dom')

// import readChapter from '../components/read-chapter.vue'
// import readSetting from '../components/read-setting.vue'
import scrollerReadView from '../components/scroller-read-view.vue'
import swipeReadView from '../components/swipe-read-view.vue'
export default {
  name: 'readingview',
  components: {
    //   'read-chapter': readChapter,
    //   'read-setting': readSetting
    'scroller-read-view': scrollerReadView,
    'swipe-read-view': swipeReadView
  },
  data() {
    let bookId = this.$route.query.bookId
    return {
      Toc: null,
      isShowChapter: false, // 是否显示章节列表
      isShowSetting: false, //是否显示设置面板
      showSet: false,
      isScrollToBottom: false, //是否滚动到底部

      chapter: null, //章节内容
      // chapterContent: null,

      nowmark: this.$store.state.markInfo[bookId]
        ? this.$store.state.markInfo[bookId].chapter
        : 0
    }
  },
  computed: {
    settingConfig() {
      return this.$store.state.settingConfig
    },
    readTheme() {
      let index = this.settingConfig?this.settingConfig.readTheme:''
      let list = this.settingConfig.readThemeList
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        console.log(item)
        if (item.name === index) {
          return item
        }
      }
      return null
    },
    markInfo() {
      return this.$store.state.markInfo
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
      let body = this.chapter ? this.chapter.body : ''
      return body.replace(/[↵]/g, '\n\t').split('\n')
    },
    nowChapterTitle() {
      return this.chapterList.length > 0
        ? this.chapterList[this.nowmark].title
        : '-'
    }
  },
  created() {
    console.log(this.settingConfig)
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
      this.$router.back()
    },
    toggleChapterView(show) {
      // this.isShowSetting = false //隐藏设置面板

      this.isShowChapter = show
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
            this.chapter = data.chapter
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
    },

    lookMenu() {
      // this.$emit('on-menu')
      this.toggleChapterView(true)
    },
    exit() {
      // this.$emit('on-exit')
      this.$router.back()
    },
    HideSetting() {
      // this.$emit('on-hide-setting')
      this.isShowSetting = false
      this.showSet = false
    },
    showSetting() {
      // this.isShowSetting = true
      this.showSet = true
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
    },
    goChapter(index) {
      this.goToChapter(index)
      this.toggleChapterView(false)
      this.isShowSetting = false
    },
    scrollToBottom() {
      if (this.chapterList.length > 0) {
        this.isScrollToBottom = !this.isScrollToBottom
        let index = this.chapterList.length - 1
        if (this.isScrollToBottom) {
          const el = this.$refs.chaptercell[0]
          dom.scrollToElement(el, {})
        } else {
          const el = this.$refs.chaptercell[index]
          dom.scrollToElement(el, {})
        }
      }
    }
  },
  watch: {
    nowmark(v, ov) {
      if (v != ov) {
        let bookId = this.$route.query.bookId
        this.$store.dispatch('SET_MARKINFO', {
          bookId: bookId,
          markinfo: {
            chapter: v
          }
        })
      }
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

/* .touch-modal {
  position: fixed;
  top: 0;
  left: 0;
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
} */

/*设置面板*/
.read-setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 1334px;
  /* z-index: 1; */
}
.setting-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 100px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #555;
  opacity: 1;
  /* z-index: 2; */
}
.seting-none {
  width: 750px;
  height: 1334px;
  /* z-index: 1; */
  background-color: #000;
  opacity: 0.3;
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
  opacity: 1;
  position: fixed;
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
.setting-btn {
  width: 50px;
  height: 50px;
  font-size: 35px;
  color: #fff;
  text-align: center;
}

.setting-view-text {
  font-size: 30px;
  text-align: center;
}

/*章节目录*/
.read-chapter {
  position: fixed;
  left: 0;
  top: 0;
  /* z-index: 5; */
  transform: translateX(-750px);
}
.chapter-group {
  /* z-index: 5; */
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
}
.chapter-header {
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}
.chapter-header-label {
  flex: 1;
  /* position: absolute; */
  /* left:10px; */
}
.chapter-header-text {
  font-size: 40px;
  text-align: center;
}
.chapter-book-title {
  flex: 2;
}
.chapter-book-title-text {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}

.chapter-sort-btn {
  flex: 1;
  /* position: absolute;
  right:10px; */
}
.chapter-sort-btn-text {
  font-size: 30px;
  text-align: center;
}
.chapter-scroller {
  /* flex: 5; */
  width: 600px;
  height: 1264px;
  padding-bottom: 20px;
}
.chapter-list {
}
.chapter-cell {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-color: #ddd;
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
.chapter-cell-text {
  font-size: 35px;
  color: #aaa;
}
.cover-modal {
  width: 750px;
  height: 1334px;
  /* position: fixed;
  left: 0;
  top: 0; */
  /* z-index: 2; */
  background-color: #000;
  opacity: 0.5;
}
</style>

