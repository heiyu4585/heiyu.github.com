<template>
  <header id="header">
    <div class="main-header clearfix">
      <div class="title-main">
        <h1 class="site-title"><a href="http://www.siyuweb.com/" rel="home">web前端技术开发个人博客</a></h1>
        <h2 id="site-description">专注于WEB前端开发,分享前端开发和前端技术</h2>
      </div>
    </div>
    <nav id="site-nav" class="main-nav">
      <div class="menu-pc%e7%ab%af%e8%8f%9c%e5%8d%95-container">
        <ul id="menu-pc%e7%ab%af%e8%8f%9c%e5%8d%95" class="menu">
          <li id="menu-item-1792"
              class="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-1792">
            <a href="http://www.siyuweb.com/tool">工具</a></li>
          <li id="menu-item-1793"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-1793"><a
                  href="http://www.siyuweb.com/diary">日志</a></li>
          <li id="menu-item-1794"
              class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1794">
            <a href="http://www.siyuweb.com/texiao">特效搜集</a></li>
        </ul>
      </div>
      <ul>
        <li class="fill"></li>
      </ul>
    </nav>
    <!-- #site-nav -->
  </header>
</template>

<script>
//   import axios from "axios";
//   // axios.defaults.baseURL = '/api';
// export default {
//   name: 'TopNav',
//   data () {
//     return {
//       user: {},
//       sites:{},
//       selectSite:"",
//       message:"message"
//     }
//   },
//   mounted:function(){
//     var _this=this;
//     console.log(this.$data);
//       axios({
//         url: "/api/login",
//         method: "GET",
//         data: {},
//         headers: {
//           'X-ReqTuested-With': 'XMLHttpRequest'
//         },
//         timeout: 30000
//       }).then(function (res) {
//         _this.user=res.data.user;
//       });
// //获取站点
//     axios({
//       url: "/api/sites/getSites",
//       method: "POST",
//       data: {},
//       headers: {
//         'X-ReqTuested-With': 'XMLHttpRequest'
//       },
//       timeout: 30000
//     }).then(function (res) {
//       console.log(res.data);
//       _this.selectSite=res.data.selectSite;
//     });
//
//     //已经选择的站点
//     axios({
//       url: "/api/sites/selectSite",
//       method: "POST",
//       data: {},
//       headers: {
//         'X-ReqTuested-With': 'XMLHttpRequest'
//       },
//       timeout: 30000
//     }).then(function (res) {
//
//       _this.sites=res.data.sites;
//     });
//
//   },
//   method:{
//     selectSite:function(){
//
//     }
//   }
// }
//
//   function setSessionSite(siteId){
//     $.ajax({
//       url:"/sps/sites/api/setSession/" + siteId,
//       type:"get",
//       success: function (data) {
//         if(data.state){
//           window.location.reload();
//         }
//       }
//     })
//   }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dropdown-menu{
    min-width: 120px;
  }
  .dropdown-menu li a{

  }
  .dropdown-menu>li>a .label{
    width: 100%;
    padding:5px 10px;
    background: #427fed!important;
  }
  .navbar .navbar-inner {
    background: #ff8f32;
  }
  .navbar .navbar-brand{
    padding:0
  }
</style>
