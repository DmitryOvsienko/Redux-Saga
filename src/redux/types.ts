

export enum GetDataTypes {
  GET_DATA = "GET_DATA",
  REQUEST_POSTS = "REQUEST_POSTS"
}

interface AxiosGetData {
  type: GetDataTypes.GET_DATA
}

interface RequestPosts {
  type: GetDataTypes.REQUEST_POSTS
}

export type GetData = AxiosGetData | RequestPosts