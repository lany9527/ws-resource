webSocket模拟http请求
 
# 使用
 
## 安装
 
````bash
    npm install ws-resource
````

## 用法示例
```javascript
// token为 非必传参数
// 需要服务器配合解析由websocket 传过去的data
import WsResource from 'ws-resource'
 
 const wsResource = new WxResource("ws://..."); //websocket 地址
 
 wsResource.get(
       'http://...',
       token
     ).then(function (res) {
       // ...
     });
 ````
 
 ```javascript
 wsResource.post(
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
 wsResource.delete(
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
 wsResource.update(
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