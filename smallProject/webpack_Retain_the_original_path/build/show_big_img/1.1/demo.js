 var DomBigPictureShow=function () {
                var _this = this;
                var isInit = true;
                $.ajax({
                    beforeSend: function (XHR) {
                        console.log("发送之前");
                    },
                    url: "./imgListData.json",
                    data: {
                    },
                    success: function (data) {
                        if (data) {
                            var str = "";
                            var swiperDom = "";
                            if (data.responseObject.responseData.data_list && data.responseObject.responseStatus != false) {
                                var data_list = data.responseObject.responseData.data_list;
                                if (data_list[0].picMap.length) {
                                    $.each(data_list[0].picMap, function (key, value) {
                                        str += '<div class="swiper-slide swiper-no-swiping"><img src=' + value.caseAttUrl + ' /></div>';
                                    });
                                    if (data_list[0].picMap.length == 1) {
                                        swiperDom += '<div id="EV-swiper">' +
                                            // '<div class="background-hidden">' +
                                            '<div class="rotate-button"></div>' +
                                            '<div class="magnify-button"></div>' +
                                            '  <div class="swiper-container gallery-top">' +
                                            '      <div class="swiper-wrapper">' +
                                            '      </div>' +
                                            '</div>' +
                                            '      <div class="swiper-pagination EV-gallery-top"></div>' +
                                            '      </div>' +
                                            '      <div class="closeBtn"></div>' ;
                                    } else if (data_list[0].picMap.length <= 6) {
                                        isInit = false;
                                        swiperDom += '<div id="EV-swiper">' +
                                            '  <div class="swiper-container gallery-top">' +
                                            '      <div class="swiper-wrapper">' +
                                            //  swiperList+
                                            '      </div>' +
                                            '      <div class="swiper-button-next  swiper-left-gray"></div>' +
                                            '      <div class="swiper-button-prev swiper-right-gray"></div>' +
                                            '      <div class="swiper-pagination EV-gallery-top"></div>' +
                                            '      </div>' +
                                            '      <div class="swiper-container gallery-thumbs">' +
                                            '      <div class="swiper-wrapper">' +
                                            // swiperList+
                                            '      </div>' +
                                            '      <!-- Add Pagination -->' +
                                            '      <div class="swiper-pagination EV-gallery-thumbs"></div>' +
                                            '      </div>' +
                                            '      <div class="closeBtn"></div>' +
                                            '      </div>';
                                    } else {
                                        swiperDom +='<div id="EV-swiper">' +
                                            '  <div class="swiper-container gallery-top">' +
                                            '      <div class="swiper-wrapper">' +
                                            //  swiperList+
                                            '      </div>' +
                                            '      <div class="swiper-button-next swiper-right-gray"></div>' +
                                            '      <div class="swiper-button-prev swiper-left-gray"></div>' +
                                            '      <div class="swiper-pagination EV-gallery-top"></div>' +
                                            '      </div>' +
                                            '      <div class="swiper-container gallery-thumbs">' +
                                            '      <div class="swiper-wrapper">' +
                                            // swiperList+
                                            '      </div>' +
                                            '      <!-- Add Pagination -->' +
                                            '      <div class="swiper-pagination EV-gallery-thumbs"></div>' +
                                            '      </div>' +
                                            '      <div class="closeBtn"></div>' +
                                            '      </div>';
                                        isInit = true;
                                    }
                                }
                                bigPicShow.init({
                                    swiperList: str,
                                    topSwiperOptions: {
                                        isInit:true,//是否需要初始化,
                                        // loop: true, // 开启循环模式,必须设置loopedSlides
                                        // loopedSlides: 5, //looped slides should be the same
                                        autoplay: "",//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
                                        preventClicks: false,//当swiper在触摸时阻止默认事件（preventDefault），用于防止触摸时触发链接跳转。
                                        //pagination : '.swiper-pagination', //分页器
                                        noSwiping:true,
                                        pagination: '',//分页器q
                                        paginationType: 'fraction', /*** ‘bullets’  圆点（默认）‘fraction’  分式‘progress’  进度条‘custom’ 自定义**/
                                        prevButton: '.swiper-button-prev',
                                        nextButton: '.swiper-button-next',//前进按钮的css选择器或HTML元素。
                                        /**
                                         *  回调函数，初始化后执行。
                                         */
                                        onInit: function (swiper) {
                                            $(".gallery-thumbs .swiper-slide").on("click",function(){
                                                var index =  $(this).index();
                                                console.log("asdfasdfasdf");
                                                swiper.slideTo(index);//切换到第一个slide，速度为1秒
                                            });
                                            $(".gallery-thumbs .swiper-slide").eq(0).addClass("swiper-slide-active");
                                            console.log("sipwer初始化完成!,回调函数，初始化后执行。")
                                        },
                                        /**
                                         * 回调函数，当你轻触(tap)Swiper后执行。在移动端，click会有 200~300 ms延迟，所以请用tap代替click作为点击事件。
                                         * */
                                        onTap: function (swiper, event) {
                                            console.log(swiper.activeIndex); //swiper当前的活动块的索引
                                            console.log(swiper.realIndex);//swiper当前的活动块的真实索引,排除loop模式下添加的滑块DOM
                                            console.log(swiper.clickedIndex);//返回最后点击Slide的索引。(click)
                                            swiper.stopAutoplay();    //停止自动切换
                                            swiper.startAutoplay();    //开始自动切换
                                        },
                                        onSlideChangeStart: function (swiper) { //滑块释放时如果触发slider切换则执行
                                            console.log(swiper.activeIndex + "当前索引");
                                            if(!isInit){
                                                $(".gallery-thumbs .swiper-slide").removeClass("swiper-slide-active").eq(swiper.activeIndex).addClass("swiper-slide-active");

                                            }
                                            console.log("loop循环模式前的索引值为" + swiper.realIndex);
                                        }
                                    },
                                    bottomSwiperOptions: {
                                       isInit: isInit,//是否需要初始化,
                                        paginationType: '',
                                        loopedSlides: 5 //looped slides should be the same
                                    },
                                    /**
                                     * 为每个指定的图片（会触发大图）单击事件绑定回调函数
                                     * 此方法针对以dom为数据源的方式
                                     * */
                                    imgElementCallBack: function () {
                                        console.log("为每个指定的图片（会触发大图）单击事件绑定回调函数");
                                    },
                                    /**
                                     * 关闭按钮回调函数
                                     * */
                                    closeCallBack: function () {
                                        console.log("关闭按钮回调函数");
                                        $('.swiper-right-gray').on("click",function(){
                                            $( "#EV-swiper .gallery-thumbs").stop().addClass("show");
                                            setTimeout(function(){
                                                $("#EV-swiper .gallery-thumbs").stop().removeClass("show");
                                            },0);
                                        });

                                        $('.swiper-left-gray').on("click",function(){
                                            $( "#EV-swiper .gallery-thumbs").stop(false,true).addClass("show");
                                            setTimeout(function(){
                                                $("#EV-swiper .gallery-thumbs").stop(false,true).removeClass("show");
                                            },0);
                                        });
                                    },
                                    /**
                                     * 指定的dom结构
                                     * */
                                    swiperDom: swiperDom
                                });
                                bigPicShow.addRotate();
                                bigPicShow.addScale();
                               //     });
                            }

                        }
                    }
                });

            }