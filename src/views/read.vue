<template>
  <div class="reading-view" :style="{height:deviceHeight+'px'}">
   
    <!--小说阅读主体-->
    <div class="reading-content" :style="{height:deviceHeight+'px'}">
      <!-- <div class="content-top" :style="{'background-color':readingStyles.bgColor}">
        <text class="p-item">{{nowChapterTitle}}</text>
      </div> -->

      <!--滚动翻阅-->
      <scroller-read-view ref="scrollerreadview" :nowChapterTitle="nowChapterTitle" :chapterBodyList="chapterBodyList" @prevChapter="prevChapter" @nextChapter="nextChapter" @showSetting="showSettingView"></scroller-read-view>
      
      <!--滑动翻页  @prevChapter="prevChapter" @nextChapter="nextChapter"-->
      <!-- <swipe-read-view ref="swipereadview" :page="page" :nowChapterTitle="nowChapterTitle" :chapterBodyList="chapterBodyList" @showSetting="showSettingView" @prevChapter="prevChapter" @nextChapter="nextChapter" @changePage="changePage"></swipe-read-view> -->

    </div>

    <!--小说阅读设置-->
    <!-- <read-setting  v-if="isShowSetting" :bookTitle="bookTitle" @on-hide-setting="isShowSetting=false" @on-menu="toggleChapterView" @on-exit="goback"></read-setting> -->
    <!-- v-if="isShowSetting" -->
      <div class="read-setting" v-if="isShowSetting" :style="{height:deviceHeight-35+'px'}">
        <!-- <template> -->
    <div class="seting-none"  v-if="isShowSetting" @click="HideSetting" :style="{height:deviceHeight+'px'}"></div>
    <div class="setting-top" ref="settingTop">
      <text class="exit-icon" @click="goback">&#xe641;</text>
      <text class="book-title">{{bookTitle}}</text>
    </div>

    <div class="setting-body" ref="settingBody">
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
  <!-- </template> -->
     <!--小说章节内容-->
    <!-- <read-chapter ref="chapter" :isShowChapter="isShowChapter" :bookTitle="bookTitle" :chapterList="chapterList" @on-close="toggleChapterView" @on-select-chapter="goToChapter"></read-chapter> -->
 <div class="read-chapter" ref="chapter" v-if="chapterList.length&&isShowChapter">
   <!--遮罩-->
    <div ref="covermodal" class="cover-modal" :style="{height:deviceHeight+'px'}" @click="toggleChapterView(false)"></div>

    <div class="chapter-group">
      <div class="chapter-header">
        <div class="chapter-header-label">
          <text class="chapter-header-text">目录</text>
        </div>
        <div class="chapter-sort-btn" @click="scrollToBottom">
          <text class="chapter-sort-btn-text">顶部/底部</text>
        </div>
      </div>
      <list class="chapter-scroller" :style="{height:deviceHeight-35+'px'}">
        <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator-text">刷新中 ...</text>
      <loading-indicator class="indicator"></loading-indicator>
      </refresh>
          <cell ref="chaptercell" class="chapter-cell" v-for="(item,index) in chapterList" :key="index" @click="goChapter(index)">
            <text class="chapter-cell-text">{{item.title}}</text>
          </cell>
        </list>
      </div>
  </div>

  </div>
</template>
<script>
var animation = weex.requireModule('animation')
var dom = weex.requireModule('dom')

