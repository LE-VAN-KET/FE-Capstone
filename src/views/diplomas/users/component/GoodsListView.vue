<template lang="">
    <div class="GoodsListView">
     <el-row :gutter="3" class="list-operation">
      <el-col :span="8" :xs="12">
        <div class="grid-content bg-purple">
          <el-input v-model="key_world" placeholder="Tên người dùng" clearable style="width: 350px"></el-input>
          <el-button type="primary" plain @click="getUserList" icon="el-icon-search">Tìm kiếm</el-button>
        </div>
      </el-col>

      <el-col :span="3" :xs="6">
        <div class="grid-content bg-purple">
          <el-button type="danger" plain @click="multipleDel()">Xóa hàng loạt</el-button>
        </div>
      </el-col>
    </el-row>

     <el-row>
    <el-table
    :data="tableData" border
    v-loading="loading"
    style="width: 100%">
    <el-table-column
          type="selection"
          align="center"
          width="50"
        >
    </el-table-column>
    <el-table-column
      label="Mã người dùng"
      align="center" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Tên người dùng"
      align="center" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="email"
      align="center"
      width="220">
      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số CMNN/CCCD"
      align="center" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.citizenIdentityNo }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số điện thoại"
      align="center" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phoneNo }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Role"
      align="center" width="150">
      <template slot-scope="scope" >
        <span style="margin-left: 10px">{{ scope.row.authorityName }}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="Ngày tạo"
      align="center" width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ moment(new Date(scope.row.createdDate)).format('DD-MM-YYYY') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Ngày cập nhật"
      align="center" width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ moment(new Date(scope.row.lastModifiedDate)).format('DD-MM-YYYY') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Hành động" align="center" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
      </template>
     </el-table-column>
     </el-table>
     </el-row>

     <el-row class="pagination">
      <el-pagination
        background
        :page-sizes="[5, 10, 20, 30, 40, 50]"
        :page-size="10"
        :current-page="page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
    </div>
</template>
<script>
export default {
  name: 'GoodsListView',
  data() {
    return {
      tableData: [],
      total: 1,
      page: 1,
      page_size: 1,
      key_world: '',
      loading: false
    }
  },
  async created() {
    // this.getUserList()
    const res = await this.$api.UserApi.getUserList()
    this.tableData = [...res]
  },
  methods: {
    getUserList() {
      // this.loading = true
      // this.$api.GoodsApi.getGoodsList()
      //   .then(rep => {
      //     this.tableData = rep.data.goodsList
      //     this.total = rep.data.total
      //     this.loading = false
      //   })
      //   .catch(err => {
      //     this.loading = true
      //     console.log(err)
      //   })
    },
    handleEdit(index, row) {
      /// todo 修改页面传递id参数
      this.$emit('editGoods', row.id)
    },
    handleDelete(index, row) {

    },
    handleSizeChange(pageSize) {
      this.page_size = pageSize
    },
    handleCurrentChange(page) {
      this.page = page
    },
    multipleDel() {

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
</style>
