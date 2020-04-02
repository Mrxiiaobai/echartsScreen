<template>
  <div>
    <el-form :inline="true">
      <el-row>
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
      //是否显示动画
      isanimation: false,
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
    };
  },
  methods: {
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      let _this = this;
      if (_this.chartType === "") {
        _this.$message.error("请选择图标类型");
        return;
      }
      _this.chartDOM.dispose();
      document.getElementById("chart").style.height = _this.chartHigh + "px";
      document.getElementById("chart").style.width = _this.chartWidth + "px";
      _this.$nextTick(() => {
        _this.chartDOM = echarts.init(document.getElementById("chart"));
        _this.processDataOfChart(_this.chartType);
        _this.chartDOM.setOption(_this.chartOption);
      });
    },
    processDataOfChart(type) {
      let _this = this;
      let tempLegendArray = [];
      _this.chartData.forEach(item => {
        tempLegendArray.push(item.name);
      });
      let tempDataArray = [];
      _this.chartData.forEach(item => {
        tempDataArray.push(item.value);
      });
      if (type === "pie") {
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
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: tempLegendArray
          },
          series: [
            {
              name: _this.chartName,
              type: type,
              avoidLabelOverlap: false,
              label: {
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              data: _this.chartData
            }
          ]
        };
      } else {
        _this.chartOption = {
          title: {
            text: _this.chartName
          },
          xAxis: {
            type: "category",
            data: tempLegendArray
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              type: _this.chartType,
              data: tempDataArray
            }
          ]
        };
      }
    },
    reset() { },
    confirm() {
      this.dialogVisible = false;
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    document.getElementById("chart").style.height = this.chartHigh + "px";
    document.getElementById("chart").style.width = this.chartWidth + "px";
    this.chartDOM = echarts.init(document.getElementById("chart"));
  }
};
</script>

<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
</style>
