import NotFound from "@/views/NotFound.vue";
import 'nprogress/nprogress.css';
import {start,done, configure} from 'nprogress';

configure({
    trickleSpeed:20
})

async function delay(durction) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, durction);
    })
}

function getPageComponent(pageComponent) {
    return async () => {
        start();
        if (process.env.NODE_ENV === 'development') {
            await delay(1000)
        }
        const resp = await pageComponent();
        done();
        return resp;
    }
}

// 路由路径
export default [
    {
        name: 'Home',
        path: '/',
        component: getPageComponent( () => import(/* webapckChunkName:home */'@/views/Home') ),
        meta: { title: "首页" }
    },
    {
        name: 'About',
        path: '/about',
        component: getPageComponent( () => import(/* webapckChunkName:about */'@/views/About') ),
        meta: { title: "关于我" }
    },
    {
        name: 'Blog',
        path: '/blog',
        component: getPageComponent( () => import(/* webapckChunkName:blog */'@/views/Blog') ),
        meta: { title: "文章" }
    },
    {
        name: 'BlogCate',
        path: '/blog/cate/:categoryid',
        component: getPageComponent( () => import(/* webapckChunkName:BlogCate */'@/views/Blog') ),
        meta: { title: "文章" }
    },
    {
        name: 'BlogDetail',
        path: '/blog/:id',
        component: getPageComponent( () => import(/* webapckChunkName:BlogDetail */'@/views/Blog/Detail') ),
        meta: { title: "文章" }
    },
    {
        name: 'Message',
        path: '/message',
        component: getPageComponent( () => import(/* webapckChunkName:message */'@/views/Message') ),
        meta: { title: "留言板" }
    },
    {
        name: 'Project',
        path: '/project',
        component: getPageComponent( () => import(/* webapckChunkName:project */'@/views/Project') ),
        meta: { title: "项目&效果" }
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound,
    }
]