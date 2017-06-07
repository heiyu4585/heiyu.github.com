[TOC]

# let和const

## let 局域变量
* 不允许重复声明
 * 块级作用域
* do表达式

 ```
 let x = do{
    let  t =1;
    t*t+2;
}   
x // 3
 ```
## const 常量
>声明一个只读常量.本质是变量指向的那个内存地址不得改动,
>将对象或者 数组 设置为 const时,可以修改对象或者数组的值,但是不能重新给const 定义的变量重新赋值为新的对象或者数组.

```
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

```
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
## 对象冻结的方式
```
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

冻结对象属性也应该被冻结
```
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## es6 六种变量声明方式
>var  function let const class import

es6中let  const ,class ,声明的全局变量,不属于顶层对象的属性,不在属于顶层对象的属性.
```
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

## global对象

垫片库`system.global`模拟了这个提案，可以在所有环境拿到global

* global对象都是存在的
```
// CommonJS的写法
require('system.global/shim')();

// ES6模块的写法
import shim from 'system.global/shim'; shim();
```
* 将顶层对象放入变量global
```
// CommonJS的写法
var global = require('system.global')();

// ES6模块的写法
import getGlobal from 'system.global';
const global = getGlobal();
```
## 拓展
1. 严格模式
> 设立"严格模式"的目的，主要有以下几个：
>* 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
>* 消除代码运行的一些不安全之处，保证代码运行的安全；
>* 提高编译器效率，增加运行速度；
>* 为未来新版本的Javascript做好铺垫。 
2. Web Worker
>Web Worker可以在后台执行脚本，而不会阻塞页面交互。Worker对象分为两种：专用式Web Worker和共享式Web Worker：专用式的Web Worker只能被当个页面使用，而共享式的Web Worker可以在被多个页面使用。另外，本文还介绍了Web Worker的错误处理机制，以及使用Ajax与服务端交互。

# 变量的解构赋值 § ⇧
##  数组的解构赋值
### 基本用法
```
let [a, b, c] = [1, 2, 3];
```


```
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

```

对于 ==Set 结构==，也可以使用数组的解构赋值。
```
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```
==事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。==
```
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

```

### 默认值
 
```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
## 对象的结构赋值
对象的解构,变量名必须和属性同名,才能正确的取到值.
```markdown
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
如果变量名与属性名不一致，必须写成下面这样。
```markdown
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
实际上对象的结构赋值是下面的简写形式
```markdown
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
赋值的变量不能提前使用let和const命令声明过,否则会报错
和数组一样，解构也可以用于嵌套结构的对象。
```markdown
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

注意，这时p是模式，不是变量，因此不会被赋值。
```markdown
ar node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;
line // 1
loc  // error: loc is undefined
start // error: start is undefined
```
上面代码中，只有line是变量，loc和start都是模式，不会被赋值。

下面是嵌套赋值的例子。
```markdown
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```
对象的解构也可以指定默认值。
```markdown
let { log, sin, cos } = Math;
```

## 字符串的结构赋值
```markdown
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

>为什么能这么用, hello不是字符串吗..

```markdown
let {length : len} = 'hello';
len // 5
```
## 数值和布尔值的解构赋值
解构时,如果等号右边是数值和布尔值,会先转为对象
```markdown
let{toString:s} =123;
s === Number.prototype.toString //true

let{toString:s} =true;
s === Number.prototype.toString //true
```
解构赋值的规则是,只要等号右边的值不是对象或者数组,就先将转为对象.由于undefined和null,无法转为对象,所以对他们进行解构赋值,都会报错.
```markdown
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 函数参数的解构赋值
```markdown
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

```markdown
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```
注意，下面的写法会得到不一样的结果。
```
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```
## 不能使用括号的情况 ???
（1）变量声明语句中，不能带有圆括号。
```
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```
上面三个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

（2）函数参数中，模式不能带有圆括号。

函数参数也属于变量声明，因此不能带有圆括号。
```
// 报错
function f([(z)]) { return z; }
```
（3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
```
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```
上面代码将整个模式放在圆括号之中，导致报错。
```
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```
上面代码将嵌套模式的一层，放在圆括号之中，导致报错。

## 可以使用圆括号的情况
可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```
上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。
第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句
的性质一致。

## 用途

### 交换变量的值
```markdown
let x= 1;
let y = 2;
[x,y] = [y,x]
```
###  函数返回多个值
```markdown
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```
###  函数参数的定义
可以很方便的将一组参数与变量名对应起来
```markdown
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
###  提取json数据
```markdown
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
###  函数参数的默认值
```markdown
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```
###  遍历Map结构
```markdown
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```
```markdown
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```
###  输入模块的指定方法
```markdown
const { SourceMapConsumer, SourceNode } = require("source-map");
```
# 字符串的扩展
## 字符的unicode表示法
>js允许采用\uxxxxx形式表示一个字符,

