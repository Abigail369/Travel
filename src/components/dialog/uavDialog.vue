<template>
  <div v-if="showUavDialog">
    <transition name="fade">
      <div class="show-uav-dialog" style="">
        <div class="uav-dialog-title">{{ sourceObj.droneName }}</div>
        <el-button class="uav-dialog-cancel" icon="el-icon-close" @click="closeUAVDialog"></el-button>
        <img src="../../../static/img/background/dialogDecorate.png" class="uav-dialog-left-top-decorate">
        <img src="../../../static/img/background/dialogDecorate.png" class="uav-dialog-right-bottom-decorate">
        <video id="video-webrtc" controls autoplay muted width="95%" height="430"></video>
        <div class="uav-switch-lens">
          <el-select size="mini" v-model="currentCameraId" placeholder="请选择相机" @change="changeVideo()">
            <el-option v-for="item in videoList" :key="item.id" :label="item.videoName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="uav-task-font-border">
        <span
          class="uav-task-font">目前飞行方向:{{ directionStr }} ,剩余电量: {{ objInfo.energyPercent }},经度:{{ objInfo.lat ? objInfo.lat.toFixed(6) : objInfo.lat }} ,纬度: {{ objInfo.lat ? objInfo.lat.toFixed(6) : objInfo.lat }},高度:{{ objInfo.height }} m,速度:{{ objInfo.speed }} </span>
        </div>
        <div class="uav-lens-control">
          <div class="uav-lens-control-font">
            镜头控制
          </div>
          <el-button class="uav-ptz-turn-left" @click="uavPTZControl(3)">左滚</el-button>
          <el-button class="uav-ptz-turn-right" @click="uavPTZControl(-3)">右滚</el-button>
          <div class="uav-ptz-outer-ring">
            <div class="uav-ptz-inner-ring">
              <el-button class="uav-ptz-reset" icon="el-icon-refresh" @click="uavPTZControl(0)"></el-button>
              <el-button class="uav-ptz-up" icon="el-icon-caret-top" @click="uavPTZControl(1)"></el-button>
              <el-button class="uav-ptz-down" icon="el-icon-caret-top" @click="uavPTZControl(-1)"></el-button>
              <el-button class="uav-ptz-left" icon="el-icon-caret-top" @click="uavPTZControl(2)"></el-button>
              <el-button class="uav-ptz-right" icon="el-icon-caret-top" @click="uavPTZControl(-2)"></el-button>
            </div>
          </div>
          <el-button class="uav-focal-in" icon="el-icon-circle-plus-outline" @click="focalChange(1)"></el-button>
          <div class="uav-focal-font">焦距</div>
          <el-button class="uav-focal-out" icon="el-icon-remove-outline" @click="focalChange(-1)"></el-button>
        </div>
        <div class="uav-task-control">
          <div class="uav-task-control-font">
            <span style="color:#ffffff;margin-left:8px;">当前状态：</span>
            <span style="color:#659db6;font-weight:bolder">{{ taskCode | statesFilter }}</span>
          </div>
          <div v-show="taskCode == 0">
            <el-button class="uav-task-code-button" style="top:50px;left: 35px;" @click="taskControl(0)">开始任务
            </el-button>
          </div>
          <div v-show="taskCode == 1">
            <el-button class="uav-task-code-button" style="top:30px;left: 40px;" @click="taskControl(1)">
              暂停任务
            </el-button>
            <el-button class="uav-task-code-button" style="top:65px;left: 30px" @click="taskControl(3)">停止任务
            </el-button>
            <el-button class="uav-task-code-button" style="top:100px;left: 30px" @click="taskControl(4)">返回起点
            </el-button>
          </div>
          <div v-show="taskCode == 2">
            <el-button class="uav-task-code-button" style="top:30px;left:40px;" @click="taskControl(2)">继续任务
            </el-button>
            <el-button class="uav-task-code-button" style="top:65px;left: 30px" @click="taskControl(3)">停止任务
            </el-button>
            <el-button class="uav-task-code-button" style="top:100px;left: 30px" @click="taskControl(4)">返回起点
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import JSWebrtc from '@/utils/jswebrtc'
import {cameraCommand, gimbleCommand, getDroneInfo} from "../../api/uav"

