# typescript

## 为什么要学 ts


## 类型注解
```
function greeter(person:string){
    return 'hello,'+person
}

let user = 'jane uer';

document.body.innerHTML = greeter(user);
```

## 接口

```
function greeter(person) {
    return 'hello,' + person.firstName + " " + person.lastName;
}
var user = { firstName: 'jane', lastName: 'User' };
document.body.innerHTML = greeter(user);
```
