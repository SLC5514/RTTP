<template>
  <div :class="'home ' + (pageType === 0 ? 'bg1' : 'bg2')">
    <div class="rule-btn pointer" @click="showRuleDialog = true">活动规则</div>
    <!-- 预览成品 -->
    <div v-show="pageType === 0" class="gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in previewList" :key="index">
          <div class="item pointer">{{ index }}</div>
        </div>
      </div>
    </div>
    <!-- 报告生成效果 -->
    <div v-show="pageType !== 0" :class="'preview ' + (pageType === 2 ? 'poster' : '')">
      {{ activeIndex }}
      <vue-qr class="qrcode" :text="downloadData.url" :logoSrc="downloadData.icon" :margin="0"></vue-qr>
    </div>
    <!-- 成品缩略图 -->
    <div v-show="pageType !== 2" class="gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in previewList" :key="index">
          <div class="item pointer">{{ index }}</div>
        </div>
      </div>
    </div>
    <div class="info">超过<span>10000</span>人通过海报邀请好友获得推荐奖励</div>
    <!-- 推荐按钮 -->
    <van-uploader v-show="pageType === 0" :after-read="generateRead">
      <div class="recommend-btn pointer"></div>
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
      复制邀请语 得奖几率翻倍！
    </div>
    <!-- 活动规则 -->
    <van-dialog className="rule-dialog" width="4.95rem" v-model="showRuleDialog" closeOnClickOverlay>
      <div class="text-content">
        <p>
          规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则
        </p>
      </div>
    </van-dialog>
    <!-- 复制对话框 -->
    <van-dialog className="copy-dialog" width="4.95rem" v-model="showCopyDialog" :showConfirmButton="false"
      closeOnClickOverlay>
      <div class="clearfix">
        <div class="change-btn pull-right pointer">换一换</div>
      </div>
      <p class="text-content">
        之前买过变成熟，但娃儿自学效果不好。后来在傲梦学习
        ，因为是老师1对1教学，确实进步神速。讨论一两个编程的小问题，气氛特别好！
      </p>
      <div class="conform-btn pointer" v-clipboard:copy="'fff'" v-clipboard:success="copySuc"
        v-clipboard:error="copyErr">
        一键复制邀请语
      </div>
    </van-dialog>
    <!-- 礼物对话框 -->
    <van-dialog className="gift-dialog" width="4.95rem" v-model="showGiftDialog" :showConfirmButton="false"
      closeOnClickOverlay>
      <img :src="alertImg" />
      <div class="conform-btn pointer" @click="showGiftDialog = false"></div>
    </van-dialog>
    <div>
      <router-link to="/poster"><button>Poster</button></router-link>
      <router-link to="/overview"><button>Overview</button></router-link>
      <button @click="wechatLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { wechatLogin } from '@/api'
import alertImg from '@/assets/home/alert.png'
import vueQr from 'vue-qr'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

const rootSize = parseFloat(document.documentElement.style.fontSize)

export default {
  name: 'Home',
  components: {
    vueQr,
  },
  data() {
    return {
      alertImg,
      pageType: 0, // 0 默认 1 预览 2 已生成
      showRuleDialog: false,
      showCopyDialog: false,
      showGiftDialog: false,
      giftCount: 0,

      activeIndex: 0,
      previewList: [1, 2, 3, 4, 5],

      downloadData: {
        url: 'https://www.baidu.com',
        icon: '/favicon.ico',
      },
    }
  },
  created() {
    // 退出挽留
    const self = this
    window.addEventListener(
      'popstate',
      function () {
        if (self.giftCount === 0) {
          self.giftCount++
          self.showGiftDialog = true
          window.history.pushState({ status: 0 }, '', '')
        }
      },
      false
    )
  },
  mounted() {
    this.thumbsInit()
  },
  methods: {
    wechatLogin() {
      wechatLogin(encodeURI(window.location.href))
    },
    // 初始化缩略图
    thumbsInit() {
      const self = this
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        // loop: true,
        // loopedSlides: 5,
        spaceBetween: rootSize * 0.74,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      })
      new Swiper('.gallery-top', {
        // loop: true,
        // loopedSlides: 5,
        spaceBetween: rootSize * 0.74,
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
    generateRead(file) {
      console.log(file)
      this.pageType = 1
    },
    // 生成海报
    generatePointer() {
      this.pageType = 2
    },
    copySuc() {
      this.showCopyDialog = false
      this.$notify({ type: 'success', message: '复制成功' })
    },
    copyErr() {
      this.$notify({ type: 'warning', message: '复制失败' })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-height: 14.89rem;
  // min-height: 100vh;
  // padding-bottom: 0.8rem;
  text-align: center;
  overflow: hidden;
  &.bg1 {
    background: #4b42f3 url(~@/assets/home/bg1.jpg) no-repeat top center;
    background-size: 100% auto;
  }
  &.bg2 {
    background: #4b42f3 url(~@/assets/home/bg2.jpg) no-repeat top center;
    background-size: 100% auto;
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
    background-color: #fff6c1;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
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
  }
  .gallery-top {
    margin: 1.77rem auto 0;
    .swiper-slide {
      .item {
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
    padding: 0 0.65rem;
    overflow: initial;
    .swiper-slide {
      width: auto;
      .item {
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
    width: 6rem;
    height: 1.45rem;
    margin: 0 auto;
    background: url(~@/assets/home/btn1.png) no-repeat center;
    background-size: contain;
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
  .rule-dialog {
    .text-content {
      padding: 0.31rem 0.515rem 0.27rem;
      p {
        height: 6rem;
        letter-spacing: 0.025rem;
        overflow-y: auto;
        text-align: justify;
      }
    }
  }
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
