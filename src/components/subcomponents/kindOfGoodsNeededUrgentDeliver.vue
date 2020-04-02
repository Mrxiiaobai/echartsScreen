<template>
  <div>
		<div class="likeButten">
			<div>更新时间</div>
			<span>{{lastRefreshTime}}</span>
		</div>
    <div>急发货品种看板（总览）</div>
    <el-table :data="tableData" :height="tableHeight" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="品名" width="100"></el-table-column>
      <el-table-column prop="commodityCode" label="商品编码" width="280"></el-table-column>
      <el-table-column prop="attributeOffice" label="归属科室" width="100"></el-table-column>
      <el-table-column prop="deliverNo" label="发货数" width="80"></el-table-column>
      <el-table-column prop="inventoryNo" label="库存数" width="80"></el-table-column>
    </el-table>
    <div>急发货品种看板（总览）</div>
    <el-table :data="tableData" :height="tableHeight" border style="width: 100%">
      <el-table-column prop="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="品名" width="100"></el-table-column>
      <el-table-column prop="commodityCode" label="商品编码" width="280"></el-table-column>
      <el-table-column prop="productionCompontentId" label="产品零件号" width="280"></el-table-column>
      <el-table-column prop="batchId" label="批量号" width="100"></el-table-column>
      <el-table-column prop="attributeOffice" label="归属科室" width="100"></el-table-column>
      <el-table-column prop="deliverNo" label="发货数" width="80"></el-table-column>
      <el-table-column prop="inventoryNo" label="库存数" width="80"></el-table-column>
      <el-table-column prop="deliveredInventorySameToday" label="当日已发库存" width="150"></el-table-column>
      <el-table-column prop="oilingNedded" label="上油需求" width="100"></el-table-column>
      <el-table-column prop="productingNo" label="在制品数" width="150"></el-table-column>
      <el-table-column prop="productingLocation" label="在制品位置" width="150"></el-table-column>
      <el-table-column prop="coatingFeedbackResult" label="涂层反馈结果" width="150"></el-table-column>
      <el-table-column prop="rejectRatio" label="不良率" width="75"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 500,
      tableData: []
    };
  }
};
</script>
