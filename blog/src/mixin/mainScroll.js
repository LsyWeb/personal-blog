export default function (refValue) {
    return {
        mounted(){
            this.$bus.$on('scrollToTop',this.scrollToTop);
            this.$refs[refValue].addEventListener("scroll", this.handleSetMainScroll);
        },
        beforeDestroy(){
            this.$bus.$off('scrollToTop',this.scrollToTop);
            this.$bus.$emit("mainScroll");
            this.$refs[refValue].removeEventListener("scroll", this.handleSetMainScroll);
        },
        methods:{
            handleSetMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            scrollToTop(top){
                console.log(this.$refs[refValue].scrollTop)
                this.$refs[refValue].scrollTop = top;
                // 滚动到顶部
            }
        }
    }
}