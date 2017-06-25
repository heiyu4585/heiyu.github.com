/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by WangNing on 2017/5/11.
 */

var oP = document.createElement('p');
oP.className = 'text';
oP.innerHTML = '这是由js生成的一句话。';
document.querySelector('#container').appendChild(oP);
require("../scss/index.scss");
//增加事件
$('.btn').click(function() {
    // require(['../components/dialog/index.js'], function(dialog) {
    //     dialog();
    // });
});