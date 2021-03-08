<template>
  <div class="rules-alert-box" v-show="show">
    <div class="content">
      <div class="close" @click="show = false"></div>
      <p>
        1、“品牌名”注册用户(推荐人)分享专属个性化海报，每推荐一位新用户(被推荐人)，通过推荐人专属个性化海报注册为“品牌名”用户，并首次购买4单元及以上主修课课程包或15课段及以上全项进阶课课程包，且满足如下赠课条件之一的，推荐人即可获得赠课(根据被推荐人购买的课程包不同有所区别)，最多可获赠10课时/课段主修课/全项进阶课，奖励可以累计。<br />
        (1)首次购买的课程包是主修课课程包的，当被推荐人被扣除的主修课课时超过8节(含缺席课时)且未退费；<br />
        (2)首次购买的课程包是全项进阶课课程包的，当被推荐人被扣除的全项进阶课超过2课段(含缺席课时)且未退费；<br />
        2、赠课将在满足奖励条件后30个工作日内添加到获赠用户的账户中。<br />
        3、具体奖励规则可咨询您的学习成长伙伴，您也可前往公众号查看奖励明细。活动分期开展，如参与活动，则被推荐人按照活动要求购买课程包的时间须在活动期间内。推荐人因参与本活动而获得的赠课将在购买的全部主修课/全项进阶课使用完毕以后方能开始使用。不论推荐人在参与本活动获得赠课时是否为付费学员，推荐人获得的全部赠课均不得进行退费。<br />
        4、获赠的课程仅限本账户使用，不可转赠其他用户，不得与其他优惠叠加使用。<br />
        5、如推荐人或被推荐人参加的其他活动与本活动互斥的，以推荐人或被推荐人参加的其他活动的活动规则为准。推荐人和被推存人均不再享有本活动赠课奖励。<br />
        6、本活动所有数据以“品牌名”系统数据为准。同“品牌名”账号，或账号不同但手机号、身份证相同，或账号不同但名下“品牌名”学员有交叉，符合以上任一条件均视为同一用户。<br />
        7、如果发现有参与者使用任何不正当手段参加活动，包括但不限于以下情况，主办方有权在不事先通知的前提下取消其获奖资格。<br />
        (1)任何有违本活动目的和宗旨；<br />
        (2)不遵守本活动规则参与活动(如刷单,作弊,同一用户通过不同账号互相邀请)；<br />
        (3)影响活动正常有序进行等(比如滥发短信、微信等骚扰行为,扰乱系统,批量或使用机器注册账号等不诚信行为)。<br />
        8、用户所上传的文本、图片、音视频等内容由用户自行对该等内容承担责任。<br />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RulesAlert',
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
      overflow: auto;
    }
  }
}
</style>
