<template>
  <div>
    <CForm>
      <CTable align="middle" class="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell class="text-center">
              <CIcon name="cil-basket" />訂單編號
            </CTableHeaderCell>
            <CTableHeaderCell class="text-center">訂單內容</CTableHeaderCell>
            <CTableHeaderCell class="text-center">價錢</CTableHeaderCell>
            <CTableHeaderCell class="text-center">時間</CTableHeaderCell>
            <CTableHeaderCell>狀態</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="item in list" :key="item.name">
            <CTableDataCell class="text-center">
              {{ item.id }}
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <template v-for="dish in JSON.parse(item.content)">
                {{ dish.name }} x {{ dish.num }} &nbsp;
              </template>
              <!-- <div>{{ item.content }}</div> -->
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <div class="clearfix">
                <div>
                  {{ item.totalPrice }}
                </div>
              </div>
            </CTableDataCell>
            <CTableDataCell class="text-center">
              {{ item.ctime }}
            </CTableDataCell>
            <CTableDataCell>
              <div>已結帳</div>
            </CTableDataCell>
          </CTableRow>
          <CTableRow> </CTableRow>
        </CTableBody> </CTable
    ></CForm>
    <CPagination aria-label="Page navigation example" v-if="list !== null">
      <CPaginationItem
        aria-label="Previous"
        :disabled="page == 1"
        @click="currentPage > 1 && search(1)"
        ><span aria-hidden="true">&laquo;</span></CPaginationItem
      >
      <CPaginationItem
        aria-label="Previous"
        :disabled="currentPage == 1"
        @click="currentPage > 1 && search(--currentPage)"
        ><span aria-hidden="true">&#60;</span></CPaginationItem
      >
      <CPaginationItem active>{{ currentPage }}</CPaginationItem>
      <CPaginationItem
        aria-label="Previous"
        :disabled="currentPage < totalPage"
        @click="search(++currentPage)"
        ><span aria-hidden="true">&#62;</span></CPaginationItem
      >
      <CPaginationItem
        aria-label="Next"
        :disabled="currentPage == totalPage"
        @click="search(totalPage)"
        ><span aria-hidden="true">&raquo;</span></CPaginationItem
      >
    </CPagination>
  </div>
</template>
<script setup>
import { api } from '../apiRequset.js'
import { ref } from 'vue'
const list = ref(null)
const currentPage = ref(1)
const totalPage = ref(0)
const size = ref(5)
search(currentPage.value)
function search(page) {
  currentPage.value = page
  api
    .getHistory({ page: currentPage.value, size: size.value })
    .then((response) => {
      list.value = response.data.data
      currentPage.value = response.data.page
      totalPage.value = response.data.toatl / size.value
    })
}
</script>
