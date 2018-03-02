import moment from 'moment'
var stream = weex.requireModule('stream')

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
    request(url, type, callback) {
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
      stream.fetch(
        {
          method: 'GET',
          url: urlPath,
          type: 'json',
          timeout: 5000
        },
        function (response) {
          if (response.ok) {
            callback(response.data)
          } else {
            console.error('接口访问失败!')
          }
        }
      )
    },
    // 日期处理函数
    moment: moment
  }
}
