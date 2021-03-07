if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  // 执行相应代码或直接跳转到手机页面
  alert("Fuxxの博客提醒您：\n电脑访问体验更佳！");
} else {
  // 执行桌面端代码
  if (!window.localStorage.getItem('storge')) {
    alert('Fuxxの博客提醒您：\n看板娘可以选择切换是否开启');
    window.localStorage.setItem('storge', 'true')
  }
}
