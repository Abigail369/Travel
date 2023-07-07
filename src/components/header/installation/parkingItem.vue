<template>
  <div class="show-parking-detail">
    <div style="margin-bottom: 10px;">
      <span class="parking-title">{{ sourceObj.parkingName }}</span>
      <span class="parking-font">车位数</span>
      <span style="font-size: 20px;color:#5daf34;font-weight: 550">{{ sourceObj.parkingMaximum }}&nbsp;</span>
      <span class="parking-font">&nbsp;当前停车数</span>
      <span style="font-size: 20px;color:#af346b;font-weight: 550">{{ sourceObj.parkingCurrent }}&nbsp;</span>
    </div>
    <div>
      <div class="parking-echarts-occupied">
        <div :id="idNumOfParkingSpacesOccupied" style="height: 100%; width: 100%;"></div>
      </div>
      <div class="parking-echarts-InOut">
        <div :id="idNumOfIncomingAndOutgoing" style="height: 100%; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {getParkingDetail, getParkingHistoryInfo} from "../../../api/parking";
import * as echarts from "echarts";

export default {
  name: "parkingItem",
  props: {
    sourceObj: {
      type: Object,
      required: true,
    },
    idNumOfParkingSpacesOccupied: {
      type: String,
      required: true,
    },
    idNumOfIncomingAndOutgoing: {
      type: String,
      required: true,
    }
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
                fontSize: 12,
              },
              left: '0%',
            },
            tooltip: {
              trigger: 'axis',
              confine: true
            },
            xAxis: {
              name: '点',
              nameTextStyle: {
                verticalAlign: "top",
                padding: [8, 0, 0, -25],
              },
              data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
              axisLabel: {
                padding: [0, 0, 0, -15]//上右下左
              },
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
              left: 35,
              top: 30,
              right: 5,
              bottom: 30,
            },
            legend: {
              data: ['进入', '离开'],
              left: '55%',
              y: 'top',
            },
            series: [
              {
                type: 'line',
                data: carInData,
                name: "进入",
                smooth: true,
                symbol: 'none',
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
          this.inOutCar = echarts.init(document.getElementById(this.idNumOfIncomingAndOutgoing))
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
          trigger: 'item',//触发类型：数据项
          confine: true,
        },
        title: {
          text: "已占用车位",
          left: "30",
          top: "46",
          textStyle: {
            fontSize: 12,
            color: "#000000",
          },
          subtext: this.occupiedData + "%",
          subtextStyle: {
            fontSize: 12,
            fontWeight: "bolder",
            color: "#d70a0a",
          },
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['60%', '80%'],
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
      this.occupied = echarts.init(document.getElementById(this.idNumOfParkingSpacesOccupied))
      this.occupied.setOption(occupiedOption)
    },
  },
}
</script>

<style scoped>

.show-parking-detail {
  background-color: rgba(219, 228, 232, 0.9);
  width: 324px;
  height: 180px;
  overflow: hidden;
  border-radius: 5%;
  margin-left: 20px;
}

.parking-title {
  color: rgb(58, 118, 146);
  height: 35px;
  font-size: 18px;
  line-height: 45px;
  margin-bottom: 10px;
  font-weight: 600;
}


.parking-font {
  color: #000000;
  font-size: 16px;
  line-height: 35px;
  font-weight: 500;
}

.parking-echarts-occupied {
  width: 120px;
  height: 120px;
  float: left;
  overflow: hidden;
}

.parking-echarts-InOut {
  width: 200px;
  height: 130px;
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
