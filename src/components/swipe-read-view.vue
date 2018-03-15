<template>
       <!-- <div class="read-view" @click="showSetting"  @swipe="swipePage" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF',height:deviceHeight+'px'}">
         <div ref="page-group" class="read-content" :style="{height:deviceHeight+'px'}">
            <text ref="p-title" class="p-title" :style="{'color':readTheme?readTheme.color:'#333'}">{{nowChapterTitle}}</text>
        
            <text ref="p-item" v-for="(item,index) in chapterBodyList" :key="index" class="p-item"  :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40}">
              {{item}}
            </text>
        </div>
      </div> -->
      <scroller class="read-view" @click="showSetting" scroll-direction="horizontal" :offset-accuracy="750" :style="{'background-color':readTheme?readTheme.bgcolor:'#FFF',height:deviceHeight+'px'}">
        <div ref="page-group" class="read-content" :style="{height:deviceHeight+'px'}">
            <text ref="p-title" class="p-title" :style="{'color':readTheme?readTheme.color:'#333'}">{{nowChapterTitle}}</text>
        
            <text ref="p-item" v-for="(item,index) in chapterBodyList" :key="index" class="p-item"  :style="{'color':readTheme?readTheme.color:'#333','font-size':settingConfig?settingConfig.readFontSize:40}">
              {{item}}
            </text>
        </div>
      </scroller>
</template>
<script>
var dom = weex.requireModule('dom')
var animation = weex.requireModule('animation')
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
    },
    page: {
      type: Number
    }
  },
  data() {
    return {
      deviceHeight: 0,
      // page: 0,
      state: '',
      lastPage: 0
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
    translateX() {
      //let env = weex.config.env
      return this.page * 750 * -1 //* env.scale
    },
    pageGroup() {
      return this.$refs['page-group']
    }
  },
  created() {
    let env = weex.config.env
    this.deviceHeight = env.deviceHeight * env.scale

    // this.getLastPage()
    // this.pageGroupAnimate(0)
  },
  methods: {
    showSetting() {
      this.$emit('showSetting')
    },
    swipePage(e) {
      if (e.direction === 'right') {
        this.prevPage()
        // this.$emit('prevPage')
      } else if (e.direction === 'left') {
        this.nextPage()
        // this.$emit('nextPage')
      }
    },
    prevPage() {
      this.state = 'prev'
      if (this.page == 0) {
        this.$emit('prevChapter')
      } else {
        // this.page--
        this.$emit('changePage', this.page - 1)
        // this.pageGroupAnimate()
      }
    },
    nextPage() {
      this.state = 'next'
      if (this.page >= this.lastPage) {
        this.$emit('nextChapter')
      } else {
        // this.page++
        this.$emit('changePage', this.page + 1)
        this.pageGroupAnimate()
      }
    },
    pageGroupAnimate(duration) {
      this.$nextTick(() => {
        let pageGroup = this.$refs['page-group']
        animation.transition(pageGroup, {
          styles: {
            transform: `translateX(${this.translateX}px)`
          },
          duration: duration ? duration : 300, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        })
      })
    },
    // getLastPage() {
    //   let pItems = this.$refs['p-item']
    //   if (pItems.length) {
    //     dom.getComponentRect(pItems[this.chapterBodyList.length - 1], e => {
    //       console.log(`left:${e.size.left}`)
    //       this.lastPage = (e.size.left ? e.size.left : 0) / 750
    //       console.log(`lastPage:${this.lastPage}`)
    //     })
    //   }
    // }
  },
  watch: {
    chapterBodyList: {
      deep: true,
      handler(v, ov) {
        if (v != ov) {
          this.$nextTick(() => {
            // this.getLastPage()
            if (this.state === 'next') {
              // 下一页
              this.$emit('changePage', 0)
              // this.pageGroupAnimate(0)
            } else if (this.state === 'prev') {
              // 上一页
              this.$emit('changePage', this.lastPage)
              // this.pageGroupAnimate(0)
            } else if (this.state === 'go') {
              // 直接跳转章节
              // this.pageGroupAnimate(0)
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.read-view {
  width:750px;
  /* height: 1334px; */
  /* overflow: hidden; */
  /* position: relative; */
}
.read-content {
  /* position: absolute;
  top: 0;
  left: 0; */
  flex-direction: column;
  flex-wrap: wrap;
  /* transform: translate(0px); */
}
.p-title {
  /* width:750px; */
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
  font-size: 50;
}
.p-item {
  width: 750px;
  padding-left: 20px;
  padding-right: 20px;
}
.now-time {
  font-size: 35px;
}
.read-footer {
  /* position:absolute;
  bottom:0;
  left:0;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px; */
}

.toggle-chapter {
  /* flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px; */
}
.chapter-prev {
}
.chapter-next {
}
</style>
