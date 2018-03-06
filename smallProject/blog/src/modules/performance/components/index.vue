<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

  /*站点展示*/
  //<!--<script src="/javascripts/plugins/echarts/echarts.js">-->
  //<!--<script src="/javascripts/plugins/bootstrap/bootstrap-datetimepicker.min.js">
  //   import {echarts} from '/javascripts/plugins/echarts/echarts.js' //注意路径
  let echarts = require('echarts');

  export default {
    name: 'sitePfm',
    data () {
      return {
        msg: '这是 s首页正文'
      }
    },
    mounted:function(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
