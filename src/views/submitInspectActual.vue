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
      chartHigh: 501,
      chartWidth: 1800,
      chartDOM: {},
      chartName: "M31 3月送检实绩",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
        "26日",
        "27日",
        "28日",
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
        "28日"
      ],
      series: {
        submitInspectPlan: [
          49,
          98.3,
          147.5,
          196.7,
          245.9,
          295.0,
          344.2,
          393.4,
          442.6,
          491.8,
          540.9,
          590.1,
          639.3,
          688.5,
          737.7,
          786.9,
          836.0,
          885.2,
          934.4,
          983.6,
          1032.8,
          1081.9,
          1131.1,
          1180.3,
          1229.5,
          1278.7,
          1327.8,
          1377.0,
          1426.2,
          1475.4,
          1524.6
        ],
        submitInspectActual: [
          55.1,
          90.4,
          129.5,
          174.2,
          220.7,
          259.2,
          299.3,
          342.2,
          381.2,
          426.5,
          472.3,
          520.7,
          566.2,
          602.1,
          656.2,
          708.1,
          758.8,
          810.8,
          856.9,
          903.9,
          949.0,
          1008.6,
          1060.0,
          1110.5,
          1159.2,
          1213.8,
          1264.9,
          1316.0,
          1374.5,
          1437.6,
          1521.2
        ],
        rateOfSubmitInspcetPerDay: [
          112,
          92,
          88,
          89,
          90,
          88,
          87,
          87,
          86,
          87,
          87,
          88,
          89,
          87,
          89,
          90,
          91,
          92,
          92,
          92,
          92,
          93,
          94,
          94,
          94,
          95,
          95,
          96,
          96,
          97,
          100
        ],
        rateOfSubmitInspcetPerMonth: [
          4,
          6,
          8,
          11,
          14,
          17,
          20,
          22,
          25,
          28,
          31,
          34,
          37,
          39,
          43,
          46,
          50,
          53,
          56,
          59,
          62,
          66,
          70,
          73,
          76,
          80,
          83,
          86,
          90,
          94,
          100
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
              name: "送检计划"
            },
            {
              name: "送检实绩"
            },
            {
              name: "日送检率"
            },
            {
              name: "月送检率"
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
            name: "送检计划",
            type: "line",
            data: _this.series.submitInspectPlan,
            label: {
              show: true,
              position: "top",
              color: "black"
            }
          },
          {
            name: "送检实绩",
            type: "line",
            data: _this.series.submitInspectActual,
            label: {
              show: true,
              color: "black"
            }
          },
          {
            name: "日送检率",
            type: "line",
            data: _this.series.rateOfSubmitInspcetPerDay,
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "black"
            }
          },
          {
            name: "月送检率",
            type: "line",
            data: _this.series.rateOfSubmitInspcetPerMonth,
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
