const { store, router } = require('../../../dist/forSSr.js').default;

const defaultFn = (ctx, next) => {
  ctx.render(store);
};

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

module.exports = {
  'GET /home/list2/:a': homeList2,
  // 'GET /error': error,
  // 'GET /error/test/test': '',
  // 'GET /home': '',
};
