<template>
  <div class="earth-background">
    <!--标题栏-->
    <el-row>
      <div class="header" style="width:100%">
        <el-row :gutter="0">
          <el-col :span="2">
            <div class="time">{{ dateFormat(date) }}</div>
          </el-col>
          <el-col :span="1">
            <div style="background-color: rgba(0,0,0,0)">&nbsp;</div>
          </el-col>
          <el-col :span="5">
            <div>
              <img src="../../static/img/background/leftButton.png"
                   style="width:130px;height:52px;position:absolute; left: 235px;top:-2px"/>
              <img src="../../static/img/background/leftButton.png"
                   style="width:130px;height:52px;position:absolute; left: 360px;top:-3px"/>
              <img src="../../static/img/background/leftButton.png"
                   style="width:130px;height:52px;position:absolute; left: 485px;top:-3px"/>
              <el-menu ref="firstMenu" mode="horizontal" background-color="rgba(0,0,0,0)" text-color="#21d7e7"
                       active-text-color="#8df6ff"
                       @select="handleMenuSelect" style="border-bottom: 0;">
                <el-menu-item index="0">数据分析</el-menu-item>
                  <!--                <el-submenu index="0">-->
                  <!--                  <template slot="title" >数据分析</template>-->
                  <!--                  <el-menu-item index="0-1">客源分析</el-menu-item>-->
                  <!--                  <el-menu-item index="0-2">营销分析</el-menu-item>-->
                  <!--                  <el-menu-item index="0-3">入园游客分析</el-menu-item>-->
                  <!--                </el-submenu>-->
                <el-submenu index="1">
                  <template slot="title">基础设施</template>
                  <el-menu-item index="1-1">监控摄像头</el-menu-item>
                  <el-menu-item index="1-2">检票闸机</el-menu-item>
                  <el-menu-item index="1-3">地面广播</el-menu-item>
                  <el-menu-item index="1-4">停车场</el-menu-item>
                  <el-menu-item index="1-5">服务点</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">文旅资源</template>
                  <el-menu-item index="2-1">景区总览</el-menu-item>
                  <el-menu-item index="2-2">主要景点</el-menu-item>
                  <el-menu-item index="2-3">知识点</el-menu-item>
                  <el-menu-item index="2-4">文旅活动</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="8">
            <img height="50" src="../../static/img/background/title.png" style="margin-top: 5px;" alt="该图片无法显示"/>
          </el-col>
          <el-col :span="1">
            <div style="background-color: rgba(0,0,0,0)">&nbsp;</div>
          </el-col>
          <el-col :span="5">
            <div>
              <img src="../../static/img/background/rightButton.png"
                   style="width:130px;height:52px;position:absolute; left: 1358px;top:-3px"/>
              <img src="../../static/img/background/rightButton.png"
                   style="width:130px;height:52px;position:absolute; left: 1483px;top:-3px"/>
              <img src="../../static/img/background/rightButton.png"
                   style="width:130px;height:52px;position:absolute; left: 1608px;top:-3px"/>
              <el-menu ref="secondMenu" mode="horizontal" background-color="rgba(0,0,0,0)" text-color="#21d7e7"
                       active-text-color="#8df6ff"
                       @select="handleMenuSelect" style="border-bottom: 0;">
                <el-submenu index="3">
                  <template slot="title">异常报警</template>
                  <el-menu-item index="3-1">拥堵区域</el-menu-item>
                  <el-menu-item index="3-2">清园滞留</el-menu-item>
                  <el-menu-item index="3-3">游客报警</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">应急指挥</template>
                  <el-menu-item index="4-1">应急预案查看</el-menu-item>
                  <el-menu-item index="4-2">区域客流预测</el-menu-item>
                  <el-menu-item index="4-3">地面广播通知</el-menu-item>
                  <el-menu-item index="4-4">游客手机推送</el-menu-item>
                  <el-menu-item index="4-5">游客轨迹查询</el-menu-item>
                  <el-menu-item index="4-6">无人机导览</el-menu-item>
                  <el-menu-item index="4-7">景区车辆</el-menu-item>
                  <el-menu-item index="4-8">工作人员</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">系统仿真</template>
                  <el-menu-item index="5-1">模拟游客客流</el-menu-item>
                  <el-menu-item index="5-2">模拟景区车辆</el-menu-item>
                  <el-menu-item index="5-3">模拟工作人员</el-menu-item>
                  <el-menu-item index="5-4">模拟天气状况</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col :span="8">
                <i class="el-icon-s-custom"
                   style="color: #ffffff;font-size: 16px;line-height: 150%;margin-top: 2px;"></i>
              </el-col>
              <el-col :span="8">
                <el-button icon="el-icon-s-tools " @click="confirmSetting"
                           style="font-size:18px;color:#ffffff;background-color:transparent; border-color:rgba(0,0,0,0); padding: 1px;margin-top: 2px;"></el-button>
              </el-col>
              <el-col :span="8">
                <el-button icon="el-icon-switch-button" @click="confirmQuit"
                           style="font-size:18px;color:#ffffff;background-color:transparent; border-color:rgba(0,0,0,0); padding: 1px;margin-top: 2px;"></el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="user-name-font">{{ userName }}</div>
              </el-col>
              <el-col :span="8">
                <div class="user-name-font">系统</div>
              </el-col>
              <el-col :span="8">
                <div class="user-name-font">退出</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--导入earth SDK-->
    <div ref="earthContainer" @click="coordinateClick"
         style="width: 98.4%; height: 90%; position: fixed;top: 70px; left: 15px;">
    </div>
    <!--左侧栏-->
    <div class="left-bar">
      <overview v-show="true" ref="overview"></overview>
      <StatisticAnalysis v-show="true" ref="statisticAnalysis"></StatisticAnalysis>
      <div class="left-layer-bar">
        <el-row>
          <div class="sub-header">图层</div>
        </el-row>
        <div class="layer-left">
          <el-checkbox class="checkbox-spot" :indeterminate="isIndeterminate" v-model="isSpotShow"
                       @change="handleSpotChange">景点与服务
          </el-checkbox>
          <el-checkbox class="checkbox-spot-children" v-model="isMainSpotShow" @change="handleMainSpotChange">主要景点
            <img style='width:16px; height:16px; margin-left:0px' src="../../static/img/pinIcon/spot/spot.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-spot-children" v-model="isParkingShow" @change="handleParkingChange">停车场
            <img style='width:16px; height:16px; margin-left:18px' src="../../static/img/pinIcon/spot/parking.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-spot-children" v-model="isToiletShow" @change="handleToiletChange">卫生间
            <img style='width:16px; height:16px; margin-left:18px' src="../../static/img/pinIcon/spot/toilet.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-spot-children" v-model="isRestaurantShow" @change="handleRestaurantChange">餐饮
            <img style='width:16px; height:16px; margin-left:34px' src="../../static/img/pinIcon/spot/restaurant.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-spot-children" v-model="isSpotOtherShow" @change="handleSpotOtherChange">其他
            <img style='width:16px; height:16px; margin-left:34px' src="../../static/img/pinIcon/spot/hotel.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
        </div>
        <div class="verticalBar"></div>
        <div class="layer-right">
          <el-checkbox class="checkbox-camera" v-model="isCameraShow" @change="handleCameraChange">监控摄像头
            <img style='width:18px; height:18px; margin-left:5px' src="../../static/img/pinIcon/camera.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-broadcast" v-model="isBroadcastShow" @change="handleBroadcastChange">地面广播
            <img style='width:16px; height:16px; margin-left:20px' src="../../static/img/pinIcon/broadcast.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-uav" v-model="isUAVShow" @change="handleUAVChange">无人机
            <img style='width:16px; height:16px; margin-left:36px' src="../../static/img/pinIcon/uav.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-alarm" v-model="isAlarmShow" @change="handleAlarmChange">游客报警
            <img style='width:16px; height:16px; margin-left:20px' src="../../static/img/pinIcon/alarm.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-road" v-model="isRoadShow" @change="handleRoadChange">路网路况
            <img style='width:16px; height:16px; margin-left:20px' src="../../static/img/pinIcon/road.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
          <el-checkbox class="checkbox-passenger" v-model="isPassengerShow" @change="handlePassengerChange">区域客流
            <img style='width:16px; height:16px; margin-left:20px' src="../../static/img/pinIcon/passenger.png"
                 alt="该图片无法显示"/>
          </el-checkbox>
        </div>
      </div>
    </div>
    <!--底边栏-->
    <div class="footer">
      <div v-show="!isPositionShow">
        <span>坐标系：GCJ02</span>
        <span class="longitude1" :data-clipboard-text="numFilter8(118.05741700)" data-clipboard-action="copy"
              @click="copy('.longitude1')">经度：118.05741700°</span>
        <span class="latitude1" :data-clipboard-text="numFilter8(35.46518300)" data-clipboard-action="copy"
              @click="copy('.latitude1')">纬度：35.46518300°</span>
        <span class="altitude1" :data-clipboard-text="numFilter2(600.00)" data-clipboard-action="copy"
              @click="copy('.altitude1')">海拔高度：600.00m</span>
        <span class="yaw1" :data-clipboard-text="numFilter2(rotation[0])" data-clipboard-action="copy"
              @click="copy('.yaw1')">偏航角：{{ numFilter2(rotation[0]) }}°</span>
        <span class="pitch1" :data-clipboard-text="numFilter2(rotation[1])" data-clipboard-action="copy"
              @click="copy('.pitch1')">俯仰角：{{ numFilter2(rotation[1]) }}°</span>
        <span class="roll1" :data-clipboard-text="numFilter2(rotation[2])" data-clipboard-action="copy"
              @click="copy('.roll1')">翻转角：{{ numFilter2(rotation[2]) }}°</span>
      </div>
      <div v-show="isPositionShow">
        <span>坐标系：GCJ02</span>
        <span class="longitude2" :data-clipboard-text="numFilter8(position[0])" data-clipboard-action="copy"
              @click="copy('.longitude2')">经度：{{ numFilter8(position[0]) }}°</span>
        <span class="latitude2" :data-clipboard-text="numFilter8(position[1])" data-clipboard-action="copy"
              @click="copy('.latitude2')">纬度：{{ numFilter8(position[1]) }}°</span>
        <span class="altitude2" :data-clipboard-text="numFilter2(position[2])" data-clipboard-action="copy"
              @click="copy('.altitude2')">海拔高度：{{ numFilter2(position[2]) }}m</span>
        <span class="yaw2" :data-clipboard-text="numFilter2(rotation[0])" data-clipboard-action="copy"
              @click="copy('.yaw2')">偏航角：{{ numFilter2(rotation[0]) }}°</span>
        <span class="pitch2" :data-clipboard-text="numFilter2(rotation[1])" data-clipboard-action="copy"
              @click="copy('.pitch2')">俯仰角：{{ numFilter2(rotation[1]) }}°</span>
        <span class="roll2" :data-clipboard-text="numFilter2(rotation[2])" data-clipboard-action="copy"
              @click="copy('.roll2')">翻转角：{{ numFilter2(rotation[2]) }}°</span>
      </div>
    </div>
    <!--系统-->
    <quit-dialog :quit-dialog-show.sync="quitDialogShow"></quit-dialog>
    <setting-dialog :setting-dialog-show.sync="settingDialogShow"></setting-dialog>
    <!--数据分析-->
    <customer-analysis-detail v-if="customerAnalysisRightShow"></customer-analysis-detail>
    <market-analysis-detail v-if="marketAnalysisRightShow"></market-analysis-detail>
    <!--基础设施-->
    <camera-detail :camera-detail-show.sync="cameraRightShow"></camera-detail>
    <camera-dialog :source-obj="cameraObjToShowDialog" :show-camera-dialog.sync="cameraDialogShow"></camera-dialog>
    <fare-gate-detail :fare-gate-right-show.sync="fareGateRightShow"></fare-gate-detail>
    <broadcast-detail :broadcast-detail-show.sync="broadcastRightShow"></broadcast-detail>
    <parking-detail :parking-detail-show.sync="parkingRightShow"></parking-detail>
    <parking-dialog :source-obj="parkingObjToShowDialog" :show-parking-dialog.sync="parkingDialogShow"></parking-dialog>
    <spot-detail ref="spotRight" :spot-detail-show.sync="spotRightShow"
                 :spot-obj-to-show-dialog.sync="spotObjToShowDialog"
                 :spot-dialog-show.sync="spotDialogShow"></spot-detail>
    <spot-dialog ref="spotDialog" :source-obj="spotObjToShowDialog"
                 :show-spot-dialog.sync="spotDialogShow"></spot-dialog>
    <!--文旅资源-->
    <scenic-overview :scenic-overview-show.sync="scenicOverviewShow"></scenic-overview>
    <knowledge-detail v-if="knowledgeRightShow"></knowledge-detail>
    <tourism-activity-detail :tourism-activity-right-show.sync="tourismActivityRightShow"></tourism-activity-detail>
    <!--异常报警-->
    <alarm-detail ref="alarm" v-if="alarmRightShow" :type="this.selectedAlarmType"></alarm-detail>
    <!--应急指挥-->
    <plan-detail :plan-detail-show.sync="planRightShow"/>
    <area-passenger-flow-detail v-if="areaPassengerFlowRightShow"/>
    <mobile-push-detail v-if="mobilePushRightShow"></mobile-push-detail>
    <tourist-track-detail :tourist-track-detail-show.sync="touristTrackDetailShow"></tourist-track-detail>
    <uav-detail v-if="uavDetailRightShow"></uav-detail>
    <scenic-vehicle-detail v-if="scenicVehicleRightShow"></scenic-vehicle-detail>
    <staff-detail v-if="staffRightShow"></staff-detail>
    <!--系统仿真-->
    <simulator-tourist-detail :simulator-tourist-right-show.sync="simulatorTouristRightShow"></simulator-tourist-detail>
    <simulator-vehicle-detail :simulator-vehicle-show.sync="simulatorVehicleRightShow"></simulator-vehicle-detail>
    <simulator-staff-detail :simulator-staff-show.sync="simulatorStaffRightShow"></simulator-staff-detail>
    <simulator-weather-detail :simulator-weather-show.sync="simulatorWeatherRightShow"></simulator-weather-detail>
  </div>
