<template>
  <div class="category">
    <h3 v-if="modifyCateId">Cập nhật văn bằng</h3>
    <h3 v-else>Thêm học sinh tốt nghiệp</h3>
    <el-form ref="form" :model="form" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Mã học viên:" required prop="studentId" >
            <el-input v-if="form.serialNumber == null" v-model="form.studentId" style="width: 180px" clearable></el-input>
            <el-input v-else v-model="form.studentId" style="width: 180px" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Họ và tên:" required prop="fullName" >
            <el-input v-if="form.serialNumber == null" v-model="form.fullName" style="width: 200px" clearable></el-input>
            <el-input v-else v-model="form.fullName" style="width: 200px" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Ngày sinh:" required prop="dateOfBirth" >
            <el-date-picker v-if="form.serialNumber == null" type="date" placeholder="Ngày sinh" v-model="form.dateOfBirth" style="width: 150px"></el-date-picker>
            <el-date-picker  v-else type="date" placeholder="Ngày sinh" v-model="form.dateOfBirth" style="width: 150px" disabled></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Nơi sinh:" required prop="placeOfOrigin" >
            <el-input v-if="form.serialNumber == null" v-model="form.placeOfOrigin" style="width: 180px" clearable></el-input>
            <el-input v-else v-model="form.placeOfOrigin" style="width: 180px" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Giới tính:" required prop="sex" >
            <el-select v-model="form.sex" placeholder="Select" v-if="form.serialNumber == null">
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.sex" placeholder="Select" v-else disabled>
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Khóa học:" required prop="trainingCourse" >
            <el-input  v-if="form.serialNumber == null" v-model="form.trainingCourse" style="width: 150px" clearable></el-input>
            <el-input  v-else v-model="form.trainingCourse" style="width: 150px" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Dân tộc:" required prop="indigenousId" >
            <el-select v-model="form.indigenousId" placeholder="Select" v-if="form.serialNumber == null">
              <el-option
                v-for="item in this.getIndigenous"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="form.indigenousId" placeholder="Select" v-else disabled>
              <el-option
                v-for="item in this.getIndigenous"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Quốc tịch:" required prop="nationalityId" >
            <el-select v-model="form.nationalityId" placeholder="Select" v-if="form.serialNumber == null">
              <el-option
                v-for="item in this.getNationality"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="form.nationalityId" placeholder="Select" v-else disabled>
              <el-option
                v-for="item in this.getNationality"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Xếp loại:" required prop="rankingId" >
            <el-select v-model="form.rankingId" placeholder="Select" v-if="form.serialNumber == null">
              <el-option
                v-for="item in this.getRankings"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="form.rankingId" placeholder="Select" v-else disabled>
              <el-option
                v-for="item in this.getRankings"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Năm tốt nghiệp:" required prop="yearGraduation" >
            <el-input-number v-if="form.serialNumber == null" v-model="form.yearGraduation" :min="2022" :max="2100" clearable></el-input-number>
            <el-input-number v-else disabled v-model="form.yearGraduation" :min="2022" :max="2100" clearable></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Hình thức đào tạo:" required prop="modeOfStudy" >
            <el-select v-model="form.modeOfStudy" placeholder="Mode Study"  v-if="form.serialNumber == null">
              <el-option
                v-for="item in modeStudies"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <el-select v-model="form.modeOfStudy" placeholder="Mode Study"  v-else disabled>
              <el-option
                v-for="item in modeStudies"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Đơn vị:" required prop="donvi" >
            <el-input v-if="form.serialNumber == null" v-model="form.donvi" style="width: 200px"></el-input>
            <el-input v-else disabled v-model="form.donvi" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Số hiệu văn bằng:" prop="serialNumber" >
            <el-input v-if="form.serialNumber == null || form.serialNumber == undefined" v-model="form.serialNumber" clearable></el-input>
            <el-input v-else v-model="form.serialNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Số vào sổ:" required prop="referenceNumber" >
            <el-input v-if="form.serialNumber == null" v-model="form.referenceNumber" style="width: 200px" clearable></el-input>
            <el-input v-else disabled v-model="form.referenceNumber" style="width: 200px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Người ký:" required prop="signer" >
            <el-input v-if="form.serialNumber == null" v-model="form.signer" style="width: 150px" clearable></el-input>
            <el-input v-else disabled v-model="form.signer" style="width: 150px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Chức danh người ký:" prop="signerTitle" >
            <el-input v-if="form.serialNumber == null" v-model="form.signerTitle" clearable></el-input>
            <el-input v-else disabled v-model="form.signerTitle" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Loại yêu cầu:" required prop="reqTypeId" >
             <el-select v-model="form.reqTypeId" placeholder="Select"  v-if="form.serialNumber == null">
              <el-option
                v-for="item in this.getReqTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="form.reqTypeId" placeholder="Select"   v-else disabled>
              <el-option
                v-for="item in this.getReqTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Loại văn bằng:" required prop="diplomaTypeSymbol" >
            <el-select v-model="form.diplomaTypeSymbol" placeholder="Select" v-if="form.serialNumber == null">
              <el-option
                v-for="item in this.getDiplomaTypes"
                :key="item.diplomaTypeSymbol"
                :label="item.name"
                :value="item.symbol">
              </el-option>
            </el-select>
             <el-select v-model="form.diplomaTypeSymbol" placeholder="Select" v-else disabled>
              <el-option
                v-for="item in this.getDiplomaTypes"
                :key="item.diplomaTypeSymbol"
                :label="item.name"
                :value="item.symbol">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Tổng số tín chỉ:" prop="totalCredits" >
            <el-input v-if="form.serialNumber == null" v-model="form.totalCredits" clearable></el-input>
            <el-input v-else disabled v-model="form.totalCredits" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Quyết định số:" prop="decisionNumber" >
            <el-input v-if="form.serialNumber == null" v-model="form.decisionNumber" style="width: 200px" clearable></el-input>
            <el-input v-else disabled v-model="form.decisionNumber" style="width: 200px" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Quyết định thành lập hội đồng:" prop="decisionEstablishingCouncil" >
            <el-input  v-if="form.serialNumber == null" v-model="form.decisionEstablishingCouncil" style="width: 150px" clearable></el-input>
            <el-input  v-else disabled v-model="form.decisionEstablishingCouncil" style="width: 150px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Ngày nhập học:" prop="dateOfEnrollment" >
            <el-date-picker v-if="form.serialNumber == null" type="date" placeholder="Ngày nhập học" v-model="form.dateOfEnrollment" style="width: 200px"></el-date-picker>
            <el-date-picker v-else disabled type="date" placeholder="Ngày nhập học" v-model="form.dateOfEnrollment" style="width: 200px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Ngày tốt nghiệp:" prop="dateOfGraduation" >
            <el-date-picker v-if="form.serialNumber == null" type="date" placeholder="Ngày tốt nghiệp" v-model="form.dateOfGraduation" style="width: 200px"></el-date-picker>
            <el-date-picker v-else disabled type="date" placeholder="Ngày tốt nghiệp" v-model="form.dateOfGraduation" style="width: 200px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Ngoại ngữ:" prop="foreignLanguage" >
            <el-input v-if="form.serialNumber == null" v-model="form.foreignLanguage" style="width: 150px" clearable></el-input>
            <el-input v-else disabled v-model="form.foreignLanguage" style="width: 150px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Cấp bậc ngoại ngữ:" prop="levelForeignLanguage" >
            <el-input v-if="form.serialNumber == null" v-model="form.levelForeignLanguage" clearable></el-input>
            <el-input v-else disabled v-model="form.levelForeignLanguage" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Ngày bảo vệ:" prop="dateOfDefend" >
            <el-date-picker v-if="form.serialNumber == null" type="date" placeholder="Ngày bảo vệ" v-model="form.dateOfDefend" style="width: 200px"></el-date-picker>
            <el-date-picker v-else disabled type="date" placeholder="Ngày bảo vệ" v-model="form.dateOfDefend" style="width: 200px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Hội đồng thi:" prop="hoiDongThi" >
            <el-input v-if="form.serialNumber == null" v-model="form.hoiDongThi" style="width: 150px" clearable></el-input>
            <el-input v-else disabled v-model="form.hoiDongThi" style="width: 150px" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="GPA tích lũy:" prop="gpa" >
            <el-input v-if="form.serialNumber == null" v-model="form.gpa" clearable></el-input>
            <el-input v-else disabled v-model="form.gpa" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Ngày tạo:" prop="createdDate" >
            <el-tag type="success"><span>{{ moment.unix(form.createdDate).format('DD-MM-YYYY') }}</span></el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Ngày cập nhật:" prop="lastModifiedDate" >
            <el-tag type="success"><span>{{ moment.unix(form.lastModifiedDate).format('DD-MM-YYYY') }}</span></el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="Trạng thái:" prop="status" >
            <el-select v-model="form.status" placeholder="Select" disabled>
                <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="Năm tốt nghiệp:" prop="yearGraduation" >
            <el-input-number v-if="form.serialNumber == null" v-model="form.yearGraduation" :min="2022" :max="2100" clearable></el-input-number>
            <el-input-number v-else disabled v-model="form.yearGraduation" :min="2022" :max="2100" clearable></el-input-number>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="Ghi chú:" prop="note" >
            <el-input v-if="form.serialNumber == null" type="textarea" v-model="form.note" clearable></el-input>
            <el-input v-else disabled type="textarea" v-model="form.note" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <h3>File văn bằng</h3>
      <VuePdfEmbed v-if="this.diploma.diplomaLink" :source="diplomaLink" width="600" :scale="scalePdf" :page="pagePdf" height="400"></VuePdfEmbed>

      <el-form-item label="File scan văn bằng" required>
        <el-upload
          class="upload-demo"
          :action="apiUploadFile"
          list-type="picture"
          name="file"
          accept="application/pdf"
          :file-list="files"
          :limit="1"
          :on-preview="handlePreview"
          :on-success="handleAvatarSuccess"
        >
          <el-button size="small" type="success" class="bg-purple">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png/pdf files with a size less than 1000kb</div>
        </el-upload>
      </el-form-item>

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
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CatalogView',
  props: ['modifyCateId', 'diploma'],
  components: {
    VuePdfEmbed
  },
  data() {
    return {
      form: {
        indigenousId: '',
        nationalityId: '',
        rankingId: '',
        reqTypeId: ''
      },
      sexs: [{
        value: 'MALE',
        label: 'Nam'
      }, {
        value: 'FERMALE',
        label: 'Nữ'
      }],
      modeStudies: [{
        value: 'CHINH_QUY',
        label: 'Chính Quy'
      }, {
        value: 'TAI_CHUC',
        label: 'Tại Chức'
      }],
      statusList: [{
        label: 'Đang xử lý',
        value: 'PENDING'
      }, {
        label: 'Từ chối',
        value: 'REJECTED'
      }, {
        label: 'Đã hỏng',
        value: 'DAHONG'
      }, {
        label: 'Đã duyệt',
        value: 'VERIFIED'
      }, {
        label: 'Đã nhận',
        value: 'DANHAN'
      }],
      loading: false,
      files: [],
      apiUploadFile: 'http://34.143.181.194:8000/api/v1/diploma/upload-file',
      // headers: { Content-Type : 'multipart/form-data' }
      file: null,
      diplomaLink: '',
      scalePdf: 2,
      pagePdf: 2
    }
  },
  computed: {
    ...mapGetters('diploma', ['getIndigenous', 'getNationality', 'getRankings', 'getReqTypes', 'getDiplomaTypes']),
    headers() {
      return {
        // token: getToken() // 从本地获取token就行
      }
    }
  },
  mounted() {
    this.editInit()
    this.form = { ...this.form, ...this.diploma }
    const indigenous = [...this.getIndigenous]
    const nationality = [...this.getNationality]
    const reqTypes = [...this.getReqTypes]
    const rankings = [...this.getRankings]
    const diplomaTypes = [...this.getDiplomaTypes]
    this.form.indigenousId = indigenous.find(item => item.name.trim() === this.form.indigenous.trim()).id
    this.form.nationalityId = nationality.find(item => item.name.trim() === this.form.nationality.trim()).id
    this.form.reqTypeId = reqTypes.find(item => item.name.trim() === this.form.reqType.trim()).id
    this.form.rankingId = rankings.find(item => item.name.trim() === this.form.ranking.trim()).id
    this.form.diplomaTypeSymbol = diplomaTypes.find(item => item.name.trim() === this.form.diplomaType.trim()).symbol
    if (this.diploma.diplomaLink) {
      this.diplomaLink = `http://34.143.181.194:8000/api/v1/diploma/file/${this.diploma.diplomaLink}`
    }
    console.log(this.diploma)
  },
  methods: {
    ...mapActions('catalog', ['get_all_catalogs']),
    handleAvatarSuccess(res, file) {
      // file.url = res
      this.file = file.raw
      // if (res.code === 200) {
      //   this.form.icon_url = res.data.image
      // } else {
      //   // this.$message.error(`图片上传失败:${res.message}`)
      // }
    },
    handlePreview(file) {
      // this.file = file
    },
    handlePasswordRequest(e) {
      console.log(e)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.modifyCateId) {
            this.loading = true
            const formData = new FormData()
            formData.append('diploma', new Blob([JSON.stringify(this.form)], {
              type: 'application/json'
            }))
            if (this.file) {
              formData.append('file', this.file, {
                type: 'application/pdf, image/*'
              })
            }

            this.$api.DiplomagApi.updateDiploma(formData, this.modifyCateId)
              .then(res => {
                this.$message({
                  message: 'Cập nhật văn bằng thành công',
                  type: 'success'
                })
                this.loading = false
                this.$router.go({ path: '//student-graduation' })
              })
              .catch(err => {
                this.loading = true
                console.log(err)
              })
          } else {
            // 添加数据
            // this.$api.CatalogApi.addCatalog(this.form)
            //   .then(rep => {
            //     this.$message({
            //       message: 'Thêm danh mục thành công',
            //       type: 'success'
            //     })
            //     // this.get_all_catalogs()
            //     this.$router.go({ path: '/catalog' })
            //   })
            //   .catch(err => {
            //     this.loading = true
            //     console.log(err)
            //   })
          }
        } else {
          return false
        }
      }
      )
    },
    async editInit() {
      if (this.modifyCateId) {
        // const res = await this.$api.CatalogApi.getCatalogsByID(this.modifyCateId)
        // this.form = res
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
