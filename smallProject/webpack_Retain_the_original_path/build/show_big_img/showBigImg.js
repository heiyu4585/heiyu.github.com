/**
 * @Desc：点击查看大图
 * @Params：{Object}
 *             {
 *             domIdList:[],  //指定元素内容的img为数据源
 *             ajaxOptions:{},  //ajax为数据源时的配置项
 *             topSwiperOptions:{}, //头部swiper配置项
 *             bottomSwiperOptions:{}, //底部swiper配置项
 *             closeCallBack:function(){} //关闭按钮回调
 *             },
 *             swiperToggle:".detials_doc", //需要隐藏显示的同级元素
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
require('./showBigImg.scss');
;(function(){
    var bigPicShow = {
        init: function (options) {
            if(options.domIdList && options.ajaxOptions){
                throw new Error("请只选择一种获取数据源方式");
            }
            options.domIdList && this.addByDom(options);
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
        addByDom: function (options) {
            var _this = this;
            /**
             * 按数组传递多个指定class || ID
             * */
            $(options.domIdList).each(function(index,listImg){
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
                            $("#EV-swiper").length && $("#EV-swiper").remove();
                            _this.addSwiperDom(str,index);
                            _this.addBindClose()
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
        },
        /**
         * 绑定关闭事件
         * */
        addBindClose:function(){
            $("#EV-swiper .closeBtn").on("click", function(){
                /**
                 * 移除EV-swiper
                 * */
                $("#EV-swiper").remove();
                /**
                 *  关闭后回调事件
                 * */
                typeof this.options.closeCallBack=="function" && this.options.closeCallBack();
            }.bind(this));
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
    window.bigPicShow = bigPicShow;
}());


