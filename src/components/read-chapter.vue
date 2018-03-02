<template>
  <div class="read-chapter">
    <div class="chapter-group">
      <div class="chapter-header">
        <text class="chapter-header-text">目录</text>
        <text class="chapter-book-title">{{bookTitle}}</text>
        <text class="sort-btn" @click="scrollToBottom">顶部/底部</text>
      </div>
      <scroller class="chapter-scroller">
        <!-- <list class="chapter-list"> -->
          <cell ref="chaptercell" class="chapter-cell" v-for="(item,index) in chapterList" :key="index" @click="goChapter(index)">
            <text class="chapter-cell-text">{{item.title}}</text>
          </cell>
        <!-- </list> -->
        </scroller>
      </div>
    <!--遮罩-->
    <div ref="covermodal" class="cover-modal" v-if="isShowChapter" @click="$emit('on-close')"></div>
  </div>
</template>
<script>
export default {
  name: 'read-chapter',
  data() {
    return {
      isScrollToBottom: false //是否滚动到底部
    }
  },
  props: {
    isShowChapter: {
      type: Boolean
    },
    bookTitle: {
      type: String,
      default: ''
    },
    chapterList: {
      type: Array,
      default: []
    }
  },
  methods: {
    goChapter(index) {
      this.$emit('on-select-chapter', index)
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
  }
}
</script>
<style scoped>
.read-chapter {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  transform: translateX(-750px);
}
.chapter-group {
  z-index: 5;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
}
.chapter-header {
  flex-direction: row;
  align-items: center;
  height: 60px;
}
.chapter-book-title {
  flex: 1;
  font-size: 40px;
  font-weight: 700;
}
.chapter-header-text {
  flex: 1;
  font-size: 40px;
}
.chapter-sort-btn {
  flex: 1;
  font-size: 40px;
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
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
