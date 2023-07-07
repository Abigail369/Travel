<template>
  <transition name="fade">
    <div class="mobile-push-detail-box">
      <div class="mobile-push-title">手机推送({{ totalCount }})</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="mobile-push-cancel" icon="el-icon-close" @click="closeMobilePushDetail"></el-button>
      <div style="height: 40px;text-align: left;margin-left: 20px;" id="mobile">
        <el-select v-model="areaId" size="small" clearable collapse-tags placeholder="请选择推送区域"
                   style="width:253px; font-size: 15px;position: absolute;left: 52px;top: 75px;"
                   @change="searchMobilePush">
          <el-option v-for="item in areaOptions" :key="item.areaId" :label="item.areaName"
                     :value="item.areaId">
          </el-option>
        </el-select>
        <el-select v-model="messageType" size="small" clearable placeholder="请选择推送类型"
                   style="width:253px; font-size: 15px;position: absolute;left: 52px;top: 115px;"
                   @change="searchMobilePush">
          <el-option v-for="item in messageOptions" :key="item.id" :label="item.pushTypeName"
                     :value="item.id"></el-option>
        </el-select>
      </div>
      <div>
        <el-button icon="el-icon-circle-plus-outline" type="primary" size="small"
                   class="mobile-push-add-button" @click="addMobilePush">新增
        </el-button>
        <el-button icon="el-icon-search" type="primary" size="small"
                   class="mobile-push-search-button" @click="searchMobilePush">搜索
        </el-button>
      </div>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="mobilePushData"
                border
                style="width:317px;margin-left:24px;position: absolute;top:190px;"
                :row-style="{height:'23px'}"
                :cell-style="{padding:'0px',borderColor: '#868686'}"
                :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                align="center"
                highlight-current-row
                @row-click="updateMobilePush">
        <el-table-column width="48" label="序号" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="88" label="推送标题" align="center" prop="messageTitle" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="100" label="推送内容" align="center" prop="messageContent"
                         :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="80" label="结束时间" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime | timeFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                     :page-size="20"
                     :pager-count="5" layout="prev, pager, next"
                     :current-page.sync="currentPage"
                     :total="totalCount"
                     @current-change="handleCurrentChange">
      </el-pagination>
      <mobile-add-dialog v-if="showMobileAddDialog"></mobile-add-dialog>
      <mobile-push-update-dialog v-if="showMobileUpdateDialog"
                                 :source-obj="this.messageDetail"></mobile-push-update-dialog>
    </div>
  </transition>
</template>

<script>
import {getAreaInfo} from "../../../api/area";
import {getMessageInfo, getMessageDetail} from "../../../api/mobilePush";
import {PUSH_MESSAGE_SEARCH_TYPE, PUSH_MESSAGE_TYPE_MAP} from "../../../config/app.config";
import {transTime} from "../../../utils/timer";
import MobileAddDialog from "../../dialog/mobilePushAddDialog.vue";
import MobilePushUpdateDialog from "../../dialog/mobilePushUpdateDialog.vue";

export default {
  name: 'mobilePush',
  components: {
    MobileAddDialog,
    MobilePushUpdateDialog,
  },
  props: {},
  data() {
    return {
      loading: true,
      mobilePushData: [],
      areaId: '',
      areaOptions: [],
      messageType: '',
      messageOptions: [],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      messageDetail: {},
      showMobileAddDialog: false,
      showMobileUpdateDialog: false,
    }
  },
  filters: {
    timeFilter(time) {
      //.substring(11, 19)
      return transTime(time)
    },
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getAreaInfo()
    this.getPushMessageSearchType()
    this.getMobilePushList()
  },
  methods: {
    closeMobilePushDetail() {
      this.$parent.mobilePushRightShow = false;
    },
    getAreaInfo() {
      let data = {
        pageTotal: 9999
      }
      getAreaInfo(data).then(res => {
        this.areaOptions = res.data.data.pageContent
      })
    },
    getPushMessageSearchType() {
      for (let key of PUSH_MESSAGE_SEARCH_TYPE) {
        this.messageOptions.push({
          id: key,
          pushTypeName: PUSH_MESSAGE_TYPE_MAP[key]
        })
      }
    },
    getMobilePushList() {
      this.loading = true
      let data = {
        messageType: this.messageType,
        areaId: this.areaId,
        pageIndex: this.currentPage,
        pageTotal: this.pageSize,
      }
      getMessageInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.mobilePushData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    searchMobilePush() {
      this.currentPage = 1
      this.getMobilePushList()
    },
    addMobilePush() {
      this.showMobileUpdateDialog = false
      this.showMobileAddDialog = true
    },
    updateMobilePush(row) {
      let data = {
        pushMessageId: row.pushMessageId,
      }
      getMessageDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.messageDetail = res.data.data
          console.log("sourceObj", this.messageDetail)
          this.showMobileAddDialog = false
          this.showMobileUpdateDialog = true
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMobilePushList()
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

.mobile-push-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.mobile-push-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.mobile-push-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.mobile-push-add-button {
  color: rgb(53, 141, 64);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  top: 155px;
  right: 120px;
}

.mobile-push-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  top: 155px;
  right: 40px;
}
</style>
