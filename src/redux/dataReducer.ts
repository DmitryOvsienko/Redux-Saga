import {GetDataTypes} from "./types"

const initialState = { // начальное состояние хранилища постов
  data: [],
}

export const dataReducer = (state = initialState, action: any) => { // редьюсер данных который принимает начальное состояние и экшн и возвращает состояние
  switch (action.type) {
    case GetDataTypes.GET_DATA:
      return {...state, data: action.payload} //добавляем в стор новый пост
    case GetDataTypes.DELETE_DATA_ADD:
      return {...state, data: action.action.payload}
    case GetDataTypes.CHANGE_ITEM_ADD:
      return {...state, data: action.action.payload}
    default:
      return state
  }
}