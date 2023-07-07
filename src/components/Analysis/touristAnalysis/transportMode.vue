<template>
  <div>
    <div
      id="transportMode"
      style="width: 400px;height: 180px;margin-left: 30px;margin-top: 50px; "
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "transportMode",
  props: {
    ticketSale: {
      type: Number,
      default: 0
    },
    ticketChannelCount: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  watch: {
    ticketSale: {
      handler: function() {
        this.getTransportModeChart();
      }
    },
    ticketChannelCount: {
      handler: function() {
        this.getTransportModeChart();
      }
    }
  },
  methods: {
    getTransportModeChart() {
      // 渠道：0自营 1去哪儿网 2同程 3其他
      let channelList = ["自营", "去哪儿网", "同程", "其他"];
      let channelData = this.$props.ticketChannelCount;
      let total = 0;
      channelData.forEach(item => {
        total += item.channelCount;
      });
      let option = {
        color: ["#09afc6", "#67d412", "#1ea5fd", "#fec43a"],
        tooltip: {
          trigger: "item"
        },
        legend: {
          right: 50,
          top: "25%",
          orient: "vertical",
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          icon: "circle",
          formatter(name) {
            let value;
            channelData.forEach(item => {
              console.log(item);
              if (channelList[item.channel] == name) {
                value = item.channelCount;
              }
            });
            return [`${name} —— ${(value / total) * 100}%`].join("\n");
          }
        },
        graphic: {
          //图形中间文字
          type: "text",
          left: "26.5%",
          top: "center",
          style: {
            text: `${this.$props.ticketSale}\n金额`,
            textAlign: "center",
            fill: "#fff",
            fontSize: 14
          }
        },
        series: [
          //内圈阴影
          {
            name: "",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["30%", "45%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            emphasis: {
              scale: false //鼠标划上不展示高亮放大效果
            },
            data: this.$props.ticketChannelCount.map(item => {
              return {
                value: item.channelCount,
                name: channelList[item.channel],
                itemStyle: {
                  opacity: 0.3
                }
              };
            })
          },
          //外圈
          {
            name: "",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["45%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: this.$props.ticketChannelCount.map(item => {
              return {
                value: item.channelCount,
                name: channelList[item.channel]
              };
            })
          }
        ]
      };
      let chart = echarts.init(document.getElementById("transportMode"));
      chart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