</template>

<script>
import {dateFormat, deg2rad, numFilter2, numFilter8, rad2deg, strLenCustom} from '../utils'
import Config from "../config";
import {SPOT_NAME_TYPE_MAP, SPOT_OTHER_LIST, SPOT_TYPE_ICON_MAP} from "../config/spotMap"
import {CROWD_LEVEL_COLOR_MAP} from "../config/app.config"
import cameraImg from '../../static/img/pinIcon/camera.png'
import broadcast from '../../static/img/pinIcon/broadcast.png'
import alarm1 from '../../static/img/pinIcon/alarm1.png'
import alarm2 from '../../static/img/pinIcon/alarm2.png'
import peoplealarm1 from '../../static/img/pinIcon/peoplealarm1.png'
import peoplealarm2 from '../../static/img/pinIcon/peoplealarm2.png'
import wxalarm1 from '../../static/img/pinIcon/wxalarm1.png'
import wxalarm2 from '../../static/img/pinIcon/wxalarm2.png'
import tracePoint from '../../static/img/pinIcon/tracePoint.png'
import {getSpotInfo} from '../api/spot'
import {getParkingInfo} from "../api/parking";
import {getCameraInfo} from '../api/camera'
import {getSpeakerInfo} from "../api/speaker";
import {getAreaInfo} from "../api/area";
import {getWarningInfo} from "../api/alarm";
import Clipboard from "clipboard";
//左侧栏
import overview from "./system/overview.vue";
import StatisticAnalysis from "./system/statisticAnalysis.vue";
//菜单栏
import quitDialog from "./system/quitDialog.vue";
import settingDialog from "./system/settingDialog.vue";
//图标点击事件弹框
import spotDialog from './dialog/spotDialog.vue'
import cameraDialog from "./dialog/cameraDialog.vue";
import parkingDialog from "./dialog/parkingDialog.vue";
//标题栏右侧详情列表
import scenicOverview from "./header/tourismResource/ScenicOverview.vue";
import cameraDetail from "./header/installation/cameraDetail.vue";
import FareGateDetail from "./header/installation/fareGateDetail.vue";
import broadcastDetail from './header/installation/broadcastDetail.vue'
import parkingDetail from "./header/installation/parkingDetail.vue";
import spotDetail from "./header/tourismResource/spotDetail.vue";
import knowledgeDetail from "./header/tourismResource/knowledgeDetail.vue";
import tourismActivityDetail from "./header/tourismResource/tourismActivityDetail.vue";
import alarmDetail from "./header/alarmDetail.vue";
import planDetail from "./header/emergencyCommand/planDetail.vue";
import areaPassengerFlowDetail from './header/emergencyCommand/areaPassengerFlowDetail.vue'
import mobilePushDetail from "./header/emergencyCommand/mobilePushDetail.vue";
import touristTrackDetail from "./header/emergencyCommand/touristTrackDetail.vue";
import uavDetail from "./header/emergencyCommand/uavDetail.vue";
import scenicVehicleDetail from "./header/emergencyCommand/scenicVehicleDetail.vue";
import staffDetail from "./header/emergencyCommand/staffDetail.vue";
import simulatorTouristDetail from "./header/simulator/simulatorTouristDetail.vue";
import simulatorVehicleDetail from "./header/simulator/simulatorVehicle.vue";
import simulatorStaffDetail from "./header/simulator/simulatorStaff.vue";
import simulatorWeatherDetail from "./header/simulator/simulatorWeather.vue";
import customerAnalysisDetail from "./header/dataAnalysis/customerAnalysis.vue";
import marketAnalysisDetail from "./header/dataAnalysis/marketAnalysis.vue";
import {Message} from 'element-ui'
import {VEHICLE_SIM_PATHS, STAFF_SIM_PATHS} from "../config/simPath";
import {SPOT_MODELS, SIM_MODELS} from "../config/glbModel";
import CoordTransform from "../utils/coordTransform";

