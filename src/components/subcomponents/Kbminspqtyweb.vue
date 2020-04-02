<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts" v-bind:style="{height:win_height+'vh'}">
      <div class="likeButton">
        <span style="font-size:13px;">更新时间:</span>
        <span>{{lastRefreshTime}}</span>
      </div>
      <!-- <div class="Dtime">
				<span>{{Dtime}}</span>
      </div>-->
      <div id="kbminspqtyChart"></div>
      <div id="kbminspqtyTable">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column
            :prop="index"
            :label="xAxisData2[index]"
            min-width="50%"
            v-for="(item,index) in tableData[0]"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import mui from "../../assets/js/mui.min"
import zhuzi from "../../assets/zhuzi.png"
export default {
  data: function () {
    return {
		win_height:'',
      lastRefreshTime: '',
      // Dtime:this.$props.kbpgrmd_get_time,
      zhuzi: zhuzi,
      tableData: [{
        0: "当日计划数",
      }, {
        0: "当日送检数",
      }, {
        0: "当日送检率",
      }, {
        0: "总体送检率",
      }, {
        0: "总体送检率",
      }],
      news: 0,
      xPosition: 0,
      innum: 0,
      yPosition: 0,
      chartType: '',
      chartHigh: 750,
      chartWidth: '100%',
      chartDOM: {},
      chartName: "加工单截至",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      xAxisData2: ['科室'
      ],
      series: {
        submitInspectPlanData: [
        ],
        submitInspectActualPerformceData: [
        ],
        submitInspectRate: [
        ],
        ct1_count_rat: [],
        t1_dplan_qty: []
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
	kbpgrmd_win_height: 0,
    ifShowTitle: false
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 1) {
      //   if (rowIndex % 2 === 0 && rowIndex < 4) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
      if (rowIndex === 4) {
        if (columnIndex === 1) {
          return [1, this.innum];
        }
      }
    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("kbminspqtyChart").style.height = this.chartHigh+'px';
      document.getElementById("kbminspqtyChart").style.width = this.chartWidth;
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("kbminspqtyChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("kbminspqtyChart"), 'theme');
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
        grid: {
          x: 60,
          x2: 60,
        },
        legend: {
          data: [
            {
              name: "当日计划数"
            }, {
              name: "当日送检数",
              icon: "image://" + _this.zhuzi
            },
            {
              name: "当日送检率"
            }, {
              name: "总体送检率"
            }, {
              name: '月送检率'
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
          }
        ],
        series: [
          {
            name: "当日计划数",
            type: "line",
            // yAxisIndex: 1,
            data: _this.series.t1_dplan_qty,
            label: {
              show: true,
              formatter: function (params) {
                return params.value
              },
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 2,
                type: 'dotted'
              }
            }
          },
          {
            name: "当日送检数",
            barWidth: 10,
            type: "bar",
            data: _this.series.submitInspectPlanData,
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  if (params.data >= _this.series.t1_dplan_qty[params.dataIndex]) {
                    return '#41b883';
                  } else {
                    return '#FF8080'
                  }
                }
              },
            },
            label: {
              show: true,
              position: "top",
              // color: "black"
            }
          },
          {
            name: "当日送检率",
            type: "line",
            data: _this.series.submitInspectActualPerformceData,
            yAxisIndex: 1,
            label: {
              show: true,
              formatter: function (params) {
                return params.value + '%'
              },
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          },
          {
            name: "总体送检率",
            type: "line",
            data: _this.series.submitInspectRate,
            yAxisIndex: 1,
            label: {
              show: true,
              formatter: function (params) {
                return params.value + '%'
              },
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          },
          //  {
          //   name: "月送检率",
          //   type: "line",
          //   data: _this.series.ct1_count_rat,
          //   yAxisIndex: 1,
          //   label: {
          //     show: true,
          //     // color: "black"
          //   },
          //   lineStyle: {
          //     normal: {
          //       width: 5
          //     }
          //   }

          // }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getdate() {
      let _this = this;
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      // this.chartDOM = this.$echarts.init(document.getElementById("kbminspqtyChart"));
      // mui.alert('aa')
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbminspqtyget',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        success: function (e) {
          console.log(e)
          let result = JSON.parse(e.d)
          console.log(result)
          _this.lastRefreshTime = result.writetime;

          _this.chartName = result.title;
          if (_this.ifShowTitle != true) {
            _this.chartName = ''
          }
          _this.xAxisData = [];
          _this.series.submitInspectPlanData = []
          _this.series.submitInspectActualPerformceData = []
          _this.series.submitInspectRate = []
          _this.series.t1_dplan_qty = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          // _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let t1_sec = element.t1_sec != '' ? element.t1_sec : 0;
            let t1_dchk_qty = element.t1_dchk_qty != '' ? element.t1_dchk_qty : 0;
            let t1_dplan_qty = element.t1_dplan_qty != '' ? element.t1_dplan_qty : 0;
            let t1_count_qty = element.t1_count_qty != '' ? element.t1_count_qty : 0;
            let t1_plcount_qty = element.t1_plcount_qty != '' ? element.t1_plcount_qty : 0;
            let t1_plshort_qty = element.t1_plshort_qty != '' ? element.t1_plshort_qty : 0;
            let t1_chk_rat = element.t1_chk_rat != '' ? element.t1_chk_rat : 0;
            let t1_srpchk_qty = element.t1_srpchk_qty != '' ? element.t1_srpchk_qty : 0;
            let t1_srpdchk_qty = element.t1_srpdchk_qty != '' ? element.t1_srpdchk_qty : 0;
            let t1_dchk_rat = element.t1_dchk_rat != '' ? element.t1_dchk_rat : 0;
            _this.xAxisData.push(t1_sec);
            _this.xAxisData2.push(t1_sec);
            _this.series.submitInspectPlanData.push(t1_dchk_qty)
            _this.series.t1_dplan_qty.push(t1_dplan_qty)
            _this.series.submitInspectActualPerformceData.push(t1_dchk_rat)
            _this.series.submitInspectRate.push(t1_chk_rat)
            // _this.series.ct1_count_rat.push(ct1_count_rat * 100)
            let amount = _index;
            _this.tableData[0][amount] = t1_dplan_qty
            _this.tableData[1][amount] = t1_dchk_qty
            _this.tableData[2][amount] = t1_dchk_rat
            _this.tableData[3][amount] = t1_chk_rat
            _index++
          }
          _this.xAxisData2.push('合计');
          _this.tableData[0][_index] = ''
          _this.tableData[1][_index] = result.table2[0].当日送检合计
          _this.innum = _index
          _this.tableData[4][1] = result.table2[0].总体送检率
          console.log(_this.tableData)
          _this.news++
          _this.generateChart();
          // _this.Dtime = _this.kbpgrmd_get_time

          _this.cyclegetdate()
        },
        error: function () {
          _this.cyclegetdate()
        }
      })
    },
    cyclegetdate() {
      if (document.getElementById("kbminspqtyTable") == null) {
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
	  this.chartHigh = this.kbpgrmd_win_height *7.5
	this.win_height = 92/100 * this.kbpgrmd_win_height
	  if(this.win_height > 92){
	  	this.win_height = 92
	  }

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
#kbminspqtyChart {
  border-radius: 15px;
  overflow: hidden;
}
#kbminspqtyTable {
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
