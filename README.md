# vue2-source
vue源码学习

### 搭建环境
```bash
npm i @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve -D
```

```js
 // rollup.config.js
 import babel from 'rollup-plugin-babel';
 import devServer from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        name: 'Vue', // 全局变量
        file: 'dist/vue.js',
        format: 'umd',
        sourcemap: true
    },
    plugins:[
        babel({ //ES6--> ES5
            exclude: 'node_modules/**'
        }),
        devServer({ //本地服务
            port: 3000,
            open: true,
            openPage: '/public/index.html',
            contentBase: ''
        })
    ]
}
```
```
README.md
├── dist
│   ├── vue.js
│   └── vue.js.map
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── rollup.config.js
└── src
    └── index.js
```
```js
    // src/index.js
    function Vue(params) {
    
    }
    export default Vue;

    // npm run dev --> rollup -c -w 打包代码到dist/vue.js
    // public/index.html
    <body>
        <script src='../dist/vue.js'></script>
        <script>
            console.log(Vue)
        </script>
    </body>

    // http://localhost:3000/public/index.html --> 控制台打印Vue
```


