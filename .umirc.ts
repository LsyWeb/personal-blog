import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dva:{},
  favicon: '/assets/favicon.ico',
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:5008'
      },
      '/img':{
        target:'http://localhost:5008'
      }
    }
  }
});
