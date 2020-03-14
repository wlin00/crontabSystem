const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    //proxy配置，处理浏览器跨域问题，crontab部分
    app.use(createProxyMiddleware('/crontab', {
        target: 'http://l1nkkk.xyz:8070',
        changeOrigin: true,
        pathRewrite: {
            "^/crontab": "/" // 把/crontab 变成空
        }
    }));

    //用户部分跨域
    app.use(createProxyMiddleware('/zjj', {
        target: 'http://l1nkkk.xyz:3001',
        changeOrigin: true,
        pathRewrite: {
            "^/zjj": "/" // 把/crontab 变成空
        }
    }));

    //监控部分跨域
    app.use(createProxyMiddleware('/api', {
        target: 'http://139.180.193.16:8000',
        changeOrigin: true,
       
    }));

  


}