import Vue from 'vue'
import {install,Store} from 'vuex'
import banner from './banner'
import setting from './setting'
import about from './about'
import project from './project'
import login from './login'

if(!window.Vuex){
    install(Vue);
}

export default new Store({
    modules:{
        banner,
        setting,
        about,
        project,
        login
    }
})
