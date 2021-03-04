//独立COOKIE文件     ck在``里面填写，多账号换行

//let yuedongzutokenVal = ``
let yuedongzutokenVal = process.env.BYD_CK



let yuedongzucookie = {
    yuedongzutokenVal: yuedongzutokenVal,

}

module.exports = yuedongzucookie
