<template>
  <div class="home">
    <div class="rule-btn pointer">活动规则</div>
    <div class="preview"></div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="banner" v-for="banner in banners">
          <div class="item pointer">{{ banner }}</div>
        </div>
      </div>
    </div>
    <div class="info">超过<span>10000</span>人通过海报邀请好友获得推荐奖励</div>
    <div class="btn pointer"></div>
  </div>
</template>

<script>
const rootSize = parseFloat(document.documentElement.style.fontSize)

export default {
  name: 'Home',
  data() {
    return {
      banners: [1, 2, 3, 4, 5],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: rootSize * 0.74,
      },
    }
  },
  mounted() {
    // this.mySwiper.slideTo(3, 1000, false)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-height: 100%;
  padding-top: 3.54rem;
  padding-bottom: 1.3rem;
  background: #4b42f3 url('../assets/bg1.jpg') no-repeat top center;
  background-size: 100% auto;
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
    width: 7.93rem;
    height: 14.04rem;
    margin: 0 auto;
    background-color: #eee;
  }
  .swiper-container {
    margin-top: 1.3rem;
    padding: 0 0.86rem;
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
    margin-bottom: 1rem;
    text-align: center;
    color: #fff;
    span {
      color: #ffe362;
    }
  }
  .btn {
    width: 12rem;
    height: 2.9rem;
    margin: 0 auto;
    background: url(~@/assets/btn1.png) no-repeat center;
    background-size: contain;
  }
}
</style>
