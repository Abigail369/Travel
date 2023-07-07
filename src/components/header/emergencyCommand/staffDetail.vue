<template>
  <transition name="fade">
    <div class="staff-detail-box">
      <div class="staff-border"></div>
      <div class="staff-title">工作人员</div>
      <img src="../../../../static/img/background/decorate.png"
           style="width:330px;height: 35px;position:absolute; right: -16px;top:36px"/>
      <el-button class="staff-cancel" icon="el-icon-close" @click="closeStaffDetail"></el-button>
      <div class="staff-search-box">
        <el-input v-model="workerName" placeholder="请输入工作人员姓名" clearable size="small"
                  style="width: 180px;font-size: 15px;position: absolute;left: 42px;top: 69px;"
                  @keyup.enter.native="reGetStaffDetailData"></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" class="staff-search-button"
                   @click="reGetStaffDetailData">
          <span>搜索</span>
        </el-button>
      </div>
      <el-table v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="staffData"
                border
                style="width:317px;margin-left:24px;position: absolute;top:110px;"
                :row-style="{height:'23px'}"
                :cell-style="{padding:'0px',borderColor: '#868686'}"
                :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                align="center"
                highlight-current-row
                @row-click="showStaffTrack()">
        <el-table-column width="45" label="序号" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column width="68" label="姓名" align="center" prop="workerName" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="85" label="部门" align="center" prop="groupName" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="45" label="性别" align="center" prop="workerGender" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0">-</span>
            <span v-if="scope.row.state == 1">男</span>
            <span v-if="scope.row.state == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column width="73" label="电话" align="center" prop="workerPhone" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                     :page-size="23"
                     :pager-count="5" layout="prev, pager, next"
                     :current-page.sync="currentPage"
                     :total="totalCount"
                     @current-change="handleCurrentChange">
      </el-pagination>
      <staff-dialog v-if="showStaffDialog" source-obj="staffDetail"></staff-dialog>
    </div>
  </transition>
</template>

<script>
import {getStaffInfo} from "../../../api/staff";
import StaffDialog from "../../dialog/staffDialog.vue";

export default {
  name: "staffDetail",
  components: {StaffDialog},
  data() {
    return {
      loading: true,
      workerName: '',
      gender: '',
      groupName: '',
      staffData: [],
      currentPage: 1,
      pageSize: 23,
      pagerCount: 5,
      totalCount: 0,
      showStaffDialog: false,
      staffDetail: {},
    }
  },
  mounted() {
    this.getStaffList()
  },
  methods: {
    closeStaffDetail() {
      this.$parent.staffRightShow = false
    },
    getStaffList() {
      let data = {
        keyword: this.workerName,
        pageIndex: this.currentPage,
        pageTotal: this.pageSize
      }
      getStaffInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.staffData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },
    reGetStaffDetailData() {
      this.currentPage = 1
      this.getStaffList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getStaffList()
    },
    showStaffTrack() {
      this.showStaffDialog = true
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

.staff-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.staff-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.staff-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.staff-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.staff-search-box {
  height: 40px;
}

.staff-search-button {
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
