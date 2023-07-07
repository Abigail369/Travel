<template>
  <transition name="fade">
    <div v-show="simulatorStaffShow" class="simulator-staff-detail-box">
      <div class="simulator-staff-title">模拟工作人员</div>
      <div class="simulator-staff-border"></div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="simulator-staff-cancel" icon="el-icon-close" @click="closeSimulatorStaff"></el-button>
      <div>
        <div v-show="switchCode == 0">
          <span class="simulator-staff-font" style="position: absolute; top: 74px;left: 50px">已关闭模拟工作人员</span>
          <el-button class="simulator-staff-open" @click="setState(0)">开启</el-button>
        </div>
        <div v-show="switchCode == 1">
          <span class="simulator-staff-font" style="position: absolute; top: 74px;left: 50px">已开启模拟工作人员</span>
          <el-button class="simulator-staff-open" @click="setState(1)">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {STAFF_SIM_PATHS} from "../../../config/simPath";

export default {
  name: "simulatorStaff",
  props: {
    simulatorStaffShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      switchCode: 0,
    }
  },
  methods: {
    closeSimulatorStaff() {
      this.$emit('update:simulatorStaffShow', false)
    },
    setState(flag) {
      if (flag == 0) {
        //开启模拟工作人员
        this.switchCode = 1
        this.$parent.createSim(STAFF_SIM_PATHS)
      } else if (flag == 1) {
        //关闭模拟工作人员
        this.switchCode = 0
        this.$parent.cleanSim(STAFF_SIM_PATHS)
      }
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

.simulator-staff-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 350px;
  height: 160px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.simulator-staff-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 138px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.simulator-staff-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.simulator-staff-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.simulator-staff-font {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
}

.simulator-staff-open {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  padding-top: 8px;
  height: 32px;
  width: 70px;
  position: absolute;
  top: 75px;
  right: 55px;
}
</style>
