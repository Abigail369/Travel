<template>
  <transition name="fade">
    <div class="mobile-push-add-box">
      <div class="mobile-push-add-title">新增推送</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="mobile-push-add-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="mobile-push-add-right-bottom-decorate">
      <el-button class="mobile-push-add-cancel" icon="el-icon-close" @click="closeMobileDialog"></el-button>
      <div>
        <span class="mobile-push-add-font">选择区域</span>
        <el-tree class="tree" :data="treeData" show-checkbox node-key="id" :props="defaultProps"
                 @check="handleCheckChange"></el-tree>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-add-font">推送类型</span>
        <el-select v-model="pushMessageType" placeholder="请选择推送类型" style="width:280px">
          <el-option v-for="item in pushType" :key="item.id" :label="item.pushTypeName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-add-font">推送标题</span>
        <el-input v-model="title" placeholder="请输入内容" style="width: 280px"></el-input>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-add-font">推送内容</span>
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="content" style="width: 280px">
        </el-input>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-add-font">开始时间</span>
        <el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间" style="width: 280px">
        </el-date-picker>
      </div>
      <div style="margin-top: 10px;">
        <span class="mobile-push-add-font">结束时间</span>
        <el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" style="width: 280px">
        </el-date-picker>
      </div>
      <el-button type="primary" size="small" class="mobile-push-add-button" @click="addNewMobile">推送</el-button>
    </div>
  </transition>
</template>

<script>
import $ from 'jquery'
import {getAreaInfo} from '@/api/area'
import {pushArea} from '@/api/mobilePush.js'
import {PUSH_MESSAGE_TYPE_MAP, PUSH_MESSAGE_ADD_TYPE,} from "../../config/app.config";

export default {
  name: "mobilePushDialog",
  props: {},
  data() {
    return {
      title: '',
      content: '',
      endTime: new Date(2099, 9, 10, 10, 10),
      startTime: new Date(),
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
      pushMessageType: '',
      pushType: [],
    };
  },
  mounted() {
    this.getAreaTree()
    this.getPushMessageAddType()
  },
  methods: {
    closeMobileDialog() {
      this.$parent.showMobileAddDialog = false;
    },
    getAreaTree() {
      let data = {
        pageIndex: 1,
        pageTotal: 9999,
      }
      getAreaInfo(data).then(res => {
        this.treeData[0].children = res.data.data.pageContent
      })
    },
    getPushMessageAddType() {
      for (let key of PUSH_MESSAGE_ADD_TYPE) {
        this.pushType.push({
          id: key,
          pushTypeName: PUSH_MESSAGE_TYPE_MAP[key]
        })
      }
    },
    addNewMobile() {
      let areaId = []
      if (this.checked.length != this.treeData[0].children.length + 1) {
        for (let item of this.checked) {
          areaId.push(item.areaId)
        }
      }
      var moment = require('moment');
      let data = {
        areaId: areaId,
        messageType: this.pushMessageType,
        messageTitle: this.title,
        messageContent: this.content,
        createTime: moment(this.startTime).format('YYYY-MM-DD hh:mm:ss'),
        endTime: moment(this.endTime).format('YYYY-MM-DD hh:mm:ss')
      }
      if (this.title == '' || this.content == '' || this.checked == []) {
        this.$message({
          message: '请正确填写！',
        });
      } else {
        pushArea(data).then(res => {
          if (res.data.code == '00000') {
            this.$message({
              message: '推送成功！',
              type: 'success'
            });
            this.closeMobileDialog()
            this.$parent.searchMobilePush()
          }
        })
      }
    },
    handleCheckChange(data, tree) {
      this.checked = tree.checkedNodes
    }
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

.mobile-push-add-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 400px;
  height: 650px;
  position: fixed;
  right: 355px;
  top: 145px;
  z-index: 15;
}

.mobile-push-add-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.mobile-push-add-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.mobile-push-add-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.mobile-push-add-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -32px;
}

.mobile-push-add-font {
  color: white;
  line-height: 40px;
  font-size: 15px;
}


.tree {
  display: inline-block;
  width: 70%;
  vertical-align: top;
  background: none;
  color: white;
  margin-top: 7px;
  max-height: 200px;
  overflow-y: scroll;
}

.mobile-push-add-button {
  color: #ffffff;
  background-color: rgb(58, 118, 146);
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
