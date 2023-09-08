import fs from 'fs'

const express = require('express')
const app = express()

// 设置请求体解析中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const roomKey = "c23759f5-3a92-4607-8ba8-cfa1f8cd37c2"

var playlist: any = []
var userOnline: any = []
var userList = JSON.parse(fs.readFileSync("./userList.json").toString())

setInterval(() => {
    userList = JSON.parse(fs.readFileSync("./userList.json").toString())
}, 10000)

function findUserByUUID(uuid: string) {
    const user = userList.find((item: any) => item.key === uuid)
    return user ? user : null;
}

function removeItemByUUID(jsonData: any, uuidToRemove: string) {
    return jsonData.filter((item: any) => item.uuid !== uuidToRemove)
}

function cleanUpPlaylist() {
    playlist = playlist.filter((item: any) => item.timestamp + item.length * 1000 >= getTimestamp())
    return
}

function updateOnlineUser(userName: string) {
    let user = userOnline.find((item: any) => item.name === userName)
    if (user != null) {
        user.lastseen = getTimestamp()
    } else {
        userOnline.push({
            "name": userName,
            "lastseen": getTimestamp()
        })
    }
}

function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

function getTimestamp() {
    return new Date().getTime()
}

app.get('/api/ping', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const data = {
        success: true,
        message: 'pong!',
        timestamp: Date.now()
    }
    res.json(data)
})

app.get('/api/playlist/get', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let _code = 1
    let _playlist = []
    let _success = false

    if (req.query.roomKey == roomKey) {
        _code = 0
        cleanUpPlaylist()
        _playlist = playlist
        _success = true
    }

    const data = {
        success: _success,
        code: _code,
        data: _playlist
    }
    res.json(data)
})


app.post('/api/playlist/add', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let _code = 1
    let _playlist = []
    let _success = false

    if (req.query.roomKey == roomKey) {
        const user: any = findUserByUUID(req.query.userKey)
        if (user != null) {
            let _timestamp: number = getTimestamp()
            const lastItem = playlist.slice(-1)[0];
            if (playlist.length != 0 && lastItem.timestamp + lastItem.length * 1000 > _timestamp) {
                _timestamp = lastItem.timestamp + lastItem.length * 1000
            }

            playlist.push(
                {
                    "uuid": getUUID(),
                    "timestamp": _timestamp,
                    "platform": req.query.platform,
                    "id": req.query.id,
                    "length": req.query.length,
                    "url": req.query.url,
                    "addby": user.name
                }
            )
            _code = 0
            cleanUpPlaylist()
            _playlist = playlist
            _success = true
        }
    }

    const data = {
        success: _success,
        code: _code,
        data: _playlist
    }
    res.json(data)
})


app.post('/api/playlist/remove', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let _code = 1
    let _playlist = []
    let _success = false

    if (req.query.roomKey == roomKey) {
        const userName: any = findUserByUUID(req.query.userKey)
        if (userName != null) {
            playlist = removeItemByUUID(playlist, req.query.uuid)
            _code = 0
            cleanUpPlaylist()
            _playlist = playlist
            _success = true
        }
    }

    const data = {
        success: _success,
        code: _code,
        data: _playlist
    }
    res.json(data)
})

app.post('/api/playlist/clear', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let _code = 1
    let _success = false

    if (req.query.roomKey == roomKey) {
        const userName: any = findUserByUUID(req.query.userKey)
        if (userName != null) {
            playlist = []
            _code = 0
            _success = true
        }
    }

    const data = {
        success: _success,
        code: _code
    }
    res.json(data)
})

app.post('/api/user/heartbeat', (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let _code = 1
    let _userOnline = []
    let _success = false

    if (req.query.roomKey == roomKey) {
        const user: any = findUserByUUID(req.query.userKey)
        if (user != null) {
            updateOnlineUser(user.name)
            _code = 0
            _userOnline = userOnline
            _success = true
        }
    }

    const data = {
        success: _success,
        code: _code,
        data: _userOnline
    }
    res.json(data)
})




// 启动服务器
const port = 33000
app.listen(port, () => {
    console.log(`PMB Server started on port ${port}`)
})
