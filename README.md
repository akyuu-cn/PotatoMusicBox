# PotatoMusicBox
在线多人一起听歌，支持网易云及网易云电台
## 在线预览
[pmb.akyuu.cn](https://pmb.akyuu.cn)
## 启动前的准备
1. 在 `app.ts` 中修改 `roomKey` 常量，可以为任何字符串，但**建议**选择一个随机的uuid  
  
2. 在node目录下新建 `userList.json` 文件，并按照以下格式新建用户：  
```
[
    {
        "key": "replace_me_with_uuid",
        "name": "user1"
    },
    {
        "key": "replace_me_with_uuid",
        "name": "user2"
    }
]
```  

3. 启动 node 项目
