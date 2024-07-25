import {authRequest} from "amaker/app/api/config";


const saveFilePathQueryStringGenerator = (path, extension, name) => {
  let query = `?path=${path}`
  if (extension) query += `&extension=${extension}`
  if (name) query += `&name=${name}`
  return query
}

const fileApi = {
  getSavePath: (path, extension, name) => authRequest.get(`/api/v1/file/url${saveFilePathQueryStringGenerator(path, extension, name)}`)
}

export default fileApi;