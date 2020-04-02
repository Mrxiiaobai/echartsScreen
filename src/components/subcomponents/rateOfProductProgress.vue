<template>
  <div>
    <!-- <el-form :inline="true">
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
    </el-form>-->
    <div id="chart"></div>
  </div>
</template>
<script src:'../assets/darks.project.json'></script>
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
      chartName: "3月计划装配",
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
        handOverActual: [],
        fitPlan: [
          0,
          4270,
          8540,
          12810,
          12810,
          17080,
          21350,
          25620,
          29890,
          34160,
          38430,
          42700,
          46970,
          46970,
          51240,
          55510,
          59780,
          64050,
          68320,
          72590,
          72590,
          76860,
          81130,
          85400,
          89670,
          93940,
          98210,
          102480,
          106750,
          111020,
          0
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

      document.getElementById("chart").style.height = 600 + "px";
      document.getElementById("chart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = echarts.init(document.getElementById("chart"), 'theme');
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
              name: "交付实绩"
            },
            {
              name: "计划装配"
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
            max: 121800,
            min: 0,
            splitNumber: 29,
            splitLine: {
              show: true
            },
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              //   inside: true
            }
          }
        ],
        series: [
          {
            name: "交付实绩",
            type: "line",
            data: _this.series.handOverActual,
            label: {
              show: true,
              position: "top",
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          },
          {
            name: "计划装配",
            type: "line",
            data: _this.series.fitPlan,
            label: {
              show: true,
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
        ],
        // color: ["#CCFFCC", "#CCCCFF"]
      };
    }
  },
  mounted() {
    // document.getElementById("chart").style.height = this.chartHigh + "px";
    // document.getElementById("chart").style.width = '100 %';
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
