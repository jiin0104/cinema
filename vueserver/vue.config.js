const { defineConfig } = require('@vue/cli-service')
const target = 'http://127.0.0.1:3000';
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  lintOnSave:false,
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
      },
      "/oath2.0": {
        target,
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      },
      '^/poster': {
        target,
        changeOrigin: true,
      },
      '^/backimage': {
        target,
        changeOrigin: true,
      },
    },
  },
})
