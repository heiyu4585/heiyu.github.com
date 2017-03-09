
/**
 * @Desc：点击查看大图功能
 * @Usage:   picShow({
 *              getDataType: "DOM",
 *               domId: ".docInt",
 *               swiperToggle: ".detials_doc", //swiper显示时,需要隐藏的div
 *               isComont:true  //是否有同级元素
 *                  })
 * @Notify：
 *     1.从dom结构中获取对应url数组
 *    2.从接口获取对应的url数组
 *    3. swiperToggle 显示swiper 需要隐藏的div,针对swiper 请添加在.swiper-wrapper || .swiper-container"
 *    4.如果轮播图内的点击查看大图,请在调用轮播图初始化前调用 (或者 swiper图片加载完成事件)
 * @Depend：jquery
 *          swiper.jquery.min.js
 *          swiper-3.3.1.min.css
 *          showBigImg.css
 *
 * Created by WangNing on 2017/2/21.
 */

var picShow = {
    options: {
        getDataType: "DOM",
        domId: ".docInt",
        swiperToggle: ".detials_doc", //swiper显示时,需要隐藏的div
        // isSwiper: false
    },
    init: function (options) {
        // options = Object.assign({}, defaultOptions, options);
        this.options = $.extend(this.options, options);
        switch (options.getDataType) {
            case "DOM":
                this.addSwiperWrapper();
                break;
            case "AJAX":
                this.getAjaxData();
                break;
        }
    },
    getDomData: function () {
        //针对swiper 因为swiper 会动态将第一个图片复制一份添加到末尾
        return $(this.options.domId + " img");
    },
    getAjaxData: function () {
        medCommon.getData({
            url: this.options.ajaxUrl,
            type: "get",
            params: {paramJson: JSON.stringify({refId: window.location.href})},
            sucFn: function (data) {
                if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.data_list) {
                    picShow.template.top(data.responseObject.responseData.data_list);
                    picShow.swiperInit();
                }
            }
        });
    },
    addSwiperWrapper: function () {
        /**
         * 解决ex3:
         * */
        var _this = this;
        // $(this.options.domId).each(function(index,ele){
        // var  imgS =  $(ele).find("img");
        //         for (var i = 0; i < imgS.length; i++) {
        //             $(imgS[i]).data("index",i).off("click").on("click", function () {
        //                 //关闭后返回当前滚动位置
        //                 var windowScrollY = window.scrollY;
        //                 $("#EV-swiper").length && $("#EV-swiper").remove();
        //                 var str = "";
        //                 for (var i = 0; i < imgS.length; i++) {
        //                     str += '<div class="swiper-slide"><img src=' + imgS[i].src + ' /></div>';
        //                 }
        //                 _this.adSwiperDom(str);
        //                 $(_this.options.swiperToggle).hide();
        //                 _this.swiperInit($(this).data("index"));
        //                 $("#EV-swiper .closeBtn").on("click", () => {
        //                     $(_this.options.swiperToggle).show();
        //                     $("#EV-swiper").remove();
        //                     window.scrollTo(0, windowScrollY)
        //                 });
        //             })
        //         }
        //     });
        /**
         * end 解决ex3
         * */
        var imgS = _this.getDomData();
        for (var i = 0; i < imgS.length; i++) {
             $(imgS[i]).data("isComont", this.options.isComont).data("index",i).off("click").on("click", function () {

                $("#EV-swiper").length && $("#EV-swiper").remove();
                var isComont = $(this).data("isComont");
                var str = "";
                debugger;
                if (isComont) {
                    imgS = $(this).parents(_this.options.domId).find("img");
                }
                for (var i = 0; i < imgS.length; i++) {
                    str += '<div class="swiper-slide"><img data-index="'+i+'" src=' + imgS[i].src + ' /></div>';
                }
                _this.adSwiperDom(str);
                $(_this.options.swiperToggle).hide();
                //评论内部
                 _this.swiperInit($(this).data("index"));
                $("#EV-swiper .closeBtn").on("click",function() {
                    $(_this.options.swiperToggle).show();
                    $("#EV-swiper").remove();
                });
            })
        }
    },
    adSwiperDom: function (str) {
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
    },
    swiperInit: function (index) {
        var galleryTop = new Swiper('.gallery-top', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
            touchRatio: .5,
            initialSlide: index,
            pagination: '.EV-gallery-top',
            paginationType: 'fraction',
            observer: true
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
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
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
};
//点击查看大图
picShow.init({
    getDataType: "DOM",
    domId: ".docInt",
    swiperToggle: ".detials_doc" //swiper显示时,需要隐藏的div
    // ajaxUrl:"",
});
picShow.init({
    getDataType: "DOM",
    domId: ".productSwiper",
    swiperToggle: ".detials_doc" //swiper显示时,需要隐藏的div
    // ajaxUrl:"",
});
picShow.init({
    getDataType: "DOM",
    domId: ".talkImgMore",
    swiperToggle: ".detials_doc", //swiper显示时,需要隐藏的div
    isComont:true
    // ajaxUrl:"",
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