/**
 * 异步资源加载函数
 * @param {URL} url 要加载的资源链接
 * @param {type{"css", "js"}} type 资源类型
 * @returns 
 */
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;
        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        }
        else if (type === "js") {
            tag = document.createElement("script");
            tag.src = url;
        }
        if (tag) {
            tag.onload = () => resolve(url);
            tag.onerror = () => reject(url);
            document.head.appendChild(tag);
        }
    });
}

/**
 * 根据元素id监听函数
 * @param {node} fatherTree 要监听的元素的父容器
 * @param {boolean} watchSubtree 是否监听所有后代节点的变化
 * @param  {Map<string, function(node)>} ListenerMap 需要新增的节点和操作函数数组
 */
function sign(fatherTree, watchSubtree, ListenerMap) {
    // 创建一个 MutationObserver 实例
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                // 遍历新增的节点
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    // 检查新增节点是否为目标元素
                    if (node.matches) {
                        let keysToDelete = [];
                        ListenerMap.forEach((processFunc, key) => {
                            // 判断是否满足删除条件
                            if (node.id == key) {
                                processFunc(node);
                                keysToDelete.push(key);
                            }
                        })
                        // 删除元素
                        keysToDelete.forEach((key) => { ListenerMap.delete(key); })
                        // 元素为空，停止监听
                        if (ListenerMap.size == 0) observer.disconnect
                    }
                }
            }
        });
    });

    // 配置 MutationObserver 监听特定的 DOM 变化
    var observerConfig = {
        childList: true, // 监听子节点的变化
        subtree: watchSubtree // 监听所有后代节点的变化
    };

    // 启动 MutationObserver
    observer.observe(fatherTree, observerConfig);
}

function delayUntilConditionMet(condition, delay, callback) {
    if (condition()) {
        callback();
    } else {
        setTimeout(function () {
            delayUntilConditionMet(condition, delay, callback);
        }, delay);
    }
}
/* 加载动态隐藏函数 */
loadExternalResource("./custom/js/hideObj.js", "js")

/* 注册监听，以便实时更新隐藏状态 */
let ListenerMap = new Map([
    ['waifu', function () { handleScroll(); }],
    ['tidio-chat', function () { handleScroll(); }]
])
sign(document.documentElement, true, ListenerMap)

/* 加载资源 */
Promise.all([
    loadExternalResource("./live2d-widget/autoload.js", "js"),
]).then(() => {
    loadExternalResource("./custom/css/waifu_custom.css", "css")
});

Promise.all([
    loadExternalResource("//code.tidio.co/qfmxenxm3vbbzuagnt9kj52ykueuibfn.js", "js")
]).then(() => {
    loadExternalResource("./custom/css/tidio_custom.css", "css")
});