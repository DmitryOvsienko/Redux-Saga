import {GetDataTypes} from "./types";

export const axiosGet = () => {
  return {
    type: GetDataTypes.REQUEST_DATA
  }
}

export const deleteData = (payload: any) => {
  return {
    type: GetDataTypes.DELETE_DATA,
    payload
  }
}

export const changeItemAdd = (payload: any) => {
  return {
    type: GetDataTypes.CHANGE_ITEM,
    payload
  }
}