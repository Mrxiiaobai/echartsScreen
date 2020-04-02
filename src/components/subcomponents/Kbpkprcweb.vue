<template>
	<div id="kbpkprcWeb">
		<div class="likeButton">
			<span style="font-size:13px;">更新时间:</span><span>{{lastRefreshTime}}</span>
		</div>
		
		<div class="choosePart" @click="nofunction()">
			<div class="likeBut" @click="noaction2()">
				<div>选择员工:{{nowEm}}</div>
			</div>
		</div>

		<div class="selectPart" @click="nofunction()" v-show="showselP">
			<div class="likeButten" @click="getPart(-1)">关闭</div>
			<div v-for="(item, index) in emlist" class="likeButten" @click="getPart(index)">
				<div>{{item}}</div>
			</div>
		</div>

		<span class="fixSpan">待配料 > 配料中 > 配料完成 > 包装中</span>
		<div class="fixDivSpan">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="fixDiv">
			色块说明:
			<span class="yellowSpan"></span>摩托车
			<span class="blueSpan"></span>柴油车
			<span class="greenSpan"></span>微型车
			<span class="redSpan"></span>急发货
		</div>
		<div class="firstPage">
			<div class="percentDiv">
				<div class="firstScreen" v-for="(value,key) in tableList">
					<div class="bigTd">
						<span>{{value.temppkprc_emp}} {{value.temppkprc_shifts}}</span>
						<div class="bigImage">
							<img :src="value.temppkprc_photo" alt>
						</div>
						<span>{{value.temppkprc_empstat}}</span>
					</div>
					<div class="tableOver">
						<div class="table">
							<!-- 行 -->
							<div v-for="(value,index) in tableList[key].temppkprc_wktinformation" class="tableTr">
								<!-- 列 -->
								<div class="topTd">
									<span :title="value.temppkprc_wktnbr">{{value.temppkprc_wktnbr}}</span>
									<span :title="value.temppkprc_desc1">{{value.temppkprc_desc1}}</span>
									<span :title="value.temppkprc_stop_rmks">{{value.temppkprc_stop_rmks}}</span>
								</div>
								<div class="botTd" v-show="(value.temppkprc_status=='P')">
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
								</div>
								<div class="botTd" v-show="(value.temppkprc_status=='R')">
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
								</div>
								<div class="botTd" v-show="(value.temppkprc_status=='I')">
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
								</div>
								<div class="botTd" v-show="(value.temppkprc_status=='K')">
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
									<span v-bind:class="Color+value.temppkprc_type" v-bind:style="{background:value.temppkprc_yn===true?'rgb(255,100,100)':''}"></span>
								</div>
							</div>
							<!-- <tr v-if="tableList[key].temppkprc_wktinformation.length<5?true:false" v-for="value in tab">
									<td></td>
              </tr>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	// import axios from "axios"
	export default {
		name: "kbpkprcWeb",
		data: function() {
			return {
				emlist: [],
				nowEm: "",
				lastRefreshTime: '',
				// Dtime:this.$props.kbpgrmd_get_time,
				num: false,
				showselP: false,
				timeId: '',
				tableList: [],
				tdList: [],
				res: {
					"data": []
				},
				arr: [],
				Color: "Color",
				page: 8,
				tab: '',
				size: 4,
			}

		},
		created() {},
		mounted() {
			if (this.size == 4) {
				this.page == 8;
			}
			if (this.size == 9) {
				this.page == 18;
			}
			clearInterval(this.timeId);

			this.getKbpkprcget();
		},
		methods: {
			getPart(num) {
				let _this = this
				clearInterval(_this.timeId);
				setTimeout(() => {
					if (num == -1) {
						_this.showselP = false
						_this.getKbpkprcget()
						return
					}
					_this.nowEm = _this.emlist[num]
					console.log(_this.nowEm)
					// _this.nowEmName = _this.emlist[num]
					_this.showselP = false
					_this.selectPerson()
				}, 50);
			},
			nofunction() {
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
			selectPerson() {
				let _this = this
				_this.tableList = [];
				_this.res.data.filter(item => {
					if (item.temppkprc_emp == _this.nowEm) {
						_this.tableList.push(item)
					}
					return _this.tableList;
				})
			},
			getScreen() {
				clearInterval(this.timeId);
				var _this = this;
				console.log(_this.kbpgrmd_refresh_time)
				let key = 4;
				if (_this.res.data.length > 4) {
					this.timeId = setInterval(function() {
						_this.tableList = _this.res.data.slice(key, _this.page);
						console.log(key, _this.page);
						key = key + 4;
						_this.page = _this.page + 4;
						if (key >= _this.res.data.length) {
							key = 0;
							_this.page = 4;
						}
					}, _this.kbpgrmd_refresh_time * 1000);
				}

			},

			getKbpkprcget() {
				let _this = this;
				var data = {
					query: _this.kbpgrmd_query
				};
				mui.ajax({
					type: "post",
					url: global.context.webUrl + '/Kbpkprcget',
					data: JSON.stringify(data),
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						console.log(e);
						let result = JSON.parse(e.d);
						console.log(result)
						_this.emlist = []
						_this.nowEm = ""
						_this.lastRefreshTime = result[0].writetime;
						// _this.tableList2 = result;
						_this.res.data = result;
						for (var i = 0; i < _this.res.data.length; i++) {
							_this.emlist.push(_this.res.data[i].temppkprc_emp)
							_this.res.data[i].temppkprc_wktinformation.forEach(item => {
								if (item.temppkprc_yn) {
									item.temppkprc_type = 4;
								} else {
									if (item.temppkprc_type == "摩托") {
										item.temppkprc_type = 1;
									} else if (item.temppkprc_type == "柴油") {
										item.temppkprc_type = 2;
									} else if (item.temppkprc_type == "汽油") {
										item.temppkprc_type = 3;
									}
								}
							})
							if (_this.res.data[i].temppkprc_wktinformation.length < 6) {
								console.log(_this.res.data[i].temppkprc_wktinformation.length);
								_this.tab = 5;
							}
						}
						console.log(_this.res.data);
						if (_this.res.data.length > 4) {
							_this.tableList = _this.res.data.slice(0, 4);
							_this.getScreen();
						} else {
							_this.tableList = _this.res.data;
						}
						// _this.Dtime = _this.kbpgrmd_get_time
						_this.cyclegetdate();
					},
					error: function() {
						_this.cyclegetdate()
					}
				})

			},
			cyclegetdate() {
				if (document.getElementById("kbpkprcWeb") == null) {
					return
				}
				if (this.kbpgrmd_get_time == undefined) {
					return
				}
				setTimeout(() => {
					this.page = 8;
					this.getKbpkprcget()
				}, this.kbpgrmd_get_time * 1000);
			}
		},
		props: {
			kbpgrmd_query: 0,
			kbpgrmd_get_time: 0,
			kbpgrmd_refresh_time: 0,
		},

	}
