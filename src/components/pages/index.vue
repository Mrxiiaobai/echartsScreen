<template>
	<el-container style="height: 100vh;">
		<div style="position:absolute;width: 4px;left: 22px;top: 18px;z-index: 10000;height: auto;" @click="openMenu"><i class="el-icon-s-operation" style="color: #fff;font-size: 18px;"></i></div>
		<el-scrollbar class="elwidth" style="height: calc(100% - 48px);z-index: 1001;margin-top: 48px;overflow-x: hidden;" >
			<!-- <el-aside width="2px"> -->
			<el-aside style="height:100%;" v-bind:style="{'width':isOpen ? '0':'200px'}">
				<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
				 background-color="#6c757d" text-color="#fff">
					<!-- <el-menu-item index="0"> -->
					<!-- <el-menu-item index="-1" @click="alertwidth">
            <div class="el-icon-s-operation"></div>
            <span slot="title">展开/关闭</span>
          </el-menu-item>-->
					<!-- 正式库使用的 -->
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-operation"></i>
							<span slot="title">菜单</span>
						</template>
						<el-menu-item-group v-for="(item, index) in cmenu" :key="index">
							<el-menu-item :index="index+''" @click="selectchart(index)">{{item.kbpgrm_name}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					<!-- 看板多级菜单测试阶段 -->
				</el-menu>
			</el-aside>
		</el-scrollbar>
		<el-container>
			<el-header style="text-align: center; font-size: 32px;">
				<span>{{etitle}}</span>
			</el-header>
			<el-main v-for="(item, index) in detailchartlist" :key="index" v-show="index == ifshow || ifshow == -1" v-if="isdetail">
				<div v-show="true" class="show" v-for="(citem, cindex) in item.detailScreen" :key="cindex">
					<div class="rateOfsubmitInspectAdvance" v-bind:style="{ width: citem.kbpgrmd_win_width +'%' , left: citem.kbpgrmd_magin_left-1 +'% !important', top: citem.kbpgrmd_magin_top +'% !important', zIndex: 100-citem.kbpgrmd_window_num +' !important'}">
						<div class="titlechart" @click="showAll(index,cindex)">
							<transition name="slide-fade">
								<component v-on:noaction="noaction" v-bind:is="citem.kbpgrmd_pgrm" :kbpgrmd_query="citem.kbpgrmd_query"
								 :kbpgrmd_get_time="citem.kbpgrmd_get_time" :kbpgrmd_refresh_time="citem.kbpgrmd_refresh_time"
								 :kbpgrmd_win_height="citem.kbpgrmd_win_height" :chartwidth="citem.kbpgrmd_win_width" :kbpgrmd_records="citem.kbpgrmd_records"></component>
							</transition>
							<!-- 2.1.5 -->
							<!-- <kbinspprcweb></kbinspprcweb> -->
							<!-- 2.1.7 -->
							<!-- <Kbchkpfmweb></Kbchkpfmweb> -->
							<!-- 2.1.8 -->
							<!-- <Kbwhpfmweb></Kbwhpfmweb> -->
							<!-- 2.3.1 -->
							<!-- <Kbgpproweb></Kbgpproweb> -->
							<!-- 3.1.1 -->
							<!-- <Kbnplratioweb></Kbnplratioweb> -->
							<!-- 5.2.1 -->
							<!-- <Kbungrwkweb></Kbungrwkweb> -->
							<!-- 2.1.2 -->
							<!-- <Kbminspqtyweb></Kbminspqtyweb> -->
							<!-- 2.1.6 -->
							<!-- <Kbinspachweb></Kbinspachweb> -->
							<!-- 2.2.1 -->
							<!-- <Kbempprdweb></Kbempprdweb> -->
							<!-- 4.1.1 -->
							<!-- <Kbqaineffccweb></Kbqaineffccweb> -->
							<!-- 4.2.1 -->
							<!-- <kbgpinefweb></kbgpinefweb> -->
							<!-- 3.2.1 -->
							<!-- <Kbbadtrendweb></Kbbadtrendweb> -->
							<!-- 2.1.10 -->
							<!-- 2.1.11 -->
							<!-- 2.1.1 -->
							<!-- <Kbdinspqtyweb></Kbdinspqtyweb> -->
							<!-- 2.1.3 暂时不显示 -->
							<!-- <Kbcfppdfcmweb></Kbcfppdfcmweb> -->
							<!-- 2.1.4 -->
							<!-- <Kbchkprodepaweb></Kbchkprodepaweb> -->
						</div>
					</div>
					<!-- <div class="rateOfProductProgress"> -->
					<!-- <rateOfProductProgress></rateOfProductProgress> -->
					<!-- </div> -->
				</div>
			</el-main>

			<transition name="slide-fade">
				<el-main v-if="!isdetail">
					<div class="goback" @click="goback()"><span class="backBtn">返回</span></div>
					<div v-show="true" class="show">
						<div class="showBig">
							<div class="titlechart">
								<component v-bind:is="allDetail.kbpgrmd_pgrm" :big="allDetail.kbpgrmd_query" :kbpgrmd_query="allDetail.kbpgrmd_query"
								 :kbpgrmd_get_time="allDetail.kbpgrmd_get_time" :kbpgrmd_refresh_time="allDetail.kbpgrmd_refresh_time"
								 :kbpgrmd_records="allDetail.kbpgrmd_records" :kbpgrmd_win_height="100" :ifShowTitle="true"></component>
								<!-- 2.1.5 -->
								<!-- <kbinspprcweb></kbinspprcweb> -->
								<!-- 2.1.7 -->
								<!-- <Kbchkpfmweb></Kbchkpfmweb> -->
								<!-- 2.1.8 -->
								<!-- <Kbwhpfmweb></Kbwhpfmweb> -->
								<!-- 2.3.1 -->
								<!-- <Kbgpproweb></Kbgpproweb> -->
								<!-- 3.1.1 -->
								<!-- <Kbnplratioweb></Kbnplratioweb> -->
								<!-- 5.2.1 -->
								<!-- <Kbungrwkweb></Kbungrwkweb> -->
								<!-- 2.1.2 -->
								<!-- <Kbminspqtyweb></Kbminspqtyweb> -->
								<!-- 2.1.6 -->
								<!-- <Kbinspachweb></Kbinspachweb> -->
								<!-- 2.2.1 -->
								<!-- <Kbempprdweb></Kbempprdweb> -->
								<!-- 4.1.1 -->
								<!-- <Kbqaineffccweb></Kbqaineffccweb> -->
								<!-- 4.2.1 -->
								<!-- <kbgpinefweb></kbgpinefweb> -->
								<!-- 3.2.1 -->
								<!-- <Kbbadtrendweb></Kbbadtrendweb> -->
								<!-- 2.1.10 -->
								<!-- 2.1.11 -->
								<!-- 2.1.1 -->
								<!-- <Kbdinspqtyweb></Kbdinspqtyweb> -->
								<!-- 2.1.3 暂时不显示 -->
								<!-- <Kbcfppdfcmweb></Kbcfppdfcmweb> -->
								<!-- 2.1.4 -->
								<!-- <Kbchkprodepaweb></Kbchkprodepaweb> -->
							</div>
						</div>
						<!-- <div class="rateOfProductProgress"> -->
						<!-- <rateOfProductProgress></rateOfProductProgress> -->
						<!-- </div> -->
					</div>
				</el-main>
			</transition>
		</el-container>
	</el-container>
</template>

<script>
	import mui from "../../assets/js/mui.min"
	export default {
		data() {
			return {
				isOpen:true,
				isCollapse: false,
				etitle: '电子看板',
				cmenu: [],
				who: 'Kbinspachweb',
				detailchart: [],
				detailchartlist: [],
				ifshow: -1,
				//是否轮询
				ifcycle: 1,
				big: 'aa',
				//是否显示
				isdetail: true,
				allDetail: {},
				ifshowall: true,
				cycleTime: 0,
				chartIndex: -1, //记录当前菜单位置
				ifcycleshow: ''
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			openMenu() {
				var _this = this
				if(_this.isOpen){
					// 是true的时候会开启菜单
					// document.getElementsByClassName('el-aside')[0].style.width = '200px'
					_this.isOpen = false
				}else{
					// false的时候会关闭菜单
					// document.getElementsByClassName('el-aside')[0].style.width = '0'
					_this.isOpen = true
				}
				// _this.isOpen = false
			},
			closeMenu(){
				var _this = this
				// document.getElementsByClassName('el-aside')[0].style.width = '0'
				// _this.isOpen = true
			},
			selectchart(index) {
				var _this = this
				
				// 大屏时可以更换菜单
				if(!_this.isdetail){
					_this.isdetail = !_this.isdetail
				}
				// 新增点击菜单
				// document.getElementsByClassName('el-aside')[0].style.width = '0'
				_this.isOpen = true
				
				
				_this.chartIndex = index
				console.log(_this.cmenu[index])
				_this.etitle = _this.cmenu[index].headline
				// _this.etitle = _this.cmenu[index].kbpgrm_name
				_this.detailchart = []
				_this.detailchartlist = []
				_this.ifshow = -1;
				_this.cycleTime = _this.cmenu[index].kbpgrm_screen_time
				for (let i = 0; i < _this.cmenu[index].kbpgrmd.length; i++) {
					const element = _this.cmenu[index].kbpgrmd[i];
					let cnum = _this.detailchart.indexOf(element.kbpgrmd_screen_num)
					if (_this.detailchart.indexOf(element.kbpgrmd_screen_num) == -1) {
						_this.detailchart.push(element.kbpgrmd_screen_num)
						_this.detailchartlist.push({
							//第几屏
							kbpgrmd_screen_num: element.kbpgrmd_screen_num,
							//屏幕内容和
							detailScreen: [{
								//第几窗体
								kbpgrmd_window_num: element.kbpgrmd_window_num,
								// 功能id
								kbpgrmd_pgrm: element.kbpgrmd_pgrm,
								// 窗体长度
								kbpgrmd_win_height: element.kbpgrmd_win_height,
								// 窗体宽度
								kbpgrmd_win_width: element.kbpgrmd_win_width,
								// 左距离
								kbpgrmd_magin_left: element.kbpgrmd_magin_left,
								// 上距离
								kbpgrmd_magin_top: element.kbpgrmd_magin_top,
								// 访问数据频率
								kbpgrmd_get_time: element.kbpgrmd_get_time,
								// 数据刷新频率
								kbpgrmd_refresh_time: element.kbpgrmd_refresh_time,
								// 查询数据条件
								kbpgrmd_query: element.kbpgrmd_query,
								// 数据展示条数
								kbpgrmd_records: element.kbpgrmd_records,
							}]
						})
					} else {
						console.log(element)
						_this.detailchartlist[cnum].detailScreen.push({
							//第几窗体
							kbpgrmd_window_num: element.kbpgrmd_window_num,
							// 功能id
							kbpgrmd_pgrm: element.kbpgrmd_pgrm,
							// 窗体长度
							kbpgrmd_win_height: element.kbpgrmd_win_height,
							// 窗体宽度
							kbpgrmd_win_width: element.kbpgrmd_win_width,
							// 左距离
							kbpgrmd_magin_left: element.kbpgrmd_magin_left,
							// 上距离
							kbpgrmd_magin_top: element.kbpgrmd_magin_top,
							// 访问数据频率
							kbpgrmd_get_time: element.kbpgrmd_get_time,
							// 数据刷新频率
							kbpgrmd_refresh_time: element.kbpgrmd_refresh_time,
							// 查询数据条件
							kbpgrmd_query: element.kbpgrmd_query,
							// 数据展示条数
							kbpgrmd_records: element.kbpgrmd_records,
						})
					}
				}
				console.log(_this.detailchartlist)
				_this.ifshow = -1;
				// if (_this.detailchartlist.length == 1) {
				//   return;
				// }
				// setTimeout(() => {
				if (_this.ifcycle == 1) {

					_this.cycleshow()
					_this.ifcycle = 0
				}
				// }, _this.detailchartlist[0].detailScreen[0].kbpgrmd_get_time * 50);

			},
			cycleshow() {
				console.log('循环');
				
				
				let _this = this;
				if (_this.ifshow == -1) {
					console.log('bb');
					setTimeout(() => {
						let showif = _this.ifshow + 1
						// if (showif == _this.detailchartlist.length) {
						//   _this.ifshow = 0
						// }
						_this.ifshow = 0
						_this.cycleshow()
					}, 1000);
				} else {
					console.log('cc');
					let showtime = _this.detailchartlist[0].detailScreen[0].kbpgrmd_get_time * 50
					_this.ifcycleshow = setTimeout(() => {
						let showif = _this.ifshow + 1
						if (showif == _this.detailchartlist.length) {
							_this.ifshow = 0
						} else {
							_this.ifshow++
						}
						_this.cycleshow()
					}, _this.cycleTime * 1000);
				}
				// if(document.getElementsByClassName('el-aside')[0].style.width == '200px'){
				// 	console.log('展开状态')
				// 	document.getElementsByClassName('el-aside')[0].style.width == '200px'
				// }
			},
			noaction() {
				this.ifshowall = false
				setTimeout(() => {
					this.ifshowall = true
				}, 100);
			},
			showAll(num1, num2) {
				if (this.ifshowall == false) {
					return
				}
				let _this = this
				// 菜单可以被点击中展开
				_this.isOpen=true
				_this.cycleTime = 2
				clearTimeout(_this.ifcycleshow);
				_this.cycleshow()
				_this.isdetail = !_this.isdetail
				// _this.ifshow = -2
				_this.allDetail = _this.detailchartlist[num1].detailScreen[num2]
				console.log(_this.allDetail)
			},
			goback() {
				let _this = this;
				// 菜单可以被点击
				_this.isOpen=true
				_this.ifshow = -1;
				_this.isdetail = !_this.isdetail
				setTimeout(() => {
					_this.cycleTime = _this.cmenu[_this.chartIndex].kbpgrm_screen_time
				}, 3000);
			}

		},

		created() {
			this.$router.replace({
				path: "/menu",
				query: {
					v: parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString()
				}
			});
			this.cmenu = JSON.parse(localStorage.getItem('menu'))
			console.log(JSON.parse(localStorage.getItem('menu')))
		},
		mounted(){
			// document.getElementsByClassName('el-aside')[0].style.width = '0'
			// this.isOpen = false
		}
	}
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 100vh;
	}

	.el-menu--collapse {
		height: 100vh;
	}

	.el-menu-vertical-demo[data-v-16ed10e8]:not(.el-menu--collapse) {
		width: 200px;
		min-height: 100vh;
	}

	.el-menu-item i {
		color: #ffffff;
	}

	.el-submenu__title i {
		color: #ffffff;
	}

	.el-submenu .el-menu-item {
		height: 50px;
		line-height: 50px;
		padding: 0 45px;
		min-width: 199px;
	}

	.el-main {
		background: rgba(10, 10, 10, 1);
	}

	.rateOfsubmitInspectAdvance {
		/* width: 84%; */
		overflow: hidden;
		position: fixed;
		/* left: 50px; */
		margin-left: -1%;
		top: 65px;
		z-index: 0;
	}

	.showBig {
		width: 100%;
		overflow: hidden;
		position: fixed;
		left: 0px;
		margin-left: 0%;
		top: 0px;
		min-height: 100vh;
		background: rgba(10, 10, 10, 1);
		z-index: 99;
	}

	.goback {
		width: 100%;
		height: 6vh;
		border-radius: 10px;
		overflow: hidden;
		position: fixed;
		left: 0px;
		margin-left: 0%;
		top: 0px;
		background: rgba(10, 10, 10, 1);
		font-size: 20px;
		font-weight: 500;
		color: #fff;
		z-index: 999;
	}

	.backBtn {
		position: absolute;
		width: 60px;
		height: 30px;
		background: #fff;
		color: #000000;
		font-size: 20px;
		right: 40px;
		top: 6px;
		text-align: center;
		border-radius: 2px;
		z-index: 999;
	}

	.titlechart {
		margin-top: 6vh;
		width: 98%;
		margin-left: 1%;
		padding: 5px;
		border-radius: 20px;
	}

	.rateOfProductProgress {
		width: 1600px;
		border-radius: 15px;
		overflow: hidden;
		position: fixed;
		left: 55%;
		top: 100px;
	}

	.el-header {
		background-color: rgba(10, 10, 10, 1);
		color: #fff;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}

	body {
		background-color: rgba(10, 10, 10, 1);
	}

	.slide-fade-enter-active {
		transition: all 0.6s ease;
	}

	.slide-fade-leave-active {
		transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter,
	.slide-fade-leave-to

	/* .slide-fade-leave-active for below version 2.1.8 */
		{
		transform: translateX(10px);
		opacity: 1;
	}
	
</style>
<style>
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
	
	/* .el-scrollbar__view{
		height: 100%;
	} */
	
	.el-menu-vertical-demo[data-v-c2ce7532]:not(.el-menu--collapse) {
		width: 200px;
		min-height: 100vh;
	}

	.el-menu {
		z-index: 1;
	}

	.el-main[data-v-c2ce7532] {
		background: rgba(10, 10, 10, 1);
	}

	.el-header[data-v-c2ce7532] {
		background-color: rgba(10, 10, 10, 1);
		color: #fff;
		line-height: 60px;
	}

	.el-table_1_column_1 {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-table_1_column_2 {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-table_1_column_3 {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-table__row {
		background-color: rgba(10, 10, 10, 1) !important;
	}

	.cell {
		/* background-color: rgba(10, 10, 10, 1); */
	}

	.el-table td,
	.el-table th.is-leaf {
		border-bottom: 1px solid rgba(10, 10, 10, 1);
	}

	.el-table {
		color: #cccccc !important;
	}

	.has-gutter {
		/* min-height: 2vh; */
		font-size: 18px;
		font-wight: 800;
	}

	.el-table th,
	.el-table tr {
		background-color: rgba(10, 10, 10, 1);
	}

	body {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-menu--vertical {
		max-height: 100vh;
	}

	.el-table thead.is-group th {
		background: rgba(10, 10, 10, 1);
	}

	.el-table,
	.el-table__expanded-cell {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-menu--vertical {
		position: absolute;
		top: -5px;
		left: 63px;
		z-index: 2004;
		max-height: 100vh;
		overflow-y: scroll;
	}

	.el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: rgba(10, 10, 10, 1);
	}

	.el-table td,
	.el-table th.is-leaf {
		border-bottom: 1px solid #7b7b7b;
	}

	.el-table--border td,
	.el-table--border th,
	.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
		border-right: 1px solid #7b7b7b !important;
	}

	.el-table--border::after,
	.el-table--group::after,
	.el-table::before {
		content: '';
		position: absolute;
		background-color: #7b7b7b;
		z-index: 1;
	}

	.el-table--border,
	.el-table--group {
		border: 1px solid #7b7b7b;
	}

	.el-table thead {
		color: #f1f1f1;
		font-weight: 500;
	}

	.el-table td,
	.el-table th {
		text-align: center;
	}

	/* .el-aside:hover {
		width: 200px !important;
	}

	.elwidth:hover {
		width: 200px !important;
	} */

	.el-scrollbar {
		/* padding-bottom: 50px; */
	}
</style>
