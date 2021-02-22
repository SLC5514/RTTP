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
    <van-dialog className="rule-dialog" width="9.9rem" v-model="showRuleDialog" closeOnClickOverlay>
      <div class="text-content">
        <p>
          规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则
        </p>
      </div>
    </van-dialog>
    <!-- 复制对话框 -->
    <van-dialog className="copy-dialog" width="9.9rem" v-model="showCopyDialog" :showConfirmButton="false"
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
    <van-dialog className="gift-dialog" width="9.9rem" v-model="showGiftDialog" :showConfirmButton="false"
      closeOnClickOverlay>
      <img src="../assets/alert.png" />
      <div class="conform-btn pointer" @click="showGiftDialog = false"></div>
    </van-dialog>
  </div>
</template>

<script>
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
  mounted() {
    this.thumbsInit()
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
  methods: {
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
      this.$notify('复制成功')
    },
    copyErr() {
      this.$notify('复制失败')
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  // min-height: 29.78rem;
  min-height: 100vh;
  padding-bottom: 1.6rem;
  text-align: center;
  overflow: hidden;
  &.bg1 {
    background: #4b42f3 url(~@/assets/bg1.jpg) no-repeat top center;
    background-size: 100% auto;
  }
  &.bg2 {
    background: #4b42f3 url(~@/assets/bg2.jpg) no-repeat top center;
    background-size: 100% auto;
  }
  .rule-btn {
    font-size: 0.64rem;
    font-weight: 400;
    line-height: 1.19rem;
    position: absolute;
    top: 1.46rem;
    left: 0;
    width: 3.45rem;
    height: 1.19rem;
    text-align: center;
    color: #7357f0;
    border-radius: 0rem 1rem 1rem 0rem;
    background-color: #fff;
    box-shadow: 0rem 0rem 0.14rem 0.16rem rgba(148, 57, 168, 0.39);
  }
  .preview {
    position: relative;
    width: 7.93rem;
    height: 14.05rem;
    margin: 3.54rem auto 0;
    background-color: #fff6c1;
    box-shadow: 0rem 0rem 0.52rem 0.42rem rgba(148, 57, 168, 0.39);
    .qrcode {
      position: absolute;
      width: 30%;
      right: 0;
      bottom: 0;
    }
  }
  .poster {
    width: 10.49rem;
    height: 18.59rem;
    margin: 3.96rem auto 1.36rem;
    background-color: #fff6c1;
    box-shadow: 0rem 0rem 0.52rem 0.42rem rgba(148, 57, 168, 0.39);
  }
  .gallery-top {
    margin: 3.54rem auto 0;
    .swiper-slide {
      .item {
        width: 7.93rem;
        height: 14.05rem;
        margin: 0 auto;
        background-color: #fff6c1;
        box-shadow: 0rem 0rem 0.52rem 0.42rem rgba(148, 57, 168, 0.39);
      }
    }
  }
  .gallery-thumbs {
    margin-top: 1.3rem;
    padding: 0 1.3rem;
    overflow: initial;
    .swiper-slide {
      width: auto;
      .item {
        width: 2.54rem;
        height: 4.5rem;
        margin: 0 auto;
        background-color: #fff6c1;
        box-shadow: 0rem 0rem 0rem 0.18rem rgba(148, 57, 168, 0.21);
      }
    }
  }
  .info {
    font-size: 0.56rem;
    font-weight: 500;
    line-height: 1.1rem;
    margin-top: 0.52rem;
    margin-bottom: 0.88rem;
    text-align: center;
    color: #fff;
    span {
      color: #ffe362;
    }
  }
  .recommend-btn {
    width: 12rem;
    height: 2.9rem;
    margin: 0 auto;
    background: url(~@/assets/btn1.png) no-repeat center;
    background-size: contain;
  }
  .reselect-btn {
    display: inline-block;
    width: 6.15rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: #ada9ff;
    box-shadow: 0rem 0rem 1rem 0rem rgba(39, 34, 149, 0.23);
    border-radius: 1rem;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 400;
    color: #ffffff;
    margin: 0 0.34rem;
  }
  .generate-btn {
    display: inline-block;
    width: 6.15rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: #fff6c1;
    box-shadow: 0rem 0rem 1rem 0rem rgba(39, 34, 149, 0.23);
    border-radius: 1rem;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 800;
    color: #ff900e;
    margin: 0 0.34rem;
  }
  .copy-btn {
    width: 11.15rem;
    height: 1.8rem;
    line-height: 1.8rem;
    margin: 0 auto;
    background: #fff6c1;
    box-shadow: 0rem 0rem 1rem 0rem rgba(39, 34, 149, 0.23);
    border-radius: 1rem;
    text-align: center;
    font-size: 0.76rem;
    font-weight: 800;
    color: #ff900e;
  }
  .rule-dialog {
    .text-content {
      padding: 0.62rem 1.03rem 0.54rem;
      p {
        height: 6rem;
        letter-spacing: 0.05rem;
        overflow-y: auto;
        text-align: justify;
      }
    }
  }
  .copy-dialog {
    padding: 0.62rem 1.03rem 0.54rem;
    background-color: #ffffff;
    .change-btn {
      font-size: 0.59rem;
      font-weight: 400;
      color: #ff900e;
    }
    .text-content {
      width: 100%;
      margin-top: 0.56rem;
      font-size: 0.56rem;
      font-weight: 400;
      color: #5a5a5a;
      text-align: justify;
    }
    .conform-btn {
      width: 7.2rem;
      height: 1.33rem;
      line-height: 1.33rem;
      background: #ff900e;
      border-radius: 1rem;
      text-align: center;
      font-size: 0.59rem;
      font-weight: 400;
      color: #ffffff;
      margin: 1.2rem auto 0;
    }
  }
  .gift-dialog {
    background-color: #432f79;
    font-size: 0;
    .conform-btn {
      position: absolute;
      left: 50%;
      bottom: 0.78rem;
      margin-left: -2.5rem;
      width: 5rem;
      height: 1.33rem;
      border-radius: 1rem;
    }
  }
}
</style>
