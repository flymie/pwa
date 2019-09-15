import Container from '../component/home/list/view';
import homeList2 from '../component/home/list2/view';

const home = [
  {
    exact: true,
    path: '/',
    component: Container,
  },
  {
    exact: true,
    path: '/home',
    component: Container,
  },
  {
    exact: true,
    path: '/home/list2/:a',
    component: homeList2,
  },
];
export default home;
