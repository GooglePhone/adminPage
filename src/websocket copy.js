import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'webstomp-client'
import { wsStore } from './wsStore'
import { onMounted } from 'vue'
// const websocketUrl = `wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self`;
// const websocketUrl = `ws://127.0.0.1:8080/`
export const websocket = {
  data() {
    return {
      ws: null,
    }
  },
  created() {
    //頁面剛進入時開啟長連線
    this.initWebsocket()
  },
  destroyed: function () {
    //頁面銷燬時關閉長連線
    this.websocketclose()
  },
  methods: {
    //初始websocket
    initWebsocket() {
      this.socket = new SockJS('http://localhost:8080/ws')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        // headers头部信息。可添加客户端的认证信息。也可以不添加信息，headers 直接就设置为 {}
        (header) => {
          header
        },
        (frame) => {
          websocket.data().ws = this
          console.log(frame)
          this.stompClient.subscribe('/topic/bind', function (data) {
            let orderList = []
            if (wsStore.currentOrder.value !== undefined) {
              orderList = wsStore.currentOrder.value.data
            }
            const currentData = JSON.parse(data.body)
            let exists = false
            orderList.forEach((element) => {
              if (element.orderId === currentData.orderId) {
                element.data.concat(currentData.data)
                exists = true
              }
            })
            if (!exists) {
              orderList.push(currentData)
            }
            wsStore.currentOrder.value = orderList
            // console.log('ddd' + data)
          })
          // this.stompClient.send(
          //   '/app/testMsg',
          //   {},
          //   JSON.stringify({ clientId: 'jjj' }),
          // )
          //   this.connectSucceed()
        },
        (err) => {
          this.initWebsocket
          // 连接失败的回调
          console.log(err)
          //   this.reconnect(this.socketUrl, this.connectSucceed)
        },
      )
    },
  },
}
