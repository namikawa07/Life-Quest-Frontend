import client from './client'
import Type from '../../types'

// hello一覧を取得
export const getHello = () => {
  return client.get('/hellos')
}

// helloをupdate
// ここType['helloObj']であってる？
export const updateHello = (data: Type['helloObj']) => {
  return client.put(`/hellos/${data.id}`, {
    hello_data: data,
  })
}

// helloを新規作成
/*
export const createHello = (data: Type['helloObj']) => {
  return client.post("/hellos", data)
}
*/

// helloを削除
export const deleteHello = (id: number) => {
  return client.delete(`/hellos/${id}`)
}
