import moment from 'moment'
var stream = weex.requireModule('stream')
var modal = weex.requireModule('modal')

export default {
  methods: {
    // 路由跳转
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    // 转换get请求参数
    translate(obj) {
      var rangeArr = [],
        param = '';
      if (obj && typeof obj === 'object') {
        if (rangeArr.length == 0) {
          rangeArr.push('?')
        }
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (obj[i] !== '') {
              rangeArr.push(i)
              rangeArr.push('=')
              rangeArr.push(obj[i])
              rangeArr.push('&')
            }
          }
        }
        param = rangeArr.join('').replace(/&$/, '')
        return param
      }
    },
    // fetch请求封装 type 0 自带host的接口 1 api接口 2 章节内容接口
    request(url, type, callback, refresh = false) {
      let env = weex.config.env
      let urlPath = ''
      if (env.platform === 'Web') {
        if (type === 0) {
          urlPath = url
        } else if (type === 1) {
          urlPath = '/api1' + url
        } else if (type === 2) {
          urlPath = '/api2' + url
        }
      } else {
        let apiHost = this.$store.state.apiHost
        let chapterHost = this.$store.state.chapterHost
        if (type === 0) {
          urlPath = url
        } else if (type === 1) {
          urlPath = apiHost + url
        } else if (type === 2) {
          urlPath = chapterHost + url
        }
      }

      let self = this
      let fetchFunc = () => {
        this.$store.commit('showloading')
        stream.fetch(
          {
            method: 'GET',
            url: urlPath,
            type: 'json',
            timeout: 5000
          },
          (response) => {
            if (response.ok) {
              this.$store.commit('closeloading')
              self.$store.dispatch('setApiCache', { api: urlPath, result: response.data })
              callback(response.data)
            } else {
              this.$store.commit('closeloading')
              modal.toast({
                message: '接口访问失败!',
                duration: 1
              })
              console.error('接口访问失败!')
            }
          }
        )
      }

      let ApiCache = {}
      this.$store.dispatch('getApiCache').then((apicache) => {
        ApiCache = apicache
        if (!refresh) {
          if (ApiCache[urlPath]) {
            callback(ApiCache[urlPath])
          } else {
            fetchFunc()
          }
        } else {
          fetchFunc()
        }
      })//state.ApiCache




    },
    // 日期处理函数
    moment: moment,
    // weex 模块modal函数
    // 其中包括 toast, alert,confirm,prompt 方法
    toast: modal.toast,
    alert: modal.alert,
    confirm: modal.confirm,
    prompt: modal.prompt
  }
}
