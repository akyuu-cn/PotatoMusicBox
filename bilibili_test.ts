const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('输入视频链接...\n', (str: string) => {

    const bvid: string = "BV" + str.split("/BV")[1].replace("/", "")
    console.log(bvid)

    const axios = require('axios')

    const apiUrl = 'https://api.bilibili.com/x/web-interface/view'

    const params = {
        bvid: bvid
    }

    axios.get(apiUrl, { params: params })
        .then((response: { data: any }) => {
            const cid: Number = response.data["data"]["cid"]
            console.log(cid)

            const apiUrlVid = "https://api.bilibili.com/x/player/playurl"
            const paramsVid = {
                cid: cid,
                bvid: bvid,
                qn: 6
            }

            console.log(paramsVid);

            axios.get(apiUrlVid, { params: paramsVid })
                .then((responseVid: { data: any }) => {
                    const url = responseVid.data["data"]["durl"][0]["url"]
                    console.log(url);

                    axios({
                        url: url,
                        method: 'GET',
                        responseType: 'stream',
                        headers: {
                            Referer: 'https://www.bilibili.com'
                        }
                    })
                        .then((response: { data: any }) => {
                            const filePath = './1.mp4';
                            const writer = fs.createWriteStream(filePath);
                            response.data.pipe(writer);

                            writer.on('finish', () => {
                                console.log('文件保存成功');
                            });

                            writer.on('error', (err: any) => {
                                console.error('文件保存失败:', err);
                            });
                        })
                        .catch((error: any) => {
                            console.error('下载文件时发生错误:', error);
                        })
                        .catch((error: any) => {
                            console.error(error);
                        });



                })
                .catch((error: any) => {
                    console.error(error)
                })

        })
        .catch((error: any) => {
            console.error(error)
        })

    rl.close()
})
