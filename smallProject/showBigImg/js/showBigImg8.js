/**
 * Created by 王 on 2017/2/26.
 *   * * 8.事件应该绑定在哪个元素上
 *      -需要点击的img
 *      -img的父级元素
 *      --body
 *
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
    options:{

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
        /**
         * 解决ex5:
         * */
        var _this = this;
        for(var j=0;j<domIdList.length;j++){
            $(domIdList[j]).each(function(index,ele){
               var  imgS =  $(ele).find("img").each(function(index,ele){
                   $(ele).data("index",index);
               });
                /**
                 * 问题8:元素绑定位置
                 * */
                $(ele).on("click","img",function(event){
                   // var index = $(event.target).index("img");
                   var index = $(this).data("index");
                    var windowScrollY = window.scrollY;
                    $("#EV-swiper").length && $("#EV-swiper").remove();
                        var str="";
                        for (var i = 0; i < imgS.length; i++) {
                            str += '<div class="swiper-slide"><img src=' + imgS[i].src + ' /></div>';
                        }
                            _this.addSwiperDom(str,index);
                            _this.addBindClose(windowScrollY)
                });
                /**
                 * end 问题8
                 * */

            });
        }

    },

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
        this.swiperInit(index);
        $("#EV-swiper").siblings().hide();
    },
    /*
     * 绑定关闭事件
     * */
    addBindClose:function(windowScrollY){
        $("#EV-swiper .closeBtn").on("click", function(){
            $("#EV-swiper").siblings().show();
            $("#EV-swiper").remove();
            //关闭后返回当前滚动位置
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
            initialSlide: index,
            spaceBetween: 10,
            centeredSlides: true,
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
//点击查看大图
picShow.init({
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
        // loop: true, // 开启循环模式,必须设置loopedSlides
        // loopedSlides: 5, //looped slides should be the same
        onInit:function(){
            console.log("sipwer初始化完成!")
        },
        // preventClicks : false,//当swiper在触摸时阻止默认事件（preventDefault），用于防止触摸时触发链接跳转。
        onTap:function(swiper,event){
            console.log(swiper.activeIndex);
            console.log(swiper.realIndex);
        },
        onSlideChangeStart(swiper){ //滑块释放时如果触发slider切换则执行
            console.log(swiper.activeIndex);
            console.log(swiper.realIndex);
        }
    },
    bottomSwiperOptions:{
        // loop: true, // 开启循环模式,必须设置loopedSlides
        // loopedSlides: 5, //looped slides should be the same
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