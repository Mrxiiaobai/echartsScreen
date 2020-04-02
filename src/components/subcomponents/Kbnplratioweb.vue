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
			<div id="kbnplratioChart"></div>
			<div id="kbnplratioTable">
				<!-- <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px;font-size:1px;color:black"
        >-->
				<el-table :data="tableData" border style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;">
					<!-- <el-table-column prop="aa" label="不良率" min-width="48%"></el-table-column> -->
					<el-table-column :prop="index" :label="xAxisData2[index]" min-width="50%" v-for="(item,index) in tableData[0]"></el-table-column>
					<!-- <el-table-column prop="amount2" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount3" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
        <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>
          <el-table-column prop="amount1" label="日" min-width="50%"></el-table-column>-->
				</el-table>
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	import jiantou from "../../assets/jiantou.png"
	export default {
		data: function() {
			return {
				win_height: '',
				lastRefreshTime: '',
				// Dtime:this.$props.kbpgrmd_get_time,
				tableData: [{
					0: '日不良率（上月对比值）',
				}, {
					0: '日不良率（实际）',
				}],
				jiantou:jiantou,
				top:'',
				news: 0,
				xPosition: 0,
				yPosition: 0,
				chartType: '',
				chartHigh: 688.5,
				chartWidth: '100%',
				chartDOM: {},
				chartName: "QA1 2018年 3 月 份 日 不 良 率 状 态 表 ",
				chartOption: {},
				dialogVisible: false,
				xAxisData: [],
				xAxisData2: ['不良率'],
				series: {
					submitInspectPlanData: [],
					submitInspectActualPerformceData: [],
					submitInspectRate: [],
					ct1_count_rat: []
				}
			};
		},
		methods: {
			detailSetting() {
				this.dialogVisible = true;
			},
			generateChart() {
				document.getElementById("kbnplratioChart").style.height = this.chartHigh + "px";
				document.getElementById("kbnplratioChart").style.width = this.chartWidth + "px";
				let _this = this;
				// if (_this.chartDOM != {}) {
				//   _this.chartDOM.dispose();
				// }
				// document.getElementById("chart").style.height = document.documentElement.clientHeight - 50 + "px";
				document.getElementById("kbnplratioChart").style.width = '100%';
				_this.$nextTick(() => {
					_this.chartDOM = _this.$echarts.init(document.getElementById("kbnplratioChart"), 'theme');
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
								name: "日不良率（上月对比值）",
								icon:"image://"+_this.jiantou
							},
							{
								name: "日不良率（实际）"
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
						name: "",
						// max: 200,
						// axisLine: {
						//   show: false
						// },
						axisTick: {
							//   show: false
							inside: true
						}
					}],
					series: [{
							name: "日不良率（上月对比值）",
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
							  ]
							}
						},
						{
							name: "日不良率（实际）",
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

					],
					// color: ["#4F81BD", "#C0504D", "#9BBB59"]
				};
			},
			getdate() {
				let _this = this;

				// this.chartDOM = this.$echarts.init(document.getElementById("kbnplratioChart"));
				// mui.alert('aa')
				var data = {
					// query: " tempwip_date BETWEEN '2019-02-01' AND '2019-03-01'",
					query: _this.kbpgrmd_query
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbnplratioget',
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
						let _index = 1;
						var tableline = {}
						let object = {};
						// _this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ctempbadtr_date = element.tempbadtr_date != '' ? element.tempbadtr_date : 0;
							let ctempbadtr_pal_bad = element.tempbadtr_pal_bad != '' ? element.tempbadtr_pal_bad : 0;
							let ctempbadtr_rel_bad = element.tempbadtr_rel_bad != '' ? element.tempbadtr_rel_bad : 0;
							let ct1_date = ctempbadtr_date.split('-')[2];
							ct1_date = ct1_date.substring(0, 2);
							_this.xAxisData.push(ct1_date);
							_this.xAxisData2.push(ct1_date);
							// _this.series.submitInspectPlanData.push(ctempbadtr_pal_bad)
							_this.top = ctempbadtr_pal_bad
							_this.series.submitInspectActualPerformceData.push(ctempbadtr_rel_bad)
							let amount = _index;
							_this.tableData[0][amount] = ctempbadtr_pal_bad
							_this.tableData[1][amount] = ctempbadtr_rel_bad
							_index++
						}
						console.log(_this.tableData)
						_this.news++
						_this.generateChart();
						// _this.Dtime = _this.kbpgrmd_get_time

						_this.cyclegetdate()
					},
					error: function() {
						_this.cyclegetdate()
					}
				})
			},
			cyclegetdate() {
				if (document.getElementById("kbnplratioTable") == null) {
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
			kbpgrmd_win_height:0
		},
		mounted() {
			this.chartHigh = this.kbpgrmd_win_height * 4.05*1.7
			this.win_height = 92 / 100 * this.kbpgrmd_win_height
			if (this.win_height > 92) {
				this.win_height = 92
			}

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

	#kbnplratioChart {
		border-radius: 15px;
		overflow: hidden;
	}

	#kbnplratioTable {
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
