<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts">
      <div id="kbbadtrendChart"></div>
      <div id="kbbadtrendChart2"></div>
      <div id="kbbadtrendTable"></div>
    </div>
  </el-scrollbar>
</template>

<script>
import mui from "../../assets/js/mui.min"
export default {
  data: function () {
    return {
      tableData: [],
      news: 0,
      xPosition: 0,
      yPosition: 0,
      chartType: '',
      chartHigh: 400,
      chartWidth: '100%',
      chartHigh2: 370,
      chartWidth2: '100%',
      chartDOM: {},
      chartName: "2018年神龙2ND 检查不良率",
      chartName2: "神龙2ND所有不良项目分析汇总",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      series: {
        submitInspectPlanData: [
        ],
        tempbadtrend: [
        ],
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
  },
  methods: {
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("kbbadtrendChart").style.height = this.chartHigh + "px";
      document.getElementById("kbbadtrendChart").style.width = this.chartWidth + "px";
      document.getElementById("kbbadtrendChart2").style.height = this.chartHigh2 + "px";
      document.getElementById("kbbadtrendChart2").style.width = this.chartWidth2 + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("kbbadtrendChart").style.width = '100%';
      document.getElementById("kbbadtrendChart2").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("kbbadtrendChart"), 'theme');
        _this.chartDOM2 = _this.$echarts.init(document.getElementById("kbbadtrendChart2"), 'theme');
        _this.processDataOfChart();
        _this.chartDOM.setOption(_this.chartOption);
        _this.chartDOM2.setOption(_this.chartOption2);
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
        grid: {
          x: 60,
          x2: 0,
        },
        legend: {
          data: [{
            name: "检查不良率"
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
            // max: 180,
            // min: -60,
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
          },
        ],
        series: [
          {
            name: "检查不良率",
            type: "line",
            data: _this.series.submitInspectPlanData,
            // yAxisIndex: 1,
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
          }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
      _this.chartOption2 = {
        title: {
          text: _this.chartName2,
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
        grid: {
          x: 60,
          x2: 0,
        },
        legend: {
          data: [{
            name: "神龙2ND所有不良项目分析汇总"
          }
          ],
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            show: true,
            data: ['砂眼',
              '划痕',
              '磨废',
              '毛刺',
              '外状废',
              '翘曲',
              '裂纹',
              '其他',],
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
            name: "",
            // max: 200,
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

        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 10,
            data: _this.series.tempbadtrend,
            // yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              // color: "black"
            }
          }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getdate() {
      let _this = this;
      var data = {
        query: _this.kbpgrmd_query
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbbadtrendget',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        success: function (e) {
          // console.log(e)
          let result = JSON.parse(e.d)
          console.log(result)
          _this.chartName = result.title;
          _this.chartName2 = result.title;
          _this.xAxisData = [];
          _this.series.submitInspectPlanData = []
          _this.series.tempbadtrend = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          // _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctbt_date = element.tbt_date
            let ctbt_rate = element.tbt_rate
            ctbt_date = ctbt_date.split('-')[2];
            ctbt_date = ctbt_date.substring(0, 2);
            _this.xAxisData.push(ctbt_date);
            _this.series.submitInspectPlanData.push(ctbt_rate)
          }
          _this.series.tempbadtrend.push(result.table2[0].tbt1_sandeye)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_collapse)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_scratch)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_grinding)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_glitch)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_warpage)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_crack)
          _this.series.tempbadtrend.push(result.table2[0].tbt1_other)
          console.log(result.table1[0].tbt1_sandeye)
          _this.news++
          _this.generateChart();
          _this.cyclegetdate()
        },
        error: function () {
          _this.cyclegetdate()
        }
      })
    },
    cyclegetdate() {
      if (document.getElementById("kbbadtrendTable") == null) {
        return
      }
      if (this.kbpgrmd_get_time == undefined) {
        return
      }
      setTimeout(() => {
        this.getdate()
      }, this.kbpgrmd_get_time * 1000);
    }
  },
  mounted() {


  },
  created() {
    this.getdate()

  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#kbbadtrendChart {
  border-radius: 15px;
  overflow: hidden;
}
#kbbadtrendChart2 {
  margin-top: 15px;
  /* padding-top: 15px; */
  border-radius: 15px;
  overflow: hidden;
}
#kbbadtrendTable {
  width: 100%;
}
</style>
<style>
.el-table td,
.el-table th {
  padding: 0px 0 !important;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0px;
}
.el-table .cell,
.el-table th div {
  padding-right: 0px;
}
</style>
