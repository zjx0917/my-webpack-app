const webpack = require("webpack");
// es6 以后使用方式 { merge } 不是 merge
// 合并 webpack 配置
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const devConfig = {
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
  devServer: {
    // hot true 启动热更新，可以自动热更新 css，但是不可以自动热更新 js 文件，需要在 js 文件中配置 module.hot.accept
    // vue react 等框架中的 js 文件不需要配置 module.hot.accept，是因为这些框架已经内置了此功能
    hot: true,
    hotOnly: true,
    proxy: {
      // "/react/api": "http://www.dell-lee.com/",
      // changeOrigin: true,
      // "/seckillnew/orderService/": "http://marathon.jd.com/",
    },
  },
  // 实例化需要使用的 plugin
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
// CommonJS 语法
module.exports = merge(commonConfig, devConfig);
