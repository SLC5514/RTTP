// function INIT() {
//   var init = 7.5//设计图宽的100%
//   var num = 0;
//   var mql = window.matchMedia("(orientation: portrait)");
//   if (mql.matches) {
//     num = document.documentElement.clientWidth//竖屏
//   } else {
//     num = document.documentElement.clientHeight//横屏
//   }
//   if (num > 750) num = 750;//定义最大值
//   document.documentElement.style.fontSize = num / init + 'px';
// }
// INIT();
// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
//   INIT()
// }, false);

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = '100px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
      var html = document.querySelector('html');
      var settingFs = parseFloat(100 * (clientWidth / 750));
      var settedFs = settingFs;
      var whileCount = 0;
      var status = true;
      while (status) {
        var realFs = parseFloat(window.getComputedStyle(html).fontSize);
        var delta = realFs - settedFs;
        //不相等
        if (Math.abs(delta) >= 1) {
          if (delta > 0) {
            settingFs--;
          } else {
            settingFs++;
          }
          html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
        } else {
          break;
        }
        if (whileCount++ > 100) {
          status = false;
          break;
        }
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
