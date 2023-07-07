<template>
  <div>
    <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('day')" style="margin-left: 40px">
      当天
    </el-button>
    <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('month')">当月</el-button>
    <el-button class="market-analysis-total-income-button" @click="changeIncomeDate('year')">当年</el-button>
    <div class="market-analysis-total-income-center">
      <div v-if="flag == 1">
        <div class="market-analysis-total-income-center-font">今日总收入</div>
        <div class="market-analysis-total-income-center-bk">
          <div v-for="(item, index) in todayIncomeArray" :key="index">
            <div class="market-analysis-total-income-center-box"><span>{{ item }}</span></div>
          </div>
        </div>
        <div class="market-analysis-total-income-bottom">
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/ticket.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>今日售票：46张</span><br/>
            <span>销售金额：860元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/parking.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>今日停车：100辆</span><br/>
            <span>销售金额：1200元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/product.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>电商销售：20件</span><br/>
            <span>销售金额：460元</span>
          </div>
        </div>
      </div>
      <div v-else-if="flag == 2">
        <div class="market-analysis-total-income-center-font">本月总收入</div>
        <div class="market-analysis-total-income-center-bk">
          <div v-for="(item, index) in monthIncomeArray" :key="index">
            <div class="market-analysis-total-income-center-box"><span>{{ item }}</span></div>
          </div>
        </div>
        <div class="market-analysis-total-income-bottom">
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/ticket.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>本月售票：246张</span><br/>
            <span>销售金额：1860元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/parking.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>本月停车：500辆</span><br/>
            <span>销售金额：1200元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/product.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>电商销售：120件</span><br/>
            <span>销售金额：1460元</span>
          </div>
        </div>
      </div>
      <div v-else-if="flag == 3">
        <div class="market-analysis-total-income-center-font">本年总收入</div>
        <div class="market-analysis-total-income-center-bk">
          <div v-for="(item, index) in yearIncomeArray" :key="index">
            <div class="market-analysis-total-income-center-box"><span>{{ item }}</span></div>
          </div>
        </div>
        <div class="market-analysis-total-income-bottom">
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/ticket.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>本年售票：546张</span><br/>
            <span>销售金额：2660元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/parking.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>本年停车：100辆</span><br/>
            <span>销售金额：1200元</span>
          </div>
          <img class="market-analysis-total-income-img" src="../../../../static/img/analysis/product.png"/>
          <div class="market-analysis-total-income-bottom-font">
            <span>电商销售：20件</span><br/>
            <span>销售金额：460元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArray} from "../../../utils";

export default {
  name: "totalIncome",
  data() {
    return {
      flag: 1,
      todayIncome: 1172086,
      todayIncomeArray: [],
      monthIncome: 2134567,
      monthIncomeArray: [],
      yearIncome: 3256781,
      yearIncomeArray: [],
    }
  },
  mounted() {
    //todo:这个函数实际应该放在今日总收入计算完毕后调用
    this.getIncome()
  },
  methods: {
    changeIncomeDate(index) {
      if (index == 'day') this.flag = 1
      else if (index == 'month') this.flag = 2
      else if (index == 'year') this.flag = 3
    },
    getIncome() {
      this.todayIncomeArray = getArray(this.todayIncome)
      this.monthIncomeArray = getArray(this.monthIncome)
      this.yearIncomeArray = getArray(this.yearIncome)
    },
  },
}
</script>

<style scoped>
.market-analysis-total-income-button {
  height: 25px;
  width: 60px;
  padding: 5px;
  float: left;
  background-color: #002163;
  color: #ffffff;
  margin-top: 20px;
  margin-left: 10px;
  border: 1px solid #00ced8;
}

.market-analysis-total-income-center {
  background-color: rgba(8, 36, 108, 0.6);
  width: 880px;
  height: 320px;
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

.market-analysis-total-income-center-font {
  font-size: 30px;
  font-weight: bolder;
  width: 300px;
  margin-left: 290px;
  margin-top: 20px;
  background: linear-gradient(to right, #0682f8 30%, #00e9fe 50%, #0085fe 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.market-analysis-total-income-center-bk {
  width: 500px;
  height: 60px;
  margin-left: 180px;
  margin-top: 15px;
}

.market-analysis-total-income-center-box {
  display: inline-block;
  background: url("../../../../static/img/analysis/incomeBackground.png") no-repeat center center;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  color: #00fdf8;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
  float: left;
  margin-left: 20px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

.market-analysis-total-income-center-box span {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 10px;
}

.market-analysis-total-income-bottom {
  width: 860px;
  height: 100px;
  margin-top: 50px;
  margin-left: 30px;
}

.market-analysis-total-income-img {
  width: 70px;
  float: left;
}

.market-analysis-total-income-bottom-font {
  color: #ffffff;
  float: left;
  width: 200px;
  height: 70px;
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
