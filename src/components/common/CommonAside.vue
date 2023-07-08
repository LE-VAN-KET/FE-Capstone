<template>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="hotpink"
    :default-active="String(activeNav)" :collapse="isCollapse" :unique-opened="true" class="el-menu-vertical-demo">
    <!-- 没有儿子的导航栏 -->
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有儿子的导航栏 -->
    <el-submenu :index="item.path" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
        @click="clickMenu(subItem)" >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import MenuData from './menu_data.js'
export default {
  data() {
    return {
      asideMenu: MenuData.get_menu_data()
    }
  },
  computed: {
    // 判断导航栏是否有子节点
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.menu.isCollapse
    },
    // 设置当前激活的导航
    activeNav() {
      return this.$route.path
    }
  },
  methods: {
    // 点击切换路由
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
      // console.log(item.name)
    }
  }
}
</script>
<style lang="scss">
  .el-menu {
    height: 100%;
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    // width: 200px;
    min-height: 400px;
    background-color: #4D90FE !important;
  }

  .el-menu-item,
  .el-submenu {
    background-color: #4D90FE !important;
    &:hover {
      background-color: #20498c !important;
    }

    i {
      color: #fff !important;
    }
  }

  ul {
    .is-active {
      background-color: #20498c !important;
    }
  }
  .el-submenu {
    &__title {
      background-color: #4D90FE !important;
      &:hover {
      background-color: #20498c !important;
    }
    }
  }
  .el-menu {
    background-color: #4D90FE !important;
  }

</style>
