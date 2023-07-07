<template>
  <transition name="fade">
    <div v-if="simulatorVehicleShow" class="simulator-vehicle-detail-box">
      <div class="simulator-vehicle-title">模拟景区车辆</div>
      <div class="simulator-vehicle-border"></div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="simulator-vehicle-cancel" icon="el-icon-close" @click="closeSimulatorVehicle"></el-button>
      <div>
        <div v-show="switchCode == 0">
          <span class="simulator-vehicle-font" style="position: absolute; top: 74px;left: 50px">已关闭模拟车辆</span>
          <el-button class="simulator-vehicle-open" @click="setState(0)">开启</el-button>
        </div>
        <div v-show="switchCode == 1">
          <span class="simulator-vehicle-font" style="position: absolute; top: 74px;left: 50px">已开启模拟车辆</span>
          <el-button class="simulator-vehicle-open" @click="setState(1)">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {VEHICLE_SIM_PATHS} from "../../../config/simPath";

export default {
  name: "simulatorVehicle",
  props: {
    simulatorVehicleShow: {
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
    closeSimulatorVehicle() {
      this.$emit('update:simulatorVehicleShow', false)
    },
    setState(flag) {
      if (flag == 0) {
        //开启模拟车辆
        this.switchCode = 1
        this.$parent.createSim(VEHICLE_SIM_PATHS)
      } else if (flag == 1) {
        //关闭模拟车辆
        this.switchCode = 0
        this.$parent.cleanSim(VEHICLE_SIM_PATHS)
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

.simulator-vehicle-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 350px;
  height: 160px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.simulator-vehicle-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 138px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.simulator-vehicle-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.simulator-vehicle-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.simulator-vehicle-font {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
}

.simulator-vehicle-open {
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
