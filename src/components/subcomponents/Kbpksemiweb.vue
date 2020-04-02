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
      <div id="KbpksemiTable">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column label="当日急要品种汇总">
            <el-table-column prop="0" label="序号" min-width="10%"></el-table-column>
            <el-table-column prop="1" label="零件号" min-width="50%"></el-table-column>
            <el-table-column prop="2" label="零件名称" min-width="50%"></el-table-column>
            <el-table-column prop="3" label="规格" min-width="50%"></el-table-column>
            <el-table-column prop="4" label="单位" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="加工单号" min-width="50%"></el-table-column>
            <el-table-column prop="6" label="包装员" min-width="50%"></el-table-column>
            <el-table-column label="日期">
              <el-table-column prop="7" label="年月" min-width="50%"></el-table-column>
              <el-table-column prop="8" label="年月" min-width="50%"></el-table-column>
            </el-table-column>
            <el-table-column prop="9" label="备注" min-width="100%"></el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div id="KbpksemiTable2">
        <el-table
          :data="tableData2"
          :span-method="objectSpanMethod2"
          border
          style="width: 100%; margin-top: 20px;color:black"
        >
          <el-table-column label="月度滚动预示">
            <el-table-column prop="0" label="序号" min-width="10%"></el-table-column>
            <el-table-column prop="1" label="零件号" min-width="50%"></el-table-column>
            <el-table-column prop="2" label="零件名称" min-width="50%"></el-table-column>
            <el-table-column prop="3" label="规格" min-width="50%"></el-table-column>
            <el-table-column prop="4" label="单位" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="本月需求" min-width="50%"></el-table-column>
            <el-table-column prop="6" label="本月欠" min-width="50%"></el-table-column>
            <el-table-column prop="7" label="周   交 付 日 程" min-width="50%"></el-table-column>
            <el-table-column label="月  周">
              <el-table-column prop="8" label="一" min-width="50%"></el-table-column>
              <el-table-column prop="9" label="二" min-width="50%"></el-table-column>
              <el-table-column prop="10" label="三" min-width="50%"></el-table-column>
              <el-table-column prop="11" label="四" min-width="50%"></el-table-column>
              <el-table-column prop="12" label="五" min-width="50%"></el-table-column>
              <el-table-column prop="13" label="六" min-width="50%"></el-table-column>
              <el-table-column prop="14" label="日" min-width="50%"></el-table-column>
            </el-table-column>
            <el-table-column label="月度汇总">
              <el-table-column prop="15" label="第一周" min-width="50%"></el-table-column>
              <el-table-column prop="16" label="第二周" min-width="50%"></el-table-column>
              <el-table-column prop="17" label="第三周" min-width="50%"></el-table-column>
              <el-table-column prop="18" label="第四周" min-width="50%"></el-table-column>
              <el-table-column prop="19" label="第五周" min-width="50%"></el-table-column>
            </el-table-column>
            <el-table-column prop="20" label="备注" min-width="100%"></el-table-column>
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 7 || columnIndex === 9) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      // if ([4, 5, 6, 7, 8, 9].indexOf(rowIndex) != -1) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 7 || columnIndex === 20) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
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
      document.getElementById("KbpksemiChart").style.height = this.chartHigh + "px";
      document.getElementById("KbpksemiChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("KbpksemiChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("KbpksemiChart"), 'theme');
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
      // this.chartDOM = this.$echarts.init(document.getElementById("KbpksemiChart"));
      // mui.alert('aa')
      var data = {
        // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
        query: _this.kbpgrmd_query
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbpksemiget',
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
          _this.tableData2 = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctemppkseim_part = element.temppkseim_part
            let ctemppkseim_desc1 = element.temppkseim_desc1
            let ctemppkseim_desc2 = element.temppkseim_desc2
            let ctemppkseim_um = element.temppkseim_um
            let ctemppkseim_woid = element.temppkseim_woid
            let ctemppkseim_emp = element.temppkseim_emp
            let ctemppkseim_ord = element.temppkseim_ord
            let ctemppkseim_comp = element.temppkseim_comp
            let ctemppkseim_rmks = element.temppkseim_rmks
            // let amount = _index * 2;
            for (let j = 0; j < 2; j++) {
              let tableline = {};
              if (j == 0) {
                console.log(j)
                tableline[0] = _index
                tableline[1] = ctemppkseim_part
                tableline[2] = ctemppkseim_desc1
                tableline[3] = ctemppkseim_desc2
                tableline[4] = ctemppkseim_um
                tableline[5] = ctemppkseim_woid
                tableline[6] = ctemppkseim_emp
                tableline[7] = '计划'
                tableline[8] = ctemppkseim_ord
                tableline[9] = ctemppkseim_rmks
              } else {
                tableline[0] = _index
                tableline[1] = ctemppkseim_part
                tableline[2] = ctemppkseim_desc1
                tableline[3] = ctemppkseim_desc2
                tableline[4] = ctemppkseim_um
                tableline[5] = ctemppkseim_woid
                tableline[6] = ctemppkseim_emp
                tableline[7] = '实绩'
                tableline[8] = ctemppkseim_comp
                tableline[9] = ctemppkseim_rmks
              }
              _this.tableData.push(tableline)
            }
            _index++
          }
          let indexnum = 1
          for (let i = 0; i < result.table2.length; i++) {
            const element = result.table2[i];
            let cpart = element.part
            let cpart_desc1 = element.part_desc1
            let cpart_desc2 = element.part_desc2
            let cum = element.um
            let creq = element.req
            let cdeb = element.deb
            let cweek_day1 = element.week_day1
            let cweek_day2 = element.week_day2
            let cweek_day3 = element.week_day3
            let cweek_day4 = element.week_day4
            let cweek_day5 = element.week_day5
            let cweek_day6 = element.week_day6
            let cweek_day7 = element.week_day7
            let cmonth_week1 = element.month_week1
            let cmonth_week2 = element.month_week2
            let cmonth_week3 = element.month_week3
            let cmonth_week4 = element.month_week4
            let cmonth_week5 = element.month_week5
            for (let j = 0; j < 2; j++) {
              let tableline = {};
              if (j == 0) {
                console.log(j)
                tableline[0] = indexnum
                tableline[1] = cpart
                tableline[2] = cpart_desc1
                tableline[3] = cpart_desc2
                tableline[4] = cum
                tableline[5] = creq
                tableline[6] = cdeb
                tableline[7] = '计划'
                tableline[8] = cweek_day1
                tableline[9] = cweek_day2
                tableline[10] = cweek_day3
                tableline[11] = cweek_day4
                tableline[12] = cweek_day5
                tableline[13] = cweek_day6
                tableline[14] = cweek_day7
                tableline[15] = cmonth_week1
                tableline[16] = cmonth_week2
                tableline[17] = cmonth_week3
                tableline[18] = cmonth_week4
                tableline[19] = cmonth_week5
              } else {
                tableline[0] = indexnum
                tableline[1] = cpart
                tableline[2] = cpart_desc1
                tableline[3] = cpart_desc2
                tableline[4] = cum
                tableline[5] = creq
                tableline[6] = cdeb
                tableline[7] = '实绩'
                tableline[8] = cweek_day1
                tableline[9] = cweek_day2
                tableline[10] = cweek_day3
                tableline[11] = cweek_day4
                tableline[12] = cweek_day5
                tableline[13] = cweek_day6
                tableline[14] = cweek_day7
                tableline[15] = cmonth_week1
                tableline[16] = cmonth_week2
                tableline[17] = cmonth_week3
                tableline[18] = cmonth_week4
                tableline[19] = cmonth_week5
                indexnum++
              }
              // _this.tableData2 = []
              _this.tableData2.push(tableline)
            }
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
      if (document.getElementById("KbpksemiTable") == null) {
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
#KbpksemiChart {
  border-radius: 15px;
  overflow: hidden;
}
#KbpksemiTable {
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
