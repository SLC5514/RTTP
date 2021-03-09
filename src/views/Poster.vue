<template>
  <div class="container">
    <div class="receive flexCol">
      <b>马上领取<span><i>598</i>元</span>思维大礼包</b>
      <div class="phone"><input type="text" v-model="phoneNum" placeholder="请输入手机号" maxLength="11"></div>
      <button @click="phoneFn">限时免费 立即体验</button>
    </div>
  </div>

</template>

<script>
import { savePhone } from '@/api'

export default {
  name: 'Poster',
  data() {
    return {
      openid: '',
      phoneNum: '',
    }
  },
  created() {
    const params = new URLSearchParams(window.location.search)
    this.openid = params.get('openid') || params.get('openId')
  },
  methods: {
    phoneFn() {
      if (!this.phoneNum) {
        this.$notify({ type: 'warning', message: '手机号不能为空' })
        return
      } else if (
        this.phoneNum.length != 11 ||
        !/^1[3456789]\d{9}$/.test(this.phoneNum)
      ) {
        this.$notify({ type: 'warning', message: '请输入正确的手机号' })
        return
      }
      savePhone({
        phone: this.phoneNum,
        openId: this.openid,
      }).then((res) => {
        if (res.status == '200') {
          this.$notify({ type: 'success', message: res.message })
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
  max-width: 750px;
  font-family: AlibabaPuHuiTiM;
  min-height: 14.89rem;
  margin: 0 auto;
  letter-spacing: 1px;
  color: #808080;
  background: #182fba url(~@/assets/poster/bg.jpg) no-repeat top center/100%
    auto;
  position: relative;
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
.container .receive {
  width: 6.9rem;
  height: 4.03rem;
  background: #fff;
  border-radius: 0.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 9.96rem;
  align-items: center;
}
.container .receive b {
  font-size: 0.44rem;
  color: #474747;
  font-weight: 400;
  margin-top: 0.5rem;
}
.container .receive b span {
  color: #ff619c;
}
.container .receive b span i {
  font-style: normal;
  font-size: 0.54rem;
}
.container .receive .phone {
  width: 6.28rem;
  height: 0.9rem;
  box-shadow: 0px 0.08rem 0.35rem 0px rgba(39, 34, 149, 0.1);
  border-radius: 0.12rem;
  margin-top: 0.25rem;
  position: relative;
}
.container .receive .phone input {
  border: 1px solid #ffcd54;
  outline: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 6.28rem;
  height: 0.9rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0.12rem;
  padding: 0 0.15rem 0 0.15rem;
}
button {
  width: 6.28rem;
  height: 0.9rem;
  background: #ff619c;
  box-shadow: 0px 0.08rem 0.35rem 0px rgba(39, 34, 149, 0.23);
  border-radius: 0.12rem;
  font-size: 0.34rem;
  font-family: AlibabaPuHuiTiB;
  font-weight: 400;
  color: #fff;
  margin-top: 0.4rem;
  border: none;
  outline: none;
}
input::-webkit-input-placeholder {
  color: #b3b3b3;
}
</style>
