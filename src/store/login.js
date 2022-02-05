import { login, whoAmI } from '../api/login';

export default {
    namespaced: true,
    state: {
        loading:false,
        user:whoAmI()
    },
    mutations: {
        setLoading(state,payload){
            state.loading = payload;
        },
        setUser(state,payload){
            state.user = payload;
        }
    },
    actions: {
        async login(ctx,loginInfo){
            
            ctx.commit('setLoading',true);
            await login(loginInfo);
            ctx.commit('setUser',loginInfo);
            ctx.commit('setLoading',false);
        },
    }
}