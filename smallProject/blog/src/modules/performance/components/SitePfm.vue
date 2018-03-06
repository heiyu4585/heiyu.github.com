<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="page-breadcrumbs">
      <ul class="breadcrumb">
        <li>
          <i class="fa fa-home"></i>
          <a href="/">主页</a>
        </li>
        <li>
          <a href="/performance/sitePfm">性能监控</a>
        </li>
        <li class="active">站点展示</li>
      </ul>
    </div>
    <div class="page-header position-relative">
      <div class="header-title">
        <h1>
          性能监控
          <small>
            <i class="fa fa-angle-right"></i>
            站点展示
          </small>
        </h1>
      </div>
      <!--Header Buttons-->
      <div class="header-buttons">
        <a class="sidebar-toggler" href="#">
          <i class="fa fa-arrows-h"></i>
        </a>
        <a class="refresh" id="refresh-toggler" href="">
          <i class="glyphicon glyphicon-refresh"></i>
        </a>
        <a class="fullscreen" id="fullscreen-toggler" href="#">
          <i class="glyphicon glyphicon-fullscreen"></i>
        </a>
      </div>
      <!--Header Buttons End-->
    </div>
    <div class="row margin-top-20">
      <div class="col-lg-12">
        <div class="targetButton">
          <div class="btn-group">
          </div>
          <select id="timeSelect" class="form-control">
            <option>时间选择</option>
            <option value="1800000" selected>最新30分钟</option>
            <option value="3600000">最新60分钟</option>
            <option value="10800000">最新3小时</option>
            <option value="43200000">最新12小时</option>
            <option value="86400000">最新1天</option>
            <option value="259200000">最新3天</option>
            <option value="604800000">最新7天</option>
            <option value="0">自定义</option>
          </select>
          <div class="popover bottom " id="customTimePopover">
            <div class="arrow"></div>
            <div class="popover-content">
              <div class="bordered-info ">
                <span>请选择开始时间：</span>
                <input size="16" type="text" value="" readonly
                       class="form_datetime margin-top-10 margin-bottom-10"></br>
                <span>请选择向后的时间跨度：</span>
                <select class="select select-white" id="customTimeSelect">
                  <option value="时间跨度">时间跨度</option>
                  <option value="1800000">30分钟</option>
                  <option value="3600000">60分钟</option>
                  <option value="10800000">3小时</option>
                  <option value="21600000">6小时</option>
                  <option value="43200000">12小时</option>
                  <option value="86400000">1天</option>
                  <option value="259200000">3天</option>
                  <option value="604800000">7天</option>
                </select>
              </div>
              <div class="buttons-preview margin-top-20 text-align-right">
                <button type="button" class="btn btn-blue">确定</button>
                <button type="button" class="btn btn-blue">关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="list-group">
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      网络响应时间
                      <!--<a href="javascript:void(0);"  data-original-title="" title="">-->
                      <!--指标解读 <i class="glyphicon glyphicon-question-sign"></i>-->
                      <!--</a>-->
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="网页载入的时间(domLoading，首字节时间)<br/>[主要影响因素：网络耗时]">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="requestChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      白屏时间
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="指浏览器开始显示内容的时间">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="whiteScreenChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      首屏时间
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="首屏时间，是指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间。">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="firstScreenChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      整体下载时间
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="整页时间（Page Load Time），是指页面完成整个加载过程的时刻。<br/>">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="allTimeChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      浏览器区间
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="浏览器,用户使用的浏览器种类,如 : chrome,safari,Firefox等。">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="browserTypeChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-4">
                    <h4 class="list-group-item-heading text-align-left">
                      系统版本区间
                      <span data-toggle="popover-hover" data-placement="top"
                            data-content="系统版本,用户系统版本号,如 : 'Windows','Linux','Mac','Android','iOS',<br/>'iPhone','iPad'等.">指标解读 <i
                        class="glyphicon glyphicon-question-sign"></i></span>
                    </h4>
                    <div id="osVersionChart" style="width: 100%;height:300px;"></div>
                  </a>
                  <a href="javascript:;" class="list-group-item padding-top-20 col-lg-12">
                    <h4 class="list-group-item-heading text-align-left">
                      访问次数
                    </h4>
                    <div id="visitNumChart" style="width: 100%;height:300px;"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by WangNing on 2017/8/11.
   */

  /*站点展示*/

  let echarts = require('echarts');

