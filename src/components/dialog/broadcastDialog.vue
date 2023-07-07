<template>
  <transition name="fade">
    <div class="broadcast-dialog-box" v-if="showBroadcastDialog">
      <div class="broadcast-dialog-title">{{ sourceObj.speakerName }}</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="broadcast-dialog-left-top-decorate">
      <el-button class="broadcast-dialog-cancel" icon="el-icon-close" @click="closeBroadcastDialog"></el-button>
      <div>
        <span style="color: white;line-height: 40px;font-size: 15px">已有节目</span>
        <el-select size="small" clearable filterable multiple collapse-tags placeholder="请选择已有节目"
                   style="width:220px; font-size: 15px;"
                   @change="enableBroadcast()">
          <!--          <el-option ></el-option>-->
        </el-select>
        <el-button type="primary" size="small" @click="enableBroadcast()"
                   style="color: rgb(58, 118, 146);background-color: #ffffff;font-weight: bolder;border: 0;border-radius: 5px;">
          <span>搜索</span>
        </el-button>
      </div>
      <div>
        <span
          style="color: white;line-height: 40px;font-size: 15px;position:absolute;left:27px;top:102px">合成语音</span>
        <el-select size="small" clearable filterable multiple collapse-tags placeholder="请选择合成语音"
                   style="width:220px; font-size: 15px;position:absolute;left:92px;top:105px;">
          <!--          <el-option ></el-option>-->
        </el-select>
      </div>
      <el-input type="textarea" :rows="10" placeholder="请输入广播内容"
                style="position:absolute; left: 92px; top: 150px;width: 220px"></el-input>
      <el-button type="primary" size="small"
                 style="color: rgb(58, 118, 146);background-color: #ffffff;font-weight: bolder;border: 0;border-radius: 5px;position: absolute;right: 29px;top: 106px">
        <span>启用</span>
      </el-button>
      <img src="../../../static/img/background/dialogDecorate.png" class="broadcast-dialog-right-bottom-decorate">
    </div>
  </transition>
</template>

<script>
import $ from 'jquery'

export default {
  name: "broadcastDialog",
  props: {
    showBroadcastDialog: {
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
      detail: {},
    };
  },
  methods: {
    closeBroadcastDialog() {
      this.$emit('update:showBroadcastDialog', false)
    },
    enableBroadcast() {
      console.log("启用广播还没写！")
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

.broadcast-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 400px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.broadcast-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.broadcast-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.broadcast-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.broadcast-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -32px;
}
</style>
