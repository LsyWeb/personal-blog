// import request from './request';

export async function login(loginInfo) {
  localStorage.setItem('blog-userInfo',JSON.stringify(loginInfo))
}

export function whoAmI(){
  const userInfo = JSON.parse(localStorage.getItem('blog-userInfo'));
  if(userInfo){
    return userInfo
  }else{
    return null;
  }
  
}