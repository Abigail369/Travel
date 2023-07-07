<template>
  <div class="left-charts">
    <div class="alarm">
      <div class="alarm-title">今日异常报警列表</div>
      <img src="../../../static/img/background/decorateSimple.png"
           style="width:330px;height: 35px;position:absolute; left: 10px;top:10px"/>
      <el-row>
        <el-col :span="8">
          <el-row class="alarm-font">已处理：<span style="color: #cdd25a">{{ processedWarning }}</span></el-row>
          <el-row class="alarm-font">未处理：<span style="color: #cdd25a">{{ unprocessedWarning }}</span></el-row>
        </el-col>
        <el-col :span="16">
          <div id="leftAlarmAnalysis"
               style="height: 100%;width: 100%;display: inline-block;vertical-align: top;margin-top: 5px"></div>
        </el-col>
      </el-row>
      <div class="alarm-title">区域客流情况</div>
      <img src="../../../static/img/background/decorateSimple.png"
           style="width:330px;height: 35px;position:absolute; left: 10px;top:145px"/>
      <el-row>
        <el-col :span="6">
          <div class="level-1-Box"></div>
          <span class="description-font" style="margin-left:10px">畅通(50%)</span>
        </el-col>
        <el-col :span="9">
          <div class="level-2-Box"></div>
          <span class="description-font" style="margin-left:10px">基本畅通(50-80%)</span>
        </el-col>
        <el-col :span="9">
          <div class="level-3-Box"></div>
          <span class="description-font" style="margin-left:10px">轻度拥堵(80-90%)</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="level-4-Box"></div>
          <span class="description-font" style="margin-left:10px">中度拥堵(90-100%)</span>
        </el-col>
        <el-col :span="12">
          <div class="level-5-Box"></div>
          <span class="description-font" style="margin-left:10px">严重拥堵(超过100%)</span>
        </el-col>
      </el-row>
      <el-row>
        <span class="passenger-flow-title">今日入园游客</span>
        <span class="passenger-flow-num">{{ totalPassengerFlow }}</span>
      </el-row>
      <img src="../../../static/img/background/decorateSimple.png"
           style="width:330px;height: 35px;position:absolute; left: 10px;top:230px"/>
      <div class="passenger-flow-echarts" id="passengerFlowChart"></div>
    </div>
  </div>
</template>

<script>
import {getWarningInfo} from "../../api/alarm";
import {getAreaPopulationOnSpecificDay} from '../../api/passengerflow'
import * as echarts from "echarts";

