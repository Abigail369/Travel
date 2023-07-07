<template>
  <transition name="fade">
    <div class="alarm-detail-box">
      <div class="alarm-title">今天异常报警列表({{ totalCount }})</div>
      <div class="alarm-border"></div>
      <img src="../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:37px"/>
      <el-button class="alarm-cancel" icon="el-icon-close" @click="closeAlarmDetail"></el-button>
      <div style="height: 100px;width: 100%;">
        <div id="" style="height: 100%;width: 39%;display: inline-block ;vertical-align: top;margin-left: 0;">
          <div style="font-size: 15px;color: white;margin-top: 30px;">
            已处理：<span style="color: #cdd25a">{{ this.processedWarning }}</span>
          </div>
          <div style="font-size: 15px;color: white;margin-top: 10px;">
            未处理：<span style="color: #cdd25a">{{ this.unprocessedWarning }}</span>
          </div>
        </div>
        <div id="alarmDetailEcharts" style="height: 100%;width: 58%;display: inline-block;vertical-align: top"></div>
      </div>
      <div class="alarm-type-search-box" style="height: 40px">
        <span style="color:white;">报警类型：</span>
        <el-select size="small" v-model="alarmTypeValue" placeholder="请选择异常报警类型"
                   style="width:200px; font-size: 15px;"
                   @change="getAlarmList">
          <el-option v-for="item in alarmType" :key="item.typeId" :label="item.alarmTypeName"
                     :value="item.typeId"></el-option>
        </el-select>
      </div>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="passengerData"
                border
                style="width:317px;margin-left:24px;position: absolute;top:200px;"
                :row-style="{height:'23px'}"
                :cell-style="{padding:'0px',borderColor: '#868686'}"
                :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                align="center"
                highlight-current-row
                @row-click="showdetail">
        <el-table-column width="45" label="序号" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" label="报警类型" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope" v-if="scope.row.warningTypeText">
            <span>{{ scope.row.warningTypeText }}{{
                scope.row.warningTypeText == '当前拥堵报警' ? '(一般)' : ''
              }}</span>
          </template>
        </el-table-column>
        <el-table-column width="79" label="位置" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="52" label="时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime|formatExcelDateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column width="60" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{
                scope.row.confirmTime == null ? '未处理' : '已处理'
              }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                     :page-size="pageSize"
                     :current-page.sync="currentPage"
                     :pager-count="5" layout="prev, pager, next"
                     :total="totalCount"
                     @current-change="handleCurrentChange">
      </el-pagination>
      <alarm-dialog v-if="showAlarmDialog" :source-obj="this.detail" :show-alarm-dialog.sync="showAlarmDialog"
                    @getAlarmList="getAlarmList" @getAllAlarmList="getAllAlarmList"></alarm-dialog>
    </div>
  </transition>
</template>

<script>
import {getWarningDetail, getWarningInfo} from '../../api/alarm'
import * as echarts from 'echarts'
import {ALARM_TYPE, ALARM_TYPE_MAP, ALARM_PROCESS_MAP, ALARM_PROCESS} from '../../config/app.config'
import alarmDialog from "../dialog/alarmDialog.vue";

