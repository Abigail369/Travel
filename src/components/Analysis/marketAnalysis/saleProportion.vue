<template>
  <div>
    <div id="saleProportion" style="width: 380px;height: 140px;margin-left: 50px;margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getParkingIncome} from "../../../api/marketAnalysis";

export default {
  name: "saleProportion",
  data() {
    return {
      saleProportionChart: undefined,
      totalNum: 0,//到时候对接后端接口
      ticketNum: 0,
      parkingNum: 0,
      productNum: 0,
      OtherNum: 0,
    }
  },
  mounted() {
    this.getEchartsData()
  },
  methods: {
    async getEchartsData() {
      this.ticketNum = 1200//后端暂时没写好
      this.productNum = 500//后端暂时没写好
      await getParkingIncome().then(res => {
        if (res.data.code == '00000') {
          let parkingIncomeData = res.data.data
          for (let key in parkingIncomeData) {
            this.parkingNum += parkingIncomeData[key].parkingIncomeTotal
          }
        }
      })
      this.totalNum = this.ticketNum + this.parkingNum + this.productNum + this.OtherNum
      //所有数据都装载好了以后画图
      this.getSaleProportionEcharts()
    },
    getSaleProportionEcharts() {
      let option = {
        legend: {
          orient: 'vertical',
          left: 220,
          top: 25,
          padding: 2,
          textStyle: {
            color: 'white'
          }
        },

        series: [
          {
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['50%', '90%'],
            label: {
              show: true,
              position: 'center',
              color: '#4c4a4a',
              formatter: '{total|' + this.totalNum + '}' + '\n\r' + '{font|门票}',
              rich: {
                total: {
                  fontSize: 16,
                  color: '#ffffff',
                },
                font: {
                  fontSize: 16,
                  color: '#ffffff',
                },
              },
              emphasis: {
                show: true,
              }
            },
            data: [
              {
                value: this.ticketNum,
                name: '门票',
                itemStyle: {color: '#fc8251'},
              },
              {
                value: this.parkingNum,
                name: '停车',
                itemStyle: {color: '#ecb518'},
              },
              {
                value: this.productNum,
                name: '电商',
                itemStyle: {color: '#65e8f5'},
              },
              {
                value: this.OtherNum,
                name: '其他',
                itemStyle: {color: '#73f565'},
              }
            ]
          }
        ]
      };
      this.saleProportionChart = echarts.init(document.getElementById('saleProportion'));
      this.saleProportionChart.setOption(option)
    },
  },
}
</script>

<style scoped>

</style>
