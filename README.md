# weex-book-reader

一个使用weex和vue开发的小说app软件。

## 项目简介

项目为单页SPA应用，脚手架基于weex-hackernews，使用vue-router控制路由切换。API数据接口来自追书神器。

## 项目运行

使用npm install安装依赖:

```
npm install
```

编译项目代码:

+ `npm run build` # 把源码编译构建成web包和native包.
+ `npm run dev` # 实时编译构建 `npm run build`.

把bundle文件复制到安卓或IOS项目中:

+ `npm run copy:android` # Copy generated bundle file to the assets of Android project.
+ `npm run copy:ios` # Copy generated bundle file to the assets of iOS project.
+ `npm run copy` # Run both `copy:andriod` and `copy:ios`.

暂时只处理了安卓项目。

### 启动本地web服务

由于api接口需要使用代理，localproxy.js启动一个node express服务端并代理你的接口

```
node localproxy.js
或
npm run proxy
```

服务端监听1337端口. 访问 http://127.0.0.1:1337/index.html 可以在app或者浏览器中预览.

### 运行安卓项目

首先你需要安装 [Android Studio](https://developer.android.com/studio/index.html) 和 Android SDK.

配置好你的环境变量，然后用AndroidStudio打开android文件夹,对项目进行调运行.

由于weex-hackernews中的android项目存在接口无法访问的问题，使用官方项目weex platform add android构建的项目，可以复制到根目录的android文件夹中。

### 运行IOS项目

暂时未对IOS项目进行处理

### 项目状态

基本完成功能开发，在web端基本访问正常，存在些许bug，在安卓端仍存在很多兼容问题需要修改。

### 更新日志
1. 优化设置页面
2. 增加安卓返回功能
3. 增加书签功能
4. 优化安卓顶部导航背景色

### 待优化功能

1. web:设置字体功能无效
2. 安卓:书籍列表增加下滑刷新以及上滑加载功能
3. 公共:增加缓存章节功能
4. 公共:增加loading页
5. 公共:增加搜索页面
6. 安卓: 小说阅读视图添加翻页
7. 打包后效果和调试效果不一致
8. 打包后上下多了空白边距(页面未设置边距)