/*
软件名称:春风转
更新时间：2021-03-11 @肥皂
脚本说明：春风转
脚本为自动阅读新闻
每天三元上限？


下载地址

https://ss.tblk.me/tPwrE

本脚本以学习为主！
使用方法:
打开春风转，点击文章赚钱，下拉刷新一下，获得阅读数据
随便进入一篇文章阅读，获得金币奖励后提示获得上报数据


TG电报群: https://t.me/hahaha8028

boxjs地址 :

https://raw.githubusercontent.com/age174/-/main/feizao.box.json


春风转
圈X配置如下，其他软件自行测试，定时可以多设置几次，没任务会停止运行的
[task_local]
#春风转
/30 8-22 * * * https://raw.githubusercontent.com/age174/-/main/cfz.js, tag=春风转, img-url=https://ae01.alicdn.com/kf/U8a3a2572bf5d4584928d1d7cde52b50ba.jpg, enabled=true


[rewrite_local]
#春风转
http://cf-api.douzhuanapi.cn:10002/api/ url script-request-header https://raw.githubusercontent.com/age174/-/main/cfz.js
http://cf-api.douzhuanapi.cn:10002/api/ url script-request-header https://raw.githubusercontent.com/adw2s/Action/main/Task/22cfz.js



#loon
http://cf-api.douzhuanapi.cn:10002/api/ script-path=https://raw.githubusercontent.com/age174/-/main/cfz.js, requires-header=true, timeout=10, tag=春风转



#surge

春风转 = type=http-request,pattern=http://cf-api.douzhuanapi.cn:10002/api/,requires-header=1,max-size=0,script-path=https://raw.githubusercontent.com/age174/-/main/cfz.js,script-update-interval=0


[MITM]
hostname = cf-api.douzhuanapi.cn


for (let w = 0; w < 12; w++) {
  if(ts == 1){
      return;
    }
  $.index = w + 1
  console.log('\n'+`春风转开始执行循环阅读，本次共执行20次，已执行${i+1}次`)
  await cfzsplb()
  await $.wait(31000);
}

*/


