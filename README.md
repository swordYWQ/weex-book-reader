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

暂时未对IOS项目进行调试开发

### 项目状态

基本完成功能开发，在web端基本访问正常，存在些许bug，在安卓端仍存在很多兼容问题需要修改。

### 遇到过的坑
1. 同时使用<refresh>和<loading>多试几次会失效(使用list组件的loadmore事件)
2. refresh在安卓上有时上滑也会触发事件(换成list能正常使用)
3. weex命令创建的安卓包自带navBar(修改AndroidManifest.xml中application标签属性android:theme="@style/AppTheme.NoActionBar")
4. weex命令创建的安卓包顶部导航栏为白色(修改values目录下style中对应主题样式，<item name="android:statusBarColor">@android:color/transparent</item>)
5. 安卓屏幕大小不一致时，使用通用宽高750*1334会出现空白(使用weex.config.env获取设备宽高，通过动态样式计算组件高度，完美解决)
6. weex native端不支持z-index样式,后渲染的元素层级越高，但元素被v-if重新生成后层级也会更高。
7. 通过vue-router单页构建的app在切换路由的时候会略有闪屏

### 更新日志

```
版本: v1.4
更新时间:2018-03-15
1. 优化获取本地章节
2. 优化本地书签逻辑
3. 优化切换章节效果
```

```
版本: v1.3
更新时间:2018-03-14
1. 优化章节缓存逻辑
2. 优化移除书架书籍时confirm文字
3. 增加接口请求失败提示，章节请求失败时无法打开章节列表
```

```
版本: v1.2
更新时间:2018-03-13
1. 优化不同屏幕高度显示问题
2. 优化v-if时fixed元素显示层级问题
```

```
版本: v1.1
更新时间:2018-03-12
1. 添加loading页
2. 增加书籍选项卡(详情与移除)
3. 添加搜索功能
4. 添加上滑加载功能
5. 添加下拉刷新功能
6. 添加排行分类
```

```
版本: v1.0
更新时间:2018-03-09
1. 优化设置页面
2. 增加安卓返回功能
3. 增加书签功能
4. 优化安卓顶部导航背景色
```

### 待优化功能

1. web:设置字体功能无效
2. 公共:小说阅读视图添加翻页
3. 添加换源功能