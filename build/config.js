/**
 * 配置文件
 * 生产环境 production
 * 开发环境 development
 */

module.exports = {
  // 生产环境
  production: {
    port: 5678, // 服务器启动的端口号
    env: 'production', // 环境
    api: 'http://localhost:5678', // api 接口地址
  },
  // 开发环境
  development: {
    port: 1234, // 服务器启动的端口号
    env: 'development', // 环境
    api: 'http://localhost:1234/FORWARD', // api 接口地址
    proxy: {
      target: 'http://localhost:5678',
      pathRewriteName: 'FORWARD',
    },
  },
};