const $ = new Env('春风转');
let status;
status = (status = ($.getval("cfzstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const cfzurlArr = [], cfzhdArr = [],cfzcount = ''
let cfzurl = $.getdata('cfzurl')
let cfzhd = $.getdata('cfzhd')
var cfzlb = '',cfzid = '',cfzmc = '',page = 1
let sdid = '';sdlqid = '';tc = 0;ts = 0

var hour,minute,random
var max = 50;
var min = 35;

if ($.isNode()) {
  hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
  minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
  hour = (new Date()).getHours();
  minute = (new Date()).getMinutes();
}


if ($.isNode()) {

   if (process.env.cfzurl && process.env.cfzurl.indexOf('\n') > -1) {
   cfzurl = process.env.cfzurl.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   cfzurl = process.env.cfzurl.split()
  };
  Object.keys(cfzurl).forEach((item) => {
        if (cfzurl[item]) {
          cfzurlArr.push(cfzurl[item])
        }
    });
  if (process.env.cfzhd && process.env.cfzhd.indexOf('\n') > -1) {
   cfzhd = process.env.cfzhd.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   cfzhd = process.env.cfzhd.split()
  };
  Object.keys(cfzhd).forEach((item) => {
        if (cfzhd[item]) {
          cfzhdArr.push(cfzhd[item])
        }
    });

    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)

 } else {cfzurl.push($.getdata('cfzurl'))
   cfzhdArr.push($.getdata('cfzhd'))
   let cfzcount = ($.getval('cfzcount') || '1');
   for (let i = 2; i <= cfzcount; i++) {
       cfzurlArr.push($.getdata(`cfzurl${i}`))
       cfzhdArr.push($.getdata(`cfzhd${i}`))
     }
}


!(async () => {
  if (!cfzhdArr[0]) {
    await cfzck()
  }
  console.log(`------------- 共${cfzhdArr.length}个账号-------------\n`)
  for (let i = 0; i < cfzhdArr.length; i++) {
    try {
            if (cfzhdArr[i]) {
              cfzurl = cfzurlArr[i];
              cfzhd = cfzhdArr[i];
              $.index = i + 1;
              console.log(`\n开始【春风转${$.index}】`)

              await cfzsigninfo();
              await $.wait(3000);
              //await cfzhhb();
              for (let i = 0; i < 12; i++) {
                  if(tc == 1){
                      return;
                    }
                  $.index = i + 1
                  console.log('\n'+`春风转开始执行循环阅读，本次共执行20次，已执行${i+1}次`)
                  await cfzqd()
                  await $.wait(31000);
                }
              await cfzrw1()
              await $.wait(3000)
              await cfzrw2()
              await $.wait(3000)
              await cfzrw3()
              await $.wait(3000)
              await cfzrw4()
              await $.wait(3000)
              await cfzsdid()

              }
          } catch (e) {
            $.logErr(e)
            $.logErr(e, `账号${i} 循环执行任务出现异常`)
          } finally {
            resolve()
          }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())




//春风转数据获取
function cfzck() {
   if ($request.url.indexOf("list?city_type") > -1) {
 const cfzurl = $request.url
  if(cfzurl)     $.setdata(cfzurl,`cfzurl${status}`)
    $.log(cfzurl)
  const cfzhd = JSON.stringify($request.headers)
        if(cfzhd)    $.setdata(cfzhd,`cfzhd${status}`)
$.log(cfzhd)
   $.msg($.name,"",'春风转'+`${status}` +'阅读数据获取成功！')
  }
if ($request.url.indexOf("ad_sense/report") > -1) {

  const cfzsbhd = JSON.stringify($request.headers)
        if(cfzsbhd)    $.setdata(cfzsbhd,`cfzsbhd${status}`)
$.log(cfzsbhd)
   $.msg($.name,"",'春风转'+`${status}` +'上报数据获取成功！')
  }
}


//春风转签到查询
function cfzsigninfo(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/gold_sign_info',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[查询签到]回执:成功🌝 \n累计签到: '+result.data.sign_days+'天\n今日收益: '+result.data.today_gold_gain+'金币\n')
                if(result.data.today_sign_status == 1){
                   console.log('\n今天已签到🌝 \n')
                }
                if(result.data.double_sign_status == 0){
                    console.log('\n开始领取[签到翻倍]🌝 \n')
                    doublesignstr = result.data.first_gold_gain_id;
                    //await $.wait(35000);
                    random = Math.floor(Math.random()*(max-min+1)+min)*1000
                    console.log(random);
                    await $.wait(random);
                    await cfzsigndouble();
                }
            } else {
                console.log('\n春风转[查询签到]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转签到

//春风转签到翻倍
function cfzsigndouble(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/gold_sign?gold_gain_id='+doublesignstr+'&type=2',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[签到翻倍]回执:成功🌝 \n获得: '+result.data.amount+'金币')
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
                //await $.wait(3000);
                await cfzsigndouble();
            } else {
                console.log('\n春风转[签到翻倍]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转签到翻倍上报
function cfzsigndoubletj(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
        headers : JSON.parse(cfzhd),
        body : 'ad_source=1&location=2&position=8&report_type=1',

        }
      $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[签到翻倍数据上报]回执:成功🌝'+result.data)
            } else {
                console.log('\n春风转[签到翻倍上报数据]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转任务列表数据
function cfztask(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/gold_red_task_info?osType=iOS',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[任务列表]回执:成功🌝'+result.data)
            } else {
                console.log('\n春风转[任务列表]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}



//春风转文章列表
function cfzqd(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
//let sjs = Math.floor(Math.random()*1000); //生成随机数
//let sjs = Math.floor(Math.random()*(5-1+1)+1)*1000
let sjs = Math.floor(Math.random() * 100); //生成随机数
let sj = Math.floor(Math.random() * 100); //生成随机数
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/article/list?city_type=1&page='+sjs+'&slide='+sj+'&tag_id=0&type=1',
        headers : JSON.parse(cfzhd),
}
      $.get(url, async (err, resp, data) => {
        cfzlb = data.match(/"list":(.*)/)[1]
        cfzid = cfzlb.match(/"id":(\w+),/)[1]
        cfzmc = cfzlb.match(/"title":"(.+?)","/)[1]
        //console.log(cfzmc)
        //$.done()
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[阅读列表]回执:成功🌝  \n📄阅读ID:'+cfzid+'\n📑开始阅读:'+cfzmc)
                await $.wait(3000);
                await cfzyd();
            } else {
                console.log('春风转[阅读列表]回执:失败🚫 '+result.message)
            }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//春风转文章阅读
function cfzyd(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_report?item_id='+cfzid,
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[领取阅读奖励]回执:成功🌝 \n获得奖励: '+result.data.amount+'金币，等待30秒继续领取')
                //await $.wait(30000);
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
                await cfzsb();
            } else {
                if(result.message == '您的自阅已超过次数'){
                        tc =1
                  }
                if(result.message == '\u60a8\u7684\u81ea\u9605\u5df2\u8d85\u8fc7\u6b21\u6570'){
                        tc =1
                  }
                if(result.message=='系统错误！'){
                console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'\n恭喜您，您的账号黑了，尝试上报数据修复，提示上报数据成功请关闭脚本等待一分钟再次运行试试')
                await cfzxf();
                }else{
                console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'脚本已停止运行')
                return
                }
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转文章上报数据
function cfzsb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_init?item_id='+cfzid,
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                //console.log('\n春风转[数据上报]回执:成功🌝'+result.message)
                await $.wait(5000);
                await cfztj()
            } else {
                console.log('\n春风转[上报数据]回执:失败🌚'+result.message)
            }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转文章上报提交数据
function cfztj(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
        headers : JSON.parse(cfzhd),
        body : 'ad_source=1&location=3&position=8&report_type=1',

        }
      $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[数据上报]回执:成功🌝'+result.data)
            } else {
                console.log('\n春风转[上报数据]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转修复系统错误
function cfzxf(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
        headers : JSON.parse(cfzhd),
        body : 'ad_source=1&location=3&position=8&report_type=1',
        }
      $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[数据上报]回执:成功🌝'+result.data)
            } else {
                console.log('\n春风转[上报数据]回执:失败🌚'+result.message)

            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}



//春风转视频列表
function cfzsplb(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
//let sjs = Math.floor(Math.random()*1000); //生成随机数
//let sjs = Math.floor(Math.random()*(5-1+1)+1)*1000
let sjs = Math.floor(Math.random() * 100); //生成随机数
let sj = Math.floor(Math.random() * 100); //生成随机数
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/article/list?city_type=1&page='+sjs+'&slide='+sj+'&tag_id=0&type=2',
        headers : JSON.parse(cfzhd),
}
      $.get(url, async (err, resp, data) => {
      try {
        cfzlb = data.match(/"list":(.*)/)[1]
        cfzid = cfzlb.match(/"id":(\w+),/)[1]
        cfzmc = cfzlb.match(/"title":"(.+?)","/)[1]
        //console.log(cfzmc)
        //$.done()
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[视频列表]回执:成功🌝  \n📄视频ID:'+cfzid+'\n📑开始观看:'+cfzmc)
                //await $.wait(36000);
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
                await cfzspr1();
            } else {
                console.log('春风转[视频列表]回执:失败🚫 '+result.message)
            }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



//春风转文章阅读
function cfzspr1(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_report?item_id='+cfzid,
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[领取阅读奖励]回执:成功🌝 \n获得奖励: '+result.data.amount+'金币，等待30秒继续领取')
                //await $.wait(30000);
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
                await cfzspread();
            } else {
                if(result.message == '您的自阅已超过次数'){
                        ts =1
                  }

                if(result.message == '\u60a8\u7684\u81ea\u9605\u5df2\u8d85\u8fc7\u6b21\u6570'){
                        ts =1
                  }
                if(result.message=='系统错误！'){
                console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'\n恭喜您，您的账号黑了，尝试上报数据修复，提示上报数据成功请关闭脚本等待一分钟再次运行试试')
                await cfzxf();
                }else{

                console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'脚本已停止运行')
                return
                }
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转视频阅读
function cfzspread(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_init?item_id='+cfzid,
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[阅读奖励]回执:成功🌝 \n获得奖励: '+result.data.single_award_total_time+'金币，等待30秒继续领取')
                //await $.wait(30000);
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
                await cfzspsb();
            } else {
                if(result.message == '您的自阅已超过次数'){
                        ts =1
                  }
                if(result.message == '\u60a8\u7684\u81ea\u9605\u5df2\u8d85\u8fc7\u6b21\u6570'){
                        ts =1
                  }
                if(result.message=='系统错误！'){
                console.log('\n春风转[阅读奖励]回执:失败🌚'+result.message+'\n恭喜您，您的账号黑了，尝试上报数据修复，提示上报数据成功请关闭脚本等待一分钟再次运行试试')
                await cfzxf();
                }else{

                console.log('\n春风转[阅读奖励]回执:失败🌚'+result.message+'脚本已停止运行')
                }
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转视频上报提交数据
function cfzspsb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
        headers : JSON.parse(cfzhd),
        body : 'ad_source=1&location=4&position=10&report_type=1',

        }
      $.post(url, async (err, resp, data) => {
        try {
            const result = JSON.parse(data)
            if(result.code == 200){
                console.log('\n春风转[视频数据上报]回执:成功🌝'+result.data)
                random = Math.floor(Math.random()*(max-min+1)+min)*1000
                console.log(random);
                await $.wait(random);
            } else {
                console.log('\n春风转[视频上报数据]回执:失败🌚'+result.message)
            }

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转每日任务阅读新闻
function cfzrw1(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=13',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[每日任务阅读新闻]回执:成功🌝 \n获得奖励: '+result.data.amount)

} else {

console.log('\n春风转[每日任务阅读新闻]回执:失败🌚'+result.message)
}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//春风转每日任务阅读60分钟
function cfzrw2(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=14',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[每日任务阅读60分钟]回执:成功🌝 \n获得奖励: '+result.data.amount)


} else {

console.log('\n春风转[每日任务阅读60分钟]回执:失败🌚'+result.message)
}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务福利视频
function cfzrw3(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=15',
        headers : JSON.parse(cfzhd),

        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[每日任务福利视频]回执:成功🌝 \n获得奖励: '+result.data.amount)


} else {

if(result.message =='该任务您还未完成'){
console.log('\n春风转[每日任务福利视频]回执:失败🌚'+result.message)
for (let i = 0; i < 3; i++) {

        $.log(`春风转开始执行观看福利视频，本次共执行3次，已执行${i+1}次`)
        await cfzrwsp()
      }
}else{console.log('\n春风转[每日任务福利视频]回执:失败🌚'+result.message)}

}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务晒图奖励
function cfzrw4(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=5',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[每日任务晒图奖励]回执:成功🌝 \n获得奖励: '+result.data.amount)


} else {

if(result.message =='该任务您还未完成'){
console.log('\n春风转[每日任务晒图奖励]回执:失败🌚'+result.message)
for (let i = 0; i < 3; i++) {

        $.log(`春风转开始执行观看福利视频，本次共执行3次，已执行${i+1}次`)
        await cfzrwst()
      }
}else{console.log('\n春风转[每日任务晒图奖励]回执:失败🌚'+result.message)}

}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转每日任务看视频
function cfzrwsp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/red_task_report?item_id=15&task_type=2',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
        const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[看广告视频]回执:成功🌝 \n获得奖励: '+result.data)
        } else {

        console.log('\n春风转[看广告视频]回执:失败🌚'+result.message)
        }
        }
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务晒图
function cfzrwst(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/red_task_report?item_id=5&task_type=5',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
            const result = JSON.parse(data)
            if(result.code == 200){
            console.log('\n春风转[晒图奖励]回执:成功🌝 \n获得奖励: '+result.data)

            } else {

            console.log('\n春风转[晒图奖励]回执:失败🌚'+result.message)
            }
            }
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每时段id
function cfzsdid(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_opt',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
 sdid = result.data.treasureBox_id
        console.log('\n春风转[时段ID]回执:成功🌝 \n时段ID: '+sdid)
           await cfzsdlq();

} else {

console.log('\n春风转[时段ID]回执:失败🌚'+result.message)
}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//时段领取
function cfzsdlq(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_gain?treasure_box_id='+sdid+'&type=1',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
 sdlqid = result.data.gold_gain_id
        console.log('\n春风转[时段领取]回执:成功🌝 \n时段ID: '+result.data.gold_amount)
           await cfzsdfb();

} else {

console.log('\n春风转[时段领取]回执:失败🌚'+result.message)
}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//时段翻倍领取
function cfzsdfb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_gain?gold_gain_id='+sdlqid+'&treasure_box_id='+sdid+'&type=2',
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号${i} API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[时段翻倍]回执:成功🌝 \n时段ID: '+result.data.gold_amount)

} else {

console.log('\n春风转[时段翻倍]回执:失败🌚'+result.message)
}
}
        } catch (e) {
          $.logErr(`======== 账号 ${i} ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.reple(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,cept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.reple(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.reple(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.reple(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stk):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
