<template>
	<div class="auth-wrapper">
		<div class="auth-content">
			<div class="auth-bg">
				<span class="r"></span>
				<span class="r s"></span>
				<span class="r s"></span>
				<span class="r"></span>
			</div>
			<div class="card">
				<div class="card-body text-center">
					<div class="mb-4">
						<i class="mui-icon mui-icon-locked micon"></i>
					</div>
					<h3 class="mb-4">电子看板</h3>
					<div class="input-group mb-3">
						<input type="email" class="form-control" v-model.trim="username" placeholder="用户名">
					</div>
					<div class="input-group mb-4">
						<input type="password" class="form-control" ref="pasRef" @keyup.enter="clickLoginButton" v-model.trim="password" placeholder="密码">
					</div>
					<button class="btn btn-primary shadow-2 mb-4" @click="clickLoginButton" :disabled="disabled">{{loginStatus}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mui from "../../assets/js/mui.min";
	import app from "../../assets/js/app";

	export default {
		name: "login",
		data: function() {
			return {
				preventKeyUp:'',
				detail: {
					sessionid: "",
					userid: "",
					corp: "",
					domain: "",
					domains: []
				},
				//  username: "lynn",
				// password: "1",
				username: "",
				password: "",
				loginStatus: "登陆",
				seesionID: '',
				vmenu: '',
				disabled: false,
				kbpgrmd_exec: [],
				menu: [],
				// menu: [
				// 	{
				// 		//程序id
				// 		kbpgrmd_exec: '1',
				// 		//程序名字
				// 		kbpgrm_name: '单页测试',
				// 		//大屏轮询间隔
				// 		kbpgrm_screen_time: '0',
				// 		//程序
				// 		kbpgrmd: [
				// 			{
				// 				//第几屏
				// 				kbpgrmd_screen_num: '1',
				// 				//第几窗体
				// 				kbpgrmd_window_num: '1',
				// 				// 功能id
				// 				kbpgrmd_pgrm: 'Kbtwoecharts',
								//  <!-- 2.1.5 -->
								//   <!-- <kbinspprcweb></kbinspprcweb> -->
								//   <!-- 2.1.7 -->
								//   <!-- <Kbchkpfmweb></Kbchkpfmweb> -->
								//   <!-- 2.1.8  -->
								//   <!-- <Kbwhpfmweb></Kbwhpfmweb> -->
								//   <!-- 2.3.1  -->
								//   <!-- <Kbgpproweb></Kbgpproweb> -->
								//   <!-- 3.1.1   -->
								//   <!-- <Kbnplratioweb></Kbnplratioweb> -->
								//   <!-- 5.2.1   -->
								//   <!-- <Kbungrwkweb></Kbungrwkweb> -->
								//   <!-- 2.1.2  -->
								//   <!-- <Kbminspqtyweb></Kbminspqtyweb> -->
								//   <!-- 2.1.6 -->
								//   <!-- <Kbinspachweb></Kbinspachweb> -->
								//   <!-- 2.2.1 -->
								//   <!-- <Kbempprdweb></Kbempprdweb> -->
								//   <!-- 4.1.1 -->
								//   <!-- <Kbqaineffccweb></Kbqaineffccweb> -->
								//   <!-- 4.2.1 -->
								//   <!-- <kbgpinefweb></kbgpinefweb> -->
								//   <!-- 3.2.1 --> 
								//   <!-- <Kbbadtrendweb></Kbbadtrendweb> -->
								//   <!-- 2.1.10 -->
								//<!-- <Kbmchprdweb></Kbmchprdweb> -->
								//   <!-- 2.1.11 -->
								//   <!-- 2.1.1    -->
								//   <!-- <Kbdinspqtyweb></Kbdinspqtyweb> -->
								//   <!-- 2.1.3 不要了-->
								//   <!-- <Kbcfppdfcmweb></Kbcfppdfcmweb> -->
								//   <!-- 2.1.4 完成-->
								//   <!-- <Kbchkprodepaweb></Kbchkprodepaweb> -->
								//   <!-- 2.1.9 完成-->
								//   <!-- <Kbinspsumweb></Kbinspsumweb> -->
								//   <!-- 2.2.2 需求待确认-->
								//   <!-- <Kbpkstprdweb></Kbpkstprdweb> -->
								//5.1.1在和客户确认
								// <Kbworkproweb></Kbworkproweb>
								//5.1.2  完成
								// <Kburgdlvweb></Kburgdlvweb>
								//5。2.2 完成
								// <Kbpksemiweb></Kbpksemiweb>
								//5.2.3 
								// <Kbpkprcweb></Kbpkprcweb>
								// 窗体长度
							// 	kbpgrmd_win_height: '100',
							// 	// 窗体宽度
							// 	kbpgrmd_win_width: '100',
							// 	// 左距离
							// 	kbpgrmd_magin_left: '0',
							// 	// 上距离
							// 	kbpgrmd_magin_top: '0',
							// 	// 访问数据频率
							// 	kbpgrmd_get_time: '100',
							// 	// 数据刷新频率
							// 	kbpgrmd_refresh_time: '20',
							// 	// 查询数据条件
							// 	kbpgrmd_query: '',
							// 	// 数据展示条数
							// 	kbpgrmd_records: '20',
							// },
							// {
							//       //第几屏
							//       kbpgrmd_screen_num: '1',
							//       //第几窗体
							//       kbpgrmd_window_num: '2',
							//       // 功能id
							//       kbpgrmd_pgrm: 'Kbworkproweb',
							//       // 窗体长度
							//       kbpgrmd_win_height: '100',
							//       // 窗体宽度
							//       kbpgrmd_win_width: '40',
							//       // 左距离
							//       kbpgrmd_magin_left: '52',
							//       // 上距离
							//       kbpgrmd_magin_top: '8',
							//       // 访问数据频率
							//       kbpgrmd_get_time: '100',
							//       // 数据刷新频率
							//       kbpgrmd_refresh_time: '0',
							//       // 查询数据条件
							//       kbpgrmd_query: '',
							//     },
					// 	],
					// },
			// 		{
			// 			//程序id
			// 			kbpgrmd_exec: '1',
			// 			//程序名字
			// 			kbpgrm_name: '单页测试2',
			// 			//大屏轮询间隔
			// 			kbpgrm_screen_time: '0',
			// 			//程序
			// 			kbpgrmd: [{
			// 					//第几屏
			// 					kbpgrmd_screen_num: '1',
			// 					//第几窗体
			// 					kbpgrmd_window_num: '1',
			// 					// 功能id
			// 					kbpgrmd_pgrm: 'Kbinventoryexamine',
			// 					//  <!-- 2.1.5 -->
			// 					//   <!-- <kbinspprcweb></kbinspprcweb> -->
			// 					//   <!-- 2.1.7 -->
			// 					//   <!-- <Kbchkpfmweb></Kbchkpfmweb> -->
			// 					//   <!-- 2.1.8  -->
			// 					//   <!-- <Kbwhpfmweb></Kbwhpfmweb> -->
			// 					//   <!-- 2.3.1  -->
			// 					//   <!-- <Kbgpproweb></Kbgpproweb> -->
			// 					//   <!-- 3.1.1   -->
			// 					//   <!-- <Kbnplratioweb></Kbnplratioweb> -->
			// 					//   <!-- 5.2.1   -->
			// 					//   <!-- <Kbungrwkweb></Kbungrwkweb> -->
			// 					//   <!-- 2.1.2  -->
			// 					//   <!-- <Kbminspqtyweb></Kbminspqtyweb> -->
			// 					//   <!-- 2.1.6 -->
			// 					//   <!-- <Kbinspachweb></Kbinspachweb> -->
			// 					//   <!-- 2.2.1 -->
			// 					//   <!-- <Kbempprdweb></Kbempprdweb> -->
			// 					//   <!-- 4.1.1 -->
			// 					//   <!-- <Kbqaineffccweb></Kbqaineffccweb> -->
			// 					//   <!-- 4.2.1 -->
			// 					//   <!-- <kbgpinefweb></kbgpinefweb> -->
			// 					//   <!-- 3.2.1 --> 
			// 					//   <!-- <Kbbadtrendweb></Kbbadtrendweb> -->
			// 					//   <!-- 2.1.10 -->
			// 					//<!-- <Kbmchprdweb></Kbmchprdweb> -->
			// 					//   <!-- 2.1.11 -->
			// 					//   <!-- 2.1.1    -->
			// 					//   <!-- <Kbdinspqtyweb></Kbdinspqtyweb> -->
			// 					//   <!-- 2.1.3 不要了-->
			// 					//   <!-- <Kbcfppdfcmweb></Kbcfppdfcmweb> -->
			// 					//   <!-- 2.1.4 完成-->
			// 					//   <!-- <Kbchkprodepaweb></Kbchkprodepaweb> -->
			// 					//   <!-- 2.1.9 完成-->
			// 					//   <!-- <Kbinspsumweb></Kbinspsumweb> -->
			// 					//   <!-- 2.2.2 需求待确认-->
			// 					//   <!-- <Kbpkstprdweb></Kbpkstprdweb> -->
			// 					//5.1.1在和客户确认
			// 					// <Kbworkproweb></Kbworkproweb>
			// 					//5.1.2  完成
			// 					// <Kburgdlvweb></Kburgdlvweb>
			// 					//5。2.2 完成
			// 					// <Kbpksemiweb></Kbpksemiweb>
			// 					//5.2.3 
			// 					// <Kbpkprcweb></Kbpkprcweb>
			// 					// 窗体长度
			// 					kbpgrmd_win_height: '100',
			// 					// 窗体宽度
			// 					kbpgrmd_win_width: '100',
			// 					// 左距离
			// 					kbpgrmd_magin_left: '0',
			// 					// 上距离
			// 					kbpgrmd_magin_top: '0',
			// 					// 访问数据频率
			// 					kbpgrmd_get_time: '100',
			// 					// 数据刷新频率
			// 					kbpgrmd_refresh_time: '20',
			// 					// 查询数据条件
			// 					kbpgrmd_query: '',
			// 					// 数据展示条数
			// 					kbpgrmd_records: '20',
			// 				},
			// 				// {
			// 				//       //第几屏
			// 				//       kbpgrmd_screen_num: '1',
			// 				//       //第几窗体
			// 				//       kbpgrmd_window_num: '2',
			// 				//       // 功能id
			// 				//       kbpgrmd_pgrm: 'Kbworkproweb',
			// 				//       // 窗体长度
			// 				//       kbpgrmd_win_height: '100',
			// 				//       // 窗体宽度
			// 				//       kbpgrmd_win_width: '40',
			// 				//       // 左距离
			// 				//       kbpgrmd_magin_left: '52',
			// 				//       // 上距离
			// 				//       kbpgrmd_magin_top: '8',
			// 				//       // 访问数据频率
			// 				//       kbpgrmd_get_time: '100',
			// 				//       // 数据刷新频率
			// 				//       kbpgrmd_refresh_time: '0',
			// 				//       // 查询数据条件
			// 				//       kbpgrmd_query: '',
			// 				//     },
			// 			],
			// 		},
			// 		{
			// 			//程序id
			// 			kbpgrmd_exec: '1',
			// 			//程序名字
			// 			kbpgrm_name: '单页测试3',
			// 			//大屏轮询间隔
			// 			kbpgrm_screen_time: '0',
			// 			//程序
			// 			kbpgrmd: [{
			// 					//第几屏
			// 					kbpgrmd_screen_num: '1',
			// 					//第几窗体
			// 					kbpgrmd_window_num: '1',
			// 					// 功能id
			// 					kbpgrmd_pgrm: 'Kbinventorywarn',
			// 					//  <!-- 2.1.5 -->
			// 					//   <!-- <kbinspprcweb></kbinspprcweb> -->
			// 					//   <!-- 2.1.7 -->
			// 					//   <!-- <Kbchkpfmweb></Kbchkpfmweb> -->
			// 					//   <!-- 2.1.8  -->
			// 					//   <!-- <Kbwhpfmweb></Kbwhpfmweb> -->
			// 					//   <!-- 2.3.1  -->
			// 					//   <!-- <Kbgpproweb></Kbgpproweb> -->
			// 					//   <!-- 3.1.1   -->
			// 					//   <!-- <Kbnplratioweb></Kbnplratioweb> -->
			// 					//   <!-- 5.2.1   -->
			// 					//   <!-- <Kbungrwkweb></Kbungrwkweb> -->
			// 					//   <!-- 2.1.2  -->
			// 					//   <!-- <Kbminspqtyweb></Kbminspqtyweb> -->
			// 					//   <!-- 2.1.6 -->
			// 					//   <!-- <Kbinspachweb></Kbinspachweb> -->
			// 					//   <!-- 2.2.1 -->
			// 					//   <!-- <Kbempprdweb></Kbempprdweb> -->
			// 					//   <!-- 4.1.1 -->
			// 					//   <!-- <Kbqaineffccweb></Kbqaineffccweb> -->
			// 					//   <!-- 4.2.1 -->
			// 					//   <!-- <kbgpinefweb></kbgpinefweb> -->
			// 					//   <!-- 3.2.1 --> 
			// 					//   <!-- <Kbbadtrendweb></Kbbadtrendweb> -->
			// 					//   <!-- 2.1.10 -->
			// 					//<!-- <Kbmchprdweb></Kbmchprdweb> -->
			// 					//   <!-- 2.1.11 -->
			// 					//   <!-- 2.1.1    -->
			// 					//   <!-- <Kbdinspqtyweb></Kbdinspqtyweb> -->
			// 					//   <!-- 2.1.3 不要了-->
			// 					//   <!-- <Kbcfppdfcmweb></Kbcfppdfcmweb> -->
			// 					//   <!-- 2.1.4 完成-->
			// 					//   <!-- <Kbchkprodepaweb></Kbchkprodepaweb> -->
			// 					//   <!-- 2.1.9 完成-->
			// 					//   <!-- <Kbinspsumweb></Kbinspsumweb> -->
			// 					//   <!-- 2.2.2 需求待确认-->
			// 					//   <!-- <Kbpkstprdweb></Kbpkstprdweb> -->
			// 					//5.1.1在和客户确认
			// 					// <Kbworkproweb></Kbworkproweb>
			// 					//5.1.2  完成
			// 					// <Kburgdlvweb></Kburgdlvweb>
			// 					//5。2.2 完成
			// 					// <Kbpksemiweb></Kbpksemiweb>
			// 					//5.2.3 
			// 					// <Kbpkprcweb></Kbpkprcweb>
			// 					// 窗体长度
			// 					kbpgrmd_win_height: '100',
			// 					// 窗体宽度
			// 					kbpgrmd_win_width: '100',
			// 					// 左距离
			// 					kbpgrmd_magin_left: '0',
			// 					// 上距离
			// 					kbpgrmd_magin_top: '0',
			// 					// 访问数据频率
			// 					kbpgrmd_get_time: '100',
			// 					// 数据刷新频率
			// 					// kbpgrmd_refresh_time: '0',
			// 					// 查询数据条件
			// 					kbpgrmd_refresh_time: '20',
			// 					// 查询数据条件
			// 					kbpgrmd_query: '',
			// 					// 数据展示条数
			// 					kbpgrmd_records: '20',
			// 				},
			// 				// {
			// 				//       //第几屏
			// 				//       kbpgrmd_screen_num: '1',
			// 				//       //第几窗体
			// 				//       kbpgrmd_window_num: '2',
			// 				//       // 功能id
			// 				//       kbpgrmd_pgrm: 'Kbworkproweb',
			// 				//       // 窗体长度
			// 				//       kbpgrmd_win_height: '100',
			// 				//       // 窗体宽度
			// 				//       kbpgrmd_win_width: '40',
			// 				//       // 左距离
			// 				//       kbpgrmd_magin_left: '52',
			// 				//       // 上距离
			// 				//       kbpgrmd_magin_top: '8',
			// 				//       // 访问数据频率
			// 				//       kbpgrmd_get_time: '100',
			// 				//       // 数据刷新频率
			// 				//       kbpgrmd_refresh_time: '0',
			// 				//       // 查询数据条件
			// 				//       kbpgrmd_query: '',
			// 				//     },
			// 			],
			// 		},
			// 		{
			// 			//程序id
			// 			kbpgrmd_exec: '1222',
			// 			//程序名字
			// 			kbpgrm_name: '翻页测试',
			// 			//大屏轮询间隔
			// 			kbpgrm_screen_time: '0',
			// 			//程序
			// 			kbpgrmd: [{
			// 				//第几屏
			// 				kbpgrmd_screen_num: '1',
			// 				//第几窗体
			// 				kbpgrmd_window_num: '1',
			// 				// 功能id
			// 				kbpgrmd_pgrm: 'Kbinspachweb',
			// 				// 窗体长度
			// 				kbpgrmd_win_height: '100',
			// 				// 窗体宽度
			// 				kbpgrmd_win_width: '40',
			// 				// 左距离
			// 				kbpgrmd_magin_left: '8',
			// 				// 上距离
			// 				kbpgrmd_magin_top: '8',
			// 				// 访问数据频率
			// 				kbpgrmd_get_time: '100',
			// 				// 数据刷新频率
			// 				kbpgrmd_refresh_time: '0',
			// 				// 查询数据条件
			// 				kbpgrmd_query: '',
			// 			}, {
			// 				//第几屏
			// 				kbpgrmd_screen_num: '2',
			// 				//第几窗体
			// 				kbpgrmd_window_num: '1',
			// 				// 功能id
			// 				kbpgrmd_pgrm: 'Kbempprdweb',
			// 				// 窗体长度
			// 				kbpgrmd_win_height: '100',
			// 				// 窗体宽度
			// 				kbpgrmd_win_width: '40',
			// 				// 左距离
			// 				kbpgrmd_magin_left: '8',
			// 				// 上距离
			// 				kbpgrmd_magin_top: '8',
			// 				// 访问数据频率
			// 				kbpgrmd_get_time: '100',
			// 				// 数据刷新频率
			// 				kbpgrmd_refresh_time: '0',
			// 				// 查询数据条件
			// 				kbpgrmd_query: '',
			// 			}],
			// 		}
				// ]
			};
		},
		methods: {
			clickLoginButton() {
				// this.$router.push({
				//   path: "/menu",
				//   query: {
				//     timesindex: '1'
				//   }
				// });
				this.disabled = true
				var _this = this
				if (_this.username === "" || _this.password === "") {
					mui.toast('请输入账号和密码。');
					_this.disabled = false
				} else {
					_this.ajaxLogin();
				}
			},
			ajaxLogin() {
				var _this = this
				// 报错时keyup.enter无效
				if(_this.preventKeyUp){
					return
				}
				// 	/* 申达*/
				// let data = {
				// 	userid: _this.username,
				// 	corp: "",
				// 	domain: "istj",
				// 	password: _this.password,
				// 	session_id: _this.seesionID,
				// 	language: "ch"
				// }
				
				/* ATG*/
				let data = {
					userid: _this.username,
					corp: "atg",
					domain: "atg",
					password: _this.password,
					session_id: _this.seesionID,
					language: "ch"
				}
				mui.ajax({
					type: "post",
					//  url: 'http://www.bpmap.cn:8044/ATG_Kanban_Webservice.asmx/Kbpgrm_detget',
					// url: 'http://192.9.200.125:1001/ATG_Kanban_Webservice.asmx/Kbpgrm_detget',
					// http://192.168.1.99:816/Kanban_Webservice.asmx
					url: global.context.webUrl + '/Kbpgrm_detget',
					data: data,
					beforeSend: function(xhr) {
						xhr.setRequestHeader("accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					dataType: 'json',
					contentType: 'application/json,charset=UTF-8',
					success: function(e) {
						let rtdt = JSON.parse(e.d)
						console.log(rtdt)
						console.log(e)
						console.log('111111111111111111111111111111111')
						if (rtdt.canpass == 'false') {
							
							// 第一次输错后开启禁用keyup.enter标志
							_this.preventKeyUp = true;
							mui.alert(rtdt.message || '系统异常，请稍后重试.', "提示",function(){
								// 点击确定后关闭禁用
								_this.preventKeyUp = false;
								_this.disabled = false
								_this.$refs.pasRef.focus()
							});
							// _this.path = '';
							// _this.receipts = '';
							// _this.$refs.mypatha.focus();
							return;
						}
						localStorage.setItem("SDdata",JSON.stringify(data))
						_this.preventKeyUp = false;
						for (let i = 0; i < rtdt.dt.length; i++) {
							let element = rtdt.dt[i];
							if (element.kbpgrmd_query == null) {
								element.kbpgrmd_query = ''
							}
							if (_this.kbpgrmd_exec.indexOf(element.kbpgrmd_exec) == -1) {
								console.log(element.headline)
								_this.menu.push({
									// 窗体名称
									headline: element.headline,
									//程序id
									kbpgrmd_exec: element.kbpgrmd_exec,
									//程序名字
									kbpgrm_name: element.menudesc,
									//大屏轮询间隔
									kbpgrm_screen_time: element.kbpgrm_screen_time,
									// 菜单分级参数
									// kbpgrm_screen_time: element.kbpgrm_screen_time,
									
									// kbpgrm_screen_time: element.kbpgrm_screen_time,
									//程序
									kbpgrmd: [{
										//第几屏
										kbpgrmd_screen_num: element.kbpgrmd_screen_num,
										//第几窗体
										kbpgrmd_window_num: element.kbpgrmd_window_num,
										// 功能id
										// kbpgrmd_pgrm: element.kbpgrmd_pgrm.trim(),
										kbpgrmd_pgrm: element.kbpgrmd_pgrm,
										// 窗体长度
										kbpgrmd_win_height: element.kbpgrmd_win_height,
										// 窗体宽度
										kbpgrmd_win_width: element.kbpgrmd_win_width,
										// 左距离
										kbpgrmd_magin_left: element.kbpgrmd_margin_left,
										// 上距离
										kbpgrmd_magin_top: element.kbpgrmd_margin_top,
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
								_this.kbpgrmd_exec.push(element.kbpgrmd_exec)
							} else {
								console.log(element.headline)
								let eindex = _this.kbpgrmd_exec.indexOf(element.kbpgrmd_exec)
								let mflag = -1
								// for (let j = 0; j < _this.menu[eindex].kbpgrmd.length; j++) {
								//   const element2 = _this.menu[eindex].kbpgrmd[j].kbpgrmd_pgrm;
								//   if (element.kbpgrmd_pgrm == element2) {
								//     mflag = 1;
								//     return;
								//   }
								// }
								console.log('1')
								if (mflag == -1) {
									_this.menu[eindex].kbpgrmd.push({
										//第几屏
										kbpgrmd_screen_num: element.kbpgrmd_screen_num,
										//第几窗体
										kbpgrmd_window_num: element.kbpgrmd_window_num,
										// 功能id
										// kbpgrmd_pgrm: element.kbpgrmd_pgrm.trim(),
										kbpgrmd_pgrm: element.kbpgrmd_pgrm,
										// 窗体长度
										kbpgrmd_win_height: element.kbpgrmd_win_height,
										// 窗体宽度
										kbpgrmd_win_width: element.kbpgrmd_win_width,
										// 左距离
										kbpgrmd_magin_left: element.kbpgrmd_margin_left,
										// 上距离
										kbpgrmd_magin_top: element.kbpgrmd_margin_top,
										// 访问数据频率
										kbpgrmd_get_time: element.kbpgrmd_get_time,
										// 数据刷新频率
										kbpgrmd_refresh_time: element.kbpgrmd_refresh_time,
										// 查询数据条件
										kbpgrmd_query: element.kbpgrmd_query,
										// 数据展示条数
										kbpgrmd_records: element.kbpgrmd_records,
									})
									console.log(_this.menu)
								}
							}
						}
						console.log(_this.menu)
						_this.detail.userid = _this.userId
						_this.detail.sessionid = _this.seesionID
						app.storeUserInfo(JSON.stringify(_this.detail));
						console.log(_this.menu)
						localStorage.setItem('menu', JSON.stringify(_this.menu))
						_this.$router.push({
							path: "/menu",
							query: {
								v: _this.vmenu
							}
						});
					},
					error: function(xhr, type, errorThrown) {
						app.failToServer(xhr, type, errorThrown);
						_this.disabled = false
					}
				})
			}
		},
		created() {
			this.seesionID = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
			console.log(this.seesionID)
			this.vmenu = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
			console.log(this.vmenu)
		}
	};
</script>


<style scoped>
	.card {
		border-radius: 10px;
	}

	.micon {
		font-size: 30px;
		color: rgba(22, 225, 240, 0.911);
	}

	body {
		background-color: rgba(10, 10, 10, 1);
	}
</style>
<style>
	body {
		background-color: rgba(10, 10, 10, 1);
	}
</style>
