<template>
  <div>
    <div class="market-analysis-frame-left">
      <div
        class="market-analysis-background-frame-normal"
        style="margin-top: 0"
      >
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">游客性别</div>
        <tourist-gender :genderCount="genderCount"></tourist-gender>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">游客年龄</div>
        <tourist-age :tourist-age="touristAge"></tourist-age>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">游客星座</div>
        <tourist-constellation
          :constellationList="constellationList"
        ></tourist-constellation>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">驻留时长</div>
        <resident-duration></resident-duration>
      </div>
    </div>

    <div class="market-analysis-frame-center">
      <div class="market-analysis-background-frame-center">
        <popularword-statistics></popularword-statistics>
      </div>
      <div class="market-analysis-background-frame-large">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">交通方式</div>
        <transport-mode
          :ticket-sale="ticketSale"
          :ticket-channel-count="ticketChannelCount"
        ></transport-mode>
      </div>
      <div
        class="market-analysis-background-frame-large"
        style="margin-left: 25px"
      >
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">出行方式</div>
        <travel-mode :travelling-ways="travellingWays"></travel-mode>
      </div>
    </div>

    <div class="market-analysis-frame-right">
      <div
        class="market-analysis-background-frame-normal"
        style="margin-top: 0"
      >
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">停车场数据</div>
        <carport-data></carport-data>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">收入水平</div>
        <income-level></income-level>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">职业排名</div>
        <career-ranking></career-ranking>
      </div>
      <div class="market-analysis-background-frame-normal">
        <img :src="titleArrow" class="market-analysis-img" />
        <div class="market-analysis-title-font">学历排名</div>
        <academic-ranking></academic-ranking>
      </div>
    </div>
  </div>
</template>

<script>
import titleArrow from "../../../static/img/analysis/titleArrow.png";

import touristGender from "./touristAnalysis/touristGender.vue";
import touristAge from "./touristAnalysis/touristAge.vue";

import touristConstellation from "./touristAnalysis/touristConstellation.vue";
import residentDuration from "./touristAnalysis/residentDuration.vue";

import popularwordStatistics from "./touristAnalysis/popularwordStatistics.vue";
import transportMode from "./touristAnalysis/transportMode.vue";
import travelMode from "./touristAnalysis/travelMode.vue";

import incomeLevel from "./touristAnalysis/incomeLevel.vue";

import carportData from "./touristAnalysis/carportData.vue";
import careerRanking from "./touristAnalysis/careerRanking.vue";
import academicRanking from "./touristAnalysis/academicRanking.vue";

import {
  getTouristAnalysis,
  getTicketDetailByDate
} from "../../api/touristAnalysis";

export default {
  name: "touristAnalysisPage",
  components: {
    touristGender,
    touristAge,
    touristConstellation,
    residentDuration,
    popularwordStatistics,
    transportMode,
    travelMode,
    incomeLevel,
    carportData,
    careerRanking,
    academicRanking
  },
  data() {
    return {
      titleArrow: titleArrow,
      constellationList: {}, //游客星座
      genderCount: [0, 0], //游客性别 [男,女]
      touristAge: [0, 0, 0, 0], //游客年龄 [40岁以下,40-50,50-65,65以上]
      travellingWays: [0, 0], //出行方式 [自驾,跟团]

      ticketSale: 0, //售票总金额
      ticketChannelCount: [] //购买渠道统计
    };
  },
  mounted() {
    this.getTouristAnalysis();
    this.getTicketDetailByDate();
  },
  methods: {
    getTouristAnalysis() {
      getTouristAnalysis().then(res => {
        if (res.data.code == "00000") {
          // console.log(res.data.data[0]);
          let allData = res.data.data[0];
          // 游客性别
          this.genderCount = [allData.maleCount || 0, allData.femaleCount || 0];
          // 游客年龄
          this.touristAge = [
            allData.fortyCount || 0,
            allData.fiftyCount || 0,
            allData.sixtyFiveCount || 0,
            allData.overSixtyFiveCount || 0
          ];
          console.log(this.touristAge);
          // 游客星座
          this.constellationList = allData.constellationList[0] || {};
          // 出行方式
          this.travellingWays = [
            allData.doItYourselfTourCount || 0,
            allData.packageTourCount || 0
          ];
        }
      });
    },
    getTicketDetailByDate() {
      let date = new Date().toLocaleDateString().replace(/\//g, "-");
      getTicketDetailByDate(date).then(res => {
        if (res.data.code == "00000") {
          let allData = res.data.data;
          this.ticketSale = allData.ticketSale;
          this.ticketChannelCount = allData.ticketChannelCount;
        }
      });
    }
  }
};
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

.market-analysis-background-frame-large {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 450px;
  height: 251px;
  float: left;
  margin-top: 20px;
}

.market-analysis-background-frame-center {
  background-color: #1a3358;
  box-shadow: 0px 0px 8px #0865b2;
  width: 925px;
  height: 550px;
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
