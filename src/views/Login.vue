<template>
    <div class="container">
    <div class="logo-box"><img
        src="/logo2.png"
        alt=""
      ></div>
    <div class="login-box">
      <div class="login-text">
        Đăn nhập
        <br>
        <span>Chào mừng đến với hệ thống quản lý VBCC</span>
      </div>
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
            placeholder="Vui lòng nhập username"
            @input="change($event)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
            placeholder="Vui lòng nhập password"
            @input="change($event)"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="handleLoginForm"
          >Đănh nhập</el-button>
          <el-button
            type="primary"
            @click="loginFormReset"
          >Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录表单数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的校验对象
      loginFormRules: {
        username: [
          { required: true, message: 'Username không được bỏ trống', trigger: 'blur' },
          { min: 6, max: 20, message: 'Độ dài Username phải ít nhất lớn hơn 5', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password không đươc bỏ trống', trigger: 'blur' },
          { min: 6, max: 30, message: 'Độ dài password phải lớn hơn 5', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    change(e) {
      this.$forceUpdate()
    },
    loginFormReset() {
      this.$refs.loginFormRef.resetFields()
    },
    handleLoginForm() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        try {
          const res = await this.$api.UserApi.login(this.loginForm)
          if (res.code === 400 || res.code === 401 || res.code === 403 || res.code === 404) {
            this.$message({
              message: res.message,
              type: 'error'
            })
          } else {
            this.$store.commit('user/save_login', res)
            this.$router.push('/main')
          }
        } catch (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: $loginImg;
  background-size: 100% 100%;
}
.logo-box {
  position: absolute;
  top: 30px;
  left: 30px;
  img {
    max-height: 50px !important;
  }
}
.login-box {
  position: absolute;
  top: 50%;
  left: 25%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login-text {
  width: 100%;
  font-size: 24px;
  text-align: center;
  color: #2f82fe;
  margin-bottom: 50px;
  box-sizing: border-box;
  padding: 20px;
}
.el-form-item {
  width: 90%;
  margin: 20px auto;
}
.login-text span {
  line-height: 30px;
  font-size: 18px;
  color: #666666;
}
.btns {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>
