
/*тип экшена*/
export const GET_DATA_API = 'GET_DATA_API'

/*генератор экшена*/
export const getDataApi = (data) => {
	return { type: GET_DATA_API, data }
}