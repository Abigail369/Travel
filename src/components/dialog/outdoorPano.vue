<template>
  <transition name="fade">
    <div class="outdoor-pano-dialog-box" v-show="showPanoBox">
      <div class="outdoor-pano-dialog-title">{{ sourceObj.panoName }}</div>
      <el-button class="outdoor-pano-dialog-cancel" icon="el-icon-close" @click="closePanorama()"></el-button>
      <img src="../../../static/img/background/dialogDecorate.png" class="outdoor-pano-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="outdoor-pano-right-bottom-decorate">
      <div :id="viewer" class="outdoor-pano"></div>
    </div>
  </transition>
</template>

<script>
import {Viewer} from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import Config from "../../config"
import {deg2rad} from "../../utils";

export default {
  name: "vrPano",
  props: {
    showPanoBox: {
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
      viewer: "viewer",
      PSV: null,
    };
  },
  computed: {},
  watch: {
    /**全景插件尽量先设置展示再更改内容,例如
     *   this.showPanoBox = true;
     *   this.panoObjToShow = item;
     *  否则可能会出现图片显示不全的问题*/
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.panoPicId) {
          this.initData();
        }
      },
      deep: true,//检测深层变更
      immediate: true,// 强制立即执行回调
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    closePanorama() {
      this.$emit('update:showPanoBox', false)
    },
    initPhotoSphere() {
      this.PSV = new Viewer({
        container: this.viewer,
        panorama: Config.apiPrefix + '/admin/images/' + this.sourceObj.panoUrl,
        defaultLong: this.sourceObj.longitude * deg2rad, // 初始经度位置(初始角度)"latitude":0.1258,"longitude":4.6211
        defaultLat: this.sourceObj.latitude * deg2rad, // 初始纬度位置(初始角度)
        navbar: [
          'autorotate',
          'zoom',
          'move',
          'fullscreen',
        ],
      });
    },
    initData() {
      if (this.PSV) {
        //全景插件已经初始化，仅设置参数即可
        this.PSV.setPanorama(
          Config.apiPrefix + '/admin/images/' + this.sourceObj.panoUrl,
          {defaultLong: this.sourceObj.longitude * deg2rad, defaultLat: this.sourceObj.latitude * deg2rad},
        );
      } else {
        //全景插件没有被初始化，先进行初始化
        this.$nextTick(() => {
          this.initPhotoSphere();
        });
      }
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

.outdoor-pano-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 630px 720px;
  width: 630px;
  height: 620px;
  position: fixed;
  right: 345px;
  top: 175px;
  z-index: 15;
}

.outdoor-pano-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.outdoor-pano-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.outdoor-pano-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.outdoor-pano-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -25px;
}

.outdoor-pano {
  position: absolute;
  top: 8%;
  left: 2%;
  width: 96%;
  height: 88%;
}

</style>
