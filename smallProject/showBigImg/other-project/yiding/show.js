//对划线查看大图
$(".yd-timelineImgBox .yd-timelineImg").each(function(){
    $(this).unbind("click").bind("click",function(){
        var nowImdData = JSON.parse($(this).parent().attr("data-imgData"));
        var nowIndex = parseInt($(this).index())+1;
        var nowDiscussId = $(this).parent().attr("data-discussid");
        creatCarousel.creatHtml(nowImdData,nowIndex,nowDiscussId);
    })
});



$(document).ready(function(){
    creatCarousel = {
        creatHtml: function(data,index,discussId) {
            var lenStr = "";
            lenStr += '<section class="Mask_Layer yd-discussfirst" style="background-color:rgba(0,0,0,0.3); ">' +
                '<div class="width_auto">' +
                '<div class="yd-discussout">' +
                '<div class="yd-discussout_pagination">' +
                '<button class="yd-discusstop_left"></button>' +
                '<div class="pagination"></div>' +

                '<button class="yd-discusstop_right"></button>' +
                '</div>' +
                '</div>' +
                '<div class="yd-discussout_bottom">' +
                '<div class="yd-discussout_bottom_close">' +
                '<img src="/image/discuss/close.png" />' +
                '</div>' +
                '<div class="swiper_top">' +
                '<span class="swiper_top_left"></span>' +
                '<span class="swiper_top_right"></span>' +
                '</div>' +
                '<div class="swiper_out">' +
                '<div class="swiper_right">' +
                '<span class="swiper_right_width">适应窗口</span>' +
                '<span class="swiper_right_big" data-discussid="'+discussId+'">查看大图</span>' +
                '</div>' +
                '<div class="swiper-container">' +

                '<div class="swiper-wrapper">' +
                '<a class="yd-discussarrow-left" href="#"></a>' +
                '<a class="yd-discussarrow-right" href="#"></a>' +
                '<img/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                ' </section>';
            $('body').append(lenStr);
            if(discussId){
                $('.swiper_right_big').show();
            }else {
                $('.swiper_right_big').hide();
            }
            creatCarousel.nowIndexNum=index;
            creatCarousel.swiper();
            creatCarousel.creatSwitch(data);
        },
        swiper: function() {
            var mySwiper = new Swiper('.swiper-container', {
                pagination: '.pagination',
                paginationClickable: true,
                loop: true,
                noSwiping: true,

            });
        },
        nowIndexNum:null,
        creatSwitch: function(data) {
            for(var i = 0; i < data.length; i++) {
                if(i == 0) {
                    var span = $("<span class='swiper-pagination-switch swiper-visible-switch swiper-active-switch'><img/></span>");
                    $(".pagination").append(span);
                } else {
                    var span = $("<span class='swiper-pagination-switch swiper-visible-switch'><img/></span>");
                    $(".pagination").append(span);
                }
                span.find('img').attr('src', data[i].src);
            }
            $(".swiper_top_left").text(creatCarousel.nowIndexNum + "/" + (data.length));
            creatCarousel.rightAddClass(creatCarousel.nowIndexNum,data);
            creatCarousel.leftAddClass(creatCarousel.nowIndexNum,data);
            creatCarousel.bigImg(creatCarousel.nowIndexNum-1, data);
            creatCarousel.moveImg(creatCarousel.nowIndexNum,data.length);
            creatCarousel.elseClick(data);
            $('.yd-discussarrow-left').on('click', function() {
                creatCarousel.leftClick(data);
            })

            $('.yd-discussarrow-right').on('click', function() {
                creatCarousel.rightClick(data);
            });

            $(".swiper-pagination-switch").unbind("click").bind("click", function() {
                creatCarousel.nowIndexNum = $(this).index() + 1;
                creatCarousel.moveImg(creatCarousel.nowIndexNum);
                for(var i = 0; i < data.length; i++) {
                    $('.swiper-pagination-switch').removeClass('swiper-active-switch');
                }
                $(this).addClass('swiper-active-switch');
                $(".swiper_top_left").text(creatCarousel.nowIndexNum + "/" + (data.length));
                creatCarousel.bigImg(creatCarousel.nowIndexNum - 1, data);
            })

            $('.yd-discusstop_left').on('click', function() {
                creatCarousel.leftClick(data);
            })

            $('.yd-discusstop_right').on('click', function() {
                creatCarousel.rightClick(data);
            });
        },
        elseClick: function(data) {
            $('.yd-discussout_bottom_close').click(function() {
                document.documentElement.style.overflow = "";
                $('.yd-discussfirst').hide();
            })
            $(".swiper_right_width").click(function() {
                var windowHeight = $(window).height() - 308;
                // console.log($('.swiper_right_width').text())
                if($('.swiper_right_width').text() == "适应宽度") {
                    $('.swiper_right_width').text("适应窗口");
                    $('.swiper-container').height(800);
                    $('.swiper-wrapper img').height(800);
                } else {
                    $('.swiper_right_width').text("适应宽度");
                    $('.swiper-container').height(windowHeight);
                    $('.swiper-wrapper img').height(windowHeight);
                }

            })
            $(".swiper-container").mouseover(function() {
                $(".yd-discussarrow-left").css("display", 'block');
                $(".yd-discussarrow-right").css("display", 'block');
            })
            $(".swiper-container").mouseout(function() {
                $(".yd-discussarrow-left").css("display", 'none');
                $(".yd-discussarrow-right").css("display", 'none');
            })
            $('.swiper_right_big').click(function() {
                creatCarousel.nowIndexNum = $(".swiper-active-switch").index() + 1;
                var discussId = $(this).attr("data-discussid")
                //&caseId=1478683496753&index=2
                window.open('/pages/discuss/big-img2.html?&caseId='+discussId+'&index='+creatCarousel.nowIndexNum+'');
            })
        },
        bigImg: function(index, data) {
            $('.swiper-wrapper img').attr('src', data[index].src);
            if(data[index].time){
                $('.swiper_top_right').text("发布于:" + data[index].time);
            }else{
                $('.swiper_top_right').text("");
            }

        },
        moveImg: function(index) {
            if(index > 6) {
                $(".pagination").css({
                    left: -105 * (index - 6),
                    transition: "all 1s"
                })
            } else {
                $(".pagination").css({
                    left: 30,
                    transition: "all 1s"
                })
            }
        },
        leftAddClass: function(index, data) {
            index--;
            for(var i = 0; i < data.length; i++) {
                $('.swiper-pagination-switch').removeClass('swiper-active-switch');
            }
            $('.swiper-pagination-switch').eq(index).addClass("swiper-active-switch");
        },
        rightAddClass: function(index, data) {
            for(var i = 0; i < data.length; i++) {
                $('.swiper-pagination-switch').removeClass('swiper-active-switch');
            }
            $('.swiper-pagination-switch').eq(index - 1).addClass("swiper-active-switch");
        },
        leftClick: function(data) {
            creatCarousel.nowIndexNum = $(".swiper-active-switch").index() + 1;
            creatCarousel.nowIndexNum--;
            if(creatCarousel.nowIndexNum > 0) {
                // creatCarousel.nowIndexNum=data.length;
                creatCarousel.leftAddClass(creatCarousel.nowIndexNum, data);
                creatCarousel.moveImg(creatCarousel.nowIndexNum);
                $(".swiper_top_left").text(creatCarousel.nowIndexNum + "/" + (data.length));
                creatCarousel.bigImg(creatCarousel.nowIndexNum - 1, data);
            }
        },
        rightClick: function(data) {
            creatCarousel.nowIndexNum = $(".swiper-active-switch").index() + 1;
            creatCarousel.nowIndexNum++;
            if(creatCarousel.nowIndexNum <= data.length) {
                // creatCarousel.nowIndexNum=1;
                creatCarousel.rightAddClass(creatCarousel.nowIndexNum, data);
                creatCarousel.moveImg(creatCarousel.nowIndexNum);
                $(".swiper_top_left").text(creatCarousel.nowIndexNum + "/" + (data.length));
                creatCarousel.bigImg(creatCarousel.nowIndexNum - 1, data);
            }
        }

    };
    // var imgData = [
    //     {
    //         "name": "1",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "22",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-23 10:50 22"
    //     },
    //     {
    //         "name": "33",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "44",
    //         "src":"/image/discuss/t011abd4fc489725407.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "55",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "66",
    //         "src":"/image/discuss/t014f9882782cce0bb5.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "77",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "88",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "99",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     },
    //     {
    //         "name": "00",
    //         "src":"/image/discuss/t010f2c3946573ff61d.jpg",
    //         "time":"2016-11-22 10:50 22"
    //     }
    // ];
    // creatCarousel.creatHtml(imgData,2);
});