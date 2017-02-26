/**
 * Created by 王 on 2017/2/26.
 *  * 5.是否可以多个点击查看大图,只调用一次
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
               var  imgS =  $(ele).find("img");
                for (var i = 0; i < imgS.length; i++) {
                    var windowScrollY = window.scrollY;
                    $(imgS[i]).data("index",i).off("click").on("click", function () {
                        $("#EV-swiper").length && $("#EV-swiper").remove();
                        var str="";
                        for (var i = 0; i < imgS.length; i++) {
                            str += '<div class="swiper-slide"><img src=' + imgS[i].src + ' /></div>';
                        }
                        _this.addSwiperDom(str,$(this).data("index"));
                        _this.addBindClose(windowScrollY)
                    })
                }
            });
        }
        /**
         * end 解决ex5
         * */
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
            touchRatio: .5,
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
            slideToClickedSlide: true,
            paginationClickable: true,
            observer: true,
            pagination: '.EV-gallery-thumbs'
        };


        var galleryThumbs = new Swiper('.gallery-thumbs', $.extend({} , defaultTop,this.options.topSwiperOptions) );
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
};
//点击查看大图
picShow.init({
    // domIdList:[ ".docInt",".productSwiper",".talkImgMore"],
    ajaxOptions:{
        beforeSend: function (XHR) {
            console.log("发送之前");
        },
        url:"imgListData.json",
        data:{
            "sessionCustomerId":0,
            "visitSiteId":9,
            "recommendPosition":2
        },
        success:function(data){
            if(data){
                var str="";
                for (var i = 0; i < data.adList.length; i++) {
                    str += '<div class="swiper-slide"><img src=' + data.adList[i].adAttUrl + ' /></div>';
                }
                picShow.addSwiperDom(str);
            }
            //callBack();
        }
    },
    topSwiperOptions:{

    },
    bottomSwiperOptions:{
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