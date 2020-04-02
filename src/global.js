const esun = {
  password: '',
  username: '',
  version: "V1.0.1",
  title: "TEST",
  subTitle: "测试库",
  // 手动换地址,内网备用
  webUrl:"http://10.124.0.15:8021/ATG_Kanban_Webservice.asmx",
  // webUrl: "http://www.bpmap.cn:8021/ATG_Kanban_Webservice.asmx",
  // downloadUrl: 'http://193.112.123.252:804/APK/Boze_test.apk',
  environment: 'esun',
  // onlineStatus: 0, //状态flag：0表示在线，1表示仅服务器B在线，2表示离线
  // onlineStatusDescribe: '在线',
  // onlineStatusIconColor: 'green',
  // sendRequestTimes: 0, //处于在线状态且ajax访问失败时的请求次数
  // cycleTime: 15000,
  // ajaxTimesOut: 15000,
  // backStageAjaxStatus: 0
}
const test = {
  password: '',
  username: '',
  version: "V1.0.1",
  title: "TEST",
  subTitle: "测试库",
  webUrl: "http://192.9.200.125:1001/ATG_Kanban_Webservice.asmx",
  // downloadUrl: 'http://193.112.123.252:804/APK/Boze_test.apk',
  environment: 'test',
  // onlineStatus: 0, //状态flag：0表示在线，1表示仅服务器B在线，2表示离线
  // onlineStatusDescribe: '在线',
  // onlineStatusIconColor: 'green',
  // sendRequestTimes: 0, //处于在线状态且ajax访问失败时的请求次数
  // cycleTime: 15000,
  // ajaxTimesOut: 15000,
  // backStageAjaxStatus: 0
}
const pro = {
  password: '',
  username: '',
  version: "V1.0.1",
  title: "TEST",
  subTitle: "ATG正式库",
  webUrl: "http://192.9.200.125:1003/ATG_Kanban_Webservice.asmx",
  // downloadUrl: 'http://193.112.123.252:804/APK/Boze_test.apk',
  environment: 'pro',
  // onlineStatus: 0, //状态flag：0表示在线，1表示仅服务器B在线，2表示离线
  // onlineStatusDescribe: '在线',
  // onlineStatusIconColor: 'green',
  // sendRequestTimes: 0, //处于在线状态且ajax访问失败时的请求次数
  // cycleTime: 15000,
  // ajaxTimesOut: 15000,
  // backStageAjaxStatus: 0
}

const SDtest = {
  password: '',
  username: '',
  version: "V1.0.1",
  title: "TEST",
  subTitle: "正式库",
  webUrl: "http://192.168.1.99:813/Kanban_Webservice.asmx",
  // downloadUrl: 'http://193.112.123.252:804/APK/Boze_test.apk',
  environment: 'SDtest',
  // onlineStatus: 0, //状态flag：0表示在线，1表示仅服务器B在线，2表示离线
  // onlineStatusDescribe: '在线',
  // onlineStatusIconColor: 'green',
  // sendRequestTimes: 0, //处于在线状态且ajax访问失败时的请求次数
  // cycleTime: 15000,
  // ajaxTimesOut: 15000,
  // backStageAjaxStatus: 0
}

global.context = pro


//global.context = process.env.NODE_ENV === 'development' ? pro1 : pro1
