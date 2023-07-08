<template>
  <div class="container01">
    <div class="box-wrapper">
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="Quản lý phôi" name="first">
          <div v-if="showUserList" class="PageList">
            <el-button type="primary" @click="switchView">
              Thêm phôi
            </el-button>
            <CatalogView @editCate='editCate' @detail='detail'></CatalogView>
          </div>
          <div v-if="!showUserList" class="add-category">
            <el-button type="primary" @click="switchView">
              Quay lại
            </el-button>
            <UserView :modifyCateId="modifyCateId" :detailPhoi="detailPhoi" ></UserView>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="this.activeName == 'second'" label="Chi tiết phôi" name="second">
          <PhoiView :phoi="detailPhoi"></PhoiView>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CatalogView from './component/CatalogListView'
import UserView from './component/UserView'
import PhoiView from './component/PhoiView.vue'

export default {
  name: 'phoi',
  components: {
    CatalogView,
    UserView,
    PhoiView
  },
  data() {
    return {
      activeName: 'first',
      showUserList: true,
      modifyCateId: null,
      detailPhoi: null
    }
  },
  methods: {
    switchView() {
      this.showUserList = !this.showUserList
      this.modifyCateId = null
    },
    editCate(raw) {
      this.modifyCateId = raw.id
      this.detailPhoi = raw
      this.showUserList = !this.showUserList
    },
    detail(record) {
      this.detailPhoi = record
      this.activeName = 'second'
    }

  }
}
</script>

<style lang="scss" scoped>
  .container01 {
    padding: 8px;
    // min-height: 100vh;
    background-color: rgb(240, 242, 245);
    .box-wrapper {
      background-color: #fff;
      border-radius: 3px;
      padding: 0px 10px;
    }
  }

</style>
