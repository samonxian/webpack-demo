# webpack-demo
## 首次尝试
首先我们需要建立entry.js（js入口文件,可以理解为我们编写的代码都通过这个文件执行），index.html文件（浏览器入口文件）。

下面看看如何使用webpack，首先看下index.html

```html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script><!--关键看这一句-->
    </body>
</html>

```
entry.js和bundle.js可以自己命名。输入命令：

```
webpack ./entry.js bundle.js
```
就这么简单！上面的命令是把entry的代码解析成浏览器可执行的js代码。[demo01](http://xianshannan.github.io/webpack-demo/demo01/){target="_blank"}

## 配置文件 webpack.config.js
上面的命令虽然不复杂，但是后面的各种依赖配置也一起下上当然不可取，webpack.config.js就是为了解决上述问题。

```js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    }
};
```
配置一目了然,`__dirname`是项目目录，webpack.config的当前目录。然后直接在终端使用`webpack`命令回车就OK了。[demo02](http://xianshannan.github.io/webpack-demo/demo02/){target="_blank"}
## 使用loaders
loader需要额外安装，其实就是插件的一种，不过比较特殊。
### CSS loader
webpack让你可以在js文件中require CSS并通过CSS loader处理成浏览器可这行代码。
执行以下命令安装loader

```
npm install css-loader style-loader
```
新建style.css

```css
.body{
	background-color:#ccc;
}
```
content.js

```
module.exports = "It works from content.js.";
```
webpack 是以 commonJS 的形式来书写脚本,然而对 webpack 来说，我们可以直接在上面书写 commonJS 形式的语法，无须任何 define （毕竟最终模块都打包在一起，webpack 也会最终自动加上自己的加载器)

entry.js

```js
require("./style.css");
document.write(require("./content.js"));
```
是不是觉得不可思议，css和js都可以用require!下面的配置就是为了识别css:

```js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }//识别css
        ]
    }
};
```
最后webpack回车。[demo03](http://xianshannan.github.io/webpack-demo/demo03/){target="_blank"}
### Babel Loader
安装

```
npm install babel-loader
```
bable可以把JSX/ES6文件转换成可执行的JS文件，在开发React应用需要用到。
下面的是React例子
entry.js

```js
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.body
);

```
webpack.config.js

```js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },//识别css
            { test: /\.js$/, loader: "babel-loader?presets[]=es2015&presets[]=react" }//识别babel
        ]
    }
};
```
上面代码出现es2015代表需要插件[babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015){target="_blank"}，react代表需要插件[babel-preset-react](https://www.npmjs.com/package/babel-preset-react){target="_blank"}

```
npm install babel-preset-es2015 --save-dev
npm install babel-preset-react --save-dev
```
配置文件也可以这样编写

```js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },//识别css
            { 
            	test: /\.js$/, 
            	loader: "babel",
            	query: {
			        presets: ['es2015', 'react']
			    }
            }//识别babel
        ]
    }
};
```
安装React相关

```
npm install react
npm install react-dom
```
>Module build failed: ReferenceError: [BABEL]

如果出现类似错误很可能是babel版本比较老，更新后问题解决。[demo04](http://xianshannan.github.io/webpack-demo/demo04/){target="_blank"}

### Image loader

运行在JS文件中require图片，经过[url-loader](https://www.npmjs.com/package/url-loader){target="_blank"} 处理。如果图片大小于8192字节，图片将会被转换成 `Data URL`，**这才是要用这个的真正原因**。[demo05](http://xianshannan.github.io/webpack-demo/demo05/){target="_blank"}

```html
<img src="data:image/png;base64,iVBOR...uQmCC"> <!--大小小于8192字节-->
<img src="4853ca667a2b8b8844eb2693ac1b2578.png"><!--大小大于8192字节-->
```
## webpack 插件

### UglifyJs 插件


















