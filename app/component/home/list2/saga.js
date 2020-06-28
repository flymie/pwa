import { takeLatest, put } from 'redux-saga/effects';
import $api from '../../../config/http';
import * as types from './type';
import { changeData } from './action';

const BASE_URL = require('../../../../build/config')[process.env.NODE_ENV].api;

function* initFn(action) {
  // const result = yield $api.get('http://localhost:5678/douban/v2/music/search', action.data);
  // const result = yield $api.get('https://api.douban.com/v2/music/search', action.data);
  // const result = yield $api.get(`${BASE_URL}/douban/v2/music/search`, action.data);
  const result = yield $api.get(`${BASE_URL}/oneSaid/`, {});
  // try {
  //   if (result.code === 0) {
  //     yield put(changeData({
  //       value: result.count,
  //       SSRdata: true,
  //     }));
  //   } else {
  //     yield put(changeData({
  //       value: result.count,
  //       SSRdata: true,
  //     }));
  //   }
  // } catch (e) {
  //   console.log(e);
    yield put(changeData({
      value: result,
      SSRdata: true,
    }));
  // }
}

function* getMusic(action) {
  const result = yield $api.get(`${BASE_URL}/douban/v2/music/search`, action.data);
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
}

function* main() {
  yield takeLatest(types.init, initFn);
  yield takeLatest(types.increase, getMusic);
}

export default main;
