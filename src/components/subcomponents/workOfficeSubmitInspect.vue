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
      chartHigh: 400,
      chartWidth: 600,
      chartDOM: {},
      chartName: "加工科送检截止到28号进度表",
      chartOption: {},
      dialogVisible: false
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
              name: "当日送检数"
            },
            {
              name: "当日送检率"
            },
            {
              name: "总体送检率"
            }
          ],
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            show: true,
            data: ["M31", "M32", "M33", "M34", "M35", "M11", "M12", "合计"],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "单位：片",
            max: 1000000,
            min: 0,
            splitNumber: 10,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "value",
            scale: true,
            max: 350,
            min: 0,
            splitNumber: 8,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "当日送检数",
            type: "bar",
            data: [100770, 190465, 65140, 73134, 32369, 313505, 150712, 926095],
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            barWidth: "40%"
          },
          {
            name: "当日送检率",
            type: "line",
            data: [192, 177, 151, 271, 72, 314, 166],
            yAxisIndex: 1,
            label: {
              show: true,
              color: "black"
            }
          },
          {
            name: "总体送检率",
            type: "line",
            data: [98, 103, 85, 104, 94, 100, 102],
            yAxisIndex: 1,
            label: {
              show: true,
              color: "black"
            }
          }
        ],
        color: ["#4F81BD", "#C0504D", "#9BBB59"]
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
