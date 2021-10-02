import { GET_DATA } from "./types"

const initialState = { // начальное состояние хранилища постов
  data: [],
}

export const dataReducer = (state = initialState, action:any) => { // редьюсер постов который принимает начальное состояние и экшн и возвращает состояние
  switch (action.type) {
    case GET_DATA:
      return {...state,data: action.payload} //добавляем в стор новый пост
    default: return state
  }
}