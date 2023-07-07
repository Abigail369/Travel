<template>
  <transition name="fade">
    <div v-show.sync="cameraDetailShow">
      <div class="camera-detail-box">
        <div class="camera-border"></div>
        <div class="camera-title">监控摄像头列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
        <el-button class="camera-cancel" icon="el-icon-close" @click="closeCameraDetail"></el-button>
        <div class="camera-search-box">
          <el-input v-model="cameraName" placeholder="请输入摄像头名称" clearable size="small"
                    style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                    @keyup.enter.native="reGetCameraDetailData"></el-input>
          <el-button icon="el-icon-search" type="primary" size="small" class="camera-search-button"
                     @click="reGetCameraDetailData">
            <span>搜索</span>
          </el-button>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="cameraData"
                  border
                  style="width:317px;margin-left:24px;position: absolute;top:110px;"
                  :row-style="{height:'23px'}"
                  :cell-style="{padding:'0px',borderColor: '#868686'}"
                  :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                  align="center"
                  highlight-current-row
                  @current-change="handleTableChange"
                  @row-click="handleRowClick">
          <el-table-column width="45" label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="108" label="名称" align="center" prop="cameraName" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column width="58" label="类型" align="center" prop="cameraType" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.cameraType == 0">枪机</span>
              <span v-if="scope.row.cameraType == 1">球机</span>
              <span v-if="scope.row.cameraType == 2">半球机</span>
            </template>
          </el-table-column>
          <el-table-column width="45" label="状态" align="center" prop="state" :show-overflow-tooltip="true">
            <template slot-scope="scope">
<!--              <span v-if="scope.row.state == -1" style="color: #79c0d7">已删除</span>-->
              <span v-if="scope.row.state == 0" style="color: #59e74f">正常</span>
              <span v-if="scope.row.state == 1" style="color: gray">无效</span>
              <span v-if="scope.row.state == 2" style="color: #ec5a5c">离线</span>
            </template>
          </el-table-column>
          <el-table-column width="60" label="操作" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.state != 0"></div>
              <button v-else
                      style="color:#8cf4fe;background-color:transparent;border:0;border-radius:5px;height:18px;font-size: 12px;vertical-algin:middle;margin-top: 3px;padding-top:0px"
                      @click.stop="!scope.row.state && showDetail(scope.row)">查看
              </button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                       :page-size="23"
                       :pager-count="5" layout="prev, pager, next"
                       :current-page.sync="currentPage"
                       :total="totalCount"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <camera-dialog :source-obj="this.detail" :show-camera-dialog.sync="showCameraDialog"></camera-dialog>
    </div>
  </transition>
</template>

<script>
import {getCameraInfo, getCameraDetail} from '../../../api/camera'
import cameraDialog from "../../dialog/cameraDialog.vue";

export default {
  name: 'cameraDetail',
  props: {
    cameraDetailShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      cameraId: '',
      cameraName: '',
      cameraType: '',
      state: '',
      cameraData: [],
      currentPage: 1,
      pageSize: 23,
      pagerCount: 5,
      totalCount: 0,
      detail: {},
      currentRow: null,
      showCameraDialog: false,
    }
  },
  components: {cameraDialog},
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getCameraList()
  },
  methods: {
    handleRowClick(row) {
      this.showCameraDialog = false
      this.$parent.flyToView(row.cameraLongitude, row.cameraLatitude);
    },
    reGetCameraDetailData() {
      this.currentPage = 1
      this.getCameraList()
    },
    closeCameraDetail() {
      this.$emit('update:cameraDetailShow', false)
    },
    getCameraList() {
      let data = {
        keyword: this.cameraName,
        pageIndex: this.currentPage,
        pageTotal: this.pageSize
      }
      getCameraInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.cameraData = res.data.data.pageContent
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
      this.$parent.flyToView(row.cameraLongitude, row.cameraLatitude);
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

.camera-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.camera-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.camera-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.camera-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.camera-search-box {
  height: 40px;
}

.camera-search-button {
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
