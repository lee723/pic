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


// 1. 获取响应头与内容
const headers = $response ? $response.headers : {};
// 兼容 Header 键名大小写 (Content-Type / content-type)
const contentType = headers['Content-Type'] || headers['content-type'] || '';
const responseBody = $response ? $response.body : '';

// 2. 判断是否需要打印
let isJson = false;
let jsonObj = null;

// 判断条件 A：Header 中明确标注了 application/json
if (contentType.toLowerCase().includes('json')) {
    isJson = true;
} else if (responseBody) {// 判断条件 B：如果 Header 没有明确标注，但存在响应体，尝试解析是否为有效 JSON
    try {
        jsonObj = JSON.parse(responseBody);
        isJson = true; // 解析成功，确认是 JSON
    } catch (e) {
        // 解析失败，说明不是 JSON 格式
        if (!isJson) {
            jsonObj = null;
        }
    }
}

// 3. 如果是 JSON 请求，才打印日志
if (isJson) {
    const requestUrl = $request ? $request.url : "未知 URL";
    const statusCode = $response ? $response.statusCode : "无状态码";

    console.log(`\n################## [QX JSON Log Start] ##################`);
    console.log(`[URL]    : ${requestUrl}`);
    console.log(`[Status] : ${statusCode}`);
    
    if (jsonObj) {
        // 如果前面已经解析成功，直接格式化打印
        console.log(`[Body]   : \n${JSON.stringify(jsonObj, null, 2)}`);
    }
    
    console.log(`================== [QX JSON Log End] ==================\n`);
}

// 4. 必须调用 $done() 恢复数据流（非 JSON 请求不打印，但也要放行）
$done({});
