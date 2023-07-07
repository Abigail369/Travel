<template>
  <transition name="fade">
    <div v-show="simulatorTouristRightShow" class="simulator-tourist-detail-box">
      <div class="simulator-tourist-title">模拟游客客流</div>
      <div class="simulator-tourist-border"></div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="simulator-tourist-cancel" icon="el-icon-close" @click="closeSimulator"></el-button>
      <div>
        <div v-show="switchCode == 0">
          <span class="simulator-tourist-font" style="position: absolute; top: 74px;left: 50px">已关闭模拟客流</span>
          <el-button class="simulator-tourist-open" @click="setState(1)">开启</el-button>
        </div>
        <div v-show="switchCode == 1">
          <el-row>
            <el-col :span="12">
              <div class="simulator-tourist-font" style="margin-top: 15px;">已开启模拟客流</div>
            </el-col>
            <el-col :span="6">
              <el-button class="simulator-tourist-button" @click="setState(2)">暂停</el-button>
            </el-col>
            <el-col :span="6">
              <el-button class="simulator-tourist-button" @click="setState(0)">关闭</el-button>
            </el-col>
          </el-row>
          <!--        <el-row><div class="simulator-font">目前平均入园人数：</div></el-row>-->
          <el-row class="simulator-tourist-slider">
            <el-col :span="12">
              <div class="simulator-tourist-font">时间流速</div>
            </el-col>
            <el-col :span="12">
              <el-input-number v-model="simulatorSpeed" size="mini" :min="min" :max="max"
                               @change="setSpeed(simulatorSpeed)"></el-input-number>
            </el-col>
            <!--          <el-slider v-model="simulatorSpeed" show-input :min="min" :max="max"-->
            <!--                     @change="setSpeed(simulatorSpeed)"></el-slider>-->
          </el-row>
        </div>
        <div v-show="switchCode == 2">
          <el-row>
            <el-col :span="12">
              <div class="simulator-tourist-font" style="margin-top: 15px;">已暂停模拟客流</div>
            </el-col>
            <el-col :span="6">
              <el-button class="simulator-tourist-button" @click="setState(1)">开启</el-button>
            </el-col>
            <el-col :span="6">
              <el-button class="simulator-tourist-button" @click="setState(0)">关闭</el-button>
            </el-col>
          </el-row>
          <el-row class="simulator-tourist-slider">
            <el-col :span="12">
              <div class="simulator-tourist-font">时间流速</div>
            </el-col>
            <el-col :span="12">
              <el-input-number v-model="simulatorSpeed" disabled size="mini" :min="min" :max="max"
                               @change="setSpeed(simulatorSpeed)"></el-input-number>
            </el-col>
          </el-row>
          <!--      <el-row class="simulator-slider">-->
          <!--        <el-slider v-model="simulatorSpeed" show-input :min="min" :max="max"-->
          <!--                   @change="setSpeed(simulatorSpeed)" disabled></el-slider>-->
          <!--      </el-row>-->
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import {simulator} from "../../../api/passengerflow";

export default {
  name: "simulatorDetail",
  props: {
    simulatorTouristRightShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      switchCode: 0,
      min: 1,
      max: 40,
      simulatorSpeed: 0,
      simulatorValue: true,
    }
  },
  mounted() {
    this.initSimulator()
  },
  methods: {
    initSimulator() {
      let data = {
        switchTo: '',
        speed: '',
      }
      simulator(data).then(res => {
        if (res.data.code == '00000') {
          this.switchCode = res.data.data.switchTo
          this.simulatorSpeed = res.data.data.speed
        }
      })
    },
    setState(switchData) {
      this.switchCode = switchData
      let data = {
        switchTo: switchData,
        speed: '',
      }
      simulator(data)
    },
    setSpeed(speedData) {
      this.simulatorSpeed = speedData
      let data = {
        switchTo: '',
        speed: speedData,
      }
      simulator(data)
    },
    closeSimulator() {
      this.$emit('update:simulatorTouristRightShow', false)
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

.simulator-tourist-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 350px;
  height: 160px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.simulator-tourist-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 138px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.simulator-tourist-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.simulator-tourist-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.simulator-tourist-font {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
}

.simulator-tourist-open {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  padding-top: 8px;
  height: 32px;
  width: 70px;
  position: absolute;
  top: 75px;
  right: 55px;
}

.simulator-tourist-button {
  height: 15px;
  vertical-align: middle;
  text-align: center;
  line-height: 0px;
  margin-top: 20px;
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
}

.simulator-tourist-slider {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 10px;
}

</style>
