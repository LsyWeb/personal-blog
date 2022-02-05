<template>
  <ul class="contact-container">
    <li>
      <a target="_blacnk" :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{data.githubName}}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.email}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{data.email}}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{data.qq}}</span>
      </a>
      <div class="pop">
        <img
          :src="data.qqQrCode"
          alt=""
        />
      </div>
    </li>
    <li>
      <a href="">
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{data.weixin}}</span>
      </a>
      <div class="pop">
        <img
          :src="data.weixinQrCode"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import {mapState} from 'vuex';
export default {
  components: {
    Icon,
  },
  created(){
    this.$store.dispatch('setting/fetchSetting')
  },
  computed: {
    ...mapState('setting',['loading','data'])
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/global.less";

.contact-container {
  list-style:none;
  padding: 20px;
  @itemHeight: 30px;
  li {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 14px 0;
    color: #999;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
    a {
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      font-size: 26px;
      width: 36px;
      &.weixin .iconfont {
        font-size: 32px;
        margin-left: -3px;
      }
      .iconfont {
        font-size: 26px;
      }
    }
    .pop {
      position: absolute;
      left: 4px;
      bottom: @itemHeight + 5px;
      padding: 10px 15px;
      background: #fff;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: 0.3s;
      img {
        width: 150px;
        height: 150px;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background: #fff;
        bottom: -4px;
      }
    }
  }
}
</style>