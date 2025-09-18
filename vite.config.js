import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import myPlugin from './zip'

// https://vitejs.dev/config/
// const webpack = require('webpack')
export default defineConfig({
  
  plugins: [
    vue(),
    
    // new webpack.ProvidePlugin({
		// 	process: 'process/browser', 
		// 	Buffer: ['buffer', 'Buffer']
		// })
    // myPlugin()
  ],

  
  // server: {
  //   // port:5000,
  //   cors: true,
  //   proxy: { // 配置跨域
  //     '/api': {
  //       // target: 'http://my.mcdd.top:9527/',
  //       target: 'http://192.168.110.244:8088/', // 根据需求替换 请求后台接口
  //       changeOrigin: true, // 允许跨域
  //       ws: true,
  //       rewrite: (path) => path.replace(/^\/api/, '') // 重写请求
  //   }
  //   }
  // },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
