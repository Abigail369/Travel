<template>
  <transition name="fade">
    <div class="area-passenger-flow-dialog-box" v-show="showAreaPassengerFlowDialog">
      <div class="area-passenger-flow-dialog-title">{{ sourceObj.areaName }}</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="area-passenger-flow-dialog-left-top-decorate">
      <el-button class="area-passenger-flow-dialog-cancel" icon="el-icon-close"
                 @click="closeAreaPassengerFlowDialog"></el-button>
      <img src="../../../static/img/background/dialogDecorate.png"
           class="area-passenger-flow-dialog-right-bottom-decorate">
      <div class="area-passenger-flow-name" style="top:50px;">当前人数</div>
      <span class="area-passenger-flow-font" style="top:53px;">{{ sourceObj.currentTourists }}</span>
      <div class="area-passenger-flow-name" style="top:85px;">饱和人数</div>
      <span class="area-passenger-flow-font" style="top:88px;">{{ sourceObj.maxTourists }}</span>
      <div id="passengerDialogChart" style="position: absolute; top: 100px; left: 30px"></div>
    </div>
  </transition>
</template>

<script>
import * as echarts from "echarts";
import {getAreaPopulationOnSpecificDay} from '../../api/passengerflow'

export default {
  name: "areaPassengerFlowDialog",
  props: {
    showAreaPassengerFlowDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      passengerDialogChart: undefined,
    };
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.areaId) {
          this.initPassengerFlowList()
          this.getPassengerFlowList()
        }
      },
      deep: true,//检测深层变更
      immediate: true,// 强制立即执行回调
    },
  },
  mounted() {
    this.getPassengerFlowListTimer()
  },
  methods: {
    closeAreaPassengerFlowDialog() {
      this.$emit('update:showAreaPassengerFlowDialog', false)
    },
    initPassengerFlowList() {
      this.passengerDialogChart = echarts.init(document.getElementById('passengerDialogChart'), null, {
        width: 330,
        height: 200,
      })
    },
    getPassengerFlowListTimer() {
      return setInterval(() => {
        this.getPassengerFlowList()
      }, 1800000)
    },
    async getPassengerFlowList() {
      const date = new Date()
      var today = date.toISOString().split('T')[0]
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      var yesterday = new Date(year, month, day).toISOString().split('T')[0]
      let todayEchartsData = []
      let yesterdayEchartsData = []
      let todayData = {
        areaId: this.sourceObj.areaId,
        specificDate: today
      }
      await getAreaPopulationOnSpecificDay(todayData).then(res => {
        if (res.data.code == '00000') {
          todayEchartsData = res.data.data.slice(8, 18)
          //todo:实际入园游客需要跟检票闸机对接
          todayEchartsData.forEach(e => {
            this.totalPassengerFlow += e
          })
        }
      })
      let yesterdayData = {
        areaId: this.sourceObj.areaId,
        specificDate: yesterday
      }
      await getAreaPopulationOnSpecificDay(yesterdayData).then(res => {
        if (res.data.code == '00000') {
          yesterdayEchartsData = res.data.data.slice(8, 18)
        }
      })
      if (todayEchartsData.length > 0 || yesterdayEchartsData.length > 0) {
        let option = {
          xAxis: {
            data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
            name: '时',
            nameTextStyle: {
              verticalAlign: "top",
              padding: [10, 0, 0, -20],
            },
            axisLine: {
              lineStyle: {
                color: "white"
              }
            }
          },
          yAxis: {
            minInterval: 1,
            name: '人',
            nameTextStyle: {
              verticalAlign: "top",
            },
            splitLine: {show: false},
            grid: {
              left: 20,
            },
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
              show: true,
              lineStyle: {
                color: "white"
              },
              symbol: ['none', 'arrow'],
            }
          },
          tooltip: {
            trigger: 'axis',
            confine: true,
          },
          legend: {
            show: false,
            data: [
              {name: '今日'},
              {name: '昨日'}
            ],
          },
          series: [
            {
              name: '今日',
              data: todayEchartsData,
              smooth: true,
              type: 'line',
              symbolSize: 2,//拐点大小
              itemStyle: {
                color: "rgb(248,198,88)",
                lineStyle: {
                  color: "rgb(248,198,88)",
                  width: 'solid',
                }
              },
              endLabel: {
                show: true,
                formatter: function (params) {
                  return '今日'
                }
              }
            },
            {
              name: '昨日',
              data: yesterdayEchartsData,
              smooth: true,
              symbolSize: 2,//拐点大小
              itemStyle: {
                color: "rgb(2,252,14)",
                lineStyle: {
                  color: "rgb(2,252,14)",
                  width: 'dashed',
                }
              },
              type: 'line',
              endLabel: {
                show: true,
                formatter: function (params) {
                  return '昨日'
                }
              }
            }
          ]
        }
        this.passengerDialogChart.setOption(option)
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.area-passenger-flow-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 690px;
  width: 400px;
  height: 290px;
  position: absolute;
  right: 340px;
  top: 67px;
}

.area-passenger-flow-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 15px;
}

.area-passenger-flow-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.area-passenger-flow-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.area-passenger-flow-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -33px;
}

.area-passenger-flow-name {
  color: #7dc7de;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  left: 30px;
}

.area-passenger-flow-font {
  color: #ffffff;
  font-size: 16px;
  position: absolute;
  left: 110px;
}
</style>
