<template lang="">
     <div class="container01">
    <div class="box-wrapper">
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="供应商信息" name="first">
          <div v-if="showGoodsList" class="PageList">
            <el-button type="primary" @click="switchView">
              新增供应商
            </el-button>
            <!-- 商品列表 -->
            <CustmerListView @editDiploma="editDiploma"></CustmerListView>
            <!-- <AddListDiplomaView @click="addDiplomas"></AddListDiplomaView> -->
          </div>
          <div v-if="!showGoodsList" class="add-category">
            <el-button type="primary" @click="switchView">
              返回列表
            </el-button>
            <!-- 商品信息增加或者修改 -->
            <CustmerView :modifyGoodsId="modifyGoodsId"></CustmerView>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import CustmerListView from './component/CustmerListView'
import CustmerView from './component/CustmerView'
// import AddListDiplomaView from './component/AddListDiplomaView'

export default {
  name: 'Goods',
  components: {
    CustmerListView,
    CustmerView
  },
  data() {
    return {
      activeName: 'first',
      showGoodsList: true,
      modifyGoodsId: null
    }
  },
  methods: {
    switchView() {
      this.showGoodsList = !this.showGoodsList
      this.modifyGoodsId = null
    },
    editGoods(goodsid) {
      this.modifyGoodsId = goodsid
      this.showGoodsList = !this.showGoodsList
    },
    addDiplomas() {
      this.showGoodsList = !this.showGoodsList
      this.modifyGoodsId = null
    }
  }
}
</script>
<style lang="scss" scoped>
    .container01 {
    padding: 8px;
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    .box-wrapper {
      background-color: #fff;
      border-radius: 3px;
      padding: 0px 10px;
    }
  }

</style>
