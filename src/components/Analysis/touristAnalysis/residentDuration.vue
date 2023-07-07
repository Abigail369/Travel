<template>
  <div>
    <div
      id="residentDuration"
      style="width: 400px;height: 160px;margin-left: 30px;margin-top: 30px;"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "residentDuration",

  data() {
    return {};
  },

  mounted() {
    this.getResidentDuration();
  },

  methods: {
    getResidentDuration() {
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
          data: ["1小时以下", "1-2", "2-3", "3-4", "4-5", "5-6", "6小时以上"]
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
            data: [7, 8, 7, 9, 6, 4, 5],
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

      let chart = echarts.init(document.getElementById("residentDuration"));
      chart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
