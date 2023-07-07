<template>
  <div>
    <div id="parkingProportion" style="width: 380px;height: 140px;margin-left: 50px;margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getParkingIncome} from "../../../api/marketAnalysis";

export default {
  name: "parkingProportion",
  data() {
    return {
      parkingProportionChart: undefined,
      parkingIncomeArray: [],
    }
  },
  mounted() {
    this.getEchartsData()
  },
  methods: {
    getEchartsData() {
      getParkingIncome().then(res => {
        if (res.data.code == '00000') {
          let parkingIncomeData = res.data.data
          for (let key in parkingIncomeData) {
            let listObj = new Object()
            listObj.name = parkingIncomeData[key].parkingName
            listObj.value = parkingIncomeData[key].parkingIncomeTotal
            this.parkingIncomeArray.push(listObj)
          }
          this.getParkingProportionEcharts()
        }
      })
    },
    getParkingProportionEcharts() {
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
              formatter: '{parking|各停车场}' + '\n\r' + '{parking|收费}',
              rich: {
                parking: {
                  fontSize: 16,
                  color: '#ffffff',
                },
              },
              emphasis: {
                show: true,
              }
            },
            data: this.parkingIncomeArray,
          }
        ]
      };
      this.parkingProportionChart = echarts.init(document.getElementById('parkingProportion'));
      this.parkingProportionChart.setOption(option)
    },
  },
}
</script>

<style scoped>

</style>
