<template>
  <div v-if="showAlarmDialog">
    <transition name="fade">
      <div class="alarm-dialog-box">
        <img src="../../../static/img/background/dialogDecorate.png" class="alarm-dialog-left-top-decorate">
        <el-button class="alarm-dialog-cancel" icon="el-icon-close" @click="closeAlarmDialog"></el-button>
        <img src="../../../static/img/background/dialogDecorate.png" class="alarm-dialog-right-bottom-decorate">
        <div>
          <div class="alarm-dialog-title">报警详情与处理</div>
          <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 61px">报警类型:</div>
          <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 60px">
            {{ sourceObj.warningTypeText }}
          </div>
          <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 91px">发生位置:</div>
          <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 90px">
            {{ sourceObj.areaName }}
          </div>
          <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 121px">日期时间:</div>
          <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 124px">
            {{ sourceObj.createTime| formatExcelDate }}
          </div>
          <el-button type="primary" size="small" class="alarm-show-camera-button">
            查看附近摄像头
          </el-button>
          <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 203px">现场照片:</div>
          <div v-if="sourceObj.warningPictures.length > 0">
            <div style="display: inline-block;position: absolute; left: 110px; top: 181px">
              <el-button v-if="sourceObj.warningPictures.length>2" type="primary" icon="el-icon-caret-left"
                         class="img-left" @click="minusImg"></el-button>
              <img :src=" imgUrl + sourceObj.warningPictures[currentimg]"
                   style="width: 100px;height: 70px;margin-left: 18px">
              <img v-show="sourceObj.warningPictures.length>=2"
                   :src="imgUrl + sourceObj.warningPictures[currentimg2]"
                   style="width: 100px;height: 70px;">
              <el-button v-if="sourceObj.warningPictures.length>2" type="primary" icon="el-icon-caret-right"
                         class="img-right" @click="addImg"></el-button>
            </div>
          </div>
          <div v-else class="alarm-dialog-font" style="position: absolute; left: 110px; top: 203px">无</div>
          <div v-show="sourceObj.warningType == 5">
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 151px">游客电话:</div>
            <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 151px">
              {{ sourceObj.mobilePhone == null ? '未知' : sourceObj.mobilePhone }}
            </div>
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 281px">情况描述:</div>
            <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 280px;">
              {{ sourceObj.warningText }}
            </div>
            <div>
              <div v-if="sourceObj.confirmTime == null">
                <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 340px">反馈信息:</div>
                <el-input type="textarea" :rows="3" placeholder="请输入反馈信息"
                          style=" width: 230px;position: absolute; left: 110px; top: 340px;" v-model="replyMsg">
                </el-input>
                <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 430px">处理结果:</div>
                <el-select style="height: 30px;width: 230px;position: absolute; left: 110px; top: 430px"
                           v-model="alarmProcessValue" placeholder="请选择处理结果">
                  <el-option v-for="item in alarmProcess" :key="item.processId" :label="item.alarmProcessName"
                             :value="item.processId"></el-option>
                </el-select>
                <el-button size="mini" class="confirm-button" @click="confirmResult(5)"
                           style="position: absolute;top: 433px;right: 10px;">确认
                </el-button>
              </div>
              <div v-else>
                <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 340px">反馈信息:</div>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 340px;">
                  {{ sourceObj.messageContent}}
                </div>
                <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 430px">处理结果:</div>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 430px;">
                  已确认。
                </div>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 455px;">
                  确认时间：{{ sourceObj.confirmTime | formatExcelDate }}
                </div>
              </div>
            </div>
          </div>
          <div v-show="sourceObj.warningType == 6">
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 151px">游客身份:</div>
            <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 151px">
              {{ sourceObj.mobilePhone == null ? '未知' : sourceObj.mobilePhone }}
            </div>
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 280px">处理结果:</div>
            <div>
              <div v-if="sourceObj.confirmTime == null">
                <el-select style="height: 30px;width: 230px;position: absolute; left: 110px; top: 270px"
                           v-model="alarmProcessValue" placeholder="请选择处理结果">
                  <el-option v-for="item in alarmProcess" :key="item.processId" :label="item.alarmProcessName"
                             :value="item.processId"></el-option>
                </el-select>
                <el-button size="mini" class="confirm-button" @click="confirmResult(6)"
                           style="position: absolute;top: 273px;right: 10px;">确认
                </el-button>
              </div>
              <div v-else>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 280px;">
                  已确认。
                </div>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 305px;">
                  确认时间：{{ sourceObj.confirmTime | formatExcelDate }}
                </div>
              </div>
            </div>
          </div>
          <div v-show="sourceObj.warningType == 1 || sourceObj.warningType == 2">
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 151px">区域人数:</div>
            <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 151px">
              {{ sourceObj.currentTourists }}&nbsp;&nbsp;&nbsp;&nbsp;最大容量{{ sourceObj.maxTourists }}人
            </div>
            <div class="alarm-dialog-name" style="position: absolute; left: 25px; top: 280px">处理结果:</div>
            <div>
              <div v-if="sourceObj.confirmTime == null">
                <el-select style="height: 30px;width: 230px;position: absolute; left: 110px; top: 270px"
                           v-model="alarmProcessValue" placeholder="请选择处理结果">
                  <el-option v-for="item in alarmProcess" :key="item.processId" :label="item.alarmProcessName"
                             :value="item.processId"></el-option>
                </el-select>
                <el-button size="mini" class="confirm-button" @click="confirmResult(1)"
                           style="position: absolute;top: 273px;right: 10px;">确认
                </el-button>
              </div>
              <div v-else>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 280px;">
                  已确认。
                </div>
                <div class="alarm-dialog-font" style="position: absolute; left: 110px; top: 305px;">
                  确认时间：{{ sourceObj.confirmTime | formatExcelDate }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ALARM_PROCESS, ALARM_PROCESS_MAP} from "../../config/app.config";
