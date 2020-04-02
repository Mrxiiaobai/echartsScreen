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
			<div id="KbdinspqtyTable">
				<el-table :data="tableData" :span-method="objectSpanMethod" :cell-style="cellStyle" border style="width: 100%; margin-top: 20px;color:black">
					<el-table-column label="工作日">
						<el-table-column prop="0" label="计划" min-width="50%"></el-table-column>
						<el-table-column prop="1" label="消耗" min-width="50%"></el-table-column>
						<el-table-column prop="2" label="剩余" min-width="50%"></el-table-column>
					</el-table-column>
					<el-table-column label="本月各科送检汇总数据">
						<el-table-column prop="3" label="科名/日期" min-width="50%"></el-table-column>
						<el-table-column prop="4" label="月送检计划" min-width="50%"></el-table-column>
						<el-table-column prop="5" label="日送检计划" min-width="50%"></el-table-column>
						<el-table-column prop="6" label="上月在制品" min-width="50%"></el-table-column>
						<el-table-column prop="7" :label="todaymun" min-width="50%"></el-table-column>
						<el-table-column prop="8" label="实际送检 累计" min-width="50%"></el-table-column>
						<el-table-column prop="9" label="计划送检 累计" min-width="50%"></el-table-column>
						<el-table-column prop="10" label="与计划差" min-width="50%"></el-table-column>
						<el-table-column prop="11" label="送检率" min-width="50%"></el-table-column>
						<el-table-column prop="12" label="剩余送检量" min-width="50%"></el-table-column>
						<el-table-column prop="13" label="剩余日送检量" min-width="50%"></el-table-column>
						<el-table-column prop="14" label="当日送检率" min-width="50%"></el-table-column>
						<!-- <el-table-column prop="15" label="总体送检率" min-width="50%"></el-table-column> -->
					</el-table-column>
					<!-- <el-table-column
          :prop="index"
          :label="xAxisData2[index]"
          min-width="50%"
          v-for="(item,index) in tableData[0]"
          ></el-table-column>-->
				</el-table>
			</div>
			<div id="datable2">
				<el-table :data="tableData2" border style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;">
					<!-- <el-table-column prop="aa" label="科名" min-width="50%"></el-table-column> -->
					<el-table-column :label="mtitle">
						<el-table-column :prop="index" :label="xAxisData2[index]" min-width="50%" v-for="(item,index) in tableData2[0]"></el-table-column>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	export default {
		data: function() {
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
				mtitle: '',
				chartName: "QA1科  2018年3月检验效率",
				chartOption: {},
				dialogVisible: false,
				xAxisData: [],
				xAxisData2: [],
				series: {
					submitInspectPlanData: [],
					submitInspectActualPerformceData: [],
					submitInspectRate: [],
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
			cellStyle(row, column, rowIndex, columnIndex) { //根据报警级别显示颜色
				// console.log(row);
				// console.log(row.column);
				if (row.column.label === "月送检计划") {
					return 'background:#6c15ab !important'
				}
				if (row.column.label === "日送检计划") {
					return 'background:#67b5a2 !important'
				}
				if (row.column.label === "上月在制品") {
					return 'background:#24b300 !important'
				}
				if (row.column.label === "实际送累计") {
					return 'background:#c41e04 !important'
				}
				if (row.column.label === "送检率") {
					return 'background:#ad6e07 !important'
				}
				if (row.column.label === "剩余日送检量") {
					return 'background:#750202 !important'
				}
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				let _this = this
				if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) { // 第一列
					if (rowIndex % 8 == 0) {
						return {
							rowspan: 8, // 把8行合并为一列
							colspan: 1
						};
					} else {
						return {
							rowspan: 0, // 把2行合并为一列
							colspan: 0
						}
					}

				}
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
						}],
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
					series: [{
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
				// this.chartDOM = this.$echarts.init(document.getElementById("KbdinspqtyChart"));
				// mui.alert('aa')
				var data = {
					// query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
					query: _this.kbpgrmd_query
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbdinspqtyget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						// console.log(e)
						let result = JSON.parse(e.d)
						console.log(result)
						_this.lastRefreshTime = result.writetime;
						_this.xAxisData = [];
						_this.series.submitInspectPlanData = []
						_this.series.submitInspectActualPerformceData = []
						_this.series.submitInspectRate = []
						_this.mtitle = result.title
						console.log(_this.xAxisData)
						// _this.xAxisData.push(result.t1_date)
						let _index = 1;
						var tableline = {}
						let object = {};
						_this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ct1_sec = element.t1_sec
							let ct1_mplan_qty = element.t1_mplan_qty
							let ct1_dplan_qty = element.t1_dplan_qty
							let ct1_qty_wip = element.t1_qty_wip
							let ct1_dchk_qty = element.t1_dchk_qty
							let ct1_count_qty = element.t1_count_qty
							let ct1_plcount_qty = element.t1_plcount_qty
							let ct1_plshort_qty = element.t1_plshort_qty
							let ct1_chk_rat = element.t1_chk_rat
							let ct1_srpchk_qty = element.t1_srpchk_qty
							let ct1_srpdchk_qty = element.t1_srpdchk_qty
							let ct1_dchk_rat = element.t1_dchk_rat
							let amount = _index;
							let tableline = {};
							tableline[0] = result.table4[0].v_datecount
							tableline[1] = result.table4[0].v_datecost
							tableline[2] = result.table4[0].v_dateleft
							tableline[3] = ct1_sec
							tableline[4] = ct1_mplan_qty
							tableline[5] = ct1_dplan_qty
							tableline[6] = ct1_qty_wip
							tableline[7] = ct1_dchk_qty
							tableline[8] = ct1_count_qty
							tableline[9] = ct1_plcount_qty
							tableline[10] = ct1_plshort_qty
							tableline[11] = ct1_chk_rat+'%'
							tableline[12] = ct1_srpchk_qty
							tableline[13] = ct1_srpdchk_qty
							tableline[14] = ct1_dchk_rat+'%'
							_this.tableData.push(tableline)
							_index++
						}
						for (let i = 0; i < result.table2.length; i++) {
							const element = result.table2[i];
							let ct1_sec = element.t1_sec
							let ct1_mplan_qty = element.t1_mplan_qty
							let ct1_dplan_qty = element.t1_dplan_qty
							let ct1_qty_wip = element.t1_qty_wip
							let ct1_dchk_qty = element.t1_dchk_qty
							let ct1_count_qty = element.t1_count_qty
							let ct1_plcount_qty = element.t1_plcount_qty
							let ct1_plshort_qty = element.t1_plshort_qty
							let ct1_chk_rat = element.t1_chk_rat
							let ct1_srpchk_qty = element.t1_srpchk_qty
							let ct1_srpdchk_qty = element.t1_srpdchk_qty
							let ct1_dchk_rat = element.t1_dchk_rat
							let amount = _index;
							let tableline = {};
							tableline[0] = result.table4[0].v_datecount
							tableline[1] = result.table4[0].v_datecost
							tableline[2] = result.table4[0].v_dateleft
							tableline[3] = '合计'
							tableline[4] = ct1_mplan_qty
							tableline[5] = ct1_dplan_qty
							tableline[6] = ct1_qty_wip
							tableline[7] = ct1_dchk_qty
							tableline[8] = ct1_count_qty
							tableline[9] = ct1_plcount_qty
							tableline[10] = ct1_plshort_qty
							tableline[11] = ct1_chk_rat+'%'
							tableline[12] = ct1_srpchk_qty
							tableline[13] = ct1_srpdchk_qty
							tableline[14] = ct1_dchk_rat+'%'
							_this.tableData.push(tableline)
							_this.linenum = _index
							_index++
						}

						//第二张表
						var detaline = []
						for (var j in result.table3[0]) {
							console.log(j)
							if (j != '科名/日期') {
								var daynum = j
								daynum = daynum.split('/')[2];
								detaline.push(daynum)
							} else {
								detaline.push(j)
							}

						}
						var num = result.table3.length
						_this.tableData2 = []
						for (let i = 0; i < num; i++) {
							var numdeatail = {}
							var numindex = 0
							for (var j in result.table3[i]) {
								numdeatail[numindex] = result.table3[i][j]
								numindex++
							}
							numindex = 0
							_this.tableData2.push(numdeatail)
						}
						console.log(detaline)
						_this.xAxisData2 = detaline
						console.log(_this.tableData)
						console.log(_this.tableData2)
						_this.news++
						// _this.Dtime = _this.kbpgrmd_get_time
						_this.cyclegetdate()
					},
					error: function() {
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
