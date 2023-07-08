<template>
<transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <header class="modal-header" id="modalTitle">
        <slot name="header">
          <span>Quay lại</span>
        </slot>
        <el-button type="primary" icon="el-icon-close" circle class="btn-close" @click="close" aria-label="Close modal"></el-button>
        <!-- <button type="button" class="btn-close" @click="close" aria-label="Close modal">
          x
        </button> -->
      </header>

      <section class="modal-body" id="modalDescription">
        <slot name="body">
          <el-form ref="diploma" :model="diploma" label-width="170px">
            <p class="title-section">Thông tin cá nhân</p>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Mã sinh viên:"  prop="studentId">
                  <span class="text-bold">{{ diploma.studentId }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Ngày sinh:"  prop="dateOfBirth">
                  <span class="text-bold">{{ diploma.dateOfBirth }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Nơi sinh:"  prop="placeOfOrigin">
                  <span class="text-bold">{{ diploma.placeOfOrigin }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Họ và tên:"  prop="fullName">
                  <span class="text-bold">{{ diploma.fullName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Giới tính:"  prop="sex">
                  <span class="text-bold">{{ diploma.sex }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Khóa học:"  prop="trainingCourse">
                  <span class="text-bold">{{ diploma.trainingCourse }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Dân tộc:"  prop="indigenousId">
                  <span class="text-bold">{{ diploma.indigenous }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Quốc tịch:"  prop="nationalityId">
                  <span class="text-bold">{{ diploma.nationality }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="title-section">Thông tin văn bằng và chương trình đào tạo</p>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Xếp loại:"  prop="rankingId">
                  <span class="text-bold">{{ diploma.ranking }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Năm tốt nghiệp:"  prop="yearGraduation">
                  <span class="text-bold">{{ diploma.yearGraduation }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Hình thức đào tạo:"  prop="modeOfStudy">
                  <span class="text-bold">{{ (diploma.modeOfStudy === 'CHINH_QUY' ? 'Chính quy' : 'Tại chức') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Đơn vị:"  prop="donvi" >
                  <span class="text-bold">{{ diploma.donvi }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Số hiệu văn bằng:" prop="serialNumber">
                  <span class="text-bold">{{ diploma.serialNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Số vào sổ:"  prop="referenceNumber">
                  <span class="text-bold">{{ diploma.referenceNumber }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Người ký:"  prop="signer">
                  <span class="text-bold">{{ diploma.signer }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Chức danh người ký:" prop="signerTitle">
                  <span class="text-bold">{{ diploma.signerTitle }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Loại yêu cầu:"  prop="reqTypeId">
                  <span class="text-bold">{{ diploma.reqType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Loại văn bằng:"  prop="diplomaTypeSymbol">
                  <span class="text-bold">{{ diploma.diplomaType }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" v-if="diploma.totalCredits != null && diploma.totalCredits != ''">
                <el-form-item label="Tổng số tín chỉ:" prop="totalCredits">
                  <span class="text-bold">{{ diploma.totalCredits }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14" v-if="diploma.decisionNumber != null && diploma.decisionNumber != ''">
                <el-form-item label="Quyết định số:" prop="decisionNumber">
                  <span class="text-bold">{{ diploma.decisionNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10" v-if="diploma.decisionEstablishingCouncil != null && diploma.decisionEstablishingCouncil != ''">
                <el-form-item label="Quyết định thành lập hội đồng:" prop="decisionEstablishingCouncil">
                  <span class="text-bold">{{ diploma.decisionEstablishingCouncil }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14" v-if="diploma.dateOfEnrollment != null && diploma.dateOfEnrollment != ''">
                <el-form-item label="Ngày nhập học:" prop="dateOfEnrollment">
                  <span class="text-bold">{{ diploma.dateOfEnrollment }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" v-if="diploma.dateOfGraduation != null && diploma.dateOfGraduation != ''">
                <el-form-item label="Ngày tốt nghiệp:" prop="dateOfGraduation">
                  <span class="text-bold">{{ diploma.dateOfGraduation }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14"  v-if="diploma.foreignLanguage != null && diploma.foreignLanguage != ''">
                <el-form-item label="Ngoại ngữ:" prop="foreignLanguage">
                  <span class="text-bold">{{ diploma.foreignLanguage }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10" v-if="diploma.levelForeignLanguage != null && diploma.levelForeignLanguage != ''">
                <el-form-item label="Cấp bậc ngoại ngữ:" prop="levelForeignLanguage">
                  <span class="text-bold">{{ diploma.levelForeignLanguage }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14"  v-if="diploma.dateOfDefend != null && diploma.dateOfDefend != ''">
                <span class="text-bold">{{ diploma.dateOfDefend }}</span>
              </el-col>
              <el-col :span="10"  v-if="diploma.hoiDongThi != null && diploma.hoiDongThi != ''">
                <el-form-item label="Hội đồng thi:" prop="hoiDongThi">
                  <span class="text-bold">{{ diploma.hoiDongThi }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14" v-if="diploma.gpa != null && diploma.gpa != ''">
                <el-form-item label="GPA tích lũy:" prop="gpa">
                  <span class="text-bold">{{ diploma.gpa }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Ngày tạo:" prop="createdDate">
                  <el-tag type="success"><span>{{ moment.unix(diploma.createdDate).format('DD-MM-YYYY') }}</span></el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Ngày cập nhật:" prop="lastModifiedDate">
                  <el-tag type="success"><span>{{ moment.unix(diploma.lastModifiedDate).format('DD-MM-YYYY') }}</span></el-tag>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Trạng thái:" prop="status">
                  <el-tag type="success"><span>{{ diploma.status }}</span></el-tag>
                </el-form-item>
              </el-col>

              <el-col :span="14">
                <el-form-item label="Năm tốt nghiệp:" prop="yearGraduation">
                  <el-tag type="success"><span>{{ diploma.yearGraduation }}</span></el-tag>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="20" v-if="diploma.note != null && diploma.note != ''">
                <el-form-item label="Ghi chú:" prop="note">
                  <span class="text-bold">{{ diploma.note }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="title-section">Thông tin lưu trữ blockchain</p>
            <el-row :gutter="20">
              <el-col :span="14">
                <el-form-item label="Trạng thái giao dịch:" prop="yearGraduation">
                  <el-tag type="success"><span>{{ (diploma.statusValidate  == true ? 'Xử lý thành công': 'Xử lý thất bại') }}</span></el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Mã giao dịch:" prop="yearGraduation">
                  <el-tag type="success"><span>{{ diploma.transactionId }}</span></el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="Thông tin giao dịch:" prop="yearGraduation">
                  <a v-bind:href="diploma.urlTransaction" class="text-link">{{ diploma.urlTransaction }}</a>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Mã định danh VB điện tử:" prop="yearGraduation">
                  <el-tag type="success"><span>{{ diploma.diplomaLink }}</span></el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="Thông tin VB điện tử:" prop="yearGraduation">
                  <a v-bind:href="diploma.urlDiploma" class="text-link">{{ diploma.urlDiploma }}</a>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" align="center">
              <el-col :span="20">
                <iframe :src="pdfsrc" style="width: 90%;height: 700px; border: none;">
                Oops! an error has occurred.
                </iframe>
              </el-col>
            </el-row>
          </el-form>
        </slot>
      </section>
    </div>
  </div>
</transition>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    diploma: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      status: [
        { id: 'DANHAN', label: 'Đã nhận' },
        { id: 'DAHONG', label: 'Đã hỏng' },
        { id: 'VERIFIED', label: 'Đã duyệt' },
        { id: 'PENDING', label: 'Chưa duyệt' }
      ],
      urlIpfs: 'https://ipfs.io/ipfs/',
      urlBlockchain: 'http://34.143.181.194:8081/?tab=transactions&transId=',
      pdfsrc: null
    }
  },
  created() {
    this.diploma.status = this.status.find(sta => this.diploma.status === sta.id || this.diploma.status === sta.label).label
    this.diploma.urlDiploma = this.diploma.diplomaLink != null ? this.urlIpfs + this.diploma.diplomaLink : ''
    this.pdfsrc = this.diploma.urlDiploma
    this.diploma.urlTransaction = this.diploma.transactionId != null ? this.urlBlockchain + this.diploma.transactionId : ''
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: absolute;
  top: 0;
  /* bottom: 0; */
  left: 0;
  /* right: 0; */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow: auto;
  z-index: 9999;
}

.modal {
  margin: 50px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 5px;
  display: flex;
}

.modal-header {
  position: relative;
  color: #cc2222;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 8px 10px;
}

.btn-close {
  position: absolute;
  top:  10px;
  right: 10px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}

.title-section {
  font-weight: 700;
  font-size: 16px;
  border-bottom: 1px solid #eeeeee;
}

p {
  margin: 0px;
}

.el-form-item {
  margin: 0px 10px;
}

.text-bold {
  font-weight: 700;
}

.text-link {
  color: #cc2222;
}
</style>
