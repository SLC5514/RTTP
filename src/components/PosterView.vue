<template>
  <div class="poster-view-box" ref="box" :style="posterViewStyle">
    <img class="album" ref="album-img" v-if="albumImg" :src="albumImg" alt=""
      :style="albumImgStyle"
      v-finger:press-move="finger ? pressMove : () => {}"
      v-finger:rotate="finger ? rotate : () => {}"
      v-finger:pinch="finger ? pinch : () => {}"
    >
    <img class="album-mask"
      v-if="$parent.pageData && $parent.pageData.poster_list[tplIdx].album_mask[0] && $parent.pageData.poster_list[tplIdx].album_mask[0].path"
      :src="$parent.pageData.poster_list[tplIdx].album_mask[0].path"
      alt=""
    />
    <img class="title"
      v-if="$parent.pageData && $parent.pageData.poster_list[tplIdx].title_img[0] && $parent.pageData.poster_list[tplIdx].title_img[0].path"
      :src="formatTitlePath($parent.pageData && $parent.pageData.poster_list[tplIdx].title_img[0].path)"
      :style="getPxStyle($parent.pageData.poster_list[tplIdx].title_style, true)"
      alt=""
    />
    <img class="logo"
      v-if="$parent.pageData && $parent.pageData.poster_list[tplIdx].logo_img[0] && $parent.pageData.poster_list[tplIdx].logo_img[0].path"
      :src="$parent.pageData.poster_list[tplIdx].logo_img[0].path"
      alt=""
    />
    <div class="btm">
      <div class="back-rotate">
        <div class="left">
          <div class="user">
            <img :src="userData && userData.avatarUrl" alt="">
            <span>{{userData && userData.nickname}}</span>
          </div>
          <p :style="'color:' + ($parent.pageData && $parent.pageData.poster_list[tplIdx].info_text1_color)">{{$parent.pageData && $parent.pageData.poster_list[tplIdx].info_text1}}</p>
          <p :style="'color:' + ($parent.pageData && $parent.pageData.poster_list[tplIdx].info_text2_color)">{{$parent.pageData && $parent.pageData.poster_list[tplIdx].info_text2}}</p>
          <div class="info" :style="`color:${$parent.pageData && $parent.pageData.poster_list[tplIdx].info_text3_color};border-color:${$parent.pageData && $parent.pageData.poster_list[tplIdx].info_text3_color};`">{{$parent.pageData && $parent.pageData.poster_list[tplIdx].info_text3}}</div>
        </div>
        <div class="right">
          <vue-qr class="qrcode" :text="qrcodeData.url" :logoSrc="qrcodeData.icon" :margin="0"></vue-qr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import userImg from '@/assets/overview/success.png'

import tplT1 from '@/assets/home/tpl_t1.png'
import tplT2 from '@/assets/home/tpl_t2.png'
import tplT3 from '@/assets/home/tpl_t3.png'
import tplT4 from '@/assets/home/tpl_t4.png'
import tplT5 from '@/assets/home/tpl_t5.png'
import tplT6 from '@/assets/home/tpl_t6.png'
import tplT7 from '@/assets/home/tpl_t7.png'
import tplT8 from '@/assets/home/tpl_t8.png'

const defAlbumImgAttr = {
  w: '',
  h: '',
  x: 0,
  y: 0,
  angle: 0,
  zoom: 1
}

