<template>
  <i class="iconfont" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
  admin: "icon-weibiaoti5"
};
export const types = Object.keys(classMap);
export default {
   props:{
       type:{
           type:String,
           required:true
       }
   },
   computed:{
       fontClass(){
           return classMap[this.type]
       }
   }
}
</script>

<style>
@import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
@import "//at.alicdn.com/t/font_2449459_af23o586cft.css";
</style>