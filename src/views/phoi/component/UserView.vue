<template>
<div class="category">
  <h3 v-if="modifyCateId">Cập nhật phôi</h3>
  <h3 v-else>Thêm phôi</h3>
  <el-form ref="form" :rules="rules" :model="form" label-width="150px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Tiêu đề:" prop="title">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Loại văn bằng:" required prop="diplomaTypeSymbol">
          <el-select v-model="form.diplomaTypeSymbol" placeholder="Loại văn bằng" style="width:400px">
            <el-option v-for="dipType in this.getDiplomaTypes" :key="dipType.symbol" :label="dipType.name" :value="dipType.symbol">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Đơn vị nhận:" required prop="donviSymbol">
          <el-select v-model="form.donviSymbol" placeholder="Đơn vị nhận" style="width:350px">
            <el-option v-for="dv in this.donvis" :key="dv.symbol" :label="dv.name" :value="dv.symbol">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Loại phôi:" required prop="loaiPhoi">
          <el-select v-model="form.loaiPhoi" placeholder="Loại phôi">
            <el-option v-for="item in this.loaiphois" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Số lượng:" required prop="soluong">
          <el-input-number v-model="form.soluong" :min="1" :max="500" clearable></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Ngày mua:" required prop="ngayMua">
          <el-date-picker type="date" placeholder="Ngày mua" v-model="form.ngayMua" style="width: 300px"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Ngày nhập kho:" required prop="ngayNhapKho">
          <el-date-picker type="date" placeholder="Ngày nhập kho" v-model="form.ngayNhapKho" style="width: 300px"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Ghi chú:" prop="note">
          <el-input type="textarea" v-model="form.note" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>

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
import {
  // mapActions,
  mapGetters
} from 'vuex'
// import { getToken } from '@/utils/auth'
// import { commonSetting } from '@/utils/common'

export default {
  name: 'UserView',
  props: {
    modifyCateId: {
      type: Number,
      default: null
    },
    detailPhoi: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        donviSymbol: 'DDK',
        diplomaTypeSymbol: '6',
        loaiPhoi: 'BANCHINH',
        ngayMua: '',
        soluong: 1,
        ngayNhapKho: '',
        note: null
      },
      donvis: [{
        symbol: 'DDK',
        name: 'Trường Đại học Bách khoa'
      },
      {
        symbol: 'DDQ',
        name: 'Trường Đại học Kinh tế'
      },
      {
        symbol: 'DDS',
        name: 'Trường Đại học Sư phạm'
      },
      {
        symbol: 'DDF',
        name: 'Trường Đại học Ngoại ngữ'
      },
      {
        symbol: 'VKU',
        name: 'Trường Đại học CNTT và Truyền thông Việt - Hàn'
      },
      {
        symbol: 'DSK',
        name: 'Trường Đại học Sư phạm Kỹ thuật'
      },
      {
        symbol: 'DDP',
        name: 'Phân hiệu ĐHĐN tại Kon Tum'
      },
      {
        symbol: 'DDV',
        name: 'Viện Nghiên cứu và Đào tạo Việt  - Anh'
      },
      {
        symbol: 'DDY',
        name: 'Khoa Y Dược'
      }
      ],
      loaiphois: [
        { label: 'Bản chính', value: 'BANCHINH' },
        { label: 'Bản sao', value: 'BANSAO' }
      ],
      rules: {
        title: [{
          required: true,
          message: 'Tiêu đề không được bỏ trống',
          trigger: 'blur'
        }],
        donviSymbol: [{
          required: true,
          message: 'Đơn vị không được bỏ trống',
          trigger: 'blur'
        }],
        diplomaTypeSymbol: [{
          required: true,
          message: 'Loại văn bằng không được bỏ trống',
          trigger: 'blur'
        }],
        loaiPhoi: [{
          required: true,
          message: 'Loại phôi không được bỏ trống',
          trigger: 'blur'
        }],
        soluong: [{
          required: true,
          message: 'Số lượng không được bỏ trống',
          trigger: 'blur'
        }],
        ngayMua: [{
          required: true,
          message: 'Ngày mua không được bỏ trống',
          trigger: 'blur'
        }],
        ngayNhapKho: [{
          required: true,
          message: 'Ngày nhập kho không được bỏ trống',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters('diploma', ['getDiplomaTypes']),
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
    submitForm(formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.modifyCateId) {
            this.$api.PhoiApi.updatePhoi(this.modifyCateId, this.form).then(res => {
              this.$message({
                message: res,
                type: 'success'
              })
            })
              .catch(err => {
                this.$message({
                  message: err,
                  type: 'error'
                })
              })
          } else {
            this.$api.PhoiApi.addPhoi(this.form).then((res) => {
              this.$message({
                message: res,
                type: 'success'
              })
            })
              .catch(err => {
                this.$message({
                  message: err,
                  type: 'error'
                })
              })
          }
        } else {
          return false
        }
      })
    },
    editInit() {
      if (this.modifyCateId) {
        console.log(this.detailPhoi)
        this.form = { ...this.form, ...this.detailPhoi }
        this.form.donviSymbol = this.donvis.find(item => item.name.trim() === this.form.donvi.trim()).symbol
        this.form.diplomaTypeSymbol = this.getDiplomaTypes.find(item => item.name.trim() === this.form.diplomaType.trim()).symbol
        this.form.soluong = this.form.amountIssuedNewPrint
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
