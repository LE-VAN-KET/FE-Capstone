<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header style="background:#409EFF">
        <CommonHeader></CommonHeader>
      </el-header>
      <common-tab></common-tab>
      <el-main style="background:#fff;padding:10px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '../components/common/CommonAside.vue'
import CommonHeader from '../components/common/CommonHeader.vue'
import CommonTab from '../components/common/CommonTab.vue'

export default {
  components: { CommonAside, CommonHeader, CommonTab }
}
</script>
<style lang="css">
.el-aside {
  /* padding-top:60px; */
  height: calc(100vh);
}

.el-aside {
  background-color: #4D90FE !important;
}

</style>
