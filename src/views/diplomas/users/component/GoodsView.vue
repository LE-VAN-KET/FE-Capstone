<template>
<div v-loading="loading">
  <h3 v-if="modifyGoodsId">Cập nhật người dùng</h3>
  <h3 v-else>Thêm người dùng</h3>
  <el-form ref="form" :rules="rules" :model="form" label-width="200px">
    <el-form-item label="Mã người dùng:" required prop="id">
      <el-input v-model="form.id" style="width: 300px" clearable></el-input>
    </el-form-item>
    <el-form-item label="Họ và tên:" required prop="fullName">
      <el-input v-model="form.fullName" style="width: 300px" clearable></el-input>
    </el-form-item>
    <el-form-item label="Username:" required prop="username">
      <el-input v-model="form.username" style="width: 300px" clearable></el-input>
    </el-form-item>
    <el-form-item label="Email:" required prop="email">
      <el-input v-model="form.email" style="width: 300px" clearable></el-input>
    </el-form-item>
    <el-form-item label="Password:" required prop="initPassword">
      <el-input type="password" v-model="form.initPassword" style="width: 300px" clearable></el-input>
    </el-form-item>

    <el-form-item label="Role:" required prop="authorityId">
      <el-select v-model="form.authorityId" placeholder="Role người dùng">
        <el-option v-for="item in this.authorities" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">
        <template v-if="modifyGoodsId">Cập nhật</template>
        <template v-else>Thêm mới</template>
      </el-button>
      <el-button type="success" plain @click="resetFrom('form')">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'GoodsView',
  props: {
    modifyGoodsId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        id: '',
        username: '',
        email: '',
        initPassword: '',
        authorityId: 1,
        fullName: ''
      },
      rules: {
        // goodsName: [
        //   { required: true, message: '请输入分类名称', trigger: 'blur' },
        //   { min: 1, max: 5, message: '长度限制1到5个字符', trigger: 'blur' }
        // ],
        // address: [
        //   { min: 1, max: 30, message: '长度限制1到30个字符', trigger: 'blur' }
        // ],
        // email: [
        //   { min: 1, max: 15, message: '长度限制1到15个字符', trigger: 'blur' }
        // ]
      },
      loading: false,
      authorities: [{
        id: 1,
        name: 'Super Admin'
      },
      {
        id: 2,
        name: 'Administrator University'
      },
      {
        id: 3,
        name: 'Administrator BGD/DT'
      },
      {
        id: 4,
        name: 'Student'
      }
      ]
    }
  },
  mounted() {
    this.editInit()
  },
  methods: {
    editInit() {
      console.log(this.modifyGoodsId)
      // 修改初始化
      if (this.modifyGoodsId) {
        this.loading = true
        this.$api.GoodsApi.getGoodsByID(this.modifyGoodsId)
          .then(rep => {
            this.form = rep.data.goods
            this.loading = false
          }).catch(err => {
            this.loading = true
            console.log(err)
          })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.modifyGoodsId) {
            this.$api.UserApi.addUser(this.form)
              .then(rep => {
                this.$message({
                  message: 'Thêm user thành công.',
                  type: 'success'
                })
                this.$router.go({
                  path: '/users'
                })
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      })
    },

    resetFrom(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="">

</style>
