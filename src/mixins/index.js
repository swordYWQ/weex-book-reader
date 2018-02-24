var stream = weex.requireModule('stream')
export default {
  methods: {
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    translate(obj) {
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
    request(url, callback) {
      let env = weex.config.env
      let urlPath = ''
      if (env.platform === 'Web') {
        urlPath = '/api' + url
      } else {
        let apiHost = this.$store.state.apiHost
        urlPath = apiHost + url
      }
      stream.fetch(
        {
          method: 'GET',
          url: urlPath,
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
