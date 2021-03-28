const baseURL = 'http://gl.huoyusaas.com';

// 默认背景图
const defImg = {
  name: '默认图片',
  path: '',
};

// api
const request = axios.create({
  baseURL
});
const errorHandler = function (error) {
  // error = get(error, 'response');
  // switch (error.status) {
  //   /* eslint-disable no-param-reassign */
  //   case 400: error.message = '请求错误'; break;
  //   case 401: error.message = '未授权，请登录'; break;
  //   case 403: error.message = '拒绝访问'; break;
  //   case 404: error.message = `请求地址出错: ${error.response.config.method.toUpperCase()} ${error.response.config.url}`; break;
  //   case 408: error.message = '请求超时'; break;
  //   case 500: error.message = '服务器内部错误'; break;
  //   case 501: error.message = '服务未实现'; break;
  //   case 502: error.message = '网关错误'; break;
  //   case 503: error.message = '服务不可用'; break;
  //   case 504: error.message = '网关超时'; break;
  //   case 505: error.message = 'HTTP版本不受支持'; break;
  //   default: break;
  //   /* eslint-disabled */
  // }
  return Promise.reject(error);
};
request.interceptors.request.use(
  config => config,
  errorHandler
);
request.interceptors.response.use(
  function (response) {
    const res = response.data;
    if (res.status != 200) {
      console.log(res.message || 'Error');
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  errorHandler
);

// 获取模板素材
const getMaterial = function (data) {
  return request({
    url: '/api/getMaterial',
    method: 'get',
    params: data
  });
};
// 保存模板素材
const saveMaterial = function (data) {
  return request({
    url: '/api/saveMaterial',
    method: 'post',
    data: data
  });
};

new Vue({
  data: {
    baseURL,
    params: new URLSearchParams(location.search),
    // 编辑页面位置
    pageCount: 1,
    // 模板下标
    tplIdx: 0,
    // 邀请语下标
    focusCopyIptIdx: 0,
    // 上传中字段
    uploadingKey: '',
    // 默认表单
    formData: {
      // 展示页
      show_info_text: '超过10000人通过海报邀请好友获得推荐奖励',
      show_btn_text: '我要推荐奖励',
      show_bg_color: '#4b42f3',
      show_bg_img: JSON.parse(JSON.stringify(defImg)),
      // 生成页
      render_info_text: '超过10000人通过海报邀请好友获得推荐奖励',
      render_btn_text: '复制邀请语 得奖几率翻倍！',
      render_bg_color: '#4b42f3',
      render_bg_img: JSON.parse(JSON.stringify(defImg)),
      // 海报页
      poster_list: [
        {
          id: 1,
          name: '默认模板',
          logo_img: JSON.parse(JSON.stringify(defImg)),
          title_img: JSON.parse(JSON.stringify(defImg)),
          info_text1: '送你288元',
          info_text2: '真人直播体验课',
          info_text3: '扫码识别 立即领取',
        }
      ],
      // 邀请页
      invite_bg_color: '#4b42f3',
      invite_bg_img: JSON.parse(JSON.stringify(defImg)),
      // 邀请语
      invite_info_text: [
        {
          value: '邀请语'
        }
      ],
      // 礼品
      gift_img: JSON.parse(JSON.stringify(defImg)),
      // 活动规则
      rule_text: '',
        // `1、“品牌名”注册用户(推荐人)分享专属个性化海报，每推荐一位新用户(被推荐人)，通过推荐人专属个性化海报注册为“品牌名”用户，并首次购买4单元及以上主修课课程包或15课段及以上全项进阶课课程包，且满足如下赠课条件之一的，推荐人即可获得赠课(根据被推荐人购买的课程包不同有所区别)，最多可获赠10课时/课段主修课/全项进阶课，奖励可以累计。\n` +
        // `(1)首次购买的课程包是主修课课程包的，当被推荐人被扣除的主修课课时超过8节(含缺席课时)且未退费；\n` +
        // `(2)首次购买的课程包是全项进阶课课程包的，当被推荐人被扣除的全项进阶课超过2课段(含缺席课时)且未退费；\n` +
        // `2、赠课将在满足奖励条件后30个工作日内添加到获赠用户的账户中。\n` +
        // `3、具体奖励规则可咨询您的学习成长伙伴，您也可前往公众号查看奖励明细。活动分期开展，如参与活动，则被推荐人按照活动要求购买课程包的时间须在活动期间内。推荐人因参与本活动而获得的赠课将在购买的全部主修课/全项进阶课使用完毕以后方能开始使用。不论推荐人在参与本活动获得赠课时是否为付费学员，推荐人获得的全部赠课均不得进行退费。\n` +
        // `4、获赠的课程仅限本账户使用，不可转赠其他用户，不得与其他优惠叠加使用。\n` +
        // `5、如推荐人或被推荐人参加的其他活动与本活动互斥的，以推荐人或被推荐人参加的其他活动的活动规则为准。推荐人和被推存人均不再享有本活动赠课奖励。\n` +
        // `6、本活动所有数据以“品牌名”系统数据为准。同“品牌名”账号，或账号不同但手机号、身份证相同，或账号不同但名下“品牌名”学员有交叉，符合以上任一条件均视为同一用户。\n` +
        // `7、如果发现有参与者使用任何不正当手段参加活动，包括但不限于以下情况，主办方有权在不事先通知的前提下取消其获奖资格。\n` +
        // `(1)任何有违本活动目的和宗旨；\n` +
        // `(2)不遵守本活动规则参与活动(如刷单,作弊,同一用户通过不同账号互相邀请)；\n` +
        // `(3)影响活动正常有序进行等(比如滥发短信、微信等骚扰行为,扰乱系统,批量或使用机器注册账号等不诚信行为)。\n` +
        // `8、用户所上传的文本、图片、音视频等内容由用户自行对该等内容承担责任。\n`,
    },
    // 验证规则
    rules: {
      show_info_text: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
        { max: 23, message: '长度不能大于 23 个字符', trigger: ['change', 'blur'] }
      ],
      show_btn_text: [
        { required: true, message: '请输入按钮文案', trigger: 'blur' },
        { max: 6, message: '长度不能大于 6 个字符', trigger: ['change', 'blur'] }
      ],
      render_info_text: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
        { max: 23, message: '长度不能大于 23 个字符', trigger: ['change', 'blur'] }
      ],
      render_btn_text: [
        { required: true, message: '请输入按钮文案', trigger: 'blur' },
        { max: 16, message: '长度不能大于 16 个字符', trigger: ['change', 'blur'] }
      ],
      gift_img: [
        { required: true, message: '请上传礼品图片', trigger: 'blur' },
      ],
    },
  },
  computed: {
    // 展示页背景
    contentBgStyle1() {
      return {
        'background-color': this.formData.show_bg_color,
        'background-image': `url(${this.formData.show_bg_img.path || './images/bg1.jpg'})`
      }
    },
    // 生成页背景
    contentBgStyle2() {
      return {
        'background-color': this.formData.render_bg_color,
        'background-image': `url(${this.formData.render_bg_img.path || './images/bg2.jpg'})`
      }
    },
    // 邀请页背景
    contentBgStyle3() {
      return {
        'background-color': this.formData.invite_bg_color,
        'background-image': `url(${this.formData.invite_bg_img.path || './images/bg3.jpg'})`
      }
    },
  },
  created() {
    getMaterial({
      code: "407364bcd69cf6b3a1b0c981a7380c",
      id: this.params.get('id'),
      type: this.params.get('type'),
      temId: this.params.get('temId'),
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  methods: {
    /* 表单操作 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          saveMaterial({
            code: "407364bcd69cf6b3a1b0c981a7380c",
            id: this.params.get('id'),
            type: this.params.get('type'),
            temId: this.params.get('temId'),
            jsonStr: JSON.stringify(this.formData),
          }).then(res => {
            this.$message.success('保存成功');
          }).catch(err => {
            console.log(err)
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 图片上传 */
    beforeUpload(file) {
      return this.verificationImg(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.status == 200) {
        this.$message.success(`${file.name} 上传成功`);
        const data = this.formatUploadKey(this.formData, this.uploadingKey);
        data.name = file.name;
        data.path = response.data;
      }
    },
    handleError(err, file, fileList) {
      this.$message.error(`${file.name} 上传失败`);
    },
    beforeRemove(file, fileList) {
      const data = this.formatUploadKey(this.formData, this.uploadingKey);
      if (!data.path) {
        this.$message.warning('默认图片不可移除');
        return false;
      }
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      this.formatUploadKey(this.formData, this.uploadingKey, JSON.parse(JSON.stringify(defImg)));
    },
    verificationImg(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/png'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
        return false;
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 5MB!');
        return false;
      }
      const isSize = new Promise(function (resolve, reject) {
        resolve(file);
      })
      // const isSize = new Promise(function (resolve, reject) {
      //   let width = 600;
      //   let height = 480;
      //   let _URL = window.URL || window.webkitURL;
      //   let image = new Image();
      //   image.onload = function () {
      //     let valid = image.width <= width && image.height <= height;
      //     valid ? resolve() : reject();
      //   };
      //   image.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     this.$message.error("图片尺寸不符合,只能是 600*480!");
      //     return Promise.reject();
      //   }
      // );
      return isImage && isLtSize && isSize;
    },
    formatUploadKey(data, keys, value) {
      const arr = keys.split('.');
      let res = data;
      let count = 0;
      if (value) count = 1;
      for (let i = 0; i < arr.length - count; i++) {
        res = res[arr[i]];
      }
      if (value) {
        res[arr[arr.length - 1]] = value;
      }
      return res;
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    // 添加删除邀请语
    changeCopyText(form, key, remIdx) {
      if (form[key].length >= 10) {
        this.$message.warning('最多10条');
        return;
      }
      if (remIdx !== undefined) {
        form[key].splice(remIdx, 1);
        this.focusCopyIptIdx--;
        if (this.focusCopyIptIdx < 0) this.focusCopyIptIdx = 0;
      } else {
        form[key].push({
          value: ''
        });
      }
    },
  }
}).$mount('#app')
