import axios from 'axios'
import {takeEvery, put, call} from 'redux-saga/effects' //функция которая должна обрабатывать каждый экшн вступающий в стор
import { GetDataTypes } from './types'

export function* sagaWatcher () {
  yield takeEvery(GetDataTypes.REQUEST_DATA, sagaWorker) //на каждый сайд эффект будем выполнять воркер
  yield takeEvery(GetDataTypes.DELETE_DATA, deleteDataWorker)
  yield takeEvery(GetDataTypes.CHANGE_ITEM, changeItemWorker)
}

function* sagaWorker (): any {
  try {
    const payload = yield call(axiosGetData) //дальше мы говорим что нужно подождать пока мы выполнима функцию что бы вернуть данные с запроса
    yield put({type: GetDataTypes.GET_DATA, payload}) // передаем тип экшена и посты котрые получаем с сервера
  } catch (e) {
    console.log(e)
  }
}

function* deleteDataWorker (action: any) {
  yield put({type: GetDataTypes.DELETE_DATA_ADD, action})
}

function* changeItemWorker (action: any) {
  yield put({type: GetDataTypes.CHANGE_ITEM_ADD, action})
}

async function axiosGetData() {
  const response = axios.get('https://api.punkapi.com/v2/beers')
  return (await response).data
}