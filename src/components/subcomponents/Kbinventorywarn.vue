<template>
	<el-scrollbar style="height: 100%;left:0 !important;">
		<div class="allcharts">
			<div class="likeButton">
				<span style="font-size:13px;">更新时间:</span><span>{{lastRefreshTime}}</span>
			</div>
			<div class="Dtime">
				<span>{{Dtime}}</span>
			</div>
			<!-- <div class="likeButton">
			<span>{{lastRefreshTime}}</span>
		</div> -->
			<div id="KbinventorywarnTable">
				<el-table :data="filteredTableData" :row-class-name="tableRowClassName" border style="width: 100%;">
					<el-table-column label="库存预警信息" style="height: 40px;line-height:40px;">
						<el-table-column prop="0" label="物料品" min-width="50%"></el-table-column>
						<el-table-column prop="1" label="品名" min-width="50%"></el-table-column>
						<el-table-column prop="2" label="总量" min-width="50%" width="85%"></el-table-column>
						<el-table-column prop="a" label="安全量" min-width="50%" width="80%"></el-table-column>
						<el-table-column prop="b" label="最高量" min-width="50%" width="80%"></el-table-column>
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
				timeId: '',
				Dtime: this.$props.kbpgrmd_get_time,
				aa: false,
				tableData: [],
				cycleFlag: 0,
				tableData2: [],
				blueDate: [],
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
				xAxisData: [],
				start: 0,
				end: 0,
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
			kbpgrmd_records: 0
		},
		computed: {
			filteredTableData: function() {
				var _this = this
				// return this.tableData.filter(function(...){...});
				return _this.tableData.slice(_this.start, _this.end)
			}
		},
		methods: {
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {

			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (row.c == 1) {
					return 'warn-row';
				} else if (row.c == 2) {
					return 'yellow-row';
				} else {
					return 
				}
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
								formatter: function(params) {
									return params.value + '%'
								},
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
								formatter: function(params) {
									return params.value + '%'
								},
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
					query: _this.kbpgrmd_query,
					userid:JSON.parse(localStorage.getItem("SDdata")).userid,
					corp:JSON.parse(localStorage.getItem("SDdata")).corp,
					domain:JSON.parse(localStorage.getItem("SDdata")).domain,
					session_id:JSON.parse(localStorage.getItem("SDdata")).session_id
				};
				var myDate = new Date();
				_this.todaymun = myDate.getDate();
				_this.todaymun = _this.todaymun + '(今日)'
				// this.chartDOM = this.$echarts.init(document.getElementById("KburgdlvChart"));
				// mui.alert('aa')
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbxwldwarnget',
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
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];

							let ct2_part_desc = element.tpartldwarn_part
							let ct2_par = element.tpartldwarn_desc
							// let ct2_qty_ship = element.tpartldwarn_desc2
							let ct2_priority = element.tpartldwarn_qty
							let ct2_qty_sfty_stk = element.tpartldwarn_sfty_stk
							let ct2_qty_ord_max = element.tpartldwarn_ord_max
							let ct2_qty_remark = element.tpartldwarn_remark

							// let ct2_qty_um = element.tpartldwarn_um

							let amount = _index;
							let tableline = {};
							tableline[0] = ct2_part_desc
							tableline[1] = ct2_par
							tableline[2] = ct2_priority
							tableline['a'] = ct2_qty_sfty_stk
							tableline['b'] = ct2_qty_ord_max
							tableline['c'] = ct2_qty_remark
							_this.tableData.push(tableline)
							// if (ct2_qty_ship < ct2_qty_inv) {
							// 	_this.blueDate.push(i)
							// }
							_index++
						}