export default {
  name: 'PosterView',
  props: ['userData', 'albumImg', 'tplIdx', 'finger'],
  components: {
    vueQr,
  },
  data() {
    return {
      userImg,
      scale: 1,
      qrcodeData: {
        url: window.location.origin + '/poster?jtOpenId=' + this.$openId + '&materialId=' + this.$params.get('id') + (this.$params.get('debug') ? '&debug=' + this.$params.get('debug') : ''),
        // icon: '/favicon.ico',
      }, // 二维码数据
      albumImgAttr: JSON.parse(JSON.stringify(defAlbumImgAttr)),
      tplTitleImg: [ tplT1, tplT2, tplT3, tplT4, tplT5, tplT6, tplT7, tplT8 ]
    }
  },
  computed: {
    posterViewStyle() {
      return {
        transform: `scale(${this.scale})`,
        // height: (1 / this.scale) * 100 + '%',
      }
    },
    albumImgStyle() {
      return {
        width: this.albumImgAttr.w + 'px',
        height: this.albumImgAttr.h + 'px',
        transform: `translate(${this.albumImgAttr.x}px, ${this.albumImgAttr.y}px) rotate(${this.albumImgAttr.angle}deg) scale(${this.albumImgAttr.zoom})`
      }
    }
  },
  watch: {
    albumImg() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const box = this.$refs['box']
      const parent = box.parentNode
      this.scale = parent.clientWidth / box.clientWidth
      this.$nextTick(() => {
        // 图片尺寸位置初始化
        const albumImg = this.$refs['album-img'];
        if (albumImg) {
          const pw = albumImg.parentNode.clientWidth;
          const ph = albumImg.parentNode.clientHeight;
          if (pw > 0 && ph > 0) {
            const self = this;
            this.albumImgAttr = JSON.parse(JSON.stringify(defAlbumImgAttr));
            albumImg.onload = function() {
              this.style = '';
              const w = this.width || pw;
              const h = this.height || ph;
              const wr = pw / w;
              const hr = ph / h;
              if (wr > hr) {
                self.albumImgAttr.w = pw;
                self.albumImgAttr.h = h * wr;
              } else {
                self.albumImgAttr.h = ph;
                self.albumImgAttr.w = w * hr;
              }
              self.albumImgAttr.x = (pw - self.albumImgAttr.w) / 2;
              self.albumImgAttr.y = (ph - self.albumImgAttr.h) / 2;
            }
          }
        }
      })
    },

    pressMove(e) {
      e.stopPropagation();
      e.preventDefault();
      this.albumImgAttr.x += e.deltaX / this.scale;
      this.albumImgAttr.y += e.deltaY / this.scale;
    },
    rotate(e) {
      e.stopPropagation();
      e.preventDefault();
      this.albumImgAttr.angle = e.angle;
    },
    pinch(e) {
      e.stopPropagation();
      e.preventDefault();
      this.albumImgAttr.zoom = e.zoom;
    },
    // 处理样式
    getPxStyle(paramStyle, toRem) {
      let style = {};
      const needUnitStr = ['width', 'height', 'top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth', 'fontSize', 'borderRadius', 'letterSpacing'];
      const transformStr = ["rotate", "fliph", "flipv"];
      const shadowStr = ["shadowColor", "shadowBlur", "shadowH", "shadowV"];
      const noNeedUnitStr = ['x', 'y', 'ratio'];
      const rootRem = parseFloat(document.documentElement.style.fontSize);
      for (let key in paramStyle) {
        if (needUnitStr.includes(key)) {
          if (paramStyle[key] === 'auto' || paramStyle[key] === '100%') { // 属性兼容
            style[key] = paramStyle[key];
          } else {
            if (toRem) {
              style[key] = paramStyle[key] / rootRem + 'rem';
            } else {
              style[key] = paramStyle[key] + 'px';
            }
          }
        } else if (noNeedUnitStr.includes(key)) {
          continue;
        } else if (key === 'opacity') {
          style[key] = paramStyle[key] / 100;
        } else if (key === 'backgroundImage') {
          style[key] = `url(${paramStyle[key]})`;
        } else if (transformStr.includes(key)) {
          style['transform'] = `rotate(${paramStyle['rotate']}deg) scale(${paramStyle['fliph']}, ${paramStyle['flipv']})`;
        } else if (shadowStr.includes(key)) {
            if (toRem) {
              style['boxShadow'] = `${paramStyle['shadowH'] / rootRem}rem ${paramStyle['shadowV'] / rootRem}rem ${paramStyle['shadowBlur'] / rootRem}rem ${paramStyle['shadowColor']}`;
            } else {
              style['boxShadow'] = `${paramStyle['shadowH']}px ${paramStyle['shadowV']}px ${paramStyle['shadowBlur']}px ${paramStyle['shadowColor']}`;
            }
        } else {
          style[key] = paramStyle[key];
        }
      }
      return style;
    },
    formatTitlePath(path) {
      if (path && path.indexOf('/images/') != -1) {
        const idx = path.match(/tpl_t(\d*)\./);
        if (!idx) return path;
        return this.tplTitleImg[idx && idx[1] - 1];
      }
      return path;
    }
  },
}
</script>

<style lang="scss" scoped>
.poster-view-box {
  position: relative;
  left: 0;
  top: 0;
  width: 7.5rem;
  height: 13.34rem;
  text-align: left;
  background: #f5f5f5;
  transform-origin: left top;
  overflow: hidden;
  .album {
    max-width: none;
    // width: 100%;
    // height: 100%;
    // object-fit: cover;
  }
  .album-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  .title {
    position: absolute;
    left: 0;
    top: -1.8rem;
    width: 6rem;
    height: 3.5rem;
    object-fit: cover;
    z-index: 2;
  }
  .logo {
    position: absolute;
    left: 0.27rem;
    top: 0.28rem;
    width: 2.01rem;
    height: 0.79rem;
    background: #e6e6e6;
    object-fit: cover;
    z-index: 3;
  }
  .btm {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.42rem;
    background: rgba(255, 255, 255, 0.58);
    .back-rotate {
      padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .left {
        max-width: 4.8rem;
        .user {
          display: flex;
          align-items: center;
          & + p {
            margin-top: 0.1rem;
          }
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.1rem;
            background: #e6e6e6;
            border-radius: 50%;
          }
          span {
            font-size: 0.28rem;
            font-weight: 400;
            color: #5e5e5e;
            letter-spacing: 0.05rem;
          }
        }
        p {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.44rem;
          color: #794df1;
          white-space: nowrap;
          span {
            font-size: 0.6rem;
          }
        }
        .info {
          display: inline-block;
          height: auto;
          line-height: 1;
          padding: 0.1rem 0.4rem;
          margin-top: 0.1rem;
          border: 1px solid #794df1;
          border-radius: 0.5rem;
          font-size: 0.34rem;
          font-weight: 400;
          color: #794df1;
          text-align: center;
        }
      }
      .qrcode {
        width: 2.08rem;
        height: 2.08rem;
        background: #e6e6e6;
      }
    }
  }
}
</style>
