import { takeLatest, put } from 'redux-saga/effects';
import $api from '../../../config/http';
import * as types from './type';
import { changeData } from './action';

const baseUrl = {
  production: 'http://localhost:5678',
  development: 'http://localhost:1234/FORWARD',
}

function* initFn(action) {
  // const result = yield $api.get('http://localhost:5678/douban/v2/music/search', action.data);
  // const result = yield $api.get('https://api.douban.com/v2/music/search', action.data);
  const result = yield $api.get(`${baseUrl[process.env.NODE_ENV]}/douban/v2/music/search`, action.data);
  console.log(`${process.env.NODE_ENV}/douban/v2/music/search`, 'url')
  if (result.code === 0) {
    yield put(changeData({
      value: result.count,
    }));
  } else {
    yield put(changeData({
      value: result.count,
    }));
  }
};

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
  yield takeLatest(types.init, initFn);
  yield takeLatest(types.increase, getMusic);
}

export default main;
