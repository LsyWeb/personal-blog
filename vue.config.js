
const path = require('path');
module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:5008'
            },
            '/img':{
                target: 'http://localhost:5008'
            },
        }
    },
    configureWebpack: require('./webpack.config'),
    outputDir:path.resolve(__dirname,'dist'),
    // publicPath:'/news'
}