</script>

<style scoped>
	#kbpkprcWeb {
		padding: 0;
		margin: 0;
		margin-left: -20px;
		margin-top: 6vh;
		position: relative;
	}

	.tableOver {
		overflow: hidden;
		flex: 7.2;
		/* height: 184.8px; */
		height: 302px;
	}

	.percentDiv {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
		margin: 10px;
	}

	.firstScreen {
		width: 50%;
		/* height: 180px; */
		height: 302px;
		/* margin-bottom: 10px; */
		display: flex;
		flex-direction: row;

	}

	.bigTd {
		flex: 2.8;
		height: 302px;
		border: 1px solid #333;
		color: #ccc;
		font-size: 18px;
	}

	.bigTd span {
		display: block;
		/* line-height: 36px; */
		line-height: 50px;
		text-align: center;
	}

	img {
		width: 100%;
		/* height: 108px; */
		height: 192px;
	}

	.table {
		width: 100%;
		height: 100%;
		/* margin-left: -20px; */
		text-align: center;
		border: 1px solid #333;
		font-size: 18px;
	}

	.tableTr {
		border-top: 1px solid #333;
		color: #ccc;
		height: 50px;
	}

	.tableTr:first-of-type {
		border-top: none;
	}

	.tableTr:nth-of-type(5) {
		border-bottom: none;
	}

	/* tr{
	border-bottom: 1px solid #333;
} */

	.topTd {
		width: 100%;
		height: 28px;
		display: flex;
		flex-direction: row;
		padding-top: 3px;
	}

	.topTd span {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.topTd span:first-of-type {
		flex: 3;
		padding-left: 5px;
	}

	.topTd span:nth-of-type(2) {
		flex: 7;
		text-align: left;
		padding-left: 5px;
	}

	.topTd span:last-of-type {
		flex: 1.7;
	}

	.botTd {
		width: 100%;
		height: 22px;
		padding-top: 5px;
		padding-left: 2px;
		display: flex;
		flex-direction: row;
		line-height: 22px;
		border: none;
	}

	.botTd span {
		width: 25%;
		/* flex: 1; */
		/* border: 2px solid #1b2127; */
		background: #1b2127;
		/* opacity: 0.7; */
		height: 7px;
		margin-right: 4px;
	}

	.bigImage {
		width: 100%;
		/* height:108px; */
		height: 192px;
		padding-top: 5px;
	}

	.botTd span:last-of-type {
		margin-right: 0;
	}

	/* 摩托 */
	.botTd .Color1 {
		background: rgb(255, 255, 150);
	}

	/* 柴油 */
	.botTd .Color2 {
		background: rgb(150, 150, 255);
	}

	/* 微型 */
	.botTd .Color3 {
		background: rgb(150, 255, 150);
	}

	/* 急发货 */
	.botTd .Color4 {
		background: rgb(255, 100, 100);
	}

	.fixSpan {
		position: absolute;
		color: #ccc;
		top: -45px;
		right: 20px;
	}

	.fixDivSpan {
		position: absolute;
		width: 260px;
		height: 10px;
		top: -20px;
		right: 20px;
		display: flex;
		flex-direction: row;
	}

	.choosePart {
		position: absolute;
		width: 170px;
		height: 30px;
		top: -40px;
		right: 290px;
		flex-direction: row;
		border: 1px solid #dcdfe6;
		color: #fff;
		background-color: #909399;
		border-color: #909399;
		border-radius: 4px;
	}

	.likeBut {
		width: 170px;
		height: 30px;
		line-height: 20px;
		display: inline-block;
		border: 1px solid #dcdfe6;
		padding: 5px;
		text-align: center;
		white-space: nowrap;
		cursor: pointer;
		color: #fff;
		background-color: #909399;
		border-color: #909399;
		border-radius: 4px;
	}

	.fixDivSpan span {
		flex: 1;
		margin-right: 4px;
		background: rgb(255, 255, 150);
	}

	.fixDiv {
		position: absolute;
		color: #ccc;
		top: -30px;
		left: 20px;
	}

	.yellowSpan,
	.greenSpan,
	.blueSpan,
	.redSpan {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		margin-right: 5px;
	}

	.yellowSpan {
		background: rgb(255, 255, 150);
	}

	.greenSpan {
		background: rgb(150, 255, 150);
	}

	.blueSpan {
		background: rgb(150, 150, 255);
	}

	.redSpan {
		background: rgb(255, 100, 100);
	}
</style>
