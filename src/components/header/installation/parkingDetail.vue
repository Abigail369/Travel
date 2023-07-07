<template>
  <transition name="fade">
    <div v-if="parkingDetailShow">
      <div class="parking-detail-box">
        <div class="parking-detail-border"></div>
        <div class="parking-title">停车场列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
        <el-button class="parking-cancel" icon="el-icon-close" @click="closeParkingDetail"></el-button>
        <div class="parking-search-box">
          <el-input v-model="parkingNameSearch" placeholder="请输入停车场名称" clearable size="small"
                    style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                    @keyup.enter.native="reGetParkingDetailData"></el-input>
          <el-button icon="el-icon-search" type="primary" size="small"
                     class="parking-search-button"
                     @click="reGetParkingDetailData">
            <span class="btn-text">搜索</span>
          </el-button>
        </div>
        <div style="overflow-x: hidden;margin-top: 20px">
          <div v-for="item in parkingData">
            <parking-item :source-obj="item" :id-num-of-incoming-and-outgoing="'io_'+item.parkingId"
                          :id-num-of-parking-spaces-occupied="'po_'+item.parkingId"></parking-item>
            <div class="chart-format-setting"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import parkingDialog from "../../dialog/parkingDialog.vue";
import parkingItem from "./parkingItem.vue";
import {getParkingInfo} from "../../../api/parking";

export default {
  name: 'parkingDetail',
  props: {
    parkingDetailShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      showParkingDialog: false,
      parkingNameSearch: "",
      parkingData: [],
      totalCount: 0,
    }
  },
  components: {
    parkingDialog,
    parkingItem,
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getParkingList()
  },
  methods: {
    reGetParkingDetailData() {
      this.getParkingList()
    },
    closeParkingDetail() {
      this.$emit('update:parkingDetailShow', false)
    },
    getParkingList() {
      let data = {
        keyword: this.parkingNameSearch,
        pageTotal: 999,
      }
      getParkingInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.parkingData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    showDetail(row) {
      let data = {
        cameraId: row.cameraId
      }
      getCameraDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.detail = res.data.data
        }
      })
      this.showCameraDialog = true
    },

    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCameraList(val)
    },
    // 改变页面数量
    handleSizeChange(val) {
      this.pageSize = val
      this.getCameraList(val)
    },
    handleTableChange(val) {
      this.currentRow = val
      // this.showdetail(val)
    }
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

.chart-format-setting {
  width: 100%;
  height: 20px;
}

.parking-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.parking-detail-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.parking-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.parking-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.parking-search-box {
  height: 40px;
}

.parking-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 32px;
  width: 70px;
  position: absolute;
  top: 69px;
  right: 40px;
}


</style>
