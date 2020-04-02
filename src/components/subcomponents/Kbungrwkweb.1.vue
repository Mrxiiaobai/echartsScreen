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
      <div
        class="selectPart2"
        @click="nofunction()"
        style="left:30%!important;width:70%!important;"
      >
        <div class="likeButten" @click="noaction2()">
          <div>点击筛选类型</div>
          <span>{{nowEm}}</span>
        </div>
        <div class="likeButten" @click="getPart(-1)" style="background-color: #ff0000;width: 100px">
          <div>清除</div>
          <div>&nbsp;</div>
        </div>
      </div>
      <div class="selectPart" @click="nofunction()" v-show="showselP">
        <div class="likeButten" @click="getPart(-1)">关闭</div>
        <div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
          <div>{{item.tempprduc_partname}}</div>
        </div>
      </div>
      <div class="goback2" @click="noaction()">
        <span>图形</span>
        <el-switch
          class="showCharts"
          v-model="showCharts"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
        <span>表格</span>
        <el-switch v-model="showTable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div :id="chartid" v-show="showCharts"></div>
      <div id="kbungrwkTable" v-show="showTable">
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column prop="0" label="机型、环别/月份" min-width="50%"></el-table-column>
          <el-table-column prop="1" label="SP/SR" min-width="50%"></el-table-column>
          <el-table-column label="摩托车">
            <el-table-column prop="2" label="TOP" min-width="50%"></el-table-column>
            <el-table-column prop="3" label="2ND" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column label="微轿车">
            <el-table-column prop="4" label="TOP" min-width="50%"></el-table-column>
            <el-table-column prop="5" label="2ND" min-width="50%"></el-table-column>
            <el-table-column prop="6" label="OIL" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column label="柴油车">
            <el-table-column prop="7" label="TOP" min-width="50%"></el-table-column>
            <el-table-column prop="8" label="2ND" min-width="50%"></el-table-column>
            <el-table-column prop="9" label="OIL" min-width="50%"></el-table-column>
          </el-table-column>
          <el-table-column prop="10" label="出口环" min-width="50%"></el-table-column>
          <el-table-column prop="11" label="在制品总量" min-width="50%"></el-table-column>
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
      news: 0,
      nowEm: '摩托车',
      xPosition: 0,
      yPosition: 0,
      showselP: false,
      chartType: '',
      chartHigh: 580,
      emlist: [{
        tempprduc_partname: '摩托车'
      }, {
        tempprduc_partname: '微型车'
      }, {
        tempprduc_partname: '柴油车'
      }, {
        tempprduc_partname: '出口环'
      }, {
        tempprduc_partname: '在制品总量'
      }],
      showCharts: true,
      showTable: true,
      chartid: '',
      chartWidth: '100%',
      chartDOM: {},
      chartName: "QA1  2018年3月份送检实绩",
      chartOption: {},
      dialogVisible: false,
      xAxisData: ['月份', 'SP/SR', 'TOP', '2ND', 'TOP', '2ND', 'OIL', 'TOP', '2ND', 'OIL', '出口环', '在制品总量'
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
  methods: {
    alertHeight() {
      let _this = this
      if (_this.showTable) {
        _this.chartHigh = 500

      } else (
        _this.chartHigh = 700
      )
      _this.resizeHeight()
    },
    resizeHeight() {
      let _this = this
      document.getElementById(_this.chartid).style.height = this.chartHigh + "px";
      document.getElementById(_this.chartid).style.width = this.chartWidth + "px";
      _this.chartDOM.resize();
    },

    detailSetting() {
      this.dialogVisible = true;
    },
    nofunction() {
      let _this = this;
      _this.$emit("noaction");
    },
    noaction() {
      let _this = this;
      _this.$emit("noaction");
    },
    noaction2() {
      let _this = this;
      _this.$emit("noaction");
      setTimeout(() => {
        _this.showselP = true
      }, 100);
    },
    getPart(num) {
      let _this = this
      setTimeout(() => {
        if (num == -1) {
          _this.showselP = false
          return
        }
        _this.nowEm = _this.emlist[num]['tempprduc_partname']
        console.log(_this.nowEm)
        _this.showselP = false
        _this.selectPerson()
      }, 50);
    },
    cellStyle(row, column, rowIndex, columnIndex) {//根据报警级别显示颜色
      console.log(row);
      // console.log(row.column);

      if (row.columnIndex === 4 || row.columnIndex === 5 || row.columnIndex === 6) {
        return 'background:#67b5a2 !important'
      }
      if (row.columnIndex === 1 || row.columnIndex === 2 || row.columnIndex === 3) {
        return 'background:#ad6e07 !important'
      }
      if (row.columnIndex === 7 || row.columnIndex === 8 || row.columnIndex === 9) {
        return 'background:#24b300 !important'
      }
      if (row.columnIndex === 10) {
        return 'background:#750202 !important'
      }
    },
    generateChart() {
      let _this = this
      document.getElementById(_this.chartid).style.height = this.chartHigh + "px";
      document.getElementById(_this.chartid).style.width = this.chartWidth + "px";
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById(_this.chartid).style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById(_this.chartid), 'theme');
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
              name: "送检计划"
            },
            {
              name: "送检实绩"
            }, {
              name: "日送检率"
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
            name: "送检计划",
            type: "line",
            data: _this.series.submitInspectPlanData,
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
            name: "送检实绩",
            type: "line",
            data: _this.series.submitInspectActualPerformceData,
            label: {
              show: true,
              // color: "black"
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          },
          {
            name: "日送检率",
            type: "line",
            data: _this.series.submitInspectRate,
            yAxisIndex: 1,
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
            name: "月送检率",
            type: "line",
            data: _this.series.ct1_count_rat,
            yAxisIndex: 1,
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
        query: " tempungrw_month BETWEEN '201905' AND '201909'",
        // query: _this.kbpgrmd_query
      };
      // this.chartDOM = this.$echarts.init(document.getElementById("kbungrwkChart"));
      // mui.alert('aa')
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbungrwkget',
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
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          var tableline = {}
          let object = {};
          // _this.tableData = []
          _this.tableData = []
          result.table1 = result.table1.sort(function (a, b) {
            return a.tempungrw_month - b.tempungrw_month
          })
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctempungrw_month = element.tempungrw_month != '' ? element.tempungrw_month : 0;
            let ctempungrw_spsr = element.tempungrw_spsr != '' ? element.tempungrw_spsr : 0;
            let ctempungrw_mot_top = element.tempungrw_mot_top != '' ? element.tempungrw_mot_top : 0;
            let ctempungrw_mot_2nd = element.tempungrw_mot_2nd != '' ? element.tempungrw_mot_2nd : 0;
            let ctempungrw_mcar_top = element.tempungrw_mcar_top != '' ? element.tempungrw_mcar_top : 0;
            let ctempungrw_mcar_oil = element.tempungrw_mcar_oil != '' ? element.tempungrw_mcar_oil : 0;
            let ctempungrw_mcar_2nd = element.tempungrw_mcar_2nd != '' ? element.tempungrw_mcar_2nd : 0;
            let ctempungrw_dcar_top = element.tempungrw_dcar_top != '' ? element.tempungrw_dcar_top : 0;
            let ctempungrw_dcar_2nd = element.tempungrw_dcar_2nd != '' ? element.tempungrw_dcar_2nd : 0;
            let ctempungrw_dcar_oil = element.tempungrw_dcar_oil != '' ? element.tempungrw_dcar_oil : 0;
            let ctempungrw_export = element.tempungrw_export != '' ? element.tempungrw_export : 0;
            let ctempungrw_all = element.tempungrw_all != '' ? element.tempungrw_all : 0;
            var ctempungrwdetail = {};

            ctempungrwdetail[0] = ctempungrw_month
            ctempungrwdetail[1] = ctempungrw_spsr
            ctempungrwdetail[2] = ctempungrw_mot_top
            ctempungrwdetail[3] = ctempungrw_mot_2nd
            ctempungrwdetail[4] = ctempungrw_mcar_top
            ctempungrwdetail[5] = ctempungrw_mcar_oil
            ctempungrwdetail[6] = ctempungrw_mcar_2nd
            ctempungrwdetail[7] = ctempungrw_dcar_top
            ctempungrwdetail[8] = ctempungrw_dcar_2nd
            ctempungrwdetail[9] = ctempungrw_dcar_oil
            ctempungrwdetail[10] = ctempungrw_export
            ctempungrwdetail[11] = ctempungrw_all

            _this.tableData.push(ctempungrwdetail)
          }
          console.log(_this.tableData)
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
      console.log(document.getElementById("kbungrwkTable"))
      if (document.getElementById("kbungrwkTable") == null) {
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
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
  },
  mounted() {


  },
  created() {
    this.getdate()
    this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#kbungrwkChart {
  border-radius: 15px;
  overflow: hidden;
}
#kbungrwkTable {
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
