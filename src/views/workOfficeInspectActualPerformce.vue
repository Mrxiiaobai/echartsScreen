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
      chartName: "M31 3月检查实绩",
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
        "28日",
        "29日",
        "30日",
        "31日"
      ],
      series: {
        amountOfSubmitInspectPerDay: [
          6.8,
          5.2,
          5.7,
          4.5,
          7.0,
          4.7,
          0.8,
          7.8,
          5.9,
          4.2,
          4.5,
          6.2,
          6.6,
          3.6,
          6.0,
          7.1,
          3.9,
          5.6,
          8.0,
          4.6,
          6.5,
          5.4,
          3.8,
          7.2,
          4.8,
          6.9,
          7.4,
          5.1,
          5.6,
          5.4
        ],
        amountOfProductPerDay: [
          "",
          "",
          "",
          3.3,
          4.7,
          9.3,
          7.3,
          6.2,
          4.2,
          5.9,
          6.8,
          3.5,
          2.9,
          4.0,
          7.3,
          4.1,
          5.2,
          4.5,
          5.9,
          7.0,
          7.1,
          3.6,
          7.5,
          4.2,
          4.2,
          5.5,
          6.8,
          3.7,
          5.0,
          9.8,
          4.3,
          5.3
        ],
        accumulativeSubmitInspectPlan: [
          6,
          11.1,
          16.7,
          22.3,
          27.9,
          33.5,
          39.1,
          44.7,
          50.2,
          55.8,
          61.4,
          67.0,
          72.6,
          78.2,
          83.8,
          89.4,
          95.0,
          100.5,
          106.1,
          111.7,
          117.3,
          122.9,
          128.5,
          134.1,
          139.7,
          145.3,
          150.8,
          156.4,
          162.0,
          167.6,
          173.2
        ],
        accumulativeSubmitInspectActual: [
          8.6,
          13.8,
          19.5,
          24.0,
          31.1,
          35.7,
          36.6,
          44.4,
          50.3,
          54.5,
          59.0,
          65.2,
          71.8,
          75.5,
          81.5,
          88.6,
          92.5,
          98.1,
          106.1,
          110.7,
          117.2,
          122.6,
          126.4,
          133.6,
          138.4,
          145.3,
          152.7,
          157.8,
          163.4,
          168.8,
          173.9
        ],
        accumulativeProductPlan: [
          "",
          "",
          "",
          5.3,
          10.6,
          16.0,
          21.3,
          26.6,
          31.9,
          37.3,
          42.6,
          47.9,
          53.2,
          58.5,
          63.9,
          69.2,
          74.5,
          79.8,
          85.2,
          90.5,
          95.8,
          101.1,
          106.5,
          111.8,
          117.1,
          122.4,
          127.7,
          133.1,
          138.4,
          143.7,
          149.0,
          154.4,
          159.7,
          165.0
        ],
        accumulativeProductActual: [
          "",
          "",
          "",
          3.3,
          8.0,
          17.3,
          24.6,
          30.8,
          35.0,
          41.0,
          47.8,
          51.2,
          54.1,
          58.1,
          65.5,
          69.6,
          74.8,
          79.2,
          85.1,
          92.1,
          99.2,
          102.9,
          110.4,
          114.6,
          118.8,
          124.3,
          131.1,
          134.7,
          139.7,
          150.0,
          154.3,
          159.5
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
        _this.chartDOM = echarts.init(document.getElementById("chart"), 'dark');
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
              name: "日送检量"
            },
            {
              name: "日产出量"
            },
            {
              name: "累计送检计划"
            },
            {
              name: "实际送检累计"
            },
            {
              name: "累计产出计划"
            },
            {
              name: "实际产出累计"
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
            max: 200,
            min: 0,
            splitNumber: 20,
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
            name: "万片",
            max: 100,
            min: 0,
            splitNumber: 20,
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
            // axisLabel: {
            //   formatter: "{value} %"
            // }
          }
        ],
        series: [
          {
            name: "日送检量",
            type: "bar",
            data: _this.series.amountOfSubmitInspectPerDay,
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            barWidth: "30%"
          },
          {
            name: "日产出量",
            type: "bar",
            data: _this.series.amountOfProductPerDay,
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            barWidth: "30%"
          },
          {
            name: "累计送检计划",
            type: "line",
            data: _this.series.accumulativeSubmitInspectPlan,
            label: {
              show: true,
              position: "top",
              color: "black"
            }
          },
          {
            name: "实际送检累计",
            type: "line",
            data: _this.series.accumulativeSubmitInspectActual,
            label: {
              show: true,
              color: "black"
            }
          },
          {
            name: "累计产出计划",
            type: "line",
            data: _this.series.accumulativeProductPlan,
            label: {
              show: true,
              position: "top",
              color: "black"
            }
          },
          {
            name: "实际产出累计",
            type: "line",
            data: _this.series.accumulativeProductActual,
            label: {
              show: true,
              color: "black"
            }
          }
        ],
        color: [
          "#CCFFCC",
          "#CCCCFF",
          "#000080",
          "#FF00FF",
          "#000080",
          "#008000"
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
</style>
