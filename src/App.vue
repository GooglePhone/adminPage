<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
<script>
import { websocket } from './websocket.js'
export default {
  mixins: [websocket],
  created() {
    this.initWebsocket() //開啓前後端的websocket通道
  },
  destroy() {
    this.websocketclose() //關閉websocket通道
  },
}
</script>
