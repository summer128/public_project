module.exports = {
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        proxy: {
            // 配置跨域
            '/api': {
                target: "https://api.weixin.qq.com",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 75 //列如设计稿尺寸为320
                    })
                ]
            }
        }
    }
}