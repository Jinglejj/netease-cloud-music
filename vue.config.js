const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css'];
const isProcudtion = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    productionSourceMap: false,
    outputDir: 'dist',
    lintOnSave: false,
    configureWebpack: config => {
        if (isProcudtion) {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
                        //compression-webpack-plugin版本为2.0用filename 1.0用asset
                        filename: '[path].gz[query]',
                        // 使用 gzip 压缩
                        algorithm: 'gzip',
                        // 处理与此正则相匹配的所有文件
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        // 只处理大于此大小的文件
                        threshold: 1024,
                        // 最小压缩比达到 0.8 时才会被压缩
                        minRatio: 0.8,
                        //是否删除原文件
                        deleteOriginalAssets: false,
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        config.module.rule('svg')
            .exclude
            .add(resolve('src/icons'))
            .end();
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '127.1.1.1', // 指定使用一个 host。默认是 localhost
        port: 8081, // 端口地址
        https: false, // 使用https提供服务
        overlay: {
            warnings: false,
            errors: false
        },
        // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
            // `app` 是一个 express 实例
        }
    }
};