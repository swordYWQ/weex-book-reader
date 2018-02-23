var stream = weex.requireModule('stream')
export default {
  methods: {
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    translateGetParams(obj) {
      var rangeArr = [],
        param = '';
      if (obj && typeof obj === 'object') {
        if (rangeArr.length == 0) {
          rangeArr.push('?')
        }
        for (i in obj) {
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
    $fetch(url, callback) {
      let config = this.$getConfig()
      let apiHost = ''
      if(config.env.platform === 'Web'){
        apiHost = this.$store.state.apiHost
        stream.fetch(
          {
            method: 'GET',
            url:  '/api' + url,
            type: 'json'
          },
          function (response) {
            if (response.ok) {
              callback(response.data)
            } else {
              console.error('接口访问失败!')
            }
          }
        )
      } else {
        stream.fetch(
          {
            method: 'GET',
            url: apiHost + url,
            type: 'json'
          },
          function (response) {
            if (response.ok) {
              callback(response.data)
            } else {
              console.error('接口访问失败!')
            }
          }
        )
      }
    }
  }
}
