export enum GetDataTypes {
  GET_DATA = "GET_DATA",
  REQUEST_DATA = "REQUEST_DATA",
  DELETE_DATA = 'DELETE_DATA',
  DELETE_DATA_ADD = 'DELETE_DATA_ADD',
}

interface AxiosGetData {
  type: GetDataTypes.GET_DATA
}

interface RequestPosts {
  type: GetDataTypes.REQUEST_DATA
}

interface deleteData {
  type: GetDataTypes.DELETE_DATA
}

interface deleteDataAdd {
  type: GetDataTypes.DELETE_DATA_ADD
}

export type GetData = AxiosGetData | RequestPosts | deleteData | deleteDataAdd