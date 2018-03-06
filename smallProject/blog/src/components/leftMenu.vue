<template>
  <ul class="nav sidebar-menu jq_module-list">
    <li>
      <a href="/"><i class="fa fa-fw fa-table"></i>
        <span class="menu-text">首页</span></a>
    </li>
  </ul>
</template>

<script>
  $(function(){
    //获取可操作列表
    var initAuth= {
      data: {
        initModuleListUrl: '/auth/gua/listModuleUseId/',
        $moduleLIst: $(".jq_module-list")
      },
      callListModule: function(callMenu){
        this.listModule(); //列出当前人所有模块
        this.openMenu(); //打开当前选中菜单组
        this.rightBottomFloatPlugins(); //右下角悬浮插件

        $(".navbar-nav li a").each(function (i, d) {
          if(window.location.href.indexOf($(d).attr("href"))>-1){
            $(d).parent().addClass("active");
          }
        })
      },
      ajax: function(url,data, type){
        if(!data){data= {}};
        if(!type){type= "get"};
        return $.ajax({url: url, data: data,type: type,async:false}).responseJSON;
      },
      listModule: function(data){
        var html= '',sysHtml= '',authHtml= '', _this= this;
        var data= this.ajax(this.data.initModuleListUrl,{},"post");

        localStorage.setItem('menu', JSON.stringify(data));//共享给首页数据

        if(data.result.exist){
          var kv= data.result.data, i= 1;
          for(var x=0; x<kv.length; x++){
            if(kv[x].id === 51){ //沉底51
              sysHtml= _this.template(kv[x], i++);
            }else if(kv[x].id === 40){ //倒数第二40
              authHtml= _this.template(kv[x], i++);
            }else{
              html+= _this.template(kv[x], i++);
            }
          };
          _this.data.$moduleLIst.append(html+authHtml+sysHtml);
        }else{
          alert('暂无模块，请先定义模块！联系平台管理员！');
        }
      },
      openMenu: function(){
        var pathName= location.pathname.split("/")[1];
        $("[data-target='#"+pathName+"']").parent().addClass("open").find("ul").show();
        $("[href='"+location.pathname+"']").parent().addClass("active"); //置亮当前值
      },
      rightBottomFloatPlugins: function(){
        layui.use('util', function(){
          var util = layui.util;
          //执行
          util.fixbar({
            bar1: true
            ,click: function(type){
              console.log(type);
              if(type === 'bar1'){
                location.href="/"
              }
            }
          });
        });
      },
      template: function(kv){
        var html= '', subHtml= '';
        if(typeof kv.module_name === 'undefined'){ return html; } //如果主体不存在，子模块不需要查找，直接禁用.

        if(typeof kv.children !== "undefined"){ //当有子模块时
          for(var x=0;x<kv.children.length; x++){subHtml+= this.subtemplate(kv.children[x]);}
        }

        html= '<li>'+
          '<a href="javascript:;" class="menu-dropdown" data-target="'+kv.module_path+'">'+
          '<i class="fa fa-fw '+kv.module_icon+'"></i>'+
          '<span class="menu-text">'+kv.module_name+'</span>'+
          '<i class="menu-expand"></i>'+
          '</a>'+
          '<ul class="submenu" id="sps">'+subHtml+'</ul>'+
          '</li>';
        return html;
      },
      subtemplate: function(kv){
        var cutName= kv.module_name.substr(kv.module_name.split("-")[0].length+1);
        var subHtml= '<li>'+
          '<a href="'+kv.module_path+'"><i class="fa fa-fw '+kv.module_icon+'"></i><span class="menu-text">'+cutName+'</span></a>'+
          '</li>';
        return subHtml;
      }
    }

    initAuth.callListModule();


  });
  export default {
    name: 'LeftMenu',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted:function(){
      $("body").append("  \<script src=\"/assets/js/beyond.min.js\"><\/script>")
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .submenu a:hover .fa-fw {
    font-size: 16px;
    vertical-align: -2px;
  }
  .submenu a:hover span{
    font-size: 15px;
  }
</style>
