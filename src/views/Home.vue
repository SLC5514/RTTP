<template>
  <div :class="'home ' + (pageType <= 1 ? 'bg1' : 'bg2')" :style="pageBgStyle">
    <div class="rule-btn pointer" @click="$refs['rules-alert'].showRulesAllert()">活动规则</div>
    <!-- 预览成品 -->
    <div v-show="pageType === 0" class="gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in previewList" :key="index">
          <div class="item pointer">
            {{ index }}
            <PosterView :user-data="userData" :album-img="albumImg" :test="index" />
          </div>
        </div>
      </div>
    </div>
    <!-- 报告生成效果 -->
    <div v-if="pageType === 1" class="preview">
      <div>
        {{ activeIndex }}
        <PosterView ref="preview-poster" :user-data="userData" :album-img="albumImg" :test="activeIndex" />
      </div>
    </div>
    <!-- 海报 -->
    <div v-show="pageType === 2" class="poster">
      <img :src="posterImg" alt="">
    </div>
    <!-- 成品缩略图 -->
    <div v-show="pageType !== 2" class="gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in previewList" :key="index">
          <div class="item pointer">{{ index }}</div>
        </div>
      </div>
    </div>
    <div class="info" v-show="pageType <= 1">{{pageData && pageData.show_info_text}}</div>
    <div class="info" v-show="pageType > 1">{{pageData && pageData.show_info_text}}</div>
    <!-- 推荐按钮 -->
    <van-uploader v-show="pageType === 0" :after-read="generateRead">
      <div :class="'recommend-btn pointer ' + tadaClass">{{pageData && pageData.show_btn_text}}</div>
    </van-uploader>
    <!-- 重新生成按钮 -->
    <div v-show="pageType === 1">
      <van-uploader :after-read="generateRead">
        <div class="reselect-btn pointer">重新选图</div>
      </van-uploader>
      <div class="generate-btn pointer" @click="generatePointer">生成海报</div>
    </div>
    <!-- 复制按钮 -->
    <div v-show="pageType === 2" class="copy-btn pointer" @click="showCopyDialog = true">
      {{pageData && pageData.render_btn_text}}
    </div>
    <!-- 活动规则 -->
    <RulesAlert ref="rules-alert" />
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
        :src="pageData && pageData.gift_img.path"
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
import giftImg from '@/assets/home/alert.png'
import html2canvas from 'html2canvas'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

const rootSize = parseFloat(document.documentElement.style.fontSize)

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
      previewList: [1, 2, 3, 4, 5], // 蒙层列表
      albumImg: null, // 相册图
      posterImg: null, // 海报图
      userData: null, // 用户数据
      copyTextRandom: 0, // 随机下标
      copyTextList: [
        '之前买过变成熟，但娃儿自学效果不好。后来在傲梦学习，因为是老师1对1教学，确实进步神速。讨论一两个编程的小问题，气氛特别好！',
        'teset',
        'aaaaaaaaa',
        'bbbbbbbbbbbbb',
        'ccccccccccccccccccccccc',
      ],
    }
  },
  computed: {
    pageBgStyle() {
      if (!this.pageData) return null;
      if (this.pageType <= 1) {
        return {
          'background-color': this.pageData.show_bg_color,
          'background-image': this.pageData.show_bg_img.path ? `url(${this.pageData.show_bg_img.path})` : null
        }
      } else {
        return {
          'background-color': this.pageData.render_bg_color,
          'background-image': this.pageData.render_bg_img.path ? `url(${this.pageData.render_bg_img.path})` : null
        }
      }
    }
  },
  created() {
    getMaterialById({
      id: this.$params.get('id')
    }).then(res => {
      this.pageData = JSON.parse(res.data)
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
    this.thumbsInit()
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
          this.$router.push({
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
            self.activeIndex = this.activeIndex % self.previewList.length
            console.log(self.activeIndex)
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
        const blobUrl = window.URL.createObjectURL(blob)
        this.albumImg = blobUrl
        this.pageType = 1
      }
    },
    // 生成海报
    generatePointer() {
      const box = document.querySelector('.preview>div')
      const rect = box.getBoundingClientRect()
      const scale = 1 / (this.$refs['preview-poster'].scale || 1)
      let w = box.scrollWidth * scale
      let h = box.scrollHeight * scale
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      let left = 0
      if (document.documentElement.clientWidth > 750) {
        left = document.documentElement.clientWidth - 750
      }
      html2canvas(box, {
        canvas: canvas,
        scale: scale,
        logging: false,
        taintTest: true,
        allowTaint: false,
        useCORS: true,
        width: w,
        hegiht: h,
        windowWidth: w,
        windowHeight: h,
        x: window.scrollX + rect.left - left / 2,
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
  min-height: 14.89rem;
  text-align: center;
  overflow: hidden;
  background: #4b42f3 no-repeat center top / 100% auto;
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
    top: 0.73rem;
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
    width: 3.965rem;
    height: 7.025rem;
    margin: 1.77rem auto 0;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
    & > div {
      width: 3.965rem;
      height: 7.025rem;
      background-color: #fff6c1;
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
    margin: 1.98rem auto 0.68rem;
    background-color: #fff6c1;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
    & > img {
      width: 100%;
    }
  }
  .gallery-top {
    margin: 1.77rem auto 0;
    .swiper-slide {
      .item {
        position: relative;
        width: 3.97rem;
        height: 7.02rem;
        margin: 0 auto;
        background-color: #fff6c1;
        box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
      }
    }
  }
  .gallery-thumbs {
    margin-top: 0.65rem;
    padding: 0 0.4rem;
    overflow: initial;
    .swiper-slide {
      width: auto;
      .item {
        position: relative;
        width: 1.27rem;
        height: 2.25rem;
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
    margin-top: 0.26rem;
    margin-bottom: 0.44rem;
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
    text-shadow: 0px 0.08rem 0.08rem rgba(255, 141, 58, 0.86);
    box-shadow: 0px 0.08rem 0.08rem #ff7611;
  }
  .reselect-btn {
    display: inline-block;
    width: 3.075rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #ada9ff;
    box-shadow: 0 0 0.5rem 0 rgba(39, 34, 149, 0.23);
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
    box-shadow: 0 0 0.5rem 0 rgba(39, 34, 149, 0.23);
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
    background: #fff6c1;
    box-shadow: 0 0 0.5rem 0 rgba(39, 34, 149, 0.23);
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.38rem;
    font-weight: 800;
    color: #ff900e;
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
