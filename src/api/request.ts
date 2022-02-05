import axios from 'axios';

const ins = axios.create();
ins.interceptors.response.use((res)=>{
  return res.data
})

export default ins;