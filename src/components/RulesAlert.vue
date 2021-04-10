<template>
  <div class="rules-alert-box" v-show="show">
    <div class="content">
      <div class="close" @click="show = false"></div>
      <p>{{ruleText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RulesAlert',
  props: ['ruleText'],
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showRulesAllert() {
      this.show = true
    },
  },
}
</script>

<style lang="scss" scoped>
.rules-alert-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba($color: #000, $alpha: 0.5);
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5.35rem;
    height: 8.54rem;
    padding: 0.54rem 0.44rem 0.52rem;
    background: #ffffff;
    border-radius: 0.24rem;
    .close {
      position: absolute;
      left: 50%;
      top: -1.17rem;
      transform: translateX(-50%);
      width: 0.6rem;
      height: 0.6rem;
      background: url(~@/assets/overview/close.png) no-repeat center / contain;
    }
    p {
      height: 100%;
      font-size: 0.3rem;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 0.4rem;
      text-align: justify;
      word-break: break-all;
      white-space: pre-wrap;
      overflow: auto;
    }
  }
}
</style>
