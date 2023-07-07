<template>
  <div>
    <div class="predictive-alarm-frame-left">
      <div class="predictive-alarm-background-frame-normal" style="margin-top: 0">
        <img :src="titleArrow" class="predictive-alarm-img"/>
        <div class="predictive-alarm-title-font">今日天气</div>
        <weather></weather>
      </div>
      <img :src="titleArrow" class="predictive-alarm-img"/>
      <div class="predictive-alarm-background-frame-normal">
        <div class="predictive-alarm-title-font">近七日天气</div>
      </div>
      <div class="predictive-alarm-background-frame-normal">
        <img :src="titleArrow" class="predictive-alarm-img"/>
        <div class="predictive-alarm-title-font">近七日温度趋势</div>
        <temperature-trend></temperature-trend>
      </div>
    </div>
    <div class="predictive-alarm-frame-center">
      <div class="predictive-alarm-background-frame-center">
        <div>
          <h3 style=" color:#ffffff" align="left">{{ headlines[0] }}</h3>
          <h3 style=" color:#ffffff" align="left">{{ headlines[1] }}</h3>
          <h3 style=" color:#ffffff" align="left">{{ headlines[2] }}</h3>
        </div>
        <h1 style=" color:#21d5d5">未来七天预测</h1>
        <div class="predictive-alarm-background-frame-middle">
          <img :src="titleArrow" class="predictive-alarm-img"/>
          <div class="predictive-alarm-title-font">预测客流</div>
          <forecast-passenger-flow></forecast-passenger-flow>
        </div>
        <div class="predictive-alarm-background-frame-middle">
          <img :src="titleArrow" class="predictive-alarm-img"/>
          <div class="predictive-alarm-title-font">预测门票</div>
          <predict-tickets></predict-tickets>
        </div>
      </div>
    </div>
    <div class="predictive-alarm-frame-right">
      <div class="predictive-alarm-background-frame-normal" style="margin-top: 0">
        <img :src="titleArrow" class="predictive-alarm-img"/>
        <div class="predictive-alarm-title-font">节假日客流预测</div>
        <div>
          <div>
            <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('day')" style="margin-left: 10px">
              国庆节
            </el-button>
            <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('month')">儿童节</el-button>
            <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('year')">春节</el-button>
            <div id="passengerForecasting" style="width: 400px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
          </div>
        </div>
<!--        <div v-if="flag == 1">-->
        <passenger-forecasting></passenger-forecasting>
<!--      </div>-->
      </div>
      <div class="predictive-alarm-background-frame-normal">
        <img :src="titleArrow" class="predictive-alarm-img"/>
        <div class="predictive-alarm-title-font">历史同期客流和近七天同期客流对比</div>
        <flow-comparison></flow-comparison>
      </div>
      <div class="predictive-alarm-background-frame-normal">
        <img :src="titleArrow" class="predictive-alarm-img"/>
        <div class="predictive-alarm-title-font">历史同期门票和近七天同期门票对比</div>
        <ticket-comparison></ticket-comparison>
      </div>
    </div>
  </div>
</template>

<script>
import titleArrow from '../../../static/img/analysis/titleArrow.png'
import TemperatureTrend from "./predictiveAlarm/temperatureTrend.vue";
import PassengerForecasting from "./predictiveAlarm/passengerForecasting";
import TicketComparison from "./predictiveAlarm/ticketComparison";
import FlowComparison from "./predictiveAlarm/flowComparison";
import ForecastPassengerFlow from "./predictiveAlarm/forecastPassengerFlow";
import PredictTickets from "./predictiveAlarm/predictTickets";
import Weather from "./predictiveAlarm/weather";

export default {
  name: "",
  components: {
    Weather,
    PredictTickets,
    ForecastPassengerFlow,
    FlowComparison,
    TicketComparison,
    PassengerForecasting,
    TemperatureTrend,
  },
  data() {

    return {
      headlines: [
        '2022-10-20 09:56:37 天气 高温预警 最高温度29°',
        '2022-10-20 09:56:37 气象 灾害预警 千佛山景区可能发生泥石流',
        '2022-10-20 09:56:37 客流 客流预警 客流超过阈值80%'
      ],
      titleArrow: titleArrow,
    }
  },
}
</script>

<style scoped>
.predictive-alarm-frame-left {
  width: 450px;
  height: 830px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.predictive-alarm-frame-center {
  width: 925px;
  height: 850px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.predictive-alarm-frame-right {
  width: 450px;
  height: 830px;
  margin-top: 80px;
  margin-left: 25px;
  float: left;
}

.predictive-alarm-background-frame-normal {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 450px;
  height: 276px;
  float: left;
  margin-top: 20px;
}

.predictive-alarm-background-frame-middle {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 925px;
  height: 276px;
  float: left;
  margin-top: 20px;
}

.predictive-alarm-background-frame-center {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 925px;
  height: 850px;
  float: left;
}

.predictive-alarm-img {
  width: 20px;
  margin: 10px 10px;
  float: left;
}

.predictive-alarm-title-font {
  color: #ffffff;
  font-size: 16px;
  font-weight: bolder;
  float: left;
  margin: 10px 0;
}

</style>
