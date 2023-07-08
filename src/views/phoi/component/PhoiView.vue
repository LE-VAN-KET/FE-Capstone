<template>
<div class="category">
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple"><h3 >Chi tiết phôi</h3></div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light"><el-button type="danger" plain icon="el-icon-refresh-right" @click="revokephoi">Thu hồi phôi</el-button></div></el-col>
  </el-row>
  <el-form ref="form" :model="form" label-width="250px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Tiêu đề:" prop="title">
          <el-input v-model="form.title" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Loại văn bằng:" prop="diplomaType">
          <el-input v-model="form.diplomaType" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Đơn vị nhận:" prop="title">
          <el-input v-model="form.donvi" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Loại phôi:" prop="loaiPhoi" disabled>
          <el-input v-model="form.loaiPhoi" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Số hiệu bắt đầu:" prop="serialNumberBegin">
          <el-input v-model="form.serialNumberBegin" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Số lượng phôi bằng tồn cũ:" prop="amountOldStock" disabled>
          <el-input-number v-model="form.amountOldStock" disabled></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Số hiệu kết thúc:" prop="serialNumberEnd">
          <el-input v-model="form.serialNumberEnd" disabled style="width:350px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Số lượng phôi bằng được cấp/in mới:" prop="amountIssuedNewPrint" disabled >
          <el-input-number v-model="form.amountIssuedNewPrint" disabled ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Số lượng bằng đã cấp cho người học:" prop="amountIssuedStudent">
          <el-input-number v-model="form.amountIssuedStudent" disabled></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Số lượng bằng in hỏng:" prop="amountBroken" disabled>
          <el-input-number v-model="form.amountBroken" disabled></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Số lượng phôi bằng chưa sử dụng:" prop="amountUnused">
          <el-input-number v-model="form.amountUnused" disabled></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Ngày mua:" required prop="ngayMua">
          <el-date-picker type="date" placeholder="Ngày mua" v-model="form.ngayMua" style="width: 300px" disabled></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Ngày nhập kho:" required prop="ngayNhapKho" >
          <el-date-picker type="date" placeholder="Ngày nhập kho" v-model="form.ngayNhapKho" style="width: 300px" disabled></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Ghi chú:" prop="note" >
          <el-input type="textarea" v-model="form.note" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
// import { getToken } from '@/utils/auth'
// import { commonSetting } from '@/utils/common'

export default {
  name: 'PhoiView',
  props: {
    phoi: {
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
    this.form = this.phoi
    this.form.bachoc = this.form.bachoc === 'CAODANG' ? 'Cao đẳng' : 'Đại học'
    this.form.loaiPhoi = this.form.loaiPhoi === 'BANCHINH' ? 'Bản chính' : 'Bản sao'
  },
  methods: {
    async revokephoi() {
      try {
        const res = await this.$api.PhoiApi.revokePhoi(this.form.id)
        this.$message({
          message: res,
          type: 'success'
        })
        this.$router.go({ path: '/phoi' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  margin-top: 10px;
}
</style>
