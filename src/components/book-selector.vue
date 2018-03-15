<template>
  <div class="book-selector" v-if="bookInfo" :style="{height:deviceHeight+'px'}">
    <div class="modal-bg" @click="closeSelector" :style="{height:deviceHeight+'px'}"></div>
    <list class="selector-list">
      <cell class="selector-cell">
        <text class="selector-cell-text selector-cell-title">{{bookInfo.title}}</text>
      </cell>
      <cell class="selector-cell" @click="goBookInfo">
        <text class="selector-cell-text">书籍详情</text>
      </cell>
      <cell class="selector-cell" @click="deleteBook">
        <text class="selector-cell-text">删除</text>
      </cell>
    </list>
  </div>
</template>
<script>
export default {
  name: 'book-selector',
  props: {
    bookInfo: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data(){
    return{
      deviceHeight: 0
    }
  },
  created(){
    let env = weex.config.env
    this.deviceHeight = env.deviceHeight * env.scale
  },
  methods: {
    closeSelector(){
      this.$emit('close')
    },
    goBookInfo() {
      if (this.bookInfo) {
        this.jump({ name: 'bookinfo', query: { bookId: this.bookInfo._id } })
      }
    },
    deleteBook() {
      this.confirm(
        {
          message: '确认从书架移除该书籍吗?',
          okTitle: '确认',
          cancelTitle: '取消'
        },
        value => {
          if (value === '确认') {
            this.$emit('delete')
          }
        }
      )
    }
  }
}
</script>
<style scoped>
.book-selector {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  /* height: 1334px; */
}
.modal-bg {
  width: 750px;
  /* height: 1334px; */
  background-color: #333;
  opacity: 0.3;
}
.selector-list {
  position: absolute;
  top: 507px;
  left: 80px;
  background-color: #fff;
  width: 600px;
}
.selector-cell {
  /* height: 80px; */
  line-height: 80px;
}
.selector-cell-title {
  font-weight: 700;
  text-align: center;
  border-bottom-color: skyblue;
  border-bottom-width: 5px;
  border-bottom-style: solid;
}
.selector-cell-text {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  font-size: 40px;
  color: #333;
}
.selector-cell:active {
  background-color: #eee;
}
</style>

