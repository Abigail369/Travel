<template>
  <transition name="fade">
    <div class="scenic-vehicle-detail-box">
      <div class="scenic-vehicle-border"></div>
      <div class="scenic-vehicle-title">景区车辆</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="scenic-vehicle-cancel" icon="el-icon-close" @click="closeScenicVehicleDetail"></el-button>
      <div style="color:#ffffff; margin-top:30px;letter-spacing: 2px">该模块暂未开发</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "scenicVehicleDetail",
  data() {
    return {}
  },
  methods: {
    closeScenicVehicleDetail() {
      this.$parent.scenicVehicleRightShow = false
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

.scenic-vehicle-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.scenic-vehicle-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.scenic-vehicle-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.scenic-vehicle-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}
</style>