export default {
  name: 'sitePfm',
  data () {
    return {
      msg: '这是 sitePfm'
    }
  },
  mounted:function(){
    (function ($) {
      $(function () {
        /*默认的全局参数,用于echarts借口*/
        var todayYear=(new Date()).getFullYear();
        var todayMonth=(new Date()).getMonth();
        var todayDay=(new Date()).getDate();
        var nowTime=(new Date(todayYear,todayMonth,todayDay+1)).getTime();//毫秒 // 取当天的24点
        var configObject ={
          startTime: nowTime - 24*60*60*1000, //默认一天
          endTime: nowTime,
          siteId:1,
          spsPageId:1
        };
        debugger;
        var requestChart = echarts.init(document.getElementById('requestChart'));
        var whiteScreenChart = echarts.init(document.getElementById('whiteScreenChart'));
        var firstScreenChart = echarts.init(document.getElementById('firstScreenChart'));
        var allTimeChart = echarts.init(document.getElementById('allTimeChart'));
        var browserTypeChart = echarts.init(document.getElementById('browserTypeChart'));
        var osVersionChart = echarts.init(document.getElementById('osVersionChart'));
        var visitNumChart = echarts.init(document.getElementById('visitNumChart'));

        /*整体的时间区间选择*/
        $("#timeSelect").on("change", function () {
          var timeInterval = $(this).val()*24*60*60*1000;
          //将nowTime设置为当天的24点
          var todayYear=(new Date()).getFullYear();
          var todayMonth=(new Date()).getMonth();
          var todayDay=(new Date()).getDate();
          var nowTime=(new Date(todayYear,todayMonth,todayDay+1)).getTime();//毫秒
          if (timeInterval == "时间选择") {
            return;
          }
          if (timeInterval === 0) {/*选择自定义*/
            $("#customTimePopover").show();
          } else {
            // var startTime = 0;
            /*时间处理*/
            // switch(parseInt(timeInterval)){
            //     case 43200000:  //最新12小时
            //         startTime =Date.parse(formatterDateTime(new Date().getTime()+3600000).substr(0,14)+":00:00") - parseInt(timeInterval); //取整小时
            //         break;
            //     case 86400000:  //最新1天
            //     case 259200000:  //最新3天
            //     case 604800000:  //最新7天
            //         startTime =Date.parse(formatterDateTime(new Date().getTime()).substr(0,11)+" 00:00:00") - parseInt(timeInterval); //取整天
            //         break;
            //     default:
            //         startTime=  nowTime - parseInt(timeInterval);
            //         break;
            // }
            var   startTime = nowTime - parseInt(timeInterval);
            $("#timeSelect").data("startTime", startTime); //开始时间绑定,共有两个地方绑定
            configObject = Object.assign(configObject,{
              startTime: startTime,
              endTime: startTime+parseInt(timeInterval),
            });
            getBytime({
              siteId:configObject.siteId,
              startTime: configObject.startTime,
            });

            getbrowserTypeOsVersion({
              siteId: configObject.siteId,
              startTime: startTime,
            });
          }
        });
        /*自定义时间后 确认按钮*/
        $("#customTimePopover button:first-of-type").on("click", function () {
          var inputTime=parseInt($("#inputTime").val())*24*60*60*1000;
          var timeInterval = (isNumber(inputTime) && inputTime)|| $("#customTimeSelect").val();//时间间隔
          var startTime =Date.parse($("#customTimePopover .form_datetime").val()); //初始时间
          var nowDate = Date.parse(new Date());  //当前时间
          if (timeInterval == "时间跨度" || !startTime) {
            layer.confirm('请选择开始时间和时间跨度', {
              btn: ['确定'], //按钮
              time: 2000,
            });
            return;
          }
          /*时间处理*/
          // switch(parseInt(timeInterval)){
          //     case 43200000:  //最新12小时
          //         //取整点
          //         startTime =Date.parse(formatterDateTime(Date.parse(startTime)+3600000).substr(0,14)+":00:00");
          //         break;
          //     case 86400000:  //最新1天
          //     case 259200000:  //最新3天
          //     case 604800000:  //最新7天
          //         startTime =Date.parse(formatterDateTime(new Date().getTime()).substr(0,11)+"00:00:00") - parseInt(timeInterval); //取整天
          //         break;
          //     default:
          //         startTime = Date.parse(startTime); //开始时间
          //         break;
          // }
          var endTime = startTime + parseInt(timeInterval);
          if (endTime > nowDate) {
            endTime = startTime + 24*60*60*1000;
            layer.confirm('结束时间已经大于当前时间,时间跨度转化为1天', {
              btn: ['确定'], //按钮
              time: 3000,
            });
          }
          // var str = '查询 '+formatterDateTime(startTime)+' 至 ' +formatterDateTime(endTime);
          // $("#customTimePopover .buttons-preview span").html(str);
          configObject = Object.assign(configObject,{
            startTime: startTime,
            endTime: endTime
          });
          getBytime({
            startTime: configObject.startTime,
            endTime: configObject.endTime
          });
          $("#customTimePopover").hide() //选择窗口隐藏
        });
        /*关闭按钮*/
        $("#customTimePopover button:last-of-type").on("click", function () {
          $("#customTimePopover").hide() //选择窗口隐藏
          $("#timeSelect").val("时间选择")
        })
        //时间选择
        $(".form_datetime").datetimepicker({
          format: 'yyyy-mm-dd hh:ii',
          autoclose: true,
          todayBtn: true,
          startDate: "2017-8-17 10:00",
          minuteStep: 10,
          endDate: formatterDateTime(Date.parse(new Date()) - 3600000)
        });

        /*站点切换*/
        $(".targetButton .btn-group button").click(function () {

          if (!$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active")
          } else {
            return false
          }

          var siteId = $(this).data("siteid");
          configObject = Object.assign(configObject,{
            siteId: siteId
          });
          getBytime({
            siteId: siteId,
            startTime: configObject.startTime
          });
          getbrowserTypeOsVersion({
            siteId: siteId,
            startTime: configObject.startTime
          });
        })

        /*为echarts图标提供数据*/
        function getBytime(options) {
          $.ajax({
            url: "/performance/sitePfm/getByTime",
            method: "get",
            data: $.extend(true, {
              startTime: configObject.startTime,
              endTime: configObject.endTime,
              siteId:configObject.siteId
            }, options),
            success: function (data) {
              // defaultOption.tooltip.formatter = function (params, pos, el, elRect, size) {//数据格式
              //     // var relVal = echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', new Date(+params[0].name)) + "-"+echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', new Date(+params[0].name+data.responseList.intervalTime))+"<br/>";
              //     var relVal = `${echarts.format.formatTime('MM/dd hh:mm', new Date(+params[0].name))} 到 ${echarts.format.formatTime('MM/dd hh:mm', new Date(+params[0].name + data.responseList.intervalTime))}
              //         ${
              //         params.map(function (ele, index) {
              //             return "</br>" + ele.seriesName + ":" + ele.value
              //         })
              //         }<br/>
              //         `;
              //     return relVal;
              // }
              //
              // /*白屏时间*/
              // var whiteTimeOption = $.extend(true, {}, defaultOption, {
              //     xAxis: {
              //         data: data.responseList.xAxisData
              //     },
              //     series: [
              //         {
              //             data: data.responseList.seriesData.whiteTime.average
              //         },
              //         {
              //             data: data.responseList.seriesData.whiteTime.max
              //         },
              //         {
              //             data: data.responseList.seriesData.whiteTime.min
              //         },
              //         {
              //             data: data.responseList.seriesData.whiteTime.num,
              //         }
              //     ]
              // });
              // // whiteTimeOption =$.extend(true,{},whiteTimeOption);
              //
              // /*响应时间*/
              // var requestOption = $.extend(true, {}, defaultOption, {
              //     xAxis: {
              //         data: data.responseList.xAxisData,
              //     },
              //     series: [
              //         {
              //             data: data.responseList.seriesData.requestTime.average
              //         },
              //         {
              //             data: data.responseList.seriesData.requestTime.max
              //         },
              //         {
              //             data: data.responseList.seriesData.requestTime.min
              //         },
              //         {
              //             data: data.responseList.seriesData.requestTime.num,
              //         }
              //     ]
              // });
              // // requestOption =JSON.parse(JSON.stringify(requestOption));
              // // requestOption =$.extend(true,{},requestOption);
              // // requestOption.yAxis[0].max =50;
              //
              // /*首屏*/
              // var firstScreenOption = $.extend(true, {}, defaultOption, {
              //     xAxis: {
              //         data: data.responseList.xAxisData,
              //     },
              //     series: [
              //         {
              //             data: data.responseList.seriesData.firstScreenTime.average
              //         },
              //         {
              //             data: data.responseList.seriesData.firstScreenTime.max
              //         },
              //         {
              //             data: data.responseList.seriesData.firstScreenTime.min
              //         },
              //         {
              //             data: data.responseList.seriesData.firstScreenTime.num
              //         }
              //     ]
              // });
              // // firstScreenOption =$.extend(true,{},firstScreenOption);
              //
              // /*整体下载时间*/
              // var allTimeOption = $.extend(true, {}, defaultOption, {
              //     xAxis: {
              //         data: data.responseList.xAxisData
              //     },
              //     series: [
              //         {
              //             data: data.responseList.seriesData.allTime.average
              //         },
              //         {
              //             data: data.responseList.seriesData.allTime.max
              //         },
              //         {
              //             data: data.responseList.seriesData.allTime.min
              //         },
              //         {
              //             data: data.responseList.seriesData.allTime.num,
              //         }
              //     ]
              // });
              // // allTimeOption =$.extend(true,{},allTimeOption);
              //
              // whiteScreenChart.setOption(whiteTimeOption);
              // requestChart.setOption(requestOption);
              // allTimeChart.setOption(allTimeOption);
              // firstScreenChart.setOption(firstScreenOption);


              var whiteTimeOption = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                    label: {
                      show: true
                    }
                  },
                  formatter:function(params)//数据格式
                  {

                    var relVal = `${
                      echarts.format.formatTime('MM/dd hh:mm', new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-"))).replace("00:00","日")
                      }
                                            到
                                        ${echarts.format.formatTime(
                      'MM/dd hh:mm',
                      new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-")).getTime()+ data.responseList.intervalTime).replace("00:00","日")
                      }
                                        ${
                      params.map(function (ele, index) {
                        return "</br>" + ele.seriesName + ":" + ele.value
                      })
                      }<br/>
                                        `;
                    return relVal;
                  }
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                calculable: true,
                legend: {
                  data: ['Growth', 'Budget 2011', 'Budget 2012'],
                  itemGap: 5
                },
                grid: {
                  top: '12%',
                  left: '10%',
                  right: '10%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: data.responseList.xAxisData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    //   name: '白屏时间（MS）',
                    axisLabel: {
                      formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                          ? echarts.format.addCommas(+a)
                          : '';
                      }
                    }
                  }
                ],
                dataZoom: [
                  {
                    show: true,
                    start: 0,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 0,
                    end: 50
                  }
                ],
                series: [
                  {
                    name: '白屏时间',
                    type: 'line',
                    data:data.responseList.seriesData.allTime.average
                  }
                ]
              };
              var requestOption = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                    label: {
                      show: true
                    }
                  },
                  formatter:function(params)//数据格式
                  {

                    var relVal = `${
                      echarts.format.formatTime('MM/dd hh:mm', new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-"))).replace("00:00","日")
                      }
                                            到
                                        ${echarts.format.formatTime(
                      'MM/dd hh:mm',
                      new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-")).getTime()+ data.responseList.intervalTime).replace("00:00","日")
                      }
                                        ${
                      params.map(function (ele, index) {
                        return "</br>" + ele.seriesName + ":" + ele.value
                      })
                      }<br/>
                                        `;
                    return relVal;
                  }
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                calculable: true,
                legend: {
                  data: ['Growth', 'Budget 2011', 'Budget 2012'],
                  itemGap: 5
                },
                grid: {
                  top: '12%',
                  left: '10%',
                  right: '10%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: data.responseList.xAxisData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    //  name: '响应时间（MS）',
                    axisLabel: {
                      formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                          ? echarts.format.addCommas(+a)
                          : '';
                      }
                    }
                  }
                ],
                dataZoom: [
                  {
                    show: true,
                    start: 0,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 0,
                    end: 50
                  }
                ],
                series: [
                  {
                    name: '响应时间',
                    type: 'line',
                    data:data.responseList.seriesData.requestTime.average
                  }
                ]
              };
              var allTimeOption = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                    label: {
                      show: true
                    }
                  },
                  formatter:function(params)//数据格式
                  {

                    var relVal = `${
                      echarts.format.formatTime('MM/dd hh:mm', new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-"))).replace("00:00","日")
                      }
                                            到
                                        ${echarts.format.formatTime(
                      'MM/dd hh:mm',
                      new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-")).getTime()+ data.responseList.intervalTime).replace("00:00","日")
                      }
                                        ${
                      params.map(function (ele, index) {
                        return "</br>" + ele.seriesName + ":" + ele.value
                      })
                      }<br/>
                                        `;
                    return relVal;
                  }
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                calculable: true,
                legend: {
                  data: ['Growth', 'Budget 2011', 'Budget 2012'],
                  itemGap: 5
                },
                grid: {
                  top: '12%',
                  left: '10%',
                  right: '10%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: data.responseList.xAxisData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    // name: '整体下载时间（MS）',
                    axisLabel: {
                      formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                          ? echarts.format.addCommas(+a)
                          : '';
                      }
                    }
                  }
                ],
                dataZoom: [
                  {
                    show: true,
                    start: 0,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 0,
                    end: 50
                  }
                ],
                series: [
                  {
                    name: '整体下载时间',
                    type: 'line',
                    data:data.responseList.seriesData.allTime.average
                  }
                ]
              };
              var firstScreenOption = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                    label: {
                      show: true
                    }
                  },
                  formatter:function(params)//数据格式
                  {

                    var relVal = `${
                      echarts.format.formatTime('MM/dd hh:mm', new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-"))).replace("00:00","日")
                      }
                                            到
                                        ${echarts.format.formatTime(
                      'MM/dd hh:mm',
                      new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-")).getTime()+ data.responseList.intervalTime).replace("00:00","日")
                      }
                                        ${
                      params.map(function (ele, index) {
                        return "</br>" + ele.seriesName + ":" + ele.value
                      })
                      }<br/>
                                        `;
                    return relVal;
                  }
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                calculable: true,
                legend: {
                  data: ['Growth', 'Budget 2011', 'Budget 2012'],
                  itemGap: 5
                },
                grid: {
                  top: '12%',
                  left: '10%',
                  right: '10%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: data.responseList.xAxisData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    // name: '首屏时间（MS）',
                    axisLabel: {
                      formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                          ? echarts.format.addCommas(+a)
                          : '';
                      }
                    }
                  }
                ],
                dataZoom: [
                  {
                    show: true,
                    start: 0,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 0,
                    end: 50
                  }
                ],
                series: [
                  {
                    name: '首屏时间',
                    type: 'line',
                    data:data.responseList.seriesData.firstScreenTime.average
                  }
                ]
              };
              var visitNumOption = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                    label: {
                      show: true
                    }
                  },
                  formatter:function(params)//数据格式
                  {

                    var relVal = `${
                      echarts.format.formatTime('MM/dd hh:mm', new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-"))).replace("00:00","日")
                      }
                                            到
                                        ${echarts.format.formatTime(
                      'MM/dd hh:mm',
                      new Date((new Date()).getFullYear() +"-"+params[0].name.replace("日"," ").replace("月","-")).getTime()+ data.responseList.intervalTime).replace("00:00","日")
                      }
                                        ${
                      params.map(function (ele, index) {
                        return "</br>" + ele.seriesName + ":" + ele.value
                      })
                      }<br/>
                                        `;
                    return relVal;
                  }
                },

                toolbox: {
                  show: true,
                  feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                calculable: true,
                legend: {
                  data: ['Growth', 'Budget 2011', 'Budget 2012'],
                  itemGap: 5
                },
                grid: {
                  top: '12%',
                  left: '10%',
                  right: '10%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: data.responseList.xAxisData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    // name: '首屏时间（MS）',
                    axisLabel: {
                      formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                          ? echarts.format.addCommas(+a)
                          : '';
                      }
                    }
                  }
                ],
                dataZoom: [
                  {
                    show: true,
                    start: 0,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 0,
                    end: 50
                  }
                ],
                series: [
                  {
                    name: '访问次数',
                    type: 'line',
                    data:data.responseList.seriesData.firstScreenTime.num
                  }
                ]
              };
              /*全部初始化*/
              whiteScreenChart.setOption(whiteTimeOption);
              requestChart.setOption(requestOption);
              allTimeChart.setOption(allTimeOption);
              firstScreenChart.setOption(firstScreenOption);
              visitNumChart.setOption(visitNumOption);
              whiteScreenChart.group = 'group1';
              requestChart.group = 'group1';
              allTimeChart.group = 'group1';
              firstScreenChart.group = 'group1';
              visitNumChart.group = 'group1';
              echarts.connect('group1');
            }
          })
        }

        /*按照站点排序*/
        // function getBySite() {
        //     $.ajax({
        //         url: "/performance/sitePfm/getBySite",
        //         method: "get",
        //         success: function (data) {
        //             if (data) {
        //                 let str = data.responseList.map(function (ele, index) {
        //                     // return `
        //                     //        <a href="#" class="list-group-item ${ele.siteid == 1 ? "active" : ""}" data-siteid="${ele.siteId}">
        //                     //         <div class="progress">
        //                     //             <div class="progress-bar progress-bar-info" role="progressbar"
        //                     //                  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
        //                     //                  style="width: 100%"><span
        //                     //                         class="sr-only">60% Complete (warning)</span>
        //                     //                 <div class="time"><span>${ele.url}</span> <span>${ele.avgAllTime.toFixed(2)}</span></div>
        //                     //             </div>
        //                     //         </div>
        //                     //      </a>
        //                     //     `
        //
        //                     return `
        //                        <a href="#" class="list-group-item ${ele.siteid == 1 ? "active" : ""}" data-siteid="${ele.siteId}">
        //                         <div class="progress">
        //                             <div class="progress-bar progress-bar-info" role="progressbar"
        //                                  aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
        //                                  style="width: 100%"><span
        //                                         class="sr-only">60% Complete (warning)</span>
        //                                 <div class="time"><span>${ele.url}</span> <span></span></div>
        //                             </div>
        //                         </div>
        //                      </a>
        //                     `
        //                 })
        //
        //                 $(".panel-body.widget-content .list-group").html(str);
        //
        //             }
        //         }
        //     })
        // }


        /*系统区间和浏览器区间*/
        function getbrowserTypeOsVersion(options) {
          $.ajax({
            url: "/performance/sitePfm/getbrowserTypeOsVersion",
            method: "get",
            data: $.extend(true, {
              startTime: configObject.startTime,
              endTime: configObject.endTime,
              siteId:configObject.siteId
            }, options),
            success: function (data) {

              var option = {
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: []
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [],
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };

              /*浏览器区间配置*/
              var browserTypeLegendData=[];
              for(var i=0;i<data.responseList.browserType.length;i++){
                browserTypeLegendData.push(data.responseList.browserType[i].name)
              }
              var browserTypeOption = $.extend(true,{},option);
              browserTypeOption.legend.data= browserTypeLegendData;
              browserTypeOption.series[0].data= data.responseList.browserType;
              browserTypeChart.setOption(browserTypeOption);

              /*系统版本号参数配置*/
              var osVersionLegendData=[];
              for(var i=0;i<data.responseList.osVersion.length;i++){
                osVersionLegendData.push(data.responseList.osVersion[i].name)
              }
              var osVersionOption = $.extend(true,{},option);
              osVersionOption.legend.data= osVersionLegendData;
              osVersionOption.series[0].data= data.responseList.osVersion;
              osVersionChart.setOption(osVersionOption);
            }
          })
        }
        /*初始化*/
        getBytime();
        getbrowserTypeOsVersion();
      })
    })(jQuery);
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
