<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts" v-bind:style="{height:win_height+'vh'}">
      <div class="likeButton">
        <span style="font-size:13px;">更新时间:</span>
        <span>{{lastRefreshTime}}</span>
      </div>
      <!-- 			<div class="Dtime">
				<span>{{Dtime}}</span>
      </div>-->
      <div
        class="selectPart2"
        @click="nofunction()"
        style="left:30%!important;width:70%!important;"
      >
        <div style="display: inline-block;">
          <el-date-picker
            @change="select()"
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
        <div class="likeButten" @click="noaction()" style="width: 280px">
          <div>设备：{{nowEm}}</div>
        </div>
        <div class="likeButten" @click="getPart(-1)" style="background-color: #ff0000;width: 100px">
          <div>清除</div>
        </div>
      </div>
      <div class="selectPart" @click="nofunction()" v-show="showselP">
        <div class="likeButten" @click="getPart(-2)">
          <div>关闭</div>
        </div>
        <div v-for="(item, index) in officelist" class="likeButten" @click="getPart(index)">
          <div>{{item['t1_mch']}}</div>
          <!-- <div>{{item['d']}}</div> -->
        </div>
      </div>
      <div class="goback2" @click="noaction3()">
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
      <div id="KbmchprdChart" v-show="showCharts"></div>
      <div id="KbmchprdTable" v-show="showTable">
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
      showCharts: true,
      showTable: false,
      zhuzi: zhuzi,
      tableData: [{
        0: '计划装配',
      }, {        0: '日交付实绩',
      }, {        0: '交付实绩',
      }, {        0: '备注',
      }],
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
      news: 0,
      xPosition: 0,
      yPosition: 0,
      chartType: '',
      value7: [],
      nowEm: '',
      nowPart: '',//当前零件号
      showselP: false,
      chartHigh: '90%',
      officelist: [],
      chartWidth: '100%',
      chartDOM: {},
      chartName: "M31 3月送检实绩",
      chartOption: {},
      dialogVisible: false,
      xAxisData: [
      ],
      xAxisData2: ['日期', '上月在制品'],
      series: {
        submitInspectPlanData: [
        ],
        submitInspectActualPerformceData: [
        ],
        submitInspectRate: [
        ],
        ct1_count_rat: [],
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
	kbpgrmd_win_height: 0
  },
  methods: {
    alertHeight() {
      let _this = this
      if (_this.showTable) {
        _this.chartHigh ='90%'

      } else {
        _this.chartHigh = '90%'
      }
      _this.resizeHeight()
    },
    resizeHeight() {
      let _this = this
      document.getElementById("KbmchprdChart").style.height = this.chartHigh;
      document.getElementById("KbmchprdChart").style.width = this.chartWidth;
      _this.chartDOM.resize();
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
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
      if (rowIndex === 4) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    getPart(num) {
      let _this = this
      setTimeout(() => {
        if (num == -2) {
          _this.showselP = false
          return
        }
        if (num == -1) {
          _this.showselP = false
          _this.nowEm = ''
          return
        }
        _this.nowEm = _this.officelist[num]['t1_mch']
        console.log(_this.nowEm)
        _this.showselP = false
        _this.select()
      }, 50);
    },
    select() {
      let _this = this;
      if (_this.nowEm == '') {
        _this.nowEm = _this.officelist[0]['t1_mch']
      }
      let m1 = Number(_this.value7[0].getMonth()) + 1
      let m2 = Number(_this.value7[1].getMonth()) + 1
      var data = {
        // query: "t1_date between '" + _this.value7[0].getFullYear() + "-" + Number(_this.value7[0].getMonth()) + 1 + "-" + _this.value7[0].getDate() + "' and '" + _this.value7[1].getFullYear() + "-" + Number(_this.value7[1].getMonth()) + 1 + "-" + _this.value7[1].getDate() + "' and t1_sec ilike '" + _this.nowEm + "'"
        query: "t1_date between '" + _this.value7[0].getFullYear() + "-" + m1 + "-" + _this.value7[0].getDate() + "' and '" + _this.value7[1].getFullYear() + "-" + m2 + "-" + _this.value7[1].getDate() + "' and t1_mch ilike '" + _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbmchprdget',
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

          _this.chartName = result.title
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
            let ct1_date = element.t1_date
            let ct1_dayasm_plan = element.t1_dayasm_plan
            let ct1_daydlv_qty = element.t1_daydlv_qty
            let ct1_dlv_count = element.t1_dlv_count
            let ct1_mch = element.t1_mch
            let ct1_rmks = element.t1_rmks
            ct1_date = ct1_date.split('-')[2];
            ct1_date = ct1_date.substring(0, 2);
            _this.xAxisData.push(ct1_date);
            _this.xAxisData2.push(ct1_date);
            _this.series.submitInspectPlanData.push(ct1_dayasm_plan)
            _this.series.submitInspectActualPerformceData.push(ct1_daydlv_qty)
            _this.series.submitInspectRate.push(ct1_dlv_count)
            let amount = _index;
            _this.tableData[0][amount] = ct1_dayasm_plan
            _this.tableData[1][amount] = ct1_daydlv_qty
            _this.tableData[2][amount] = ct1_dlv_count
            _index++
          }
          console.log(_this.tableData)
          _this.news++

          _this.generateChart();
        },
        error: function () {
        }
      })
    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("KbmchprdChart").style.height = this.chartHigh;
      document.getElementById("KbmchprdChart").style.width = this.chartWidth;
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("KbmchprdChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("KbmchprdChart"), 'theme');
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
          x2: 0,
        },
        legend: {
          data: [, {
            name: "计划装配"
          }, {
              name: "日交付实绩",
              icon: "image://" + _this.zhuzi
            }, {
              name: "交付实绩"
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
            name: "计划装配",
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
            }
          },
          {
            name: "日交付实绩",
            type: "bar",
            barWidth: 10,
            data: _this.series.submitInspectActualPerformceData,
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  if (params.data >= _this.series.submitInspectPlanData[params.dataIndex]) {
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
            },
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }, {
            name: "交付实绩",
            type: "line",
            data: _this.series.submitInspectRate,
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
    getOffice() {
      let _this = this;
      _this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbmchprdpartnameget',
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
          _this.officelist = result.table1
          _this.getdate()
        },
        error: function () {
          // _this.cyclegetdate()
        }
      })
    },
    noaction() {
      let _this = this;
      _this.$emit("noaction");
      setTimeout(() => {
        _this.showselP = true
      }, 100);
    },
    noaction3() {
      let _this = this;
      _this.$emit("noaction");
    },
    nofunction() {
      let _this = this;
      _this.$emit("noaction");
    },
    getdate() {
      let _this = this;
      if (_this.nowEm == '') {
        _this.nowEm = _this.officelist[0]['t1_mch']
      }
      let m1 = Number(_this.value7[0].getMonth()) + 1
      let m2 = Number(_this.value7[1].getMonth()) + 1
      var data = {
        // query: "t1_date between '" + _this.value7[0].getFullYear() + "-" + Number(_this.value7[0].getMonth()) + 1 + "-" + _this.value7[0].getDate() + "' and '" + _this.value7[1].getFullYear() + "-" + Number(_this.value7[1].getMonth()) + 1 + "-" + _this.value7[1].getDate() + "' and t1_sec ilike '" + _this.nowEm + "'"
        query: "t1_date between '" + _this.value7[0].getFullYear() + "-" + m1 + "-" + _this.value7[0].getDate() + "' and '" + _this.value7[1].getFullYear() + "-" + m2 + "-" + _this.value7[1].getDate() + "' and t1_mch ilike '" + _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kbmchprdget',
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

          _this.chartName = result.title
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
            let ct1_date = element.t1_date
            let ct1_dayasm_plan = element.t1_dayasm_plan
            let ct1_daydlv_qty = element.t1_daydlv_qty
            let ct1_dlv_count = element.t1_dlv_count
            let ct1_mch = element.t1_mch
            let ct1_rmks = element.t1_rmks
            ct1_date = ct1_date.split('-')[2];
            ct1_date = ct1_date.substring(0, 2);
            _this.xAxisData.push(ct1_date);
            _this.xAxisData2.push(ct1_date);
            _this.series.submitInspectPlanData.push(ct1_dayasm_plan)
            _this.series.submitInspectActualPerformceData.push(ct1_daydlv_qty)
            _this.series.submitInspectRate.push(ct1_dlv_count)
            let amount = _index;
            _this.tableData[0][amount] = ct1_dayasm_plan
            _this.tableData[1][amount] = ct1_daydlv_qty
            _this.tableData[2][amount] = ct1_dlv_count
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
      if (document.getElementById("KbinspprwcTable") == null) {
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
	// this.chartHigh = this.kbpgrmd_win_height*8.5
	this.win_height = 92/100 * this.kbpgrmd_win_height
	if(this.win_height > 92){
		this.win_height = 92
	}
    // this.getdate()
  },
  created() {
    var _this = this;
    _this.value7 = [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()]
    _this.getOffice()
  },
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#KbinspprwcChart {
  border-radius: 15px;
  overflow: hidden;
}
#KbinspprwcTable {
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
