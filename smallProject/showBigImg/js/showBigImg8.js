/**
 * Created by 王 on 2017/2/26.
 * 优化后版本
 */

var picShow = {
    init: function (options) {
        if(options.domIdList && options.ajaxOptions){
            throw new Error("请只选择一种获取数据源方式");
        }
        options.domIdList && this.addByDom(options.domIdList);
        options.ajaxOptions && this.getAjaxData(options.ajaxOptions);
        this.options = options;
    },
    getAjaxData: function (ajaxOptions) {
       var defaultOptions ={
            url: "",
            type: "get",
            data: "",
            error: function (xhr) {
                $.error("error : " + xhr.status + " " + xhr.statusText);
            },
            success: function (data) {
                if(data){
                    console.log(data);
                }
            }.bind(this),
            complete: function (XMLHttpRequest, textStatus) {

            }
        };
        $.ajax($.extend({} , defaultOptions,ajaxOptions)).done(function(){
            this.addBindClose(window.scrollY);
        }.bind(this));
    },
    addByDom: function (domIdList) {
        var _this = this;
        /**
         * 按数组传递多个指定class || ID
         * */
            $(domIdList).each(function(index,listImg){
                /**
                 * 页面内存在多个指定父元素的class时,再循环一次
                 * */
                $(listImg).each(function(index,element){
                    var str="";
                    /**
                     * 为每个img绑定事件
                     * */
                    $(element).find("img:not(.notShow)").each(function(index,ele){
                        //为每个图片绑定对应索引
                        $(ele).data("index",index);
                        str += '<div class="swiper-slide"><img src=' + ele.src + ' /></div>';
                        $(ele).on("click",function(event){
                            var index = $(this).data("index");
                            var windowScrollY = window.scrollY;
                            $("#EV-swiper").length && $("#EV-swiper").remove();
                            _this.addSwiperDom(str,index);
                            _this.addBindClose(windowScrollY)
                        });
                    });
                })
            });
    },
    /**
     * 拼接swiper结构并初始化
     * */
    addSwiperDom: function (str,index) {
        var swiperDom =
            '<div id="EV-swiper">' +
            '  <div class="swiper-container gallery-top">' +
            '      <div class="swiper-wrapper">' +
            str +
            '      </div>' +
            '      <div class="swiper-button-next swiper-button-white"></div>' +
            '      <div class="swiper-button-prev swiper-button-white"></div>' +
            '      <div class="swiper-pagination EV-gallery-top"></div>' +
            '      </div>' +
            '      <div class="swiper-container gallery-thumbs">' +
            '      <div class="swiper-wrapper">' +
            str +
            '      </div>' +
            '      <!-- Add Pagination -->' +
            '      <div class="swiper-pagination EV-gallery-thumbs"></div>' +
            '      </div>' +
            '      <div class="closeBtn"></div>' +
            '      </div>';
        $("body").append(swiperDom);
        //swiper初始化
        this.swiperInit(index);
        /**
         * 同级元素隐藏
         * */
        $("#EV-swiper").siblings().hide();
    },
        /**
         * 绑定关闭事件
         * */
    addBindClose:function(windowScrollY){
        $("#EV-swiper .closeBtn").on("click", function(){
            $("#EV-swiper").siblings().show();
            $("#EV-swiper").remove();
            /**
             *  关闭后返回当前滚动位置
             * */

            window.scrollTo(0, windowScrollY)
        });
    },
    swiperInit: function (index) {
        var defaultTop ={
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
            touchRatio: 1,
            initialSlide: index,
            pagination: '.EV-gallery-top',
            paginationType: 'fraction',
            observer: true
        };
        var galleryTop = new Swiper('.gallery-top', $.extend({} , defaultTop,this.options.topSwiperOptions)
        );
        var defaultBottom ={
            initialSlide: index,   //初始化时的索引
            spaceBetween: 10,       //活动块居中
            centeredSlides: true,   //，活动块会居中，
            slidesPerView: 'auto',  // 设置slider容器能够同时显示的slides数量(carousel模式)。
                                    // 可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。
            touchRatio: 1,          //触摸距离与slide滑动距离的比率。
            slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
            observer: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            pagination: '.EV-gallery-thumbs', ///分页器容器的css选择器或HTML标签
        };

        var galleryThumbs = new Swiper('.gallery-thumbs', $.extend({} , defaultBottom,this.options.bottomSwiperOptions) );
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
};
/**
 * @Desc：点击查看大图
 * @Params：{Object}
 *             {
 *             domIdList:[],  //指定元素内容的img为数据源
 *             ajaxOptions:{},  //ajax为数据源时的配置项
 *             topSwiperOptions:{}, //头部swiper配置项
 *             bottomSwiperOptions:{} //底部swiper配置项
 *             }
 *
 * @Return：no
 * @Usage: picShow.init({
     *             domIdList:[],
     *             topSwiperOptions:{},
     *             bottomSwiperOptions:{}
 *                      })
 *Notify:domIdList和ajaxOptions指定传其一.
 *       不想要被计算在的img添加样式 notShow会被自动排除
 * Depend:  *  jquery.js
*             swiper.jquery.min.js
*             swiper-3.3.1.min.css
 *            showBigImg.css
 * Created by 王宁 on 2017/3/2
 */

picShow.init({
    /**
     * 指定多个class|| ID
     * */
    domIdList:[ ".docInt",".productSwiper",".talkImgMore"],
    // ajaxOptions:{
    //     beforeSend: function (XHR) {
    //         console.log("发送之前");
    //     },
    //     url:"imgListData.json",
    //     data:{
    //         "sessionCustomerId":0,
    //         "visitSiteId":9,
    //         "recommendPosition":2
    //     },
    //     success:function(data){
    //         if(data){
    //             var str="";
    //             for (var i = 0; i < data.adList.length; i++) {
    //                 str += '<div class="swiper-slide"><img src=' + data.adList[i].adAttUrl + ' /></div>';
    //             }
    //             picShow.addSwiperDom(str);
    //         }
    //         //callBack();
    //     }
    // },
    topSwiperOptions:{
         loop: true, // 开启循环模式,必须设置loopedSlides
         loopedSlides: 5, //looped slides should be the same
        //initialSlide:2, //设定初始化时slide的索引。
        autoplay : 5000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
        width:800, //强制Swiper的宽度，当你的Swiper在隐藏状态下初始化时才用得上。这个参数会使自适应失效。
        height:500,//强制Swiper的高度，当你的Swiper在隐藏状态下初始化时才用得上。这个参数会使自适应失效。
        preventClicks:false,//当swiper在触摸时阻止默认事件（preventDefault），用于防止触摸时触发链接跳转。
        pagination : '.swiper-pagination', //分页器
        /**
         * ‘bullets’  圆点（默认）
         ‘fraction’  分式
         ‘progress’  进度条
         ‘custom’ 自定义
         * */
        paginationType : 'fraction',
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',//前进按钮的css选择器或HTML元素。
        onInit:function(){     //回调函数，初始化后执行。
            console.log("sipwer初始化完成!")
        },
        /**
         * 回调函数，当你轻触(tap)Swiper后执行。在移动端，click会有 200~300 ms延迟，所以请用tap代替click作为点击事件。
        * */
        onTap:function(swiper,event){
            console.log(swiper.activeIndex); //swiper当前的活动块的索引
            console.log(swiper.realIndex);//swiper当前的活动块的真实索引,排除loop模式下添加的滑块DOM
            console.log(swiper.clickedIndex);//返回最后点击Slide的索引。(click)
            swiper.stopAutoplay();    //停止自动切换
            swiper.startAutoplay();    //开始自动切换
        },
        onSlideChangeStart:function(swiper){ //滑块释放时如果触发slider切换则执行
            console.log(swiper.activeIndex);
            console.log(swiper.realIndex);
        }
    },
    bottomSwiperOptions:{
         loop: true, // 开启循环模式,必须设置loopedSlides
         loopedSlides: 5, //looped slides should be the same
    }
});


var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: 5000,//可选选项，自动滑动,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplayDisableOnInteraction: false, //用户操作后,继续自动轮播
    slidesPerView: 3,
    spaceBetween: 5,
});