import { GetDataTypes } from "./types";

export const axiosGet = () => {
  return {
    type: GetDataTypes.REQUEST_POSTS
  }
}