import scrollerReadView from '../components/scroller-read-view.vue'
import swipeReadView from '../components/swipe-read-view.vue'
export default {
  name: 'readingview',
  components: {
    'scroller-read-view': scrollerReadView,
    'swipe-read-view': swipeReadView
  },
  data() {
    return {
      Toc: null,
      isShowChapter: false, // 是否显示章节列表
      isShowSetting: false, //是否显示设置面板
      showSet: false,
      isScrollToBottom: false, //是否滚动到底部

      chapter: null, //章节内容
      // chapterContent: null,

      nowchapter: 0,
      page: 0,

      refreshing: false,

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
      if (JSON.stringify(this.chapterInfo) !== '{}') {
        return this.chapterInfo[bookId] ? this.chapterInfo[bookId].chapters : []
      }
      return []
    },
    chapterBodyList() {
      let body = this.chapter ? this.chapter.body : ''
      return body.replace(/[↵]/g, '\n\t').split('\n')
    },
    nowChapterTitle() {
      return this.chapterList.length > 0
        ? this.chapterList[this.nowchapter].title
        : '-'
    }
  },
  created() {
    let env = weex.config.env
    this.deviceHeight = env.deviceHeight * env.scale
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let bookId = this.$route.query.bookId
        this.nowchapter = this.markInfo[bookId]
          ? this.markInfo[bookId].chapter
          : 0
        this.page = this.markInfo[bookId] ? this.markInfo[bookId].page : 0
        if (this.chapterList.length > 0) {
          this.getChapterContent(this.chapterList[this.nowchapter])
        } else {
          this.getChapterList()
        }
      })
    },
    goback() {
      this.$router.back()
    },
    chapterAnimation(translateX, callback) {
      var chapter = this.$refs.chapter || null
      if (!chapter) return
      animation.transition(
        chapter,
        {
          styles: {
            transform: `translateX(${translateX}px)`
          },
          duration: 100, //ms
          timingFunction: 'ease'
          // delay: 0 //ms
        },
        () => {
          if (callback) {
            callback()
          }
        }
      )
    },
    toggleChapterView(show) {
      // this.isShowSetting = false //隐藏设置面板
      if (this.chapterList.length === 0) {
        this.toast('章节列表为空!')
        return
      }
      if (!this.isShowChapter) {
        this.isShowChapter = show
        this.$nextTick(() => {
          this.chapterAnimation(0)
        })
      } else {
        this.chapterAnimation(-750, () => {
          this.isShowChapter = show
        })
      }
    },
    onrefresh(event) {
      this.refreshing = true
      this.getChapterList()
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
            this.$store
              .dispatch('SET_CHAPTERINFO', { info: chapterInfo })
              .then(() => {
                this.refreshing = false
                let bookId = this.$route.query.bookId
                if (JSON.stringify(chapterInfo) !== '{}') {
                  let list = chapterInfo.chapters
                  this.getChapterContent(list[this.nowchapter])
                }
              })
          } else {
            this.toast({
              message: '获取章节列表失败，请换源或选择其他小说!',
              duration: 1
            })
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
            this.$nextTick(()=>{
              this.$refs.scrollerreadview.scrollToTop()
            })
          } else {
            this.toast({
              message: '获取章节内容失败，请换源或选择其他小说!',
              duration: 1
            })
          }
        })
      }
    },
    goToChapter(index) {
      this.nowchapter = index
      if (this.$refs.swipereadview) {
        this.$refs.swipereadview.state = 'go'
      }
      this.getChapterContent(this.chapterList[this.nowchapter])
      this.isShowChapter = false
    },
    changePage(value) {
      this.page = value
    },
    prevChapter() {
      if (this.nowchapter === 0) {
        this.toast({
          message: '已经到第一章啦!'
        })
      } else {
        this.nowchapter--
        this.getChapterContent(this.chapterList[this.nowchapter])
      }
    },
    nextChapter() {
      if (this.nowchapter === this.chapterList.length - 1) {
        this.toast({
          message: '已经到最后一章啦!'
        })
      } else {
        this.nowchapter++
        this.getChapterContent(this.chapterList[this.nowchapter])
      }
    },
    lookMenu() {
      this.toggleChapterView(true)
    },
    showSettingView() {
      this.isShowSetting = true
      this.$nextTick(() => {
        let settingTop = this.$refs.settingTop
        let settingBody = this.$refs.settingBody
        this.settingAnimation(settingTop, 0)
         this.settingAnimation(settingBody, 0)
      })
    },
    settingAnimation(ref, translateY, callback) {
      animation.transition(
        ref,
        {
          styles: {
            transform: `translateY(${translateY}px)`
          },
          duration: 100, //ms
          timingFunction: 'ease'
          // delay: 0 //ms
        },
        () => {
          if (callback) {
            callback()
          }
        }
      )
    },
    hideSettingView() {
      let settingTop = this.$refs.settingTop
      let settingBody = this.$refs.settingBody
      Promise.all([
        new Promise((resolve, reject) => {
          this.settingAnimation(settingTop, -100, () => {
            resolve()
          })
        }),
        new Promise((resolve, reject) => {
          this.settingAnimation(settingBody, 300, () => {
            resolve()
          })
        })
      ])
        .then(() => {
          this.isShowSetting = false
        })
        .catch(err => {
          this.toast({
            message: err,
            duration: 1
          })
        })
    },
    HideSetting() {
      this.hideSettingView()
      this.showSet = false
    },
    showSetting() {
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
        if (!this.isScrollToBottom) {
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
    nowchapter(v, ov) {
      if (v != ov) {
        let bookId = this.$route.query.bookId
        this.$store.dispatch('SET_MARKINFO', {
          bookId: bookId,
          markinfo: {
            chapter: this.nowchapter,
            page: this.page
          }
        })
      }
    },
    page(v, ov) {
      if (v != ov) {
        let bookId = this.$route.query.bookId
        this.$store.dispatch('SET_MARKINFO', {
          bookId: bookId,
          markinfo: {
            chapter: this.nowchapter,
            page: this.page
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
  /* height: 1334px; */
}

.reading-content {
  width: 750px;
  /* height: 1334px; */
}

/*设置面板*/
.read-setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  /* height: 1334px; */
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
  transform: translateY(-100px);
  /* z-index: 2; */
}
.seting-none {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  /* height: 1334px; */
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
  transform: translateY(300px);
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
  /* width: 740px; */
  /* position: relative; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.chapter-header-label {
  /* float: left; */
  /* flex: 1; */
  /* position: absolute; */
  /* left: 10px; */
}
.chapter-header-text {
  font-size: 40px;
  text-align: center;
  color: #333;
}
.chapter-book-title {
  /* flex: 2; */
}
.chapter-book-title-text {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  color: #333;
}

.chapter-sort-btn {
  /* right: 10px; */
  /* float:right; */
  /* flex: 1; */
  /* position: absolute; */
}
.chapter-sort-btn-text {
  font-size: 30px;
  text-align: center;
  color: #333;
}
.chapter-scroller {
  /* flex: 5; */
  width: 600px;
  /* height: 1264px; */
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
  color: #444;
}
.cover-modal {
  width: 750px;
  /* height: 1334px; */
  /* position: fixed;
  left: 0;
  top: 0; */
  /* z-index: 2; */
  background-color: #000;
  opacity: 0.5;
}

.indicator-text {
  text-align: center;
  font-size: 30px;
  color: #aaa;
}
</style>

