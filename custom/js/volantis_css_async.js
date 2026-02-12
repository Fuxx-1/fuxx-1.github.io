/**
 * 监听函数
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
                            if (node.matches(key)) {
                                processFunc(node);
                                keysToDelete.push(key);
                            }
                        })
                        keysToDelete.forEach((key) => {
                            ListenerMap.delete(key);
                        })
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

// let ListenerMap = new Map([
//     [
//         '#waifu',
//         function (node) {
//             Object.assign(node.style, {
//                 width: '200px',
//                 right: 'auto',
//                 left: '0',
//                 width: '200px'
//             })
//         }
//     ],
//     [
//         '#live2d',
//         function (node) {
//             Object.assign(node.style, {
//                 height: '200px',
//                 width: '200px'
//             })
//         }
//     ],
//     [
//         '#waifu-tool',
//         function (node) {
//             Object.assign(node.style, {
//                 left: '15px',
//                 top: '5px'
//             })
//         }
//     ],
//     [
//         '.fa-lg',
//         function (node) {
//             Object.assign(node.style, {
//                 fontSize: '0.9em !important'
//             })
//         }
//     ],
//     [
//         '#waifu-tips',
//         function (node) {
//             Object.assign(node.style, {
//                 minHeight: '50px',
//                 width: '150px',
//                 fontSize: '0.45em',
//                 lineHeight: '12px',
//                 left: '15px'
//             })
//         }
//     ],
//     [
//         'key1',
//         {
//             nodeMatches: "Hello",
//             processFunc: function (node) { }
//         }
//     ]
// ])

// For Test
let ListenerMap = new Map([
    [
        '#father',
        function (node) {
            Object.assign(node.style, {width: '100px'})
        }
    ]
])

sign(document.documentElement, true, ListenerMap)