有了这种表示法之后，JavaScript 共有6种方法可以表示一个字符。
```markdown
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```
## codePointAt()
可以正确的处理4个字节储存的字符,返回一个字符的码点.
## String.fromCodePoint()
es5的String.fromCharCode(0x20BB7)不能识别大于0xFFFF的码点,
## 字符串的便利器接口遍历器接口
使得字符串可以被for....of循环遍历
```markdown
for(let codePoint of 'foo'){
    console.log(codePoint)
}
// "f"
// "o"
// "o"
```
 ## at()
 返回字符串给定位置的字符,改方法不能识别码点大于0xFFFF的字符.
## normalize()
 识别欧洲有语调符号和重音符号
## includes(),startsWidth(),endsWith()
   -includes() : 返回布尔值,表示是否找到了参数字符串
   -startsWith():返回布尔值,表示参数字符串是否在源字符串的头部.
   -endsWith();返回布尔值,表示参数字符串是否在源字符串的尾部.
```markdown
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false                                                                                       s
```
上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束.

## repeat()
返回一个新字符串,表示将原字符串重复n次
1. 参数是小数,会被取整.
2. 负数或者Infinity,会报错.
3. NaN等同于0.
4. 字符串先转为数字.
## padStart(),padEnd()
1. 字符串补全长度,头部补全,尾部补全
2. 等于或大于指定的最小长度,返回源字符
3. 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
4. 如果省略第二个参数，默认使用空格补全长度。
5. padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
6. 另一个用途是提示字符串格式。
```
'x'.padStart(5, 'ab') // 'ababx'
'xxx'.padStart(2, 'ab') // 'xxx'
'abc'.padStart(10, '0123456789') // '0123456abc'
'123456'.padStart(10, '0') // "0000123456"
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```


## 模板字符串
```markdown
// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
模板中使用反引号,用反斜杠转义.
```markdown
var greeting = `\`Yo\` World!`;
```
* 模板字符串的空格和换行,都会被保留.
* 变量名鞋子啊${}之中
* 大括号内可放入js表达式,也可以进行运算,引用对象,甚至方法
* 大括号内的变量未声明会报错
* 可以嵌套
```markdown
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
onst data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>

```
引用模板字符串本身,在需要时执行.
```markdown
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
```
## 实例:实时编译(待研究)
## 标签模板(待研究)
## String.raw()
返回一些斜杠都被转义的字符串,元字符串已经被反斜杠转义的,那么String.raw不会做任何处理.
## 模板字符串的限制(待研究)

# 正则的拓展
## ReaExp构造函数
es5中
```markdown
var regex = new Regexp('xyz','i');
//等价于
var regex = /xyz/i;
```
```
var regex = new RegExp(/xyz/i);
等价于
var regex =/xyz/i;
```
es6 中 
```markdown
new RegExp(/abc/ig,'i').flags 
 // 'i'
```
## 字符串的正则方法

字符串对象共有4个方法,可以使用正则表达式: match(),replace(),search()和split()

## u修饰符
含义为`Unicode`模式,用来正确处理大于\uFFFF的Unico的字符.
### 点字符
```markdown
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```
### Unicode字符表示法
```markdown
ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。

/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```
### 量词
使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符。
```markdown
           /a{2}/.test('aa') // true
           /a{2}/u.test('aa') // true
           /𠮷{2}/.test('𠮷𠮷') // false
           /𠮷{2}/u.test('𠮷𠮷') // true
 ```
 ### 预定义模式
 ```markdown
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
```
 ### i修饰符
 ```
 /[a-z]/i.test('\u212A') // false
    /[a-z]/iu.test('\u212A') // true
 ```
 ## y 修饰符
 y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
 
##  sticky属性 § ⇧
sticky属性，表示是否设置了y修饰符。
```markdown
var r = /hello\d/y;
r.sticky // true
```
## flags属性
会返回正则表达式的修饰符。
## RegExp.escape()
字符串必须转义，才能作为正则模式。
## s 修饰符：dotAll 模式
   正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外。
## 后行断言
## 后行断言

# 数值的扩展
## 二进制和八进制表示法
```markdown
0b111110111 === 503 // true
0o767 === 503 // true
```
使用number转为十进制
## Number.isFinite(), Number.isNaN()
1. 两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false
```markdown
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```
## Number.parseInt(), Number.parseFloat() 
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

Number.isInteger()
Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
```markdown
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