export default {
  name: 'alarmDetail',
  components: {alarmDialog},
  props: {
    type: Number,
  },
  data() {
    return {
      searchName: '',
      loading: true,
      passengerData: [],
      currentPage: 1,
      pageSize: 19,
      totalCount: 0,
      detail: {},
      res: undefined,
      currentRow: null,
      alarmType: [],
      alarmTypeValue: '',
      alarmProcess: [],
      alarmProcessValue: '',
      describe: '',//情况描述内容
      textarea: '',
      warnType1: 0,
      warnType5: 0,
      warnType6: 0,
      warnDownCount: 0,
      warningCount: 0,
      detailShowLoading: true,
      showAlarmDialog: false,
      alarmChart: undefined,
      processedWarning: 0,
      unprocessedWarning: 0,
      alarmListTimer: null,
    }
  },
  filters: {
    formatExcelDateTime(time) {
      if (!time) return time;
      var date = time.substr(0, 10); //年月日
      var hours = time.substring(11, 13);
      var minutes = time.substring(14, 16);
      var seconds = time.substring(17, 19);
      var timeFlag = date + ' ' + hours + ':' + minutes + ':' + seconds;
      timeFlag = timeFlag.replace(/-/g, "/");
      timeFlag = new Date(timeFlag);
      timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
      timeFlag = (timeFlag.getHours() < 10 ? "0" + timeFlag.getHours() : timeFlag.getHours()) + ':' + (timeFlag.getMinutes() < 10 ? "0" + timeFlag.getMinutes() : timeFlag.getMinutes())
      return timeFlag;
    }
  },
  mounted() {
    this.getAlarmType()
    this.alarmTypeValue = this.type
    this.getAlarmList()
    this.getAlarmListTimer()
    this.getAllAlarmList()
  },
  methods: {
    closeAlarmDetail() {
      this.$parent.alarmRightShow = false;
    },
    //获取报警类型
    getAlarmType() {
      this.alarmType = [
        {
          typeId: '',
          alarmTypeName: '全部'
        }
      ]
      for (let key of ALARM_TYPE) {
        this.alarmType.push({
          typeId: key,
          alarmTypeName: ALARM_TYPE_MAP[key]
        })
      }

      for (let key of ALARM_PROCESS) {
        this.alarmProcess.push({
          processId: key,
          alarmProcessName: ALARM_PROCESS_MAP[key]
        })
      }
    },
    //获取报警列表
    getAlarmList() {
      this.loading = true
      this.detailShow = false
      let data = {
        pageIndex: this.currentPage,
        pageTotal: this.pageSize,
        warningType: this.alarmTypeValue
      }
      getWarningInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.passengerData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    getAlarmListTimer() {
      this.alarmListTimer = setInterval(() => {
        this.getAlarmList()
        this.getAllAlarmList()
      }, 5000)
    },
    //echart绘制
    getAlarmEchartsData(res, i) {
      if (res.data.data.pageContent[i].warningType == 1) {
        this.warnType1++
      } else if (res.data.data.pageContent[i].warningType == 5) {
        this.warnType5++
      } else if (res.data.data.pageContent[i].warningType == 6) {
        this.warnType6++
      }
    },
    getAlarmEcharts() {
      let option = {
        legend: {
          orient: 'vertical',
          right: 0,
          top: 22,
          bottom: 20,
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            center: ['20%', '50%'],
            data: [
              {
                value: this.warnType1,
                name: '拥堵报警(' + this.warnType1 + ')',
                itemStyle: {color: '#fc8251'},
              },
              {
                value: this.warnType5,
                name: '小程序报警(' + this.warnType5 + ')',
                itemStyle: {color: '#ecb518'},
              },
              {
                value: this.warnType6,
                name: '清园滞留(' + this.warnType6 + ')',
                itemStyle: {color: '#65e8f5'},
              }
            ]
          }
        ]
      };
      if (this.alarmChart != null && this.alarmChart != "" && this.alarmChart != undefined) {
        this.alarmChart.dispose();
      }
      this.alarmChart = echarts.init(document.getElementById('alarmDetailEcharts'));
      this.alarmChart.setOption(option)
    },
    //获取报警列表
    async getAllAlarmList() {
      var all
      let allData = {pageTotal: 9999}
      await getWarningInfo(allData).then(res => {
        if (res.data.code == '00000') {
          all = res.data.data.totalMessage
        }
      })
      //未处理
      // todo:这里应该传状态1，5，6
      let data = {
        warningReplyResult: 0,
        pageTotal: 9999,
      }
      await getWarningInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.res = res
          let unprocessedWarningCount = 0
          res.data.data.pageContent.forEach(e => {
            if (e.confirmTime == null) unprocessedWarningCount++
          })
          this.unprocessedWarning = unprocessedWarningCount
          this.processedWarning = all - this.unprocessedWarning
        }
        this.loading = false
      })
      this.warnType1 = 0
      this.warnType5 = 0
      this.warnType6 = 0
      for (let i = 0; i < this.res.data.data.pageContent.length; i++) {
        this.getAlarmEchartsData(this.res, i)
      }
      this.getAlarmEcharts()
    },
    //显示游客详情
    showdetail(row) {
      this.detailShowLoading = true
      this.showAlarmDialog = false
      let data = {
        warningId: row.warningId
      }
      getWarningDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.detail = res.data.data
          this.showAlarmDialog = true
          this.detailShowLoading = false
          this.$parent.flyToView(this.detail.longitude, this.detail.latitude);
        }
      }).catch(err => {
        this.detailShowLoading = false
        console.log(err)
      })

    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAlarmList(val)
    },
  },
  beforeDestroy() {
    if (this.alarmListTimer)
      clearInterval(this.alarmListTimer)
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

.alarm-detail-box {
  background: url('../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.alarm-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.alarm-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.alarm-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}
</style>
