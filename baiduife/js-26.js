//var adultTv = Event();
//
//adultTv .listen(  'play',  function( data ){
//
//alert ( "今天是谁的电影" + data.name );
//
//});
//
////发布者
//
//adultTv .trigger(  'play',  { 'name': '麻生希' }  );

function plan(json) {
    //飞船有两个状态：飞行中和停止
    //能源耗尽时，飞船会自动停止飞行
    this.id = json.id;
    this.commond = json.commond;
    _that = this;
}

//zhuangtai
plan.prototype.state = function () {
    var i = 0, timer, energy;
    this.timer = setInterval(200, function ()
    {
        this.energy = 100 - i * 2;
        if (this.energy <= 0) {
            clearInterval(this.timer)
        }
        $(".circle" + _that.id).css({"width": this.energy + "%"});
        $(".circle" + _that.id).html(this.energy);
    }

    )
}


var plan1 = new plan({
        id: 1,
        commond: 'stop'
    }
);