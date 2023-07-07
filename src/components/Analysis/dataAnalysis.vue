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
              <img
                src="../../../static/img/background/leftButton.png"
                style="width:130px;height:52px;position:absolute; left: 235px;top:-2px"
              />
              <img
                src="../../../static/img/background/leftButton.png"
                style="width:130px;height:52px;position:absolute; left: 360px;top:-3px"
              />
              <img
                src="../../../static/img/background/leftButton.png"
                style="width:130px;height:52px;position:absolute; left: 485px;top:-3px"
              />
              <el-menu
                ref="firstMenu"
                mode="horizontal"
                background-color="rgba(0,0,0,0)"
                text-color="#21d7e7"
                active-text-color="#8df6ff"
                @select="handleMenuSelect"
                style="border-bottom: 0;"
              >
                <el-menu-item index="0">数据分析</el-menu-item>
                <el-menu-item index="1">客流分析</el-menu-item>
                <el-menu-item index="2">运营分析</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="8">
            <img
              height="50"
              src="../../../static/img/background/title.png"
              style="margin-top: 5px;"
              alt="该图片无法显示"
            />
          </el-col>
          <el-col :span="1">
            <div style="background-color: rgba(0,0,0,0)">&nbsp;</div>
          </el-col>
          <el-col :span="5">
            <div>
              <img
                src="../../../static/img/background/rightButton.png"
                style="width:130px;height:52px;position:absolute; left: 1358px;top:-3px"
              />
              <img
                src="../../../static/img/background/rightButton.png"
                style="width:130px;height:52px;position:absolute; left: 1483px;top:-3px"
              />
              <img
                src="../../../static/img/background/rightButton.png"
                style="width:130px;height:52px;position:absolute; left: 1608px;top:-3px"
              />
              <el-menu
                ref="secondMenu"
                mode="horizontal"
                background-color="rgba(0,0,0,0)"
                text-color="#21d7e7"
                active-text-color="#8df6ff"
                @select="handleMenuSelect"
                style="border-bottom: 0;"
              >
                <el-menu-item index="3">游客画像</el-menu-item>
                <el-menu-item index="4">关注分析</el-menu-item>
                <el-menu-item index="5">预测报警</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-button
                icon="el-icon-s-tools "
                @click="confirmBack"
                style="font-size:18px;color:#ffffff;background-color:transparent; border-color:rgba(0,0,0,0); padding: 1px;margin-top: 2px;"
              ></el-button>
            </el-row>
            <el-row>
              <div class="user-name-font">返回</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--组件引入-->
    <home-page v-if="homePageShow"></home-page>
    <passenger-flow-analysis-page
      v-if="passengerFLowAnalysisShow"
    ></passenger-flow-analysis-page>
    <market-analysis-page v-if="marketAnalysisShow"></market-analysis-page>
    <tourist-analysis-page v-if="touristAnalysisShow"></tourist-analysis-page>
    <attention-analysis-page
      v-if="attentionAnalysisShow"
    ></attention-analysis-page>
    <predictive-alarm-page v-if="predictiveAlarmShow"></predictive-alarm-page>
  </div>
</template>

<script>
import { dateFormat } from "../../utils";
import Config from "../../config";
import homePage from "./homePage.vue";
import passengerFlowAnalysisPage from "./passengerFlowAnalysisPage.vue";
import marketAnalysisPage from "./marketAnalysisPage.vue";
import touristAnalysisPage from "./touristAnalysisPage.vue";
import attentionAnalysisPage from "./attentionAnalysisPage.vue";
import predictiveAlarmPage from "./predictiveAlarmPage.vue";

export default {
  name: "dataAnalysis",
  data() {
    return {
      activeIndex: "0",
      date: new Date(),
      homePageShow: false,
      // homePageShow: true,
      passengerFLowAnalysisShow: false,
      marketAnalysisShow: false,
      // touristAnalysisShow: false,
      touristAnalysisShow: true,
      attentionAnalysisShow: false,
      predictiveAlarmShow: false
    };
  },
  components: {
    homePage,
    passengerFlowAnalysisPage,
    marketAnalysisPage,
    touristAnalysisPage,
    attentionAnalysisPage,
    predictiveAlarmPage
  },
  methods: {
    //设置
    confirmBack() {
      this.$router.push("/home");
    },
    //处理菜单激活状态
    handleMenuActive(key) {
      if (key.charAt(0) == "0" || key.charAt(0) == "1" || key.charAt(0) == "2")
        this.$refs.secondMenu.activeIndex = null;
      else if (
        key.charAt(0) == "3" ||
        key.charAt(0) == "4" ||
        key.charAt(0) == "5"
      )
        this.$refs.firstMenu.activeIndex = null;
    },
    //关闭所有页面
    closeAll() {
      this.homePageShow = false;
      this.passengerFLowAnalysisShow = false;
      this.marketAnalysisShow = false;
      this.touristAnalysisShow = false;
      this.attentionAnalysisShow = false;
      this.predictiveAlarmShow = false;
    },
    //处理菜单点击
    handleMenuSelect(key) {
      this.handleMenuActive(key);
      this.closeAll();
      if (key == "0") {
        this.homePageShow = true;
      } else if (key == "1") {
        this.passengerFLowAnalysisShow = true;
      } else if (key == "2") {
        this.marketAnalysisShow = true;
      } else if (key == "3") {
        this.touristAnalysisShow = true;
      } else if (key == "4") {
        this.attentionAnalysisShow = true;
      } else if (key == "5") {
        this.predictiveAlarmShow = true;
      }
    },
    //标准化时间
    dateFormat,
    // 资源创建
    async mounted() {
      // 挂载时间
      let that = this;
      this.timer = setInterval(function() {
        that.date = new Date().toLocaleString();
      });
    },
    // 资源销毁
    beforeDestroy() {
      // 销毁时清除计时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
};
</script>

<style scoped>
.earth-background {
  height: 100%;
  width: 100%;
  background: url("../../../static/img/background/background.png") fixed
    no-repeat;
  background-size: 100% 100%;
}

.header {
  top: 0;
  background: url("../../../static/img/background/titleBorder.png") fixed
    no-repeat;
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
  background: url("../../../static/img/background/leftBar.png") fixed no-repeat;
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
