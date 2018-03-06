<template>
  <div id="app">

<!--topNav-->
    <div class="navbar">
      <div class="navbar-inner">
        <div class="navbar-container">
          <div class="navbar-header pull-left">
            <a href="/" class="navbar-brand">
              <img src="/images/logo.png" alt="" height="40"/>
              <small>
                <!--<img src="assets/img/logo.png" alt="" />-->

              </small>
            </a>
          </div>
          <div></div>
          <div class="sidebar-collapse" id="sidebar-collapse">
            <i class="collapse-icon fa fa-bars"></i>
          </div>
        </div>

        <div style="height:45px;width:50px;" class="pull-right padding-top-10 ">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><i class="fa fa-user"></i>  <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <!--<li>-->
            <!--<a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#"><i class="fa fa-fw fa-envelope"></i> Inbox</a>-->
            <!--</li>-->
            <li>
              <a href="/auth/pwd"><i class="fa fa-fw fa-gear"></i>密码修改</a>
            </li>
            <li>
              <a href="/logout"><i class="fa fa-fw fa-power-off"></i>退出</a>
            </li>
          </ul>

        </div>
        <div class="btn-group  pull-right" style="margin: 5px 10px">
          <label style="margin-top: 6px;color:white">&nbsp;&nbsp;当前登陆用户：<%= user.login_name %></label>
          <a class="btn btn-default " href="javascript:void(0);">
            <%if(session_site){%><%=session_site.siteName%><%}else{%><i class="fa fa-bell"></i>选择站点<%}%>
          </a>
          <a class="btn btn-default  dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);"><i class="fa fa-angle-down"></i></a>
          <ul class="dropdown-menu" style="right: auto;">
            <% if(local_siteList.length>0) { %>
            <% local_siteList.forEach(function(site){%>
            <li>
              <a href="javascript:void(0)" onclick="setSessionSite(<%=site.siteId%>)"><span class="label label-default"><%=site.siteName%></span></a>
            </li>
            <% }); %>
            <% }%>
            <!--<li class="divider"></li>-->
            <!--<li>-->
            <!--<a href="javascript:void(0);">Separated link</a>-->
            <!--</li>-->
          </ul>
        </div>

      </div>

    </div>
<!--topNav-->

<div class="main-container container-fluid">
    <div class="page-container">
        <!-- Page Sidebar -->
        <div class="page-sidebar" id="sidebar">
            <%- include("includes/left-menu.ejs") %>
        </div>

        <div class="page-content">
            <%- body %>
        </div>
    </div>

    <%- include('includes/footer'); %>

</div>

  </div>
</template>

<script>
  // import 'common/css/reset.css';
  // import Hello from 'components/Hello/Hello'

  // export default {
  //   name: 'app',
  //   components: {
  //     Hello
  //   }
  // }
</script>

<style>
/*topNav*/
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

/*topNav*/
</style>
