/**
 * Created by 王 on 2017/8/11.
 */
var rf=require("fs");
var data=rf.readFileSync("sp500hst.txt","utf-8");

// console.log(data)

var dataData=[];
var values=[];
data.split('\n').map(function (ele,index) {

    var data = ele.split(",");
    if(!values[index]){
        values[index]=[];
    }
    values[index].push('['+data[2],data[3],data[4],data[5]+']')

    return "["+(function () {
            return "["+ele.split(',').map(function (ele,index) {
                if(!dataData[index]){
                    dataData[index]=[];
                }
                if(index==1){
                    dataData[index].push("'"+ele+"'");
                }else{
                    dataData[index].push(ele);
                }
            })+']'
        })()+"]"
});

var data = dataData.map(function (ele) {
    return "["+ ele+"]"
})


data[7]=[];
data[7].push("["+values+']')
// data[8]=(values);
console.log(values)
rf.writeFile("data.js", "["+data+"]", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});