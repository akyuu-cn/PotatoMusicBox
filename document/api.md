# PotatoMusicBox - API 开发文档
本文档将详细介绍 PMB API 的使用方法

## 房间播放列表数据体
```
[
    {
        "uuid": "338f6864-be80-4018-be11-a7fefab5b001",
        "timestamp": 1690876809,
        "platform": "bilibili",
        "id": "BV1KG4y1X7Fb",
        "length": 100,
        "addby": "PotatoDev"
    },
    {
        "uuid": "abd3a5cb-ef83-4115-95cc-6411ce98b43c",
        "timestamp": 1690876810,
        "platform": "netease",
        "id": "114514",
        "length": 100,
        "addby": "PotatoDev"
    }
]
```

## API
### GET | 获取播放列表
```
/api/playlist/get
```

参数：
```
{
    "roomKey": "foobar"
}
```
`roomKey`：房间密钥

返回值：
```
{
    "success": true,
    "code": 0,
    "data": [
    {
        "uuid": "338f6864-be80-4018-be11-a7fefab5b001",
        "timestamp": 1690876809,
        "platform": "bilibili",
        "id": "BV1KG4y1X7Fb",
        "length": 100,
        "addby": "PotatoDev"
    },
    {
        "uuid": "abd3a5cb-ef83-4115-95cc-6411ce98b43c",
        "timestamp": 1690876810,
        "platform": "netease",
        "id": "114514",
        "length": 100,
        "addby": "PotatoDev"
    }
    ]
}
```
`code`：0 成功，1 密钥错误，2 内部错误

### POST | 添加播放项目
```
/api/playlist/add
```

参数：
```
{
    "roomKey": "foobar",
    "userKey": "foobar",
    "platform": "bilibili",
    "id": "BV1KG4y1X7Fb",
    "length": 100
}
```
`roomKey`：房间密钥
`userKey`：用户密钥
`platform`：添加项目所处平台
`id`：对应的平台的内容 id
`length`：内容长度

返回值：
```
{
    "success": true,
    "code"：0,
    "data": [
    {
        "uuid": "338f6864-be80-4018-be11-a7fefab5b001",
        "timestamp": 1690876809,
        "platform": "bilibili",
        "id": "BV1KG4y1X7Fb",
        "length": 100,
        "addby": "PotatoDev"
    },
    {
        "uuid": "abd3a5cb-ef83-4115-95cc-6411ce98b43c",
        "timestamp": 1690876810,
        "platform": "netease",
        "id": "114514",
        "length": 100,
        "addby": "PotatoDev"
    }
    ]
}
```
`code`：0 成功，1 密钥错误，2 内部错误

### POST | 删除播放项目
```
/api/playlist/remove
```

参数：
```
{
    "roomKey": "foobar",
    "userKey": "foobar",
    "uuid": "rua"
}
```
`roomKey`：房间密钥
`userKey`：用户密钥
`uuid`：欲删除的项目的 uuid

返回值：
```
{
    "success": true,
    "code"：0,
    "data": [
    {
        "uuid": "338f6864-be80-4018-be11-a7fefab5b001",
        "timestamp": 1690876809,
        "platform": "bilibili",
        "id": "BV1KG4y1X7Fb",
        "length": 100,
        "addby": "PotatoDev"
    },
    {
        "uuid": "abd3a5cb-ef83-4115-95cc-6411ce98b43c",
        "timestamp": 1690876810,
        "platform": "netease",
        "id": "114514",
        "length": 100,
        "addby": "PotatoDev"
    }
    ]
}
```
`code`：0 成功，1 密钥错误，2 内部错误



### POST | 发送心跳包
```
/api/user/heartbeat
```

参数：
```
{
    "roomKey": "foobar",
    "userKey": "foobar"
}
```
`roomKey`：房间密钥
`userKey`：用户密钥

返回值：
```
{
    "success": true,
    "code"：0,
    "data": [
    {
        "name": "PotatoDev1",
        "lastseen": 1691396383366
    },
    {
        "name": "PotatoDev2",
        "lastseen": 1691396383366
    }
    ]
}
```
`code`：0 成功，1 密钥错误，2 内部错误