<template>
  <div>
    <div>---------------inputtable----------------------</div>
    <el-form :inline="true">
      <el-row>
        <el-input v-model="setname" placeholder="请输入内容"></el-input>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="userset"></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getset()">input确认</el-button>
      </el-row>
    </el-form>
    <div>Public Class {{setname}}</div>
    <div v-for="(item,index) in serary">
      <div>Public {{item.name}} As {{item.ntype}}</div>
    </div>
    <div>End Class</div>
    <div>---------------outputtable----------------------</div>
    <!-- <el-form :inline="true">
      <el-row>
        <el-input v-model="setname" placeholder="请输入内容"></el-input>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="userset"></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getset()">input确认</el-button>
      </el-row>
    </el-form>
    <div>Public Class {{setname}}</div>
    <div v-for="(item,index) in serary">
      <div>Public {{item.name}} As {{item.ntype}}</div>
    </div>
    <div>End Class</div>-->
    <div>--------------------------title-------------------</div>
    <el-form :inline="true">
      <el-row>
        <el-input v-model="titlename" placeholder="请输入内容"></el-input>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="titleset"></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="gettitle()">input确认</el-button>
      </el-row>
    </el-form>
    <div>{{title}}</div>
    Public Function {{titlename}}(
    <span
      v-for="(item,index) in titles"
    >ByVal {{item.name}} As {{item.ntype}},</span>) As String
    <div>Dim ret As New {{titlename+'out'}}</div>
    <div>Try</div>
    <div>Dim out As String = String.Empty</div>
    <div>Dim MyAppUrl As String = System.Configuration.ConfigurationManager.AppSettings("QAD_API")</div>
    <div>Dim EsunConnecting As New Progress.Open4GL.Proxy.Connection(MyAppUrl, "", "", "")</div>
    <div>Dim EsunWMS As New wms_app.wmsapp(EsunConnecting)</div>
    <div>Dim isoffline As Boolean = False</div>
    <div>Dim canpass As Boolean = False</div>
    <div>Dim errormessage As String = String.Empty</div>
    <!-- <div>End Function</div> -->
    <div>--------------------------outname-------------------</div>
    <el-form :inline="true">
      <el-row>
        <!-- <el-input placeholder="请输入内容"></el-input> -->
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="outname"></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getoutname()">input确认</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userset: '',
      serary: [],
      setname: '',
      titlename: '',
      titleset: '',
      titles: [],
      title: '<WebMethod()>',
      outname: ''
    };
  },
  methods: {
    getset() {
      let _this = this
      let sersary = _this.userset.split(/[(\r\n)\r\n]+/);
      for (let i = 0; i < sersary.length; i++) {
        let aSerary = {
          name: '',
          ntype: ''
        }
        let nmm = sersary[i];
        aSerary.name = _this.setname + nmm.split(' as')[0].trim()
        aSerary.ntype = nmm.split(' as')[1].trim()
        if (aSerary.ntype == 'char' || aSerary.ntype == 'character') {
          aSerary.ntype = 'String'
        } else if (aSerary.ntype == 'logical') {
          aSerary.ntype = 'Boolean'
        }
        _this.serary.push(aSerary)
      }
    },
    gettitle() {
      let _this = this
      let sersary = _this.titleset.split(/[(\r\n)\r\n]+/);
      for (let i = 0; i < sersary.length; i++) {
        let aSerary = {
          name: '',
          ntype: ''
        }
        let nmm = sersary[i];
        aSerary.name = _this.setname + nmm.split(' as')[0].trim()
        aSerary.ntype = nmm.split(' as')[1].trim()
        if (aSerary.ntype == 'char' || aSerary.ntype == 'character') {
          aSerary.ntype = 'String'
        } else if (aSerary.ntype == 'logical') {
          aSerary.ntype = 'Boolean'
        }
        _this.titles.push(aSerary)
        console.log(aSerary)
      }
    },
    getoutname() {

    }
  },
  mounted() {
  }
};

</script>

<style scoped>
#buttonGroup {
  float: right;
  margin-right: 180px;
}
.fiexedD {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
