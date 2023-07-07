<template>
  <transition name="fade">
    <div class="mobile-push-update-box">
      <div class="mobile-push-update-title">手机推送详情</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="mobile-push-update-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="mobile-push-update-right-bottom-decorate">
      <el-button class="mobile-push-update-cancel" icon="el-icon-close" @click="closeMobileUpdateDialog"></el-button>
      <div>
        <span class="mobile-push-update-font">选择区域</span>
        <el-tree class="mobile-push-update-tree" :data="treeData" show-checkbox node-key="areaId" :props="defaultProps"
                 ref="mobilePushUpdateTree" @check="handleCheckChange"></el-tree>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-update-font">推送类型</span>
        <el-select v-model="messageType" placeholder="请选择推送类型" style="width:280px">
          <el-option v-for="item in messageOptions" :key="item.id" :label="item.pushTypeName"
                     :value="item.id"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-update-font">推送标题</span>
        <el-input v-model="messageTitle" placeholder="请输入内容" style="width:280px"></el-input>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-update-font">推送内容</span>
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="messageContent"
                  style="width:280px"></el-input>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-update-font">开始时间</span>
        <el-date-picker v-model="createTime" type="datetime" placeholder="选择日期时间"
                        style="width: 280px">
        </el-date-picker>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-update-font">结束时间</span>
        <el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间"
                        style="width: 280px">
        </el-date-picker>
      </div>
      <el-button type="primary" size="small" class="mobile-push-update-button" @click="updateMobilePush">更新
      </el-button>
    </div>
  </transition>
</template>

<script>
import {getAreaInfo} from "../../api/area";
import {transTime} from "../../utils/timer";
import {getMessageDetail, updateMessage} from "../../api/mobilePush";
import {PUSH_MESSAGE_SEARCH_TYPE, PUSH_MESSAGE_TYPE_MAP} from "../../config/app.config";
import moment from "moment/moment";

export default {
  name: "mobilePushUpdateDialog",
  props: {
    sourceObj: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      treeData: [{
        id: 0,
        areaName: '全部',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'areaName'
      },
      checked: [],
      messageOptions: [],
      mobilePushObj: {},
      messageType: this.sourceObj.messageType,
      messageTitle: this.sourceObj.messageTitle,
      messageContent: this.sourceObj.messageContent,
      createTime: this.sourceObj.createTime,
      endTime: this.sourceObj.endTime,
    }
  },
  filters: {
    timeFilter(time) {
      return transTime(time)
    },
  },
  watch: {
    sourceObj: {
      handler: function (val, oldVal) {
        if (val !== oldVal && val && val.pushMessageId) {
          this.refreshMobilePushDetail()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initPushMessageSearchType()
    this.initAreaTree()
  },
  methods: {
    closeMobileUpdateDialog() {
      this.$parent.showMobileUpdateDialog = false
      this.mobilePushObj = {}
      this.$nextTick(() => {
        this.$refs.mobilePushUpdateTree.setCheckedKeys([])
      })
    },
    refreshMobilePushDetail() {
      let data = {
        pushMessageId: this.sourceObj.pushMessageId,
      }
      getMessageDetail(data).then(res => {
        if (res.data.code == '00000') {
          this.mobilePushObj = res.data.data
          this.messageType = this.mobilePushObj.messageType
          this.messageTitle = this.mobilePushObj.messageTitle
          this.messageContent = this.mobilePushObj.messageContent
          this.createTime = this.mobilePushObj.createTime
          this.endTime = this.mobilePushObj.endTime
          var areaIdList = []
          areaIdList.push(this.mobilePushObj.areaId)
          this.$nextTick(() => {
            this.$refs.mobilePushUpdateTree.setCheckedKeys(areaIdList)
          })
        }
      })
    },
    initAreaTree() {
      let data = {
        pageIndex: 1,
        pageTotal: 9999,
      }
      getAreaInfo(data).then(res => {
        this.treeData[0].children = res.data.data.pageContent
        var areaIdList = []
        areaIdList.push(this.mobilePushObj.areaId)
        this.$nextTick(() => {
          this.$refs.mobilePushUpdateTree.setCheckedKeys(areaIdList)
        })
      })
    },
    initPushMessageSearchType() {
      for (let key of PUSH_MESSAGE_SEARCH_TYPE) {
        this.messageOptions.push({
          id: key,
          pushTypeName: PUSH_MESSAGE_TYPE_MAP[key]
        })
      }
    },
    handleCheckChange(data, tree) {
      this.checked = tree.checkedNodes
    },
    updateMobilePush() {
      var areaId = []
      if (this.checked.length == 0 && this.mobilePushObj.areaId != '') {
        // areaId.push(this.mobilePushObj.areaId)
        areaId = this.mobilePushObj.areaId
      }
      if (this.checked.length != this.treeData[0].children.length + 1) {
        for (let item of this.checked) {
          areaId.push(item.areaId)
        }
      }
      console.log("areaId",areaId,"title",this.messageType,"content",this.messageContent)
      if (areaId == [] || this.messageTitle == '' || this.messageContent == '' || this.createTime == '' || this.endTime == '') {
        this.$message({
          message: '请正确填写！',
        });
      } else {
        let data = {
          pushMessageId: this.mobilePushObj.pushMessageId,
          areaId: areaId,
          messageType: this.messageType,
          messageTitle: this.messageTitle,
          messageContent: this.messageContent,
          createTime: this.createTime,
          endTime: this.endTime,
        }
        console.log("UpdateData",data)
        updateMessage(data).then(res => {
          console.log(res)
          if (res.data.code == '00000') {
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.closeMobileUpdateDialog()
            this.$parent.searchMobilePush()
          }
        })
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

.mobile-push-update-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 400px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.mobile-push-update-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.mobile-push-update-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.mobile-push-update-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.mobile-push-update-right-bottom-decorate {
  position: absolute;
  bottom: -11px;
  right: -33px;
}

.mobile-push-update-font {
  color: white;
  line-height: 40px;
  font-size: 15px;
}

.mobile-push-update-tree {
  display: inline-block;
  width: 70%;
  vertical-align: top;
  background: none;
  color: white;
  margin-top: 7px;
  max-height: 158px;
  overflow-y: scroll;
}

.mobile-push-update-button {
  color: #ffffff;
  background-color: rgb(53, 141, 64);
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  bottom: 25px;
  right: 10px;
}
</style>
