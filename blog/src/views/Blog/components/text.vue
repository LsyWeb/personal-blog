<template>
  <RightList :list="data" @select="handleSelect" />
</template>

<script>
import RightList from './RightList';
import '@/styles/global.less';
export default {
    components:{
        RightList
    },
    data(){
        return {
            data:[
                {name:'a',isSelect:true},
                {name:'a',isSelect:false},
                {name:'a',isSelect:false,children:[
                    {name:'b',isSelect:true},
                    {name:'b',isSelect:false}
                ]},
                {name:'a',isSelect:false}
            ]
        }
    },
    methods:{
        handleSelect(item){
            console.log(item)
        }
    }
}
</script>

<style>
</style>