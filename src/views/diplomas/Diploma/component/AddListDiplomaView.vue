<template>
  <div class="category">
    <h3 v-if="modifyCateId">Cập nhật danh mục tốt nghiệp</h3>
    <h3 v-else>Thêm dữ liệu học sinh tốt nghiệp</h3>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="Danh mục:" required prop="catalogId" >
        <el-select v-model="form.catalogId" placeholder="Danh mục">
          <el-option
            v-for="item in catalogs"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Năm tốt nghiệp:" prop="yearGraduation" required>
        <el-input-number v-model="form.yearGraduation" :min="2022" :max="2100">
        </el-input-number>
      </el-form-item>

      <el-form-item label="Người ký:" prop="signer" required>
        <el-input v-model="form.signer" type="text" style="width: 300px" clearable></el-input>
      </el-form-item>

      <el-form-item label="Chức danh người ký:" prop="signerTitle" required>
        <el-input v-model="form.signerTitle" type="text" style="width: 300px" clearable></el-input>
      </el-form-item>

      <el-form-item label="File excel dữ liệu học sinh tốt nghiệp">
         <input type="file" ref="file" @change="handlePreview" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
      </el-form-item>

      <el-form-item>
        <el-button>
          <a class="bg-purple" href="/Cunhan.xlsx" download="Cử nhân" target="_blank" rel="noreferrer">
            <i class="el-icon-download" style="margin-right: 5px;">
            </i>
            Template Cử nhân
          </a>
        </el-button>
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
  name: 'AddListDiplomaView',
  props: ['modifyCateId'],
  data() {
    return {
      form: {
        catalogId: null,
        signer: '',
        signerTitle: '',
        yearGraduation: new Date().getFullYear()
      },
      loading: false,
      catalogs: [],
      file: null
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
    this.initData()
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
    handlePreview(e) {
      const files = e.target.files || e.dataTransfer.files
      this.file = files[0]
    },
    submitForm(formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = new FormData()
          formData.append('file', this.file, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          formData.append('schoolSymbol', 'DDK')
          formData.append('graduationCatalogId', this.form.catalogId)
          formData.append('yearGraduation', this.form.yearGraduation)
          formData.append('signer', this.form.signer)
          formData.append('signerTitle', this.form.signerTitle)
          this.$api.DiplomagApi.addListDiplomas(formData)
            .then(res => {
              this.$message({
                message: 'Thêm danh sách học sinh thành công',
                type: 'success'
              })
              this.loading = false
              this.$router.go({ path: '/student-graduation' })
            })
            .catch(err => {
              this.loading = true
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    async initData() {
      const res = await this.$api.CatalogApi.getCatalogsList({})
      this.catalogs = res.data
      this.form.catalogId = this.catalogs[0].id
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
