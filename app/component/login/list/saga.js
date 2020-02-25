import { takeLatest, put } from 'redux-saga/effects';
import $api from '../../../config/http';
import * as types from './type';
import { changeData } from './action';

function* getMusic(action) {
  const result = yield $api.get(`${process.env.BASE_URL}/douban/v2/music/search`, action.data);
  if (result.code === 0) {
    yield put(changeData({
      value: result.count,
    }));
  } else {
    console.log('else');
    yield put(changeData({
      value: result.count,
    }));
  }
};

function* main() {
  yield takeLatest(types.increase, getMusic);
}

export default main;
