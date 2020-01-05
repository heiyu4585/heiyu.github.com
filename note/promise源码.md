# promise源码(已发布,2018.10.4)

1.最核心的功能

```
let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('result')
        console.log()
    }, 1000)
})

console.log(promise)//MyPromise {_status: "PENDING", _value: undefined}

setTimeout(function () {
    console.log(promise)
},3000) //MyPromise {_status: "FULFILLED", _value: "result"}
```

实现代码

```
//定义三种状态 promise 有三种状态:  发送中 成功 失败

// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor (handle) {
        // if (!isFunction(handle)) {
        //     throw new Error('MyPromise must accept a function as a parameter')
        // }
        // 添加状态
        this._status = PENDING
        // 添加状态
        this._value = undefined
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val
    }
    // 添加reject时执行的函数
    _reject (err) {
        if (this._status !== PENDING) return
        this._status = REJECTED
        this._value = err
    }
}

```