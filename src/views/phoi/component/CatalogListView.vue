<template lang="">
    <div class="UserListView">
     <el-row :gutter="3" class="list-operation">
      <el-col :span="8" :xs="12">
        <div class="grid-content bg-purple">
          <el-input v-model="key_world" placeholder="Tên phôi" clearable style="width: 350px"></el-input>
          <el-button type="primary" plain @click="getUserList" icon="el-icon-search">Tìm kiếm</el-button>
        </div>
      </el-col>
      <el-col :span="3" :xs="6">
        <div class="grid-content bg-purple">
          <el-button type="warning" plain @click="multipleDel">Xóa hàng loạt</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
    <el-table
    :data="this.getPhois" border v-loading="loading" :row-style="{height: '40px'}"
    style="width: 100%">
    <el-table-column
          type="selection"
          align="center"
          width="50"
        >
    </el-table-column>
    <el-table-column
      label="Tiêu đề"
      align="center" width="200">
      <template slot-scope="scope" >
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Đơn vị được cấp"
      align="center" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.donvi }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Loại văn bằng"
      align="center" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.diplomaType }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số hiệu bắt đầu"
      align="center" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.serialNumberBegin }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số hiệu kết thúc"
      align="center" width="170">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.serialNumberEnd }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số lượng phôi bằng tồn cũ"
      align="center" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amountOldStock }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="Số lượng phôi bằng được cấp/in mới"
      align="center" width="160">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amountIssuedNewPrint }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số lượng bằng đã cấp cho người học"
      align="center" width="145">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amountIssuedStudent }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số lượng bằng in hỏng"
      align="center" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amountBroken }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Số lượng phôi bằng chưa sử dụng"
      align="center" width="160">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amountUnused }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Bậc cấp"
      align="center" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.bachoc == 'DAIHOC' ? 'Đại học' : 'Cao đẳng' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Loại phôi"
      align="center" width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.loaiPhoi == 'BANCHINH' ? 'Bản chính' : 'Bản sao' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Ngày mua"
      align="center" width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ moment(new Date(scope.row.ngayMua)).format('DD-MM-YYYY') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Ngày nhập kho"
      align="center" width="130">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ moment(new Date(scope.row.ngayNhapKho)).format('DD-MM-YYYY') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Ghi chú"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.note }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Hành động" align="center" width="120" fixed="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleView(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
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
        :total="this.getTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
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
  name: 'UserListView',
  data() {
    return {
      key_world: '',
      page: 1,
      page_size: 10,
      loading: false
    }
  },
  computed: {
    ...mapGetters('phoi', ['getPhois', 'getTotal'])
  },
  async mounted() {
    await this.get_all_phois({
      paging: 1,
      pageSize: 10
    })
  },
  methods: {
    ...mapActions('phoi', ['get_all_phois']),
    getUserList() {
      // this.loading = true
      // this.$api.UserApi.getUserList()
      //   .then(rep => {
      //     this.loading = false
      //     this.tableData = rep.data.booksList
      //     this.total = rep.data.total
      //     console.log(rep)
      //   })
      //   .catch(err => {
      //     this.loading = true
      //     console.log(err)
      //   })
    },
    handleEdit(index, row) {
      this.$emit('editCate', row)
    },
    handleView(index, row) {
      this.$emit('detail', row)
    },
    handleDelete(index, row) {

    },
    async handleSizeChange(pageSize) {
      this.page_size = pageSize
      await this.get_all_phois({
        paging: this.page,
        pageSize: this.page_size
      })
    },
    async handleCurrentChange(page) {
      this.page = page
      await this.get_all_phois({
        paging: this.page,
        pageSize: this.page_size
      })
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
