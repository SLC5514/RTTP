<template>
  <div class="container">
    <div class="header">
      <div class="title fw">总奖励明细</div>
      <div class="avtiveTxt fw" @click="$refs['rules-alert'].showRulesAllert()">活动说明</div>
      <div class="count flexRow">
        <div class="each-item flexCol fw">
          <b>{{registerNum || 0}}</b>
          <span>已注册</span>
        </div>
        <div class="each-item flexCol fw">
          <b>{{auditionNum || 0}}</b>
          <span>已试听</span>
        </div>
        <div class="each-item flexCol fw">
          <b>{{payNum || 0}}</b>
          <span>已付款</span>
        </div>
        <div class="each-item flexCol fw">
          <b>{{unRefundNum || 0}}</b>
          <span>已过退费期</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="txt flexRow fw">
        <i></i>
        <span>最近邀请好友</span>
        <i></i>
      </div>
      <div class="progress">
        <div class="item" v-for="(v, i) in progressData" :key="i" v-show="!lookAll && i < 2 || lookAll">
          <div class="item_top">被推荐人：{{v.phone}}</div>
          <div class="item_content flexRow">
            <div :class="'item_child flexCol ' + (v.progress >= 1 ? 'success' : '')">
              <div class="line"></div>
              <div class="icon"></div>
              <span class="type fw">已注册</span>
              <span class="time" v-if="v.progress >= 1">{{v.registerTimeStr}}</span>
            </div>
            <div :class="'item_child flexCol ' + (v.progress >= 2 ? 'success' : '')">
              <div class="line"></div>
              <div class="icon"></div>
              <span class="type fw">已试听</span>
              <span class="time" v-if="v.progress >= 2">{{v.auditionTimeStr}}</span>
            </div>
            <div :class="'item_child flexCol ' + (v.progress >= 3 ? 'success' : '')">
              <div class="line"></div>
              <div class="icon"></div>
              <span class="type fw">已付费</span>
              <span class="time" v-if="v.progress >= 3">{{v.payTimeStr}}</span>
            </div>
            <div :class="'item_child flexCol ' + (v.progress >= 4 ? 'success' : '')">
              <div class="icon"></div>
              <span class="type fw">已过退费期</span>
              <span class="time" v-if="v.progress >= 4">{{v.unRefundTimeStr}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="allData" v-if="progressData.length > 2 && !lookAll" @click="lookAll = true">查看全部</div>
    </div>
    <RulesAlert ref="rules-alert" :rule-text="pageData && pageData.rule_text" />
  </div>
</template>
<script>
import { getProgressByOpenId, getMaterialById } from '@/api'
export default {
  name: 'Overview',
  components: {
    RulesAlert: () => import('@/components/RulesAlert.vue'),
  },
  data() {
    return {
      registerNum: '',
      auditionNum: '',
      payNum: '',
      unRefundNum: '',
      progressData: [],
      lookAll: false,
      pageData: null
    }
  },
  created() {
    this.progressFn()
    getMaterialById({
      id: this.$params.get('id')
    }).then(res => {
      this.pageData = JSON.parse(res.data && res.data.content || 'null')
      console.log(this.pageData)
    }).catch()
  },
  methods: {
    progressFn() {
      getProgressByOpenId({
        openId: this.$openId,
      }).then((res) => {
        if (res.status == '200') {
          this.registerNum = res.data.registerNum
          this.auditionNum = res.data.auditionNum
          this.payNum = res.data.payNum
          this.unRefundNum = res.data.unRefundNum
          this.progressData = res.data.list
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  color: #808080;
  background: #fff;
}
.fw {
  font-weight: 400;
}
.flexRow {
  display: flex;
  flex-direction: row;
}
.flexCol {
  display: flex;
  flex-direction: column;
}
.header {
  width: 7.5rem;
  height: 5.38rem;
  background: #794df1;
  position: relative;
}
.header .title {
  text-align: center;
  font-size: 0.38rem;
  color: #fff;
  padding-top: 0.55rem;
  box-sizing: border-box;
}
.header .avtiveTxt {
  background: #fff;
  box-shadow: 0 0.07rem 0.08rem 0 rgba(148, 57, 168, 0.39);
  border-radius: 0 0.4rem 0.4rem 0;
  font-size: 0.32rem;
  color: #7357f0;
  padding: 0.14rem 0.27rem 0.15rem 0.24rem;
  position: absolute;
  left: 0;
  top: 1.23rem;
}
.header .count {
  width: 6.6rem;
  justify-content: center;
  margin: 1.3rem 0.55rem 0 0.35rem;
}
.header .count .each-item {
  flex: 1;
  align-items: center;
}
.header .count .each-item b {
  font-size: 0.48rem;
  color: #fff;
}
.header .count .each-item span {
  font-size: 0.3rem;
  color: #d4c4ff;
  margin-top: 0.1rem;
}
.content {
  width: 7rem;
  height: 5rem;
  border-radius: 0.6rem;
  margin: -1.11rem 0.25rem 0;
  background: #fff;
  position: relative;
  z-index: 1;
}
.content .txt {
  align-items: center;
  justify-content: center;
  padding-top: 0.55rem;
  box-sizing: border-box;
}
.content .txt i {
  width: 1.4rem;
  height: 0.02rem;
  background: #e0e0e0;
}
.content .txt span {
  font-size: 0.34rem;
  color: #1a1a1a;
  margin: 0 0.17rem 0;
}
.content .progress {
  width: 7rem;
  margin-top: 0.42rem;
  background-color: #fff;
}
.content .progress > .item {
  height: 2.45rem;
  padding: 0.25rem 0.23rem;
  box-sizing: border-box;
}
.content .progress > .item:last-child {
  border: none;
}
.content .progress .item_top {
  font-size: 0.3rem;
  font-weight: 400;
  color: #1a1a1a;
}
.content .progress .item_content .item_child {
  width: 1.9rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.3rem;
  position: relative;
}
.content .progress .item_content .item_child .line {
  width: 1.06rem;
  height: 0.02rem;
  background: #ebebeb;
  position: absolute;
  right: -0.53rem;
  top: 0.27rem;
}
.content .progress .item_content .item_child .icon {
  width: 0.57rem;
  height: 0.54rem;
  border: 0.02rem solid #b8b8b8;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
}
.content .progress .item_content .item_child .type {
  font-size: 0.28rem;
  font-weight: 400;
  color: #aaa;
  position: absolute;
  top: 0.63rem;
  white-space: nowrap;
}
.content .progress .item_content .item_child .time {
  font-size: 0.22rem;
  font-weight: 400;
  color: #808080;
  position: absolute;
  top: 1.02rem;
  white-space: nowrap;
  letter-spacing: 0;
}
.content .progress .item_content .success .line {
  background: #a281fb;
}
.content .progress .item_content .success .type {
  color: #a281fb;
}
.content .progress .item_content .success .icon {
  background: url(~@/assets/overview/success.png) no-repeat;
  background-size: cover;
  border: none;
}
.allData {
  width: fit-content;
  margin: 0.3rem auto;
  font-size: 0.3rem;
  color: #a281fb;
  font-weight: 400;
  text-align: center;
}
</style>