```
## Number.EPSILON
   ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
## 安全整数和Number.isSafeInteger() 
## Math对象的扩展
### Math.trunc()
去除数字的小数部分,返回整数部分.
非负数先转为数值
控制和无法截取整数的值,返回NaN
### Math.sign()
判断一个数到底是整数,负数,还是零
```markdown
它会返回五种值。

参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。
```
### Math.cbrt() 
   Math.cbrt方法用于计算一个数的立方根。
### Math.clz32()
   JavaScript的整数使用32位二进制形式表示
### Math.imul() 
   回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
### Math.fround()
    Math.fround方法返回一个数的单精度浮点数形式。   
### Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。   
## 对数方法 § ⇧
### Math.expm1()
Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。
### Math.log1p()
Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
### Math.log10()
Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。
## Math.log2()
Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN。
## 三角函数方法
### Math.signbit()
Math.sign()用来判断一个值的正负，但是如果参数是-0，它会返回-0
### 指数运算符
ES2016 新增了一个指数运算符（**）。

# 数组的扩展
## Array.from
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
```
let arrayLike ={
    '0':'a',
    '1':'b',
    '2':'c',
    length:3
} //length 不能省
//es5
var arr1 =[].slice.call(arrayLike);
//es6
let arr2 =Array.from(arrayLike);
```
NodeList集合,`arguments`对象.
```
let ps = document.querySelectorAll('p');
Array.form(ps).forEach(function(p){
    console.log(p);
});
//arguments对象
function foo(){
    var args = Array.from(arguments);
    //..
     }
    
```
部署了Iterator接口的数据结构
```
Array.from('hello');
//[ 'h','e','l','l','o']

let namesSet = new Set (['a','b'])
Array.from(namesSet) // ['a','b']
```
参数为数组,返回一个一模一样的新数组
拓展运算符,也可以将默写数组结构转为数组
//arguments对象
```
//arguments对象
function foo(){
    var args =[...arguments];
    }
    //NodeList对象
    [document.querySelectorAll('div')]
```
扩展运算符背后调用的是遍历器接口(Symbol.iterator),Array.from支持类似数组对象,(必须有length)属性,任何有length的对象,都可以通过Array.from方法转为数组,而此时扩展运算父无法转化
```
Array.from({length:3})
//[undefined,undefined,undefined]
```
对于未部署改方法的浏览器,可以用`Array.prototype.slice` 方法代替.
```
const toArray = (()=>
Array.from ? Array.from:obj=>[].slice.call(obj)
)();
```
Array.from还可以接受第二个参数,作用类似于数组的map方法,用来对每个元素进行处理,将处理后的值放入返回的数组.
```markdown
Array .from(arrayLike,x=>x*x);
//等同于
Array.from(arrayLike).map(x=>x*x);
Array.from([1,2,3],(x)=>x*x)
//[1,4,9]
```
下面是提取DOM节点的文本内容
```markdown
let  spans =document.querySelectorAll('span.name');
//map()
let names1 = Array.prototype.map.call(spans,s=>s.textContent);

//Array.from()
let names2 = Array.from(spans,s=>s.textContent)
```
数组中布尔值为`false`的成员转为0
```markdown
Array.from([1,,2,,3],(n)=>n||0)
//[1,0,2,0,3]
```
另一个列子是返回各种数据类型
```
function typeOf(){
    return Array.from(argumnets,value=>typeof value)
}
typeOf(null,[],NaN)
//['object','object','number']
```
Array.from()
```markdown
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```
Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

将字符串转为数组,返回字符串的长度,避免大于\uFFF的Unicode字符,算作两个字符的bug

```markdown
function countSybols(string){
    return Array.from(string).length;
}
```
## Array.of()
将一组值转为数组
```
Array.of(3,11,8) //[3,11,8]
Array.of(3) //[3]
Array.of(3).length //1
```
Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
```
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
Array.of方法可以用下面的代码模拟实现。
```
function Arrayof(){
 return [].slice.call(arguments);
}
```
## 数组实例的copyWithin() (没懂..)
将指定位置的成员复制到其他位置,覆盖原有成员,返回当前数组.

Array.prototype.copyWithin(target, start = 0, end = this.length)

```
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```
## 数组实例的find()和findIndex()
find找到第一个符合条件的数组成员,参数为回调函数,所有参数依次执行回调函数,直到找出第一个返回值为true的成员,然后返回该成员.如果没有符合条件的成员,则返回undefined.
```
[1,4,-5,10].find((n)=>n<0)
//-5
```
上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
***这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。***

