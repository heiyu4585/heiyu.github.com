<template>
  <div id="app">
    <TopNav></TopNav>
    <!-- <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link> -->
    <div class="main-container container-fluid">
      <div class="page-container">
        <!-- Page Sidebar -->
        <div class="page-sidebar" id="sidebar">
          <LeftMenu></LeftMenu>
        </div>

        <div class="page-content">
          <div id="content">
            <router-view></router-view>
          </div>
        </div>
      </div>

      <div id="footer"></div>
    </div>
  </div>
</template>

<script>
  import TopNav from 'components/TopNav';
  import LeftMenu from 'components/LeftMenu';

  export default {
    name: 'indexPfm',
    components: {
      TopNav,
      LeftMenu
    }
  }
</script>

<style>
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
