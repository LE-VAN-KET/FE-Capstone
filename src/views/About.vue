<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>欢迎到我的页面！！！</h1>
    <img src="/img/a1.png"/>
    <span >斯蒂芬斯蒂芬</span>
    <p>啊啊飒飒的</p>
    <strong class="border-5">水电费水电费水电费</strong>
    <el-button type="primary">按钮</el-button>
    <p>{{this.$store.state.user.loginuser}}</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
   .class01{
      border : 1px solid hotpink;
   }

  .about{
    h1{
        background-color: $bgcolor01;
        font-size: 48px-12px;
    }
    span{
      @extend .class01;
      color: salmon;
    }
    p{
      width: double(200px);
      @include left(50px);
      background-color: lighten(#cc3, 10%);
      @if 1 + 1 == 3 { border: 1px solid; }
      @else { border: 2px dotted; }
    }
  }

</style>
