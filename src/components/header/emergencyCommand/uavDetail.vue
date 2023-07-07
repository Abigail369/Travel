<template>
  <transition name="fade">
      <div class="uav-detail-box">
        <div class="uav-title">无人机列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
        <el-button class="uav-cancel" icon="el-icon-close" @click="closeUAVDetail"></el-button>
        <el-input v-model="searchName" placeholder="请输入无人机名称" clearable size="small"
                  style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                  @keyup.enter.native="fetchData"></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" class="uav-search-button"
                   @click="fetchData">搜索
        </el-button>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="droneList"
                  border
                  style="width:317px;margin-left:24px;position: absolute;top:110px;"
                  :row-style="{height:'23px'}"
                  :cell-style="{padding:'0px',borderColor: '#868686'}"
                  :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                  align="center"
                  highlight-current-row>
          <el-table-column width="45" label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="77" label="名称" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.droneName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="55" label="类型" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.droneTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="82" label="状态" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.droneState }}</span>
            </template>
          </el-table-column>
          <el-table-column width="57" label="操作" align="center">
            <template slot-scope="scope">
              <button
                style="color:#8cf4fe;background-color:transparent;border:0;border-radius:5px;height:18px;font-size: 12px;vertical-algin:middle;margin-top: 3px;padding-top:0px"
                @click="changeUavDialog(scope.row)">查看
              </button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                       :page-size="23"
                       :pager-count="5" layout="prev, pager, next"
                       :total="totalCount"
                       :current-page.sync="currentPage"
                       @current-change="handleCurrentChange">
        </el-pagination>
        <uav-dialog v-if="showUavDialog" :source-obj="detail" :show-uav-dialog.sync="showUavDialog"></uav-dialog>
      </div>
  </transition>
</template>

<script>
import {getDroneList} from "../../../api/uav";
import uavDialog from "../../dialog/uavDialog.vue";

export default {
  name: 'uavDetail',
  props: {},
  components: {
    uavDialog,
  },
  data() {
    return {
      searchName: '',
      loading: true,
      droneList: [],
      currentPage: 1,
      pageSize: 23,
      totalCount: 2,//todo: 后端添加参数后再改为动态的
      detail: {},
      detailShow: false,
      currentRow: null,
      detailShowLoading: true,
      uavState: [],
      showUavDialog: false,
      uavTimer: null,
    }
  },
  mounted() {
    this.fetchDataTimer()
  },
  methods: {
    closeUAVDetail() {
      this.$parent.uavDetailRightShow = false;
    },
    fetchDataTimer() {
      this.uavTimer = setInterval(() => {
        this.fetchData()
      }, 5000)
    },
    fetchData() {
      let queryParam = {
        pageNum: 1,
        pageSize: 10,
        params: {
          id: null,
          droneName: null,
          droneTypeId: null,
          droneTypeName: null,
        },
      }
      this.loading = true;
      getDroneList(queryParam).then((res) => {
        this.droneList = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
      this.loading = false;
    },
    changeUavDialog(row) {
      this.showUavDialog = false
      this.detail = row
      this.showUavDialog = true
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },

  },
  beforeDestroy() {
    if (this.uavTimer)
      clearInterval(this.uavTimer)
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

.uav-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.uav-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.uav-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.uav-search-button {
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

.detail {
  width: 340px;
  margin-top: 10px;
  min-height: 200px;
  margin-left: 1.5%;
  border: 1px solid white;
  color: white;
  margin-bottom: 10px;
}

.detail-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
}


.inputarea {
  width: 180px;
}

</style>
