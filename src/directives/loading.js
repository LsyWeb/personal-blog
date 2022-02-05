import imgUrl from '@/assets/loading.svg';
import loadingStyle from './loading.module.less';
// 获取元素中的img元素
function getLodingImg(el) {
    return el.querySelector('img[data-role="loading"]');
    
}
// 创建img元素
function create() {
    const img = document.createElement('img');
    img.dataset.role = 'loading';
    img.src = imgUrl;
    img.className = loadingStyle.loading;
    return img;
}
export default function (el, binding) {
    const imgCur = getLodingImg(el)
    if (binding.value) {
        if (!imgCur) {
            const img = create();
            el.appendChild(img)
        }
    } else {
        if (imgCur) {
            imgCur.remove();
        }
    }
}