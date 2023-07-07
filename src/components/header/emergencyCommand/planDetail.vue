<template>
  <transition name="fade">
    <div v-show="planDetailShow">
      <div class="plan-detail-box">
        <div class="plan-border"></div>
        <div class="plan-title">应急预案列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:37px"/>
        <el-button class="plan-cancel" icon="el-icon-close" @click="closePlanDetail"></el-button>
        <div>
          <el-input v-model="planName" placeholder="请输入预案名称" clearable size="mini"
                    style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                    @keyup.enter.native="reGetPlanDetailData"></el-input>
          <el-button icon="el-icon-search" type="primary" size="small"
                     class="plan-search-button" @click="reGetPlanDetailData">
            <span>搜索</span>
          </el-button>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="planData"
                  border
                  style="width:317px;margin-left:24px;position: absolute;top:110px;"
                  :row-style="{height:'23px'}"
                  :cell-style="{padding:'0px',borderColor: '#868686'}"
                  :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                  align="center"
                  highlight-current-row
                  @current-change="handleTableChange">
          <el-table-column width="45" label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="82" label="预案名称" align="center" prop="planName" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column width="45" label="类型" align="center" prop="planFileSuffix" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column width="84" label="日期" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime.substring(0, 10) }}</span>
            </template>
          </el-table-column>
          <el-table-column width="60" label="操作" align="center">
            <template slot-scope="scope">
              <button
                style="color:#8cf4fe;background-color:transparent;border:0;border-radius:5px;height:18px;font-size: 12px;vertical-algin:middle;margin-top: 3px;padding-top:0px"
                @click="showDetail(scope.row)">查看
              </button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="position: absolute;bottom: 5px;left: 15px;" :page-size="23"
                       :current-page.sync="currentPage"
                       :pager-count="5" layout="prev, pager, next" :total="totalCount"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <plan-dialog :source-obj="detail" :show-plan-dialog.sync="showPlanDialog"></plan-dialog>
    </div>
  </transition>
</template>

<script>
import {getPlanInfo, getPlanDetail} from '../../../api/plan'
import planDialog from "../../dialog/planDialog.vue";

export default {
  name: "planDetail",
  props: {
    planDetailShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      planId: '',
      planName: '',
      planData: [],
      currentPage: 1,
      pageSize: 23,
      totalCount: 0,
      currentRow: null,
      detail: {},
      showPlanDialog: false,
      wordURL: '',
      vHtml: "",
      detailLoading: true,
    }
  },
  components: {planDialog},
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getPlanList()
  },
  methods: {
    reGetPlanDetailData() {
      this.currentPage = 1
      this.getPlanList()
    },
    closePlanDetail() {
      this.$emit('update:planDetailShow', false)
    },
    getPlanList() {
      let data = {
        keyword: this.planName,
        pageIndex: this.currentPage,
        pageTotal: this.pageSize
      }
      getPlanInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.planData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    showDetail(row) {
      this.detailLoading = true
      let data = {
        planId: row.planId
      }
      getPlanDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.detail = res.data.data
          this.showPlanDialog = true
        }
        this.detailLoading = false
      }).catch((err) => {
        console.log(err)
        this.detailLoading = false
      })
    },

    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPlanList(val)
    },
    // 改变页面数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getPlanList(val)
    },
    handleTableChange(val) {
      this.currentRow = val
      // this.showdetail(val)
    },
    closeDetail() {
      this.showPlanDialog = false
    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.plan-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.plan-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.plan-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.plan-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.plan-search-button {
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
