<template>
  <transition name="fade">
    <div v-if="touristTrackDetailShow">
      <div class="tourist-track-detail-box">
        <div class="tourist-track-border"></div>
        <div class="tourist-track-title">游客轨迹查询</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
        <el-button class="tourist-track-cancel" icon="el-icon-close" @click="closeTouristTrackDetail"></el-button>
        <div class="tourist-track-search-box">
          <el-input v-model="phone" placeholder="请输入手机号" clearable
                    style="width: 280px;font-size: 15px;position: absolute;left: 42px;top: 72px;"></el-input>
          <el-form :model="form">
            <el-form-item>
              <el-date-picker clearable v-model="form.timeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              style="width: 280px;font-size: 15px;position: absolute;left: 42px;top: 65px;"
                              popper-class="popperClass" placeholder="请输入开始时间" @change="changeDate(0)">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker clearable v-model="form.timeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                              style="width: 280px;font-size: 15px;position: absolute;left: 42px;top: 90px;"
                              popper-class="popperClass" placeholder="请输入结束时间" @change="changeDate(1)">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button icon="el-icon-circle-close" type="primary" size="small" class="tourist-track-clear-button"
                     @click="clear()">
            <span>清除</span>
          </el-button>
          <el-button icon="el-icon-search" type="primary" size="small" class="tourist-track-search-button"
                     @click="search()">
            <span>搜索</span>
          </el-button>
        </div>
        <div v-if="isTranceListShow">
          <el-table v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="traceData"
                    border
                    style="width:317px;height:467px;margin-left:24px;position: absolute;top: 260px;user-select: none;text-align: center;overflow-y: scroll;overflow-x:hidden;"
                    :row-style="{height:0+'px'}"
                    :cell-style="{padding:0+'px',borderColor: '#868686'}"
                    :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                    align="center"
                    highlight-current-row>
            <el-table-column width="50" label="序号" type="index" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column width="89" label="经度" align="center" prop="lon" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column width="89" label="纬度" align="center" prop="lat" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column width="80" label="时间" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.capTime | timeFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {getTrace} from "../../../api/passengerTrace";
import {strLenCustom} from "../../../utils";

export default {
  name: "touristTrackDetail",
  props: {
    touristTrackDetailShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      phone: '',
      form: {
        timeStart: '',
        timeEnd: '',
      },
      traceData: {},
      loading: false,
      isTranceListShow: false,
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
  filters: {
    timeFilter(time) {
      return time.substring(11, 19)
    },
  },
  methods: {
    closeTouristTrackDetail() {
      this.$emit('update:touristTrackDetailShow', false)
      this.$parent.cleanPassengerTrace()
    },
    //表单校验
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
    search() {
      this.loading = true
      let data = {
        phone: this.phone,
        timeStart: this.form.timeStart,
        timeEnd: this.form.timeEnd,
      }
      // let data = {
      //   phone: "19577731258",
      //   timeStart: "2023-5-27 00:00:00",
      //   timeEnd: "2023-5-28 00:00:00",
      // }
      getTrace(data).then((res) => {
        if (res.data.code == "200") {
          this.traceData = res.data.data;//traceData为要显示列表的数据
          this.isTranceListShow = true
          this.$parent.cleanPassengerTrace();
          this.$parent.getPassengerTrace(this.traceData);
        }
      }).catch(error => {
        console.log(error)
      })
      this.loading = false
    },
    clear() {
      this.$parent.cleanPassengerTrace();
    },
  }
}
</script>

<style scoped>
/*特效——渐隐*/
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.tourist-track-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.tourist-track-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.tourist-track-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.tourist-track-search-box {
  height: 40px;
}

.tourist-track-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 130px;
  position: absolute;
  top: 215px;
  left: 40px;
}

.tourist-track-clear-button {
  color: rgb(146, 58, 74);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 130px;
  position: absolute;
  top: 215px;
  right: 26px;
}

.tourist-track-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.popperClass {
  margin-left: -23px !important;
  background-color: rgba(44, 62, 80, 0.8);
  color: #ffffff;
}
</style>
