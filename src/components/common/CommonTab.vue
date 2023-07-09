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
    const sessionTabs = JSON.parse(sessionStorage.getItem('tabs'))
    if (sessionTabs !== null) {
      this.$store.commit('changeSetTabs', sessionTabs.tabList)
    }
  },
  mounted() {
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
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    },
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
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.common-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
.tab-menu::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}
.tab-menu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #498eaf;
}
.tab-menu::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #fff;
}
</style>
