<template>
  <transition name="fade">
    <div class="show-camera-dialog" v-if="showCameraDialog">
      <img src="../../../static/img/background/dialogDecorate.png" class="camera-left-top-decorate">
      <div class="camera-dialog-title">{{ sourceObj.cameraName }}</div>
      <el-button class="camera-dialog-cancel" icon="el-icon-close" @click="closeCameraDialog"></el-button>
      <div style="width:96%;margin-left:20px;">
        <video crossorigin="anonymous" id="cameraVideo" autoplay autobuffer muted preload="auto"
               controls width="100%" height="480">
        </video>
        <div class="ptz-out-div"></div>
        <div v-if="sourceObj.cameraType == 1" class="ptz-outer-ring">
          <div class="ptz-inner-ring">
            <!--八角台-->
            <div class="ptz_top" v-on:mousedown="control('UP')" v-on:mouseup="stop('UP')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_bottom" v-on:mousedown="control('DOWN')" v-on:mouseup="stop('DOWN')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_back" v-on:mousedown="control('LEFT')" v-on:mouseup="stop('LEFT')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_right" v-on:mousedown="control('RIGHT')" v-on:mouseup="stop('RIGHT')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_top_left" v-on:mousedown="control('LEFT_UP')" v-on:mouseup="stop('LEFT_UP')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_bottom_left" v-on:mousedown="control('LEFT_DOWN')" v-on:mouseup="stop('LEFT_DOWN')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_top_right" v-on:mousedown="control('RIGHT_UP')" v-on:mouseup="stop('RIGHT_UP')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_bottom_right" v-on:mousedown="control('RIGHT_DOWN')" v-on:mouseup="stop('RIGHT_DOWN')">
              <i class="el-icon-caret-top"/>
            </div>
            <div class="ptz_refresh"><i class="el-icon-refresh"
                                        style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <!--变倍-->
            <div class="zoom-in" v-on:mousedown="control('ZOOM_IN')" v-on:mouseup="stop('ZOOM_IN')">
              <i class="el-icon-circle-plus-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <div class="zoom-font"><span style="position: relative;top:2px">变倍</span></div>
            <div class="zoom-out" v-on:mousedown="control('ZOOM_OUT')" v-on:mouseup="stop('ZOOM_OUT')">
              <i class="el-icon-remove-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <!--焦距-->
            <div class="focal-in" v-on:mousedown="control('FOCUS_NEAR')" v-on:mouseup="stop('FOCUS_NEAR')">
              <i class="el-icon-circle-plus-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <div class="focal-font"><span style="position: relative;top:2px">焦距</span></div>
            <div class="focal-out" v-on:mousedown="control('FOCUS_FAR')" v-on:mouseup="stop('FOCUS_FAR')">
              <i class="el-icon-remove-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <!--光圈-->
            <div class="iris-in" v-on:mousedown="control('IRIS_ENLARGE')" v-on:mouseup="stop('IRIS_ENLARGE')">
              <i class="el-icon-circle-plus-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
            <div class="iris-font"><span style="position: relative;top:2px">光圈</span></div>
            <div class="iris-out" v-on:mousedown="control('IRIS_REDUCE')" v-on:mouseup="stop('IRIS_REDUCE')">
              <i class="el-icon-remove-outline" style="font-size:18px;margin-top:4px;margin-left: 2px"/>
            </div>
          </div>

        </div>
        <div v-else style="color: #ffffff; margin-top:30px;letter-spacing:3px;font-size:18px;">该摄像头无云台控制功能
        </div>
      </div>
      <img src="../../../static/img/background/dialogDecorate.png" class="camera-right-bottom-decorate">
    </div>
  </transition>
</template>

<script>
import {getCameraControl, getCameraRtspUrl, terminateTemperateRtsp} from "../../api/camera";
import '../../utils/webrtcstreamer'
import Config from "../../config";
import {command} from "node-notifier/lib/utils";