另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
```
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```
## 数组实例的fill()
```
['a','b','c'].fil(7)
//[7,7,7]
new Array(3).fill(7)
// [7, 7, 7]
```
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
## 数组实例的entries()，keys()和values()
* key 是对键名的遍历
* values() 是对键值的遍历
* entries() 是对键值对的遍历
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历
```
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```
## 数组实例的includes()
## 数组的空位
ES6则是明确将空位转为undefined。

#函数的扩展
## 函数参数的默认值
```
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
最后一行需要先判断一下是否为`undefined`,会输出''
```
if (typeof y === 'undefined') {
  y = 'World';
}
```

```
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

var p = new Point();
p // { x: 0, y: 0 }
```
默认值的好处
* 阅读代码的人,可以立即意识到哪些参数是可以省略的
* 如果彻底拿掉参数,也不会导致以前的代码无法运行.

参数变量是默认声明的,不能在用`let`或`const`再次声明.

```
funciton foo(x =5){
    let x =1; //error
    const x =2; //error
}
```
默认值是变量,每次调用都重新计算默认表达式,也就是默认值是`惰性求值`的.
```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```
## 与解构赋值默认值结合使用
```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined
//为毛输出是Uncaught TypeError: Cannot match against 'undefined' or 'null'.

```

```
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错
```
```
function fetch(url, { method = 'GET' } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"

```

```
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

```
写法一:函数参数的默认值是空对象,但是设置了对象的解构赋值的默认值
写法二:函数参数的默认值是一个具有属性的对象,但是没有设置对象结构赋值的默认值.
## 参数默认值的位置

```
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错  *//为毛报错*
f(1, undefined, 2) // [1, 5, 2]
```
传入undefined会触发默认值,null不会
```
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```
## 函数的length
设置定了默认值,函数的length,将返回没有指定默认值的参数个数,也就是说,制定了默认值后.length属性将失真.
```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```
这是因为length属性的含义是，该函数预期传入的参数个数。
rest 参数也不会计入length属性。
```
(function(...args) {}).length // 0
```
如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
```
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
//什么鬼,没懂..
```
## 作用域
一旦设置参数的默认值,函数进行声明初始化时,参数会形成一个单独的作用域(context),等到初始化结束,这个作用域会消失,
```
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
```
```
let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1
```
```
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
```
```
var x = 1;
function foo(x = x) {
  // ...
}
foo() // ReferenceError: x is not defined
//上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。
```
如果参数的默认值是一个函数
```
let foo = 'outer';
function bar(func = x => foo) {
  let foo = 'inner';
  console.log(func()); 
}
bar(); // outer
```
```
var x = 1;
function foo(x, y = function() { x = 2; }) { //x = 2 是设置默认值
  var x = 3;
  y();
  console.log(x);
}
foo() // 3
x // 1
```

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}
foo() // 2
x // 1
```
## 应用
指定某个函数不得生活,如果省略就抛出一个错误
```
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()
// Error: Missing parameter
```
另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

`function foo(optional = undefined) { ··· }`

## rest 参数
* rest参数搭配的变量是一个数组,该变量将多余的参数放入数组中.
* rest参数中的变量代表一个数组,所以数组中特有的方法都可以用于这个变量.

```
function add(...values) {
  let sum = 0;
console.log(values)  //[2,5,3]
  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
下面是一个 rest 参数代替arguments变量的例子。
```
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
rest参数之后不能再有其他参数(即只是能是最后一个参数),否则会报错
```
//报错
function f(a, ...b, c) {
  // ...
}
```
函数的length属性，不包括 rest 参数。
```
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```
## 扩展运算符
扩展运算符(spread)是三个点(...).它好比rest的逆运算,将一个数组转为用逗号分隔的参数序列.
```
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```
该运算符主要用于函数调用。
```
function push(array, ...items) {
  array.push(...items); //扩展运算符
}

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42 //扩展运算符
```
扩展运算符与正常的函数参数可以结合使用，非常灵活。
```
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```
## 代替数组的apply方法
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
```
// ES5的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f(...args);
```

```
// ES5的写法
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```
另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。
```
// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```
```
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```
## 扩展运算符的应用
1. 合并数组
```
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
2. 与解构赋值结合
3. 扩展运算符可以与解构赋值结合起来，用于生成数组。
```
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```
```
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```
**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**

```
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```
### 函数的返回值
JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
```
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date[^没太懂].
```
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
## 字符串
将字符串转为真正的数组
[...'hello']
// [ "h", "e", "l", "l", "o" ]

## 实现了Iterator的对象[^没太懂].
任何Iterator接口的对象,都可以用扩展运算符转为真正的数组
```
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```
对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
```
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```
上面代码中，arrayLike是一个类似数组的对象，但是没有部署Iterator接口[^没太懂]，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

## Map和Setjiegou ,Generator函数
只要有Iterator接口的东西,都可以使用扩展运算符
* Map结构[^没太懂]
```
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
* Generator函数[^没太懂]
```
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```
如果对没有iterator接口的对象，使用扩展运算符，将会报错。
```
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```
## 严格模式
规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
```
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```
>这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

* 设置全局的严格模式
* 把函数抱在一个无参数的立即执行函数里面
## name属性
 ES6 的name属性会返回实际的函数名。
```
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```
将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
```
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```
Function构造函数返回的函数实例，name属性的值为anonymous。
```
(new Function).name // "anonymous"
```
bind返回的函数，name属性值会加上bound前缀[^没太懂]。
```
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```
## 箭头函数
* 如果箭头函数不需要参数或者需要多个参数,就使用一个圆括号代表参数部分.
```
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```
* 如果箭头函数直接返回一个对象,必须在对象外面加上括号.
```
var getTempItem = id => ({ id: id, name: "Temp" });
```
* 箭头函数可以与变量解构结合使用。
```
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```
* 箭头函数使得表达更加简洁。
```
const isEven = n => n % 2 == 0;
const square = n => n * n;
```
* 简化回调函数。
```
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

```
// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = values.sort((a, b) => a - b);
```
* rest 参数与箭头函数结合的例子。 
```
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
`   
headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```
### 使用注意点
1. `this`对象,是定义时所在的对象,而不是使用时所在的对象
2. 不可以当做构造函数,也就是不可以使用new命令.
3. 不可以使用`arguments`对象,该对象在函数体内不存在,如果要用,可以用`rest`参数代替
4. 不可以使用`yield`命令,因此箭头函数不能用作Generator函数.

箭头函数转成 ES5 的代码如下
```
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```
请问下面的代码之中有几个this？
```
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```
除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
```
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}
foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
```
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
```
上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

## 箭头函数的嵌套
箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。
```
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

```
上面这个函数，可以使用箭头函数改写。
```
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```
下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
```
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
```
如果觉得上面的写法可读性比较差，也可以采用下面的写法。
```
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
```
箭头函数还有一个功能，就是可以很方便地改写λ演算。
```
// λ演算的写法[^没太懂]
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```

## 绑定 this(es7)
## 尾调用优化
尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
## 尾递归优化的实现 
## 尾递归优化的实现 
# 对象的扩展
ES6允许直接写入变量和函数,作为对象的属性和方法.
```
var foo ='bar';
var baz={foo};
baz //{foo:"bar"}
```
```
function f(x,y){
return {x,y};
}
//等同于
function f(x,y){
    return {x:x,y:y}
}
```
除了属性简写,方法也可以简写
```
var o={
    method(){
    
    }
}
//等同于
var o={
    medthod:function(){
        return "Hello";
    }
}

```
```
var birth = '2000/01/01';
var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
```
```
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

getPoint()
```
## 属性表达式
```
let obj={
    [prokey]:true,
    ['a'+'bc']:123
}
```
```
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```
表达式还可以用于定义方法名
```
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```
属性名表达式与简洁表示法,不能同时使用,会报错
```
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };

// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};
```
注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
```
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

```
## 方法的name属性
函数的name属性,返回函数名,对象方法也有name属性

```
const person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"
```
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。


```
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```
有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
```
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```
如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
```
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```
上面代码中，key1对应的 Symbol 值有描述，key2没有。

## Object.is()
比较两个值是否严格相等,与严格比较运算符(===)的行为基本一致.
```
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```
不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
## Object.assign()
对象合并,将源对象的所有可枚举属性,复制到目标对象.
```
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
* 如果只有一个参数 ,会直接返回该参数
* 如果该参数不是对象,则会先转成对象,然后返回
```
Object.assign(2) 
// Number {[[PrimitiveValue]]: 2}
typeof Object.assign(2) // "object"
```
* 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
```
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```
* 如果非参数











---


# 不懂的东西。
* for of
```
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
*  遍历器对象
*  部署Iterator接口 什么是Iterator接口
*  遍历器
* 数组的方法都有哪些
*  rest 参数 (用于获取函数的多余参数)
`(function(...args) {}).length // 0`
* 什么是Map Set 结构
* 柯里化   
* 尾调用优化
* 递归调用


[^没太懂]: 主要解决
