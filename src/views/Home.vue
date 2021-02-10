<template>
  <div class="home">
    <div class="rule-btn">活动规则</div>
    <Swipe class="swipe" :show-indicators="false" @change="onChange">
      <SwipeItem>
        <div class="item"></div>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  name: 'Home',
  components: {
    Swipe,
    SwipeItem,
  },
  methods: {
    onChange(index) {
      this.$toast('当前 Swipe 索引：' + index)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-height: 100%;
  padding-top: 3.54rem;
  background: #4b42f3 url('../assets/bg1.jpg') no-repeat top center;
  background-size: 100% auto;
  .rule-btn {
    position: absolute;
    top: 1.46rem;
    left: 0;
    width: 3.45rem;
    height: 1.19rem;
    line-height: 1.19rem;
    font-size: 0.64rem;
    font-weight: 400;
    color: #7357f0;
    background: #fff;
    text-align: center;
    box-shadow: 0rem 0rem 0.14rem 0.16rem rgba(148, 57, 168, 0.39);
    border-radius: 0rem 1rem 1rem 0rem;
    cursor: pointer;
  }
  .swipe {
    .van-swipe-item {
      text-align: center;
      .item {
        width: 7.93rem;
        height: 14.04rem;
        margin: 0 auto;
        background-color: #eee;
      }
    }
  }
}
</style>
