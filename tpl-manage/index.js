// 默认背景图
const defImg = {
  name: '默认图片',
  isDefImg: true
};

new Vue({
  data: {
    // 编辑页面位置
    pageCount: 0,
    // 默认表单
    formList: [
      {
        // perpleNum: 10000,
        infoText: '超过10000人通过海报邀请好友获得推荐奖励',
        recommendBtnText: '我要推荐奖励',
        bgColor: '#4b42f3',
        bgImg: [defImg]
      },
      {
        // perpleNum: 10000,
        infoText: '超过10000人通过海报邀请好友获得推荐奖励',
        copyBtnText: '复制邀请语 得奖几率翻倍！',
        bgColor: '#4b42f3',
        bgImg: [defImg]
      },
      {
        giftImg: []
      },
      {
        ruleText:
          `1、“品牌名”注册用户(推荐人)分享专属个性化海报，每推荐一位新用户(被推荐人)，通过推荐人专属个性化海报注册为“品牌名”用户，并首次购买4单元及以上主修课课程包或15课段及以上全项进阶课课程包，且满足如下赠课条件之一的，推荐人即可获得赠课(根据被推荐人购买的课程包不同有所区别)，最多可获赠10课时/课段主修课/全项进阶课，奖励可以累计。\n`+
          `(1)首次购买的课程包是主修课课程包的，当被推荐人被扣除的主修课课时超过8节(含缺席课时)且未退费；\n`+
          `(2)首次购买的课程包是全项进阶课课程包的，当被推荐人被扣除的全项进阶课超过2课段(含缺席课时)且未退费；\n`+
          `2、赠课将在满足奖励条件后30个工作日内添加到获赠用户的账户中。\n`+
          `3、具体奖励规则可咨询您的学习成长伙伴，您也可前往公众号查看奖励明细。活动分期开展，如参与活动，则被推荐人按照活动要求购买课程包的时间须在活动期间内。推荐人因参与本活动而获得的赠课将在购买的全部主修课/全项进阶课使用完毕以后方能开始使用。不论推荐人在参与本活动获得赠课时是否为付费学员，推荐人获得的全部赠课均不得进行退费。\n`+
          `4、获赠的课程仅限本账户使用，不可转赠其他用户，不得与其他优惠叠加使用。\n`+
          `5、如推荐人或被推荐人参加的其他活动与本活动互斥的，以推荐人或被推荐人参加的其他活动的活动规则为准。推荐人和被推存人均不再享有本活动赠课奖励。\n`+
          `6、本活动所有数据以“品牌名”系统数据为准。同“品牌名”账号，或账号不同但手机号、身份证相同，或账号不同但名下“品牌名”学员有交叉，符合以上任一条件均视为同一用户。\n`+
          `7、如果发现有参与者使用任何不正当手段参加活动，包括但不限于以下情况，主办方有权在不事先通知的前提下取消其获奖资格。\n`+
          `(1)任何有违本活动目的和宗旨；\n`+
          `(2)不遵守本活动规则参与活动(如刷单,作弊,同一用户通过不同账号互相邀请)；\n`+
          `(3)影响活动正常有序进行等(比如滥发短信、微信等骚扰行为,扰乱系统,批量或使用机器注册账号等不诚信行为)。\n`+
          `8、用户所上传的文本、图片、音视频等内容由用户自行对该等内容承担责任。\n`
      },
      {
        tplId: 0,
        logoImg: [],
        titleImg: [defImg],
        infoText1: '送你288元',
        infoText2: '真人直播体验课',
        infoText3: '扫码识别 立即领取',
      },
      {
        copytext: [
          {
            value: '邀请语'
          }
        ]
      }
    ],
    imgKeyValue: {
      0: 'bgImg',
      1: 'bgImg',
      2: 'giftImg',
      4: 'titleImg',
    },
    imgKeyValue2: {
      4: 'logoImg',
    },
    // 验证规则
    rules: {
      // perpleNum: [
      //   { required: true, message: '请输入人数', trigger: 'blur' },
      //   { type: 'number', message: '必须为数字', trigger: 'change' }
      // ],
      infoText: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
        { max: 23, message: '长度不能大于 236 个字符', trigger: 'change' }
      ],
      recommendBtnText: [
        { required: true, message: '请输入按钮文案', trigger: 'blur' },
        { max: 6, message: '长度不能大于 6 个字符', trigger: 'change' }
      ],
      copyBtnText: [
        { required: true, message: '请输入按钮文案', trigger: 'blur' },
        { max: 16, message: '长度不能大于 16 个字符', trigger: 'change' }
      ],
      giftImg: [
        { required: true, message: '请上传礼品图片', trigger: 'blur' },
      ],
      ruleText: [
        { required: true, message: '请输入规则', trigger: 'blur' },
      ],
      tplId: [
        { required: true, message: '请选择模板', trigger: 'blur' },
      ],
      logoImg: [
        { required: true, message: '请上传LOGO图片', trigger: 'blur' },
      ],
      titleImg: [
        { required: true, message: '请上传标题图片', trigger: 'blur' },
      ],
      infoText1: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
      ],
      infoText2: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
      ],
      infoText3: [
        { required: true, message: '请输入描述文案', trigger: 'blur' },
      ],
    },
  },
  computed: {
    // 背景样式
    contentBgStyle1() {
      if (this.formList[0].bgImg[0] && this.formList[0].bgImg[0].isDefImg) {
        return {
          'background-color': this.formList[0].bgColor
        }
      } else if (!(this.formList[0].bgImg[0] && this.formList[0].bgImg[0].base64)) {
        return {
          'background-color': this.formList[0].bgColor,
          'background-image': 'none'
        }
      }
      return {
        'background-color': this.formList[0].bgColor,
        'background-image': `url(${this.formList[0].bgImg[0].base64})`
      }
    },
    contentBgStyle2() {
      if (this.formList[1].bgImg[0] && this.formList[1].bgImg[0].isDefImg) {
        return {
          'background-color': this.formList[1].bgColor
        }
      } else if (!(this.formList[1].bgImg[0] && this.formList[1].bgImg[0].base64)) {
        return {
          'background-color': this.formList[1].bgColor,
          'background-image': 'none'
        }
      }
      return {
        'background-color': this.formList[1].bgColor,
        'background-image': `url(${this.formList[1].bgImg[0].base64})`
      }
    },
  },
  methods: {
    /* 表单操作 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formList[this.pageCount]);
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
    handleChange(file, fileList) {
      this.formList[this.pageCount][this.imgKeyValue[this.pageCount]] = fileList.slice(-1);
      this.verificationImg(file.raw).then(() => {
        this.getBase64(file.raw).then(res => {
          this.$set(this.formList[this.pageCount][this.imgKeyValue[this.pageCount]][0], 'base64', res);
        });
      }).catch(() => {
        this.$nextTick(() => {
          this.formList[this.pageCount][this.imgKeyValue[this.pageCount]].splice(-1);
          this.formList[this.pageCount][this.imgKeyValue[this.pageCount]].push(defImg);
        })
      })
    },
    handleError(err, file, fileList) {
      this.$message.error(`${file.name} 上传失败`);
      this.$nextTick(() => {
        this.formList[this.pageCount][this.imgKeyValue[this.pageCount]].push(defImg);
      })
    },
    handleSuccess(response, file, fileList) {
      this.$message.success(`${file.name} 上传成功`);
    },
    handleRemove(file, fileList) {
      this.formList[this.pageCount][this.imgKeyValue[this.pageCount]] = fileList.slice(-1);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      return this.verificationImg(file.raw);
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
    verificationImg(file) {
      let types = ['image/jpeg', 'image/png'];
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
    // 备用
    handleChange2(file, fileList) {
      this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]] = fileList.slice(-1);
      this.verificationImg(file.raw).then(() => {
        this.getBase64(file.raw).then(res => {
          this.$set(this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]][0], 'base64', res);
        });
      }).catch(() => {
        this.$nextTick(() => {
          this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]].splice(-1);
          this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]].push(defImg);
        })
      })
    },
    handleError2(err, file, fileList) {
      this.$message.error(`${file.name} 上传失败`);
      this.$nextTick(() => {
        this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]].push(defImg);
      })
    },
    handleSuccess2(response, file, fileList) {
      this.$message.success(`${file.name} 上传成功`);
    },
    handleRemove2(file, fileList) {
      this.formList[this.pageCount][this.imgKeyValue2[this.pageCount]] = fileList.slice(-1);
    },
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload2(file) {
      return this.verificationImg(file.raw);
    },
    // 新增
    changeCopyText(form, key, remIdx) {
      if (form[key].length >= 10) {
        this.$message.warning('最多10条');
        return;
      }
      if (remIdx !== undefined) {
        form[key].splice(remIdx, 1);
      } else {
        form[key].push({
          value: ''
        });
      }
    }
  }
}).$mount('#app')
