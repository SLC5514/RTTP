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
    <div v-show="pageType === 1" class="preview">
      <div>
        {{ activeIndex }}
        <img class="album-img" :src="albumImg" alt="">
        <vue-qr class="qrcode" :text="qrcodeData.url" :logoSrc="qrcodeData.icon" :margin="0"></vue-qr>
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
    <van-dialog class="rule-dialog" width="4.95rem" v-model="showRuleDialog" closeOnClickOverlay>
      <div class="text-content">
        <p>
          1、“品牌名”注册用户(推荐人)分享专属个性化海报，每推荐一位新用户(被推荐人)，通过推荐人专属个性化海报注册为“品牌名”用户，并首次购买4单元及以上主修课课程包或15课段及以上全项进阶课课程包，且满足如下赠课条件之一的，推荐人即可获得赠课(根据被推荐人购买的课程包不同有所区别)，最多可获赠10课时/课段主修课/全项进阶课，奖励可以累计。<br/>
          (1)首次购买的课程包是主修课课程包的，当被推荐人被扣除的主修课课时超过8节(含缺席课时)且未退费；<br/>
          (2)首次购买的课程包是全项进阶课课程包的，当被推荐人被扣除的全项进阶课超过2课段(含缺席课时)且未退费；<br/>

          2、赠课将在满足奖励条件后30个工作日内添加到获赠用户的账户中。<br/>

          3、具体奖励规则可咨询您的学习成长伙伴，您也可前往公众号查看奖励明细。活动分期开展，如参与活动，则被推荐人按照活动要求购买课程包的时间须在活动期间内。推荐人因参与本活动而获得的赠课将在购买的全部主修课/全项进阶课使用完毕以后方能开始使用。不论推荐人在参与本活动获得赠课时是否为付费学员，推荐人获得的全部赠课均不得进行退费。<br/>

          4、获赠的课程仅限本账户使用，不可转赠其他用户，不得与其他优惠叠加使用。<br/>

          5、如推荐人或被推荐人参加的其他活动与本活动互斥的，以推荐人或被推荐人参加的其他活动的活动规则为准。推荐人和被推存人均不再享有本活动赠课奖励。<br/>

          6、本活动所有数据以“品牌名”系统数据为准。同“品牌名”账号，或账号不同但手机号、身份证相同，或账号不同但名下“品牌名”学员有交叉，符合以上任一条件均视为同一用户。<br/>

          7、如果发现有参与者使用任何不正当手段参加活动，包括但不限于以下情况，主办方有权在不事先通知的前提下取消其获奖资格。<br/>
          (1)任何有违本活动目的和宗旨；<br/>
          (2)不遵守本活动规则参与活动(如刷单,作弊,同一用户通过不同账号互相邀请)；<br/>
          (3)影响活动正常有序进行等(比如滥发短信、微信等骚扰行为,扰乱系统,批量或使用机器注册账号等不诚信行为)。<br/>

          8、用户所上传的文本、图片、音视频等内容由用户自行对该等内容承担责任。<br/>
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
      <img :src="giftImg" />
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
let openid
import { wechatLogin, getStudentByOpenId } from '@/api'
import giftImg from '@/assets/home/alert.png'
import html2canvas from 'html2canvas'
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
      giftImg, // 礼物图
      pageType: 0, // 0 默认 1 预览 2 已生成
      showRuleDialog: false, // 规则弹框
      showCopyDialog: false, // 复制弹框
      showGiftDialog: false, // 礼物弹框
      backCount: 0, // 退出计数
      activeIndex: 0, // 所选蒙层位置
      previewList: [1, 2, 3, 4, 5], // 蒙层列表
      qrcodeData: {
        url: window.location.origin + '/poster',
        // icon: '/favicon.ico',
      }, // 二维码数据
      albumImg: null, // 相册图
      posterImg: null, // 海报图
    }
  },
  created() {
    // 退出挽留
    const self = this
    window.addEventListener(
      'popstate',
      function () {
        if (self.backCount === 0) {
          self.backCount++
          self.showGiftDialog = true
          window.history.pushState({ status: 0 }, '', '')
        }
      },
      false
    )
  },
  mounted() {
    // 未获取到微信openid
    const params = new URLSearchParams(window.location.search)
    openid = params.get('openid') || params.get('openId')
    const { pathname, search } = window.location
    const redirect = encodeURIComponent(pathname + search)
    alert(redirect)
    if (!openid) {
      location.replace('/oauth.html?url=' + redirect)
      return false
    }
    this.thumbsInit()
    this.getUserFn()
  },
  methods: {
    // 获取授权
    wechatLogin() {
      wechatLogin(encodeURI(window.location.href))
    },
    getUserFn () {
      getStudentByOpenId({
        openId: 'oIdnG5-wPO2csWtppJpy1xJPv6ig',
      }).then((res) => {
        if (res.status == "200") {
          console.log(res)
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
      })
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
      this.albumImg = file.content
      this.pageType = 1
    },
    // 生成海报
    generatePointer() {
      const box = document.querySelector('.preview>div')
      const rect = box.getBoundingClientRect()
      const w = box.scrollWidth
      const h = box.scrollHeight
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      console.log(w, h, rect, window.scrollX, window.scrollY)
      html2canvas(box, {
        canvas: canvas,
        scale: 1,
        logging: false,
        taintTest: true,
        allowTaint: false,
        useCORS: true,
        width: w,
        hegiht: h,
        windowWidth: w,
        windowHeight: w,
        x: 0,
        y: window.scrollY + rect.y,
        // x: rect.x,
        // y: rect.y,
        // x: window.scrollX,
        // y: window.scrollY,
        // scrollX: window.scrollX,
        // scrollY: window.scrollY,
        // scrollX: 0,
        // scrollY: 0,
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
    width: 3.965rem;
    height: 7.025rem;
    margin: 1.77rem auto 0;
    box-shadow: 0 0 0.26rem 0.21rem rgba(148, 57, 168, 0.39);
    & > div {
      width: 100%;
      height: 100%;
      position: relative;
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
