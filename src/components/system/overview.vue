<template>
  <div class="left-overview-bar">
    <el-row>
      <el-col :span="24">
        <div>
          <img src="../../../static/img/background/decorate.png"
               style="width:330px;height: 35px;position:absolute; left: 10px;top:10px"/>
          <span class="left-overview-header">数据概览</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="left-overview-font">
      <el-col :span="12" @click.native="showRightDetail('camera')" style="cursor: pointer;">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-video-camera" style="font-size:30px; margin-top:10px; margin-left:20px"></i>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <div>监控摄像头</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-col :span="10">
                  <div style="color:#ee5b5c">{{ camerasNormalNum }}</div>
                </el-col>
                <el-col :span="4">
                  <div>/</div>
                </el-col>
                <el-col :span="10">
                  <div>{{ camerasTotalNum }}</div>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" @click.native="showRightDetail('alarm')" style="cursor: pointer;">
        <el-row>
          <el-col :span="8"><i class="el-icon-bell"
                               style="font-size:30px; margin-top:10px; margin-left:20px"></i></el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <div>待处理报警</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div style="color:#ee5b5c">{{ pendingAlarmNum }}</div>
              </el-col>
              <el-col :span="4">
                <div>/</div>
              </el-col>
              <el-col :span="10">
                <div>{{ alarmTotalNum }}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="left-overview-font">
      <el-col :span="12" @click.native="showRightDetail('area')" style="cursor: pointer;">
        <el-row>
          <el-col :span="8"><i class="el-icon-warning"
                               style="font-size:30px; margin-top:10px;  margin-left:20px"></i></el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <div>内部拥堵区域</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div style="color:#ee5b5c">{{ congestedAreasTotalNum }}</div>
              </el-col>
              <el-col :span="4">
                <div>/</div>
              </el-col>
              <el-col :span="10">
                <div>{{ areasTotalNum }}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" @click.native="showRightDetail('knowledge')" style="cursor: pointer;">
        <el-row>
          <el-col :span="8"><i class="el-icon-mobile"
                               style="font-size:30px; margin-top:10px; margin-left:20px"></i></el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <div>知识点推送</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div style="color:#ee5b5c">{{ mobilePushTotalNum }}</div>
              </el-col>
              <el-col :span="4">
                <div>/</div>
              </el-col>
              <el-col :span="10">
                <div>{{ knowledgeTotalNum }}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCameraInfo} from "../../api/camera";
import {getWarningInfo} from "../../api/alarm";
import {getAreaInfo} from "../../api/area";
import axios from "axios";


export default {
  name: "overview.vue",
  data() {
    return {
      camerasTotalNum: 0,
      camerasNormalNum: 0,
      pendingAlarmNum: 0,
      alarmTotalNum: 0,
      congestedAreasTotalNum: 0,
      areasTotalNum: 0,
      knowledgeTotalNum: 0,
      mobilePushTotalNum: 0,
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      // 监控摄像头
      let cameraData = {pageTotal: 9999}
      getCameraInfo(cameraData).then(res => {
        if (res.data.code == '00000') {
          this.camerasTotalNum = res.data.data.totalMessage
          let tmpCamerasNormalNum = 0;
          res.data.data.pageContent.forEach(e => {
            if (e.state == 0) tmpCamerasNormalNum++;
          })
          this.camerasNormalNum = tmpCamerasNormalNum;
        }
      })
      // 待处理报警和报警总数
      let warningQueryData = {
        pageTotal: 9999
      }
      getWarningInfo(warningQueryData).then(res => {
        if (res.data.code == '00000') {
          let tmpPendingAlarmNum = 0;
          res.data.data.pageContent.forEach(e => {
            if (e.confirmTime == null) tmpPendingAlarmNum++;
          })
          this.pendingAlarmNum = tmpPendingAlarmNum;
          this.alarmTotalNum = res.data.data.totalMessage;
        }
      })
      // 内部拥堵区域
      let passengerAlarmData = {
        warningType: 1,
        warningReplyResult: 0,
        pageTotal: 9999
      }
      getWarningInfo(passengerAlarmData).then(res => {
        if (res.data.code == '00000') {
          this.congestedAreasTotalNum = res.data.data.totalMessage
        }
      })
      let areaData = {pageTotal: 9999}
      getAreaInfo(areaData).then(res => {
        if (res.data.code == '00000') {
          this.areasTotalNum = res.data.data.totalMessage
          let tmpCongestedAreasTotalNum = 0;
          res.data.data.pageContent.forEach(e => {
            if (e.crowdLevel >= 3) tmpCongestedAreasTotalNum++;
          })
          this.congestedAreasTotalNum = tmpCongestedAreasTotalNum;
        }
      })
      //知识点
      axios({
        method: 'post',
        params: {
          token: 'aae5563c-9f26-47a7-8117-6d8d77e1d052',
          number: 9999,
        },
        url: 'https://www.travelxj.cn/e/extend/api/index.php?m=yimeng&c=queryknowledgepagination'
      }).then(res => {
        if (res.data.code == '1') {
          this.knowledgeTotalNum = res.data.message.total
        }
      })
      // 推送
      let mobilePushData = {pageTotal: 9999}
      //mobilePushTotalNum
    },
    showRightDetail(num) {
      if (num === 'camera') {
        this.$parent.handleMenuSelect("1-1")
      } else if (num === 'alarm') {
        this.$parent.handleMenuSelect("3-1")
      } else if (num === 'area') {
        this.$parent.handleMenuSelect("4-2")
      } else if (num === 'knowledge') {
        this.$parent.handleMenuSelect("2-3")
      }
    }
  }
}
</script>

<style scoped>

.left-overview-bar {
  width: 320px;
  height: 170px;
  float: left;
  color: #6fb4c7;
  overflow: hidden;
  z-index: 11;
  position: absolute;
  top: 0px;
  padding-right: 10px;
  margin-left: 0px;
}

.left-overview-header {
  color: #E5DB3AFF;
  text-align: left;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 200%;
  font-weight: bolder;
  margin-top: 10px;
  margin-left: 15px;
}

.left-overview-font {
  font-size: 16px;
  line-height: 150%;
  font-weight: bold;
  text-align: center;
  color: #7ec9df;
  margin-top: 10px;
}

</style>
