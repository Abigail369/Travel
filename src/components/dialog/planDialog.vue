<template>
  <transition name="fade">
    <div class="show-plan-detail" v-if="showPlanDialog">
      <img src="../../../static/img/background/dialogDecorate.png" class="plan-left-top-decorate">
      <div class="plan-dialog-title">{{ sourceObj.planName }}</div>
      <el-button class="plan-dialog-cancel" icon="el-icon-close" @click="closePlanDialog"></el-button>
      <img src="../../../static/img/background/dialogDecorate.png" class="plan-right-bottom-decorate">
      <div class="file-detail">
        <div class="file-doc" ref="file"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import Config from "../../config"
import axios from 'axios';

let docx = require("docx-preview");
window.JSZip = require('jszip')

export default {
  name: "planDialog",
  props: {
    showPlanDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: {
      type: Object,
      required: true,
    },
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.planId) {
          this.init()
        }
      },
      deep: true,//检测深层变更
      immediate: true,// 强制立即执行回调
    },
  },
  mounted() {
  },
  methods: {
    closePlanDialog() {
      this.$emit('update:showPlanDialog', false)
    },
    init() {
      var url = Config.apiPrefix + '/admin/images/' + this.sourceObj.planFileUrl;
      axios({
        method: "get",
        url: url,
        responseType: "blob",
      }).then(({data}) => {
        docx.renderAsync(data, this.$refs.file)
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

.show-plan-detail {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 710px;
  height: 650px;
  position: absolute;
  right: 355px;
  top: 145px;
}

.plan-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 12px;
}

.plan-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 8px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.plan-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.plan-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -33px;
}

.file-detail {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 680px;
  height: 575px;
}

.file-doc {
  width: 100%;
  height: 575px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
