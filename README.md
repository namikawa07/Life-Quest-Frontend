This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.





2.apiでデータをfetchしてくる
3,herokuにstaging prod環境でデプロイする


http://localhost:4000/

#cloneしたら
docker-compose run -w /usr/src/app/site --rm node yarn install


```
stateで状態を管理する方法
sliceでstate,reducer,actionを設定
store.jsにimport
使いたいコンポーネントにreducerをimport
例)import { additional, subtraction } from '../../slices/counterSlice';
useSelecterとuserDispatchもimport
useSelectorを使ってstateを取得しコンポーネントで使う変数に代入
useDispatchでdispatch処置をできるようにしておく
使いたいところで先ほど設定した変数を使う
stateの変更はdispatch関数で行う
counterSlice counter/index.tsxはテストなのでそこ参照
```

apiを使ってstateでの状態の更新や保持のコードはこちら
https://github.com/namikawa07/animation-app/pull/6




# envを使っての実装
```
firebase Auth
```


FIXME: google以外の外部サービスログイン



## cloneしてきたらやること
firebaseAuthParamsの値をfirebaseで作ったプロジェクトに対応させる


## サービス設計
#### コンセプト
日々の生活でやらなければいけないことをクエストみたいにして楽しくこなしていこう

こなしていくのが楽しくなるような設計（達成感であったり）
レベルアップの先に何があるかを明示してやればいいのでは？まあレベルアップ自体に楽しさを見出して楽しいって言ってくれる人もいるが

ゲームっぽくするのかどうか
するんやったらタスクこなすのが楽しくなるのと相性の合っているような形がいいと思う
かっこいい系か可愛い系か中間的なやつか

3Dとかメタバースとかを使ったasanaみたいなもの
web3とかオープンソースとか絡めてもいいのでは？

考える部分
・ミニマムでそういう感じのツールとして展開していくのか
・ゲーム性についてタスクをこなしていくだけで達成感のあるゲームの種類とかかっこいいか可愛いかなどどんな感じの雰囲気にするかを検討する
・レベル設計やバッジなど達成感のあるものを考える


### ミニマムでそういう感じのツールとして展開していくのか
・タスクをこなしていく方向じゃなくてもいい気もする
クエスト風味を他で活かせる方法はないかな？
・
