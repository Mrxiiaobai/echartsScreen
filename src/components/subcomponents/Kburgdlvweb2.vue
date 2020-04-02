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
      <!-- <div class="goback3" @click="noaction()">
        <div>点击筛选当前零件号</div>
        <span>当前子零件号：{{nowPart}}</span>
      </div>-->
      <div class="selectPart2" @click="nofunction()" style="left: 30% !important;width: 70%;position: relative;height: 60px;">
        <div class="likeButten" @click="noaction()" style="width: 280px;position:absolute;right: 80px;margin-top: 0;">
          <div>请选择</div>
          <div>子零件：{{nowPart}}</div>
        </div>
        <div class="likeButten" @click="getPart(-1)" style="background-color: #ff0000;width: 100px;position:absolute;right: 0;margin-top: 0;">
          <div>清除</div>
          <div>&nbsp;</div>
        </div>
      </div>
      <div class="selectPart" @click="nofunction()" v-show="showselP">
        <div class="likeButten" @click="getPart(-2)">
          <div>关闭</div>
          <div>&nbsp;</div>
        </div>
        <div v-for="(item, index) in partList" class="likeButten" @click="getPart(index)">
          <div>{{item['e']}}</div>
          <div>{{item['d']}}</div>
        </div>
      </div>
      <div id="KburgdlvTable2">
        <el-table
          :data="filteredTableData"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;"
        >
          <el-table-column label="急发货品种看板">
            <!-- <el-table-column prop="a" label="序号" min-width="50%"></el-table-column>
            <el-table-column prop="b" label="品名" min-width="50%"></el-table-column>
            <el-table-column prop="c" label="商品编码" min-width="50%"></el-table-column>
            <el-table-column prop="d" label="产品零件号" min-width="50%"></el-table-column>
            <el-table-column prop="e" label="批量号" min-width="50%"></el-table-column>
            <el-table-column prop="f" label="归属科室" min-width="50%"></el-table-column>
            <el-table-column prop="g" label="待发货数" min-width="50%"></el-table-column>
            <el-table-column prop="h" label="库存数" min-width="50%"></el-table-column>
            <el-table-column prop="i" label="当日已发库存" min-width="50%"></el-table-column>
            <el-table-column prop="j" label="上油需求" min-width="50%"></el-table-column>
            <el-table-column prop="k" label="在制品数" min-width="50%"></el-table-column>
            <el-table-column prop="l" label="在制品位置" min-width="50%"></el-table-column>
            <el-table-column prop="m" label="涂层反馈结果" min-width="50%"></el-table-column>
            <el-table-column prop="n" label="（预估）不良率" min-width="50%"></el-table-column>-->
            <el-table-column prop="a" label="序号" min-width="30%"></el-table-column>
            <el-table-column prop="b" label="优先级" min-width="20%"></el-table-column>
            <el-table-column prop="c" label="商品编码" min-width="80%"></el-table-column>
            <el-table-column prop="d" label="品名" min-width="100%"></el-table-column>
            <el-table-column prop="e" label="子零件" @click="aa()" min-width="80%"></el-table-column>
            <el-table-column prop="f" label="待发货数" min-width="40%"></el-table-column>
            <el-table-column prop="g" label="库存数" min-width="40%"></el-table-column>
            <el-table-column prop="h" label="在包数" min-width="40%"></el-table-column>
            <el-table-column prop="i" label="上油需求" min-width="40%"></el-table-column>
            <el-table-column prop="j" label="在制品数" min-width="40%"></el-table-column>
            <el-table-column prop="k" label="批号" min-width="50%"></el-table-column>
            <el-table-column prop="l" label="在制品位置" min-width="50%"></el-table-column>
            <el-table-column prop="m" label="涂层反馈结果" min-width="40%"></el-table-column>
            <el-table-column prop="n" label="归属科室" min-width="30%"></el-table-column>
			<el-table-column prop="o" label="成品入库数" min-width="50%"></el-table-column>
			<el-table-column prop="p" label="是否新品" min-width="50%"></el-table-column>
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
      tableDate3: [],//suyou
      partList: [],//零件列表
      nowPart: '',//当前零件号
      showselP: false,
      iscycle: 1,
      cycleFlag: 0,
      start: 0,
      end: 0,
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
    kbpgrmd_records: 0,
  },
  computed: {
    filteredTableData: function () {
      var _this = this
      // return this.tableData.filter(function(...){...});
      return _this.tableData2.slice(_this.start, _this.end)
    }
  },
  methods: {

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {

    },
    aa() {
      mui.alert('aa')
    },
    nofunction() {
      let _this = this;
      _this.$emit("noaction");
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.a % 2 != 0 && row.i > row.j && row.k == '') {
        return 'bluebackgroundred';
        // return 'warning-row';
      }
      if (row.a % 2 != 0 && row.i <= row.j && row.k == '') {
        return 'bluebackgroundrgreen';
        // return 'warning-row';
      }
      if (row.a % 2 != 0) {
        return 'bluebackground';
        // return 'warning-row';
      }
      if (row.a % 2 == 0 && row.i > row.j && row.k == '') {
        return 'blackbackgroundred';
        // return 'warning-row';
      }
      if (row.a % 2 == 0 && row.i <= row.j && row.k == '') {
        return 'blackbackgroundrgreen';
        // return 'warning-row';
      }
      if (row.a % 2 == 0) {
        return 'blackbackground';
        // return 'warning-row';
      }
      return '';
    },
    detailSetting() {
      this.dialogVisible = true;
    },
    generateChart() {
      document.getElementById("KburgdlvChart").style.height = this.chartHigh + "px";
      document.getElementById("KburgdlvChart").style.width = this.chartWidth + "px";
      let _this = this;
      // if (_this.chartDOM != {}) {
      //   _this.chartDOM.dispose();
      // }
      // document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
      document.getElementById("KburgdlvChart").style.width = '100%';
      _this.$nextTick(() => {
        _this.chartDOM = _this.$echarts.init(document.getElementById("KburgdlvChart"), 'theme');
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
      // this.chartDOM = this.$echarts.init(document.getElementById("KburgdlvChart"));
      // mui.alert('aa')
      mui.ajax({
        type: "post",
        url: global.context.webUrl + '/Kburgdlvget',
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
          let _index = 0;
          var tableline = {}
          let object = {};
          _this.tableData = []
          for (let i = 0; i < result.table2.length; i++) {
            const element = result.table2[i];
            let ct2_part_desc = element.t2_part_desc
            let ct2_par = element.t2_par
            let ct2_qty_ship = element.t2_qty_ship
            let ct2_priority = element.t2_priority
            let ct2_qty_inv = element.t2_qty_inv
            let amount = _index;
            let tableline = {};
            tableline[0] = ct2_priority
            tableline[1] = ct2_part_desc
            tableline[2] = ct2_par
            tableline[3] = ct2_qty_ship
            tableline[4] = ct2_qty_inv

            _this.tableData.push(tableline)
            _index++
          }
          _this.tableData2 = []
          for (let i = 0; i < result.table1.length; i++) {
            const element = result.table1[i];
            let ct1_par_desc = element.t1_part_desc
            let ct1_par = element.t1_par
            let ct1_priority = element.t1_priority
            let ct1_comp = element.t1_comp
            let ct1_ywktk_nbr = element.t1_ywktk_nbr
            let ct1_sec_bel = element.t1_sec_bel
            let ct1_qty_ship = element.t1_qty_ship
            let ct1_qty_inv = element.t1_qty_inv
            let ct1_qty_all = element.t1_qty_all
            let ct1_qty_dem = element.t1_qty_dem
            let ct1_qty_wip = element.t1_qty_wip
            let ct1_op_desc = element.t1_op_desc
            let ct1_coat_status = element.t1_coat_status
            let ct1_bad_rat = element.t1_bad_rat
            let ct1_seq = element.t1_seq
			// 新增
			let ct1_qty_fsh = element.t1_qty_fsh
			let ct1_nplg = element.t1_nplg
			if(ct1_nplg == true){
				ct1_nplg = '是'
			}else{
				ct1_nplg = '否'
			}
            let tableline = {};
            // tableline['a'] = i + 1
            // tableline['b'] = ct1_par_desc
            // tableline['c'] = ct1_par
            // tableline['d'] = ct1_comp
            // tableline['e'] = ct1_ywktk_nbr
            // tableline['f'] = ct1_sec_bel
            // tableline['g'] = ct1_qty_ship
            // tableline['h'] = ct1_qty_inv
            // tableline['i'] = ct1_qty_all
            // tableline['j'] = ct1_qty_dem
            // tableline['k'] = ct1_qty_wip
            // tableline['l'] = ct1_op_desc
            // tableline['m'] = ct1_coat_status
            // tableline['n'] = ct1_bad_rat
            tableline['a'] = ct1_seq
            tableline['b'] = ct1_priority
            tableline['c'] = ct1_par
            tableline['d'] = ct1_par_desc
            tableline['e'] = ct1_comp
            tableline['f'] = ct1_qty_ship
            tableline['g'] = ct1_qty_inv
            tableline['h'] = ct1_qty_all
            tableline['i'] = ct1_qty_dem
            tableline['j'] = ct1_qty_wip
            tableline['k'] = ct1_ywktk_nbr
            tableline['l'] = ct1_op_desc
            tableline['m'] = ct1_coat_status
            tableline['n'] = ct1_sec_bel
			tableline['o'] = ct1_qty_fsh
			tableline['p'] = ct1_nplg
            _this.tableData2.push(tableline)
          }
          _this.partList = []
          _this.tableData3 = _this.tableData2
          for (let i = 0; i < _this.tableData3.length; i++) {
            const element = _this.tableData3[i];
            let flag = -1
            for (let j = 0; j < _this.partList.length; j++) {
              const element2 = _this.partList[j];
              if (element2['e'].toLowerCase().trim() == element['e'].toLowerCase().trim()) {
                flag = 1
                break
              }
            }
            if (flag == -1) {
              _this.partList.push(element)
            }
          }
          // _this.partList = _this.partList.sort(function (a, b) {
          //   for (let j = 0; j < a.e.length - 1; j++) {
          //     for (let i = 0; i < a.e.length - 1 - j; i++) {
          //       if (a.e.substring(i, i + 1) != b.e.substring(i, i + 1)) {
          //         return a.e.substring(i, i + 1) - b.e.substring(i, i + 1)
          //         break
          //       }
          //     }
          //   }
          // })

          for (var i = 0; i < _this.partList.length - 1; i++) {
            //每轮比较次数，次数=长度-1-此时的轮数
            for (var j = 0; j < _this.partList.length - 1 - i; j++) {
              let flag2 = -1
              for (let k = 0; k < _this.partList[j].e.length; k++) {
                if (_this.partList[j].e.substring(k, k + 1) > _this.partList[j + 1].e.substring(k, k + 1)) {
                  flag2 = 1
                  break
                }
                if (_this.partList[j].e.substring(k, k + 1) < _this.partList[j + 1].e.substring(k, k + 1)) {
                  flag2 = -1
                  break
                }
              }
              if (flag2 == 1) {
                var temp = _this.partList[j];
                _this.partList[j] = _this.partList[j + 1];
                _this.partList[j + 1] = temp;
              }
            }
          }
          console.log(_this.partList)
          console.log(_this.tableData)
          console.log(_this.tableData2)
          _this.news++
          _this.selectAllPart()
          // _this.Dtime = _this.kbpgrmd_get_time

          _this.cyclegetdate()
        },
        error: function () {
          _this.cyclegetdate()
        }
      })
    },
    getPart(num) {
      let _this = this
      setTimeout(() => {
        if (num == -2) {
          _this.showselP = false
          return
        }
        if (num == -1) {
          _this.nowPart = ''
          _this.showselP = false
          _this.selectAllPart()
          return
        }
        _this.nowPart = _this.partList[num]['e']
        console.log(_this.nowPart)
        _this.showselP = false
        _this.selectAllPart()
      }, 50);

    },
    selectAllPart() {
      let _this = this
      if (_this.nowPart != '') {
        _this.tableData2 = []
        for (let i = 0; i < _this.tableData3.length; i++) {
          const element = _this.tableData3[i];
          if (element['e'].toLowerCase().trim() == _this.nowPart.toLowerCase().trim()) {
            _this.tableData2.push(element)
          }
        }
      } else {
        _this.tableData2 = _this.tableData3
      }
      _this.start = 0
      if (_this.kbpgrmd_refresh_time != undefined && _this.cycleFlag == 0) {
        _this.cycleFlag = 1
        _this.end = _this.kbpgrmd_records
        _this.cycledate()
      } else {
        _this.end = _this.tableData2.length
      }

    },
    cycledate() {
      var _this = this
      if (document.getElementById("KburgdlvTable2") == null) {
        return
      }
      setTimeout(() => {
        if (_this.end >= _this.tableData2.length) {
          _this.start = 0
          _this.end = _this.kbpgrmd_records
        } else {
          _this.start = _this.start + _this.kbpgrmd_records
          _this.end = _this.end + _this.kbpgrmd_records
        }
        _this.cycledate()
      }, this.kbpgrmd_refresh_time * 1000);
    },
    cyclegetdate() {
      if (document.getElementById("KburgdlvTable2") == null) {
        return
      }
      if (this.kbpgrmd_get_time == undefined) {
        return
      }
      setTimeout(() => {
        this.getdate()
      }, this.kbpgrmd_get_time * 1000);
    },
    noaction() {
      let _this = this;
      _this.$emit("noaction");
      setTimeout(() => {
        _this.showselP = true
      }, 100);
    },
    // compare(prop) {
    //   return function (a, b) {
    //     return a.prop - b.prop
    //   }
    // }
  },
  mounted() {


  },
  created() {
    this.getdate()
    // mui.alert(this.kbpgrmd_records + '')
  },
};
</script>
<style scoped>
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
#buttonGroup {
  float: right;
  margin-right: 180px;
}
#KburgdlvChart {
  border-radius: 15px;
  overflow: hidden;
}
#KburgdlvTable {
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

