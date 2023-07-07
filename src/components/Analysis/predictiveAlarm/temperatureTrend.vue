<template>
  <div>
    <div id="temperatureTrend" style="width: 400px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "temperatureTrend",
  data() {
    return {
      temperatureTrendChart: undefined,
    }
  },
  mounted() {
    this.gettemperatureTrend()
  },
  methods: {
    gettemperatureTrend() {
      let option = {
        xAxis: {
          data: ['18号','19号','20号','21号','22号','23号','24号'],
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
            data: ['15', '20', '18', '23', '20', '14','15'],
            smooth: true,
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 6,//拐点大小
            itemStyle: {
              color: "rgb(255,165,0)",
              lineStyle: {
                color: "rgb(255,165,0)",
                width: '10',
              }
            },
          },
          {
            data: ['6', '11', '9', '14', '10', '8','10'],
            smooth: true,
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
          },
        ]
      }
      this.temperatureTrendChart = echarts.init(document.getElementById('temperatureTrend'), null, {
          width: 400,
          height: 220,
        }
      );
      this.temperatureTrendChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
