/**
 * Created by 王 on 2017/7/9.
 */
/***************生成地图*******************/
/*是否可以考虑 用横纵坐标存储数据*/
/*深拷贝*/
var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}


var pushBox = {
    init: function (progressNum) {
        this.drawMap();
        this.gameDiv = $("#game div");
        var progressNum = progressNum == undefined ? this.progressNum:progressNum;
        this.peronUpdata(this.dataMap[progressNum].personInt);

    },
    peronUpdata: function (personInt, direction,needHistory) {
        this.dataMap[this.progressNum].personInt =  personInt ;
        this.MoveData = {
            currentDiv: this.gameDiv.eq(personInt),
            down: {
                nextDiv: this.gameDiv.eq(personInt + 10),
                nextNum: personInt + 10,
                nextBoxNum: personInt + 20
            },
            up: {
                nextDiv: this.gameDiv.eq(personInt - 10),
                nextNum: personInt - 10,
                nextBoxNum: personInt - 20
            },
            left: {
                nextDiv: this.gameDiv.eq(personInt - 1),
                nextNum: personInt - 1,
                nextBoxNum: personInt - 2
            },
            right: {
                nextDiv: this.gameDiv.eq(personInt + 1),
                nextNum: personInt + 1,
                nextBoxNum: personInt + 2
            }
        };
        /*是否需要记录历史*/
        var needHistory =  needHistory == undefined ?  true: needHistory;
        if(needHistory){
            console.log("记录了历史")
            switch (direction) {
                case "up":
                    this.steps.push("down");
                    break;
                case "down":
                    this.steps.push("up");
                    break;
                case "left":
                    this.steps.push("right");
                    break;
                case "right":
                    this.steps.push("left");
                    break;
                default:
                    ;
            }
        }

    },
    /*d当前关卡书*/
    progressNum:1,
    /*地图数据*/
    dataMap:{
        1: {
            mapLenght: 80, //画布总数
            mapData: [14, 15, 16, 22, 23, 26, 32, 38, 42, 48, 52, 58, 62, 63, 64, 65, 66, 67, 67, 68],
            targetData: [36, 25],
            boxData: [35, 46],
            personInt: 43 //人所在位置
        },
        2: {
            mapLenght: 80, //画布总数
            mapData: [14, 15, 16, 22, 23, 26, 32, 38, 42, 48, 52, 58, 62, 63, 64, 65, 66, 67, 67, 68],
            targetData: [11, 30],
            boxData: [20, 21],
            personInt: 2 //人所在位置
        },
        3: {
            mapLenght: 80, //画布总数
            mapData: [14, 15, 16, 22, 23, 26, 32, 38, 42, 48, 52, 58, 62, 63, 64, 65, 66, 67, 67, 68],
            targetData: [11, 30],
            boxData: [20, 21],
            personInt: 3 //人所在位置
        },
        4: {
            mapLenght: 80, //画布总数
            mapData: [14, 15, 16, 22, 23, 26, 32, 38, 42, 48, 52, 58, 62, 63, 64, 65, 66, 67, 67, 68],
            targetData: [11, 30],
            boxData: [20, 21],
            personInt: 4 //人所在位置
        }
    },
    /*地图绘制*/
    drawMap: function () {
        $("#game").html("");
        var mapStr = "";
        var dataMap = this.dataMap[this.progressNum];
        for (var i = 0; i < dataMap.mapLenght; i++) {
            (dataMap.mapData.indexOf(i) != -1 && (mapStr += '<div class="wall"></div>')) ||
            (dataMap.targetData.indexOf(i) != -1 && (mapStr += '<div class="target"></div>')) ||
            (dataMap.boxData.indexOf(i) != -1 && (mapStr += '<div class="box"></div>')) ||
            (dataMap.personInt == i && (mapStr += '<div class="person"></div>')) ||
            (mapStr += '<div></div>')
        }
        $("#game").append(mapStr);

    },
    /*是否通关*/
    isDone: function () {
        var isDone = true;
        $("#game .target").each(function (i, ele) {
            !$(ele).hasClass("box") && (isDone = false)
        });
        isDone && alert("已经通关");
    },
    /*人物移动逻辑*/
    personMove: function (direction,needHistory) {
        if(direction == undefined ){
            return false;
        }

        var nextDiv = this.MoveData[direction].nextDiv;
        var nextNum = this.MoveData[direction].nextNum;
        var nextBoxNum = this.MoveData[direction].nextBoxNum;
        var currentDiv = this.MoveData.currentDiv;

        //碰到墙
        if (nextDiv.hasClass("wall") ||
            (direction == "left" && (nextNum + 1) % 10 == 0) ||
            (direction == "right" && nextNum % 10 == 0) ||
            (direction == "up" && (nextNum < 0)) ||
            (direction == "down" && nextNum >= this.dataMap[this.progressNum].mapLenght)

        ) {
            return false;
        }

        if (nextDiv.hasClass("box")) {           //下一步位置是箱子

            var nextBoxDiv = this.gameDiv.eq(nextBoxNum); //xi箱子的下一位置的dom
            if (
                nextBoxDiv.hasClass("wall") || /*是墙或者超出返回*/
                (direction == "left" && (nextBoxNum + 1) % 10 == 0) ||
                (direction == "right" && nextBoxNum % 10 == 0) ||
                (direction == "up" && (nextBoxNum < 0)) ||
                (direction == "down" && (nextBoxNum >=this.dataMap[this.progressNum].mapLenght))

            ) {  //箱子的下一部是墙,返回
                return false;
            }
            nextDiv.removeClass('box').addClass("person");
            nextBoxDiv.addClass("box");
            this.peronUpdata(nextNum); //更新位置
            // }
        } else {                                              //空节点
            nextDiv.addClass("person");
        }

        currentDiv.removeClass('person');
        this.peronUpdata(nextNum, direction,needHistory); //更新位置
        setTimeout(function () {
            this.isDone();
        }.bind(this), 0);
    },
    steps: [],
    goBack:function () {
        if(this.steps.length<=0){
            alert("已经到头了");
            return false;
        }
        this.personMove(this.steps.pop(),false);
    },
    contolMeu:function(){
        var dataMap = objDeepCopy(this.dataMap);
        $(".restart").on("click",function(){
            this.dataMap = dataMap;
            this.init();
        }.bind(this));

        $(".pre_step").on("click",function(){
            this.goBack();
        }.bind(this));
        $(".pre_lv").on("click",function(){
            if(this.progressNum == 1){
                alert("没有了");
                return false;
            }
            var levelNum =  +$(".levelNum").html()-1;
            this.dataMap = dataMap;
            this.progressNum =levelNum;
            this.init( levelNum);
            $(".levelNum").html(levelNum);
            $("#select_lv").val(levelNum-1);
        }.bind(this));
        $(".next_lv").on("click",function(){
            if(this.progressNum == Object.keys(this.dataMap).length){
                alert("没有了");
                return false;
            }
            var levelNum =  +$(".levelNum").html()+1;
            this.dataMap = dataMap;
            this.progressNum =levelNum;
            this.init( levelNum);
            $(".levelNum").html(levelNum);
            $("#select_lv").val(levelNum-1);
        }.bind(this));
    }
};

pushBox.init(1);
pushBox.contolMeu();
document.onkeydown = function (e) {
    e = window.event || e;
    switch (e.keyCode) {
        case 37: //左键
            pushBox.personMove("left");
            break;
        case 38: //向上键
            pushBox.personMove("up");
            break;
        case 39: //右键
            pushBox.personMove("right");
            break;
        case 40: //向下键
            pushBox.personMove("down");
            break;
        default:
            break;
    }
}