.el-table .bluebackground {
  background: rgb(34, 37, 39) !important;
  color: white;
}
.bluebackground .cell {
  background: rgb(34, 37, 39) !important;
}
.el-table .bluebackgroundred {
  background: rgb(34, 37, 39) !important;
  color: red;
}
.bluebackgroundred .cell {
  background: rgb(34, 37, 39) !important;
}
.el-table .bluebackgroundrgreen {
  background: rgb(34, 37, 39) !important;
  color: #41b883;
}
.bluebackgroundrgreen .cell {
  background: rgb(34, 37, 39) !important;
}
.el-table .blackbackground {
  background: black !important;
  color: white;
}
.blackbackground .cell {
  background: black !important;
}
.el-table .blackbackgroundred {
  background: black !important;
  color: red;
}
.blackbackgroundred .cell {
  background: black !important;
}
.el-table .blackbackgroundrgreen {
  background: black !important;
  color: #41b883;
}
.blackbackgroundrgreen .cell {
  background: black !important;
}
.bluebackground:hover > td {
  background: rgb(34, 37, 39) !important;
}
.bluebackgroundred:hover > td {
  background: rgb(34, 37, 39) !important;
}
.bluebackgroundrgreen:hover > td {
  background: rgb(34, 37, 39) !important;
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
  background: #1b1b1b;
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
.selectPart2 {
  border-radius: 1px;
  /* overflow-y: scroll; */
  position: relative;
  left: 55%;
  margin-left: 0%;
  top: 10px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  /* color: #7b7b7b; */
  z-index: 999;
  background: #0a0a0a;
  height: auto;
  max-height: 80vh;
  width: 50%;
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
</style>
