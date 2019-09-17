/*
const Koa = require('koa');
// const router = require('koa-router')();
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const routes = require('./mid/controllers')();

// add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//   const name = ctx.params.name;
//   ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });
//
// router.get('/', async (ctx, next) => {
//   ctx.response.body = '<h1>Index</h1>';
// });

app.use(async (ctx, next) => {
  // console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

// app.use(bodyParser());
// add router middleware:
app.use(routes.routes(), routes.allowedMethods());

app.listen(2468);
 */
// import React from 'react';
import Koa from 'koa';
import routerMid from './mid/routerMid';
import forward from './mid/forward';

const path = require('path');

const env = process.env.NODE_ENV;
const config = require('../build/config')[env];
// import { renderToString } from 'react-dom/server';

const app = new Koa();
app.use(forward());
const routes = require('./mid/controllers')();

app.use(routerMid);
app.use(require('koa-static')(path.join(__dirname, '../dist')));

app.use(routes.routes(), routes.allowedMethods());
// const App = () => <div>Hello Koa SSR</div>;
//
// app.use((ctx) => {
//   ctx.body = renderToString(<App />);
// });

app.listen(config.port, () => {
  console.log(`node服务已经启动, 请访问localhost:${config.port}`);
});
