<template>
  <div>
    <div class="fiexedD">
      <div style="width:100%">
        <el-form :inline="true">
          <el-row>
            <el-col :span="4">
              <el-form-item label="图表高：">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="图表高：">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" plain @click="generateChart">设置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="fiexedD">
      <div style="width:100%" v-for="(iteam,index) in source">
        <el-form :inline="true">
          <el-row>
            <el-col :span="2" v-for="(item,index) in iteam">
              <el-form-item>
                <el-input v-model="iteam[index]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" plain @click="generateChart">设置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div id="chart"></div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      xPosition: 0,
      yPosition: 0,
      chartType: "",
      chartHigh: 501,
      chartWidth: 1800,
      chartDOM: {},
      chartName: "3月入库实绩",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
        "1日",
        "2日",
        "3日",
        "4日",
        "5日",
        "6日",
        "7日",
        "8日",
        "9日",
        "10日",
        "11日",
        "12日",
        "13日",
        "14日",
        "15日",
        "16日",
        "17日",
        "18日",
        "19日",
        "20日",
        "21日",
        "22日",
        "23日",
        "24日",
        "25日",
        "26日",
        "27日",
        "28日",
        "29日",
        "30日",
        "31日"
      ],
      source: [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017',],
        ['a', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
        ['b', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
        ['c', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
        ['d', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
      ]
    };
  },
  methods: {
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      let _this = this;
      _this.chartDOM.dispose();
      document.getElementById("chart").style.height = _this.chartHigh + "px";
      document.getElementById("chart").style.width = _this.chartWidth + "px";
      _this.$nextTick(() => {
        _this.chartDOM = echarts.init(document.getElementById("chart"));
        _this.processDataOfChart();
        _this.chartDOM.setOption(_this.chartOption);
      });
    },
    processDataOfChart() {
      let _this = this;
      _this.chartOption = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: _this.source
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          { stack: '总量', type: 'bar', smooth: true, seriesLayoutBy: 'row' },
          { stack: '总量', type: 'bar', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]

      };
    }
  },
  mounted() {
    document.getElementById("chart").style.height = this.chartHigh + "px";
    document.getElementById("chart").style.width = this.chartWidth + "px";
    this.chartDOM = echarts.init(document.getElementById("chart"));
    this.generateChart();
  }
};
</script>

<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
.fiexedD {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
