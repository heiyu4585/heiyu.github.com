/**
 * Created by 王 on 2017/2/26.
 */
/**
 * Created by wangning on 2016/10/17.
 * 依赖 jquery
 *      swiper.jquery.min.js
 *      swiper-3.3.1.min.css
 * 参数options
 *   getDataType:   1.从dom结构中获取对应url数组
 *                  2.从接口获取对应的url数组
 *                  3. swiperToggle 显示swiper 需要隐藏的div,针对swiper 请添加在.swiper-wrapper || .swiper-container"
 *                  4. // isCommit: false 是否为评论
 *                  5.如果轮播图内的点击查看大图,请在调用轮播图初始化前调用 (或者 swiper图片加载完成事件 未验证)
 */
/**
 * 一.事件应该绑定在哪个元素上
 *      -需要点击的img
 *      -img的父级元素
 *      --body
 * 二.获取数据源的方式:
 * 1.通过domn的id/class/tag 在插件功能内获取对应的数据
 *      获取数据的方式:
 *      --通过给父元素及本身添加class
 *      --通过jquery方式去  $("this").parents("div").find("img")
 *                               $("this").parents("div").children("img")   //仅是元素一下级的子元素
 *
 *         遇到的问题
 *         一):不同的场景需要的jquery方法不一致
 *        ex1:理解情况
 *        <div>
 *            <img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt="">
 *            <img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt="">
 *        <div>
 *        ex2:  父级元素结构不同
 *        <p><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></p>
 *         <p><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></p>
 *         <img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt="">
 *       ex3:  //查询返回多个结果的时候,通过 talkImgMore 获取时,会获取多个.并且索引值会不正确
 *                      解决方法:多传递一个参数,去区分业务场景,不够优雅.如何更加优雅
 *              // 父级元素内,包含不需要输出的内容
 *       <ul class="talkImgMore clear">
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li class="talkMorLi">
 <img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt="">
 <div class="layer"></div>
 <p>还有<span>12</span>张<i></i></p>
 </li>
 </ul>
 *       <ul class="talkImgMore clear">
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li><img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt=""></li>
 <li class="talkMorLi">
 <img src="//m.medplus.net/image/details/video/pinglun02.jpg" alt="">
 <div class="layer"></div>
 <p>还有<span>12</span>张<i></i></p>
 </li>
 </ul>
 * 2.在插件外部获取好数据后,传入功能,进行输出
 *       1).dom结构方式
 *       2).ajax方式
 * 3.提交数据的方式/参数
 *       1).以数组提交
 *       2).以对象方式提交
 * 3.callBack
 *      都需要哪些
 *       *       onInit: function(swiper){
     *            //Swiper初始化了
                    //alert(swiper.activeIndex);提示Swiper的当前索引
     }              //回调函数，初始化后执行。

 * 4. swiper 配置
 *      (mySwiper.clickedIndex)  //返回最后点击Slide的索引。(click)
 *      mySwiper.stopAutoplay()    //停止自动切换
 *      mySwiper.startAutoplay()    //开始自动切换

 * 5,是否可以多个点击查看大图,只调用一次
 *
 *
 *
 *
 * 6.以何种方式更新
 *      --添加多个swiperDOM结构,进行隐藏/显示切换
 *      --remove当前的swiperDOM结构,重新添加,并初始化
 --删除当前swiper-slider(内部滑块),重新添加并重新初始化(mySwiper.update(updateTranslate)
 * 7.
 * 8.
 *
 * */


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
        $(this.options.domId).each(function(index,ele){
        var  imgS =  $(ele).find("img");
                for (var i = 0; i < imgS.length; i++) {
                    $(imgS[i]).data("index",i).off("click").on("click", function () {
                        //关闭后返回当前滚动位置
                        var windowScrollY = window.scrollY;
                        $("#EV-swiper").length && $("#EV-swiper").remove();
                        var str = "";
                        for (var i = 0; i < imgS.length; i++) {
                            str += '<div class="swiper-slide"><img src=' + imgS[i].src + ' /></div>';
                        }
                        _this.adSwiperDom(str);
                        $(_this.options.swiperToggle).hide();
                        _this.swiperInit($(this).data("index"));
                        $("#EV-swiper .closeBtn").on("click", () => {
                            $(_this.options.swiperToggle).show();
                            $("#EV-swiper").remove();
                            window.scrollTo(0, windowScrollY)
                        });
                    })
                }
            });
        /**
         * end 解决ex3
         * */

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