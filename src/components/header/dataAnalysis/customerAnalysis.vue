<template>
  <transition name="fade">
    <div class="customer-analysis-detail-box">
      <div class="customer-analysis-border"></div>
      <div class="customer-analysis-title">客源分析</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="customer-analysis-cancel" icon="el-icon-close" @click="closeCustomerAnalysisDetail"></el-button>
      <div style="color:#ffffff; margin-top:30px;letter-spacing: 2px">该模块暂未开发</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "customerAnalysis",
  data(){
    return{}
  },
  methods:{
    closeCustomerAnalysisDetail(){
      this.$parent.customerAnalysisRightShow = false
    }
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

.customer-analysis-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.customer-analysis-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.customer-analysis-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.customer-analysis-search-button {
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

.customer-analysis-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

</style>