export default {
  name: "uavDialog.vue",
  props: {
    showUavDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taskCode: 0,
      currentCameraId: '',
      videoList: [],
      objInfo: {
        lat: null,
        lng: null,
        height: null,
        direction: null,
        speed: null,
        energyPercent: '',
        pitch: null,
        yaw: null,
        roll: null,
        taskName: null,
      },
      directionStr: '',
      timer: null
    };
  },
  filters: {
    statesFilter: function (val) {
      if (val == 0)
        return '无任务'
      else if (val == 1)
        return '任务中'
      else if (val == 2)
        return '暂停任务'
    },
  },
  watch: {},
  components: {},
  created() {
    this.getVideoList()
  },
  mounted() {
    clearTimeout(this.timer)
    this.timer = setInterval(() => {
      this.refreshDroneInfo(this.sourceObj.droneId)
      // 要执行的函数
    }, 5000)
  },
  methods: {
    closeUAVDialog() {
      this.$emit('update:showUavDialog', false)
    },
    uavPTZControl(i) {
      var gimble = {
        droneId: this.sourceObj.droneId,
        pitch: 0,
        yaw: 0,
        roll: 0,
        focal: 0,
        resetGimble: 0
      }
      if (Math.abs(i) == 1) {
        gimble.pitch = i * 5
        gimbleCommand(gimble).then((res) => {
          if (res.data.code == '00000') {
          } else {
            this.$message({
              type: 'error',
              message: '云台控制命令发送失败!',
            })
          }
        })
      } else if (Math.abs(i) == 2) {
        gimble.yaw = (i / 2) * 5
        gimbleCommand(gimble).then((res) => {
          if (res.data.code == '00000') {
          } else {
            this.$message({
              type: 'error',
              message: '云台控制命令发送失败!',
            })
          }
        })
      } else if (Math.abs(i) == 3) {
        gimble.roll = (i / 3) * 5
        gimbleCommand(gimble).then((res) => {
          if (res.data.code == '00000') {
          } else {
            this.$message({
              type: 'error',
              message: '云台控制命令发送失败!',
            })
          }
        })
      } else if (i == 0) {
        gimble.resetGimble = 1
        gimbleCommand(gimble).then((res) => {
          if (res.data.code == '00000') {
          } else {
            this.$message({
              type: 'error',
              message: '云台控制命令发送失败!',
            })
          }
        })
      }
    },
    focalChange(value) {
      var command = {
        droneId: this.sourceObj.droneId,
        focal: value,
        camera: null,
        resetFocal: null
      }
      if (value == 0) {
        command.resetFocal = 1
      }
      cameraCommand(command).then((res) => {
        if (res.data.code == '00000') {
        } else {
          this.$message({
            type: 'error',
            message: '相机控制命令发送失败!',
          })
        }
      })
    },
    taskControl(i) {
      //0开始；1暂停；2继续；3停止；4返航
      //状态切换
      if (i == 0) {
        this.taskCode = 1//切换到任务中
      } else if (i == 1) {
        this.taskCode = 2//切换到暂停任务
      } else if (i == 2) {
        this.taskCode = 1//切换到任务中
      } else if (i == 3) {
        this.taskCode = 0//切换到无任务
      }
      this.droneCommand.taskControl = i
      this.droneCommand.droneId = this.sourceObj.droneId
      droneCommand(this.droneCommand).then((res) => {
        if (res.data.code == '00000') {
        } else {
          this.$message({
            type: 'error',
            message: '任务控制命令发送失败!',
          })
        }
      })
    },
    getVideoList() {
      this.videoList = [
        {
          id: 2,
          videoName: '广角镜头',
          videoUrl: this.sourceObj.rtmpAddress,
        },
        {
          id: 1,
          videoName: '变焦镜头',
          videoUrl: this.sourceObj.rtmpAddress,
        },
        {
          id: 3,
          videoName: '热成像镜头',
          videoUrl: this.sourceObj.rtmpAddress,
        },
      ]
    },
    changeVideo() {
      this.videoList.forEach((item) => {
        if (item.id == this.currentCameraId) {
          var video = document.getElementById('video-webrtc')
          var url = item.videoUrl
          this.player = new JSWebrtc.Player(url, {
            video: video,
            autoplay: true,
            onPlay: (obj) => {
              console.log('start play')
            },
          })
          var command = {
            droneId: this.sourceObj.droneId,
            focal: null,
            camera: this.currentCameraId,
          }
          cameraCommand(command).then((res) => {
            if (res.data.code == '00000') {
            } else {
              this.$message({
                type: 'error',
                message: '相机控制命令发送失败!',
              })
            }
          })
          return
        }
      })
    },
    refreshDroneInfo(droneId) {
      getDroneInfo(droneId)
        .then((response) => {
          var redata = response.data.data
          this.objInfo.lng = redata.longitude
          this.objInfo.lat = redata.latitude
          this.objInfo.height = redata.height
          this.objInfo.pitch = redata.pitch
          this.objInfo.yaw = redata.yaw
          this.objInfo.roll = redata.roll
          this.objInfo.energyPercent = redata.energyPercent + '%'
          this.objInfo.taskName = redata.taskName
          // direction 0-180 ：北-东-南
          // direction 0--180 ：北-西-南
          if (redata.direction > 0) {
            // 北-东的90度
            if (redata.direction < 90) {
              if (redata.direction < 45) {
                this.directionStr = '北偏东' + redata.direction + '度'
              } else {
                this.directionStr = '东偏北' + (redata.direction - 45) + '度'
              }
              // 东-南的90度
            } else {
              if (redata.direction < 135) {
                this.directionStr = '东偏南' + (redata.direction - 90) + '度'
              } else {
                this.directionStr = '南偏东' + (redata.direction - 135) + '度'
              }
            }
          } else {
            // 北-西的90度
            if (redata.direction > -90) {
              if (redata.direction > -45) {
                this.directionStr =
                  '北偏西' + Math.abs(redata.direction) + '度'
              } else {
                this.directionStr =
                  '北偏西' + (Math.abs(redata.direction) - 45) + '度'
              }
              // 西-南的90度
            } else {
              if (redata.direction > -135) {
                this.directionStr =
                  '西偏南' + (Math.abs(redata.direction) - 90) + '度'
              } else {
                this.directionStr =
                  '西偏南' + (Math.abs(redata.direction) - 135) + '度'
              }
            }
          }
          this.objInfo.direction = redata.direction
          this.objInfo.speed = redata.speed
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
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

.show-uav-dialog {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 710px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.uav-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.uav-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.uav-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.uav-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -33px;
}

.uav-switch-lens {
  position: absolute;
  left: 25px;
  margin-top: 30px;
  width: 130px;
}

.uav-task-font-border {
  position: absolute;
  left: 25px;
}

.uav-task-font {
  color: #ffffff;
}

.uav-lens-control {
  display: inline-block;
  width: 280px;
  width: 280px;
  height: 135px;
  text-align: left;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: rgba(58, 118, 146, 0.4);
  position: absolute;
  left: 170px;
  bottom: 5px;
}

.uav-lens-control-font {
  color: white;
  position: absolute;
  top: 0px;
  left: 115px
}

.uav-ptz-outer-ring {
  width: 110px;
  height: 110px;
  background-color: rgba(13, 31, 71, 0.7);
  border-radius: 50%;
  box-shadow: 0px 0px 4px rgba(21, 39, 83, 0.6);
  position: absolute;
  left: 90px;
  bottom: 0px;
}

.uav-ptz-inner-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgba(22, 46, 103, 0.7);
  box-shadow: 0px 0px 7px #162b60;
  position: relative;
  top: 10px;
  left: 10px;
}

.uav-ptz-up {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: -14px;
  left: 8px;
}

.uav-ptz-up:hover {
  color: #8cf4fe;
}

.uav-ptz-down {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: 62px;
  left: 7px;
  transform: rotate(180deg);
}

.uav-ptz-down:hover {
  color: #8cf4fe;
}

.uav-ptz-left {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: 23px;
  left: -33px;
  transform: rotate(270deg);
}

.uav-ptz-left:hover {
  color: #8cf4fe;
}

.uav-ptz-right {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: 23px;
  left: 48px;
  transform: rotate(90deg);
}

.uav-ptz-right:hover {
  color: #8cf4fe;
}

.uav-ptz-reset {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: 26px;
  left: 18px;
}

.uav-ptz-reset:hover {
  color: #8cf4fe;
}

.uav-ptz-turn-left {
  position: absolute;
  top: 3px;
  left: 10px;
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 15px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  padding: 0px;
}

.uav-ptz-turn-right {
  position: absolute;
  top: 3px;
  left: 205px;
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 15px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  width: 50px;
  height: 30px;
  padding: 0px;
}

.uav-focal-in {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 37px;
  left: 20px;
  padding: 0;
  border-width: 1px 0px 1px 1px;
  border-radius: 20% 0 0 20%;
  transform: rotate(90deg);
}

.uav-focal-in:hover {
  color: #8cf4fe;
}

.uav-focal-out {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 102px;
  left: 20px;
  padding: 0;
  border-radius: 0 0 20% 20%;
  border-width: 0 1px 1px 1px;
}

.uav-focal-out:hover {
  color: #8cf4fe;
}

.uav-focal-font {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  font-size: 14px;
  height: 40px;
  width: 22px;
  position: absolute;
  top: 60px;
  left: 20px;
  margin-top: 6px;
  padding: 3px;
  border-radius: 0;
  border-width: 0 1px 0 1px;
  border-style: solid;
  writing-mode: vertical-lr;
}

.uav-task-control {
  width: 190px;
  height: 135px;
  text-align: left;
  margin-left: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: rgba(58, 118, 146, 0.4);
  position: absolute;
  left: 460px;
  bottom: 5px;
}

.uav-task-control-font {
  position: absolute;
  top: 5px;
}

.uav-task-code-button {
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 15px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  padding: 0px;
  position: absolute;
}
</style>
