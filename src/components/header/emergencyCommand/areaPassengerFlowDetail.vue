<template>
  <transition name="fade">
    <div class="passenger-flow-detail-box">
      <div class="passenger-flow-title">区域客流情况列表({{ totalCount }})</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="passenger-flow-cancel" icon="el-icon-close" @click="closeAreaPassengerFlowDetail"></el-button>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="passengerData"
                border
                style="width:317px;margin-left:24px;position: absolute;top:80px;"
                :row-style="{height:'23px'}"
                :cell-style="{padding:'0px',borderColor: '#868686'}"
                :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                align="center"
                highlight-current-row
                @row-click="handleTableChange">
        <el-table-column width="45" label="序号" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="97" label="名称" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="60" label="游客数" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.currentTourists }}</span>
          </template>
        </el-table-column>
        <el-table-column width="69" label="拥堵程度" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span> {{ scope.row.crowdLevel | crowdLevelFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column width="45" label="趋势" align="center" :show-overflow-tooltip="true">
          <template>
            <span>增长 </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                     :page-size="25"
                     :pager-count="5" layout="prev, pager, next"
                     :current-page.sync="currentPage"
                     :total="totalCount"
                     @current-change="handleCurrentChange">
      </el-pagination>
      <area-passenger-flow-dialog :source-obj="detail"
                                  :show-area-passenger-flow-dialog.sync="showAreaPassengerFlowDialog"></area-passenger-flow-dialog>
    </div>
  </transition>
</template>

<script>
import {
  getAreaPopulationInfo,
  getAreaPopulationDetail,
  getAreaPopulationOnSpecificDay
} from '../../../api/passengerflow'
import areaPassengerFlowDialog from "../../dialog/areaPassengerFlowDialog.vue";
import {CROWD_LEVEL_MAP, CROWD_LEVEL} from '../../../config/app.config'

export default {
  name: 'areaPassengerFlow',
  props: {},
  data() {
    return {
      loading: true,
      passengerData: [],
      currentPage: 1,
      pageSize: 25,
      totalCount: 0,
      detail: {},
      showAreaPassengerFlowDialog: false,
      currentRow: null,
      detailLoading: true,
      maxTourists: 0,
      myChart: undefined,
    }
  },
  filters: {
    crowdLevelFilter(val) {
      if (!val) return '-'
      else return CROWD_LEVEL_MAP[val]
    },
  },
  components: {areaPassengerFlowDialog},
  watch: {},
  created() {
  },
  mounted() {
    this.areaPassengerTimer()
    this.getPassengerList()
  },
  methods: {
    closeAreaPassengerFlowDetail() {
      this.$parent.areaPassengerFlowRightShow = false;
    },
    areaPassengerTimer() {
      return setInterval(() => {
        this.getPassengerList()
      }, 10000)
    },
    getPassengerList() {
      let data = {
        pageIndex: this.currentPage,
        pageTotal: this.pageSize
      }
      getAreaPopulationInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.passengerData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    //显示游客详情
    showDetail(row) {
      this.detail = row
      this.showAreaPassengerFlowDialog = true
    },
    /* 改变页码 */
    handleCurrentChange(val) {
      this.detailShow = false
      this.currentPage = val
      this.getPassengerList(val)
    },
    /* 改变页面数量 */
    handleSizeChange(val) {
      this.pageSize = val
      this.getPassengerList(val)
    },
    handleTableChange(val) {
      this.currentRow = val
      this.showDetail(val)
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
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

.passenger-flow-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.passenger-flow-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.passenger-flow-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.detail {
  width: 340px;
  margin-top: 10px;
  min-height: 200px;
  margin-left: 1.5%;
  background-color: white;
}

.detail-title {
  color: black;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
}

.detail-content {
  color: red;
  font-size: 18px;
}

</style>
