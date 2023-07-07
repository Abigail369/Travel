<template>
  <div>
    <div id="forecastPassengerFlow" style="width: 925px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "forecastPassengerFlow",
  data() {
    return {
      forecastPassengerFlowChart: undefined,
    }
  },
  mounted() {
    this.getforecastPassengerFlow()
  },
  methods: {
    getforecastPassengerFlow() {
      let option = {
        xAxis: {
          data: ['5号', '6号', '7号', '8号', '9号', '10号'],
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
            data: ['8000', '5060', '4000', '5010', '7000', '2000', '6000'],
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
      this.forecastPassengerFlowChart = echarts.init(document.getElementById('forecastPassengerFlow'), null, {
          width: 925,
          height: 220,
        }
      );
      this.forecastPassengerFlowChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
