<template>
  <transition name="fade">
    <div class="market-analysis-detail-box">
      <div class="market-analysis-border"></div>
      <div class="market-analysis-title">营销分析</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="market-analysis-cancel" icon="el-icon-close" @click="closeMarketAnalysisDetail"></el-button>
      <div style="color:#ffffff; margin-top:30px;letter-spacing: 2px">该模块暂未开发</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "marketAnalysis",
  data(){
    return{}
  },
  methods:{
    closeMarketAnalysisDetail(){
      this.$parent.marketAnalysisRightShow = false
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

.market-analysis-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.market-analysis-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.market-analysis-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.market-analysis-search-button {
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

.market-analysis-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

</style>
