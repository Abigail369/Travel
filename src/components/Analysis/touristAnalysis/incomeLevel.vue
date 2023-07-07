<template>
  <div>
    <div
      id="incomeLevel"
      style="width: 400px;height: 160px;margin-left: 30px;margin-top: 30px;"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "incomeLevel",

  data() {
    return {};
  },

  mounted() {
    this.getIncomeLevel();
  },

  methods: {
    getIncomeLevel() {
      let option = {
        grid: {
          left: "7%",
          right: "0%",
          bottom: "18%",
          top: "9%"
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b0}: {c0}%"
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(180, 180, 180, 0.1)"
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
            fontSize: 10,
            align: "center",
            margin: 12,
            fontWeight: 100
          },
          data: ["1k-2k", "2k-3k", "3k-4k", "4k-5k", "5k-8k", "8k以上"]
        },
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function(value) {
                return value + "%";
              },
              color: "#fff",
              fontSize: 10
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(180, 180, 180, 0.1)"
              }
            }
          }
        ],
        series: [
          {
            data: [8, 11, 10, 16, 13, 9],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
              borderRadius: [30, 30, 0, 0]
            },
            barWidth: 12,
            itemStyle: {
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgb(14, 130, 240)"
                  },
                  {
                    offset: 1,
                    color: "rgb(6, 166, 252)"
                  }
                ])
              }
            }
          }
        ]
      };

      let chart = echarts.init(document.getElementById("incomeLevel"));
      chart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