// 						console.log('aaaaaa')
// 						console.log(_this.blueDate)
// 						_this.tableData2 = []
// 						for (let i = 0; i < result.table1.length; i++) {
// 							const element = result.table1[i];
// 							let ct1_par_desc = element.t1_par_desc
// 							let ct1_par = element.t1_par
// 							let ct1_comp = element.t1_comp
// 							let ct1_ywktk_nbr = element.t1_ywktk_nbr
// 							let ct1_sec_bel = element.t1_sec_bel
// 							let ct1_qty_ship = element.t1_qty_ship
// 							let ct1_qty_inv = element.t1_qty_inv
// 							let ct1_qty_all = element.t1_qty_all
// 							let ct1_qty_dem = element.t1_qty_dem
// 							let ct1_qty_wip = element.t1_qty_wip
// 							let ct1_op_desc = element.t1_op_desc
// 							let ct1_coat_status = element.t1_coat_status
// 							let ct1_bad_rat = element.t1_bad_rat
// 							let tableline = {};
// 							tableline[0] = i + 1
// 							tableline[1] = ct1_par_desc
// 							tableline[2] = ct1_par
// 							tableline[3] = ct1_comp
// 							tableline[4] = ct1_ywktk_nbr
// 							tableline[5] = ct1_sec_bel
// 							tableline[6] = ct1_qty_ship
// 							tableline[7] = ct1_qty_inv
// 							tableline[8] = ct1_qty_all
// 							tableline[9] = ct1_qty_dem
// 							tableline[10] = ct1_qty_wip
// 							tableline[11] = ct1_op_desc
// 							tableline[12] = ct1_coat_status
// 							tableline[13] = ct1_bad_rat
// 
// 							_this.tableData2.push(tableline)
// 						}
						console.log(_this.tableData)
						// console.log(_this.tableData2)
						_this.news++
						_this.start = 0
						// if (_this.kbpgrmd_refresh_time != undefined && _this.cycleFlag == 0) {
						// 	_this.cycleFlag = 1
						// 	_this.end = _this.kbpgrmd_records
						// 	console.log('bbb')
						// 	_this.cycledate()
						// } else {
						// 	_this.end = _this.tableData.length
						// }

						if (_this.cycleFlag == 0) {
							if (_this.kbpgrmd_refresh_time != undefined) {
								_this.cycleFlag = 1
								_this.end = _this.kbpgrmd_records
								console.log('bbb')
								_this.cycledate()
							} else {
								_this.cycleFlag = 1
								_this.end = _this.tableData.length
							}
						} else {
							if (_this.kbpgrmd_refresh_time != undefined) {
								_this.end = _this.kbpgrmd_records
							} else {
								_this.end = _this.tableData.length
							}
						}
						_this.Dtime = _this.kbpgrmd_get_time

						_this.cyclegetdate()
					},
					error: function() {
						_this.cyclegetdate()
					}
				})
			},
			cycledate() {
				console.log('abc')
				var _this = this
				if (document.getElementById("KbinventorywarnTable") == null) {
					return
				}
				setTimeout(() => {
					if (_this.end >= _this.tableData.length) {
						_this.start = 0
						_this.end = _this.kbpgrmd_records
					} else {
						_this.start = _this.start + _this.kbpgrmd_records
						_this.end = _this.end + _this.kbpgrmd_records
					}
					console.log('ccc')
					_this.cycledate()
				}, this.kbpgrmd_refresh_time * 1000);
			},
			cyclegetdate() {
				if (this.kbpgrmd_get_time == undefined) {
					return
				}
				if (this.timeId) {
					clearInterval(this.timeId)
				}
				this.timeId = setInterval(() => {
					this.Dtime--;
					if (this.Dtime == 1) {
						clearInterval(this.timeId)
					}
				}, 1000);
				setTimeout(() => {
					this.getdate()
				}, this.kbpgrmd_get_time * 1000);
			}
		},
		mounted() {


		},
		created() {
			var _this = this
			if (_this.timeId) {
				clearInterval(_this.timeId)
			}
			_this.getdate()

			// mui.alert(_this.kbpgrmd_records + '')
		},
	};
</script>
<style scoped>
	#buttonGroup {
		float: right;
		margin-right: 180px;
	}

	#KburgdlvChart {
		border-radius: 15px;
		overflow: hidden;
	}

	#KbinventorywarnTable {
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

	/* .el-table tr{
	background: red !important;

} */

	.el-table .warn-row {
		background: red !important;
	}

	.warn-row .cell {
		background: red !important;
	}

	.el-table .yellow-row {
		background: yellow !important;
	}

	.yellow-row .cell {
		background: yellow !important;
	}

	.el-table .hidden-row {
		display: none;
	}

	.hidden-row .cell {
		display: none;
	}
	
	.el-table .static-row {
		/* background: yellow !important; */
	}
	
	.static-row .cell {
		/* background: yellow !important; */
	}
	
	.el-table .cell{
		/* white-space: nowrap; */
	}
</style>
