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
			<div class="selectPart2" @click="nofunction()" style="left:30%!important;width:70%!important;">
				<div class="likeButten" @click="noaction2()">
					<div>零件号{{nowEm}}</div>
					<span>{{nowPart}}</span>
				</div>
				<div class="likeButten" @click="getPart(-1)" style="background-color: #ff0000;width: 100px">
					<div>清除</div>
					<div>&nbsp;</div>
				</div>
			</div>
			<div class="selectPart" @click="nofunction()" v-show="showselP">
				<div class="likeButten" @click="getPart(-1)">
					<div>关闭</div>
					<div>&nbsp;</div>
				</div>
				<div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
					<div>{{item.tempprduc_partname}}</div>
					<div>{{item.tempprduc_partnum}}</div>
				</div>
			</div>
			<div class="goback2" @click="noaction()">
				<span>图形</span>
				<el-switch class="showCharts" v-model="showCharts" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				<span>表格</span>
				<el-switch v-model="showTable" @change="alertHeight()" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</div>
			<div :id="chartid" v-show="showCharts"></div>
			<div id="kbgpproTable" v-show="showTable">
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
	export default {
		data: function() {
			return {
				win_height: '',
				lastRefreshTime: '',
				// timeId:'',
				// Dtime:this.$props.kbpgrmd_get_time,
				tableData: [{
					0: "产量",
				}],
				news: 0,
				emlist: [],
				chartid: '',
				showselP: false,
				xPosition: 0,
				nowEm: '',
				nowPart: '',
				peopleList: '',
				yPosition: 0,
				chartType: '',
				showCharts: true,
				showTable: true,
				chartHigh: '70%',
				chartWidth: '100%',
				chartDOM: {},
				chartName: "2018年1月份自动间隙机     产量一览表",
				chartOption: {},
				dialogVisible: false,
				xAxisData: [],
				xAxisData2: ['日期'],
				series: {
					submitInspectPlanData: [],
					ct1_count_rat: []
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
					_this.chartHigh = '70%'

				} else(
					_this.chartHigh = '88%'
				)
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
						x2: 0,
					},
					legend: {
						data: [{
							name: "产量"
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
						name: "产量",
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
					}],
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
					_this.nowEm = _this.emlist[num]['tempprduc_partname']
					_this.nowPart = _this.emlist[num]['tempprduc_partnum']
					console.log(_this.nowEm)
					_this.showselP = false
					_this.selectPerson()
				}, 50);
			},
			selectPerson() {
				let _this = this;
				if (_this.nowEm == '') {
					_this.nowEm = _this.emlist[0]['tempprduc_partname']
					_this.nowPart = _this.emlist[0]['tempprduc_partnum']
				}
				var data = {
					query: _this.kbpgrmd_query + "and tempprduc_partname ilike'" + _this.nowEm + "'" + "and tempprduc_partnum ilike'" +
						_this.nowPart + "'"
					//tempprduc_partnum ilike 'xxx' query: "t1_emid ilike'" + _this.nowEm + "' and t1_date>= to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd')  and t1_date <=to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd') +  interval '1 month' "
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbgp12proget',
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
						console.log(_this.xAxisData)
						// _this.xAxisData.push(result.t1_date)
						let _index = 1;
						var tableline = {}
						let object = {};
						// _this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ctempprduc_mon = element.tempprduc_mon != '' ? element.tempprduc_mon : 0;
							let ctempprduc_qty = element.tempprduc_qty != '' ? element.tempprduc_qty : 0;
							let ctempprduc_year = element.tempprduc_year != '' ? element.tempprduc_year : 0;
							_this.xAxisData.push(ctempprduc_mon);
							_this.xAxisData2.push(ctempprduc_mon + '');
							_this.series.submitInspectPlanData.push(ctempprduc_qty)
							let amount = _index;
							_this.tableData[0][amount] = ctempprduc_qty
							_index++
						}
						console.log(_this.tableData)
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
					_this.nowEm = _this.emlist[0]['tempprduc_partname']
					_this.nowPart = _this.emlist[0]['tempprduc_partnum']
				}
				var data = {
					query: _this.kbpgrmd_query + "and tempprduc_partname ilike'" + _this.nowEm + "'" + "and tempprduc_partnum ilike'" +
						_this.nowPart + "'"
					// query: "t1_emid ilike'" + _this.nowEm + "' and t1_date>= to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd')  and t1_date <=to_date(extract(year from now())||'-'|| extract(month from now()) || '-'||'1' ,'yyyy-mm-dd') +  interval '1 month' "
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbgp12proget',
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
						console.log(_this.xAxisData)
						// _this.xAxisData.push(result.t1_date)
						let _index = 1;
						var tableline = {}
						let object = {};
						// _this.tableData = []
						for (let i = 0; i < result.table1.length; i++) {
							const element = result.table1[i];
							let ctempprduc_mon = element.tempprduc_mon != '' ? element.tempprduc_mon : 0;
							let ctempprduc_qty = element.tempprduc_qty != '' ? element.tempprduc_qty : 0;
							let ctempprduc_year = element.tempprduc_year != '' ? element.tempprduc_year : 0;
							_this.xAxisData.push(ctempprduc_mon);
							_this.xAxisData2.push(ctempprduc_mon + '');
							_this.series.submitInspectPlanData.push(ctempprduc_qty)
							let amount = _index;
							_this.tableData[0][amount] = ctempprduc_qty
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
			getEmId() {
				let _this = this;
				_this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbgp12propartnameget',
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
				// if (document.getElementById("kbgpproTable") == null) {
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
			this.win_height = 92 / 100 * this.kbpgrmd_win_height
			if (this.win_height > 92) {
				this.win_height = 92
			}
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

	#kbgpproTable {
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
