import Mock from 'mockjs';
import qs from 'querystring';
Mock.mock('/api/message', 'post', {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createDate: Date.now(),
        "avatar|1": [
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
        ],
    },
})
// 留言板获取评论
Mock.mock(/^\/api\/message\/?(\?.+)?$/, 'get', function (options) {
    const request = qs.parse(options.url);
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            "total|20-85": 0,
            [`rows|${request.limit | 10}`]: [{
                "id": "@guid",
                nickname: "@cname",
                content: "@cparagraph(1,10)",
                blog: {
                    id: "@guid",
                    title: "博客标题"
                },
                createDate:  Date.now(),
                "avatar|1": [
                    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
                ],
            }]
        }
    })
})