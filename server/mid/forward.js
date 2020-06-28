const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const proxyObj = {
  douban: 'https://api.douban.com',
  oneSaid: 'http://api.guaqb.cn/v1/onesaid',
};
const proxyApi = ['douban', 'oneSaid'];

module.exports = function () {
  return async function (ctx, next) {
    const mathUrl = ctx.url.match(/^\/([^/]+)\//);
    const pathRewriteName = mathUrl ? mathUrl[1] : '';
    // console.log(ctx.href, proxyApi, pathRewriteName);
    if (proxyApi.indexOf(pathRewriteName) !== -1) {
      ctx.respond = false;
      // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
      const { body } = ctx.request;
      const contentType = ctx.request.header['content-type'];
      await k2c(httpProxy({
        target: proxyObj[pathRewriteName],
        changeOrigin: true,
        pathRewrite: {
          [`^/${pathRewriteName}`]: '',
        },
        ws: true,
        secure: false, // 避免请求https的时候要证书
        xfwd: true,
        onProxyReq(proxyReq, req, res, options) {
          if (body && contentType.indexOf('application/json') > -1) {
            const bodyData = JSON.stringify(body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
          }
        },
      }))(ctx, next);
    }
    await next();
  };
};
