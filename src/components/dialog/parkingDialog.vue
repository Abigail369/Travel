<template>
  <transition name="fade">
    <div class="show-parking-detail" v-show="showParkingDialog">
      <loading :active.sync="loading"
               :can-cancel="true"
               :is-full-page="false"/>
      <div class="parking-title">{{ sourceObj.parkingName }}</div>
      <el-button class="parking-cancel" icon="el-icon-close" @click="closeParkingDialog"></el-button>
      <div style="margin-bottom: 10px;">
        <span class="parking-font">车位数</span>
        <span style="font-size: 20px;color:#5daf34;font-weight: 550">{{ sourceObj.parkingMaximum }}&nbsp;</span>
        <span class="parking-font">&nbsp;当前停车数</span>
        <span style="font-size: 20px;color:#af346b;font-weight: 550">{{ sourceObj.parkingCurrent }}&nbsp;</span>
        <span class="parking-font">&nbsp;今日进入车次数</span>
        <span style="font-size: 20px;color:#235477;font-weight: 550">{{ totalInCarNum }}</span>
      </div>
      <div>
        <div class="parking-echarts-occupied">
          <div id="numOfParkingSpacesOccupied" style="height: 100%; width: 100%;"></div>
        </div>
        <div class="parking-echarts-InOut">
          <div id="numOfIncomingAndOutgoing" style="height: 100%; width: 100%;"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {getParkingDetail, getParkingHistoryInfo} from "../../api/parking";
import * as echarts from "echarts";

export default {
  name: "parkingDialog",
  props: {
    showParkingDialog: {
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
      loading: true,
      todayDate: '',
      occupiedData: 0,
      remainingData: 0,
      totalInCarNum: 0,
      carNumData: {},
      occupied: undefined,
      inOutCar: undefined,
      // carInData: [],
      // carOutData: [],
    };
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.parkingId) {
          this.refreshParkingDetail();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    Loading,
  },
  created() {
  },
  mounted() {
  },
  methods: {
    closeParkingDialog() {
      this.$emit('update:showParkingDialog', false)
    },
    refreshParkingDetail() {
      let data = {
        parkingId: this.sourceObj.parkingId,
      };
      this.loading = true;
      getParkingDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.getTodayDate()
          this.getParkingData()
          this.echartsInit()
          this.loading = false;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getTodayDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.todayDate = year + '-' + month + '-' + day
    },
    getParkingData() {
      this.occupiedData = Number(this.sourceObj.parkingCurrent / this.sourceObj.parkingMaximum * 100).toFixed(2)
      this.remainingData = Number((this.sourceObj.parkingMaximum - this.sourceObj.parkingCurrent) / this.sourceObj.parkingMaximum * 100).toFixed(2)
      let data = {
        parkingId: this.sourceObj.parkingId,
        specificDate: this.todayDate,
      }
      let carInData = []
      let carOutData = []
      getParkingHistoryInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.carNumData = res.data.data;
          this.carNumData[0].forEach(e => {
            this.totalInCarNum += e
          })
          carInData = this.carNumData[0].slice(8, 18)
          carOutData = this.carNumData[1].slice(8, 18)
          //VUE有毛病，this赋值后面会多一个{__ob__: Observer }，不用this就正常
          //今日进入车次数
          let inOutOption = {
            title: {
              text: '今日进出车次数',
              textStyle: {
                color: '#000000',
                fontWeight: 'normal',
                fontSize: 16,
              },
              left: '20%',
            },
            tooltip: {
              trigger: 'axis',
              confine: true,
            },
            xAxis: {
              name: '点',
              nameTextStyle: {
                padding: [0, 0, 0, -12],
              },
              axisLabel: {
                padding: [0, 0, 0, -20]//上右下左
              },
              data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
              axisLine: {
                lineStyle: {
                  color: "#000000"
                }
              }
            },
            yAxis: {
              minInterval: 1,
              axisLine: {
                lineStyle: {
                  color: "#000000"
                }
              }
            },
            grid: {
              left: '15%',
              top: '10%',
            },
            legend: {
              data: ['进入', '离开'],
              orient: 'vertical',
              x: 'right',
              y: 'top',
            },
            series: [
              {
                type: 'line',
                data: carInData,
                name: '进入',
                smooth: true,
                symbol: 'none',
                label: {
                  fontSize: 14,
                  formatter: '进入',
                  color: '#90ca75',
                }
              },
              {
                type: 'line',
                data: carOutData,
                name: "离开",
                smooth: true,
                symbol: 'none',
              }
            ]
          }
          if (this.inOutCar != null && this.inOutCar != "" && this.inOutCar != undefined) {
            this.inOutCar.dispose();
          }
          this.inOutCar = echarts.init(document.getElementById('numOfIncomingAndOutgoing'))
          this.inOutCar.setOption(inOutOption)
        }
      }).catch(error => {
        console.log(error);
      });
    },
    echartsInit() {
      //已占用车位
      let occupiedOption = {
        tooltip: {//提示框
          trigger: 'item'//触发类型：数据项
        },
        title: {
          text: "已占用车位",
          left: "30",
          top: "46",
          textStyle: {
            fontSize: 16,
            color: "#000000",
          },
          subtext: this.occupiedData + "%",
          subtextStyle: {
            fontSize: 18,
            fontWeight: "bolder",
            color: "#d70a0a",
          },
        },
        series: [
          {
            type: 'pie',
            center: ['48%', '38%'],
            radius: ['70%', '90%'],
            //饼块起始角度
            startAngle: 90,
            avoidLabelOverlap: false,
            //设置数据标签引导线
            labelLine: {
              show: true
            },
            //格式化数据标签
            label: {
              show: false,
            },
            color: ['#3f94c1', '#6cc6e0'],
            data: [
              {value: this.occupiedData, name: '已停'},
              {value: this.remainingData, name: '剩余'},
            ]
          }
        ]
      }
      if (this.occupied != null && this.occupied != "" && this.occupied != undefined) {
        this.occupied.dispose();
      }
      this.occupied = echarts.init(document.getElementById('numOfParkingSpacesOccupied'))
      this.occupied.setOption(occupiedOption)
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

.show-parking-detail {
  background-color: rgba(219, 228, 232, 0.9);
  width: 430px;
  height: 250px;
  overflow: hidden;
  position: absolute;
  left: 40%;
  top: 30%;
}

.parking-title {
  color: rgb(58, 118, 146);
  height: 35px;
  font-size: 18px;
  line-height: 45px;
  margin-bottom: 10px;
  font-weight: 600;
}

.parking-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: 0;
  top: 0;
  color: rgb(58, 118, 146);
  font-size: 18px;
  font-weight: 800;
}

.parking-font {
  color: #000000;
  font-size: 16px;
  line-height: 35px;
  font-weight: 500;
}

.parking-echarts-occupied {
  width: 150px;
  height: 180px;
  float: left;
  overflow: hidden;
}

.parking-echarts-InOut {
  width: 270px;
  height: 190px;
  float: left;
  overflow: hidden;
}

/*特效——渐隐*/
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
