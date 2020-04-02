<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="siteId" label="座位号" width="150"></el-table-column>
    <el-table-column prop="name" label="姓名" width="150"></el-table-column>
    <el-table-column label="工序流程">
      <el-table-column prop="workOrderId" label="工票号" width="120"></el-table-column>
      <el-table-column prop="waitingForPrepare" label="待配料" width="120"></el-table-column>
      <el-table-column prop="perparing" label="配料中" width="120"></el-table-column>
      <el-table-column prop="perpared" label="配料完成" width="120"></el-table-column>
      <el-table-column prop="packaging" label="包装中" width="120"></el-table-column>
      <el-table-column prop="packaged" label="包装完成" width="120"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>
