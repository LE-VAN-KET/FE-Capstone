<template>
  <div class="category">
    <h3 v-if="modifyCateId">Cập nhật danh mục tốt nghiệp</h3>
    <h3 v-else>Thêm danh mục tốt nghiệp</h3>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="Tiêu đề:" required prop="title" >
        <el-input v-model="form.title" style="width: 300px" clearable></el-input>
      </el-form-item>

      <el-form-item label="Quyết định tốt nghiệp:" prop="decisionGraduation" required>
        <el-input v-model="form.decisionGraduation" type="textarea" style="width: 500px" clearable></el-input>
      </el-form-item>

      <el-form-item label="Năm tốt nghiệp:" prop="yearGraduation" required>
        <el-input-number v-model="form.yearGraduation" :min="2022" :max="2100">
        </el-input-number>
      </el-form-item>

      <el-form-item label="Nội dung:" prop="content">
        <el-input v-model="form.content" type="textarea" style="width: 500px" clearable></el-input>
      </el-form-item>

      <el-form-item label="ghi chú:" prop="note">
        <el-input v-model="form.note" type="textarea" style="width: 500px" clearable></el-input>
      </el-form-item>

      <!-- <el-form-item label="File quyết định tốt nghiệp" required>
        <el-upload
          :action="actionUrl"
          :headers="headers"
          list-type="picture-card"
          :file-list="fileArr"
          :limit="1"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">限制上传一张, 只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item> -->
      <!-- <el-form-item label="排序">
        <el-input-number v-model="form.sort_order" :min="1" :max="100" label="范围1-100">
        </el-input-number>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">
          <template v-if="modifyCateId">Cập nhật</template>
          <template v-else>Thêm mới</template>
        </el-button>
        <el-button type="success" plain @click="resetFrom('form')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
// import { commonSetting } from '@/utils/common'
import { mapActions } from 'vuex'

export default {
  name: 'CatalogView',
  props: ['modifyCateId'],
  data() {
    return {
      form: {
        title: '',
        decisionGraduation: '',
        yearGraduation: 0,
        content: '',
        note: '',
        loading: false
      }
    }
  },
  computed: {
    headers() {
      // 上传图片添加请求头header
      return {
        // token: getToken() // 从本地获取token就行
      }
    }
  },
  mounted() {
    this.editInit()
  },
  methods: {
    ...mapActions('catalog', ['get_all_catalogs']),
    handleAvatarSuccess(res, file) {
      // 处理上传图标
      if (res.code === 200) {
        this.form.icon_url = res.data.image
      } else {
        this.$message.error(`图片上传失败:${res.message}`)
      }
    },
    fetchCatalogs() {

    },
    submitForm(formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.modifyCateId) {
            this.loading = true
            this.$api.CatalogApi.updateCatalog(this.form, this.modifyCateId)
              .then(res => {
                this.$message({
                  message: 'Cập nhật danh mục thành công',
                  type: 'success'
                })
                this.loading = false
                this.$router.go({ path: '/catalog' })
              })
              .catch(err => {
                this.loading = true
                console.log(err)
              })
          } else {
            // 添加数据
            this.$api.CatalogApi.addCatalog(this.form)
              .then(rep => {
                this.$message({
                  message: 'Thêm danh mục thành công',
                  type: 'success'
                })
                // this.get_all_catalogs()
                this.$router.go({ path: '/catalog' })
              })
              .catch(err => {
                this.loading = true
                console.log(err)
              })
          }
        } else {
          return false
        }
      })
    },
    async editInit() {
      if (this.modifyCateId) {
        const res = await this.$api.CatalogApi.getCatalogsByID(this.modifyCateId)
        this.form = res
      }
    },
    resetFrom(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .category {
    margin-top: 10px;
  }

</style>
