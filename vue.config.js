
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    svgSprite: {
      dir: './src/assets/icons',
      test: /\.svg$/,
      loaderOptions: {
        extract: false
      }
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './styles/**/*.scss'),
      ]
    },
  }, 
  chainWebpack: config => { // позволяет модифицировать внутреннюю конфигурацию webpack
    config.module // обращаемся к опции хранящей настройки для загрузки (импорта) модулей
        .rule('svg-sprite') // название правила
        .use('svg-sprite-loader') // название плагина который будет запускать загрузчики
        .loader('svg-sprite-loader'); // название загручика
  },
})
