import _axios from 'axios'
import { auth } from '../../firebase'

const client = _axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
})

client.interceptors.request.use(async (request) => {
  const idToken = await auth.currentUser?.getIdToken()
  request.headers.Authorization = idToken
  return request
})

export default client