export default {
  name: "SDKEarth",
  data() {
    return {
      userRoleId: '',
      userName: '',
      activeIndex: '0',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      // 天气设置
      rainEnabled: false,
      snowEnabled: false,
      fogEnabled: false,
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      date: new Date(),
      contentDataRaw: {},//直接从后端获得的各种内容的原始数据
      czmObjects: {},//处理后的czmObject对象
      //经纬度显示
      isClick: true,
      isPositionShow: false,
      //标题栏
      quitDialogShow: false,
      settingDialogShow: false,
      //左侧图层栏的显示，默认选择核心景点和路网路况
      isIndeterminate: true,
      isSpotShow: true,
      isMainSpotShow: true,
      isParkingShow: true,
      isToiletShow: true,
      isRestaurantShow: true,
      isSpotOtherShow: true,
      isCameraShow: false,
      isBroadcastShow: false,
      isUAVShow: false,
      isAlarmShow: false,
      isRoadShow: true,
      isPassengerShow: false,
      //核心景点
      spotDialogShow: false,//核心景点主菜单
      spotObjToShowDialog: {},//被点击的景点对象
      //监控摄像头
      cameraDialogShow: false,
      cameraObjToShowDialog: {},//摄像头相关信息
      //停车场
      parkingDialogShow: false,
      parkingObjToShowDialog: {},
      //上方标题栏的选中弹框,默认全部隐藏
      customerAnalysisRightShow: false,//数据分析->客源分析
      marketAnalysisRightShow: false,//数据分析->营销分析
      cameraRightShow: false,//基础设施->监控摄像头
      fareGateRightShow: false,//基础设施->检票闸机
      parkingRightShow: false,////基础设施->停车场
      broadcastRightShow: false,//基础设施->地面广播
      scenicOverviewShow: true,//文旅资源->景区总览
      spotRightShow: false,//文旅资源->主要景点
      knowledgeRightShow: false,//文旅资源->知识点
      tourismActivityRightShow: false,//文旅资源->文旅活动
      alarmRightShow: false,//异常报警
      selectedAlarmType: 0,
      planRightShow: false,//应急指挥->应急预案查看
      areaPassengerFlowRightShow: false, //应急指挥->区域客流预测
      mobilePushRightShow: false,//应急指挥->游客手机推送
      touristTrackDetailShow: false,//应急指挥->游客轨迹查询
      uavDetailRightShow: false,//应急指挥->无人机总览
      scenicVehicleRightShow: false,//应急指挥->景区车辆
      staffRightShow: false,//应急指挥->工作人员
      simulatorTouristRightShow: false,//系统仿真->模拟游客客流
      simulatorVehicleRightShow: false,//系统仿真->模拟景区车辆
      simulatorStaffRightShow: false,//系统仿真->模拟工作人员
      simulatorWeatherRightShow: false,//系统仿真->模拟天气状况
      winPos: [0, 0, 0, 0], // left top right bottom
      alarmLayerTimer: null,
    }
  },
  components: {
    //左侧栏
    StatisticAnalysis,
    overview,
    //菜单栏
    quitDialog,
    settingDialog,
    //图标点击事件
    spotDialog,
    cameraDialog,
    parkingDialog,
    //右侧弹框事件
    scenicOverview,
    cameraDetail,
    FareGateDetail,
    broadcastDetail,
    parkingDetail,
    spotDetail,
    knowledgeDetail,
    tourismActivityDetail,
    alarmDetail,
    planDetail,
    areaPassengerFlowDetail,
    mobilePushDetail,
    touristTrackDetail,
    uavDetail,
    scenicVehicleDetail,
    staffDetail,
    simulatorTouristDetail,
    simulatorVehicleDetail,
    simulatorStaffDetail,
    simulatorWeatherDetail,
    customerAnalysisDetail,
    marketAnalysisDetail,
  },
  methods: {
    //退出
    confirmQuit() {
      this.closeAll()
      this.quitDialogShow = true
    },
    //设置
    confirmSetting() {
      this.closeAll()
      this.settingDialogShow = true
    },
    //处理菜单激活状态
    handleMenuActive(key) {
      if (key.charAt(0) == '0' || key.charAt(0) == '1' || key.charAt(0) == '2')
        this.$refs.secondMenu.activeIndex = null
      else if (key.charAt(0) == '3' || key.charAt(0) == '4' || key.charAt(0) == '5')
        this.$refs.firstMenu.activeIndex = null
    },
    //处理header菜单点击
    async handleMenuSelect(key) {
      this.handleMenuActive(key)
      if(key =='0'){
        var url = this.$router.resolve({
          path:'/analysis'
        })
        window.open(url.href)
        // this.$router.push('/analysis');
      }
      // if (key == '0-1') {
      //   this.closeAll()
      //   this.customerAnalysisRightShow = true
      // } else if (key == '0-2') {
      //   this.closeAll()
      //   this.marketAnalysisRightShow = true
      // } else if (key == '0-3') {
      //   this.closeAll()
      //   //入园游客分析
      // }
      else if (key == '1-1') {
        this.closeAll()
        this.isCameraShow = true
        this.cameraRightShow = true
        if (this.czmObjects['camera']) this.czmObjects['camera'].forEach((e) => {
          e.enabled = true;
        });
      } else if (key == '1-2') {
        this.closeAll()
        this.fareGateRightShow = true
        //todo:还需要补充闸机的图层显示
      } else if (key == '1-3') {
        this.closeAll()
        this.isBroadcastShow = true
        this.broadcastRightShow = true
        this.czmObjects['speaker'].forEach(e => {
          e.enabled = true
        })
      } else if (key == '1-4') {
        this.closeAll()
        if (this.userRoleId == '100') {
          this.isParkingShow = true;
          this.parkingRightShow = true;
          if (this.czmObjects['parking']) this.czmObjects['parking'].forEach((e) => {
            e.enabled = true;
          });
        }
      } else if (key == '1-5') {
        this.closeAll()
        this.isRestaurantShow = true
        this.isToiletShow = true
        this.isSpotOtherShow = true
        this.handleRestaurantChange()
        this.handleSpotOtherChange()
        this.handleToiletChange()
        this.spotRightShow = true
        this.$refs.spotRight.spotType = [2, 3, 4, 5, 6, 7, 9, 10]
        this.$refs.spotRight.getSpotList()
      } else if (key == '2-1') {
        this.closeAll()
        this.scenicOverviewShow = true
        this.isIndeterminate = false
        this.isSpotShow = true
        this.handleSpotChange()
        this.resetView();
      } else if (key == '2-2') {
        this.closeAll()
        this.isMainSpotShow = true
        this.handleMainSpotChange()
        this.spotRightShow = true
        this.$refs.spotRight.spotType = [1]
        this.$refs.spotRight.getSpotList()
      } else if (key == '2-3') {
        this.closeDialogAndRight()
        this.knowledgeRightShow = true
      } else if (key == '2-4') {
        this.closeAll()
        this.tourismActivityRightShow = true
        //todo: 显示文旅活动位置
      } else if (key == '3-1') {
        await this.closeAll()
        this.selectedAlarmType = 1
        this.alarmRightShow = true
        this.isAlarmShow = true
        this.handleAlarmChange()
      } else if (key == '3-2') {
        await this.closeAll()
        this.selectedAlarmType = 6
        this.alarmRightShow = true
        this.isAlarmShow = true
        this.handleAlarmChange()
      } else if (key == '3-3') {
        await this.closeAll()
        this.selectedAlarmType = 5
        this.alarmRightShow = true
        this.isAlarmShow = true
        this.handleAlarmChange()
      } else if (key == '4-1') {
        this.closeDialogAndRight()
        this.planRightShow = true
      } else if (key == '4-2') {
        this.closeAll()
        this.isPassengerShow = true
        this.areaPassengerFlowRightShow = true
        this.refreshQuery()
        if (this.czmObjects['polygon']) this.czmObjects['polygon'].forEach(e => {
          e.enabled = true
        })
        if (this.czmObjects['polygonCount']) this.czmObjects['polygonCount'].forEach(e => {
          this._earth.getObject(e).show = true
        })
        this.czmObjects['polygonName'].forEach(e => {
          this._earth.getObject(e).show = true
        })
      } else if (key == '4-3') {
        this.closeAll()
        this.isBroadcastShow = true
        this.broadcastRightShow = true
        this.czmObjects['speaker'].forEach(e => {
          e.enabled = true
        })
      } else if (key == '4-4') {
        this.closeDialogAndRight()
        this.mobilePushRightShow = true
      } else if (key == '4-5') {
        this.closeAll()
        this.touristTrackDetailShow = true
      } else if (key == '4-6') {
        this.closeAll()
        this.uavDetailRightShow = true
      } else if (key == '4-7') {
        this.closeAll()
        this.scenicVehicleRightShow = true
      } else if (key == '4-8') {
        this.closeAll()
        this.staffRightShow = true
      } else if (key == '5-1') {
        this.closeAll()
        this.isPassengerShow = true
        this.simulatorTouristRightShow = true
        if (this.czmObjects['polygon']) this.czmObjects['polygon'].forEach(e => {
          e.enabled = true
        })
        if (this.czmObjects['polygonCount']) this.czmObjects['polygonCount'].forEach(e => {
          this._earth.getObject(e).show = true
        })
        this.czmObjects['polygonName'].forEach(e => {
          this._earth.getObject(e).show = true
        })
      } else if (key == '5-2') {
        this.closeAll()
        this.simulatorVehicleRightShow = true
      } else if (key == '5-3') {
        this.closeAll()
        this.simulatorStaffRightShow = true
      } else if (key == '5-4') {
        this.closeDialogAndRight()
        this.simulatorWeatherRightShow = true
      }
    },
    //关闭对话框和右侧弹框
    closeDialogAndRight() {
      //关闭对话框
      this.spotDialogShow = false
      this.cameraDialogShow = false
      this.parkingDialogShow = false
      //关闭对话框的子组件弹窗
      this.$refs.spotDialog.showCameraDialog = false;
      this.$refs.spotDialog.showBroadcastDialog = false;
      this.$refs.spotDialog.showPanoBox = false;
      //关闭右侧栏
      this.customerAnalysisRightShow = false
      this.marketAnalysisRightShow = false
      this.scenicOverviewShow = false
      this.cameraRightShow = false
      this.fareGateRightShow = false
      this.broadcastRightShow = false
      this.parkingRightShow = false
      this.spotRightShow = false
      this.knowledgeRightShow = false
      this.tourismActivityRightShow = false
      this.alarmRightShow = false
      this.planRightShow = false
      this.areaPassengerFlowRightShow = false
      this.touristTrackDetailShow = false
      this.mobilePushRightShow = false
      this.uavDetailRightShow = false
      this.scenicVehicleRightShow = false
      this.staffRightShow = false
      this.simulatorTouristRightShow = false
      this.simulatorVehicleRightShow = false
      this.simulatorStaffRightShow = false
      this.simulatorWeatherRightShow = false
    },
    //关闭所有图层
    closeAll() {
      //关闭左侧选择栏
      this.isSpotShow = false
      this.isPassengerShow = false
      this.isBroadcastShow = false
      this.isAlarmShow = false
      this.isUAVShow = false
      this.isRoadShow = false
      this.isCameraShow = false
      this.isParkingShow = false
      //以上改变值不会触发回调函数，需要主动调用
      this.handleSpotChange()
      this.handlePassengerChange()
      this.handleBroadcastChange()
      this.handleAlarmChange()
      this.handleUAVChange()
      this.handleRoadChange()
      this.handleCameraChange()
      this.handleParkingChange()
      //关闭对话框和右侧弹框
      this.closeDialogAndRight()
      //删除地图上游客轨迹折线
      this.closePolyline()
      //删除地图上查询到的游客轨迹曲线与点
      this.cleanPassengerTrace()
    },
    checkIndeterminate() {
      if (this.isMainSpotShow && this.isParkingShow && this.isToiletShow && this.isRestaurantShow && this.isSpotOtherShow) {
        this.isIndeterminate = false
        this.isSpotShow = true
        this.handleSpotChange()
      } else if (!this.isMainSpotShow && !this.isParkingShow && !this.isToiletShow && !this.isRestaurantShow && !this.isSpotOtherShow) {
        this.isIndeterminate = false
        this.isSpotShow = false
        this.handleSpotChange()
      } else {
        this.isIndeterminate = true
      }
    },
    //处理图层点击
    handleSpotChange() {
      let checked = this.isSpotShow
      this.isIndeterminate = false
      this.isSpotShow = checked
      this.isMainSpotShow = checked
      this.isParkingShow = checked
      this.isToiletShow = checked
      this.isRestaurantShow = checked
      this.isSpotOtherShow = checked
      if (!this.czmObjects['spot']) return;
      this.czmObjects['spot'].forEach((e) => {
        e.enabled = checked;
      });
      if (!this.czmObjects['parking']) return;
      this.czmObjects['parking'].forEach((e) => {
        e.enabled = checked;
      });
    },
    handleMainSpotChange() {
      if (!this.czmObjects['spot']) return;
      let checked = this.isMainSpotShow
      this.checkIndeterminate()
      this.czmObjects['spot'].forEach((e) => {
        if (e.customProp == SPOT_NAME_TYPE_MAP.SPOT) e.enabled = checked;
      });
    },
    handleParkingChange() {
      if (!this.czmObjects['parking']) return;
      let checked = this.isParkingShow
      this.checkIndeterminate()
      this.czmObjects['parking'].forEach((e) => {
        e.enabled = checked;
      });
    },
    handleRestaurantChange() {
      if (!this.czmObjects['spot']) return;
      let checked = this.isRestaurantShow
      this.checkIndeterminate()
      this.czmObjects['spot'].forEach((e) => {
        if (e.customProp == SPOT_NAME_TYPE_MAP.RESTAURANT) e.enabled = checked;
      });
    },
    handleSpotOtherChange() {
      if (!this.czmObjects['spot']) return;
      let checked = this.isSpotOtherShow
      this.checkIndeterminate()
      this.czmObjects['spot'].forEach((e) => {
        if (SPOT_OTHER_LIST.includes(e.customProp)) e.enabled = checked;
      });
    },
    handleToiletChange() {
      if (!this.czmObjects['spot']) return;
      let checked = this.isToiletShow
      this.checkIndeterminate()
      this.czmObjects['spot'].forEach((e) => {
        if (e.customProp == SPOT_NAME_TYPE_MAP.TOILET) e.enabled = checked;
      });
    },
    handleCameraChange() {
      if (!this.czmObjects['camera']) return;
      let checked = this.isCameraShow
      this.czmObjects['camera'].forEach((e) => {
        e.enabled = checked;
      });
    },
    handleBroadcastChange() {
      if (!this.czmObjects['speaker']) return;
      let checked = this.isBroadcastShow
      this.czmObjects['speaker'].forEach((e) => {
        e.enabled = checked;
      });
    },
    handleUAVChange() {
      // todo:需要显示无人机位置，在飞行时可以实时变化
    },
    handleAlarmChange() {
      if (!this.czmObjects['alarm']) return;
      let checked = this.isAlarmShow
      if (checked) {
        if (this.timer2) {
          clearInterval(this.timer2)
        }
        let that = this
        this.timer2 = setInterval(function () {
          that.czmObjects['alarm'].forEach((e) => {
            e.enabled = true
            if (e.imageUrl == alarm1) {
              e.imageUrl = alarm2
              // e.imageUrl = null
            } else if (e.imageUrl == alarm2) {
              e.imageUrl = alarm1
            } else if (e.imageUrl == wxalarm1) {
              e.imageUrl = wxalarm2
            } else if (e.imageUrl == wxalarm2) {
              e.imageUrl = wxalarm1
            } else if (e.imageUrl == peoplealarm1) {
              e.imageUrl = peoplealarm2
            } else if (e.imageUrl == peoplealarm2) {
              e.imageUrl = peoplealarm1
            }
          });
        }, 300);
        this.refreshAlarm()
      } else {
        this.czmObjects['alarm'].forEach((e) => {
          if (this.timer2) {
            clearInterval(this.timer2)
          }
          e.enabled = false;
        });
        if (this.alarmLayerTimer) {
          clearInterval(this.alarmLayerTimer)
        }
      }
    },
    handleRoadChange() {
      let checked = this.isRoadShow
      if (this.czmObjects['roadMapLayer']) this.czmObjects['roadMapLayer'].enabled = checked;
    },
    handlePassengerChange() {
      let checked = this.isPassengerShow
      if (this.czmObjects['polygon']) this.czmObjects['polygon'].forEach(e => {
        e.enabled = checked
      })
      if (this.czmObjects['polygonCount']) this.czmObjects['polygonCount'].forEach(e => {
        this._earth.getObject(e).show = checked
      })
      if (this.czmObjects['polygonName']) this.czmObjects['polygonName'].forEach(e => {
        this._earth.getObject(e).show = checked
      })
      if (checked) this.refreshQuery()
    },
    //标准化时间
    dateFormat,
    //保留两位小数
    numFilter2,
    //保留八位小数
    numFilter8,
    //重置视角
    resetView() {
      // var lnglat = CoordTransform.gcj02towgs84(118.057417, 35.465183);
      let lnglat = [118.057417, 35.465183];
      this._earth.camera.flyTo([lnglat[0] * deg2rad, lnglat[1] * deg2rad, 100], 11000, [0, -90 * deg2rad, 0], 0);
    },
    //飞入视角
    flyToView(lng, lat) {
      // var lnglat = CoordTransform.gcj02towgs84(lng, lat);
      if (lng === null || lat === null) return;
      let lnglat = [lng, lat];
      //todo:加上高度参数altitude
      this._earth.camera.flyTo([lnglat[0] * deg2rad, lnglat[1] * deg2rad, 100], 1100, [0, -90 * deg2rad, 0], 0);
    },
    removeMobilePush() {
      this.mobilePushRightShow = false
      this.closePolyline()
    },
    /**加载并装载spot数据*/
    getSpotData() {
      return getSpotInfo({
        pageTotal: 999,
      }).then((res) => {
        if (res.data.code == "00000") {
          let pinSpotSingleDemo = { //用于设置景点pin的json框架
            ref: 'pin_spot_1',
            czmObject: {
              name: "pin_spot_1",
              xbsjType: "Pin",
              position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
              near: 0,
              // 若使用相对或绝对路径字符串，earthsdk会转化为异步网络请求，web服务器加了路径前缀时会404
              // 此处提前import转化为静态资源. 感谢@传润
              imageUrl: SPOT_TYPE_ICON_MAP[1], //默认为景点图标
              scale: 0.13,
            },
          };
          this.contentDataRaw['spot'] = res.data.data.pageContent;
          let tmpList = [];
          let lngLatList = [];//放入顺序应该与tmpList同步
          this.contentDataRaw['spot'].forEach((e) => {
            if (e.state == 0) {
              var tmpPinJsonObj = Object.assign({}, pinSpotSingleDemo);//复制到指定对象，目的创建json框架
              // 设置各个属性
              var pinName = 'pin_spot_' + e.spotId;
              tmpPinJsonObj.ref = pinName;
              tmpPinJsonObj.czmObject.name = pinName;
              tmpPinJsonObj.czmObject.customProp = e.spotType;//在customProp中记录景点类型id，方便对象打点判断
              // var lnglat = CoordTransform.gcj02towgs84(e.longitude, e.latitude);
              var lnglat = [e.longitude, e.latitude];
              tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.altitude == null ? 0 : 0];//现在有异步高度采样，不使用数据库中高度了
              tmpPinJsonObj.czmObject.imageUrl = SPOT_TYPE_ICON_MAP[e.spotType]
              // 加入sceneTree，显示在页面
              this._earth.sceneTree.root.children.push(tmpPinJsonObj);
              // 获取pin的czmObject对象
              var tmpPinObj = this._earth.sceneTree.$refs[pinName].czmObject;
              var pinExtTextFontSize = 30;
              var pinExtTextOffsetH = pinExtTextFontSize * strLenCustom(e.spotName) / 4.0;
              // 通过builder为pin对象设置各种属性
              tmpPinObj.pinBuilder.extText = e.spotName.trim();
              tmpPinObj.pinBuilder.extTextFont = pinExtTextFontSize + "px 黑体";
              tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              tmpList.push(tmpPinObj);// 放入列表
              lngLatList.push(lnglat);
              // 给pin对象绑定事件，因为景点中停车场数据已经删除了，所以不需要过滤了
              tmpPinObj.onclick = () => {
                this.closeDialogAndRight();
                this.spotObjToShowDialog = {
                  spotId: e.spotId,
                  spotName: e.spotName,
                };
                this.spotDialogShow = true;
                // this.spotRightShow = true;
              };
              tmpPinObj.onmouseover = () => {//鼠标移入，图标变大，文字上升
                tmpPinObj.scale = pinSpotSingleDemo.czmObject.scale * 1.1;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize * 1.1];
              };
              tmpPinObj.onmouseout = () => {//鼠标移出，图标和文字复原
                tmpPinObj.scale = pinSpotSingleDemo.czmObject.scale;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              };
            }
          });

          //异步更新高度
          this.sampleHeightsAsync(lngLatList).then(updatedPosition => {//原地修改，updatedPosition其实就是lngLatList的引用
            updatedPosition.forEach((e, i) => {
              if (e.height && e.height > 0) tmpList[i].position = [e.longitude, e.latitude, e.height];
              if (tmpList[i].pinBuilder.extText == "丹丘谪仙") console.log([e.longitude, e.latitude, e.height])
              else return;//相当于continue
            })
          });
          //更新高度结束

          this.czmObjects['spot'] = tmpList;// 通过全局变量记录
        }
        this.handleSpotChange();//加载完手动调用check
      }).catch(error => {
        console.log(error);
      });//spot数据获取与装载完成
    },
    /**加载并装载parking数据*/
    getParkingData() {
      return getParkingInfo({
        pageTotal: 999,
      }).then((res) => {
        if (res.data.code == "00000") {
          let pinParkingSingleDemo = { //用于设置广播pin的json框架
            ref: 'pin_parking_1',
            czmObject: {
              name: "pin_parking_1",
              xbsjType: "Pin",
              position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
              near: 0,
              imageUrl: SPOT_TYPE_ICON_MAP[8],
              scale: 0.13,
            },
          };
          this.contentDataRaw['parking'] = res.data.data.pageContent;
          let tmpList = [];
          let lngLatList = [];
          this.contentDataRaw['parking'].forEach((e) => {
            if (e.state == 0) {
              var tmpPinJsonObj = Object.assign({}, pinParkingSingleDemo);//复制到指定对象，目的创建json框架
              // 设置各个属性
              var parkingName = 'pin_parking_' + e.parkingId;
              tmpPinJsonObj.ref = parkingName;
              tmpPinJsonObj.czmObject.name = parkingName;
              var lnglat = [e.longitude, e.latitude];
              tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.altitude == null ? 0 : 0];
              // 加入sceneTree，显示在页面
              this._earth.sceneTree.root.children.push(tmpPinJsonObj);
              // 获取pin的czmObject对象
              var tmpPinObj = this._earth.sceneTree.$refs[parkingName].czmObject;
              var pinExtTextFontSize = 30;
              var pinExtTextOffsetH = pinExtTextFontSize * strLenCustom(e.parkingName) / 4.0;
              // 通过builder为pin对象设置各种属性
              tmpPinObj.pinBuilder.extText = e.parkingName.trim();
              tmpPinObj.pinBuilder.extTextFont = pinExtTextFontSize + "px 黑体";
              tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              tmpList.push(tmpPinObj);// 放入列表
              lngLatList.push(lnglat);
              // 给pin对象绑定事件
              tmpPinObj.onclick = () => {
                this.closeDialogAndRight();
                this.parkingObjToShowDialog = e;
                if (this.userRoleId == '100')
                  this.parkingDialogShow = true;
              };
              tmpPinObj.onmouseover = () => {//鼠标移入，图标变大
                tmpPinObj.scale = pinParkingSingleDemo.czmObject.scale * 1.1;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize * 1.1];
              };
              tmpPinObj.onmouseout = () => {//鼠标移出，图标复原
                tmpPinObj.scale = pinParkingSingleDemo.czmObject.scale;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              };
            }
          });

          //异步更新高度
          this.sampleHeightsAsync(lngLatList).then(updatedPosition => {//原地修改，updatedPosition其实就是lngLatList的引用
            updatedPosition.forEach((e, i) => {
              if (e.height && e.height > 0) tmpList[i].position = [e.longitude, e.latitude, e.height];
              else return;//相当于continue
            })
          });
          //更新高度结束

          this.czmObjects['parking'] = tmpList;// 通过全局变量记录
        }
        this.handleParkingChange();
      }).catch(error => {
        console.log(error)
      });
    },
    /**加载并装载camera数据*/
    getCameraData() {
      return getCameraInfo({
        pageTotal: 999,
      }).then((res) => {
        if (res.data.code == "00000") {
          let pinCameraSingleDemo = { //用于设置摄像头pin的json框架
            ref: 'pin_camera_1',
            czmObject: {
              name: "pin_camera_1",
              xbsjType: "Pin",
              position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
              near: 0,
              imageUrl: cameraImg,
              scale: 0.15,
            },
          };
          this.contentDataRaw['spot'] = res.data.data.pageContent;
          let tmpList = [];
          let lngLatList = [];
          this.contentDataRaw['spot'].forEach((e) => {
            if (e.state == 0) {
              var tmpPinJsonObj = Object.assign({}, pinCameraSingleDemo);//复制到指定对象，目的创建json框架
              // 设置各个属性
              var pinName = 'pin_camera_' + e.cameraId;
              tmpPinJsonObj.ref = pinName;
              tmpPinJsonObj.czmObject.name = pinName;
              // var lnglat = CoordTransform.wgs84togcj02(e.cameraLongitude, e.cameraLatitude);
              var lnglat = [e.cameraLongitude, e.cameraLatitude];
              tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.cameraAltitude == null ? 0 : 0];//todo:后面改为e.cameraAltitude
              // 加入sceneTree，显示在页面
              this._earth.sceneTree.root.children.push(tmpPinJsonObj);
              // 获取pin的czmObject对象
              var tmpPinObj = this._earth.sceneTree.$refs[pinName].czmObject;
              var pinExtTextFontSize = 30;
              var pinExtTextOffsetH = pinExtTextFontSize * strLenCustom(e.cameraName) / 4.0;
              // 通过builder为pin对象设置各种属性
              tmpPinObj.pinBuilder.extText = e.cameraName.trim();
              tmpPinObj.pinBuilder.extTextFont = pinExtTextFontSize + "px 黑体";
              tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              tmpPinObj.pinBuilder.outlineColor = "#199F8F".xeColor;
              tmpList.push(tmpPinObj);// 放入列表
              lngLatList.push(lnglat);
              // 给pin对象绑定事件
              tmpPinObj.onclick = () => {
                this.closeDialogAndRight()
                this.cameraDialogShow = true
                this.cameraObjToShowDialog = e
              };
              tmpPinObj.onmouseover = () => {//鼠标移入，图标变大，文字上升
                tmpPinObj.scale = pinCameraSingleDemo.czmObject.scale * 1.1;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize * 1.1];
              };
              tmpPinObj.onmouseout = () => {//鼠标移出，图标和文字复原
                tmpPinObj.scale = pinCameraSingleDemo.czmObject.scale;
                tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
              };
            }
          });

          //异步更新高度
          this.sampleHeightsAsync(lngLatList).then(updatedPosition => {//原地修改，updatedPosition其实就是lngLatList的引用
            updatedPosition.forEach((e, i) => {
              if (e.height && e.height > 0) tmpList[i].position = [e.longitude, e.latitude, e.height];
              else return;//相当于continue
            })
          });
          //更新高度结束

          this.czmObjects['camera'] = tmpList;// 通过全局变量记录
        }
        this.handleCameraChange();
      }).catch(error => {
        console.log(error)
      }) //camera数据获取与装载完成
    },
    /** 加载无障碍游步道835(以高德路网代替了) **/
    getPolyline() {
      let data = [
        {
          id: 1,
          positions: [
            [2.060457756443043, 0.619114271670231, 0],
            [2.0603666579748476, 0.6190793278681691, 0]
          ],
          width: 6,
          color: [0, 1, 0, 1]
        },
        {
          id: 2,
          positions: [
            [2.0603666579748476, 0.6190793278681691, 0],
            [2.0602400907618663, 0.6190544614362069, 0]
          ],
          width: 6,
          color: [1, 1, 0, 1]
        },
        {
          id: 3,
          positions: [
            [2.0602400907618663, 0.6190544614362069, 0],
            [2.0600868473047163, 0.6190258699942768, 0]
          ],
          width: 6,
          color: [1, 0, 0, 1]
        }
      ]
      let tmpList = []
      var tmpObj = {
        ref: 'polyline1',
        czmObject: {
          xbsjType: 'Polyline',
          positions: [],
          width: 9,
          color: [1, 0, 0, 1]
        }
      }
      for (let obj of data) {
        tmpObj.ref = 'polyline' + obj.id
        tmpObj.czmObject.positions = obj.positions
        tmpObj.czmObject.width = obj.width
        // tmpObj.czmObject.color = obj.color
        this._earth.sceneTree.root.children.push(tmpObj)
      }
      for (let obj of data) {
        var polyline = earth.sceneTree.$refs[`${'polyline' + obj.id}`].czmObject
        polyline.material.XbsjColorMaterial.color = obj.color
        var tmpPinObj =
          earth.sceneTree.$refs[`${'polyline' + obj.id}`].czmObject
        tmpList.push(tmpPinObj) // 放入列表
      }
      this.czmObjects['polyline'] = tmpList // 通过全局变量记录

      let tmpList2 = []
      const evalString = `
                function measureText(text, font) {
                    if (!window._measureTextctx) {
                        const canvas = document.createElement('canvas');
                        window._measureTextctx = window._measureTextctx || canvas.getContext('2d');
                    }
                    const ctx = window._measureTextctx;

                    ctx.font = font;
                    const textMetrics = ctx.measureText(p.text); // TextMetrics object
                    const w = textMetrics.width;
                    const h = textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent;
                    return [w, h];
                }

                if (!p.text) {
                    XE.MVVM.extend(p, {
                        text: '无障碍游步道835',
                    });
                }

                const drawText = () => {
                    if (p.text) {
                        const font = '48px serif'
                        let [w, h] = measureText(p.text, font);
                        h += 10; // 上下扩展10个像素，避免中文字符被遮挡

                        p.width = p.height * w / h;
                        p.canvasWidth = w;
                        p.canvasHeight = h;

                        // canvasWidth会驱动canvas发生变化，这里需要延后绘制，否则绘制好以后的canvas会被清空
                        setTimeout(() => {
                            p.drawCanvas(ctx => {
                                ctx.font = "50px serif";
                                ctx.fillStyle = "rgba(255, 255, 255, 1)";
                                ctx.fillText(p.text, 0, p.canvasHeight - 5);
                            });
                        }, 0);
                    }
                }

                drawText();
                p.disposers.push(XE.MVVM.watch(() => p.text, drawText));
              `
      let positions = [2.060313249974172, 0.6191676340925068, 0]
      const pin1 = this.createPin(this._earth, evalString, positions, .2)
      tmpList2.push(pin1.guid)
      this.czmObjects['CustomGroundRectangle'] = tmpList2
    },
    /**加载高德路网*/
    getRoadMap() {
      let layerObjJson = {
        ref: 'imagery_roadMap',
        czmObject: {
          xbsjType: "Imagery",
          name: "高德影像标注",
          xbsjImageryProvider: {
            XbsjImageryProvider: {
              url: "https://webst02.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
            }
          }
        }
      };
      // 加入sceneTree
      this._earth.sceneTree.root.children.push(layerObjJson);
      // 获取czmObject对象
      let layerObj = this._earth.sceneTree.$refs['imagery_roadMap'].czmObject;
      // 通过全局变量记录
      this.czmObjects['roadMapLayer'] = layerObj;
      // 手动调用handle函数
      this.handleRoadChange();
    },
    /**加载glb模型*/
    getGlbModel() {
      let spotModelInfo = SPOT_MODELS;
      let simModelInfo = [];//预加载以后模拟要用到的模型
      VEHICLE_SIM_PATHS.concat(STAFF_SIM_PATHS).forEach(e => {
        var tmpModelInfo = Object.assign({}, SIM_MODELS[e.modelName]);//复制到指定对象，目的创建json框架
        tmpModelInfo.ref = e.modelRef;
        simModelInfo.push(tmpModelInfo);
      })
      let modelInfo = spotModelInfo.concat(simModelInfo);//要加载的模型信息列表
      // 模型json框架
      let modelSingleDemo = {
        ref: 'model_bridge',
        czmObject: {
          xbsjType: "Model",
          url: Config.apiPrefix + "/admin/images/bridge.glb",
          // url: "../static/vehicle.glb",
          scale: 700,
          // minimumPixelSize: 800,
          // maximumScale: 1000,
          xbsjPosition: [
            118.04029601 * deg2rad,
            35.46734033 * deg2rad,
            0
          ],
          xbsjRotation: [
            -10.5 * deg2rad,
            0,
            0
          ],
          show: true
        }
      };
      modelInfo.forEach(e => {
        var tmpModelJsonObj = Object.assign({}, modelSingleDemo);//复制到指定对象，目的创建json框架
        tmpModelJsonObj.ref = e.ref;
        tmpModelJsonObj.czmObject.url = e.url;
        tmpModelJsonObj.czmObject.scale = e.scale;
        tmpModelJsonObj.czmObject.xbsjPosition = e.position;
        tmpModelJsonObj.czmObject.xbsjRotation = e.rotation;
        tmpModelJsonObj.czmObject.show = e.isShowOnLoad;
        // 加入sceneTree
        this._earth.sceneTree.root.children.push(tmpModelJsonObj);
        // 获取czmObject对象
        let modelObj = this._earth.sceneTree.$refs[e.ref].czmObject;
        // 通过全局变量记录
        this.czmObjects[e.ref] = modelObj;
      })

    },
    /**加载虚拟漫游*/
    createSim(paths) { // todo:更新高度
      paths.forEach(e => {
        let pathObjJson = {
          czmObject: {
            xbsjType: "Path",
            positions: e.position,
            rotations: e.rotation,
            show: e.show, // 显示路径
            loop: e.loop, // 是否为环线
            showDirection: false, // 显示方向(默认为true)
            playing: true, // 飞行
            // 是否循环播放
            // 如果为false，则playing设置为true时，会从当前位置播放到最后一个关键点，并停止播放，此时playing属性会自动变成false。 若此属性为true时，播放到最后一个关键点以后，将自动重第一个关键点继续播放。
            loopPlay: true,
            currentSpeed: e.speed,
            showHelper: false
          }
        };

        // 不使用加入场景树的方式来创建了，便于销毁
        const pathObj = new XE.Obj.Path(this._earth);
        pathObj.xbsjFromJSON(pathObjJson.czmObject);
        // 通过全局变量记录
        this.czmObjects[e.pathRef] = pathObj;

        // 给模型绑定位置变更，不记录unwatch函数了，好像销毁时不调用unwatch也没事
        XE.MVVM.watch(pathObj, 'currentPosition', position => {
          this.czmObjects[e.modelRef].xbsjPosition = position;
        });

        // 给模型绑定旋转变更
        XE.MVVM.watch(pathObj, 'currentRotation', rotation => {
          var cp = rotation;
          this.czmObjects[e.modelRef].xbsjRotation = [cp[0] - Math.PI * 0.5, cp[1], cp[2]];
        });

        //使模型可见
        this.czmObjects[e.modelRef].show = true;
      });
    },
    /**清除虚拟漫游*/
    cleanSim(paths) {
      paths.forEach(e => {
        //使模型不可见
        this.czmObjects[e.modelRef].show = false;
        //清除Path
        this.czmObjects[e.pathRef] = this.czmObjects[e.pathRef] && this.czmObjects[e.pathRef].destroy();
      });

    },

    createPin(earth, showdata, positions, rotation, origin, color, fontsize) {
      // console.log(showdata)
      // console.log(positions)
      // let lon = 0
      // let lat = 0
      // for (let i = 0; i < positions.length / 2; i++) {
      //   lon += positions[2 * i]
      //   if (positions[2 * i + 1])
      //     lat += positions[2 * i + 1]
      // }
      // lon = lon / positions.length * 2
      // lat = lat / positions.length * 2

      const evalString = `
                function measureText(text, font) {
                    if (!window._measureTextctx) {
                        const canvas = document.createElement('canvas');
                        window._measureTextctx = window._measureTextctx || canvas.getContext('2d');
                    }
                    const ctx = window._measureTextctx;

                    ctx.font = font;
                    const textMetrics = ctx.measureText(p.text); // TextMetrics object
                    const w = textMetrics.width;
                    const h = textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent;
                    return [w, h];
                }

                if (!p.text) {
                    XE.MVVM.extend(p, {
                        text: '` + showdata + `',
                    });
                }

                const drawText = () => {
                    if (p.text) {
                        const font = '` + fontsize + `px serif'
                        let [w, h] = measureText(p.text, font);
                        h += 10; // 上下扩展10个像素，避免中文字符被遮挡

                        p.width = p.height * w / h ;
                        p.canvasWidth = w* 2;
                        p.canvasHeight = h;

                        // canvasWidth会驱动canvas发生变化，这里需要延后绘制，否则绘制好以后的canvas会被清空
                        setTimeout(() => {
                            p.drawCanvas(ctx => {
                                ctx.shadowOffsetX = 2;
                                ctx.shadowOffsetY = 2;
                                ctx.shadowBlur = 4;
                                ctx.shadowColor = "rgba(0, 0, 0, 1)";

                                ctx.font = "` + fontsize + `px serif";
                                ctx.fillStyle = "rgba(255, 255, 0, 1)";
                                ctx.fillText(p.text, 0, p.canvasHeight - 5);
                                // ctx.strokeText(p.text, 0, p.canvasHeight - 5,100);
                            });
                        }, 0);
                    }
                }

                drawText();
                p.disposers.push(XE.MVVM.watch(() => p.text, drawText));
              `
      const config = {
        // position: [lon/positions.length*2,lat/positions.length*2,0],
        position: [positions[0], positions[1], 0],
        rotation: rotation,
        width: 300,
        height: 300,
        origin: origin,
        color: color,
        show: this.isPassengerShow,
        evalString,
      }

      var p = new XE.Obj.CustomGroundRectangle(earth)
      p.xbsjFromJSON(config)
      return p
    },
    /*加载并装载speaker数据*/
    getSpeaker() {
      let data = {
        pageTotal: 999
      }
      getSpeakerInfo(data).then((res) => {
        if (res.data.code == "00000") {
          let pinSpeakerSingleDemo = { //用于设置广播pin的json框架
            ref: 'pin_speaker_1',
            czmObject: {
              name: "pin_speaker_1",
              xbsjType: "Pin",
              position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
              near: 0,
              imageUrl: broadcast,
              scale: 0.13,
              enabled: true
            },
          };
          this.contentDataRaw['speaker'] = res.data.data.pageContent;
          let tmpList = [];
          let lngLatList = [];
          this.contentDataRaw['speaker'].forEach((e) => {
            if (e.state == 0) {
              var tmpPinJsonObj = Object.assign({}, pinSpeakerSingleDemo);//复制到指定对象，目的创建json框架
              // 设置各个属性
              var speakerName = 'pin_speaker_' + e.speakerId;
              tmpPinJsonObj.ref = speakerName;
              tmpPinJsonObj.czmObject.name = speakerName;
              var lnglat = [e.longitude, e.latitude];
              tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.altitude == null ? 0 : 0];
              // 加入sceneTree，显示在页面
              this._earth.sceneTree.root.children.push(tmpPinJsonObj);
              // 获取pin的czmObject对象
              var tmpPinObj = this._earth.sceneTree.$refs[speakerName].czmObject;
              // 通过builder为pin对象设置各种属性
              tmpList.push(tmpPinObj);// 放入列表
              lngLatList.push(lnglat);
              // 给pin对象绑定事件
              tmpPinObj.onclick = () => {

              };
              tmpPinObj.onmouseover = () => {//鼠标移入，图标变大
                tmpPinObj.scale = pinSpeakerSingleDemo.czmObject.scale * 1.1;
              };
              tmpPinObj.onmouseout = () => {//鼠标移出，图标复原
                tmpPinObj.scale = pinSpeakerSingleDemo.czmObject.scale;
              };
            }
          });

          //异步更新高度
          this.sampleHeightsAsync(lngLatList).then(updatedPosition => {//原地修改，updatedPosition其实就是lngLatList的引用
            updatedPosition.forEach((e, i) => {
              if (e.height && e.height > 0) tmpList[i].position = [e.longitude, e.latitude, e.height];
              else return;//相当于continue
            })
          });
          //更新高度结束

          this.czmObjects['speaker'] = tmpList;// 通过全局变量记录
        }
        this.handleBroadcastChange();
      }).catch(error => {
        console.log(error)
      }) //speaker数据获取与装载完成
    },
    /*加载区域客流框*/
    getPolygon() {// todo:更新高度
      let params = {
        pageTotal: 9999
      }
      let data = []
      getAreaInfo(params).then((res) => {
        // console.log(res)

        if (res.data.code == '00000') {
          let result = res.data.data.pageContent
          // console.log(result)
          for (let e of result) {
            let area = {
              id: e.areaId,
              positions: [],
              areaName: e.areaName,
              currentTourists: e.currentTourists,
              points: [],
              crowdLevel: e.crowdLevel
            }
            //计算客流框坐标
            if (e.areaSegmentList.length > 0) {
              for (let segment of e.areaSegmentList) {
                // var lnglat = CoordTransform.gcj02towgs84(segment.areaSegmentLongitude, segment.areaSegmentLatitude);
                area.positions.push(segment.areaSegmentLongitude * deg2rad)
                area.positions.push(segment.areaSegmentLatitude * deg2rad)
              }
            }

            //中线的一串坐标
            if (e.areaLinePointList && e.areaLinePointList.length > 0) {
              for (let point of e.areaLinePointList) {
                // var lnglat = CoordTransform.gcj02towgs84(point[0], point[1]);
                area.points.push(point[0] * deg2rad)
                area.points.push(point[1] * deg2rad)
              }
            }
            data.push(area)
          }
        }
        let tmpList = []
        var tmpObj = {
          ref: 'polyline1',
          "czmObject": {
            "xbsjType": "Polygon",
            "name": "多边形",
            "positions": [
              2.060054029675885,
              0.6190222325702229,
              2.06007210332543,
              0.6190229370837323,
              2.060077664688091,
              0.6189251044045989,
              2.0600599957693797,
              0.6189248983251654
            ],
            "height": 0,
            'show': this.isPassengerShow,
            "extrudedHeight": null,
            "color": [0, 0, 0, 0],
            "outline": {
              "color": [1, 0, 0, 1],
              "width": 1
            }
          }
        }
        let tmpList2 = []
        let tmpList3 = []
        for (let obj of data) {
          //绘制客流框
          var tmpObjJson = Object.assign({}, tmpObj);
          tmpObjJson.czmObject.outline.color = CROWD_LEVEL_COLOR_MAP[obj.crowdLevel]
          tmpObjJson.ref = 'polygon' + obj.id
          tmpObjJson.czmObject.name = obj.id
          tmpObjJson.czmObject.positions = obj.positions
          // tmpObj.czmObject.width = obj.width
          // tmpObj.czmObject.color = obj.color
          this._earth.sceneTree.root.children.push(tmpObjJson)
          var tmpPinObj = earth.sceneTree.$refs[`${'polygon' + obj.id}`].czmObject
          tmpList.push(tmpPinObj) // 放入列表
          if (obj.points.length > 0) {
            let positions = obj.points
            if (positions.length >= 2 * (obj.areaName.length + 1)) {
              // var space = Math.trunc(positions.length / (2 * obj.areaName.length))
              // console.log(positions)
              var distance = this.distance(positions.length / 2, obj.areaName.length + 1);
              // console.log(obj.areaName, distance, positions.length)

              var i = 0;
              for (i = 0; i < obj.areaName.length; i++) {
                let name = obj.areaName
                var namei = name[i]
                if (distance > 0) {
                  // console.log(positions[(distance+1) *  i * 2], positions[(distance+1) *  i * 2 + 1])
                  let pin = this.createPin(this._earth, namei, [positions[(distance + 1) * i * 2], positions[(distance + 1) * i * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 30)
                  tmpList2.push(pin.guid)
                } else if (distance == 0) {

                  let pin = this.createPin(this._earth, namei, [positions[(distance + 1) * i * 2], positions[(distance + 1) * i * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 20)
                  tmpList2.push(pin.guid)
                }

                // if (positions[count * 2] && positions[count * 2 + 1]) {
                //   console.log(positions[count * 2], positions[count * 2 + 1])
                //   let pin = this.createPin(this._earth, namei, [positions[count * 2], positions[count * 2 + 1]], 0, [0, 0], [1, 1, 0, 1])
                //   tmpList2.push(pin.guid)
                //
                // }
              }

              if (distance > 0) {
                let pin = this.createPin(this._earth, obj.currentTourists == null ? '0人' : obj.currentTourists + '人', [positions[(distance + 1) * i * 2], positions[(distance + 1) * i * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 30)
                tmpList3.push(pin.guid)
              } else if (distance == 0) {
                let pin = this.createPin(this._earth, obj.currentTourists == null ? '0人' : obj.currentTourists + '人', [positions[(distance + 1) * i * 2], positions[(distance + 1) * i * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 20)
                tmpList3.push(pin.guid)
              }
            } else {
              console.log(obj.areaName, positions.length, (obj.areaName.length + 3))
            }
            // let pin = this.createPin(this._earth, obj.areaName + (obj.currentTourists == null ? ' 人数：0' : ' 人数:' + obj.currentTourists), positions, 0, [0.1, 0.1], [1, 1, 0, 1])
            // let pin2 = this.createPin(this._earth, obj.currentTourists == null ? '人数：0' : '人数:'+obj.currentTourists, positions, 0, [0.02, 0.02], [1, 1, 0, 1])
            // tmpList2.push(pin.guid)
            // tmpList3.push(pin2.guid)
          } else {
            // console.log(obj)
          }
        }
        // console.log(this._earth.sceneTree.root.children)
        this.czmObjects['polygon'] = tmpList // 通过全局变量记录
        this.czmObjects['polygonCount'] = tmpList3
        this.czmObjects['polygonName'] = tmpList2
        // console.log(this.czmObjects['polygon'])
        // console.log(this._earth.getObject(tmpList2[0]))

      })
    },
    //计算每个字之间的距离
    distance(positionsLength, bytesLength) {
      if (positionsLength >= bytesLength) {
        let free = 0;
        while ((positionsLength - free - bytesLength) % (bytesLength - 1) != 0 && free < bytesLength) {
          free++;
          // console.log(free)
        }
        return (positionsLength - free - bytesLength) / (bytesLength - 1)
      }
      return 0
    },
    refreshQuery() {
      var that = this
      this.polygonTimer = setInterval(function () {
        if (that.czmObjects.polygonCount) {
          for (let item of that.czmObjects.polygonCount) {
            if (that._earth.getObject(item))
              that._earth.getObject(item).destroy()
          }
        }
        let params = {
          pageTotal: 9999
        }
        let data = []
        getAreaInfo(params).then((res) => {
          if (res.data.code == '00000') {
            let result = res.data.data.pageContent
            for (let e of result) {
              let area = {
                id: e.areaId,
                positions: [],
                areaName: e.areaName,
                currentTourists: e.currentTourists,
                points: []
              }

              if (that.czmObjects['polygon']) that.czmObjects['polygon'].forEach(item => {
                if (e.areaId == item.name && item.outline.color) {
                  item.outline.color = CROWD_LEVEL_COLOR_MAP[e.crowdLevel]
                }
              })
              //中线的一串坐标
              if (e.areaLinePointList && e.areaLinePointList.length > 0) {
                for (let point of e.areaLinePointList) {
                  // var lnglat = CoordTransform.gcj02towgs84(point[0], point[1]);
                  area.points.push(point[0] * deg2rad)
                  area.points.push(point[1] * deg2rad)
                }
              }
              data.push(area)
            }
            let tmpList3 = []
            for (let obj of data) {
              if (obj.points.length > 0) {
                let positions = obj.points
                // let positions = [2.0602452593047835, 0.6188028645618588]
                var distance = that.distance(positions.length / 2, obj.areaName.length + 1);
                if (distance > 0) {
                  let pin = that.createPin(that._earth, obj.currentTourists == null ? '0人' : obj.currentTourists + '人', [positions[(distance + 1) * (obj.areaName.length) * 2], positions[(distance + 1) * (obj.areaName.length) * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 30)
                  tmpList3.push(pin.guid)
                } else if (distance == 0) {
                  let pin = that.createPin(that._earth, obj.currentTourists == null ? '0人' : obj.currentTourists + '人', [positions[(distance + 1) * (obj.areaName.length) * 2], positions[(distance + 1) * (obj.areaName.length) * 2 + 1]], 0, [0, 0], [1, 1, 0, 1], 20)
                  tmpList3.push(pin.guid)
                }
                // let pin = that.createPin(that._earth, obj.areaName + (obj.currentTourists == null ? '0' :  obj.currentTourists), positions, 0, [0.1, 0.1], [1, 1, 0, 1])
                // let pin2 = this.createPin(this._earth, obj.currentTourists == null ? '人数：0' : '人数:'+obj.currentTourists, positions, 0, [0.02, 0.02], [1, 1, 0, 1])
                // tmpList3.push(pin2.guid)
              }
            }
            that.czmObjects['polygonCount'] = tmpList3
          }
        })
      }, 10000)
    },
    /*加载并装载alarm数据*/
    getWarning() {
      let data = {
        pageTotal: 999
      }
      getWarningInfo(data).then((res) => {
        if (res.data.code == "00000") {
          let pinAlarmSingleDemo = { //用于设置pin的json框架
            ref: 'pin_alarm_1',
            czmObject: {
              name: "pin_alarm_1",
              xbsjType: "Pin",
              position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
              near: 0,
              imageUrl: wxalarm1,
              scale: 0.13,
              enabled: true,
              alarmType: 1
            },
          };
          this.contentDataRaw['alarm'] = res.data.data.pageContent;
          let tmpList = [];
          let lngLatList = [];
          this.contentDataRaw['alarm'].forEach((e) => {
            if (e.confirmTime == null) {
              var tmpPinJsonObj = Object.assign({}, pinAlarmSingleDemo);//复制到指定对象，目的创建json框架
              // 设置各个属性
              var alarmName = 'pin_alarm_' + e.warningId;
              tmpPinJsonObj.ref = alarmName;
              tmpPinJsonObj.czmObject.name = alarmName;
              var lnglat = [e.longitude, e.latitude];
              tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.altitude == null ? 0 : 0];
              tmpPinJsonObj.czmObject.alarmType = e.warningType;
              if (e.warningType == 1) {
                tmpPinJsonObj.czmObject.imageUrl = alarm1
              } else if (e.warningType == 5) {
                tmpPinJsonObj.czmObject.imageUrl = wxalarm1
              } else {
                tmpPinJsonObj.czmObject.imageUrl = peoplealarm1
              }

              // 不使用加入场景树的方式来创建了，便于销毁
              const tmpPinObj = new XE.Obj.Pin(this._earth);
              tmpPinObj.xbsjFromJSON(tmpPinJsonObj.czmObject);

              // 通过builder为pin对象设置各种属性
              tmpList.push(tmpPinObj);// 放入列表
              lngLatList.push(lnglat);
              // 给pin对象绑定事件
              tmpPinObj.onmouseover = () => {//鼠标移入，图标变大
                tmpPinObj.scale = pinAlarmSingleDemo.czmObject.scale * 1.1;
              };
              tmpPinObj.onmouseout = () => {//鼠标移出，图标复原
                tmpPinObj.scale = pinAlarmSingleDemo.czmObject.scale;
              };
              tmpPinObj.onclick = async () => {
                await this.closeDialogAndRight();
                this.selectedAlarmType = tmpPinObj.alarmType
                this.alarmRightShow = true
                setTimeout(() => {
                  this.$refs.alarm.showdetail(e)
                }, 100)
                this.isAlarmShow = true
              };
            }
          });

          //异步更新高度
          this.sampleHeightsAsync(lngLatList).then(updatedPosition => {//原地修改，updatedPosition其实就是lngLatList的引用
            updatedPosition.forEach((e, i) => {
              if (e.height && e.height > 0) tmpList[i].position = [e.longitude, e.latitude, e.height];
              else return;//相当于continue
            })
          });
          //更新高度结束

          this.czmObjects['alarm'] = tmpList;// 通过全局变量记录
        }
        this.handleAlarmChange();
      }).catch(error => {
        console.log(error)
      })
    },
    refreshAlarm() {
      this.alarmLayerTimer = setInterval(() => {
        let data = {
          pageTotal: 9999
        }
        getWarningInfo(data).then((res) => {
          if (res.data.code == "00000") {
            //获取数据，用于更新首页数据概览中待处理报警数量，以及今日异常报警列表中的报警数据
            let totalWarning = res.data.data.totalMessage;//报警总数
            let unprocessedWarning = 0;//待处理报警数量
            let warnType1 = 0;//三种报警数量
            let warnType5 = 0;
            let warnType6 = 0;
            res.data.data.pageContent.forEach(e => {
              if (e.confirmTime == null) unprocessedWarning++;
              if (e.warningType == 1) {
                warnType1++;
              } else if (e.warningType == 5) {
                warnType5++;
              } else if (e.warningType == 6) {
                warnType6++;
              }
            })
            let processedWarning = totalWarning - unprocessedWarning;//已处理报警数量

            // 更新数据概览
            this.$refs.overview.alarmTotalNum = totalWarning;
            this.$refs.overview.pendingAlarmNum = unprocessedWarning;
            // 更新异常报警列表
            this.$refs.statisticAnalysis.processedWarning = processedWarning;
            this.$refs.statisticAnalysis.unprocessedWarning = unprocessedWarning;
            this.$refs.statisticAnalysis.warnType1 = warnType1;
            this.$refs.statisticAnalysis.warnType5 = warnType5;
            this.$refs.statisticAnalysis.warnType6 = warnType6;
            this.$refs.statisticAnalysis.refreshAlarmEcharts()


            //销毁原来的alarm pin
            if (this.czmObjects['alarm']) {
              this.czmObjects['alarm'].forEach((e) => {
                e.destroy();
              });
              this.czmObjects['alarm'] = undefined;
            }

            let pinAlarmSingleDemo = { //用于设置pin的json框架
              ref: 'pin_alarm_1',
              czmObject: {
                name: "pin_alarm_1",
                xbsjType: "Pin",
                position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
                near: 0,
                imageUrl: wxalarm1,
                scale: 0.13,
                enabled: true,
                alarmType: 1
              },
            };
            this.contentDataRaw['alarm'] = res.data.data.pageContent;
            let tmpList = [];
            this.contentDataRaw['alarm'].forEach((e) => {
              if (e.confirmTime == null) {
                var tmpPinJsonObj = Object.assign({}, pinAlarmSingleDemo);//复制到指定对象，目的创建json框架
                // 设置各个属性
                var alarmName = 'pin_alarm_' + e.warningId;
                tmpPinJsonObj.ref = alarmName;
                tmpPinJsonObj.czmObject.name = alarmName;
                var lnglat = [e.longitude, e.latitude];
                tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.altitude == null ? 0 : 0];
                tmpPinJsonObj.czmObject.alarmType = e.warningType;
                if (e.warningType == 1) {
                  tmpPinJsonObj.czmObject.imageUrl = alarm1
                } else if (e.warningType == 5) {
                  tmpPinJsonObj.czmObject.imageUrl = wxalarm1
                } else {
                  tmpPinJsonObj.czmObject.imageUrl = peoplealarm1
                }

                // 不使用加入场景树的方式来创建了，便于销毁
                const tmpPinObj = new XE.Obj.Pin(this._earth);
                tmpPinObj.xbsjFromJSON(tmpPinJsonObj.czmObject);

                // 通过builder为pin对象设置各种属性
                tmpList.push(tmpPinObj);// 放入列表
                // 给pin对象绑定事件
                tmpPinObj.onmouseover = () => {//鼠标移入，图标变大
                  tmpPinObj.scale = pinAlarmSingleDemo.czmObject.scale * 1.1;
                };
                tmpPinObj.onmouseout = () => {//鼠标移出，图标复原
                  tmpPinObj.scale = pinAlarmSingleDemo.czmObject.scale;
                };
                tmpPinObj.onclick = async () => {
                  await this.closeDialogAndRight();
                  this.selectedAlarmType = tmpPinObj.alarmType
                  this.alarmRightShow = true
                  setTimeout(() => {
                    this.$refs.alarm.showdetail(e)
                  }, 100)
                  this.isAlarmShow = true
                };
              }
            });
            this.czmObjects['alarm'] = tmpList;// 通过全局变量记录
          }
        }).catch(error => {
          console.log(error)
        });


      }, 5000)
    },
    //获取行人轨迹
    getPassengerTrace(traceData) {//todo:更新高度
      let posArray = [];
      let rotArray = [];
      traceData.forEach((item) => {
        posArray.push(
          [
            item.lon * deg2rad,
            item.lat * deg2rad,
            item.alt,
          ]
        );
        rotArray.push([0, 0, 0]);
      })
      let pathObjJson = {
        ref: 'path_trace',
        czmObject: {
          xbsjType: "Path",
          positions: posArray,
          rotations: rotArray,//需要与position数量对应才会生成轨迹,
          show: true, // 显示路径
          loop: false, // 是否为环线
          showDirection: false, // 显示方向(默认为true)
          playing: false, // 飞行
          // 是否循环播放
          // 如果为false，则playing设置为true时，会从当前位置播放到最后一个关键点，并停止播放，此时playing属性会自动变成false。 若此属性为true时，播放到最后一个关键点以后，将自动重第一个关键点继续播放。
          loopPlay: false,
          currentSpeed: 50,
          showHelper: false
        }
      };
      // 不使用加入场景树的方式来创建了，便于销毁
      const pathObj = new XE.Obj.Path(this._earth);
      pathObj.xbsjFromJSON(pathObjJson.czmObject);
      // 通过全局变量记录
      this.czmObjects['path_trace'] = pathObj;

      //轨迹加载完成

      let pinTraceSingleDemo = { //用于设置轨迹pin的json框架
        czmObject: {
          name: "pin_trace_point_1",
          xbsjType: "Pin",
          position: [118.057417 * deg2rad, 35.450183 * deg2rad, 600],
          near: 0,
          // 若使用相对或绝对路径字符串，earthsdk会转化为异步网络请求，web服务器加了路径前缀时会404
          // 此处提前import转化为静态资源
          imageUrl: tracePoint, //默认为景点图标
          scale: 0.05,
        },
      };
      let tmpList = [];
      traceData.forEach((e) => {
        var tmpPinJsonObj = Object.assign({}, pinTraceSingleDemo);//复制到指定对象，目的创建json框架
        // 设置各个属性
        var pinName = 'pin_trace_point_' + e.id;
        tmpPinJsonObj.czmObject.name = pinName;
        var lnglat = [e.lon, e.lat];
        tmpPinJsonObj.czmObject.position = [lnglat[0] * deg2rad, lnglat[1] * deg2rad, e.alt];
        // 不使用加入场景树的方式来创建了，便于销毁
        const tmpPinObj = new XE.Obj.Pin(this._earth);
        tmpPinObj.xbsjFromJSON(tmpPinJsonObj.czmObject);
        var pinExtTextFontSize = 30;
        var pinExtTextOffsetH = pinExtTextFontSize * strLenCustom(e.capTime) / 4.0;
        // 通过builder为pin对象设置各种属性
        tmpPinObj.pinBuilder.extText = "";
        tmpPinObj.pinBuilder.extTextFont = pinExtTextFontSize + "px 黑体";
        tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
        tmpList.push(tmpPinObj);// 放入列表
        tmpPinObj.onclick = () => {
          console.log([e.lon, e.lat, e.alt])
        };
        tmpPinObj.onmouseover = () => {//鼠标移入，图标变大，出现文字
          tmpPinObj.pinBuilder.extText = e.capTime + "\n[" + [e.lon, e.lat, e.alt].toString() + "]";
          tmpPinObj.scale = pinTraceSingleDemo.czmObject.scale * 1.1;
          tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize * 1.1];
        };
        tmpPinObj.onmouseout = () => {//鼠标移出，图标和文字复原
          tmpPinObj.pinBuilder.extText = "";
          tmpPinObj.scale = pinTraceSingleDemo.czmObject.scale;
          tmpPinObj.pinBuilder.extTextPixelOffset = [-pinExtTextOffsetH, -pinExtTextFontSize];
        };

      });
      this.czmObjects['pin_trace_points'] = tmpList;// 通过全局变量记录

      this.flyToView(traceData[0].lon, traceData[0].lat);
    }
    ,
    //清除行人轨迹
    cleanPassengerTrace() {
      // 销毁路径，由于不是加入场景树创建的，可以直接destroy
      this.czmObjects['path_trace'] = this.czmObjects['path_trace'] && this.czmObjects['path_trace'].destroy();

      // 销毁路径点
      if (this.czmObjects['pin_trace_points']) {
        this.czmObjects['pin_trace_points'].forEach((e) => {
          e.destroy();
        });
        this.czmObjects['pin_trace_points'] = undefined;
      }

    }
    ,
    /**加载卫星影像、地形、建筑模型*/
    setupEarth() {
      var earth = new XE.Earth(this.$refs.earthContainer);
      earth.interaction.picking.enabled = true; //打开点击事件权限
      earth.interaction.picking.hoverEnable = true; //打开hover事件权限
      //指北针设置
      earth.camera.navigator.compassStyle.top = undefined;
      earth.camera.navigator.compassStyle.right = undefined;
      earth.camera.navigator.compassStyle.bottom = 45;
      earth.camera.navigator.compassStyle.left = 20;
      earth.camera.navigator.showCompass = true;// 显示指北针
      //比例尺设置
      earth.camera.navigator.distanceLegendStyle.top = undefined;
      earth.camera.navigator.distanceLegendStyle.right = undefined;
      earth.camera.navigator.distanceLegendStyle.bottom = 20;
      earth.camera.navigator.distanceLegendStyle.left = 1;
      earth.camera.navigator.showDistanceLegend = true;// 显示比例尺
      //设置鼠标中键与右键的功能交换
      earth.czm.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
        Cesium.CameraEventType.PINCH,
        {
          eventType: Cesium.CameraEventType.LEFT_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },
        {
          eventType: Cesium.CameraEventType.RIGHT_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },
      ];
      earth.czm.scene.screenSpaceCameraController.lookEventTypes = [
        Cesium.CameraEventType.MIDDLE_DRAG,
      ];

      earth.xbsjFromJSON({
        sceneTree: {
          root: {
            children: [
              {
                czmObject: {
                  name: "arcgis地图数据",
                  xbsjType: "Imagery",
                  xbsjImageryProvider: {
                    XbsjImageryProvider: {
                      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                      srcCoordType: "WGS84",
                      dstCoordType: "GCJ02",
                    },
                  },
                },
              },
              {
                ref: "pin_coordinate",
                czmObject: {
                  name: "pin_coordinate",
                  xbsjType: "Pin",
                  near: 0,
                  // imageUrl: "./static/img/pinIcon/spot.png",
                  // scale: 0.13,
                },
              },
              // {
              //   czmObject: {
              //     xbsjType: "Terrain",
              //     name: "超图地形数据",
              //     xbsjTerrainProvider: {
              //       type: "XbsjCesiumTerrainProvider",
              //       XbsjCesiumTerrainProvider: {
              //         url: "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
              //         srcCoordType: "WGS84",
              //         dstCoordType: "GCJ02",
              //         requestVertexNormals: false,
              //         requestWaterMask: false
              //       }
              //     }
              //   }
              // },
              // {
              //   ref:"tileset_main",
              //   czmObject: {
              //     "name": "三维瓦片数据", // 可以不填写
              //     "xbsjType": "Tileset", // 必填项
              //     "url": "http://120.224.214.83:9003/model/gA5fTrIP/tileset.json", // 必填项
              //     "xbsjPosition": [118.079257131*deg2rad, 35.4532606523*deg2rad,227.5696705896],
              //     "xbsjRotation":[0,0,0],
              //     "xbsjUseOriginTransform": false,// EarthSDK修改原点时，大模型不加载
              //   }
              // },

            ],
          }
        }
      });
      // 从EarthSDK中调用Cesium的viewer接口加载3dtile模型，原版EarthSDK加载不出来
      const viewer = earth.czm.viewer;
      // 注意此Cesium直接用就行，不用导入原版Cesium，不用管编译器找不到解析
      // 因为结合Cesium需要用到EarthSDK里自带的Cesium
      var tileset = new Cesium.Cesium3DTileset({
        url: "https://120.224.214.83:7891/yms/tileset.json"
      });
      tileset.readyPromise.then(function (tileset) {
        // 模型中心点
        var surface = tileset.boundingSphere.center;
        // 模型中心点的笛卡尔坐标
        var cartographic = Cesium.Cartographic.fromCartesian(surface);
        // 中心点的经纬度坐标
        let lng = Cesium.Math.toDegrees(cartographic.longitude)
        let lat = Cesium.Math.toDegrees(cartographic.latitude)
        // 将经纬度坐标转为火星坐标
        let newLatlng = CoordTransform.wgs84togcj02(lng, lat)
        // 将火星坐标转为笛卡尔坐标
        var offset = Cesium.Cartesian3.fromDegrees(newLatlng[0], newLatlng[1], 227.569);
        // 计算原中心点偏移到火星坐标的偏移量
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        // 将模型进行偏移
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        // 修改模型的位置后，将模型添加到地图中
        viewer.scene.primitives.add(tileset);
      }).otherwise(function (error) {
        console.log(error);
      });

      var pin_coordinate = earth.sceneTree.$refs.pin_coordinate.czmObject;
      // 积雪深度设置（天气设置-雪）
      // earth.weather.snowPostProcess.alpha = 0.6;
      // 雾效浓度设置（天气设置-雾）
      earth.weather.fogPostProcess.strength = 0.2;
      // 数据绑定
      this._positionUnbind = XE.MVVM.bindPosition(this, 'position', pin_coordinate, 'position');
      this._rotationUnbind = XE.MVVM.bindPosition(this, 'rotation', earth.camera, 'rotation');
      this._rainEnabledUnbind = XE.MVVM.bind(this, 'rainEnabled', earth.weather.rainPostProcess, 'enabled');
      this._snowEnabledUnbind = XE.MVVM.bind(this, 'snowEnabled', earth.weather.snowPostProcess, 'enabled');
      this._fogEnabledUnbind = XE.MVVM.bind(this, 'fogEnabled', earth.weather.fogPostProcess, 'enabled');
      // 设置pin不可见。不能设置size为0，会警告INVALID_VALUE: texSubImage2D: no canvas
      pin_coordinate.show = false;
      //变量记录
      this._earth = earth;
      this._pin_coordinate = pin_coordinate;
      // 仅为调试方便用
      window.earth = earth;
    }
    ,// startup() end
// 鼠标点击显示经纬度
    coordinateClick(e) {
      // this.isClick = false时，阻止默认的事件行为
      if (!this.isClick) {
        return false;
      }
      this.isPositionShow = true;
      this._pin_coordinate.position = this._earth.pickPosition({
        x: e.offsetX,
        y: e.offsetY,
      });
      // var lnglat = CoordTransform.wgs84togcj02(this._pin_coordinate.position[0] * rad2deg, this._pin_coordinate.position[1] * rad2deg);
      var lnglat = [this._pin_coordinate.position[0] * rad2deg, this._pin_coordinate.position[1] * rad2deg]
      this._pin_coordinate.position[0] = lnglat[0] * deg2rad;
      this._pin_coordinate.position[1] = lnglat[1] * deg2rad;
    }
    ,
// 鼠标点击复制
    copy(tag) {
      var clipboard = new Clipboard(tag)
      clipboard.on('success', e => {
        // console.log('复制成功')
        Message({
          message: e.text + ' 复制成功',
          type: 'success',
          center: true,
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log(e)
        Message({
          message: '该浏览器不支持自动复制',
          type: 'error',
          center: true,
        })
        // 释放内存
        clipboard.destroy()
      })
    }
    ,
    //手机推送-点击显示游客轨迹折线
    pushPolyline(obj) {
      this._earth.sceneTree.root.children.push(obj)
    }
    ,
    //删除地图上游客轨迹折线
    closePolyline() {
      if (this.czmObjects.passengerPolyline)
        for (let item of this.czmObjects.passengerPolyline) {
          item.show = false
        }
    }
    ,
    // 异步获取高度
    sampleHeightsAsync(lnglats) {
      let viewer = this._earth.czm.viewer;
      let positions = []
      lnglats.forEach(e => {
        positions.push(new Cesium.Cartographic(e[0] * deg2rad, e[1] * deg2rad))
      })
      return viewer.scene.sampleHeightMostDetailed(positions);
    }
    ,
    // 同步获取高度，若调用时该位置瓦片未加载，则返回undefined
    sampleHeight(lng, lat) {
      let viewer = this._earth.czm.viewer;
      if (!viewer) return 0;
      let height = viewer.scene.sampleHeight(new Cesium.Cartographic(lng * deg2rad, lat * deg2rad));
      console.log(height)
      return height;
    }
  }
  ,
// 资源创建
  async mounted() {
    //获取用户角色姓名及权限
    this.userRoleId = localStorage.getItem('userRoleId')
    this.userName = localStorage.getItem('userName')
    //等待Cesium加载完成
    await XE.ready();
    //加载卫星影像、地形、建筑模型
    this.setupEarth();
    //重置视角
    this.resetView();
    //加载并装载pin数据，包括spot，camera等
    //加载spot数据
    this.getSpotData(); // 异步更新高度
    //加载parking数据
    this.getParkingData(); // 异步更新高度
    //加载camera数据
    this.getCameraData(); // 异步更新高度
    //加载polyline数据,
    // this.getPolyline() //暂时以高德路网代替了
    //加载高德路网
    this.getRoadMap()
    //加载ploygon数据
    this.getPolygon()
    // this.refreshQuery()
    //加载speaker数据
    this.getSpeaker() // 异步更新高度
    this.getWarning() // 异步更新高度
    //加载Glb模型
    this.getGlbModel()
    // 挂载时间
    let that = this
    this.timer = setInterval(function () {
      that.date = new Date().toLocaleString()
    });
  }
  ,
// 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
    // 销毁时清除计时器
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timer2) {
      clearInterval(this.timer2)
    }
    if (this.polygonTimer) {
      clearInterval(this.polygonTimer)
    }
    if (this.alarmLayerTimer) {
      clearInterval(this.alarmLayerTimer)
    }
  }
  ,
}
;

</script>

<style scoped>
.earth-background {
  height: 100%;
  width: 100%;
  background: url('../../static/img/background/background.png') fixed no-repeat;
  background-size: 100% 100%;
}

.header {
  top: 0;
  background: url('../../static/img/background/titleBorder.png') fixed no-repeat;
  background-size: 100%;
  justify-content: flex-start;
  position: fixed;
  height: 60px;
}

.time {
  font-size: 15px;
  font-family: 等线;
  font-weight: bolder;
  letter-spacing: 1px;
  color: #ffffff;
  height: 50px;
  margin-top: 5px;
  overflow: hidden;
}

.user-name-font {
  color: #ffffff;
  font-size: 13px;
  font-family: 等线;
  overflow: hidden;
}

.left-bar {
  background: url('../../static/img/background/leftBar.png') fixed no-repeat;
  width: 330px;
  height: 725px;
  float: left;
  position: absolute;
  top: 70px;
  left: 15px;
}

.left-layer-bar {
  width: 300px;
  margin-left: 10px;
  float: left;
  font-size: 16px;
  letter-spacing: 3px;
  font-weight: 500;
  text-align: left;
  line-height: 150%;
  position: absolute;
  top: 520px;
}

.sub-header {
  width: 100%;
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #86c2d4;
  letter-spacing: 6px;
  text-align: center;
  border-style: hidden hidden solid hidden;
  border-width: 2px;
  border-color: #ffffff;
}

.layer-left {
  position: absolute;
  width: 170px;
  left: 5px;
  margin-top: 3px;
}

.verticalBar {
  position: absolute;
  left: 145px;
  width: 2px;
  height: 140px;
  background: #ffffff;
  opacity: 0.6;
  margin-top: 5px;
}

.layer-right {
  position: absolute;
  left: 160px;
  width: 150px;
  margin-top: 3px;
}

.checkbox-spot {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-spot-children {
  width: 100%;
  margin-left: 15px;
  color: #b9b7b7;
}

.checkbox-camera {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-broadcast {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-uav {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-alarm {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-road {
  width: 100%;
  color: #b9b7b7;
}

.checkbox-passenger {
  width: 100%;
  color: #b9b7b7;
}

.footer {
  width: 100%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  background-color: rgb(255, 255, 255, 0);
  font-size: 16px;
  text-align: left;
  font-weight: 500;
  color: #ffffff;
}
</style>
