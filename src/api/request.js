import axios from 'axios';
import { Message } from 'element-ui'
const ins = axios.create(); //创建一个axios的实例
ins.interceptors.response.use(function (resp) {
    if(resp.data.code !== 0){
        Message.error({
            message:resp.data.mag,
            center:true
        })
        return null;
    }
    else{
        
        return resp.data.data;
    }
})

export default ins;