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
