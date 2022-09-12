import { createStore } from 'vuex'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'webstomp-client'
export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    updateCurrentOrderTime: 0,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    updateCurrentOrderTime(state, payload) {
      payload
      state.updateCurrentOrderTime = state.updateCurrentOrderTime + 1
    },
    initWebsocket() {
      this.socket = new SockJS('http://localhost:8080/ws')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        // headers头部信息。可添加客户端的认证信息。也可以不添加信息，headers 直接就设置为 {}
        (header) => {
          header
        },
        (frame) => {
          frame
          this.stompClient.subscribe('/topic/bind', function () {
            this.updateCurrentOrder()
            // console.log('ddd' + data)
          })
          this.stompClient.send(
            '/app/testMsg',
            {},
            JSON.stringify({ clientId: 'jjj' }),
          )
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
  actions: {},
  modules: {},
})
