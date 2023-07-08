<template>
<el-container>
  <el-header>
    <div class="el-logo">
      <img class="img-logo" src="/logo.png" />
    </div>
    <div class="opt-wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">giới thiệu</el-menu-item>
        <el-menu-item index="2">phản ánh kiến nghị</el-menu-item>
        <el-menu-item index="3">hỏi đáp</el-menu-item>
        <el-menu-item index="3">hỗ trợ</el-menu-item>
      </el-menu>
      <el-button type="danger" @click="sigin">Đăng nhập</el-button>
      <!-- <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link"><img src="/img/admin-logo.jpg" alt="" class="avatar" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="slef_info"><i class="el-icon-info"></i>Thông tin</el-dropdown-item>
          <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i>Đăng xuất</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </el-header>
  <el-main>
    <h1>Hệ thống tra cứu văn bằng, chứng chỉ</h1>
    <el-row>
      <el-col :span="12" class="container_banner"><img class="banner" src="/banner.png" /></el-col>
      <el-col :span="12">
        <el-form :model="searchForm" ref="searchFormRef" :rules="searchFormRules">
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item prop="serialNumber" class="form-item-search">
                <el-input class="input-search" v-model="searchForm.serialNumber" placeholder="Số hiệu văn bằng" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span class="span-form">Hoặc</span>
          <el-row :gutter="20">
            <el-col :span="9" class="col_full_name">
              <el-form-item prop="fullName" class="form-item-search">
                <el-input class="input-search" v-model="searchForm.fullName" placeholder="Họ và tên" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col_birth_date">
              <el-form-item prop="dateOfBirth" class="form-item-search">
                <el-input class="input-search" type="date" v-model="searchForm.dateOfBirth" placeholder="Ngày sinh" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn">
            <el-button class="btn-seacrh" @click="handlesearchForm" icon="el-icon-search">Tìm kiếm</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="table_search">
      <el-col :span="22">
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
          <el-table-column prop="fullName" label="Họ Và Tên" width="180" align="center">
          </el-table-column>
          <el-table-column prop="dateOfBirth" label="Ngày Sinh" width="100" align="center">
          </el-table-column>
          <el-table-column prop="sex" label="Giới Tính" width="80" align="center">
          </el-table-column>
          <el-table-column prop="placeOfOrigin" label="Nơi Sinh" width="100" align="center">
          </el-table-column>
          <el-table-column prop="indigenous" label="Dân tộc" width="80" align="center">
          </el-table-column>
          <el-table-column prop="nationality" label="Quốc tịch" width="90" align="center">
          </el-table-column>
          <el-table-column prop="major" label="Ngành" width="200" align="center">
          </el-table-column>
          <el-table-column prop="ranking" label="Xếp loại" width="80" align="center">
          </el-table-column>
          <el-table-column prop="referenceNumber" label="Số Vào Sổ" width="110" align="center">
          </el-table-column>
          <el-table-column prop="serialNumber" label="Số Hiệu Văn Bằng" width="140" align="center">
          </el-table-column>
          <el-table-column label="Giao Dịch" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.statusValidate === true" class="custom-icon el-icon-circle-check"></i>
              <i v-if="scope.row.statusValidate === false" class="custom-icon el-icon-warning"></i>
            </template>
          </el-table-column>
          <el-table-column label="Hành Động" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <Modal
      v-if="isModalVisible"
      @close="closeModal"
      :diploma="diploma"
    />

  </el-main>
  <el-footer>
    <p class="footer">
      Cơ quan chủ quản: Bộ giáo dục và đào tạo thành phố Đà Nẵng
    </p>
  </el-footer>
</el-container>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      diploma: null,
      isModalVisible: false,
      loading: false,
      activeIndex: '1',
      searchForm: {
        serialNumber: '',
        fullName: '',
        dateOfBirth: ''
      },
      avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      searchFormRules: {
        serialNumber: [{
          required: true,
          message: 'Số hiệu văn bằng không đươc bỏ trống',
          trigger: 'blur'
        }],
        fullName: [{
          required: true,
          message: 'Họ và tên không đươc bỏ trống',
          trigger: 'blur'
        }],
        dateOfBirth: [{
          required: true,
          message: 'Ngày sinh không đươc bỏ trống',
          trigger: 'blur'
        }]
      },
      tableData: []
    }
  },

  methods: {
    change(e) {
      this.$forceUpdate()
    },
    searchFormReset() {
      this.$refs.searchFormRef.resetFields()
    },
    handlesearchForm() {
      this.$refs.searchFormRef.validate(async valid => {
        // if (!valid) return
        try {
          this.loading = true
          const res = await this.$api.DiplomagApi.search(this.searchForm)
          if (res.code === 400 || res.code === 401 || res.code === 403 || res.code === 404) {
            this.$message({
              message: res.message,
              type: 'error'
            })
          } else {
            this.tableData = res
            this.tableData = this.tableData.map(dip => {
              dip.sex = dip.sex === 'MALE' ? 'Nam' : 'Nữ'
              return dip
            })
            console.log(this.tableData)
            this.loading = false
          }
        } catch (err) {
          console.log(err)
        }
      })
    },
    handleView(idx, data) {
      this.diploma = data
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    sigin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #F0F0F0;
  font-size: x-large;
  text-align: center;
  margin-top: 2rem;
}

.el-header {
  background-color: #941C1C !important;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 25px;
    cursor: pointer;
  }
}

.opt-wrapper {
  display: flex;
  align-items: center;
}

.avatar {
  margin-top: 10px;
  // display: block;
  margin-right: 40px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.el-logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.img-logo {
  max-height: 50px;
}

.el-menu-item,
.el-submenu {
  background-color: #941C1C !important;
  text-transform: uppercase;

  &:hover {
    background-color: #d12020 !important;
  }
}

.el-footer {
  background-color: #F0F0F0;
  max-height: 30px !important;
  display: flex;
  align-self: center;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.footer {
  margin: 0;
  position: fixed;
}

.el-main {
  height: calc(100vh - 100px);
  background-image: url("/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: -350px;
}

.banner {
  max-width: 80%;
}

.container_banner {
  padding: 0 2rem;
}

.span-form {
  margin: 0 20px;
  font-weight: 500;
}

.col_full_name {
  padding-right: 0 !important;

  .el-form-item {
    // width: 95% !important;
  }
}

.col_birth_date {
  padding-left: 0 !important;

  .el-form-item {
    // width: 95% !important;
  }
}

.btn {
  margin: 5px 0 0 20px;
}

.el-form {
  margin-top: 2rem !important;
}

.table_search {
  display: flex;
  justify-content: center;
  margin: 20px 0 !important;
}

.custom-icon {
   font-size: 1.5rem;
}
</style>

<style lang="scss">
.input-search {
  input {
    // padding: 20px 30px 20px 20px !important;
    padding-left: 20px;
    height: 45px;
    line-height: 45px;
    border-radius: 8px;
    border: 2px solid #E8E8E8 !important;

    &:focus {
      border-color: #EF0F3F !important;
    }
  }
}

.form-item-search {
  margin-right: 5px !important;
  margin-top: 10px !important;
}

.btn-seacrh {
  border-radius: 8px;
  background-color: #EF0F3F;
  color: #FFFFFF;

  &:hover,
  &:focus {
    background-color: #e0204a;
    color: #FFFFFF;
  }
}

.el-table {
  border-radius: 8px;
  thead {
    tr  {
      th {
        background-color: #FFDCDF !important;
        color: #EF0F3F;
      }
    }
  }
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
