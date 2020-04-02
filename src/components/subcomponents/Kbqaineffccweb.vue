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
      <div id="kbqaineffccChart"></div>
      <div id="kbqaineffccTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column
            :prop="index"
            :label="xAxisData2[index]"
            :min-width="index==0?'70':'50%'"
            v-for="(item,index) in tableData[0]"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import mui from "../../assets/js/mui.min"
import jiantou from "../../assets/jiantou.png"
export default {
  data: function () {
    return {
		maxTop:'',
		top:'',
		win_height:'',
		jiantou:jiantou,
      lastRefreshTime: '',
      // Dtime:this.$props.kbpgrmd_get_time,
      tableData: [{
        0: '日检验效率计划',
      }, {        0: '累计检验效率计划',
      }, {        0: '日检验效率实际',
      }, {        0: '实际检验效率累计',
      }, {        0: '检验效率完成率（日）',
      }, {        0: '检验效率完成率（月）',
      }, {        0: '上月检验效率完成率（日）',
      }, {        0: '上月检验效率完成率（月）',

      }],
      news: 0,
      xPosition: 0,
      yPosition: 0,
      chartType: '',
      chartHigh: 768,
      chartWidth: '100%',
      chartDOM: {},
      chartName: "QA1科  2018年3月检验效率",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      xAxisData2: ['日期'],
      series: {
        submitInspectPlanData: [
        ],
        submitInspectActualPerformceData: [
        ],
        submitInspectRate: [
        ],
        ct1_count_rat: [],
        ct1_whpl_count: [],
        ct1_wh_count: []
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
	kbpgrmd_win_height:0
  },
  methods: {
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("kbqaineffccChart").style.height = this.chartHigh + "px";
      document.getElementById("kbqaineffccChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("kbqaineffccChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("kbqaineffccChart"), 'theme');
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
          data: [{
            name: "检验效率计划",
			icon: "image://" + _this.jiantou
          }, {
            name: "检验效率实绩"
          }, {
            name: "日检验效率完成率"
          }, {
            name: '月检验效率完成率'
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
            name: "万片/小时",
			max:_this.maxTop,
            // max: 200,
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
            name: "检验效率计划",
            type: "line",
            data: [],
            yAxisIndex: 0,
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
			}
          },
          {
            name: "检验效率实绩",
            type: "line",
            data: _this.series.submitInspectActualPerformceData,
			yAxisIndex: 0,
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
            name: "日检验效率完成率",
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
          }, {
            name: "月检验效率完成率",
            type: "line",
            data: _this.series.ct1_count_rat,
            yAxisIndex: 1,
            label: {
              formatter: function (params) {
                return params.value + '%'
              },
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
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getdate() {
      let _this = this;
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      // this.chartDOM = this.$echarts.init(document.getElementById("kbqaineffccChart"));
      // mui.alert('aa')
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbqa1ineffccget',
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
          _this.lastRefreshTime = result.writetime;

          _this.chartName = result.title;
          _this.xAxisData = [];
          _this.series.submitInspectPlanData = []
          _this.series.submitInspectActualPerformceData = []
          _this.series.submitInspectRate = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          // _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctempineff_date = element.tempineff_date
            let ctempineff_pal_qty = element.tempineff_pal_qty
            let ctempineff_pal_couqty = element.tempineff_pal_couqty
            let ctempineff_rel_qty = element.tempineff_rel_qty
            let ctempineff_rel_couqty = element.tempineff_rel_couqty
            let ctempineff_rel_dayrate = element.tempineff_rel_dayrate
            let ctempineff_rel_monrate = element.tempineff_rel_monrate
            let ctempineff_last_monrate = element.tempineff_last_monrate
            let ctempineff_last_dayrate = element.tempineff_last_dayrate
            let ctempineff_stoqty = element.tempineff_stoqty
            let ctempineff_daysto = element.tempineff_daysto
            let ctempineff_workday = element.tempineff_workday
            ctempineff_date = ctempineff_date.split('-')[2];
            ctempineff_date = ctempineff_date.substring(0, 2);
            _this.xAxisData.push(ctempineff_date);
            _this.xAxisData2.push(ctempineff_date);
            _this.series.submitInspectPlanData.push(ctempineff_pal_qty)
			
			// _this.top = ctempineff_pal_qty
			
			console.log(ctempineff_pal_qty)
            _this.series.submitInspectActualPerformceData.push(ctempineff_rel_qty)
            _this.series.submitInspectRate.push(ctempineff_rel_dayrate)
            _this.series.ct1_count_rat.push(ctempineff_rel_monrate)
            let amount = _index;
            _this.tableData[0][amount] = ctempineff_pal_qty
            _this.tableData[1][amount] = ctempineff_pal_couqty
            _this.tableData[2][amount] = ctempineff_rel_qty
            _this.tableData[3][amount] = ctempineff_rel_couqty
            _this.tableData[4][amount] = ctempineff_rel_dayrate
            _this.tableData[5][amount] = ctempineff_rel_monrate
            _this.tableData[6][amount] = ctempineff_last_monrate
            _this.tableData[7][amount] = ctempineff_last_dayrate
            _index++
          }
          console.log(_this.tableData)
		  let max1 = Math.max(..._this.series.submitInspectActualPerformceData)
		  let max2 = Math.max(..._this.series.submitInspectPlanData)
		  _this.top = max2
		  if(max1>=max2){
			_this.maxTop = parseInt(max1)+1
		}else{
			_this.maxTop = parseInt(max2)+1
		}
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
      if (document.getElementById("kbqaineffccTable") == null) {
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
	console.log(this.kbpgrmd_win_height)
	this.chartHigh = this.kbpgrmd_win_height * 4.8*1.6
	this.win_height = 87 / 100 * this.kbpgrmd_win_height
	if (this.win_height > 87) {
		this.win_height = 87
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
#kbqaineffccChart {
  border-radius: 15px;
  overflow: hidden;
}
#kbqaineffccTable {
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
