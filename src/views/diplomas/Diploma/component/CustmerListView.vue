<template lang="">
<div class="GoodsListView">
  <el-row :gutter="3" class="list-operation">
    <el-col :span="3" :xs="12">
      <div class="grid-content bg-purple">
        <el-select v-model="yearGraduation" placeholder="Năm tốt ngiệp" @change="changeYearGraduation($event)">
          <el-option v-for="item in this.getYearGraduations" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="8" :xs="12">
      <div class="grid-content bg-purple">
        <el-input v-model="key_world" placeholder="Họ và tên/Số hiệu/Số vào sổ" clearable style="width: 350px"></el-input>
        <el-button type="primary" plain @click="getUserList" icon="el-icon-search">Tìm kiếm</el-button>
      </div>
    </el-col>
    <el-col :span="4" :xs="12">
      <div class="grid-content bg-purple">
        <el-button type="warning" plain @click="multipleVerifyDip">Duyệt hàng loạt</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-table :data="this.getDiplomas" border v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column label="Mã học viên" align="center" width="120" fixed>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngành" align="center" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.major }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Họ và tên" align="center" width="160" fixed >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày sinh" align="center" width="130">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ moment(new Date(scope.row.dateOfBirth)).format('DD-MM-YYYY') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nơi sinh" align="center" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.placeOfOrigin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Giới tính" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.sex === 'MALE'">Nam</el-tag>
          <el-tag type="danger" v-else>Nữ</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Dân tộc" align="center" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.indigenous }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Quốc gia" align="center" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nationality }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Xếp loại" align="center" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ranking }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hình thức đào tạo" align="center" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.modeOfStudy == 'CHINH_QUY' ? 'Chính Quy' : 'Tại Chức' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Đơn vị" align="center" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.donvi }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số hiệu" align="center" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.serialNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số vào sổ" align="center" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.referenceNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Người ký" align="center" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.signer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Chức danh người ký" align="center" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.signerTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Khóa học" align="center" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.trainingCourse }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Quyết định số" align="center" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.decisionNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Quyết định thành lập hội đồng" align="center" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.decisionEstablishingCouncil }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Loại yêu cầu" align="center" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.reqType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Loại văn bằng" align="center" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.diplomaType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" width="135">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="Select" @change="changeStatusDip($event, scope.row)">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="Cập nhật" placement="bottom-start"> -->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
  </el-row>

  <el-row class="pagination">
    <el-pagination background :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="10" :current-page="page" layout="total, sizes, prev, pager, next, jumper" :total="this.getTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </el-row>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'GoodsListView',
  data() {
    return {
      page: 1,
      page_size: 10,
      key_world: '',
      loading: false,
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
      multipleSelection: [],
      yearGraduation: 'Năm tốt nghiệp'
    }
  },
  computed: {
    ...mapGetters('diploma', ['getDiplomas', 'getTotal', 'getYearGraduations'])
  },
  async mounted() {
    this.loading = true
    await Promise.all([this.get_all_diplomas({
      page: 1,
      pageSize: 10
    }), this.get_all_years_graduation()])
    this.loading = false
  },
  // created() {
  //   this.getUserList()
  // },
  methods: {
    ...mapActions('diploma', ['get_all_diplomas', 'get_all_years_graduation']),
    getUserList() {},
    handleEdit(index, row) {
      this.$emit('editDiploma', row)
    },
    async handleSizeChange(pageSize) {
      this.page_size = pageSize
      await this.get_all_diplomas({
        page: this.page,
        pageSize: this.page_size
      })
    },
    async handleCurrentChange(page) {
      this.page = page
      await this.get_all_diplomas({
        page: this.page,
        pageSize: this.page_size
      })
    },
    async changeStatusDip(status, dip) {
      try {
        this.loading = true
        await this.$api.DiplomagApi.changeStatusDiploma({ status: status }, dip.referenceNumber)
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$message({
          message: 'Cập nhật status không thành công',
          type: 'error'
        })
        await this.get_all_diplomas({
          page: this.page,
          pageSize: this.page_size
        })
      }
    },
    async multipleVerifyDip() {
      const ids = this.multipleSelection.map(row => row.id)
      await this.$api.DiplomagApi.verifyDiploma({ diplomaIds: ids })
      await this.get_all_diplomas({
        page: this.page,
        pageSize: this.page_size
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async changeYearGraduation(year) {
      if (!isNaN(year)) {
        await this.get_all_diplomas({
          page: this.page,
          pageSize: this.page_size,
          yearGraduation: year
        })
      } else {
        await this.get_all_diplomas({
          page: this.page,
          pageSize: this.page_size
        })
      }
    }
  }
}
</script>

<style lang="scss">
.list-operation {
  margin: 15px 0;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-content {
  display: flex;
  justify-content: space-around;
}

.el-table {

  td,
  th {
    padding: 5px 0 !important;
  }
}
</style>
