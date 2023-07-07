<template>
  <transition name="fade">
    <div class="fare-gate-detail-box" v-if="fareGateRightShow">
      <div class="fare-gate-border"></div>
      <div class="fare-gate-title">检票闸机</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="fare-gate-cancel" icon="el-icon-close" @click="closeFareGateDetail"></el-button>
      <div style="color:#ffffff; margin-top:30px;letter-spacing: 2px">该模块暂未开发</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "fareGate",
  props: {
    fareGateRightShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      fareGateData: [],
    }
  },
  methods: {
    closeFareGateDetail() {
      this.$emit('update:fareGateRightShow', false)
    },
  },
}
</script>

<style scoped>

/*特效——渐隐*/
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.fare-gate-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.fare-gate-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.fare-gate-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.fare-gate-search-box {
  height: 40px;
}

.fare-gate-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 70px;
  position: absolute;
  top: 69px;
  right: 40px;
}

.fare-gate-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}
</style>
