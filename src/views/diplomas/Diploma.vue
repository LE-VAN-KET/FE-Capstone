<template>
  <div class="container01">
    <div class="box-wrapper">
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="Dữ liệu học sinh" name="first">
          <div v-if="showUserList" class="PageList">
            <el-button type="primary" @click="switchView">
              Thêm học sinh
            </el-button>
            <el-button class="bg-purple" type="success" plain @click="switchViewAddList">Thêm từ tệp tin</el-button>
            <CustmerListView @editDiploma='editDiploma'></CustmerListView>
          </div>
          <div v-if="showAddUser" class="add-category">
            <el-button type="primary" @click="switchView">
              Quay lại
            </el-button>
            <CustmerView :modifyCateId="modifyCateId" :diploma="diploma"></CustmerView>
          </div>
          <div v-if="showAddListUser" class="add-category">
            <el-button type="primary" @click="switchView">
              Quay lại
            </el-button>
            <AddListDiplomaView></AddListDiplomaView>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CustmerListView from './Diploma/component/CustmerListView.vue'
import CustmerView from './Diploma/component/CustmerView.vue'
import AddListDiplomaView from './Diploma/component/AddListDiplomaView'

export default {
  name: 'Diplomas',
  components: {
    CustmerListView,
    CustmerView,
    AddListDiplomaView
  },
  data() {
    return {
      activeName: 'first',
      showUserList: true,
      showAddListUser: false,
      showAddUser: false,
      modifyCateId: null,
      diploma: null
    }
  },
  methods: {
    switchView() {
      this.showUserList = !this.showUserList
      this.showAddUser = !this.showUserList
      this.showAddListUser = false
      this.modifyCateId = null
    },
    switchViewAddList() {
      this.showUserList = !this.showUserList
      this.showAddUser = false
      this.showAddListUser = true
      this.modifyCateId = null
    },
    editDiploma(data) {
      this.modifyCateId = data.id
      this.diploma = data
      this.showUserList = !this.showUserList
      this.showAddUser = !this.showUserList
      this.showAddListUser = false
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
