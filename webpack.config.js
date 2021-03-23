// 引入 node 核心模块 path
const path = require("path");
// webpack-html-plugin 会在打包结束后自动生成 html 文件，并将打包生成的 js 自动引入这个 html 文件中
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
// CommonJS 语法
module.exports = {
  // 设置此属性，打包不会报警告
  // 设置为 development 打包的文件不会被压缩
  // 设置为 production 打包的文件会被压缩
  mode: "development",
  // source-map 可以定位错误代码具体在原始代码中的哪个文件
  // inline 将打包出来的 .map 文件添加到对应的打包出来的 js 文件中
  // cheap 只告诉错误代码在第几行，不会告诉在第几列，提升打包性能
  // module 不只可以打印项目中的业务代码错误，还可以将第三方模块以及 loader 中的错误也打印出来
  // cheap-module-source-map 比较好的生产环境配置
  // cheap-module-eval-source-map 比较好的开发环境配置，可以快速定位到问题
  devtool: "cheap-module-eval-source-map",
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    // [name].js 这种格式可以打包成多个 js 文件，bundle.js 这种格式只能打包成一个 bundle.js 文件
    filename: "[name].js",
    // path 后面需要指定绝对路径
    // __dirname 指的是 webpack.config.js 所在的当前目录的路径
    path: path.resolve(__dirname, "bundle"),
    // 打包生成的 html 文件引入的 js 文件路径自动添加域名 //cdn.com.cn
    // publicPath: "//cdn.com.cn",
  },
  devServer: {
    // hot true 启动热更新，可以自动热更新 css，但是不可以自动热更新 js 文件，需要在 js 文件中配置 module.hot.accept
    // vue react 等框架中的 js 文件不需要配置 module.hot.accept，是因为这些框架已经内置了此功能
    hot: true,
    hotOnly: true,
  },
  // 实例化需要使用的 plugin
  plugins: [
    new HtmlWebpackPlugin({
      // 接收一个模版文件，生成的 index.html 文件是以这个模版生成的
      template: "./src/index.html",
    }),
    // webpack 使用 watch 模式时，cleanStaleWebpackAssets 设置为 false 防止把没有改变的文件给清除了
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 配合 loader 中的配置使用
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: "file-loader",
          // url-loader 可以将图片以 base64 的格式打包到 js 文件中，减少 http 请求
          loader: "url-loader",
          options: {
            // placeholder 占位符
            // ext 表示原始文件后缀
            // 与原始文件名字一样，文件后缀也一样，并添加 hash 值
            name: "[name]_[hash].[ext]",
            // 打包到打包文件的 images 文件夹下
            outputPath: "images/",
            // url-loader 的配置项，限制打包的文件大小，小于 2048kb 打包到 js 中，反之打包到 images 文件夹中
            limit: 2048,
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          // style-loader 必须与 css-loader 结合使用
          // css-loader 将 css 文件打包进 js 文件中，style-loader 将 css 插入到 dom 中
          // "style-loader",
          // 首先在 js 中引入 css 文件，然后通过在 plugins 和 loader 中配置插件 mini-css-extract-plugin 并结合 css-loader 将 css 单独打包成一个 css 文件
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9",
                    "iOS 8",
                  ],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        // node_modules 中的文件不使用 babel-loader
        exclude: /node_modules/,
        use: {
          // babel-loader 是 webpack 与 babel 通信的桥梁
          loader: "babel-loader",
          //   options: {
          //     // presets: [
          //     //   // 方式一 @babel/preset-env 将 es6 语法 转为 es5 语法，
          //     //   [
          //     //     "@babel/preset-env",
          //     //     {
          //     //       // useBuiltIns usage 表示只引入使用到的兼容低版本浏览器的 polyfill
          //     //       useBuiltIns: "usage",
          //     //       // 打包生成的代码兼容到的浏览器的最低版本
          //     //       targets: {
          //     //         chrome: "67",
          //     //         firefox: "60",
          //     //       },
          //     //     },
          //     //   ],
          //     // ],
          //     plugins: [
          //       [
          //         // 方式二 @babel/plugin-transform-runtime 将 es6 语法 转为 es5 语法
          //         "@babel/plugin-transform-runtime",
          //         {
          //           absoluteRuntime: false,
          //           corejs: 2,
          //           helpers: true,
          //           regenerator: true,
          //           version: "7.0.0-beta.0",
          //         },
          //       ],
          //     ],
          //   },
        },
      },
    ],
  },
};
