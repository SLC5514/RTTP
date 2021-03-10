<template>
  <div class="poster-view-box" ref="box" :style="posterViewStyle">
    <div class="logo">{{test}}</div>
    <div class="album-box">
      <img class="title" :src="posterTitle" alt="">
      <img class="album" v-if="albumImg" :src="albumImg" alt="">
    </div>
    <div class="btm">
      <div class="back-rotate">
        <div class="left">
          <div class="user">
            <img v-if="userData && userData.avatarUrl" :src="userData.avatarUrl" alt="">
            <span v-if="userData && userData.nickname">{{userData.nickname}}</span>
          </div>
          <p>送你<span>288</span>元<br>真人直播体验课</p>
          <div class="info">扫码识别 立即领取</div>
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
import posterTitle from '@/assets/home/poster_title.png'
import userImg from '@/assets/overview/success.png'

export default {
  name: 'PosterView',
  props: ['userData', 'albumImg', 'test'],
  components: {
    vueQr,
  },
  data() {
    return {
      posterTitle,
      userImg,
      scale: 1,
      qrcodeData: {
        url: window.location.origin + '/poster?jtOpenId=' + this.$openId,
        // icon: '/favicon.ico',
      }, // 二维码数据
    }
  },
  computed: {
    posterViewStyle() {
      return {
        transform: `scale(${this.scale})`,
        height: (1 / this.scale) * 100 + '%',
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const box = this.$refs['box']
        const parent = box.parentNode
        this.scale = parent.clientWidth / box.clientWidth
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.poster-view-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 7.5rem;
  height: 14.89rem;
  text-align: left;
  background: #fdd35b;
  transform-origin: left top;
  overflow: hidden;
  .logo {
    position: absolute;
    left: 0.27rem;
    top: 0.28rem;
    width: 2.01rem;
    height: 0.79rem;
    background: #e6e6e6;
  }
  .album-box {
    position: absolute;
    left: 50%;
    top: 2.16rem;
    transform: translateX(-50%);
    width: 6.75rem;
    height: 10.92rem;
    border-radius: 0.2rem;
    background: #e6e6e6;
    .title {
      position: absolute;
      left: 0;
      top: -1.8rem;
      width: 6rem;
    }
    .album {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .btm {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 110%;
    height: 4.01rem;
    background: #ffffff;
    box-shadow: 0rem 0.26rem 0.4rem rgba(213, 140, 44, 0.39);
    transform: rotate(7deg);
    transform-origin: left top;
    .back-rotate {
      width: 7.5rem;
      padding: 0.66rem 0.49rem 0.68rem 0.56rem;
      transform: rotate(-7deg);
      transform-origin: left top;
      display: flex;
      .left {
        .user {
          display: flex;
          align-items: center;
          img {
            width: 0.55rem;
            height: 0.55rem;
            margin-right: 0.1rem;
            background: #e6e6e6;
            border-radius: 50%;
          }
          span {
            font-size: 0.34rem;
            font-weight: 400;
            color: #5e5e5e;
            letter-spacing: 0.05rem;
          }
        }
        p {
          font-size: 0.55rem;
          font-weight: 400;
          line-height: 0.75rem;
          margin-top: 0.1rem;
          color: #794df1;
          white-space: nowrap;
          span {
            font-size: 0.6rem;
          }
        }
        .info {
          display: inline-block;
          width: 3.78rem;
          // height: 0.53rem;
          // line-height: 0.53rem;
          line-height: 1;
          padding: 0.1rem 0;
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
        width: 2.09rem;
        height: 2.09rem;
        margin: 0.6rem 0 0 0.5rem;
        background: #e6e6e6;
      }
    }
  }
}
</style>
