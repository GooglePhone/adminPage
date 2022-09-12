<template>
  <div>
    {{ currentOrderTime }}
    <CForm>
      <CTable align="middle" class="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell class="text-center">菜名</CTableHeaderCell>
            <CTableHeaderCell class="text-center">數量</CTableHeaderCell>
            <CTableHeaderCell class="text-center">價錢</CTableHeaderCell>
            <CTableHeaderCell class="text-center">時間</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <template v-for="order in currentOrder" :key="order.id">
          <div class="">
            <div class="row">
              <div class="col-sm-8">訂單編號 : {{ order.id }}</div>
              <div class="col-sm-4">
                <div>
                  <CFormSwitch
                    id="formSwitchCheckChecked"
                    :checked="order.status == 2"
                    label="是否出餐"
                    @change="changeStatus(order)"
                  />
                </div>
              </div>
            </div>
          </div>
          <CTableBody>
            <CTableRow
              v-for="item in JSON.parse(order.content)"
              :key="item.name"
            >
              <CTableDataCell class="text-center">
                <div>{{ item.name }}</div>
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ item.num }}</CTableDataCell
              >
              <CTableDataCell class="text-center">
                <div class="clearfix">
                  <div>
                    {{ item.price }}
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell class="text-center"
                >{{ item.ctime }}
              </CTableDataCell>
            </CTableRow>
            <CTableRow style="text-align: right">
              <CTableDataCell class="text-center"></CTableDataCell>
              小計: {{ order.totalPrice }}
            </CTableRow>
          </CTableBody>
        </template>
      </CTable></CForm
    >
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { api } from '../apiRequset.js'
const store = useStore()
const currentOrder = ref()
getCurrentOrder()

watch(
  () => store.state.updateCurrentOrderTime,
  function () {
    getCurrentOrder()
  },
)

function getCurrentOrder() {
  api.getCurrentOrder().then((response) => {
    currentOrder.value = response.data
  })
}
function changeStatus(item) {
  api
    .changeOrderStatus({ orderId: item.id, status: item.status == 1 ? 2 : 1 })
    .then((response) => {
      response
    })
  item.status = item.status == 0 ? 1 : 0
  setTimeout(getCurrentOrder, 50000)
}
</script>
