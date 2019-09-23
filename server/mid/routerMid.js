import { renderToString } from 'react-dom/server';
import { Route, Switch, StaticRouter } from 'react-router-dom';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { Provider } from 'react-redux';
// import routes from '../../app/routes/index';
const { router } = require('../../dist/forSSr.js').default;
// import store from '../../app/createStore';

// 匹配模板中的{{}}
function templating(props) {
  // console.log(path.join(__dirname, '../../dist/index.html'));
  const template = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf-8');
  // const template = fs.readFileSync(path.join(__dirname, '../template/index.html'), 'utf-8');
  // src=./js
  // <link href=./css
  return template
    // .replace(/href=.\/css/g, 'href=http://localhost:5678/css')
    // .replace(/src=.\/js/g, 'src=http://localhost:5678/js')
    .replace(/<!--([\s\S]*?)-->/g, (_, key) => (
      props[key.trim()]
    ));
}
const homeFn = async (ctx, next) => {
  try {
    ctx.render = async (store) => {
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={ctx}>
            {/* { renderRoutes(routes) } */}
            <Switch>
              {
                // router
                router.map((v, index) => (
                  <Route
                    key={`${index + 1}`}
                    path={v.path}
                    exact={v.exact}
                    component={v.component}
                  />
                ))
             }
            </Switch>
          </StaticRouter>
        </Provider>,
      );
      ctx.body = templating({
        html,
        store: `<script>window.__STORE__ = ${JSON.stringify(store.getState())}</script>`,
      });
      ctx.type = 'text/html';
    };
  } catch (e) {
    ctx.type = 'text/html';
    ctx.body = templating({ html: e.message });
  }
  await next();
};

export default homeFn;
