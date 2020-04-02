<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
body {
  margin: 0px !important;
}
.allcharts {
  width: 100%;
  height: 92vh;
  z-index: 9999;
}

.el-table--border,
.el-table--group {
  border: 1px solid #7b7b7b;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #7b7b7b;
}
/* 滚动条 */
.el-scrollbar__wrap {
	/* 这个会导致电视上菜单栏不出现 */
  /* margin-right: -18px !important; */
}
.el-scrollbar__wrap::-webkit-scrollbar {display:none}
.el-table thead {
  color: #909399 !important;
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
.selectPart2 {
  border-radius: 1px;
  /* overflow-y: scroll; */
  position: relative;
  left: 55%;
  margin-left: 0%;
  top: 10px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  /* color: #7b7b7b; */
  z-index: 999;
  background: #0a0a0a;
  height: auto;
  max-height: 80vh;
  width: 50%;
  text-align: center;
  opacity: 1 !important;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
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
  width: auto !important;
  /* width: 200px; */
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.likeButton{
	position:absolute;
	top:-10px;
	/* left: 50%; */
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
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
	padding: 2px 20px;
	font-size: 14px;
	/* border-radius: 4px; */
	margin-left: 0px;
	margin-top: 10px;
	width: 200px;
	/* width: auto; */
	color: #fff;
	/* background-color: #333; */
	/* opacity: 0.7; */
	border-color: #333;
	z-index:1000;
}
.Dtime{
	position:absolute;
	top:-10px;
	/* left: 50%; */
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
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
	padding: 2px 5px;
	font-size: 14px;
	/* border-radius: 4px; */
	margin-left: 205px;
	margin-top: 10px;
	width: 50px;
	color: #FACD91;
	/* background-color: #333; */
	/* opacity: 0.7; */
	border-color: #333;
	z-index:1000;
}
/* .output{
	position:absolute;
	top:-10px;
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
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
	padding: 2px 5px;
	font-size: 14px;
	margin-left: 130px;
	margin-top: 10px;
	width: 250px;
	color: #FACD91;
	z-index:1003;
} */

/* 筛选框时间框缩小 */
.el-date-editor .el-range-separator{
	padding: 0 !important;
	width: 7% !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 230px !important;
}
</style>
