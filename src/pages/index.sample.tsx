// import * as React from 'react'
import type { NextPage } from 'next'
import MainLayout from '../layouts'
import Image from 'next/image'
import styles from './index.module.scss'

import React, { useState, useEffect } from 'react'
//todosのgetHelloメソッド使ってるから
import { getHello, deleteHello, updateHello } from '../lib/api/hellos'
import Type from '../types'

import Test from '../components/counter'

import TodoList from '../components/todoList'

const Home: NextPage = () => {
  // const useMedia = Media();
  // useStateでstateを設定、<Type['helloObj']>はimportされたTypeの中のhelloObjを参照
  // typescriptではid, title, textの型を設定してるので必要なデータを初期値を入れる
  const [helloData, setText] = useState<Type['helloObj']>({
    id: 0,
    title: '',
    text: '',
  })

  // FIXME:axiosの直書きここに描きたくないなーどうにかならんかな
  // データ変更用(state用)のファイル作った方がいい気がする
  // 表示とデータ更新一緒にするの怖い

  // handlegetHello関数を設定axiosでデータを取ってきてtry catchでresponseを返している
  const handlegetHello = async () => {
    try {
      const res = await getHello()
      if (res?.status === 200) {
        console.log('============ return status 200')
        // setTextでhelloDataのstateを変更、値は引数のres.data.text
        setText(res.data)
      } else {
        console.log('============ return else')
        console.log(res.data.text)
      }
    } catch (err) {
      console.log('============ catch error')
      console.log(err)
    }
  }

  const handledeleteHello = async (id: number) => {
    try {
      // これでidをparamsに持ってserverにいく
      const res = await deleteHello(id)
      if (res?.status === 200) {
        console.log('============ return status 200')
        // setTextでhelloDataのstateを変更、値は引数のres.data.text
        // 例) setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id))
        // setText()の中にfilterを書く、なんかちょっと描き方違う？
        // ここの型指定あってる？
        const deleteHello = { id: 0, title: '', text: '' }
        setText(deleteHello)
      } else {
        console.log('============ return else')
      }
    } catch (err) {
      console.log('============ catch error')
      console.log(err)
    }
  }

  const handleupdateHello = async (data: Type['helloObj']) => {
    try {
      // これでidをparamsに持ってserverにいく
      const res = await updateHello(data)
      if (res?.status === 200) {
        console.log('============ return status 200')
        // setTextでhelloDataのstateを変更、値は引数のres.data.text
        // 例) setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id))
        // setText()の中にfilterを書く、なんかちょっと描き方違う？
        // ここの型指定あってる？
        //
        data.title = 'こんにちはupdate!'
        const setData = {
          id: data.id,
          title: data.title,
          text: data.text,
        }
        setText(setData)
      } else {
        console.log('============ return else')
      }
    } catch (err) {
      console.log('============ catch error')
      console.log(err)
    }
  }

  // DOMの描画時(Vueでいうレンダリング)にuseEffect発火
  // useEffect発火のタイミング→さまざまなタイミングで発火できる？
  // 初回レンダリング時のみ実行する→第二引数の配列を空にして記述
  // 任意の変数が変化したときのみ実行→第二引数の配列にその変数を指定
  // ライフサイクルはVueと違うみたい
  useEffect(() => {
    handlegetHello()
  }, [])

  return (
    <MainLayout>
      <div className={styles.container}>
        <main className={styles.home}>
          <div className={styles.home__content}>
            <h1>{process.env.NEXT_PUBLIC_SERVICE_NAME}</h1>
            <h1>apiから送られたid:{helloData.id}</h1>
            <h1>apiから送られたtitle:{helloData.title}</h1>
            <h1>apiから送られたtext:{helloData.text}</h1>

            <Test />
            <TodoList />
            <h1>これがupdateアクションです</h1>
            <button onClick={() => handleupdateHello(helloData || {})}>
              Update
            </button>

            <h1>これがdeleteアクションです</h1>
            <button onClick={() => handledeleteHello(helloData.id || 0)}>
              Delete
            </button>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Home
