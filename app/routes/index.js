import home from './home';
import routerV4 from './routerV4';
import error from './error';
import login from './login';

const routes = [
  ...home,
  ...routerV4,
  ...error,
  ...login,
];

export default routes;
