import axios from 'axios'
import {takeEvery, put, call} from 'redux-saga/effects' //функция которая должна обрабатывать каждый экшн вступающий в стор
import { GetDataTypes } from './types'



export function* sagaWatcher () {
  yield takeEvery(GetDataTypes.REQUEST_POSTS, sagaWorker) //на каждый сайд эффект будем выполнять воркер
}

function* sagaWorker ():any {
  try {
    const payload = yield call(axiosGetData) //дальше мы говорим что нужно подождать пока мы выполнима функцию в кол 
    yield put({type: GetDataTypes.GET_DATA, payload}) // передаем тип экшена и посты котрые получаем с сервера
  } catch (e) {
    console.log(e)
  }
}

async function axiosGetData() {
  const response = axios.get('https://api.punkapi.com/v2/beers')
  return (await response).data
}