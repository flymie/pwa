const { store, router, matchRoutes } = require('../../../dist/forSSr.js').default;

const defaultFn = async (ctx, next) => {
  const branch = matchRoutes(router, ctx.url);
  // console.log(branch[0].route.component.WrappedComponent)
  if (branch.length !== 0) {
    if (branch[0].route.component.WrappedComponent.asyncData) {
      branch[0].route.component.WrappedComponent.asyncData(store, ctx);
      await new Promise((resolve) => {
        store.subscribe(async () => {
          resolve(store);
        });
      }).then((data) => {
        // data 其实是 store
        ctx.render(data);
        next();
      });
    } else {
      ctx.render(store);
      await next();
    }
  } else {
    next();
  }
};

// const homeList2 = async (ctx, next) => {
//   const branch = matchRoutes(router, ctx.url);
//   // if ()
//   branch[0].route.component.WrappedComponent.asyncData(store, ctx);
//   // console.log(branch[0].route.component);
//   // router.find(v => v.path === '/home/list2/:a').component.WrappedComponent.asyncData(store, ctx);
//   await new Promise((resolve) => {
//     store.subscribe(async () => {
//       resolve(store);
//     });
//   }).then((data) => {
//     // data 其实是 store
//     ctx.render(data);
//     next();
//   });
// };

module.exports = {
  'GET /home/list2/:a': defaultFn,
  'GET /error': defaultFn,
  // 'GET /error/test/test': '',
};
