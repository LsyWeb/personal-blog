// 公共的获取远程数据的代码

// 具体的组件中要传入一个 获取数据的方法 fetchData()(必须为这个参数名) 参数为，data的格式 [],{}
export default function (defautltValue = null){
    return {
        data(){
            return {
                data:defautltValue,
                isLoading:true
            }
        },
        async created(){
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}