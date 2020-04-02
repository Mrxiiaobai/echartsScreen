<template>
  <!-- <div>
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
    
  </div>-->
  <div id="chart"></div>
</template>

<script>
// import echarts from "echarts";
// import theme from '../assets/js/theme'
export default {
  data: function () {
    return {
      xPosition: 0,
      yPosition: 0,
      chartType: '',
      chartHigh: 501,
      chartWidth: '100%',
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
        "26日",
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
        submitInspectPlanData: [
          6,
          11,
          17,
          22,
          28,
          34,
          39,
          45,
          50,
          56,
          61,
          67,
          73,
          78,
          84,
          89,
          95,
          101,
          106,
          112,
          117,
          123,
          129,
          134,
          140,
          145,
          151,
          156,
          162,
          168,
          173
        ],
        submitInspectActualPerformceData: [
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
        submitInspectRate: [
          154,
          124,
          116,
          108,
          111,
          107,
          94,
          99,
          100,
          98,
          96,
          97,
          99,
          96,
          97,
          99,
          97,
          98,
          100,
          99,
          100,
          100,
          98,
          100,
          99,
          100,
          101,
          101,
          101,
          101,
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
      document.getElementById("chart").style.height = document.documentElement.clientHeight + "px";
      document.getElementById("chart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("chart"), 'theme');
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
              name: "送检率"
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
            max: 180,
            min: -60,
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
            data: _this.series.submitInspectPlanData,
            label: {
              show: true,
              position: "top",
              // color: "black"
            }
          },
          {
            name: "送检实绩",
            type: "line",
            data: _this.series.submitInspectActualPerformceData,
            label: {
              show: true,
              // color: "black"
            }
          },
          {
            name: "送检率",
            type: "line",
            data: _this.series.submitInspectRate,
            yAxisIndex: 1,
            label: {
              show: true,
              // color: "black"
            }
          }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    }
  },
  mounted() {
    document.getElementById("chart").style.height = this.chartHigh + "px";
    document.getElementById("chart").style.width = this.chartWidth + "px";
    this.chartDOM = this.$echarts.init(document.getElementById("chart"));
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
