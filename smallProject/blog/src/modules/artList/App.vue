<template>
  <el-container>
    <el-header>
      <h1 class="site-title"><a href="http://www.siyuweb.com/" rel="home">ar22222t1has1</a></h1>
      <h2 id="site-description">专注于WEB前端开发,分享前端开发和前端技术1</h2>
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
    import Vue from 'vue'
    import Element from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css';

    Vue.use(Element)

    export default {
        name: 'app',
        data: function (){
            return {
                active:true
            }
        }
    }
</script>

<style lang="scss">
  .el-header .site-title {
    font-size: 20px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
