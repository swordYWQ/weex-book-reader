// const http = require('http');
// const httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer();
// console.log('node server start')
// const proxyServer = http.createServer((req, res) => {
//   proxy.web(req, res, {
//     target: 'http://api.zhuishushenqi.com',
//   });
// });
// proxyServer.listen(1337, () => {
//   console.log('proxy server is running at port:1337');
// });

const express = require('express');
const path = require('path');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();

// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
// const { HOST = 'http://api.zhuishushenqi.com', PORT = '3300' } = process.env;

// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置端口
app.set('port', 1337);

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// 静态页面
// 这里一般设置你的静态资源路径
app.use('/', express.static(__dirname));

// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
app.use('/api', proxy({
  target: 'http://api.zhuishushenqi.com', pathRewrite: {
    '^/api': '/'
  },
}));
// app.get('/', function (req, res) {
//   return res.sendFile(path.join(__dirname, 'index.html'));
// });
// 监听端口
app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});