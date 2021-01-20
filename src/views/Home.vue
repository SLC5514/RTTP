<template>
  <div class="home">
    <Swipe class="swipe" :show-indicators="false" @change="onChange">
      <SwipeItem><img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""></SwipeItem>
      <SwipeItem><img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""></SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  name: "Home",
  components: {
    Swipe,
    SwipeItem
  },
  methods: {
    onChange(index) {
      this.$toast('当前 Swipe 索引：' + index);
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  padding-top: 90px;
  min-height: 100%;
  background: #4B42F3 url('../assets/bg1.jpg') no-repeat top center;
  background-size: 100% auto;
  .swipe {
    .van-swipe-item {
      text-align: center;
      img {
        width: 22rem;
        height: 30rem;
      }
    }
  }
}
</style>
