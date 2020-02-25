import { makeActionCreator } from '../../../lib/public';
import * as types from './type';

export const changeData = makeActionCreator(types.changeData, 'data');
export const increaseAction = makeActionCreator(types.increase, 'data');
