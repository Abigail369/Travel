<template>
  <div>
    <div class="market-analysis-frame-left">
      <div class="market-analysis-background-frame-normal" style="margin-top: 0">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">门票统计</div>
        <ticket-statistics></ticket-statistics>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">门票类型占比</div>
        <ticket-type></ticket-type>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">今日门票销售趋势</div>
        <today-ticket-trend></today-ticket-trend>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">门票销售渠道</div>
        <ticket-channel></ticket-channel>
      </div>
    </div>
    <div class="market-analysis-frame-center">
      <div class="market-analysis-background-frame-center">
        <total-income></total-income>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">销售占比</div>
        <sale-proportion></sale-proportion>
      </div>
      <div class="market-analysis-background-frame-normal" style="margin-left: 25px">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">销售趋势</div>
        <month-ticket-trend></month-ticket-trend>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">各停车场收入</div>
        <parking-income></parking-income>
      </div>
      <div class="market-analysis-background-frame-normal" style="margin-left: 25px">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">各停车场收费占比</div>
        <parking-proportion></parking-proportion>
      </div>
    </div>
    <div class="market-analysis-frame-right">
      <div class="market-analysis-background-frame-normal" style="margin-top: 0">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">商品销售量排名</div>
        <product-sales-volume-ranking></product-sales-volume-ranking>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">商品销售额排名</div>
        <product-sale-ranking></product-sale-ranking>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">商户销售量排名</div>
        <shop-sales-volume-ranking></shop-sales-volume-ranking>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img"/>
        <div class="market-analysis-title-font">商户销售额排名</div>
        <shop-sale-ranking></shop-sale-ranking>
      </div>
    </div>
  </div>
</template>

<script>
import titleArrow from '../../../static/img/analysis/titleArrow.png'
import ticketStatistics from "./marketAnalysis/ticketStatistics.vue";
import ticketType from "./marketAnalysis/ticketType.vue";
import todayTicketTrend from "./marketAnalysis/todayTicketTrend.vue";
import ticketChannel from "./marketAnalysis/ticketChannel.vue";
import totalIncome from "./marketAnalysis/totalIncome.vue";
import saleProportion from "./marketAnalysis/saleProportion.vue";
import monthTicketTrend from "./marketAnalysis/monthTicketTrend.vue";
import parkingIncome from "./marketAnalysis/parkingIncome.vue";
import parkingProportion from "./marketAnalysis/parkingProportion.vue";
import productSalesVolumeRanking from "./marketAnalysis/productSalesVolumeRanking.vue";
import productSaleRanking from "./marketAnalysis/productSaleRanking.vue";
import shopSalesVolumeRanking from "./marketAnalysis/shopSalesVolumeRanking.vue";
import shopSaleRanking from "./marketAnalysis/shopSaleRanking.vue";

export default {
  name: "marketAnalysisPage",
  components: {
    ticketStatistics,
    ticketType,
    todayTicketTrend,
    ticketChannel,
    totalIncome,
    saleProportion,
    monthTicketTrend,
    parkingIncome,
    parkingProportion,
    productSalesVolumeRanking,
    productSaleRanking,
    shopSalesVolumeRanking,
    shopSaleRanking,
  },
  data() {
    return {
      titleArrow: titleArrow,
    }
  },
}
</script>

<style scoped>
.market-analysis-frame-left {
  width: 450px;
  height: 830px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.market-analysis-frame-center {
  width: 925px;
  height: 830px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.market-analysis-frame-right {
  width: 450px;
  height: 830px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.market-analysis-background-frame-normal {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 450px;
  height: 190px;
  float: left;
  margin-top: 20px;
}

.market-analysis-background-frame-center {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 925px;
  height: 400px;
  float: left;
}

.market-analysis-img {
  width: 20px;
  margin: 10px 10px;
  float: left;
}

.market-analysis-title-font {
  color: #ffffff;
  font-size: 16px;
  font-weight: bolder;
  float: left;
  margin: 10px 0;
}

</style>
