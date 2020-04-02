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
			<div class="selectPart2" @click="nofunction()" style="left:30%!important;width:70%!important;top:-40px !important">
				<div style="display: inline-block;">
					<el-date-picker @change="select()" v-model="value7" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions2">
					</el-date-picker>
				</div>
				<div class="likeButten" @click="noaction()" style="width: 280px">
					<div>科室：{{nowEm}}</div>
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

			<div :id="chartid" class="chart1" ref="chart1"></div>
			<div class="showList"></span><span style="font-size: 14px;">安全量</span><span style="background: #CD5C5C;width: 25px;height: 13px;border-radius: 3px;"></span><span>总量</span><span
				 style="background: #66b3ff;width: 25px;height: 13px;border-radius: 3px;"></span></div>
			<div :id="chartid2" class="chart2" ref="chart2"></div>

		</div>
	</el-scrollbar>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	export default {
		data: function() {
			return {
				lastRefreshTime: '',
				// Dtime:this.$props.kbpgrmd_get_time,
				xPosition: 0,
				yPosition: 0,
				chartHigh: 700,

				cDate: '',
				eDate: '',
				chartid: '',
				chartid2: '',
				chartWidth: '100%',
				chartDOM: {},
				chartDOM2: {},
				// 饼图数据文字
				xdata: [],
				// 柱形图横坐标1
				xdata2: [],

				// 柱形图横坐标1对应数据
				ydata: [],
				// 柱形图横坐标2对应数据
				ydata2: [],
				// colorList: ['#66b3ff'],
				chartName: '',
				chartName2: '',
				chartOption: {},
				chartOption2: {},

				// 筛选参数
				tableList: [],
				value7: '',
				emlist: [],
				nowEm: "",
				queryData: '',
				queryTime: '',
				showselP: false,
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

			getPart(num) {
				let _this = this
				setTimeout(() => {
					if (num == -1) {
						_this.showselP = false
						_this.getDep()
						return
					}
					_this.nowEm = _this.emlist[num]
					_this.showselP = false
					_this.queryData = "tempkbworkrut_date = '" + _this.queryTime + "' and tempkbworkrut_dep ilike '" + _this.nowEm +
						"';tempkbworktype_date = '" + _this.queryTime + "' and tempkbworktype_dep ilike '" + _this.nowEm + "'"
					_this.getdate()
				}, 50);
			},

			select() {
				let _this = this
				_this.queryTime = _this.value7.getFullYear().toString() + '-' + (_this.value7.getMonth() + 1).toString() + '-' +
					_this.value7.getDate().toString()
				// "tempkbworkrut_date = '2019-12-17' and tempkbworkrut_dep ilike 'QA1';tempkbworktype_date = '2019-12-17' and tempkbworktype_dep ilike 'QA1'"
				_this.queryData = "tempkbworkrut_date = '" + _this.queryTime + "' and tempkbworkrut_dep ilike '" + _this.nowEm +
					"';tempkbworktype_date = '" + _this.queryTime + "' and tempkbworktype_dep ilike '" + _this.nowEm + "'"
				_this.getdate()
			},

			resizeHeight() {
				let _this = this
				// document.getElementById(_this.chartid).style.height = this.chartHigh + "px";
				// document.getElementById(_this.chartid).style.width = this.chartWidth + "px";
				// document.getElementById(_this.chartid2).style.height = this.chartHigh + "px";
				// document.getElementById(_this.chartid2).style.width = this.chartWidth + "px";
				_this.chartDOM.resize();
				_this.chartDOM2.resize();
			},


			generateChart() {
				let _this = this
				// document.getElementById(_this.chartid).style.height = this.chartHigh + "px";
				// document.getElementById(_this.chartid).style.width = this.chartWidth + "px";

				// document.getElementById(_this.chartid).style.width = '100%';
				_this.$nextTick(() => {
					_this.chartDOM = _this.$echarts.init(_this.$refs.chart1);
					_this.chartDOM2 = _this.$echarts.init(_this.$refs.chart2);

					_this.processDataOfChart();
					_this.processDataOfChart2();
					_this.chartDOM.setOption(_this.chartOption);
					_this.chartDOM2.setOption(_this.chartOption2);
					// _this.chartDOM2.off('click')
					// _this.chartDOM2.on('click',(params)=>{
					// 	console.log(params)
					// 	console.log(params.dataIndex)
					// 	event.stopPropagation()
					// 	// return false
					// })

				});

			},
			processDataOfChart() {
				let _this = this;

				_this.chartOption = {
					title: {
						// text: 'QA1科各工段在制品',
						text: _this.chartName,
						x: 'center',
						textStyle: {
							color: '#ccc'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					// legend: {
					// 	orient: 'vertical',
					// 	// left: 'center',
					// 	// data: _this.xdata,
					// 	textStyle: {
					// 		color: '#ccc'
					// 	}
					// },
					series: [{
						name: '比例',
						type: 'pie',
						radius: '70%',
						center: ['50%', '40%'],
						// data: [{
						// 		value: 0,
						// 		name: '前段'
						// 	},
						// 	{
						// 		value: 0,
						// 		name: '中段'
						// 	},
						// 	{
						// 		value: 0,
						// 		name: '后段'
						// 	},
						// ],
						data: _this.xdata,
						label: {
							normal: {
								show: true,
								position: 'inner'
							}
						},
						itemStyle: {
							normal: {
								label:{
									show:true,
									formatter:'{b} : {c} ({d}%)'
								},
								labelLine:{show:true}
							},
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
					color: ["#36648B", "#CD5C5C", "#ADADAD"]
				};
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
					// legend: {
					// 	data:['安全量', '总量'],
					// 		x: 'center', // 'center' | 'left' | {number},     
					// 		y: '5%', // 'center' | 'bottom' | {number}  
					// 		textStyle:{
					// 			color: "#ccc"
					// 		}
					// },
					xAxis: [{
						type: 'category',
						data: _this.xdata2,
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
						name: '单位(万片)',
						axisLine: {
							lineStyle: {
								color: '#ccc'
							}
						},
					}],
					series: [{
							name: '安全量',
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

							barWidth: '35%',
							data: _this.ydata2,
							color: '#CD5C5C'
							// color: '#36648B'
						},
						{
							name: '总量',
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
							// itemStyle: {
							// 	normal: {
							// 		color: function(params) {
							// 			var colorList = _this.colorList
							// 			return colorList[params.dataIndex]
							// 		}
							// 	}
							// },
							barWidth: '35%',
							data: _this.ydata,
							color: '#66b3ff',
							// color: '#36648B'
						}
					]
				};
			},
			getDep() {
				let _this = this;
				_this.value7 = new Date()
				var data = {
					query: ''
				}
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/kbworkrutgetsecget',
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
						let dep = result.table1
						dep.forEach(it => {
							_this.emlist.push(it.tempkbworkrut_dep)
						})
						_this.nowEm = _this.emlist[0]
						_this.queryTime = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' +
							new Date().getDate().toString()
						_this.queryData = "tempkbworkrut_date = '" + _this.queryTime + "' and tempkbworkrut_dep ilike '" + _this.nowEm +
							"';tempkbworktype_date = '" + _this.queryTime + "' and tempkbworktype_dep ilike '" + _this.nowEm + "'"
						_this.getdate()
					},
					error: function(e) {
						console.log(e)
					},
				})
			},
			getdate() {

				let _this = this;
				var data = {
					query: _this.queryData
					// query: " tempungrw_month BETWEEN '" + _this.cDate + "' AND '" + _this.eDate + "'",
					// query: "tempkbworkrut_date = '" + _this.value7.getFullYear()+ "' and tempkbworkrut_dep ilike '" +_this.nowEm +"';tempkbworktype_date = '" + _this.value7[0].getFullYear()+ "' and tempkbworktype_dep ilike '" +_this.nowEm"'"
					// query: "tempkbworkrut_date = '2019-12-17' and tempkbworkrut_dep ilike 'QA1';tempkbworktype_date = '2019-12-17' and tempkbworktype_dep ilike 'QA1'"
				};

				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/kbworkrutget',
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
						_this.lastRefreshTime = result.writetime
						// 饼状图数据
						let circleData = result.table2

						_this.chartName = result.title2
						_this.chartName2 = result.title
						_this.xdata = []
						console.log(circleData)
						for (let i = 0; i < circleData.length; i++) {
							let xobj = {}
							xobj.value = circleData[i].tempkbworktype_qty
							xobj.name = circleData[i].tempkbworktype_type
							_this.xdata.push(xobj)
						}
						console.log(_this.emlist)
						// _this.nowEm = _this.emlist[0]
						console.log(_this.xdata)

						// 柱形图数据
						let zData = result.table1

						// 柱形图X1轴数据
						_this.xdata2 = []
						for (let i = 0; i < zData.length; i++) {
							_this.xdata2.push(zData[i].tempkbworkrut_desc)
						}
						console.log(_this.xdata2)

						// 柱形图y轴数据1
						_this.ydata = []
						// _this.colorList = []
						for (let i = 0; i < zData.length; i++) {
							_this.ydata.push(zData[i].tempkbworkrut_qty)
							// _this.colorList.push('#66b3ff')
						}
						console.log(_this.ydata)

						// 柱形图y轴数据2
						_this.ydata2 = []
						for (let i = 0; i < zData.length; i++) {
							_this.ydata2.push(zData[i].tempkbworkrut_secu)
						}
						console.log(_this.ydata2)

						// for (var j = 0; j < _this.ydata.length; j++) {
						// 	if (_this.ydata[j] > _this.ydata2[j]) {
						// 		 _this.colorList[j] = "#41b883"
						// 	}
						// }


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
				// console.log(document.getElementById("Kbtwoecharts"))
				// if (document.getElementById("Kbtwoecharts") == null) {
				// 	return
				// }
				if (this.kbpgrmd_get_time == undefined) {
					return
				}
				setTimeout(() => {
					this.getDep()
				}, this.kbpgrmd_get_time * 1000);
			}
		},
		props: {
			kbpgrmd_query: 0,
			kbpgrmd_get_time: 0,
			kbpgrmd_refresh_time: 0,
		},
		mounted() {
			// this.generateChart();
		},
		created() {
			let _this = this //#endregion
			_this.cDate = new Date().getFullYear() + '01'
			_this.eDate = new Date().getFullYear() + '12'
			console.log(new Date().getMonth()+1)
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

	.chart1 {
		position: absolute;
		width: 30%;
		/* height: 500px; */
		height: 100%;
	}

	.chart2 {
		position: relative;
		/* margin-top: 3%; */
		width: 70%;
		left: 30%;
		height: 85%;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.allcharts {
		width: 100%;
		height: 100vh;
		padding-top: 3%;
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
	/* .el-scrollbar__wrap {
	  overflow: hidden !important;
	} */
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
