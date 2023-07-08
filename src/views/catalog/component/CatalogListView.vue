<template lang="">
<div class="UserListView">
  <el-row :gutter="3" class="list-operation">
    <el-col :span="8" :xs="12">
      <div class="grid-content bg-purple">
        <el-input v-model="key_world" placeholder="Tên danh mục" clearable style="width: 350px"></el-input>
        <el-button type="primary" plain @click="getUserList" icon="el-icon-search">Tìm kiếm</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-table :data="this.getCatalogs" border v-loading="loading" :row-style="{height: '40px'}" style="width: 100%">
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column label="Tiêu đề" width="250" fixed>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Quyết định tốt nghiệp" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.decisionGraduation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Năm tốt nghiệp" width="150" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.yearGraduation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nội dung" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Chú ý" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdBy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" width="180" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ moment.unix(scope.row.createdDate).format('DD-MM-YYYY') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày cập nhật cuối cùng" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ moment.unix(scope.row.lastModifiedDate).format('DD-MM-YYYY') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" align="center" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>

  <el-row class="pagination">
    <el-pagination background :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :current-page="page" layout="total, sizes, prev, pager, next, jumper" :total="this.getTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
  name: 'CatalogListView',
  data() {
    return {
      key_world: '',
      total: 5,
      page: 1,
      pageSize: 10,
      loading: false,
      tableData: []
    }
  },
  computed: {
    ...mapGetters('catalog', ['getCatalogs', 'getTotal'])
  },
  async mounted() {
    this.loading = true
    await this.get_all_catalogs({
      page: 1,
      pageSize: 10
    })
    this.loading = false
  },
  methods: {
    ...mapActions('catalog', ['get_all_catalogs']),
    getUserList() {
      this.loading = true
      this.get_all_catalogs()
    },
    handleEdit(index, row) {
      this.$emit('editCate', row.id)
    },
    handleDelete(index, row) {
      this.$confirm(`Xác nhận xóa danh mục có tiêu đề: ${row.title}. Tiếp tục?`, 'Warning', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(async() => {
        await this.$api.CatalogApi.deleteCatalogs(row.id)
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
        await this.get_all_catalogs({
          page: this.page,
          pageSize: this.pageSize
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    async handleSizeChange(pageSize) {
      this.loading = true
      this.page_size = pageSize
      await this.get_all_catalogs({
        page: this.page,
        pageSize: this.pageSize
      })
      this.loading = false
    },
    async handleCurrentChange(page) {
      this.page = page
      this.loading = true
      await this.get_all_catalogs({
        page: this.page,
        pageSize: this.pageSize
      })
      this.loading = false
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
