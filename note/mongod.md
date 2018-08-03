# mongod

## 命令行插入

```
//查询mongod位置
`$ which mongod`
// 进入mongod命令行
`/usr/local/Cellar/mongodb/bin/mongod`
`$ cd /usr/local/Cellar/mongodb/bin/`
`$./mongod`
//使用数据表格
$ use bug
switched to db bug
//查询
$db.accounts.insert({
...    "salt": "6de1a85f69db9bf65b016fc3bf6d6cecc3b64cc2e6741ea332afb6e115d1b53d",
...    "hash": "447e6dcedb8ab3a0c1c16536b3eff8907745d38b5fc0a22db4fd19042dc8a7ae9d2e3d97ef984400ee1aa381ad08f62137273f178abfa5983b5d810dbd934c5ae2da38c8a8a4f40f699e91b9f16d1a80471f479aae59f373b09dcb25dcc2f88319246951d68c10d2dc8e505554ba11cdbed53ebf6a247bb81fd9f5da334c7ddf9133f23a5946c5331a933198ff393fc50bc464e4c8adf68bee44006fb7f23361ec345a65c2dbe0dbd9dbe83c257957f2cd65f7c4f4710d1e4398a579ea635b1c840961cf088a38c651fdf40bfd4d6b4e8aa667ba9e30403285fc2c8d8ad038d1e2cc78021759a104bf6565adfcc08c2a8703c1d6f2b837e3bb1fe6b34e75c2eed88ef6bdfb3d3cd859e85aac146baa7339fb5cf8f90f3613b11b6eb4fbafe47e6f65db718b98ec0a5594b8ca457501d96d7858474fbc26b689f5ae9e7352026e125c2a52029505e6dbbc42ca2b3bf9df168af6d9e2415728a7551829527dbbc840f08591af4f265dcfeba4c24984db7e5fd6aaa97a926f5069d971b457dc1df45070f1599121958115f20e8c17a1188fa87bb60301e7ec9085d8a12714ae5a2c46937b7a0d8122331d2914454d3276be5b31b8398c257498ebc018c5c8f1bd7863242ceebd028a99a7307312cda608b1f71280e62a2545db77959fb585090ab6e19389077ed6f5a1aaa1f100b414bc5b1f7cfb20a1272966076b53899661ce20",
...    "username": "admin",
...    "ip": "127.0.0.1",
...    "create_time": 1465206116175,
...    "type": 1
... })
WriteResult({ "nInserted" : 1 })
$ db.settings.insert({
...    "id": 1,
...    "expired_time": 86400,
...    "edit_user": "admin",
...    "edit_time": 1465206116175
... })
WriteResult({ "nInserted" : 1 })

```


## 遇到的问题
1.Network is unreachable.
权限问题   使用  
`sudo  mongod`

