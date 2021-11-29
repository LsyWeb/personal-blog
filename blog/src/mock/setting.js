import Mock from "mockjs";
import touxiang from '@/assets/touxiang.png';
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: touxiang,
    siteTitle: "刘帅洋的个人空间",
    github: "https://github.com/LsyWeb",
    qq: "2913304963",
    qqQrCode:
      "https://lsyweb.github.io/assest/erweima/qq.png",
    weixin: "qqq18438015189",
    weixinQrCode:
      "https://lsyweb.github.io/assest/erweima/weixin.png",
    email: "liushuaiyang@aliyun.com",
    icp: "黑ICP备17001719号",
    githubName: "LsyWeb",
    favicon: "https://lsyweb.github.io/assest/ico/favicon.ico",
  },
});