import Config from "../../config"
import {replyWarningDetail} from "../../api/alarm";

export default {
  name: "alarmDialog",
  props: {
    showAlarmDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: Object,
    textarea: ''
  },
  filters: {
    formatExcelDate(time) {
      if (!time) return time;
      var date = time.substr(0, 10); //年月日
      var hours = time.substring(11, 13);
      var minutes = time.substring(14, 16);
      var seconds = time.substring(17, 19);
      var timeFlag = date + ' ' + hours + ':' + minutes + ':' + seconds;
      timeFlag = timeFlag.replace(/-/g, "/");
      timeFlag = new Date(timeFlag);
      timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
      timeFlag = timeFlag.getFullYear() + '-' + ((timeFlag.getMonth() + 1) < 10 ? "0" + (timeFlag.getMonth() + 1) : (timeFlag.getMonth() + 1)) + '-' + (timeFlag.getDate() < 10 ? "0" + timeFlag.getDate() : timeFlag.getDate()) + ' ' + (timeFlag.getHours() < 10 ? "0" + timeFlag.getHours() : timeFlag.getHours()) + ':' + (timeFlag.getMinutes() < 10 ? "0" + timeFlag.getMinutes() : timeFlag.getMinutes()) + ':' + (timeFlag.getSeconds() < 10 ? "0" + timeFlag.getSeconds() : timeFlag.getSeconds());
      return timeFlag;
    },
  },
  data() {
    return {
      currentimg: 0,
      currentimg2: 1,
      alarmProcess: [],
      alarmProcessValue: '',
      imgUrl: Config.apiPrefix + '/admin/images/',
      replyMsg: ''
    };
  },
  created() {
    this.alarmProcessValue = ''
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (let key of ALARM_PROCESS) {
        this.alarmProcess.push({
          processId: key,
          alarmProcessName: ALARM_PROCESS_MAP[key]
        })
      }
      this.alarmProcessValue = ''
    },
    closeAlarmDialog() {
      this.$emit('update:showAlarmDialog', false)
    },
    minusImg() {
      let img = (this.currentimg - 1) % this.sourceObj.warningPictures.length
      if (img < 0) img = img + this.sourceObj.warningPictures.length
      this.currentimg = img
      let img2 = (this.currentimg2 - 1) % this.sourceObj.warningPictures.length
      if (img2 < 0) img2 = img2 + this.sourceObj.warningPictures.length
      this.currentimg2 = img2
    },
    addImg() {
      this.currentimg = (this.currentimg + 1) % this.sourceObj.warningPictures.length
      this.currentimg2 = (this.currentimg2 + 1) % this.sourceObj.warningPictures.length
    },
    confirmResult(i) {
      let data = {
        warningId: this.sourceObj.warningId,
        warningReplyResult: this.alarmProcessValue
      }
      if (i == 5) {
        data.warningReplyContent = this.replyMsg
      }
      replyWarningDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.$message({
            message: '处理成功！',
            type: 'success'
          });
          this.$emit('update:showAlarmDialog', false)
          this.$emit('getAlarmList')
          this.$emit('getAllAlarmList')
        }
      })
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

.alarm-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 400px;
  height: 560px;
  position: absolute;
  right: 340px;
  top: 187px;
}

.alarm-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.alarm-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 15px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.alarm-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.alarm-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -32px;
}

.alarm-dialog-name {
  color: #7dc7de;
  font-weight: bold;
}

.alarm-dialog-font {
  color: #ffffff;
}

.alarm-show-camera-button {
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 14px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  height: 45px;
  width: 90px;
  position: absolute;
  top: 60px;
  right: 30px;
}

.img-left {
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;
  font-weight: bolder;
  border: 0;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 12px;
  left: -20px;
}

.img-right {
  background-color: transparent;
  color: #ffffff;
  font-size: 18px;
  font-weight: bolder;
  border: 0;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 12px;
  left: 200px;
}

.confirm-button {
  background-color: #23af2a;
  color: #ffffff;
  font-size: 14px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 35px;
  width: 42px;
  padding-left: 6px;
}
</style>
