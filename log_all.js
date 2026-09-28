/*
 *
 *
脚本功能：listenleap-帮你听懂英语播客-通过播客学英语
软件版本：1.5.1
下载地址：
脚本作者：
更新时间：2025
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 帮你听懂英语播客-通过播客学英语
^https?:\/\/.* url script-response-body https://raw.githubusercontent.com/lee723/pic/refs/heads/master/log_all.js

[mitm]
hostname = *
*
*
*/


// 1. 获取请求 URL
const requestUrl = $request ? $request.url : "未知 URL";

// 2. 获取响应状态码和响应体
const statusCode = $response ? $response.statusCode : "无状态码";
let responseBody = $response ? $response.body : "";

// 3. 格式化日志输出
console.log(`\n================== [QX Log Start] ==================`);
console.log(`[URL]    : ${requestUrl}`);
console.log(`[Status] : ${statusCode}`);

if (responseBody) {
    try {
        const jsonObj = JSON.parse(responseBody);
        console.log(`[Body]   : \n${JSON.stringify(jsonObj, null, 2)}`);
    } catch (e) {
        const printBody = responseBody.length > 1000 
            ? responseBody.substring(0, 1000) + "\n... (内容过长已截断)" 
            : responseBody;
        console.log(`[Body]   : \n${printBody}`);
    }
} else {
    console.log(`[Body]   : (空响应体)`);
}

console.log(`================== [QX Log End] ==================\n`);

// 4. 恢复数据流
$done({});
