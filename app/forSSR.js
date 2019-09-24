import { matchRoutes } from 'react-router-config';
import store from './createStore';
import router from './routes/index';

export default {
  store,
  router,
  matchRoutes,
};
