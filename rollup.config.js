import babel from 'rollup-plugin-babel';
import devServer from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        name: 'Vue',
        file: 'dist/vue.js',
        format: 'umd',
        sourcemap: true
    },
    plugins:[
        babel({
            exclude: 'node_modules/**'
        }),
        devServer({
            port: 3000,
            open: true,
            openPage: '/public/index.html',
            contentBase: ''
        })
    ]
}