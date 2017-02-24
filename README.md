# 微信小程序webSocket模拟http请求
 
# 使用
 
## 安装
 
````bash
    npm install wx-resource
````

## 用法示例
```javascript
// token为 非必传参数
// 需要服务器配合解析由websocket 传过去的data
import WxResource from 'wx-resource'
 
 const wxResource = new WxResource("ws://..."); //websocket 地址
 
 wxResource.get(
       'http://...',
       token
     ).then(function (res) {
       // ...
     });
 ````
 
 ```javascript
 wxResource.post(
        'http://...',
        {          
          data: {
            x: y,
            y: y
          }
        },
        token
      ).then(function (res) {
        // ...
      });
```
```javascript
 wxResource.delete(
        'http://...',
        {
          data: {
            x: y,
            y: y
          }
        },
        token
      ).then(function (res) {
        // ...
      });
 ```
 
 ```javascript
 wxResource.update(
         'http://...',
         {
           data: {
             x: y,
             y: y
           }
         },
         token
       ).then(function (res) {
         // ...
       });
```"# ws-resource" 
