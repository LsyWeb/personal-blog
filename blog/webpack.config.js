const  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
if(process.env.NODE_ENV == 'production'){
    module.exports = {
        plugins:[
            new BundleAnalyzerPlugin()
        ],
        externals:{
            vue:'Vue',
            vuex:'Vuex',
            "vue-router":"VueRouter",
            axios:'axios'
        },
    }
}else{
    module.exports = {}
}
