<template>
  <transition name="fade">
    <div class="staff-dialog-box">
      <div class="staff-dialog-title">{{ sourceObj.workerName }}历史轨迹详情</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="staff-dialog-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="staff-dialog-right-bottom-decorate">
      <el-button class="staff-dialog-cancel" icon="el-icon-close" @click="closeStaffDialog"></el-button>
      <el-form :model="form">
        <el-form-item>
          <el-date-picker clearable v-model="form.timeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 220px;font-size: 15px;position: absolute;left: 20px;top: 15px;"
                          popper-class="popperClass" placeholder="请输入开始时间" @change="changeDate(0)">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker clearable v-model="form.timeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 220px;font-size: 15px;position: absolute;left: 20px;top: 40px;"
                          popper-class="popperClass" placeholder="请输入结束时间" @change="changeDate(1)">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button icon="el-icon-circle-close" type="primary" size="small" class="staff-track-clear-button"
                 @click="clearStaffTrance()">
        <span>清除</span>
      </el-button>
      <el-button icon="el-icon-search" type="primary" size="small" class="staff-track-search-button"
                 @click="searchStaffTrance()">
        <span>搜索</span>
      </el-button>
      <div v-if="isStaffTranceListShow"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "staffDialog",
  props: {
    sourceObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        timeStart: '',
        timeEnd: '',
      },
      traceData: {},
      isStaffTranceListShow: false,
    }
  },
  rules: {
    timeStart: [
      {required: true, message: "开始时间不能为空", trigger: "change"},
      {validator: this.validationTimeStart},
    ],
    timeEnd: [
      {required: true, message: "结束时间不能为空", trigger: "change"},
      {validator: this.validationTimeEnd},
    ],
  },
  methods: {
    closeStaffDialog() {
      this.$parent.showStaffDialog = false
    },
    validationTimeStart(rule, value, callback) {
      if (new Date(this.form.timeEnd) - new Date(value) <= 0 && this.form.timeStart && value) {
        return callback(new Error('开始时间不能大于结束时间'))
      }
      callback()
    },
    validationTimeEnd(rule, value, callback) {
      if (new Date(value) - new Date(this.form.timeStart) <= 0 && this.form.timeEnd && value) {
        return callback(new Error('结束时间不能小于开始时间'))
      }
      callback()
    },
    changeDate(flag) {
      if (flag == 0) {
        if (this.form.timeEnd) {
          if (this.form.timeStart > this.form.timeEnd) {
            this.form.timeStart = null
            this.$message.error("开始时间不能大于结束时间")
          }
        }
      } else {
        if (this.form.timeStart) {
          if (this.form.timeStart > this.form.timeEnd) {
            this.form.timeEnd = null
            this.$message.error("结束时间不能小于开始时间")
          }
        }
      }
    },
    searchStaffTrance() {

    },
    clearStaffTrance() {

    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.staff-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 400px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.staff-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.staff-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.staff-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.staff-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -32px;
}


.staff-track-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 120px;
  position: absolute;
  top: 70px;
  right: 20px;
}

.staff-track-clear-button {
  color: rgb(146, 58, 74);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 120px;
  position: absolute;
  top: 110px;
  right: 20px;
}

</style>
