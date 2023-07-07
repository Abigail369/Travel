<template>
  <transition name="fade">
    <div v-if="broadcastDetailShow">
      <div class="broadcast-detail-box">
        <div class="broadcast-border"></div>
        <div class="broadcast-title">地面广播列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
        <el-button class="broadcast-cancel" icon="el-icon-close" @click="closeBroadcastDetail"></el-button>
        <div class="broadcast-search-box">
          <el-input v-model="searchName" placeholder="请输入广播名称" clearable size="small"
                    style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                    @keyup.enter.native="getBroadcastList"></el-input>
          <el-button icon="el-icon-search" type="primary" size="small" class="broadcast-search-button"
                     @click="getBroadcastList">
            <span>搜索</span>
          </el-button>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="broadcastData"
                  border
                  style="width:317px;margin-left:24px;position: absolute;top: 110px;user-select: none;text-align: center"
                  :row-style="{height:0+'px'}"
                  :cell-style="{padding:0+'px',borderColor: '#868686'}"
                  :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                  align="center"
                  highlight-current-row
                  @row-click="handleTableChange"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="39"></el-table-column>
          <el-table-column width="48" label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="112" label="名称" align="center" prop="speakerName" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column width="117" label="播放内容" align="center" prop="areaName" :show-overflow-tooltip="true">
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
      <broadcast-dialog :source-obj="this.detail" :show-broadcast-dialog.sync="showBroadcastDialog"></broadcast-dialog>
    </div>
  </transition>
</template>

<script>
import {getSpeakerInfo, getSpeakerDetail} from '../../../api/speaker'
import broadcastDialog from "../../dialog/broadcastDialog.vue";

export default {
  name: 'broadcast',
  components: {broadcastDialog},
  props: {
    broadcastDetailShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchName: '',
      loading: true,
      broadcastData: [],
      currentPage: 1,
      pageSize: 23,
      totalCount: 0,
      detail: {},
      showBroadcastDialog: false,
      currentRow: null,
      detailShowLoading: true,
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.getBroadcastList()
  },
  methods: {
    closeBroadcastDetail() {
      this.$emit('update:broadcastDetailShow', false)
    },
    searchBroadcast() {

    },
    //获取游客列表
    getBroadcastList() {
      let data = {
        pageTotal: 999,
        keyword: this.searchName
      }
      getSpeakerInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.broadcastData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    //显示游客详情
    showDetail(row) {
      let data = {
        speakerId: row.speakerId
      }
      getSpeakerDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.detail = res.data.data
          this.showBroadcastDialog = true
          this.detailShowLoading = false
        }
      }).catch(err => {
        this.detailShowLoading = false
        console.log(err)
      })
    },
    /* 改变页码*/
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBroadcastList(val)
    },
    /* 改变页面数量 */
    handleSizeChange(val) {
      this.pageSize = val
      this.getBroadcastList(val)
    },
    handleTableChange(val) {
      this.currentRow = val
      this.detailShowLoading = true
      this.showDetail(val)
    },
    handleSelectionChange(val) {
      console.log(val)
    }
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

.broadcast-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.broadcast-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.broadcast-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.broadcast-search-box {
  height: 40px;
}

.broadcast-search-button {
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

.broadcast-border {
  background: transparent;
  /*border: 1px solid #0865b2;*/
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

</style>
