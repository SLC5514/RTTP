<template>
  <div :class="'home ' + (pageType <= 1 ? 'bg1' : 'bg2')" :style="pageBgStyle">
    <template v-if="$isiOS">
      <template v-if="!pageData || (pageType <= 1 && (!pageData.show_bg_img[0] || !pageData.show_bg_img[0].path)) || (pageType > 1 && (!pageData.render_bg_img[0] || !pageData.render_bg_img[0].path))">
        <img v-if="pageType <= 1" src="../assets/home/bg1.jpg" alt="" class="page-bg-img">
        <img v-else src="../assets/home/bg2.jpg" alt="" class="page-bg-img">
      </template>
      <template v-else-if="pageData && (pageType <= 1 && pageData.show_bg_img[0].path || pageType > 1 && pageData.render_bg_img[0].path)">
        <img v-if="pageType <= 1" :src="pageData.show_bg_img[0].path" alt="" class="page-bg-img">
        <img v-else :src="pageData.render_bg_img[0].path" alt="" class="page-bg-img">
      </template>
    </template>
    <div class="rule-btn pointer" @click="$refs['rules-alert'].showRulesAllert()">活动规则</div>
    <!-- 预览成品 -->
    <div v-show="pageType === 0" class="gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in pageData && pageData.poster_list || []" :key="index">
          <div class="item pointer">
            <PosterView :user-data="userData" :album-img="defAlbumImg" :tpl-idx="index" />
          </div>
        </div>
      </div>
    </div>
    <!-- 报告生成效果 -->
    <div v-if="pageType === 1" class="preview">
      <div>
        <PosterView ref="preview-poster" :user-data="userData" :album-img="albumImg" :album-img-angle="albumImgAngle" :tpl-idx="activeIndex" :finger="true" />
      </div>
    </div>
    <!-- 海报 -->
    <div v-show="pageType === 2" class="poster">
      <img :src="posterImg" alt="">
    </div>
    <!-- 成品缩略图 -->
    <div v-show="pageType !== 2" class="gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in pageData && pageData.poster_list || []" :key="index">
          <div class="item pointer">
            <PosterView :user-data="userData" :album-img="defAlbumImg" :tpl-idx="index" />
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-show="pageType <= 1">{{pageData && pageData.show_info_text}}</div>
    <div class="info" v-show="pageType > 1">{{pageData && pageData.show_info_text}}</div>
    <!-- 推荐按钮 -->
    <van-uploader v-show="pageType === 0" :after-read="generateRead">
      <div :class="'recommend-btn pointer ' + tadaClass" :style="'background-color:' + (pageData && pageData.show_btn_bg_color)">{{pageData && pageData.show_btn_text}}</div>
    </van-uploader>
    <!-- 重新生成按钮 -->
    <div v-show="pageType === 1">
      <van-uploader :after-read="generateRead">
        <div class="reselect-btn pointer">重新选图</div>
      </van-uploader>
      <div class="generate-btn pointer" @click="generatePointer">生成海报</div>
    </div>
    <!-- 复制按钮 -->
    <div v-show="pageType === 2" class="copy-btn pointer" :style="'background-color:' + (pageData && pageData.render_btn_text_bg_color)" @click="showCopyDialog = true">
      {{pageData && pageData.render_btn_text}}
    </div>
    <!-- 活动规则 -->
    <RulesAlert ref="rules-alert" :rule-text="pageData && pageData.rule_text" />
    <!-- 复制对话框 -->
    <van-dialog className="copy-dialog" width="4.95rem" v-model="showCopyDialog" :showConfirmButton="false"
      closeOnClickOverlay>
      <div class="clearfix">
        <div class="change-btn pull-right pointer"
          @click="copyTextRandomFn">换一换</div>
      </div>
      <p class="text-content">{{pageData && pageData.invite_info_text[copyTextRandom].value || ''}}</p>
      <div class="conform-btn pointer" v-clipboard:copy="pageData && pageData.invite_info_text[copyTextRandom].value || ''" v-clipboard:success="copySuc"
        v-clipboard:error="copyErr">
        一键复制邀请语
      </div>
    </van-dialog>
    <!-- 礼物对话框 -->
    <van-dialog className="gift-dialog" width="4.95rem" v-model="showGiftDialog" :showConfirmButton="false"
      closeOnClickOverlay>
      <img
        class="gift"
        :src="pageData && pageData.gift_img[0] && pageData.gift_img[0].path"
        alt=""
      />
      <img class="bg" :src="giftImg" alt="" />
      <div class="conform-btn pointer" @click="closeGiftDialog"></div>
    </van-dialog>
    <!-- <div>
      <router-link to="/poster"><button>Poster</button></router-link>
      <router-link to="/overview"><button>Overview</button></router-link>
    </div> -->
  </div>
