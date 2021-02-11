const baseSize = 50; // 蓝湖须设置相应尺寸

// 设置 rem 函数
function setRem() {
  var width = document.documentElement.clientWidth;
  if (width > 750) width = 750;
  const scale = width / 750;
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
}

// 初始化
setRem();

// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
