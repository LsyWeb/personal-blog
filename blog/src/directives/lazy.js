import {debounce} from '@/utils';
import $bus from '@/eventBus.js';
import defaultSrc from '@/assets/default.gif';

let imgs = [];

function setImages(){
    for (const img of imgs) {
        // 处理单张图片
        setImage(img);
    }
}

// 处理单张图片
function setImage(img){
    img.dom.src = defaultSrc;
    const clientHeight = document.documentElement.clientHeight; //视口高度
    const rect = img.dom.getBoundingClientRect(); //每个img元素的位置
    const height = rect.height || 150;
    if(rect.top > -height && rect.top <= clientHeight){
        img.dom.src = img.src;
        imgs = imgs.filter(i => i !== img)
    }
}

function handleScroll(){
    setImages();
}
$bus.$on('mainScroll',debounce(handleScroll,50))

export default {
    inserted(el,binding){
        const img = {
            dom:el,
            src:binding.value
        }
        imgs.push(img);
        setImage(img);
    },
    unbind(el){
        imgs = imgs.filter((img) => img.dom !== el)
    }

}