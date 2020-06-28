import * as types from './type';

const defaultState = {
  value: '',
  q: 'k',
};
const home = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return Object.assign(state, defaultState);
    case types.changeData:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
export default home;
