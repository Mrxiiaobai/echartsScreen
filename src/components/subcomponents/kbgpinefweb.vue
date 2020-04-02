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
      <div class="goback3" @click="noaction2()">
        <div>点击筛选当前零件</div>
        <span>当前零件：{{nowEm}}:{{nowEmName}}</span>
      </div>
      <div class="selectPart" @click="nofunction()" v-show="showselP">
        <div class="likeButten" @click="getPart(-1)">关闭</div>
        <div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
          <div>{{item.tgpin_partname}}</div>
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
      <div id="kbgpinefTable" v-show="showTable">
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
export default {
  data: function () {
    return {
      lastRefreshTime: '',
      // timeId:'',
      // Dtime:this.$props.kbpgrmd_get_time,
      tableData: [{
        0: '检查效率',
      }],
      news: 0,
      emlist: [],
      chartid: '',
      showselP: false,
      xPosition: 0,
      nowEm: '',
      nowEmName: '',
      peopleList: '',
      yPosition: 0,
      chartType: '',
      showCharts: true,
      showTable: false,
      chartHigh: 510,
      chartWidth: '100%',
      chartDOM: {},
      chartName: "2018年1月份自动间隙机     产量一览表",
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
      }
    };
  },
  props: {
    kbpgrmd_query: 0,
    kbpgrmd_get_time: 0,
    kbpgrmd_refresh_time: 0,
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
          x2: 0,
        },
        legend: {
          data: [{
            name: "检查效率"
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
            name: "单位（%）",
            // max: 200,
            min: 0,
            splitNumber: 20,
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              inside: true,
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "检查效率",
            type: "line",
            data: _this.series.submitInspectPlanData,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            label: {
              show: true,
              formatter: function (params) {
                return params.value + '%'
              },
              // color: "black"
            },
          },

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
        _this.nowEm = _this.emlist[num]['tgpin_partnum']
        _this.nowEmName = _this.emlist[num]['tgpin_partname']

        console.log(_this.nowEm)
        _this.showselP = false
        _this.selectPerson()
      }, 50);
    },
    selectPerson() {
      let _this = this;
      if (_this.nowEm == '') {
        _this.nowEm = _this.emlist[0]['tgpin_partnum']
        _this.nowEmName = _this.emlist[0]['tgpin_partname']
      }
      var data = {
        query: "tgpin_partnum ilike'" + _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/kbgp12inefget',
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
          _this.tableData = [{
            0: '检查效率',
          }];
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctgpin_month = element.tgpin_month
            let ctgpin_rate = element.tgpin_rate * 100
            _this.xAxisData.push(ctgpin_month);
            _this.xAxisData2.push(ctgpin_month + '');
            _this.series.submitInspectPlanData.push(ctgpin_rate)
            let amount = _index;
            _this.tableData[0][amount] = ctgpin_rate
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
    getdate() {
      let _this = this;
      console.log(_this.nowEm + '');
      if (_this.nowEm == '') {
        _this.nowEm = _this.emlist[0]['tgpin_partnum']
        _this.nowEmName = _this.emlist[0]['tgpin_partname']
      }
      var data = {
        query: "tgpin_partnum ilike'" + _this.nowEm + "'"
      };
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/kbgp12inefget',
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
          _this.tableData = [{
            0: '检查效率',
          }];
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ctgpin_month = element.tgpin_month
            let ctgpin_rate = element.tgpin_rate * 100
            _this.xAxisData.push(ctgpin_month);
            _this.xAxisData2.push(ctgpin_month + '');
            _this.series.submitInspectPlanData.push(ctgpin_rate)
            let amount = _index;
            _this.tableData[0][amount] = ctgpin_rate
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
    getEmId() {
      let _this = this;
      _this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/kbgp12inefpartnameget',
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
          _this.emlist = result.table1
          _this.getdate()
        },
        error: function () {
          // _this.cyclegetdate()
        }
      })
    },
    cyclegetdate() {
      // if (document.getElementById("kbgpinefTable") == null) {
      //   return
      // }
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
      // setTimeout(() => {
      //   this.getdate()
      // }, 8000);
    }
  },
  mounted() {


  },
  created() {
    // if(this.timeId){
    // 	clearInterval(this.timeId)
    // }
    this.getEmId()
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
#kbgpinefTable {
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
