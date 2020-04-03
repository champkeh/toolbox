const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_BUILD_OUTPUT || 'dist',

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@config', resolve('src/config'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/service/api'))
      .set('@utils', resolve('src/utils'))
      .set('@assets', resolve('src/assets'))
      .set('@service', resolve('src/service'))
      .set('@views', resolve('src/views'))
      .set('@mixins', resolve('src/mixins'))
  },
  configureWebpack: config => {
    // 生产环境去掉console语句
    if (process.env.VUE_APP_BUNDLE_TAG === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }

    // return {
    //   optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //       chunks: 'all',
    //       maxInitialRequests: Infinity,
    //       minSize: 0,
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name(module) {
    //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //             return `npm.${packageName.replace('@', '')}`
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/proxy': {
        target: 'https://test.jz-ins.com/bocCarBiz',
        pathRewrite: {
          '.*?/proxy': '/api'
        }
      }
    }
  }
}
