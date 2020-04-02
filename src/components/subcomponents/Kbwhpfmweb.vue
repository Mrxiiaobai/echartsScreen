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
      <div class="goback2" @click="noaction()">
        <span>图形</span>
        <el-switch
          class="showCharts"
          v-model="showCharts"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
        <span>表格</span>
        <el-switch
          v-model="showTable"
          @change="alertHeight()"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </div>
      <div id="kbwhpfmChart" v-show="showCharts"></div>
      <div id="kbwhpfmTable" v-show="showTable">
        <el-table
          :data="tableData"
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
import jiantou from "../../assets/jiantou.png"
export default {
  data: function () {
    return {
		top:'',
		win_height:'',
      lastRefreshTime: '',
      // Dtime:this.$props.kbpgrmd_get_time,
      tableData: [{
        0: "日入库计划",
      }, {
        0: "累计入库计划",
      }, {
        0: "实际日入库量",
      }, {
        0: "实际入库累计",
      }, {
        0: "入库率（日）",
      }, {
        0: "入库率（月）",
      }, {
        0: "上月入库量",
      }, {
        0: "上月入库率",
      }, {
        0: "前月入库量",
      }, {
        0: "前月入库率",
      }, {

      }, {

      }],
      showCharts: true,
      showTable: false,
      news: 0,
      xPosition: 0,
      zhuzi: zhuzi,
	  jiantou:jiantou,
      yPosition: 0,
      chartType: '',
      chartHigh: 850,
      chartWidth: '100%',
      chartDOM: {},
      chartName: "QA1  2018年3月份入库实绩",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      xAxisData2: ['日期'
      ],
      series: {
        submitInspectPlanData: [
        ],
        submitInspectActualPerformceData: [
        ],
        submitInspectRate: [
        ],
        ct1_count_rat: []
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
	kbpgrmd_win_height: 0,
    chartwidth: 0,
  },
  methods: {
    alertHeight() {
      let _this = this
      if (_this.showTable) {
        _this.chartHigh = _this.kbpgrmd_win_height*8.5

      } else (
        _this.chartHigh = _this.kbpgrmd_win_height*8.5
      )
      _this.resizeHeight()
    },
    resizeHeight() {
      let _this = this
      document.getElementById("kbwhpfmChart").style.height = this.chartHigh + "px";
      document.getElementById("kbwhpfmChart").style.width = this.chartWidth + "px";
      _this.chartDOM.resize();
    },

    noaction() {
      let _this = this;
      _this.$emit("noaction");
      if (_this.big != undefined) {
        return;
      }
      setTimeout(() => {
        localStorage.setItem(_this.chartName + 'table', _this.showTable)
        localStorage.setItem(_this.chartName + 'chart', _this.showCharts)
      }, 50);
    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("kbwhpfmChart").style.height = this.chartHigh + "px";
      document.getElementById("kbwhpfmChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("kbwhpfmChart").style.width = _this.chartWidth + "px";
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("kbwhpfmChart"), 'theme');
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
              name: "日入库计划",
			  icon:"image://" + _this.jiantou
            },
            {
              name: "日入库实绩",
              icon: "image://" + _this.zhuzi
            }, {
              name: "日入库计划累计"
            }, {
              name: '日入库实绩累计'
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
            // min: 0,
            // splitNumber: 20,
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
            name: "日入库计划",
            type: "line",
            data: _this.series.submitInspectPlanData,
            label: {
              show: true,
              position: "top",
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 2,
                type: 'dotted'
              }
            },
			markLine: {
				// name:'日入库计划',
			  lineStyle: {
			    normal: {
			      // type: 'solid',
			      width: 2,
			      color: '#91d28a'
			    }
			  },
			  data: [
			    { yAxis: _this.top },
			  ]
			},
			label: {
			  show: true,
			  position: "top",
			  // color: "black"
			},
          },
          {
            name: "日入库实绩",
            type: "bar",
            barWidth: 10,
            data: _this.series.submitInspectActualPerformceData,
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  if (params.data >= _this.top) {
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
            name: "日入库计划累计",
            type: "line",
            data: _this.series.submitInspectRate,
            // yAxisIndex: 1,
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
            name: "日入库实绩累计",
            type: "line",
            data: _this.series.ct1_count_rat,
            // yAxisIndex: 1,
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              },
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
    },
    getdate() {
      let _this = this;

      // this.chartDOM = this.$echarts.init(document.getElementById("kbwhpfmChart"));
      // mui.alert('aa')
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbwhpfmget',
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
          console.log(result.title)
          _this.lastRefreshTime = result.writetime;

          _this.chartName = result.title
          _this.xAxisData = [];
          _this.series.submitInspectPlanData = []
          _this.series.submitInspectActualPerformceData = []
          _this.series.submitInspectRate = []
		  _this.series.ct1_count_rat = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          // _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ct1_date = element.t1_date != '' ? element.t1_date : 0;
            let ct1_plan_qty = element.t1_plan_qty != '' ? element.t1_plan_qty : 0;
            let ct1_plan_count = element.t1_plan_count != '' ? element.t1_plan_count : 0;
            let ct1_day_qty = element.t1_day_qty != '' ? element.t1_day_qty : 0;
            let ct1_count_qty = element.t1_count_qty != '' ? element.t1_count_qty : 0;
            let ct1_day_rat = element.t1_day_rat != '' ? element.t1_day_rat : 0;
            let ct1_count_rat = element.t1_count_rat != '' ? element.t1_count_rat : 0;
            ct1_date = ct1_date.split('-')[2];
            ct1_date = ct1_date.substring(0, 2);
            _this.xAxisData.push(ct1_date);
            _this.xAxisData2.push(ct1_date);
			
			// 只显示最后一个日入库计划
			// if(i !== (result.table1.length-1)){
			// 	_this.series.submitInspectPlanData.push('')
			// }else{
			// 	_this.series.submitInspectPlanData.push(ct1_plan_qty)
			// }
			_this.top = ct1_plan_qty
			
            _this.series.submitInspectActualPerformceData.push(ct1_day_qty)
            _this.series.submitInspectRate.push(ct1_plan_count)
            // _this.series.submitInspectRate.push(Math.round((ct1_day_rat * 100) * 1000) / 1000)
            _this.series.ct1_count_rat.push(ct1_count_qty)
            let amount = _index,
              value = ct1_plan_qty;
            _this.tableData[0][amount] = ct1_plan_qty
            _this.tableData[1][amount] = ct1_plan_count
            _this.tableData[2][amount] = ct1_day_qty
            _this.tableData[3][amount] = ct1_count_qty
            _this.tableData[4][amount] = ct1_day_rat
            _this.tableData[5][amount] = ct1_count_rat
            _index++
          }
          _index = 1
          for (let i = 0; i < result.table2.length; i++) {
            const element = result.table2[i];
            let ct2_count_qty = element.t1_count_qty != '' ? element.t1_count_qty : 0;
            let ct2_count_rat = element.t1_count_rat != '' ? element.t1_count_rat : 0;
            let amount = _index
            _this.tableData[6][amount] = ct2_count_qty
            _this.tableData[7][amount] = ct2_count_rat
            _index++
          }
          _index = 1
          for (let i = 0; i < result.table3.length; i++) {
            const element = result.table3[i];
            let ct3_count_qty = element.t1_count_qty != '' ? element.t1_count_qty : 0;
            let ct3_count_rat = element.t1_count_rat != '' ? element.t1_count_rat : 0;
            let amount = _index
            _this.tableData[8][amount] = ct3_count_qty
            _this.tableData[9][amount] = ct3_count_rat
            _index++
          }
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
      if (document.getElementById("kbwhpfmTable") == null) {
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
	  // console.log(this.kbpgrmd_win_height)
	  this.chartHigh = this.kbpgrmd_win_height*8.5
	  this.win_height = 92/100 * this.kbpgrmd_win_height
	  if(this.win_height > 92){
	  	this.win_height = 92
	  }
  },
  created() {
    this.chartWidth = this.chartwidth / 100 * (window.innerWidth - 80)
    this.getdate()
  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#kbwhpfmChart {
  border-radius: 15px;
  /* overflow: hidden; */
}
#kbwhpfmTable {
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
.goback2 {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  left: 10%;
  margin-left: 0%;
  top: 60px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  z-index: 999;
  background: grey;
  height: 50px;
  width: 280px;
  text-align: center;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.goback2:hover {
  opacity: 1;
}
</style>
