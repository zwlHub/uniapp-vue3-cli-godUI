
// 此处为模拟请求
export const findList = (params) => {
    return new Promise((resolve,reject) => {
        uni.request({
            url: '/devMock/list/getStuList',
            success: (res) => {
                resolve(res.data)
            },
            error: (err) => {
                reject(err)
            }
        })
    })
}