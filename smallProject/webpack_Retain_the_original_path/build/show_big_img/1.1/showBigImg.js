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
 *              imgClickCallBack:function {} //为每个图片增加点击回调函数
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
            this.options = options;
            /*
            * 未设置isInit 为false,则默认未true
            * */
            this.options.bottomSwiperOptions.isInit != false &&   (this.options.bottomSwiperOptions.isInit= true);
            this.options.topSwiperOptions.isInit != false &&   (this.options.topSwiperOptions.isInit= true);
            /**
             * 判断是否传递了 swiperList,没传递去dom获取,获取了直接添加
             * */
             if (options.swiperList) {
                 this.addSwiperDom(options.swiperList, options.index || 0);
                 this.addBindClose(window.scrollY)
             } else {
                options.domIdList && this.addByDom(options);
             }
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
                        str += '<div class="swiper-slide"><img src=' + ele.src.replace(/_t_\d{3}_\d{3}/,"") + ' /></div>';
                        $(ele).on("click",function(event){
                            var index = $(this).data("index");
                            /**
                             * 为每个图片添加点击回调事件
                            * */
                            typeof options.imgClickCallBack == "function" && options.imgClickCallBack(index,ele);
                            if($("#EV-swiper").length){
                                $("#EV-swiper").remove();
                                $('video,.video-js').css('opacity',1);
                            }
                            _this.addSwiperDom(str, index);
                            _this.addBindClose();
                            _this.addRotate();
                            _this.addScale();
                        });
                    });
                })
            });
        },
        /**
         * 拼接swiper结构并初始化
         * */
        addSwiperDom: function (swiperList, index) {

            var swiperDom =  '<div id="EV-swiper">' ;
            if(this.options.topSwiperOptions.isInit){
                swiperDom+= '<div class="swiper-container gallery-top' ;
                if(!this.options.bottomSwiperOptions.isInit){
                    swiperDom+= " only-top-swiper";
                }
                swiperDom+='"><div class="swiper-wrapper">' +
                    //  swiperList+
                    '      </div>' +
                    //'      <div class="swiper-button-next  swiper-left-gray"></div>' +
                    //'      <div class="swiper-button-prev  swiper-right-gray"></div>' +
                    '      <div class="swiper-pagination EV-gallery-top"></div>' +
                    '      </div>';
            }
                /**
                 * 底部swiper列是否需要初始化,不需要则不添加dom结构
                 * */
                if(this.options.bottomSwiperOptions.isInit ){
                    swiperDom+='<div class="swiper-container gallery-thumbs"><div class="swiper-wrapper">' +
                        '      </div>' +
                        '      <!-- Add Pagination -->' +
                        '      <div class="swiper-pagination EV-gallery-thumbs"></div>' +
                        '      </div>' ;
                }

            swiperDom+='<div class="closeBtn"></div>' +
                '      <div class="swiper-button-next  swiper-left-gray"></div>' +
                '      <div class="swiper-button-prev  swiper-right-gray"></div>' +
                '</div>';

            $("body").append(this.options.swiperDom || swiperDom);
            $('video,.video-js').css('opacity',0);//隐藏视频元素
            $('.swiper-wrapper').append(swiperList);
            //swiper初始化

            /*
            * 根据容器宽度对图片进行重新渲染
            * */
            var $galleryTop = $("#EV-swiper .gallery-top");
            $galleryTop.find("img").each(function(index,ele){
                $(ele).load(function(){
                    //参数(图片,允许的宽度,允许的高度)
                    var ImgD = this;
                        image = new Image(),
                        iwidth =  $galleryTop.width(),
                        iheight = $galleryTop.height();
                    image.src = ele.src;
                    if (image.width > 0 && image.height > 0) {
                        if (image.width / image.height >= iwidth / iheight) {
                            if (image.width > iwidth) {
                                ImgD.width = iwidth;
                                ImgD.height = (image.height * iwidth) / image.width;
                            } else {
                                //ImgD.width = image.width;
                                //ImgD.height = image.height;
                                ImgD.style.width = "100%";
                            }
                        } else {
                            if (image.height > iheight) {
                                ImgD.height = iheight;
                                ImgD.width = (image.width * iheight) / image.height;
                            } else {
                                //ImgD.width = image.width;
                                //ImgD.height = image.height;
                                ImgD.style.height = "100%";
                            }
                        }
                    }
                })
            });

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
                $('video,.video-js').css('opacity',1);//显示视频元素
                /**
                 *  关闭后回调事件
                 * */
                typeof this.options.closeCallBack=="function" && this.options.closeCallBack();
            }.bind(this));
        },
        //旋转功能（需配置css）
        addRotate: function () {
            var current = 0;
            $('.rotate-button').off().on('click', function () {
                //console.log($('img', '.swiper-slide-active'));
                current = (current + 90) % 360;
                $('.swiper-slide-active')[0].style.transform = 'rotate(' + current + 'deg)';
            });
            $('.swiper-button-next').on('click', function () {
                $('.swiper-slide-active').prev()[0].style.transform = 'rotate(0deg)';
                current = 0;
            });
            $('.swiper-button-prev').on('click', function () {
                $('.swiper-slide-active').next()[0].style.transform = 'rotate(0deg)';
                current = 0;
            })

        },
        //放大功能（需配置css）
        addScale: function () {
            function  Main() {
                var _this = this;
                //鼠标移动到图片上
                var ele = $('img', '.swiper-slide-active');
                var swiperElement = $('.swiper-slide-active');

                var startLeftValue = $('img', '.swiper-slide-active').eq(0).css("left");  //初始化位置
                var startTopValue = $('img', '.swiper-slide-active').eq(0).css("top");

                var borderLeft = parseInt(startLeftValue) * 0.62 / 0.5;                     //边界值
                var borderRight = parseInt(startLeftValue) * 0.38 / 0.5;
                var borderTop = parseInt(startTopValue) * 0.66 / 0.5;
                var borderBottom = parseInt(startTopValue) * 0.34 / 0.5;

                //鼠标移动
                swiperElement.mousedown(function (event) {
                    $("img", this).css({cursor: "pointer"});
                    x = event.clientX;
                    y = event.clientY;
                    ele.mousemove(function (event) {
                        // console.log("鼠标移动");
                        //$(this).css({cursor: "move"});
                        var leftValue = $('img', '.swiper-slide-active').eq(0).css("left");
                        var topValue = $('img', '.swiper-slide-active').eq(0).css("top");

                        moveX = event.clientX;
                        moveX = parseInt(moveX) - parseInt(x);

                        moveY = event.clientY;
                        moveY = parseInt(moveY) - parseInt(y);

                        //   console.log(moveX,moveY);
                        resultX = parseInt(moveX) / 3 + parseInt(leftValue);
                        resultY = parseInt(moveY) / 3 + parseInt(topValue);


                        //判断图形边界值
                        if (resultX < borderRight) {
                            resultX = borderRight;
                        } else if (resultX > borderLeft) {
                            resultX = borderLeft;
                        }
                        if (resultY < borderBottom) {
                            resultY = borderBottom;
                        } else if (resultY > borderTop) {
                            resultY = borderTop;
                        }

                        $('img', '.swiper-slide-active').eq(0).css("left", resultX + "px");
                        $('img', '.swiper-slide-active').eq(0).css("top", resultY + "px");

                    });
                });
                //鼠标抬起事件
                swiperElement.mouseup(function () {
                    //console.log("鼠标抬起");
                    $("img", this).css({cursor: "default"});
                    ele.unbind("mousemove");

                });

                swiperElement.mouseleave(function () {
                    //console.log("鼠标抬起");
                    $("img", this).css({cursor: "default"});
                    ele.unbind("mousemove");

                });
            }
            //鼠标移动事件
            $('.magnify-button').off().on('click', function () {

                if ($(this).hasClass("on")) {
                    $("img", ".swiper-slide-active").eq(0).css({
                        maxWidth: "100%",
                        maxHeight: "100%",
                        top: "50%",
                        left: "50%",
                        height:"100%"
                    });
                    $(".swiper-slide-active").unbind("mousedown").unbind("mousemove");
                    $(this).removeClass("on");
                } else {
                    $(this).addClass("on");
                    $("img", ".swiper-slide-active").eq(0).css({maxWidth: "none", maxHeight: "none",height:"auto"});
                    Main();
                }


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
                observer: true,
                updateOnImagesReady : true,
                /**
                 * 添加默认点击图片关闭大图模式
                 * 左右滑块也会触发该方法,故做判断
                 * */
                onTap:function(swiper,event){
                    //if(event.target.className.indexOf("swiper-slide")!=-1){
                        $("#EV-swiper").remove();
                        $('video,.video-js').css('opacity',1);  //显示视频元素
                    //}
                }
            };
            /**
             * 判断是否需要初始化 和 是否存在对应的元素
             * */
            var galleryTop =this.options.topSwiperOptions.isInit && ( $( '.EV-gallery-top').length ? new Swiper('.gallery-top', $.extend({} , defaultTop,this.options.topSwiperOptions) ):"");
            var defaultBottom ={
                initialSlide: index,   //初始化时的索引
                spaceBetween: 10,       //活动块居中
                centeredSlides: true,   //，活动块会居中，
                slidesPerView: 'auto',  // 设置slider容器能够同时显示的slides数量(carousel模式)。
                                        // 可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。
                touchRatio: 1,          //触摸距离与slide滑动距离的比率。
                slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
                observer: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
                pagination: '.EV-gallery-thumbs' ///分页器容器的css选择器或HTML标签
            };
            /**
             * 判断是否需要初始化 和 是否存在对应的元素
             * */
            //debugger;
            var galleryThumbs =this.options.bottomSwiperOptions.isInit && ($('.gallery-thumbs').length ? new Swiper('.gallery-thumbs', $.extend({} , defaultBottom,this.options.bottomSwiperOptions) ):"") ;
            /**
             * 判断两个实例 都在后,增加双向控制
             * */
            if(galleryTop  && galleryThumbs ){
                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;
            }
        }
    };
    window.bigPicShow = bigPicShow;
}());

