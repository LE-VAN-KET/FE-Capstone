<template>
  <header>
    <div class="el-logo">
      <i class="el-icon-s-fold" v-show="!isCollapse" @click="collapseMenu"></i>
      <i class="el-icon-s-unfold" v-show="isCollapse" @click="collapseMenu"></i>
      <img class="img-logo" src="/logo.png"/>
    </div>
    <div class="opt-wrapper">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link"> <img src="/img/admin-logo.jpg" alt="" class="avatar"/></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="slef_info"><i class="el-icon-info"></i>Thông tin</el-dropdown-item>
          <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i>Đăng xuất</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.menu.isCollapse
    })
  },
  mounted() {
    sessionStorage.clear()
  },
  methods: {
    collapseMenu() {
      this.$store.commit('changeMenu')
    },
    // 退出方法
    handleCommand(command) {
      if (command === 'logout') {
        sessionStorage.clear()
        sessionStorage.removeItem('tabs')
        this.$router.push('/login')
      } else if (command === 'slef_info') {
        window.location.reload()
        this.$message.success('click on item ' + command)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

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
// .opt-wrapper {
//   display: flex;
//   align-items: center;
// }
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
  max-height: 40px;
}

</style>
