<template>
  <!--  这个界面写的稀烂，调接口也乱，命名特乱-->
  <transition name="fade">
    <div class="knowledge-detail-box">
      <div class="knowledge-title">知识点列表({{ total }})</div>
      <div class="knowledge-border"></div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="knowledge-cancel" icon="el-icon-close" @click="closeKnowledgeDetail"></el-button>
      <div>
        <el-input v-model="knowledgename" placeholder="请输入知识点关键词" clearable size="mini"
                  style="width:170px;font-size: 13px;position: absolute;left: 52px;top: 69px;"
                  @keyup.enter.native="reGetKnowledgeDetailData"></el-input>
        <el-button icon="el-icon-search" type="primary" size="small"
                   class="knowledge-search-button" @click="reGetKnowledgeDetailData">
          <span>搜索</span>
        </el-button>
      </div>
      <div>
        <el-select size="mini" v-model="typecode" clearable filterable placeholder="请选择知识点类型"
                   style="width:253px; font-size: 15px;position: absolute;left: 52px;top: 105px;"
                   @change="reGetKnowledgeListByType()">
          <el-option v-for="item in typeOptions" :key="item.typecode" :label="item.typename"
                     :value="item.typecode"></el-option>
        </el-select>
      </div>
      <div>
        <el-select size="mini" v-model="level" clearable filterable placeholder="请选择知识点级别"
                   style="width:253px; font-size: 15px;position: absolute;left: 52px;top: 140px;"
                   @change="reGetKnowledgeListByLevel(level)">
          <el-option v-for="item in levelOptions" :key="item.id" :label="item.level"
                     :value="{value: item.id, label:item.level}"></el-option>
        </el-select>
      </div>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="knowledgeData"
                border
                style="width:317px;margin-left:24px;position: absolute;top:175px;"
                :row-style="{height:'23px'}"
                :cell-style="{padding:'0px',borderColor: '#868686'}"
                :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                align="center"
                highlight-current-row>
        <el-table-column width="49" label="序号" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="102" label="名称" align="center" prop="knowledgename" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="108" label="类型" align="center" prop="typecode" :show-overflow-tooltip="true"
                         :formatter="typeFormat">
        </el-table-column>
        <el-table-column width="57" label="操作" align="center">
          <template slot-scope="scope">
            <button
              style="color:#8cf4fe;background-color:transparent;border:0;border-radius:5px;height:18px;font-size: 12px;vertical-algin:middle;margin-top: 3px;padding-top:0px"
              @click.stop="showKnowledgeDetail(scope.row)">查看
            </button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="position: absolute;bottom: 5px;left: 15px;" :page-size="19"
                     :current-page.sync="currentPage"
                     :pager-count="5" layout="prev, pager, next" :total="total"
                     @current-change="handleCurrentChange">
      </el-pagination>
      <knowledge-dialog :source-obj="this.detail" :show-knowledge-dialog.sync="showKnowledgeDialog"></knowledge-dialog>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import knowledgeDialog from "../../dialog/knowledgeDialog.vue";

export default {
  name: "knowledge",
  data() {
    return {
      loading: true,
      knowledgeid: '',
      knowledgename: '',
      typecode: '',
      typename: '',
      level: '',
      detail: [],
      knowledgeData: [],
      typeOptions: [],
      levelOptions: [],
      currentPage: 1,
      pageSize: 19,
      total: 0,
      showKnowledgeDialog: false,
    }
  },
  components: {knowledgeDialog},
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getKnowledgeTypeList()
      await this.getKnowledgeLevelList()
      this.getKnowledgeList()
    },
    typeFormat(row) {
      let name = this.typeOptions.find(e => e.typecode === row.typecode.charAt(0)).typename
      return name
    },
    closeKnowledgeDetail() {
      this.$parent.knowledgeRightShow = false
    },
    //按关键词查询
    getKnowledgeList() {
      //5.4.1.6 查询满足条件的知识点列表
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          keyword: this.knowledgename,
          number: this.pageSize,
          page: this.currentPage,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=queryknowledgepagination'
      }).then(res => {
        if (res.data.code == '1') {
          console.log("关键词",res.data)
          this.total = res.data.message.total
          this.knowledgeData = res.data.result
        }
      })
      this.loading = false
    },
    reGetKnowledgeDetailData() {
      this.typecode = ''
      this.level = ''
      this.currentPage = 1
      this.getKnowledgeList()
    },
    //按知识点类型查询
    getKnowledgeTypeList() {
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getalltypes'
      }).then(res => {
        if (res.data.code == '1') {
          this.typeOptions = res.data.result
        }
      })
    },
    getKnowledgeListByType() {
      //5.4.1.3 获得某一主类型下指定范围的知识点列表
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          rsftypcod: this.typecode,
          number: this.pageSize,
          page: this.currentPage,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getknowledgepagination'
      }).then(res => {
        if (res.data.code == '1') {
          console.log("类型",res.data)
          this.total = res.data.message.total
          this.knowledgeData = res.data.result
        }
      })
    },
    reGetKnowledgeListByType(){
      this.knowledgename = ''
      this.level = ''
      this.currentPage = 1
      this.getKnowledgeListByType()
    },
    //按知识点级别查询
    getKnowledgeLevelList() {
      //5.4.1.4 知识点级别查询接口
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getalllevel'
      }).then(res => {
        if (res.data.code == '1') {
          this.levelOptions = res.data.result
          let num = 0
          this.levelOptions.forEach((value, index) => {
            value['id'] = num
            num = num + 1
          })
        }
      })
    },
    getKnowledgeListByLevel(data) {
      const {value, label} = data
      this.level = label
      //5.4.1.5 获得某一级别下指定范围的知识点列表
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          level: this.level,
          number: this.pageSize,
          page: this.currentPage,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getknowledgebylevel'
      }).then(res => {
        if (res.data.code == '1') {
          console.log("级别",res.data)
          this.total = res.data.message.total
          this.knowledgeData = res.data.result
        }
      })
    },
    reGetKnowledgeListByLevel(data){
      this.knowledgename = ''
      this.typecode = ''
      this.currentPage = 1
      this.getKnowledgeListByLevel(data)
    },
    getKnowledgeListByLevelForPagination() {
      //5.4.1.5 获得某一级别下指定范围的知识点列表
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          level: this.level,
          number: this.pageSize,
          page: this.currentPage,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getknowledgebylevel'
      }).then(res => {
        if (res.data.code == '1') {
          this.total = res.data.message.total
          this.knowledgeData = res.data.result
        }
      })
    },
    //查看详情
    showKnowledgeDetail(row) {
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          id: row.knowledgeid,
          number: this.pageSize,
          page: this.currentPage,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=getknowledgedetail'
      }).then(res => {
        if (res.data.code == '1') {
          this.detail = res.data.result
          this.showKnowledgeDialog = true
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.typecode != '') {
        this.getKnowledgeListByType()
      } else if (this.level != '') {
        this.getKnowledgeListByLevelForPagination()
      } else
        this.getKnowledgeList()
    },
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.knowledge-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.knowledge-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.knowledge-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.knowledge-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.knowledge-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  top: 69px;
  right: 42px;
}

.knowledge-type-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  top: 69px;
  right: 42px;
}

</style>