export default {
  name: "StatisticAnalysis.vue",
  props: {},
  data() {
    return {
      res: undefined,
      warnType1: 0,
      warnType5: 0,
      warnType6: 0,
      processedWarning: 0,
      unprocessedWarning: 0,
      totalPassengerFlow: 0,
      passengerFlowChart: undefined,
      alarmChart: undefined,
    };
  },
  mounted() {
    this.getAlarmList()
    this.getPassengerFlowList()
    this.initPassengerFlowList()
    this.getPassengerFlowListTimer()
  },
  components: {},
  methods: {
    //今日异常报警列表
    getAlarmEchartsData(e) {
      if (e.warningType == 1) {
        this.warnType1++
      } else if (e.warningType == 5) {
        this.warnType5++
      } else if (e.warningType == 6) {
        this.warnType6++
      }
    },
    getAlarmEcharts() {
      let option = {
        legend: {
          orient: 'vertical',
          left: 90,
          right: 10,
          top: 20,
          bottom: 20,
          padding: 2,
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            center: ['20%', '50%'],
            data: [
              {
                value: this.warnType1,
                name: '拥堵报警(' + this.warnType1 + ')',
                itemStyle: {color: '#fc8251'},
              },
              {
                value: this.warnType5,
                name: '小程序报警(' + this.warnType5 + ')',
                itemStyle: {color: '#ecb518'},
              },
              {
                value: this.warnType6,
                name: '清园滞留(' + this.warnType6 + ')',
                itemStyle: {color: '#65e8f5'},
              }
            ]
          }
        ]
      };
      this.alarmChart = echarts.init(document.getElementById('leftAlarmAnalysis'));
      this.alarmChart.setOption(option)
      this.alarmChart.on("click", this.showAlarmDetail);

    },
    refreshAlarmEcharts() {
      let option = {
        legend: {
          orient: 'vertical',
          left: 90,
          right: 10,
          top: 20,
          bottom: 20,
          padding: 2,
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            center: ['20%', '50%'],
            data: [
              {
                value: this.warnType1,
                name: '拥堵报警(' + this.warnType1 + ')',
                itemStyle: {color: '#fc8251'},
              },
              {
                value: this.warnType5,
                name: '小程序报警(' + this.warnType5 + ')',
                itemStyle: {color: '#ecb518'},
              },
              {
                value: this.warnType6,
                name: '清园滞留(' + this.warnType6 + ')',
                itemStyle: {color: '#65e8f5'},
              }
            ]
          }
        ]
      };
      this.alarmChart.setOption(option)
    },
    showAlarmDetail(param) {
      if (param.dataIndex == 0) {
        this.$parent.handleMenuSelect("3-1")
      } else if (param.dataIndex == 1) {
        this.$parent.handleMenuSelect("3-3")
      } else if (param.dataIndex == 2) {
        this.$parent.handleMenuSelect("3-2")
      }
    },
    async getAlarmList() {
      // 待处理报警和已处理报警
      let warningQueryData = {
        pageTotal: 9999
      }
      getWarningInfo(warningQueryData).then(res => {
        if (res.data.code == '00000') {
          let tmpPendingAlarmNum = 0;
          res.data.data.pageContent.forEach(e => {
            if (e.confirmTime == null) tmpPendingAlarmNum++;
            this.getAlarmEchartsData(e);
          })
          this.unprocessedWarning = tmpPendingAlarmNum;
          this.processedWarning = res.data.data.totalMessage - this.unprocessedWarning
        }
        this.getAlarmEcharts()
      }).catch(error => {
        console.log(error)
      })

    },
    //今日游客统计
    initPassengerFlowList() {
      this.passengerFlowChart = echarts.init(document.getElementById('passengerFlowChart'), null, {
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
        areaId: '',
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
        areaId: '',
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
        this.passengerFlowChart.setOption(option)
      }
    },
  }
}
</script>

<style scoped>
.left-charts {
  width: 320px;
  float: left;
  position: absolute;
  top: 150px;
}

.alarm-title {
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
}

.alarm-font {
  font-size: 16px;
  line-height: 150%;
  font-family: 等线;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  top: 20px;
}

.description-font {
  color: #ffffff;
  font-size: 14px;
  font-family: 等线;
}

.level-1-Box {
  position: relative;
  top: 14px;
  left: 5px;
  width: 8px;
  height: 8px;
  background-color: rgb(0, 255, 0);
}

.level-2-Box {
  position: relative;
  top: 14px;
  left: 2px;
  width: 8px;
  height: 8px;
  background-color: rgb(153, 255, 170);
}

.level-3-Box {
  position: relative;
  top: 14px;
  left: 2px;
  width: 8px;
  height: 8px;
  background-color: rgb(243, 249, 154);
}

.level-4-Box {
  position: relative;
  top: 13px;
  left: 5px;
  width: 8px;
  height: 8px;
  background-color: rgb(255, 255, 0);
}

.level-5-Box {
  position: relative;
  top: 13px;
  left: 5px;
  width: 8px;
  height: 8px;
  background-color: rgb(255, 0, 0);
}

.passenger-flow-title {
  letter-spacing: 2px;
  color: #ffffff;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: bold;
}

.passenger-flow-num {
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 2px;
  line-height: 35px;
  font-weight: bolder;
  margin-left: 10px;
}

.passenger-flow-echarts {
  position: relative;
  bottom: 40px;
  font-size: 18px;
}
</style>
