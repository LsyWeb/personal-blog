import getComponentRootDom from './getComponentRootDom';
import Icon from '@/components/Icon';
import styles from './showMessage.module.less';

/**
 * @param {} options 
 * @param content 消息内容 
 * @param type 消息类型，info，error，warn，success
 * @param durction 时间，经过多久后消失
 * @param container 容器，消息会显示到该容器的正中，默认为body 
 */
export default function (options = {}){
    const content = options.content || '';
    const type = options.type || 'info';
    const durction = options.durction || 2000;
    const container = options.container || document.body;

    // 创建消息元素
    const div = document.createElement('div');
    const IconDom = getComponentRootDom(Icon,{type})
    div.innerHTML = `<span class="${styles.icon}">${IconDom.outerHTML}</span><div>${content}</div>`

    // 设置样式
    const bgType = styles[`message-${type}`];
    div.className = `${styles.message} ${bgType}`;

    // 将div加入到容器中
    if(options.container){
        if(getComputedStyle(container).position == 'static'){
            container.style.position = 'relative';
        }
    }
    
    container.appendChild(div);

    // 让浏览器强行渲染 reflow
    div.clientHeight;

    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;

    // 等待一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
        div.addEventListener('transitionend',function () {
            div.remove();
            options.callback && options.callback();
        },{ once: true })
    }, durction);
}