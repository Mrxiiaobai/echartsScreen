<template>
	<el-scrollbar style="height: 100%;">
		<div class="allcharts" v-bind:style="{height:win_height+'vh'}" style="position: relative;">
			<div class="likeButton">
				<span style="font-size:13px;">更新时间:</span>
				<span>{{lastRefreshTime}}</span>
			</div>
			<!-- <div class="Dtime">
				<span>{{Dtime}}</span>
      </div>-->
			<div class="gobackClick" @click="noaction2()">
				<div>点击筛选当前员工</div>
				<span>当前员工：{{nowEm}}</span>
			</div>
			<div class="goback3" style="position: relative;visibility: hidden;height: 60px;">
			</div>
			<div class="selectPart" @click="nofunction()" v-show="showselP">
				<div class="likeButten" @click="getPart(-1)">关闭</div>
				<div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
					<div>{{item.t1_emid}}</div>
				</div>
			</div>
			<div class="goback2" @click="noaction()">
				<span>图形</span>
				<el-switch class="showCharts" @change="alertHeight()" v-model="showCharts" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				<span>表格</span>
				<el-switch v-model="showTable" @change="alertHeight()" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>
			<div :id="chartid" v-show="showCharts"></div>
			<div id="kbempprdTable" v-show="showTable">
				<!-- <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px;font-size:1px;color:black"
        >-->
				<el-table :data="tableData" border style="width: 100%; margin-top: 20px;color:black;margin-bottom: 50px;">
					<!-- <el-table-column prop="id" label="日期" min-width="48%"></el-table-column> -->
					<!-- <el-table-column prop="name" label="上月" min-width="50%"></el-table-column> -->
					<el-table-column :prop="index" :label="xAxisData2[index]" min-width="50%" v-for="(item,index) in tableData[0]"></el-table-column>
				</el-table>
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	import zhuzi from "../../assets/zhuzi.png"
	import jiantou from "../../assets/jiantou.png"
	export default {
		data: function() {
			return {
				win_height: '',
				lastRefreshTime: '',
				// timeId:'',
				// Dtime:this.$props.kbpgrmd_get_time,
				tableData: [{
					0: '计划日产出',
				}, {
					0: '计划累产出',
				}, {
					0: '日产出数',
				}, {
					0: '累计产出数',
				}],
				news: 0,
				emlist: [],
				chartid: '',
				showselP: false,
				xPosition: 0,
				nowEm: '',
				peopleList: '',
				yPosition: 0,
				chartType: '',
				showCharts: true,
				showTable: false,
				chartHigh: '87%',
				chartWidth: '100%',
				zhuzi: zhuzi,
				jiantou: jiantou,
				top: '',
				max: '',
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
			kbpgrmd_win_height: 0,
		},
		methods: {
			alertHeight() {
				let _this = this
				if (_this.showTable) {
					_this.chartHigh = '85%'

				} else {
					_this.chartHigh = '85%'
				}
				_this.resizeHeight()
			},
			resizeHeight() {
				let _this = this
				document.getElementById(_this.chartid).style.height = this.chartHigh;
				document.getElementById(_this.chartid).style.width = this.chartWidth;
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
				document.getElementById(_this.chartid).style.height = this.chartHigh;
				document.getElementById(_this.chartid).style.width = this.chartWidth;
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
							name: "计划日产出",
							icon: "image://" + _this.jiantou
						}, {
							name: "计划累产出"
						}, {
							name: '日产出数',
							icon: "image://" + _this.zhuzi
						}, {
							name: '累计产出数'
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
							name: "万片",
							max: _this.max,

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
							name: "万片",
							// max: 200,

							// axisLine: {
							//   show: false
							// },
							axisTick: {
								//   show: false
								inside: true
							}
						}
					],
					series: [{
							name: "计划日产出",
							type: "line",
							data: [],

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
								data: [{
									yAxis: _this.top
								}, ]
							}
						},
						{
							name: "计划累产出",
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
									type: 'dotted',
									width: 2
								}
							}
						}, {
							name: "日产出数",
							type: "bar",
							barWidth: 10,
							data: _this.series.submitInspectRate,
							itemStyle: {
								//通常情况下：
								normal: {
									//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
									color: function(params) {
										if (params.data >= _this.top) {
											return '#41b883';
										} else {
											return '#FF8080'
										}
									}
								},
							},
							// yAxisIndex: 1,
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
							name: "累计产出数",
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
			getPart(num) {
				let _this = this
				setTimeout(() => {
					if (num == -1) {
						_this.showselP = false
						return
					}
					_this.nowEm = _this.emlist[num]['t1_emid']
					console.log(_this.nowEm)
					_this.showselP = false
					_this.selectPerson()
				}, 50);
			},
			selectPerson() {
				let _this = this;
				if (_this.nowEm == '') {
					_this.nowEm = _this.emlist[0]['t1_emid']
				}
				var data = {
					query: "t1_emid ilike'" + _this.nowEm +
						"' and t1_date>= to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd')  and t1_date <=to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd') +  interval '1 month' "
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbempprdget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						console.log(e)
						let result = JSON.parse(e.d)
						_this.lastRefreshTime = result.writetime;
						console.log(result)
						_this.chartName = result.title
						_this.xAxisData = [];
						_this.series.submitInspectPlanData = []
						_this.series.submitInspectActualPerformceData = []
						_this.series.submitInspectRate = []
						_this.series.ct1_count_rat = []
						console.log(_this.xAxisData)
						// _this.xAxisData.push(result.t1_date)
						let _index = 1;
						var tableline = {}
						let object = {};
						// _this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ct1_date = element.t1_date
							let ct1_empid = element.t1_empid
							let ct1_mchid = element.t1_mchid
							let ct1_plan_dayqty = element.t1_plan_dayqty
							let ct1_plan_countqty = element.t1_plan_countqty
							let ct1_day_prd = element.t1_day_prd
							let ct1_count_prd = element.t1_count_prd
							ct1_date = ct1_date.split('-')[2];
							ct1_date = ct1_date.substring(0, 2);
							_this.xAxisData.push(ct1_date);
							_this.xAxisData2.push(ct1_date);
							_this.series.submitInspectPlanData.push(ct1_plan_dayqty)
							// _this.top = ct1_plan_dayqty

							_this.series.submitInspectActualPerformceData.push(ct1_plan_countqty)
							_this.series.submitInspectRate.push(ct1_day_prd)
							_this.series.ct1_count_rat.push(ct1_count_prd)
							let amount = _index;
							_this.tableData[0][amount] = ct1_plan_dayqty
							_this.tableData[1][amount] = ct1_plan_countqty
							_this.tableData[2][amount] = ct1_day_prd
							_this.tableData[3][amount] = ct1_count_prd
							_index++
						}
						console.log(_this.tableData)
						let max1 = Math.max(..._this.series.submitInspectRate)
						let max2 = Math.max(..._this.series.submitInspectPlanData)
						let max3 = Math.max(..._this.series.ct1_count_rat)
						_this.top = max2
						if (max1 >= max2) {
							if (max1 >= max3) {
								_this.max = (max1) + 0.05
							} else {
								_this.max = (max3) + 0.05
							}
						} else if (max2 >= max3) {
							console.log('1111')
							_this.max = (max2) + 0.05
						} else {
							_this.max = (max3) + 0.05
						}
						_this.news++
						_this.generateChart();
					},
					error: function() {}
				})
			},
			getdate() {
				let _this = this;
				console.log(_this.nowEm + '');
				if (_this.nowEm == '') {
					_this.nowEm = _this.emlist[0]['t1_emid']
				}
				var data = {
					query: "t1_emid ilike'" + _this.nowEm +
						"' and t1_date>= to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd')  and t1_date <=to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd') +  interval '1 month' "
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbempprdget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						console.log(e)
						let result = JSON.parse(e.d)
						console.log(result)
						_this.lastRefreshTime = result.writetime;
						_this.chartName = result.title
						_this.xAxisData = [];
						_this.series.submitInspectPlanData = []
						_this.series.submitInspectActualPerformceData = []
						_this.series.submitInspectRate = []
						_this.series.ct1_count_rat = []
						console.log(_this.xAxisData)
						// _this.xAxisData.push(result.t1_date)
						let _index = 1;
						var tableline = {}
						let object = {};
						// _this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ct1_date = element.t1_date
							let ct1_empid = element.t1_empid
							let ct1_mchid = element.t1_mchid
							let ct1_plan_dayqty = element.t1_plan_dayqty
							let ct1_plan_countqty = element.t1_plan_countqty
							let ct1_day_prd = element.t1_day_prd
							let ct1_count_prd = element.t1_count_prd
							ct1_date = ct1_date.split('-')[2];
							ct1_date = ct1_date.substring(0, 2);
							_this.xAxisData.push(ct1_date);
							_this.xAxisData2.push(ct1_date);
							_this.series.submitInspectPlanData.push(ct1_plan_dayqty)
							// _this.top = ct1_plan_dayqty

							_this.series.submitInspectActualPerformceData.push(ct1_plan_countqty)
							_this.series.submitInspectRate.push(ct1_day_prd)
							_this.series.ct1_count_rat.push(ct1_count_prd)
							let amount = _index;
							_this.tableData[0][amount] = ct1_plan_dayqty
							_this.tableData[1][amount] = ct1_plan_countqty
							_this.tableData[2][amount] = ct1_day_prd
							_this.tableData[3][amount] = ct1_count_prd
							_index++
						}
						console.log(_this.tableData)
						let max1 = Math.max(..._this.series.submitInspectRate)
						let max2 = Math.max(..._this.series.submitInspectPlanData)
						let max3 = Math.max(..._this.series.ct1_count_rat)
						_this.top = max2
						
						if (max1 >= max2) {
							if (max1 >= max3) {
								_this.max = (max1) + 0.05
							} else {
								_this.max = (max3) + 0.05
							}
						} else if (max2 >= max3) {
							console.log('1111')
							_this.max = (max2) + 0.05
						} else {
							_this.max = (max3) + 0.05
						}
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
			getEmId() {
				let _this = this;
				_this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbempprdemidget',
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						console.log(e)
						let result = JSON.parse(e.d)
						console.log(result)
						_this.emlist = result.table1
						_this.getdate()
					},
					error: function() {
						// _this.cyclegetdate()
					}
				})
			},
			cyclegetdate() {
				// if (document.getElementById("kbempprdTable") == null) {
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
			console.log(this.kbpgrmd_win_height)
			// this.chartHigh = this.kbpgrmd_win_height-8+'%'
			this.win_height = 92 / 100 * this.kbpgrmd_win_height
			if (this.win_height > 92) {
				this.win_height = 92
			}
		},
		created() {
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

	#kbempprdTable {
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
		/* border-radius: 1px; */
		/* overflow: hidden; */
		position: relative;
		/* right: 0; */
		/* left: 70%; */
		/* margin-left: 0%; */
		/* top: 0px; */
		font-size: 20px;
		font-weight: 500;
		color: #fff;
		/* color: #7b7b7b; */
		text-align: right !important;
		padding-right: 100px;
		z-index: 999;
		background: #0a0a0a !important;
		height: auto;
		width: 380px;
		opacity: 1 !important;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	/* .goback3 div{
	position: absolute;
	width: 380px;
	height: 60px;
	font-size: 20px;
	right: 100px;
	top: 0;
}
.goback3 span{
	position: absolute;
	width:380px;
	height: 30px;
	font-size: 20px;
	right: 100px;
	bottom: 0;
	right: 0;
} */
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

	.gobackClick {
		position: absolute;
		right: 0;
		font-size: 20px;
		font-weight: 500;
		color: #fff;
		text-align: right !important;
		padding-right: 100px;
		z-index: 999;
		background: #0a0a0a !important;
		height: auto;
		width: 380px;
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
