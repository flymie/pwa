const fs = require('fs');
const path = require('path');

const SERVER_PATH = path.resolve(__dirname, '../');
const router = require('koa-router')();


const controller = () => {
  // 处理用于ssr的接口文件，这里是地址所以只可能是get请求 start
  const filtesForSSR = fs.readdirSync(`${SERVER_PATH}/controllers/forSSR`);
  let jsFiles = filtesForSSR.filter(f => f.endsWith('.js'));
  // 处理每个js文件:
  for (const f of jsFiles) {
    // 导入js文件:
    const mapping = require(`${SERVER_PATH}/controllers/forSSR/${f}`);
    for (const url in mapping) {
      if (url.startsWith('GET ')) {
        // 如果url类似"GET xxx":
        const pathUrl = url.substring(4);
        router.get(pathUrl, mapping[url]);
        // router.get(pathUrl, async (ctx, next) => {
        //   await mapping[url](ctx).then((data) => {
        //     if (data && typeof data.getState === 'function') {
        //       // 需要同构页面， 否则就是接口，data 其实是 store
        //       ctx.render(data);
        //     }
        //     next();
        //   });
        // });
      } else {
        // 无效的URL:
        console.log(`invalid URL: ${url}`);
      }
    }
  }
  // 处理用于ssr的接口文件，这里是地址所以只可能是get请求 end
  // 处理正常接口文件 start
  const filtesOther = fs.readdirSync(`${SERVER_PATH}/controllers/api`);
  jsFiles = filtesOther.filter(f => f.endsWith('.js'));
  // 处理每个js文件:
  for (const f of jsFiles) {
    // 导入js文件:
    const mapping = require(`${SERVER_PATH}/controllers/api/${f}`);
    for (const url in mapping) {
      if (url.startsWith('GET ')) {
        const pathUrl = url.substring(4);
        router.get(pathUrl, mapping[url]);
      } else if (url.startsWith('POST ')) {
        const pathUrl = url.substring(5);
        // router.post(pathUrl, mapping[url]);
        router.post(pathUrl, mapping[url]);
        console.log(`register URL mapping: POST ${pathUrl}`);
      } else {
        // 无效的URL:
        console.log(`invalid URL: ${url}`);
      }
    }
  }
  // 处理正常接口文件 end /^\/(.*)\.css$/
  return router;
};

module.exports = controller;
