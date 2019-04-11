module.exports = {
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '/^api': ''
                }
            }
        }
    }
}