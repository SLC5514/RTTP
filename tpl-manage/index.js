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
        brandName: '品牌名',
      },
      {
        tplId: 0,
        logoImg: [],
        titleImg: [defImg],
        infoText1: '送你288元',
        infoText2: '真人直播体验课',
        infoText3: '扫码识别 立即领取',
      },
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
      brandName: [
        { required: true, message: '请输入品牌名', trigger: 'blur' },
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
  }
}).$mount('#app')
