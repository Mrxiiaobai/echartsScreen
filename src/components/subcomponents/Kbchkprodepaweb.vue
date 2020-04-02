<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts">
      <div class="likeButton">
        <span style="font-size:13px;">更新时间:</span>
        <span>{{lastRefreshTime}}</span>
      </div>
      <!-- <div class="Dtime">
			<span>{{Dtime}}</span>
      </div>-->
      <div id="KbchkprodepaTable">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          :cell-style="cellStyle"
          border
          style="width: 100%; margin-top: 20px;color:black"
        >
          <el-table-column label="工作日">
            <el-table-column prop="0" label="计划" min-width="50%"></el-table-column>
            <el-table-column prop="1" label="消耗" min-width="50%"></el-table-column>
            <el-table-column prop="2" label="剩余" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column label="送检  进度">
            <el-table-column prop="3" label="科名" min-width="50%"></el-table-column>
            <el-table-column prop="4" label="月送检计划" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="日送检计划" min-width="50%"></el-table-column>
            <el-table-column prop="6" label="当日送检" min-width="50%"></el-table-column>
            <el-table-column prop="7" label="累计送检" min-width="50%"></el-table-column>
            <el-table-column prop="8" label="累计返工" min-width="50%"></el-table-column>
            <el-table-column prop="9" label="累计 返工返回" min-width="50%"></el-table-column>
            <el-table-column prop="10" label="实际送检累计" min-width="50%"></el-table-column>
            <el-table-column prop="11" label="计划送检累计" min-width="50%"></el-table-column>
            <el-table-column prop="12" label="与计划差" min-width="50%"></el-table-column>
            <el-table-column prop="13" label="送检率" min-width="50%"></el-table-column>
            <el-table-column prop="14" label="剩余    送检量" min-width="50%"></el-table-column>
            <el-table-column prop="15" label="剩余日   送检量" min-width="50%"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div id="KbchkprodepaTable2">
        <el-table
          :data="tableData2"
          :cell-style="cellStyle2"
          :span-method="objectSpanMethod2"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column label="工作日">
            <el-table-column prop="0" label="计划" min-width="50%"></el-table-column>
            <el-table-column prop="1" label="消耗" min-width="50%"></el-table-column>
            <el-table-column prop="2" label="剩余" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column label="产出  进度">
            <el-table-column prop="3" label="科名" min-width="50%"></el-table-column>
            <el-table-column prop="4" label="月产出计划" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="日产出计划" min-width="50%"></el-table-column>
            <el-table-column prop="6" label="当日产出" min-width="50%"></el-table-column>
            <el-table-column prop="7" label="累计产出" min-width="50%"></el-table-column>
            <el-table-column prop="8" label="计划   累计产出" min-width="50%"></el-table-column>
            <el-table-column prop="9" label="与计划差" min-width="50%"></el-table-column>
            <el-table-column prop="10" label="入库率 (与送检量比)" min-width="50%"></el-table-column>
            <el-table-column prop="11" label="入库率   (与当前计划比)" min-width="50%"></el-table-column>
            <el-table-column prop="12" label="入库率    （与总计划比）" min-width="50%"></el-table-column>
            <el-table-column prop="13" label="剩余       产出量" min-width="50%"></el-table-column>
            <el-table-column prop="14" label="剩余日产出量" min-width="50%"></el-table-column>
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
      timeId: '',
      // Dtime:this.$props.kbpgrmd_get_time,
      lastRefreshTime: '',
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
      linenum2: 0,
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
      // console.log(row);
      // console.log(row.column);
      if (row.column.label === "月送检计划") {
        return 'background:#67b5a2 !important'
      }
      if (row.column.label === "日送检计划") {
        return 'background:#67b5a2 !important'
      }
      if (row.column.label === "累计送检") {
        return 'background:#ad6e07 !important'
      }
      if (row.column.label === "累计返工" || row.column.label === "累计 返工返回" || row.column.label === "实际送检累计" || row.column.label === "剩余日   送检量") {
        return 'background:#24b300 !important'
      }
      if (row.column.label === "计划送检累计" || row.column.label === "与计划差" || row.column.label === "送检率") {
        return 'background:#750202 !important'
      }
    },
    cellStyle2(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
      // console.log(row);
      // console.log(row.column);
      if (row.column.label === "月产出计划") {
        return 'background:#67b5a2 !important'
      }
      if (row.column.label === "日产出计划") {
        return 'background:#67b5a2 !important'
      }
      if (row.column.label === "入库率 (与送检量比)") {
        return 'background:#ad6e07 !important'
      }
      if (row.column.label === "累计产出" || row.column.label === "入库率    （与总计划比）" || row.column.label === "剩余日产出量") {
        return 'background:#24b300 !important'
      }
      if (row.column.label === "计划   累计产出" || row.column.label === "与计划差") {
        return 'background:#750202 !important'
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let _this = this
      if ([0, 1, 2].indexOf(columnIndex) != -1) {
        if (rowIndex % _this.linenum === 0 && rowIndex < 4) {
          return {
            rowspan: _this.linenum,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      let _this = this
      if ([0, 1, 2].indexOf(columnIndex) != -1) {
        if (rowIndex % _this.linenum2 === 0 && rowIndex < 4) {
          return {
            rowspan: _this.linenum2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("KbchkprodepaChart").style.height = this.chartHigh + "px";
      document.getElementById("KbchkprodepaChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("KbchkprodepaChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("KbchkprodepaChart"), 'theme');
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
      var myDate = new Date();
      _this.todaymun = myDate.getDate();
      _this.todaymun = _this.todaymun + '(今日)'
      // this.chartDOM = this.$echarts.init(document.getElementById("KbchkprodepaChart"));
      // mui.alert('aa')
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbchkprodepaget',
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
          console.log(_this.xAxisData)
          _this.lastRefreshTime = result.writetime;
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          _this.tableData = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctsinp_day = element.tsinp_day
            let ctsinp_con_day = element.tsinp_con_day
            let ctsinp_rem_day = element.tsinp_rem_day
            let ctsinp_sec = element.tsinp_sec
            let ctsinp_pal_mon = element.tsinp_pal_mon
            let ctsinp_pal_day = element.tsinp_pal_day
            let ctsinp_rel_day = element.tsinp_rel_day
            let ctsinp_count = element.tsinp_count
            let ctsinp_rew = element.tsinp_rew
            let ctsinp_rew_back = element.tsinp_rew_back
            let ctsinp_rel_qty = element.tsinp_rel_qty
            let ctsinp_pal_qty = element.tsinp_pal_qty
            let ctsinp_gap = element.tsinp_gap
            let ctsinp_rate = element.tsinp_rate
            let ctsinp_gap_qty = element.tsinp_gap_qty
            let ctsinp_gap_dqty = element.tsinp_gap_dqty
            let ctsinp_date = element.tsinp_date
            let amount = _index;
            let tableline = {};
            tableline[0] = result.table1[0].tsinp_day
            tableline[1] = result.table1[0].tsinp_con_day
            tableline[2] = result.table1[0].tsinp_rem_day
            tableline[3] = ctsinp_sec
            tableline[4] = ctsinp_pal_mon
            tableline[5] = ctsinp_pal_day
            tableline[6] = ctsinp_rel_day
            tableline[7] = ctsinp_count
            tableline[8] = ctsinp_rew
            tableline[9] = ctsinp_rew_back
            tableline[10] = ctsinp_rel_qty
            tableline[11] = ctsinp_pal_qty
            tableline[12] = ctsinp_gap
            tableline[13] = ctsinp_rate+'%'
            tableline[14] = ctsinp_gap_qty
            tableline[15] = ctsinp_gap_dqty
            _this.tableData.push(tableline)
            _this.linenum = _index
            _index++
          }

          //第二张表
          _index = 1;
          var tableline = {}
          _this.tableData2 = []
          for (let i = 0; i < result.table2.length; i++) {
            const element = result.table2[i];
            let ctcpd_pal_day = element.tcpd_pal_day
            let ctcpd_con_day = element.tcpd_con_day
            let ctcpd_rem_day = element.tcpd_rem_day
            let ctcpd_sec = element.tcpd_sec
            let ctcpd_pal_mon = element.tcpd_pal_mon
            let ctcpd_pal_tday = element.tcpd_pal_tday
            let ctcpd_rel_tday = element.tcpd_rel_tday
            let ctcpd_count = element.tcpd_count
            let ctcpd_pal_qty = element.tcpd_pal_qty
            let ctcpd_gap = element.tcpd_gap
            let ctcpd_rate_chk = element.tcpd_rate_chk
            let ctcpd_rate_pal = element.tcpd_rate_pal
            let ctcpd_rate_all = element.tcpd_rate_all
            let ctcpd_gap_outq = element.tcpd_gap_outq
            let ctcpd_gap_dayq = element.tcpd_gap_dayq
            let ctcpd_date = element.tcpd_date
            let tableline = {};
            tableline[0] = result.table2[0].tcpd_pal_day
            tableline[1] = result.table2[0].tcpd_con_day
            tableline[2] = result.table2[0].tcpd_rem_day
            tableline[3] = ctcpd_sec
            tableline[4] = ctcpd_pal_mon
            tableline[5] = ctcpd_pal_tday
            tableline[6] = ctcpd_rel_tday
            tableline[7] = ctcpd_count
            tableline[8] = ctcpd_pal_qty
            tableline[9] = ctcpd_gap
            tableline[10] = ctcpd_rate_chk+'%'
            tableline[11] = ctcpd_rate_pal+'%'
            tableline[12] = ctcpd_rate_all+'%'
            tableline[13] = ctcpd_gap_outq
            tableline[14] = ctcpd_gap_dayq
            _this.tableData2.push(tableline)
            _this.linenum2 = _index
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

      if (document.getElementById("KbchkprodepaTable") == null) {
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
#KbchkprodepaChart {
  border-radius: 15px;
  overflow: hidden;
}
#KbchkprodepaTable {
  width: 100%;
}
.likeButton {
  /* top:-12px; */
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
