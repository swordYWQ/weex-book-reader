<template>
  <div>
     <view-header title="调试页" :isShowBack="true" @back="goback"></view-header>
     <div class="debug-page">
        <div v-for="(item,key,index) in storageData" :key="index" v-if="key==='MARKINFO'">
           <text style="font-size:30px;font-weight:700;">MARKINFO</text>
           <text>{{JSON.stringify(item)}}</text>
        </div>
    </div>
  </div>
</template>
<script>
const storage = weex.requireModule('storage')

import viewHeader from '../components/view-header.vue'
export default {
  name: 'debug-page',
  components: {
    'view-header': viewHeader
  },
  data() {
    return {
      keys: [],
      storageData: {}
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    getKeyStorage(key) {
      storage.getItem(key, event => {
        if (key === 'MARKINFO') {
          console.log(key, event.data)
        }
        if (event.result === 'success') {
          this.storageData[key] = event.data
        }
      })
    },
    getAll() {
      storage.getAllKeys(event => {
        if (event.result === 'success') {
          this.keys = event.data
          this.keys.forEach(item => {
            this.getKeyStorage(item)
          })
          // Promise.all([])
        }
      })
    }
  }
}
</script>
<style scoped>
.debug-page {
  height: 1114px;
}
</style>
