<template>
  <div>
    <div id="ticketComparison" style="width: 400px;height: 200px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ticketComparison",
  data() {
    return {
      ticketComparisonChart: undefined,
    }
  },
  mounted() {
    this.getticketComparison()
  },
  methods: {
    getticketComparison() {
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
        legend: {
          data: ['近七天', '历史同期'],
          y: 'bottom',
          textStyle: {
            color: 'white',
            fontSize: '10px',
            fontWeight: 500
          }
        },
        series: [
          {
            data: ['5000','4000', '5000', '6000', '4200', '2000'],
            name: '近七天',
            smooth: false,
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
            data: ['8000','5000', '1000', '5000', '4000', '3000'],
            name: '历史同期',
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
          },
        ]
      }
      this.ticketComparisonChart = echarts.init(document.getElementById('ticketComparison'), null, {
          width: 400,
          height: 220,
        }
      );
      this.ticketComparisonChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
