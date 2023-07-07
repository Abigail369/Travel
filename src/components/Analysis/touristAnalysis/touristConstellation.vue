<template>
  <div>
    <div
      id="touristConstellation"
      style="width: 400px;height: 160px;margin-left: 30px;margin-top: 30px;"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "touristConstellation",
  props: {
    constellationList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    constellationData: function() {
      return this.$props.constellationList;
    }
  },
  mounted() {
    this.getConstellationData();
  },
  watch: {
    constellationData: function(newVal) {
      this.getConstellationData();
    }
  },
  methods: {
    getConstellationData() {
      // 将星座数据处理为百分比数据
      let obj = this.constellationData;
      let sum = 0;
      let percentageData = [];
      Object.keys(obj).forEach(key => {
        percentageData.push({
          name: key,
          value: obj[key],
          percentage: 0
        });
        sum += obj[key];
      });
      percentageData.forEach(
        item => (item.percentage = (item.value / sum).toFixed(3) * 100)
      );

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
            rotate: 40,
            color: "#fff",
            fontSize: 10,
            align: "center",
            margin: 12,
            fontWeight: 100
          },
          data: Object.keys(obj).map(item => item.slice(0, 2))
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
            data: percentageData.map(item => item.percentage),
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

      let chart = echarts.init(document.getElementById("touristConstellation"));
      chart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
