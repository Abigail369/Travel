<template>
  <div>
    <div id="todayTicketTrend" style="width: 400px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "todayTicketTrend",
  data() {
    return {
      todayTicketTrendChart: undefined,
    }
  },
  mounted() {
    this.getTodayTicketTrend()
  },
  methods: {
    getTodayTicketTrend() {
      let option = {
        xAxis: {
          data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
          name: '时',
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
          name: '元',
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
            data: ['5000', '5600', '6200', '5100', '4000', '5000', '6000', '4200', '3800', '3000', '2000'],
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
      this.todayTicketTrendChart = echarts.init(document.getElementById('todayTicketTrend'), null, {
          width: 400,
          height: 220,
        }
      );
      this.todayTicketTrendChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
