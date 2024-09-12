// noinspection JSUnresolvedFunction

'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

module.exports = {
  publicPath: '', // 生产环境使用资源时的路径的开头字符
  outputDir: 'dist', // 生产环境的生成目录
  assetsDir: 'static', // 资源文件的名称
  lintOnSave: process.env.NODE_ENV === 'development', // 每次开启保存是否进行eslint检测
  productionSourceMap: false, // 生产环境是否生成sourceMap文件
  devServer: {
    // host: 'localhost',
    port: defaultSettings.port, // 项目端口
    open: true,
    overlay: { // 在浏览器上全屏显示编译的errors或warnings
      warnings: process.env.NODE_ENV === 'development',
      errors: true
    }
    // before: require('./mock/mock-server.js') // 服务内部的所有其他中间件之前加载mock数据
  },
  configureWebpack: {
    name: defaultSettings.title, // 项目名称
    resolve: {
      alias: { // 设置目录别名
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/], // 运行时忽略的文件,文件黑名单
        include: 'initial'
      }
    ])
    /**
     * config.plugins.md.delete('prefetch')
     * 当页面太多时，会导致太多无意义的请求
     * 删除懒加载模块的prefetch，降低带宽压力
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch')

    // 设置svg加载程序
    config.module.rule('svg').exclude.add(resolve('src/libs/svgIcon')).end()
    config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/libs/svgIcon')).end()
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' }).end()

    // 开发环境代码方式：source-map(源始代码)、eval（加密但生成速度）
    config.when(process.env.NODE_ENV !== 'development', config => config.devtool('source-map'))

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin', [{
            inline: /runtime\..*\.js$/ // `runtime`必须与runtimeChunk名称相同。默认值为“运行时”`
          }]).end()
          config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // 仅包最初依赖的第三方
              },
              elementUI: {
                name: 'chunk-elementUI', // 将elementUI拆分为单个包
                priority: 20, // 重量需要大于libs和app，否则将打包为libs或app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // 可以自定义规则
                minChunks: 3, // 最小公共数
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          config.optimization.runtimeChunk('single') // 设定runtime代码单独抽取打包
        }
      )
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}
