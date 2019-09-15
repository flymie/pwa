// import routes from '../../app/routes/index';
// import store from '../../app/createStore';
// import { matchRoutes } from 'react-router-config';

const { store, router } = require('../../forSSr').default;

const homeList2 = async (ctx, next) => {
  router.find(v => v.path === '/home/list2/:a').component.WrappedComponent.asyncData(store, ctx);
  await new Promise((resolve) => {
    store.subscribe(async () => {
      resolve(store);
    });
  }).then((data) => {
    if (data && typeof data.getState === 'function') {
      // 需要同构页面， 否则就是接口，data 其实是 store
      ctx.render(data);
    }
    next();
  });
};

const error = async (ctx, next) => {
  // ctx.response.body = `<h1>Hello, ${name}!</h1>`;
  // const data = {
  //   name: 'jk',
  //   age: 25,
  // };
  // ctx.body = {
  //   status: true,
  //   data,
  // };
  ctx.render(store);
};

module.exports = {
  'GET /home/list2/:a': homeList2,
  'GET /error': error,
  // 'GET /error/test/test': '',
  // 'GET /home': '',
};
