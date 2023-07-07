<template>
  <div>
    <div id="passengerForecasting" style="width: 400px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "passengerForecasting",
  data() {
    return {
      passengerForecastingChart: undefined,
    }
  },
  mounted() {
    this.getpassengerForecasting()
  },
  methods: {
    changeIncomeDate(index) {
      if (index == 'day') this.flag = 1
      else if (index == 'month') this.flag = 2
      else if (index == 'year') this.flag = 3
    },
    getpassengerForecasting() {
      let option = {
        xAxis: {
          data: ['11号', '12号', '13号', '14号', '15号', '16号'],
          axisLine: {
            show: false,
            lineStyle: {color: "#ffffff"}
          },
          axisTick: {show: false},
          nameTextStyle: {
            verticalAlign: "top",
            padding: [10, 0, 0, -20],
          },
        },
        yAxis: {
          minInterval: 10,
          nameTextStyle: {
            verticalAlign: "top",
          },
          splitLine: {show: false},
          axisLabel: {
            margin: 5,
            formatter: function (value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + "万";
              } else if (value >= 10000000) {
                value = value / 10000000 + "千万";
              }
              return value;
            }
          },
          axisLine: {
            show: false,
            lineStyle: {color: "#ffffff"}
          },
          axisTick: {show: false},
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
        },
        series: [
          {
            data: ['500', '500', '620', '510', '400', '500', '200', '200', '380', '300', '200'],
            smooth: false,
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 6,//拐点大小
            itemStyle: {
              color: "rgb(3,111,153)",
              lineStyle: {
                color: "rgb(3,111,153)",
                width: '10',
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgb(3,111,153)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(3,111,153,0)' // 100% 处的颜色
                }],
              },
            },
          },
        ]
      }
      this.passengerForecastingChart = echarts.init(document.getElementById('passengerForecasting'), null, {
          width: 400,
          height: 220,
        }
      );
      this.passengerForecastingChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>

