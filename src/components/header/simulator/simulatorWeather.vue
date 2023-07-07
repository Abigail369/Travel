<template>
  <transition name="fade">
    <div v-show="simulatorWeatherShow" class="simulator-weather-detail-box">
      <div class="simulator-weather-title">模拟天气状况</div>
      <div class="simulator-weather-border"></div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="simulator-weather-cancel" icon="el-icon-close" @click="closeSimulatorWeather"></el-button>
      <div class="simulator-weather-font">请选择天气</div>
      <el-select v-model="weatherValue" size="mini" placeholder="请选择天气"
                 style="width:190px; font-size: 15px;position: absolute;left: 140px;top: 78px;"
                 @change="setWeather()">
        <el-option v-for="item in weatherOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
  </transition>
</template>

<script>
export default {
  name: "simulatorWeather",
  props: {
    simulatorWeatherShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rainEnabled: false,
      snowEnabled: false,
      fogEnabled: false,
      weatherValue: '',
      weatherOption: [
        {id: 0, name: '晴'},
        {id: 1, name: '雨'},
        {id: 2, name: '雪'},
        {id: 3, name: '雾'},
      ]
    }
  },
  methods: {
    closeSimulatorWeather() {
      this.closeAllWeather()
      this.$emit('update:simulatorWeatherShow', false)
    },
    closeAllWeather() {
      this.$parent.rainEnabled = false
      this.$parent.snowEnabled = false
      this.$parent.fogEnabled = false
    },
    setWeather() {
      if (this.weatherValue == '0') {
        this.closeAllWeather()
      } else if (this.weatherValue == '1') {
        this.closeAllWeather()
        this.$parent.rainEnabled = true
      } else if (this.weatherValue == '2') {
        this.closeAllWeather()
        this.$parent.snowEnabled = true
      } else if (this.weatherValue == '3') {
        this.closeAllWeather()
        this.$parent.fogEnabled = true
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

.simulator-weather-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 350px;
  height: 160px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.simulator-weather-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 138px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.simulator-weather-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.simulator-weather-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.simulator-weather-font {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  position: absolute;
  top: 75px;
  left: 45px
}

</style>
