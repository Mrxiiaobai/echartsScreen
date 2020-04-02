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
			<div class="selectPart2" @click="nofunction()" style="left:30%!important;width:70%!important;top:-30px !important">
				<!-- <div style="display: inline-block;">
					<el-date-picker @change="select()" v-model="value7" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions2">
					</el-date-picker>
				</div> -->
				<div class="likeButten" @click="noaction()" style="width: 280px">
					<div>工序：{{nowEm}}</div>
				</div>
				<div class="likeButten" @click="noaction1()" style="width: 280px;margin-left: 10px;">
					<div>员工：{{nowPe}}</div>
				</div>
			</div>

			<div class="selectPart" @click="nofunction()" v-show="showselP">
				<div class="likeButten" @click="getPart(-1)">
					<div>关闭</div>
				</div>
				<div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
					<div>{{item}}</div>
					<!-- <div>{{item['d']}}</div> -->
				</div>
			</div>
			<div class="selectPart" @click="nofunction1()" v-show="showselP2">
				<div class="likeButten" @click="getPeo(-1)">
					<div>关闭</div>
				</div>
				<div v-for="(item, index) in peolist" class="likeButten" @click="getPeo(index)">
					<div>{{item}}</div>
					<!-- <div>{{item['d']}}</div> -->
				</div>
			</div>

			<div class="showList">
				<!-- <span style="font-size: 14px;">产量</span> -->
				<!-- <span style="background: #CD5C5C;width: 25px;height: 13px;border-radius: 3px;"></span> -->
				<!-- <span>总量</span> -->
				<!-- <span style="background: #66b3ff;width: 25px;height: 13px;border-radius: 3px;"></span> -->
			</div>
			<div :id="chartid2" class="chart2" ref="chart2"></div>

		</div>
	</el-scrollbar>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	export default {
		data: function() {
			return {
				// 高度可维护
				win_height: '',
				lastRefreshTime: '',
				// Dtime:this.$props.kbpgrmd_get_time,
				xPosition: 0,
				yPosition: 0,
				chartHigh: 400,
				page: 60,
				cDate: '',
				eDate: '',
				chartid2: '',
				chartWidth: '100%',
				chartDOM: {},
				timeId: '',
				chartDOM2: {},
				// 工序分类数组
				xallData: [],
				yallData: [],
				yallData1: [],
				// 柱形图横坐标1
				xdata: [],
				// 柱形图横坐标1对应数据
				ydata: [],
				// 柱形图横坐标2对应数据
				ydata2: [],
				colorList: ['#66b3ff'],
				chartName2: '',
				chartOption: {},
				chartOption2: {},

				// 筛选参数
				tableList: [],
				value7: '',
				numb:0,
				emlist: [],
				nowEm: "",
				nowPe: "",
				peolist:[],
				queryData: '',
				queryTime: '',
				showselP: false,
				showselP2:false,
				pickerOptions2: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			};
		},
		methods: {

			nofunction() {
				let _this = this;
				_this.$emit("noaction");
			},

			noaction() {
				let _this = this;
				_this.$emit("noaction");
				setTimeout(() => {
					_this.showselP = true
				}, 100);
			},
			nofunction1(){
				let _this = this;
				_this.$emit("noaction");
			},
			noaction1(){
				let _this = this;
				_this.$emit("noaction");
				setTimeout(() => {
					_this.showselP2 = true
				}, 100);
			},
			getPeo(num){
				let _this = this
				setTimeout(() => {
					if (num == -1) {
						_this.showselP2 = false
						_this.getdate()
						return
					}
					_this.nowPe = _this.peolist[num]
					_this.xdata = []
					_this.ydata = []
					_this.ydata2 = []
					_this.xdata.push(_this.xallData[_this.numb][num])
					_this.ydata.push(_this.yallData[_this.numb][num]) 
					_this.ydata2.push(_this.yallData1[_this.numb][num]) 
					console.log(_this.xdata,_this.ydata,_this.ydata2)
					_this.generateChart()
					_this.showselP2 = false
				}, 50);
			},
			getPart(num) {
				let _this = this
				setTimeout(() => {
					if (num == -1) {
						_this.showselP = false
						_this.getdate()
						return
					}
					_this.nowEm = _this.emlist[num]
					_this.peolist = _this.xallData[num]
					_this.nowPe = _this.peolist[0]
					_this.numb = num
					console.log(_this.xallData[num])
					console.log(_this.yallData[num])
					console.log(_this.yallData1[num])
					_this.xdata = _this.xallData[num].slice(0,30)
					_this.ydata = _this.yallData[num].slice(0,30)
					_this.ydata2 = _this.yallData1[num].slice(0,30)
					_this.chartName2 = `${_this.cDate}年${_this.eDate}月份${_this.nowEm}员工累计实绩效率推移`
					_this.generateChart()
					_this.showselP = false
					// _this.queryData = "tempkbworkrut_date = '" + _this.queryTime + "' and tempkbworkrut_dep ilike '" + _this.nowEm +
					// 	"';tempkbworktype_date = '" + _this.queryTime + "' and tempkbworktype_dep ilike '" + _this.nowEm + "'"
					// _this.getdate()
				}, 50);
			},

			// select() {
			// 	let _this = this
			// 	_this.queryTime = _this.value7.getFullYear().toString() + '-' + (_this.value7.getMonth() + 1).toString() + '-' +
			// 		_this.value7.getDate().toString()
			// 	// "tempkbworkrut_date = '2019-12-17' and tempkbworkrut_dep ilike 'QA1';tempkbworktype_date = '2019-12-17' and tempkbworktype_dep ilike 'QA1'"
			// 	_this.queryData = "tempkbworkrut_date = '" + _this.queryTime + "' and tempkbworkrut_dep ilike '" + _this.nowEm +
			// 		"';tempkbworktype_date = '" + _this.queryTime + "' and tempkbworktype_dep ilike '" + _this.nowEm + "'"
			// 	_this.getdate()
			// },

			resizeHeight() {
				let _this = this
				_this.chartDOM2.resize();
			},


			generateChart() {
				let _this = this
				_this.$nextTick(() => {
					_this.chartDOM2 = _this.$echarts.init(_this.$refs.chart2);
					_this.processDataOfChart2();
					_this.chartDOM2.setOption(_this.chartOption2);

				});

			},
			processDataOfChart2() {
				let _this = this;
				_this.chartOption2 = {
					title: {
						text: _this.chartName2,
						textStyle: {
							// fontWeight: "normal",
							color: "#ccc",
							// fontSize: 14
						},
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					color: ['#CD5C5C', '#66b3ff'],
					legend: {
						data: ['产量', '效率'],
						x: 'center', // 'center' | 'left' | {number},     
						y: '5%', // 'center' | 'bottom' | {number}  
						textStyle: {
							color: "#ccc"
						}
					},
					xAxis: [{
						type: 'category',
						data: _this.xdata,
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: '#ccc'
							}
						},
						axisLabel: {
							interval: 0,
							rotate: 30
						}
					}],
					yAxis: [{
							type: 'value',
							name: '效率',
							axisLine: {
								lineStyle: {
									color: '#ccc'
								}
							},
							min:0,
							max:100,
							scale: true,
							axisLabel: {
								formatter: '{value}%'
							},
							splitLine:{show: false},
						},
						{
							type: 'value',
							name: '单位(万片)',
							scale: true,
							axisLine: {
								lineStyle: {
									color: '#ccc'
								}
							},
							splitLine:{show: false},
						}
					],
					series: [{
							name: '产量',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'top',
									textStyle: {
										color: '#ccc'
									}
								}
							},
							yAxisIndex:1,
							barWidth: 10,
							data: _this.ydata2,
							color: '#CD5C5C'
							// color: '#36648B'
						},
						{
							name: '效率',
							data: _this.ydata,
							// data: [3,46,56,78,90,90,98,97,82,54,56],
							type: 'line',
							color: 'SkyBlue',
							yAxisIndex:1,
							// 设置小圆点消失
							// 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
							// symbol: 'none',
							// 设置折线弧度，取值：0-1之间
							smooth: 0,
						},
						// {
						// 	name: '总量',
						// 	type: 'bar',
						// 	label: {
						// 		normal: {
						// 			show: true,
						// 			position: 'top',
						// 			textStyle: {
						// 				color: '#ccc'
						// 			}
						// 		}
						// 	},
						// 	itemStyle: {
						// 		normal: {
						// 			color: function(params) {
						// 				var colorList = _this.colorList
						// 				return colorList[params.dataIndex]
						// 			}
						// 		}
						// 	},
						// 	barWidth: '35%',
						// 	data: _this.ydata,
						// 	color: '#66b3ff'
						// 	// color: '#36648B'
						// }
					]
				};
			},
			getDep() {
				let _this = this;
				var data = {
					query: ''
				}
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbempkbefficopempgetopget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						let result = JSON.parse(e.d)
						console.log(result)
						_this.emlist = []
						result.table1.forEach(item => {
							_this.emlist.push(item.tempkbefficopemp_opall)
						})
						_this.nowEm = _this.emlist[0]
						_this.getdate()
					},
					error: function(e) {
						console.log(e)
					},
				})
			},
			getScreen(len) {
				var _this = this
				clearInterval(_this.timeId)
				if (len > 1) {
					let key = 30;
					_this.page =60
					let i = 0;
					_this.timeId = setInterval(function() {
						console.log('开始定时')
						console.log(i)
						if (i <= len - 1) {
							if (_this.xallData[i].length > 30) {
								if (_this.page >= _this.xallData[i].length) {
									_this.xdata = _this.xallData[i].slice(key, _this.page);
									_this.ydata = _this.yallData[i].slice(key, _this.page);
									_this.ydata2 = _this.yallData1[i].slice(key,_this.page);
									_this.generateChart();
									i = i + 1;
									// 1
									key = 0;
									_this.page = 30;
									// 0,30
									// 0,30
									console.log(key, _this.page);
								} else {
									_this.xdata = _this.xallData[i].slice(key, _this.page);
									_this.ydata = _this.yallData[i].slice(key, _this.page);
									_this.ydata2 = _this.yallData1[i].slice(key, _this.page);
									_this.generateChart();
									key = key + 30;
									_this.page = _this.page + 30;
									// 30,60
									// 30,60
									console.log(key, _this.page);
								}
							} else {
								key = 0;
								_this.page = 30;
								_this.xdata = _this.xallData[i].slice(0,_this.page);
								_this.ydata = _this.yallData[i].slice(0,_this.page);
								_this.ydata2 = _this.yallData1[i].slice(0,_this.page);
								i = i + 1;
								_this.generateChart();
								console.log(key, _this.page);
							}
						} else {
							if (_this.xallData.length > 1) {
								if (_this.xallData[0].length > 30) {
									_this.xdata = _this.xallData[0].slice(0, 30);
									_this.ydata = _this.yallData[0].slice(0, 30);
									_this.ydata2 = _this.yallData1[0].slice(0, 30);
									_this.generateChart();
									// _this.getScreen(_this.xallData.length);
									i=0
									key = 30;
									_this.page = 60;
								} else {
									_this.xdata = _this.xallData[0]
									_this.ydata = _this.yallData[0]
									_this.ydata2 = _this.yallData1[0]
									_this.generateChart();
									i=0
									key = 30;
									_this.page = 60;
									// _this.getScreen(_this.xallData.length);
								}
							} else {
								if (_this.xallData[0].length > 30) {
									_this.xdata = _this.xallData[0].slice(0, 30);
									_this.ydata = _this.yallData[0].slice(0, 30);
									_this.ydata2 = _this.yallData1[0].slice(0, 30);
									_this.generateChart();
									_this.getScreen(1);
								} else {
									_this.xdata = _this.xallData[0]
									_this.ydata = _this.yallData[0]
									_this.ydata2 = _this.yallData1[0]
									_this.generateChart();
								}
							}
						}
					}, _this.kbpgrmd_refresh_time * 1000)
				} else {
					let key = 30;
					if (_this.xallData[0].length > 30) {
						_this.timeId = setInterval(function() {
							if (_this.page >= _this.xallData[0].length) {
								_this.xdata = _this.xallData[0].slice(key,_this.page);
								_this.ydata = _this.yallData[0].slice(key,_this.page);
								_this.ydata2 = _this.yallData1[0].slice(key,_this.page);
								key = 0;
								_this.page = 30;
							} else {
								_this.xdata = _this.xallData[0].slice(key, _this.page);
								_this.ydata = _this.yallData[0].slice(key, _this.page);
								_this.ydata2 = _this.yallData1[0].slice(key, _this.page);
								key = key + 30;
								_this.page = _this.page + 30;
							}
							_this.generateChart();
						}, _this.kbpgrmd_refresh_time * 1000);
					}
				}
			},
			getdate() {
				let _this = this;
				_this.queryData = ''
				var data = {
					query: _this.queryData
					// query: " tempungrw_month BETWEEN '" + _this.cDate + "' AND '" + _this.eDate + "'",
					// query: "tempkbworkrut_date = '" + _this.value7.getFullYear()+ "' and tempkbworkrut_dep ilike '" +_this.nowEm +"';tempkbworktype_date = '" + _this.value7[0].getFullYear()+ "' and tempkbworktype_dep ilike '" +_this.nowEm"'"
					// query: "tempkbworkrut_date = '2019-12-17' and tempkbworkrut_dep ilike 'QA1';tempkbworktype_date = '2019-12-17' and tempkbworktype_dep ilike 'QA1'"
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbempkbefficopempget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						let result = JSON.parse(e.d)
						console.log(result)
						_this.lastRefreshTime = result.writetime
						_this.chartName2 = `${_this.cDate}年${_this.eDate}月份${_this.nowEm}员工累计实绩效率推移`
						// _this.chartName2 = ``${_this.cDate}`年3`${_this.eDate}`月份`${_this.nowEm}`员工累计实绩效率推移`

						// 柱形图数据
						let zData = result.table1
						for (let i = 0; i < _this.emlist.length; i++) {
							_this.xallData[i] = []
							_this.yallData[i] = []
							_this.yallData1[i] = []
						}
						
						_this.peolist = []
						// for (let j = 0; j < zData.length; j++) {
						// 	_this.peolist.push(zData[j].tempkbefficopemp_name)
						// }
						// _this.nowPe = _this.peolist[0]
						
						for (let i = 0; i < _this.emlist.length; i++) {
							for (let j = 0; j < zData.length; j++) {
								if (zData[j].tempkbefficopemp_opall == _this.emlist[i]) {
									_this.xallData[i].push(zData[j].tempkbefficopemp_name)
									_this.yallData[i].push(zData[j].tempkbefficopemp_effic)
									_this.yallData1[i].push(zData[j].tempkbefficopemp_qty)
								}
							}
						}
						
						_this.peolist = _this.xallData[0]
						_this.nowPe = _this.peolist[0]
						
						console.log(_this.xallData)
						console.log(_this.yallData)
						console.log(_this.yallData1)

						// 柱形图X1轴数据
						// zData.forEach(item => {
						// 	_this.xallData.push(item.tempkbefficopemp_name)
						// })
						_this.xdata = _this.xallData[0]

						// 柱形图y轴数据1
						// _this.yallData = []
						// zData.forEach(item => {
						// 	_this.yallData.push(item.tempkbefficopemp_effic)
						// })
						_this.ydata = _this.yallData[0]

						// 柱形图y轴数据2
						// _this.yallData1 = []
						// zData.forEach(item => {
						// 	_this.yallData1.push(item.tempkbefficopemp_qty)
						// })
						_this.ydata2 = _this.yallData1[0]

						// 分割滚屏
						if (_this.xallData.length > 1) {
							if (_this.xallData[0].length > 30) {
								_this.xdata = _this.xallData[0].slice(0, 30);
								_this.ydata = _this.yallData[0].slice(0, 30);
								_this.ydata2 = _this.yallData1[0].slice(0, 30);
								_this.generateChart();
								_this.getScreen(_this.xallData.length);
							} else {
								_this.xdata = _this.xallData[0]
								_this.ydata = _this.yallData[0]
								_this.ydata2 = _this.yallData1[0]
								_this.generateChart();
								_this.getScreen(_this.xallData.length);
							}
						} else {
							if (_this.xallData[0].length > 30) {
								_this.xdata = _this.xallData[0].slice(0, 30);
								_this.ydata = _this.yallData[0].slice(0, 30);
								_this.ydata2 = _this.yallData1[0].slice(0, 30);
								_this.generateChart();
								_this.getScreen(1);
							} else {
								_this.xdata = _this.xallData[0]
								_this.ydata = _this.yallData[0]
								_this.ydata2 = _this.yallData1[0]
								_this.generateChart();
							}
						}
						// _this.generateChart();
						// _this.Dtime = _this.kbpgrmd_get_time
						_this.cyclegetdate()
					},
					error: function() {
						_this.cyclegetdate()
					}
				})
			},
			cyclegetdate() {
				// console.log(document.getElementById("Kbtwoecharts"))
				// if (document.getElementById("Kbtwoecharts") == null) {
				// 	return
				// }
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
			kbpgrmd_win_height: 0
		},
		mounted() {
			this.win_height = 87 / 100 * this.kbpgrmd_win_height
			// this.generateChart();
		},
		created() {
			let _this = this //#endregion
			_this.cDate = new Date().getFullYear()
			_this.eDate = new Date().getMonth()+1
			console.log(_this.cDate,_this.eDate)
			// _this.getdate()
			_this.getDep()
			_this.chartid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
		},
	};
</script>
<style scoped>
	#buttonGroup {
		float: right;
		margin-right: 180px;
	}

	.el-scrollbar__wrap:-webkit-scrollbar {
		display: none;
	}

	#kbungrwkChart {
		border-radius: 15px;
		overflow: hidden;
	}

	#kbungrwkTable {
		width: 100%;
	}

	/* .chart1 {
		position: absolute;
		width: 30%;
		height: 100%;
	} */

	.chart2 {
		position: relative;
		/* margin-top: 3%; */
		width: 100%;
		left: 0;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.allcharts {
		width: 100%;
		height: 87vh;
		padding-top: 3%;
		position: relative;
	}

	.showList {
		position: absolute;
		left: 60%;
		top: 10%;
		color: #ccc;
	}

	.showList span {
		display: inline-block;
		margin-right: 5px;
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
