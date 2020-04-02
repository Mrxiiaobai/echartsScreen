<template>
  <div>
    <el-form :inline="true">
      <el-row>
        <el-col :span="4">
          <el-form-item label="图表高：">
            <el-input v-model="chartHigh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="图表长：">
            <el-input v-model="chartWidth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" plain @click="generateChart">生成图表</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data: function () {
    return {
      xPosition: 0,
      yPosition: 0,
      chartType: "",
      chartHigh: 580,
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
      series: {
        receiptPlan: [
          47,
          94.2,
          141.3,
          188.5,
          235.6,
          282.7,
          329.9,
          377.0,
          424.1,
          471.2,
          518.4,
          565.5,
          612.6,
          659.8,
          706.9,
          754.0,
          801.1,
          848.3,
          895.4,
          942.5,
          989.7,
          1036.8,
          1083.9,
          1131.0,
          1178.2,
          1225.3,
          1272.4,
          1319.6,
          1366.7,
          1413.8,
          1461
        ],
        receiptActual: [
          26.2,
          65.8,
          114.3,
          152.8,
          194.3,
          237.2,
          277.5,
          321.8,
          366.0,
          408.0,
          443.4,
          483.9,
          533.7,
          573.3,
          627.3,
          676.6,
          727.0,
          767.3,
          809.0,
          861.0,
          906.5,
          967.4,
          1014.1,
          1061.7,
          1103.5,
          1155.2,
          1222.1,
          1274.3,
          1331.3
        ],
        rateOfReceiptPerDay: [
          56,
          70,
          81,
          81,
          82,
          84,
          84,
          85,
          86,
          87,
          86,
          86,
          87,
          87,
          89,
          90,
          91,
          90,
          90,
          91,
          92,
          93,
          94,
          94,
          94,
          94,
          96,
          97,
          97
        ],
        rateOfReceiptPerMonth: [
          2,
          5,
          8,
          10,
          13,
          16,
          19,
          22,
          25,
          28,
          30,
          33,
          37,
          39,
          43,
          46,
          50,
          53,
          55,
          59,
          62,
          66,
          69,
          73,
          76,
          79,
          84,
          87,
          91
        ]
      }
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
        title: {
          text: _this.chartName,
          x: "center",
          textStyle: {
            //文字颜色
            color: '#ccc',
            //字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '300',
            //字体系列
            fontFamily: 'sans-serif',
            //字体大小
            fontSize: 30
          }
        },
        legend: {
          data: [
            {
              name: "入库计划"
            },
            {
              name: "入库实绩"
            },
            {
              name: "日入库率"
            },
            {
              name: "月入库率"
            }
          ],
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            show: true,
            data: _this.xAxisData,
            splitNumber: _this.xAxisData.length,
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              inside: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "万片",
            max: 1600,
            min: 0,
            splitNumber: 16,
            splitLine: {
              show: false
            },
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              inside: true
            }
          },
          {
            type: "value",
            scale: true,
            max: 120,
            min: 0,
            splitNumber: 12,
            splitLine: {
              show: false
            },
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              inside: true
            },
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "入库计划",
            type: "line",
            data: _this.series.receiptPlan,
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          },
          {
            name: "入库实绩",
            type: "line",
            data: _this.series.receiptActual,
            label: {
              show: true,
              color: "black"
            }
          },
          {
            name: "日入库率",
            type: "line",
            data: _this.series.rateOfReceiptPerDay,
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "black"
            }
          },
          {
            name: "月入库率",
            type: "line",
            data: _this.series.rateOfReceiptPerMonth,
            yAxisIndex: 1,
            label: {
              show: true,
              color: "black"
            }
          }
        ],
        color: ["#CCFFCC", "#CCCCFF", "#FF00FF", "#000080"]
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
</style>
