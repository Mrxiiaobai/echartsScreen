<template>
  <el-scrollbar style="height: 100%;">
    <div class="allcharts" :style="{height:kbpgrmd_win_height*87/100+'vh'}">
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
        <el-switch v-model="showTable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div :id="chartid" class="KbworkproChart" v-show="showCharts"></div>
      <div id="KbworkproTable" v-show="showTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column :label="tableTitle">
            <el-table-column
              :prop="index"
              :label="xAxisData2[index]"
              min-width="50%"
              v-for="(item,index) in tableData[0]"
            ></el-table-column>
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
      top: 0,
      low: 0,
      showCharts: true,
      showTable: false,
      chartid: '',
      tableData: [],
      news: 0,
      xPosition: 0,
      yPosition: 0,
      chartType: '',
	  // 384应该是50的情况下正常
      chartHigh: 384,
	  kb_query:'',
      chartWidth: '100%',
      chartDOM: {},
      chartName: "QA1  2018年3月份送检实绩",
      chartOption: {},
      xAxisData2: [],
      dialogVisible: false,
      tableTitle: '',
      xAxisData: [
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
    big: 0
  },
  computed: {
    // AMessage() {
    //   // 这里存储从store里获取的A组件的数据
    //   return this.$store.state.ifshowall
    // }
  },
  methods: {
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 0) {
        if (rowIndex % 3 === 0 && rowIndex < 4) {
          return {
            rowspan: 3,
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
      let _this = this
      if (_this.kbpgrmd_win_height == undefined) {
        document.getElementById(_this.chartid).style.height = 768 + "px";
      } else {
        document.getElementById(_this.chartid).style.height = _this.kbpgrmd_win_height / 100 * 800 * 0.96 + "px";
      }
      document.getElementById(_this.chartid).style.width = _this.chartWidth + "px";
      // document.getElementById(_this.chartid).style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById(_this.chartid), 'theme');
        _this.processDataOfChart();
        _this.chartDOM.setOption(_this.chartOption,true);
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
          data: [

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
            },
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "万片",
            // max: 200,
            min: 0,
            // splitNumber: 20,
            // axisLine: {
            //   show: false
            // },
            axisTick: {
              //   show: false
              inside: true
            }
          }
        ],
        series: [
          {
            name: "折后产量",
            type: "bar",
            barWidth: 10,
            data: _this.series.submitInspectPlanData,
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  if (params.data >= _this.top) {
                    return '#CCFFCC';
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
                { yAxis: _this.low },

              ]
            }
          }
        ],
        // color: ["#4F81BD", "#C0504D", "#9BBB59"]
      };
    },
    getdate() {
      let _this = this;
      setTimeout(() => {
        _this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
		console.log(_this.kbpgrmd_query+'================================================')
        var data = {
          // query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
          query: _this.kbpgrmd_query
        };
        mui.ajax({
          type: "post",
          url: global.context.webUrl + '/Kbworkproget',
          data: JSON.stringify(data),
          beforeSend: function (xhr) {
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          dataType: 'json',
          contentType: 'application/json,charset=UTF-8',
          success: function (e) {
            console.log(e)

            let result = JSON.parse(e.d).table1
            _this.lastRefreshTime = JSON.parse(e.d).writetime;

            _this.chartName = JSON.parse(e.d).title
            _this.tableTitle = JSON.parse(e.d).title + '状态表'

            // console.log(result)
            _this.xAxisData = [];
            console.log(_this.chartName)
            console.log(JSON.parse(localStorage.getItem(_this.chartName + 'table')))
            // mui.alert(JSON.parse(e.d).title + 'table' + '')
            if (_this.big == undefined) {
              if (localStorage.getItem(_this.chartName + 'table') == null ? true : localStorage.getItem(_this.chartName + 'table') == 'false') {
                _this.showTable = false
              } else {
                _this.showTable = true
              }
              if (localStorage.getItem(_this.chartName + 'chart') == null ? false : localStorage.getItem(_this.chartName + 'chart') == 'false') {
                _this.showCharts = false
              } else {
                _this.showCharts = true
              }
            } else {
              _this.showCharts = true
              _this.showTable = true
            }


            console.log('aaaaaa')
            console.log(_this.showTable)
            console.log(_this.showCharts)
            _this.series.submitInspectPlanData = []
            _this.series.submitInspectActualPerformceData = []
            _this.series.submitInspectRate = []
            // console.log(_this.xAxisData)
            // _this.xAxisData.push(result.t1_date)
            let _index = 3;
            var tableline = {}
            let object = {};
            //表格
            var detaline = []
            for (var j in result[0]) {
              if (j == '科名' || j == '安全最大量' || j == '安全最小量') {
                detaline.push(j)
              } else {
                var daynum = j
                daynum = daynum.split('/')[2];
                detaline.push(daynum)
              }

            }
            var num = result.length
            _this.tableData = []
            for (let i = 0; i < num; i++) {
              var numdeatail = {}
              var numindex = 0
              for (var j in result[i]) {
                numdeatail[numindex] = result[i][j]
                numindex++
              }
              numindex = 0

              _this.tableData.push(numdeatail)
            }

            if (num == 2) {
              let subline = _this.tableData.length - 1
              let flag = 0
              for (var j in _this.tableData[0]) {
                if (flag != 0) {
                  _this.series.submitInspectPlanData.push(_this.tableData[0][j])
                }
                flag++
              }
            } else {
              let subline = _this.tableData.length - 1
              let flag = 0
              for (var j in _this.tableData[_this.tableData.length - 1]) {
                if (flag != 0) {
                  _this.series.submitInspectPlanData.push(_this.tableData[_this.tableData.length - 1][j])
                }
                flag++
              }
            }
            _this.top = result[result.length - 1]['安全最大量']
            if (result.length != 1) {
              _this.low = result[result.length - 1]['安全最小量']
            }
            if (_this.low == 0 || _this.low == '') {
              _this.low = 'a'
            }
            if (_this.tableData[_this.tableData.length - 1][0] == 'total') {
              _this.chartName = _this.chartName
              _this.tableTitle = _this.tableTitle
            }
            _this.chartName = _this.chartName
            _this.tableTitle = _this.tableTitle
            // console.log(detaline)
            _this.xAxisData = detaline.slice(1, detaline.length)
            // console.log(_this.xAxisData)
            _this.xAxisData2 = detaline
            // console.log(_this.tableData)
            //上月在制品
            _this.news++
            _this.generateChart();
            // _this.Dtime = _this.kbpgrmd_get_time

            _this.cyclegetdate();
          },
          error: function () {
            _this.cyclegetdate();
          }
        })
      }, 100);
    },
    cyclegetdate() {
      if (document.getElementById("KbworkproTable") == null) {
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
  // watch:{
	 //  kbpgrmd_query:{
		//   immediate:true,
		//   handler(newVal,oldVal){
		// 	  if(newVal == "tempwip_cur_dep = 'QA1' and tempwip_date>= to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd')  and tempwip_date <=to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd') +  interval '1 month'"){
		// 		  this.kb_query = newVal
		// 	  }
		//   }
	 //  }
  // },
  mounted() {
	  let _this = this
	  console.log(_this.kb_query)
  },
  created() {
    // mui.alert(this.big + '')
    // mui.alert(this.kbpgrmd_get_time + '')
    // mui.alert(this.kbpgrmd_refresh_time + '')
    //kbpgrmd_win_height
    // this.chartHigh = this.kbpgrmd_win_height / 100 * 800 * 0.6
    // console.log('aa')
    // console.log(window.innerWidth)
    // console.log(this.chartwidth / 100 * (window.innerWidth - 40))
    this.chartWidth = this.chartwidth / 100 * (window.innerWidth - 80)
    this.getdate()
  }
};
</script>
<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
.KbworkproChart {
  border-radius: 15px;
  overflow: hidden;
  margin-top: -50px;
}
#KbworkproTable {
  width: 100%;
}
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
.showCharts {
  padding-right: 20px;
}
.titlechart {
  margin-top: 0px !important;
}
</style>
