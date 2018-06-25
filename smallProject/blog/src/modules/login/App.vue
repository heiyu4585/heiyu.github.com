<template>
  <div class="wrapper">
    <div class="login-container ">
      <div class="alert alert-danger">{{error}}</div>
      <form class="form-signin" method="post" action="/login" style="-webkit-box-shadow: 0 0 14px rgba(0,0,0,.1);-moz-box-shadow: 0 0 14px rgba(0,0,0,.1);box-shadow: 0 0 14px rgba(0,0,0,.1)">
        <h2 class="form-signin-heading">阿尔萨斯平台133333333</h2>
        <div>
          <label class="" for="username">用户名：</label>
          <input id="username" type="text" class="form-control" name="username" placeholder="Login username" required="" autofocus="" />
        </div>
        <div style="padding-top:20px;">
          <label class="" for="password">密码：</label>
          <input id="password" type="password" class="form-control" name="password" placeholder="Password" required=""/>
        </div>
        <label class="checkbox">
          <input type="checkbox" class="colored-success" value="remember-me" id="rememberMe" name="rememberMe" checked>
          <span class="text">Remember me</span>
        </label>
        <button class="btn btn-lg btn-primary btn-block" type="submit"><i class="fa fa-pagelines"></i>&nbsp;&nbsp;登陆&nbsp;&nbsp;</button>
      </form>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  export default {
    name: 'app',
    components: {
    },
    data() {
      return{
        error:""
      }
    },
    mounted(){
      //   var i =1;
      //   setInterval(function () {
      //       console.log(i++);
      //   },300);
      // axios({
      //   url:"/api/login",
      //   method:"post",
      //   data:{
      //     scene:2,
      //     visitSiteId:2,
      //     pageIndex:this.index,
      //     pageSize:10
      //   },
      //   transformRequest:[data=>{
      //     return "paramJson=" + JSON.stringify(data);
      //   }],
      //   header:{
      //     "X-Requested-with":"XMLHttpRequest"
      //   },
      //   timeout:30000
      // }).then((res)=>{
      //   console.log(res.data)
      // })

    }
  }
</script>

<style>

</style>
