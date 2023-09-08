# PotatoMusicBox
在线多人一起听歌，支持网易云及网易云电台
## 在线预览
[pmb.akyuu.cn](https://pmb.akyuu.cn)
## 部署后端
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
## 部署前端
前端页面位于 `/frontend` 文件夹中，你可能需要修改前端的源码来设置默认服务器