</template>

<script>
import { wechatLogin, getStudentByOpenId, getMaterialById } from '@/api'
import defAlbumImg from '@/assets/home/album.jpg'
import giftImg from '@/assets/home/alert.png'
import html2canvas from 'html2canvas'
import EXIF from 'exif-js'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

window.EXIF = EXIF;

const rootSize = parseFloat(document.documentElement.style.fontSize)

// 默认背景图
const defImg = {
  name: '默认图片',
  path: '',
};

export default {
  name: 'Home',
  components: {
    RulesAlert: () => import('@/components/RulesAlert.vue'),
    PosterView: () => import('@/components/PosterView.vue'),
  },
  data() {
    return {
      tadaClass: '',
      pageData: null,
      pageType: 0, // 0 默认 1 预览 2 已生成

      giftImg, // 礼物图
      showCopyDialog: false, // 复制弹框
      showGiftDialog: false, // 礼物弹框
      backCount: 0, // 退出计数
      activeIndex: 0, // 所选蒙层位置
      defAlbumImg, // 相册图
      albumImg: null, // 相册图
      albumImgAngle: 0, // 相册图旋转
      posterImg: null, // 海报图
      userData: null, // 用户数据
      copyTextRandom: 0, // 随机下标
    }
  },
  computed: {
    pageBgStyle() {
      if (!this.pageData) return null;
      if (this.pageType <= 1) {
        return {
          'background-color': this.pageData.show_bg_color,
          'background-image': this.pageData.show_bg_img[0] && this.pageData.show_bg_img[0].path ? `url(${this.pageData.show_bg_img[0].path})` : null
        }
      } else {
        return {
          'background-color': this.pageData.render_bg_color,
          'background-image': this.pageData.render_bg_img[0] && this.pageData.render_bg_img[0].path ? `url(${this.pageData.render_bg_img[0].path})` : null
        }
      }
    }
  },
  created() {
    getMaterialById({
      id: this.$params.get('id')
    }).then(res => {
      this.pageData = JSON.parse(res.data && res.data.content || 'null')
      this.$nextTick(() => {
        this.thumbsInit()
      })
    }).catch()
  },
  mounted() {
    let timeout = null
    this.tadaClass = 'tada'
    timeout = setTimeout(() => {
      this.tadaClass = ''
      clearTimeout(timeout)
    }, 1000);
    setInterval(() => {
      this.tadaClass = 'tada'
      timeout = setTimeout(() => {
        this.tadaClass = ''
        clearTimeout(timeout)
      }, 1000);
    }, 6000);
    // 退出挽留
    window.history.pushState(null, null, document.URL)
    window.addEventListener(
      'popstate',
      () => {
        if (this.backCount === 0) {
          this.backCount++
          this.showGiftDialog = true
        }
      },
      false
    )
    this.getUserFn()
  },
  methods: {
    // 获取授权
    wechatLogin() {
      wechatLogin(encodeURI(window.location.href))
    },
    // 获取用户信息
    getUserFn() {
      getStudentByOpenId({
        openId: this.$openId,
      }).then((res) => {
        this.userData = res.data || {}
        if (!this.userData.phone) {
          this.$router.replace({
            path: '/poster',
            query: {
              openid: this.$openId,
              materialId: this.$params.get('id')
            },
          })
        }
      })
    },
    // 初始化缩略图
    thumbsInit() {
      const self = this
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        // loop: true,
        // loopedSlides: 5,
        spaceBetween: rootSize * 0.38,
        slidesPerView: 'auto',
        // slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      })
      new Swiper('.gallery-top', {
        // loop: true,
        // loopedSlides: 5,
        spaceBetween: rootSize * 0.38,
        thumbs: {
          swiper: galleryThumbs,
        },
        on: {
          slideChange: function () {
            self.activeIndex = this.activeIndex % (self.pageData && self.pageData.poster_list.length || 0)
          },
        },
      })
    },
    // 生成预览
    generateRead(res) {
      let reader = new FileReader()
      reader.readAsArrayBuffer(res.file)
      reader.onload = e => {
        let blob = null;
        if (typeof e.target.result === 'object') {
          blob = new Blob([e.target.result])
        } else {
          blob = e.target.result
        }
        const exifData = EXIF.readFromBinaryFile(e.target.result)
        this.albumImgAngle = 0
        if (exifData) {
          console.log('Orientation', exifData.Orientation)
          switch (exifData.Orientation) {
            case 6:
              this.albumImgAngle = 90
              break;
            case 3:
              this.albumImgAngle = 180
              break;
            case 8:
              this.albumImgAngle = 270
              break;
            default: break;
          }
        }
        const blobUrl = window.URL.createObjectURL(blob)
        this.albumImg = blobUrl
        this.defAlbumImg = null
        this.pageType = 1
      }
    },
    // 生成海报
    generatePointer() {
      const box = document.querySelector('.preview>div')
      const rect = box.getBoundingClientRect()
      const scale = 1 / (this.$refs['preview-poster'].scale || 1) + 1
      let w = box.scrollWidth * scale
      let h = box.scrollHeight * scale
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      // let left = 0
      // if (document.documentElement.clientWidth > 750) {
      //   left = document.documentElement.clientWidth - 750
      // }
      html2canvas(box, {
        canvas: canvas,
        scale: scale,
        logging: false,
        taintTest: true,
        allowTaint: false,
        useCORS: true,
        width: w,
        hegiht: h,
        // windowWidth: w,
        // windowHeight: h,
        x: window.scrollX + rect.left,
        // x: window.scrollX + rect.left - left / 2,
        y: window.scrollY + rect.top,
        scrollX: 0,
        scrollY: 0,
      })
        .then((cvs) => {
          var ctx = cvs.getContext('2d')
          // 关闭抗锯齿形
          ctx.mozImageSmoothingEnabled = false
          ctx.webkitImageSmoothingEnabled = false
          ctx.msImageSmoothingEnabled = false
          ctx.imageSmoothingEnabled = false
          // 生成图片
          var baseurl = cvs.toDataURL('image/jpeg', 1)
          this.posterImg = baseurl
          this.pageType = 2
        })
        .catch(() => {
          this.$notify({ type: 'warning', message: '生成失败' })
        })
    },
    // 复制成功
    copySuc() {
      this.showCopyDialog = false
      this.$notify({ type: 'success', message: '复制成功' })
    },
    // 复制失败
    copyErr() {
      this.$notify({ type: 'warning', message: '复制失败' })
    },
    closeGiftDialog() {
      this.showGiftDialog = false;
      this.defAlbumImg = defAlbumImg;
      this.albumImg = null;
      this.pageType = 0;
      document.documentElement.scrollTop = 0;
    },
    // 随机邀请语
    copyTextRandomFn() {
      // copyTextRandom = Math.floor(Math.random()*(0-(pageData && pageData.invite_info_text.length || 0))+(pageData && pageData.invite_info_text.length || 0))
      this.copyTextRandom++;
      if (this.copyTextRandom > (this.pageData && this.pageData.invite_info_text.length - 1 || 0)) {
        this.copyTextRandom = 0
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  height: 100vh;
  min-height: 13.34rem;
  text-align: center;
  overflow: hidden;
  background-color: #4b42f3;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  &.bg1 {
    background-image: url(~@/assets/home/bg1.jpg);
  }
  &.bg2 {
    background-image: url(~@/assets/home/bg2.jpg);
  }
  .rule-btn {
    font-size: 0.32rem;
    font-weight: 400;
    position: absolute;
    top: 0.45rem;
    left: 0;
    width: 1.72rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    color: #7357f0;
    border-radius: 0 0.5rem 0.5rem 0;
    background-color: #fff;
    box-shadow: 0 0 0.07rem 0.08rem rgba(148, 57, 168, 0.39);
  }
  .preview {
    position: relative;
    width: 3.98rem;
    height: 7.08rem;
    margin: 1.2rem auto 0;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
    & > div {
      width: 100%;
      height: 100%;
      background-color: #fff6c1;
      position: absolute;
    }
    .qrcode {
      position: absolute;
      width: 30%;
      right: 0;
      bottom: 0;
    }
  }
  .poster {
    width: 5.245rem;
    height: 9.295rem;
    margin: 1.45rem auto 0.2rem;
    background-color: #fff6c1;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
    & > img {
      width: 100%;
    }
  }
  .gallery-top {
    margin: 1.2rem auto 0;
    .swiper-slide {
      .item {
        position: relative;
        width: 3.98rem;
        height: 7.08rem;
        margin: 0 auto;
        background-color: #fff6c1;
        box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
      }
    }
  }
  .gallery-thumbs {
    margin-top: 0.4rem;
    padding: 0 0.4rem;
    overflow: initial;
    .swiper-slide {
      width: auto;
      &.swiper-slide-thumb-active:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: orange, $alpha: 0.3);
      }
      .item {
        position: relative;
        width: 1.15rem;
        height: 2.05rem;
        margin: 0 auto;
        background-color: #fff6c1;
        box-shadow: 0 0 0 0.09rem rgba(148, 57, 168, 0.21);
      }
    }
  }
  .info {
    font-size: 0.28rem;
    font-weight: 500;
    line-height: 0.55rem;
    margin-top: 0.25rem;
    margin-bottom: 0.2rem;
    text-align: center;
    color: #fff;
    span {
      color: #ffe362;
    }
  }
  .recommend-btn {
    // width: 6rem;
    // height: 1.45rem;
    // margin: 0 auto;
    // background: url(~@/assets/home/btn1.png) no-repeat center;
    // background-size: contain;

    width: 5.48rem;
    height: 0.92rem;
    line-height: 0.92rem;
    border-radius: 0.5rem;
    background-color: #fddc88;
    font-size: 0.5rem;
    font-weight: 800;
    color: #ffffff;
    text-align: center;
  }
  .reselect-btn {
    display: inline-block;
    width: 3.075rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #ada9ff;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 400;
    color: #ffffff;
    margin: 0 0.17rem;
  }
  .generate-btn {
    display: inline-block;
    width: 3.075rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #fff6c1;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 800;
    color: #ff900e;
    margin: 0 0.17rem;
  }
  .copy-btn {
    width: 5.575rem;
    height: 0.9rem;
    line-height: 0.9rem;
    margin: 0 auto;
    background: #fddc88;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.38rem;
    font-weight: 800;
    color: #fff;
  }

  .tada {
    animation: tada 1s;
    animation-fill-mode: both;
  }
  @keyframes tada{
    0%{-webkit-transform:scaleX(1);transform:scaleX(1)}
    10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate(-3deg);transform:scale3d(.9,.9,.9) rotate(-3deg)}
    30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(3deg);transform:scale3d(1.1,1.1,1.1) rotate(3deg)}
    40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(-3deg);transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}
  }
}
</style>
<style lang="scss">
.home {
  .copy-dialog {
    padding: 0.31rem 0.515rem 0.27rem;
    background-color: #ffffff;
    .change-btn {
      font-size: 0.295rem;
      font-weight: 400;
      color: #ff900e;
    }
    .text-content {
      width: 100%;
      margin-top: 0.28rem;
      font-size: 0.28rem;
      font-weight: 400;
      color: #5a5a5a;
      text-align: justify;
    }
    .conform-btn {
      width: 3.6rem;
      height: 0.665rem;
      line-height: 0.665rem;
      background: #ff900e;
      border-radius: 0.5rem;
      text-align: center;
      font-size: 0.295rem;
      font-weight: 400;
      color: #ffffff;
      margin: 0.6rem auto 0;
    }
  }
  .gift-dialog {
    background-color: #432f79;
    font-size: 0;
    .van-dialog__content {
      position: relative;
      width: 100%;
      height: 4.3rem;
    }
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .gift {
      position: absolute;
      top: 0.6rem;
      left: 50%;
      transform: translateX(-50%);
      width: 3rem;
      height: 3rem;
      background-color: #432f79;
    }
    .conform-btn {
      position: absolute;
      left: 50%;
      bottom: 0.39rem;
      margin-left: -1.25rem;
      width: 2.5rem;
      height: 0.665rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
