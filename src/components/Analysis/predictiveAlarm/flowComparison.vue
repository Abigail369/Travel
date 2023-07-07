<template>
  <div>
    <div id="flowComparison" style="width: 400px;height: 270px;margin-left: 30px;margin-top: 10px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "flowComparison",
  data() {
    return {
      flowComparisonChart: undefined,
    }
  },
  mounted() {
    this.getflowComparison()
  },
  methods: {
    getflowComparison() {
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
            data: ['500', '560', '600', '510', '400', '500', '600'],
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
            data: ['800', '560', '400', '810', '400', '500', '100'],
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
      this.flowComparisonChart = echarts.init(document.getElementById('flowComparison'), null, {
          width: 400,
          height: 220,
        }
      );
      this.flowComparisonChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
