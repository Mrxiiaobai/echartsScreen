<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts">
      <div class="likeButton">
        <span style="font-size:13px;">更新时间:</span>
        <span>{{lastRefreshTime}}</span>
      </div>
      <!-- 	<div class="Dtime">
				<span>{{Dtime}}</span>
      </div>-->
      <div id="KbdinspqtyTable">
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column prop="0" label="科别" min-width="50%"></el-table-column>
          <el-table-column label="送检">
            <el-table-column prop="1" label="月度计划" min-width="50%"></el-table-column>
            <el-table-column prop="2" label="当前计划" min-width="50%"></el-table-column>
            <el-table-column prop="3" label="实绩" min-width="50%"></el-table-column>
            <el-table-column prop="4" label="当前     完成率" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="当月        完成率" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column label="上油">
            <el-table-column prop="6" label="月度计划" min-width="50%"></el-table-column>
            <el-table-column prop="7" label="当前计划" min-width="50%"></el-table-column>
            <el-table-column prop="8" label="实绩" min-width="50%"></el-table-column>
            <el-table-column prop="9" label="当前     完成率" min-width="50%"></el-table-column>
            <el-table-column prop="10" label="当月        完成率" min-width="50%"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import mui from "../../assets/js/mui.min"
export default {
  data: function () {
    return {
      lastRefreshTime: '',
      // timeId:'',
      // Dtime:this.$props.kbpgrmd_get_time,
      tableData: [],
      tableData2: [],
      news: 0,
      xPosition: 0,
      yPosition: 0,
      todaymun: '',
      chartType: '',
      chartHigh: 500,
      chartWidth: '100%',
      chartDOM: {},
      linenum: 0,
      chartName: "QA1科  2018年3月检验效率",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      xAxisData2: [],
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
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色

      if (row.column.label === "实绩") {
        return 'background:#ad6e07 !important'
      }

    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row['0'])
      if (row['0'].indexOf('合计') != -1) {
        return 'warning-row';
      }
      // if (row.a < row.b) {
      //   return 'warning-row';
      // }
      return '';
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {

    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("KbdinspqtyChart").style.height = this.chartHigh + "px";
      document.getElementById("KbdinspqtyChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("KbdinspqtyChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("KbdinspqtyChart"), 'theme');
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
            name: "检验效率计划"
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
            name: "片/小时",
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
            name: "检验效率计划",
            type: "line",
            data: _this.series.submitInspectPlanData,
            yAxisIndex: 1,
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
            name: "检验效率实绩",
            type: "line",
            data: _this.series.submitInspectActualPerformceData,
            yAxisIndex: 1,
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

            label: {
              show: true,
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
            // yAxisIndex: 1,
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
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getdate() {

      let _this = this;
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      var myDate = new Date();
      _this.todaymun = myDate.getDate();
      _this.todaymun = _this.todaymun + '(今日)'
      // this.chartDOM = this.$echarts.init(document.getElementById("KbdinspqtyChart"));
      // mui.alert('aa')
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbinspsumget',
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
          _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ct1_sec = element.t1_sec
            let ct1_chkmon_plan = element.t1_chkmon_plan
            let ct1_chkcur_plan = element.t1_chkcur_plan
            let ct1_chk_qty = element.t1_chk_qty
            let ct1_chkcur_rat = element.t1_chkcur_rat
            let ct1_chkmon_rat = element.t1_chkmon_rat
            let ct1_whmon_plan = element.t1_whmon_plan
            let ct1_whcur_plan = element.t1_whcur_plan
            let ct1_wh_qty = element.t1_wh_qty
            let ct1_whcur_rat = element.t1_whcur_rat
            let ct1_whmon_rat = element.t1_whmon_rat
            let amount = _index;
            let tableline = {};
            tableline[0] = ct1_sec
            tableline[1] = ct1_chkmon_plan
            tableline[2] = ct1_chkcur_plan
            tableline[3] = ct1_chk_qty
            tableline[4] = ct1_chkcur_rat+'%'
            tableline[5] = ct1_chkmon_rat+'%'
            tableline[6] = ct1_whmon_plan
            tableline[7] = ct1_whcur_plan
            tableline[8] = ct1_wh_qty
            tableline[9] = ct1_whcur_rat+'%'
            tableline[10] = ct1_whmon_rat+'%'
            _this.tableData.push(tableline)
            _index++
          }

          console.log(_this.tableData)
          console.log(_this.tableData2)
          _this.news++
          // _this.Dtime = _this.kbpgrmd_get_time

          _this.cyclegetdate()
        },
        error: function () {
          _this.cyclegetdate()
        }
      })
    },
    cyclegetdate() {
      if (document.getElementById("KbdinspqtyTable") == null) {
        return
      }
      if (this.kbpgrmd_get_time == undefined) {
        return
      }
      // if(this.timeId){
      // 	clearInterval(this.timeId)
      // }
      // this.timeId = setInterval(()=>{
      // 	this.Dtime--;
      // 	if(this.Dtime == 1){
      // 		clearInterval(this.timeId)
      // 	}
      // },1000);
      setTimeout(() => {
        this.getdate()
      }, this.kbpgrmd_get_time * 1000);
    }
  },
  mounted() {


  },
  created() {
    // if(this.timeId){
    // 	clearInterval(this.timeId)
    // }
    this.getdate()
  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#KbdinspqtyChart {
  border-radius: 15px;
  overflow: hidden;
}
#KbdinspqtyTable {
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
.el-table .warning-row {
  background: #41b883 !important;
}
.warning-row .cell {
  background: #41b883 !important;
}
</style>
