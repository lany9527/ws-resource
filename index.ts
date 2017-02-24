/**
 * Created by littlestone on 2017/2/10.
 */

class WsResource {
  public socketOpen: boolean = false;
  public socket: any = {};
  constructor(wsUrl) {
    this.connect(wsUrl);
    this.listen();
    this.afterConnect();
  }

  private listen() {
    const _that = this;
    return new Promise((resolve, reject) => {
      _that.socket.onopen((event) => {
        _that.socketOpen = true;
        console.log('WebSocket opened：', event);
        resolve(event);
      });
      _that.socket.onerror((event) => {
        console.error('Can not open WebSocket, please check...！', event);
        resolve(event);
      });
    })

  }

  private connect(wsUrl): WsResource {
    this.socket = new WebSocket(wsUrl);
    return this;
  }

  private afterConnect(resolve?, reject?): WsResource {
    this.socket.onmessage((res) => {
      console.log("Get data from webSocket server：", JSON.parse(res.data));
      resolve(JSON.parse(res.data));
    });
    return this;
  }

  //发送消息
  private sendMsg(reqObj, method) {
    const _that = this;
    const WsResource: WsResource = this;
    if (WsResource.socketOpen) {
      let header = {};
      let token = reqObj.token;
      if (token === undefined) {
        console.log("no token");
        header = {
          "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6)
        }
      } else if (token !== undefined) {
        console.log("get token");
        header = {
          "S-Request-Id": Date.now() + Math.random().toString(20).substr(2, 6),
          "Authentication": "Bearer " + token
        }
      }
      _that.socket.send({
        data: JSON.stringify({
          "method": method,
          "url": reqObj.url,
          "header": header,
          "body": JSON.stringify(reqObj.data)
        }),
        success: function (res) {
          console.log("Send data success: ", res)
        },
        fail: function (res) {
          console.log("Send data fail: ", res)
        }
      })
    } else {
      console.log("websocket server not opened");
    }
  }


  public get(url, token) {
    let _that = this;
    let reqObj = this.handleParams(url,{},token);
    setTimeout(() => {
      _that.sendMsg(reqObj, "GET");
    }, 300);
    return new Promise((resolve, reject) => {
      _that.afterConnect(resolve, reject);
    })
  }
  public post(url, data, token) {
    let _that = this;
    let reqObj = this.handleParams(url, data, token);
    setTimeout(() => {
      _that.sendMsg(reqObj, "POST");
    }, 300);
    return new Promise((resolve, reject) => {
      _that.afterConnect(resolve, reject);
    })
  }
  public update(url, data) {
    let _that = this;
    let reqObj = this.handleParams(url, data);
    setTimeout(() => {
      _that.sendMsg(reqObj, "UPDATE");
    }, 300);
    return new Promise((resolve, reject) => {
      _that.afterConnect(resolve, reject);
    })
  }
  public delete(url, data) {
    let _that = this;
    let reqObj = this.handleParams(url, data);
    setTimeout(() => {
      _that.sendMsg(reqObj, "DELETE");
    }, 300);
    return new Promise((resolve, reject) => {
      _that.afterConnect(resolve, reject);
    })
  }

  public handleParams(url, data?, token?) {
    let reqObj = {};
    reqObj['url'] = url;
    reqObj['data'] = data;
    reqObj['token'] = token;
    return reqObj;
  }
}

export default WsResource;