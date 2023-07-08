<template lang="">
     <div class="container01">
    <div class="box-wrapper">
      <el-tabs v-model="activeName" class="tab-box">
        <el-tab-pane label="Quản lý người dùng" name="first">
          <div v-if="showGoodsList" class="PageList">
            <el-button type="primary" @click="switchView" icon="el-icon-circle-plus-outline">
              Thêm người dùng
            </el-button>
            <GoodsListView @editGoods="editGoods"></GoodsListView>
          </div>
          <div v-if="!showGoodsList" class="add-category">
            <el-button type="primary" @click="switchView">
              Quay lại
            </el-button>
            <GoodsView :modifyGoodsId="modifyGoodsId"></GoodsView>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import GoodsListView from './component/GoodsListView'
import GoodsView from './component/GoodsView'
export default {
  name: 'Goods',
  components: {
    GoodsListView,
    GoodsView
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
