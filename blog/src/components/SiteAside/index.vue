<template>
    <div class="siteAside-container">
        <template  v-if="data" >
            <Avatar :url="data.avatar" />
            <h1 class="title">{{data.siteTitle}}</h1>
        </template>
        <Menu />
        <Contact  v-if="data"/>
    </div>
</template>

<script>

import Avatar from '@/components/Avatar'
import Contact from './Contact';
import Menu from './Menu';
import {mapState} from 'vuex'
export default {
    components:{
        Avatar,
        Contact,
        Menu
    },
    created () {
        this.$store.dispatch('setting/fetchSetting');
    },
    computed: {
        ...mapState('setting',['data'])
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.siteAside-container{
    width: 100%;
    height: 100%;
    background: @dark;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    .title{
        font-size: 1.4rem;
        color: #fff;
        font-weight: normal;
        text-align: center;
    }
    .footer{
        text-align: center;
        color: #666;
        font-size: 14px;
    }
}
.avatar-container{
    display: block;
    margin: 0 auto;
}
</style>