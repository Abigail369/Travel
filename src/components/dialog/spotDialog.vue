<template>
  <transition name="fade">
    <div v-show="showSpotDialog" class="spot-menu-box">
      <loading :active.sync="loading" :can-cancel="true" :is-full-page="false"/>
      <div class="spot-dialog-header">{{ sourceObj.spotName }}</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="spot-dialog-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="spot-dialog-right-bottom-decorate">
      <el-button class="spot-dialog-cancel" icon="el-icon-close" @click="closeSpotMenuDetail"></el-button>
      <el-row>
        <div class="spot-separator"></div>
      </el-row>
      <!--摄像头-->
      <el-row style="height:120px;">
        <el-col :span="6">
          <el-row style="height: 35px;"></el-row>
          <el-row><img class="spot-img-style" src="../../../static/img/pinIcon/camera.png"/></el-row>
          <el-row><span class="spot-font-style">摄像头</span></el-row>
        </el-col>
        <el-col :span="18">
          <div v-if="spotDetailObj.cameraList === undefined || spotDetailObj.cameraList.length <= 0"
               style="color: #ffffff;font-size:16px; margin:40px 0;">
            该景点附近无摄像头
          </div>
          <div style="padding-right: 20px;" v-else>
            <vue-horizontal ref="cameraHorizontal" class="horizontal" snap="start">
              <div v-for="item in  spotDetailObj.cameraList"
                   :key="item.cameraId"
                   style="height:120px; width:150px; margin: 0 2px; background-color: rgba(255,255,255,0.2); cursor: pointer;"
                   @click="cameraClick(item)">
                <img style="height:100px; width:150px;"
                     :src="Config.apiPrefix + '/admin/images/' + item.cameraThumbnail"/>
                <div style="margin-top: -4px; font-size: 14px;color: #ffffff">
                  <show-tooltips :txt-info="item.cameraName"></show-tooltips>
                </div>
              </div>
            </vue-horizontal>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="spot-separator"></div>
      </el-row>
      <!--地面广播-->
      <el-row style="height:60px;">
        <el-col :span="6">
          <el-row style="height: 5px;"></el-row>
          <el-row><img class="spot-img-style" src="../../../static/img/pinIcon/broadcast.png"/></el-row>
          <el-row><span class="spot-font-style">地面广播</span></el-row>
        </el-col>
        <el-col :span="18">
          <div v-if="spotDetailObj.speakerList === undefined || spotDetailObj.speakerList.length <= 0"
               style="color: #ffffff;font-size:16px; margin:15px 0;">
            该景点附近无广播
          </div>
          <div style="padding-right: 20px;margin-top: 10px;" v-else>
            <el-row>
              <vue-horizontal ref="broadcastHorizontal" class="horizontal" snap="start">
                <el-button v-for="item in spotDetailObj.speakerList" :key="item.speakerId" size="mini"
                           class="spot-speaker-btn" plain
                           @click="broadcastClick(item)">
                  {{ item.speakerName }}
                </el-button>
              </vue-horizontal>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="spot-separator"></div>
      </el-row>
      <!--全景照片-->
      <el-row style="height:120px;">
        <el-col :span="6">
          <el-row style="height: 35px;"></el-row>
          <el-row><img class="spot-img-style" src="../../../static/img/pinIcon/pano.png"/>
          </el-row>
          <el-row><span class="spot-font-style">全景照片</span></el-row>
        </el-col>
        <el-col :span="18">
          <div v-if="spotDetailObj.panoPictureList===undefined || spotDetailObj.panoPictureList.length <= 0"
               style="color: #ffffff;font-size:16px; margin:40px 0;">
            该景点目前暂无全景图
          </div>
          <div style="padding-right: 20px;" v-else>
            <vue-horizontal ref="panoHorizontal" class="horizontal" snap="start">
              <div v-for="item in spotDetailObj.panoPictureList"
                   :key="item.panoPicId"
                   style="height:120px; width:150px; margin: 0 2px; background-color: rgba(255,255,255,0.2); cursor: pointer;"
                   @click="panoClick(item)">
                <img style="height:100px;width:150px; "
                     :src="Config.apiPrefix + '/admin/images/mini-' + item.panoUrl"/>
                <div style="margin-top: -4px; font-size: 14px;color: #ffffff">
                  <show-tooltips :txt-info="item.panoName"></show-tooltips>
                </div>
              </div>
            </vue-horizontal>
          </div>
        </el-col>
      </el-row>
      <template>
        <v-out-pano :source-obj="panoObjToShow" :show-pano-box.sync="showPanoBox"></v-out-pano>
      </template>
      <camera-dialog :source-obj="cameraObjToshow" :show-camera-dialog.sync="showCameraDialog"></camera-dialog>
      <broadcast-dialog :source-obj="broadcastObjToshow"
                        :show-broadcast-dialog.sync="showBroadcastDialog"></broadcast-dialog>
    </div>
  </transition>
