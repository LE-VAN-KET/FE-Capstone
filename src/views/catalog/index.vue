<template>
  <div class="container01">
    <div class="box-wrapper">
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="Danh mục" name="first">
          <div v-if="showUserList" class="PageList">
            <el-button type="primary" @click="switchViewAdd">
              Thêm danh mục tốt nghiệp
            </el-button>
            <CatalogListView @editCate="editCate"></CatalogListView>
          </div>
          <div v-if="!showUserList" class="add-category">
            <el-button type="primary" @click="switchView">
              Quay lại
            </el-button>
            <CatalogView :modifyCateId="modifyCateId"></CatalogView>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CatalogListView from './component/CatalogListView'
import CatalogView from './component/CatalogView'

export default {
  name: 'User',
  components: {
    CatalogListView,
    CatalogView
  },
  data() {
    return {
      activeName: 'first',
      showUserList: true,
      modifyCateId: null
    }
  },
  methods: {
    switchViewAdd() {
      this.showUserList = !this.showUserList
      this.modifyCateId = null
    },
    switchView() {
      this.showUserList = !this.showUserList
    },
    editCate(uid) {
      this.modifyCateId = uid
      this.showUserList = !this.showUserList
    }
  }
}
</script>

<style lang="scss" scoped>
  .container01 {
    padding: 8px;
    background-color: rgb(240, 242, 245);
    .box-wrapper {
      background-color: #fff;
      border-radius: 3px;
      padding: 0px 10px;
    }
  }

</style>