export default {
  name: "cameraDetail.vue",
  props: {
    showCameraDialog: {
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
      webRtcServer: null,
      // ip: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/',
    };
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.cameraId) {
          this.initPlayer()
        }
      },
      deep: false,
      immediate: true,
    },
  },
  components: {},
  created() {
  },
  mounted() {
  },
  methods: {
    closeCameraDialog() {
      let data = {
        cameraId: this.sourceObj.cameraId,
      }
      terminateTemperateRtsp(data).then(res => {
        if (res.data.code == '00000') {
          this.$emit('update:showCameraDialog', false)
          this.webRtcServer.disconnect()
          this.webRtcServer = null
        }
      })
    },
    initPlayer() {
      let data = {
        cameraId: this.sourceObj.cameraId,
        streamType: 1,
        expand: "transcode=1&videotype=h264",
      }
      getCameraRtspUrl(data).then(res => {
        if (res.data.code == 'A0050') {
          alert(res.data.message)
        }
        if (res.data.code == '00000') {
          this.sourceObj.rtspUrl = res.data.data
          this.webRtcServer = new WebRtcStreamer("cameraVideo", Config.StreamerURL);
          console.log(this.sourceObj.rtspUrl)
          this.webRtcServer.connect(this.sourceObj.rtspUrl)
        }
      })
    },
    control(controlCommand) {
      console.log("点击了！", controlCommand)
      let data = {
        cameraIndexCode: this.sourceObj.cameraIndexCode,
        action: 0,
        command: controlCommand,
        speed: 20,
      }
      getCameraControl(data).then(res => {
      })
    },
    stop(controlCommand) {
      let data = {
        cameraIndexCode: this.sourceObj.cameraIndexCode,
        action: 1,
        command: controlCommand,
        speed: 20,
      }
      getCameraControl(data).then(res => {
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

.show-camera-dialog {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 710px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.camera-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.camera-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.camera-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.camera-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -33px;
}

/*.ptz-out-div {*/
/*  background-color: rgba(49, 91, 115, 0.5);*/
/*  position: absolute;*/
/*  top: 548px;*/
/*  left: 210px;*/
/*  width: 280px;*/
/*  height: 115px;*/
/*}*/

.ptz-outer-ring {
  width: 110px;
  height: 110px;
  background-color: rgba(13, 31, 71, 0.7);
  border-radius: 50%;
  box-shadow: 0px 0px 4px rgba(21, 39, 83, 0.6);
  position: absolute;
  left: 230px;
}

.ptz-inner-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgba(22, 46, 103, 0.7);
  box-shadow: 0px 0px 7px #162b60;
  position: relative;
  top: 10px;
  left: 10px;
}

/*云台控制*/
.ptz_top_left {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(315deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 0;
}

.ptz_top_left:hover {
  color: #8cf4fe;
}

.ptz_top {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -3px;
  left: 30px;
  padding: 0;
}

.ptz_top:hover {
  color: #8cf4fe;
}

.ptz_top_right {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(45deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  left: 58px;
  padding: 0;
}

.ptz_top_right:hover {
  color: #8cf4fe;
}

.ptz_back {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(270deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 31px;
  left: -4px;
  padding: 0;
}

.ptz_back:hover {
  color: #8cf4fe;
}

.ptz_refresh {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 31px;
  left: 30px;
  padding: 0;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 4px #fafafa;
  border-radius: 50%;
}

.ptz_right {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(90deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 32px;
  left: 64px;
  padding: 0;
}

.ptz_right:hover {
  color: #8cf4fe;
}

.ptz_bottom_left {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(225deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 57px;
  left: 5px;
  padding: 0;
}

.ptz_bottom_left:hover {
  color: #8cf4fe;
}

.ptz_bottom {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(180deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 65px;
  left: 30px;
  padding: 0;
}

.ptz_bottom:hover {
  color: #8cf4fe;
}

.ptz_bottom_right {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  font-size: 20px;
  transform: rotate(135deg);
  width: 30px;
  height: 30px;
  position: absolute;
  top: 57px;
  left: 57px;
  padding: 0;
}

.ptz_bottom_right:hover {
  color: #8cf4fe;
}

.zoom-in {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0px;
  left: 110px;
  padding: 0;
  border-radius: 20% 0 0 20%;
}

.zoom-in:hover {
  color: #8cf4fe;
}

.zoom-font {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  font-size: 16px;
  height: 30px;
  width: 35px;
  position: absolute;
  top: -3px;
  left: 140px;
  margin-top: 3px;
  padding: 0;
  border-radius: 0;
}

.zoom-out {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0px;
  left: 175px;
  padding: 0;
  border-radius: 0 20% 20% 0;
}

.zoom-out:hover {
  color: #8cf4fe;
}

.focal-in {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 35px;
  left: 110px;
  padding: 0;
  border-radius: 20% 0 0 20%;
}

.focal-in:hover {
  color: #8cf4fe;
}

.focal-font {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  font-size: 16px;
  height: 30px;
  width: 35px;
  position: absolute;
  top: 30px;
  left: 140px;
  padding: 0;
  margin-top: 5px;
  border-radius: 0;
}

.focal-out {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 35px;
  left: 175px;
  border-radius: 0 20% 20% 0;
}

.focal-out:hover {
  color: #8cf4fe;
}

.iris-in {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 70px;
  left: 110px;
  padding: 0;
  border-radius: 20% 0 0 20%;
}

.iris-in:hover {
  color: #8cf4fe;
}

.iris-font {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  font-size: 16px;
  height: 30px;
  width: 35px;
  position: absolute;
  top: 65px;
  left: 140px;
  padding: 0;
  margin-top: 5px;
  border-radius: 0;
}

.iris-out {
  background-color: rgba(22, 46, 103, 0.6);
  color: #fff;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 70px;
  left: 175px;
  border-radius: 0 20% 20% 0;
}

.iris-out:hover {
  color: #8cf4fe;
}
</style>
