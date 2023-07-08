<template>
    <div class="common-tab">
    <div class="tab-menu">
      <el-tag
        :key="tag.name"
        v-for="tag in tags"
        :closable="tag.name !== 'home'"
        :disable-transitions="false"
        @click="changeMenu(tag)"
        @close="handleClose(tag)"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
      >
        <i :class="'el-icon-' + tag.icon"></i>
        {{ tag.label }}
      </el-tag>
    </div>

    <div class="refresh-btn">
      <el-button type="primary" icon="el-icon-refresh" @click="refresh"></el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  created() {
    // 获取刷新之前获取路由的信息
    const sessionTabs = JSON.parse(sessionStorage.getItem('tabs'))
    console.log(sessionTabs)
    if (sessionTabs !== null) {
      // 获取到存储的路由列表之后，将信息利用vuex进行存储
      this.$store.commit('changeSetTabs', sessionTabs.tabList)
    }
  },
  mounted() {
    // 刷新之前存储路由信息
    window.addEventListener('beforeunload', e => {
      sessionStorage.setItem(
        'tabs',
        JSON.stringify({
          tabList: this.tags,
          activeTab: this.$route.name
        })
      )
    })
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    // 点击切换页面方法
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    },
    // 关闭界面的方法
    handleClose(tag) {
      this.tags.forEach((item, index) => {
        if (item.name === tag.name && tag.name === this.$route.name) {
          const nextTab = this.tags[index + 1] || this.tags[index - 1]
          if (nextTab) {
            this.$store.commit('selectMenu', nextTab)
            this.$router.push({ name: nextTab.name })
          }
        } else {
          this.$router.push({ name: this.$route.name })
        }
      })
      this.$store.commit('closeTab', tag)
    },
    // 刷新方法
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
    // tabs容器
.common-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// tabs按钮容器
.tab-menu {
  flex: 1;
  padding: 5px;
  white-space: nowrap;
  overflow-x: auto;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
.refresh-btn {
  padding: 5px;
}
/*滚动条样式*/
// 滚动条整体部分
.tab-menu::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}
// 滚动条里面的小方块，能上下移动,取决于是垂直滚动还是水平滚动
.tab-menu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #498eaf;
}
// 滚动条的轨道
.tab-menu::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #fff;
}
</style>
