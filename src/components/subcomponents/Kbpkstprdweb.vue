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
      <div
        class="selectPart2"
        @click="nofunction()"
        style="left:30%!important;width:70%!important;"
      >
        <div style="display: inline-block;">
          <el-date-picker
            @change="selectPerson()"
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </div>
        <div class="likeButten" @click="noaction2()" style="width: 280px">
          <div>员工:{{nowEmName}}</div>
        </div>
        <div class="likeButten" @click="getPart(-1)" style="background-color: #ff0000;width: 100px">
          <div>清除</div>
        </div>
      </div>
      <!-- <div class="goback3" @click="noaction2()">
        <div>点击筛选当前员工</div>
        <span>当前员工：{{nowEm}}:{{nowEmName}}</span>
      </div>-->
      <div class="selectPart" @click="nofunction()" v-show="showselP">
        <div class="likeButten" @click="getPart(-1)">关闭</div>
        <div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
          <div>{{item.t2_empname}}</div>
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
        <el-switch
          v-model="showTable"
          @change="alertHeight()"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </div>
      <div :id="chartid" v-show="showCharts"></div>
      <div id="kbpkstprdTable" v-show="showTable">
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
        0: '折后产量'
      }, {
        0: '出勤工时'
      }, {
        0: '定额产量'
      }],
      news: 0,
      emlist: [],
      chartid: '',
      value7: [],
      showselP: false,
      xPosition: 0,
      nowEm: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      nowEmName: '',
      peopleList: '',
      yPosition: 0,
      chartType: '',
      showCharts: true,
      showTable: false,
      chartHigh: '90%',
      chartWidth: '100%',
      chartDOM: {},
      chartName: "2018年1月份自动间隙机     产量一览表",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [],
      xAxisData2: ['日期'],
      series: {
        submitInspectPlanData: [],
        submitInspectActualPerformceData: [],
        submitInspectRate: [],
        ct1_count_rat: [],
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
    alertHeight() {
      let _this = this
      if (_this.showTable) {
        _this.chartHigh = '90%'

      } else (
        _this.chartHigh = '90%'
      )
      _this.resizeHeight()
    },
    resizeHeight() {
      let _this = this
      document.getElementById(_this.chartid).style.height = _this.chartHigh;
      document.getElementById(_this.chartid).style.width = _this.chartWidth;
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
    objectSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      // if (columnIndex === 1 || columnIndex === 0) {
      //   if (rowIndex % 3 === 0 && rowIndex < 4) {
      //     return {
      //       rowspan: 3,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    },
    generateChart() {
      let _this = this
      document.getElementById(_this.chartid).style.height = _this.chartHigh;
      document.getElementById(_this.chartid).style.width = _this.chartWidth;
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
          data: [{
            name: "折后产量",
            icon: "image://" + _this.zhuzi
          },
          {
            name: "定额产量"
          }, {
            name: "出勤工时"
          }
          ],
          bottom: "0px"
        },
        xAxis: [{
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
        }],
        yAxis: [{
          type: "value",
          scale: true,
          name: "片",
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
          name: "小时",
          // axisLabel: {
          //   formatter: "{value} %"
          // }
        }
        ],
        series: [{
          name: "折后产量",
          type: "bar",
          barWidth: 10,
          data: _this.series.submitInspectPlanData,
          label: {
            show: true,
            position: "top",
            // color: "black"
          },
          itemStyle: {
            //通常情况下：
            normal: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params) {
                if (params.data >= _this.series.submitInspectActualPerformceData[params.dataIndex]) {
                  return '#41b883';
                } else {
                  return '#FF8080'
                }
              }
            },
          },
        },
        {
          name: "定额产量",
          type: "line",
          data: _this.series.submitInspectActualPerformceData,
          label: {
            show: true,
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
          name: "出勤工时",
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


        }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getPart(num) {
      let _this = this
      setTimeout(() => {
        if (num == -1) {
          _this.showselP = false
          return
        }
        _this.nowEm = _this.emlist[num]['t2_empid']
        _this.nowEmName = _this.emlist[num]['t2_empname']

        console.log(_this.nowEm)
        _this.showselP = false
        _this.selectPerson()
      }, 50);
    },
    selectPerson() {
      let _this = this;
      if (_this.nowEm == '') {
        _this.nowEm = _this.emlist[0]['t2_empid']
        _this.nowEmName = _this.emlist[0]['t2_empname']
      }
      let m1 = Number(_this.value7[0].getMonth()) + 1
      let m2 = Number(_this.value7[1].getMonth()) + 1
      var data = {
        query: "t2_date between '" + _this.value7[0].getFullYear() + "-" + m1 + "-" + _this.value7[0].getDate() +
          "' and '" + _this.value7[1].getFullYear() + "-" + m2 + "-" + _this.value7[1].getDate() + "'and t2_empid ilike '" +
          _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbpkstprdget',
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
          _this.xAxisData = [];
          _this.xAxisData2 = ['日期'];
          _this.series.submitInspectPlanData = []
          _this.series.submitInspectActualPerformceData = []
          _this.series.submitInspectRate = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          _this.tableData = [{
            0: '折后产量'
          }, {
            0: '出勤工时'
          }, {
            0: '定额产量'
          }];
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ct2_date = element.t2_date
            let ct2_empid = element.t2_empid
            let ct2_empname = element.t2_empname
            let ct2_qty_comp = element.t2_qty_comp
            let ct2_hour_prd = element.t2_hour_prd
            let ct2_hour_wk = element.t2_hour_wk
            let ct2_stdday_prd = element.t2_stdday_prd
            let ct2_realday_prd = element.t2_realday_prd
            ct2_date = ct2_date.split('-')[2];
            ct2_date = ct2_date.substring(0, 2);
            _this.xAxisData.push(ct2_date);
            _this.xAxisData2.push(ct2_date);
            _this.series.submitInspectPlanData.push(ct2_realday_prd)
            _this.series.submitInspectActualPerformceData.push(ct2_stdday_prd)
            _this.series.submitInspectRate.push(ct2_hour_wk)
            // _this.series.ct1_count_rat.push(ct1_count_rat)
            let amount = _index

            _this.tableData[0][amount] = ct2_realday_prd
            _this.tableData[1][amount] = ct2_hour_wk
            _this.tableData[2][amount] = ct2_stdday_prd
            // if (i == 0) {
            //   _this.tableData[0][0] = ct2_empid
            //   _this.tableData[1][0] = ct2_empid
            //   _this.tableData[2][0] = ct2_empid
            //   _this.tableData[0][1] = ct2_empname
            //   _this.tableData[1][1] = ct2_empname
            //   _this.tableData[2][1] = ct2_empname
            // }
            _index++
          }


          //上月在制品
          console.log(_this.tableData)
          _this.news++
          _this.generateChart();
        },
        error: function () { }
      })
    },
    getdate() {
      let _this = this;
      console.log(_this.nowEm + '');
      if (_this.nowEm == '') {
        _this.nowEm = _this.emlist[0]['t2_empid']
        _this.nowEmName = _this.emlist[0]['t2_empname']
      }
      let m1 = Number(_this.value7[0].getMonth()) + 1
      let m2 = Number(_this.value7[1].getMonth()) + 1
      var data = {
        query: "t2_date between '" + _this.value7[0].getFullYear() + "-" + m1 + "-" + _this.value7[0].getDate() +
          "' and '" + _this.value7[1].getFullYear() + "-" + m2 + "-" + _this.value7[1].getDate() + "'and t2_empid ilike '" +
          _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbpkstprdget',
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
          _this.xAxisData = [];
          _this.xAxisData2 = ['日期'];
          _this.series.submitInspectPlanData = []
          _this.series.submitInspectActualPerformceData = []
          _this.series.submitInspectRate = []
          console.log(_this.xAxisData)
          // _this.xAxisData.push(result.t1_date)
          let _index = 1;
          var tableline = {}
          let object = {};
          _this.tableData = [{
            0: '折后产量'
          }, {
            0: '出勤工时'
          }, {
            0: '定额产量'
          }];
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ct2_date = element.t2_date
            let ct2_empid = element.t2_empid
            let ct2_empname = element.t2_empname
            let ct2_qty_comp = element.t2_qty_comp
            let ct2_hour_prd = element.t2_hour_prd
            let ct2_hour_wk = element.t2_hour_wk
            let ct2_stdday_prd = element.t2_stdday_prd
            let ct2_realday_prd = element.t2_realday_prd
            ct2_date = ct2_date.split('-')[2];
            ct2_date = ct2_date.substring(0, 2);
            _this.xAxisData.push(ct2_date);
            _this.xAxisData2.push(ct2_date);
            _this.series.submitInspectPlanData.push(ct2_realday_prd)
            _this.series.submitInspectActualPerformceData.push(ct2_stdday_prd)
            _this.series.submitInspectRate.push(ct2_hour_wk)
            // _this.series.ct1_count_rat.push(ct1_count_rat)
            let amount = _index

            _this.tableData[0][amount] = ct2_realday_prd
            _this.tableData[1][amount] = ct2_hour_wk
            _this.tableData[2][amount] = ct2_stdday_prd
            // if (i == 0) {
            //   _this.tableData[0][0] = ct2_empid
            //   _this.tableData[1][0] = ct2_empid
            //   _this.tableData[2][0] = ct2_empid
            //   _this.tableData[0][1] = ct2_empname
            //   _this.tableData[1][1] = ct2_empname
            //   _this.tableData[2][1] = ct2_empname
            // }
            _index++
          }


          //上月在制品
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
    getEmId() {
      let _this = this;
      _this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbpkstprdempidget',
        beforeSend: function (xhr) {
          xhr.setRequestHeader("accept", "application/json");
          xhr.setRequestHeader("Content-Type", "application/json");
        },
        dataType: 'json',
        contentType: 'application/json,charset=UTF-8',
        success: function (e) {
          console.log(e)
          let result = JSON.parse(e.d)
          _this.emlist = result.table1
          _this.getdate()
        },
        error: function () {
          // _this.cyclegetdate()
        }
      })
    },
    cyclegetdate() {
      // if (document.getElementById("kbpkstprdTable") == null) {
      //   return
      // }
      if (this.kbpgrmd_get_time == undefined) {
        return
      }
      setTimeout(() => {
        this.getdate()
      }, this.kbpgrmd_get_time * 1000);
      // setTimeout(() => {
      //   this.getdate()
      // }, 8000);
    }
  },
  mounted() {
// this.chartHigh = this.kbpgrmd_win_height*8.5
	this.win_height = 92/100 * this.kbpgrmd_win_height
	if(this.win_height > 92){
		this.win_height = 92
	}

  },
  created() {
    let _this = this
    _this.value7 = [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()]
    _this.getEmId()
    // this.getdate()
  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}

#kbempprdChart {
  border-radius: 15px;
  overflow: hidden;
}

#kbpkstprdTable {
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

.goback3 {
  border-radius: 1px;
  overflow: hidden;
  position: relative;
  left: 70%;
  margin-left: 0%;
  top: 0px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  /* color: #7b7b7b; */

  z-index: 999;
  background: #0a0a0a !important;
  height: auto;
  width: 380px;
  text-align: center;
  opacity: 1 !important;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.goback3:hover {
  opacity: 1;
}

.selectPart {
  padding: 10px;
  border-radius: 1px;
  overflow-y: scroll;
  position: absolute;
  left: 5%;
  margin-left: 0%;
  top: 10px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  /* color: #7b7b7b; */
  z-index: 999;
  background: #1b1b1b;
  height: auto;
  max-height: 80vh;
  width: 85%;
  text-align: center;
  opacity: 1 !important;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.el-button {
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
}

.likeButten {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
</style>
