module.exports = {
  assetsDir: "asset",
  outputDir: "output",
  runtimeCompiler: true,
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "^/api": {
        target: "http://localhost:3000", //接口域名
        changeOrigin: true, //是否跨域
        secure: false, //是否https接口
        // pathRewrite: {
        //   //路径重置
        //   "^/cors": "/api",
        // },
        logLevel: "debug",
      },
    },
  },
};
