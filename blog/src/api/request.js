import axios from 'axios';
import showMessage from '../utils/showMessage';

const ins = axios.create(); //创建一个axios的实例
ins.interceptors.response.use(function (resp) {
    if(resp.data.code !== 0){
        showMessage({
            content:resp.data.mag,
            type:'error'
        })
        return null;
    }
    else{
        
        return resp.data.data;
    }
})

export default ins;