</template>

<script>
import VueHorizontal from 'vue-horizontal';
import ShowTooltips from "../util/textToolTip.vue"
import Config from "../../config";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {getSpotDetail} from "../../api/spot";
import cameraDialog from "./cameraDialog.vue";
import vOutPano from "./outdoorPano.vue";
import broadcastDialog from "./broadcastDialog.vue";

export default {
  props: {
    showSpotDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: {//要求传过来的对象包含spotName和spotId即可
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      Config,
      loading: true,
      spotDetailObj: {},
      //全景框
      showPanoBox: false,
      panoObjToShow: {},
      //摄像头
      showCameraDialog: false,
      cameraObjToshow: {},
      //广播
      showBroadcastDialog: false,
      broadcastObjToshow: {},
    };
  },
  components: {
    vOutPano,
    cameraDialog,
    VueHorizontal,
    ShowTooltips,
    Loading,
    broadcastDialog,
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.spotId) {
          //内容更换时要关闭show的子组件
          this.showCameraDialog = false;
          this.showBroadcastDialog = false;
          this.showPanoBox = false;
          //更新内容
          this.refreshSpotDetail();
        }
      },
      deep: true,
      immediate: true,
    },
    showSpotDialog: {
      handler: function (val, oldVal) {
        if (val === false) {
          this.spotDetailObj = {}//关闭时清空对象，使得下次刚加载时内容为空
        }
      },
      deep: false,
      immediate: true,
    },
  },
  mounted() {

  },
  methods: {
    panoClick(item) {
      //全景插件尽量先设置展示再更改内容
      this.showPanoBox = true;
      this.panoObjToShow = item;
    },
    broadcastClick(item) {
      this.broadcastObjToshow = item;
      this.showBroadcastDialog = true
    },
    cameraClick(item) {
      this.cameraObjToshow = item;
      this.showCameraDialog = true;
    },
    closeSpotMenuDetail() {
      this.$emit('update:showSpotDialog', false)
    },
    refreshSpotDetail() {
      let data = {
        spotId: this.sourceObj.spotId,
      }
      this.loading = true;
      getSpotDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.spotDetailObj = res.data.data;
          this.loading = false;
          this.refreshHorizontal();
        }
      })
    },
    refreshHorizontal() {
      this.$nextTick(() => {
        if (this.$refs.cameraHorizontal) {
          this.$refs.cameraHorizontal.refresh();//刷新使左右导航按钮出现
          this.$refs.cameraHorizontal.scrollToIndex(0);//到第一个位置
        }
        if (this.$refs.broadcastHorizontal) {
          this.$refs.broadcastHorizontal.refresh();
          this.$refs.broadcastHorizontal.scrollToIndex(0);
        }
        if (this.$refs.panoHorizontal) {
          this.$refs.panoHorizontal.refresh();
          this.$refs.panoHorizontal.scrollToIndex(0);
        }
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.spot-menu-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 500px;
  height: 420px;
  position: absolute;
  right: 355px;
  top: 176px;
}

.spot-dialog-header {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 15px;
}

.spot-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.spot-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.spot-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -11px;
  right: -32.5px;
}

.spot-separator {
  height: 1px;
  width: 92%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0;
  margin-left: 4%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.spot-img-style {
  width: 22px;
  height: 22px;
  margin-left: 5px;
}

.spot-font-style {
  font-size: 16px;
  color: #ffffff;
}

.spot-speaker-btn {
  padding: 10px 0px;
  margin-left: 0;
  margin-right: 3px;
  min-width: 75px;
  color: rgb(58, 118, 146);
  font-weight: bolder;
}

.horizontal {
  height: 100%;
}

.horizontal >>> .v-hl-btn svg {
  padding: 3px;
  height: 20px;
  width: 20px;
  opacity: 0.7;
}


</style>
