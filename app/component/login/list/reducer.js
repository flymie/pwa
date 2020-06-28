import * as types from './type';

const defaultState = {
  value: 0,
};
const home = (state = defaultState, action) => {
  switch (action.type) {
    case types.changeData:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
export default home;
