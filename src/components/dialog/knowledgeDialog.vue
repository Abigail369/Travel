<template>
  <transition name="fade">
    <div class="show-knowledge-dialog" v-if="showKnowledgeDialog">
      <div class="knowledge-title">{{ sourceObj[0].knowledgename }}</div>
      <img src="../../../static/img/background/dialogDecorate.png" class="knowledge-dialog-left-top-decorate">
      <img src="../../../static/img/background/dialogDecorate.png" class="knowledge-dialog-right-bottom-decorate">
      <el-button class="knowledge-dialog-cancel" icon="el-icon-close" @click="closeKnowledgeDialog"></el-button>
      <div class="knowledge-result">
        <div v-if="sourceObj[0].titlepic.length > 0">
          <img :src="sourceObj[0].titlepic" style="width: 98%" alt="该图片暂时无法显示">
        </div>
        <div v-if="sourceObj[0].newstext === undefined || sourceObj[0].newstext === ''" class="knowledge-dialog-font">
          该知识点没有详情介绍
        </div>
        <div v-else>
          <div class="knowledge-dialog-name">详细信息</div>
          <div class="knowledge-dialog-font"> {{ sourceObj[0].newstext | lineBreak }}</div>
        </div>
        <div style="margin-top: 10px">
          <el-row>
            <el-col :span="6">
              <el-button class="knowledge-dialog-button" icon="el-icon-picture-outline" type="primary"
                         @click="switchPictureShow(1)">图集
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button class="knowledge-dialog-button" icon="el-icon-picture-outline" type="primary"
                         @click="switchPictureShow(2)">空中航拍
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button class="knowledge-dialog-button" icon="el-icon-picture-outline" type="primary"
                         @click="switchPictureShow(3)">地面全景
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button class="knowledge-dialog-button" icon="el-icon-picture-outline" type="primary"
                         @click="switchPictureShow(4)">视频
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div v-if="pictureShow">
          <div v-for="item in sourceObj[0].morepic">
            <el-popover placement="left" :title="item[2]" trigger="click">
              <img class="knowledge-img" slot="reference" :src="item[0]" alt="该图片暂时无法显示"/>
              <img :src="item[1]" style="width: 600px;" alt="该图片暂时无法显示"/>
            </el-popover>
          </div>
        </div>
        <div v-else-if="airPanoShow">
          <div v-for="item in sourceObj[0].airpano">
            <!--            <el-popover placement="left" :title="item.title" trigger="click">-->
            <img class="knowledge-img" slot="reference" :src="item.titlepic" @click="getAirPanoUrl(item)"
                 alt="该图片暂时无法显示"/>
            <!--              <div :id="airPanoViewer"></div>-->
            <!--            </el-popover>-->
          </div>
        </div>
        <div v-else-if="panoShow">
          <div v-for="item in sourceObj[0].pano">
            <img class="knowledge-img" slot="reference" :src="item.titlepic" @click="getPanoUrl(item)"
                 alt="该图片暂时无法显示"/>
          </div>
        </div>
        <div v-else-if="movieShow">
          <div v-for="item in sourceObj[0].moremovie">
            <!--            <video :src="item[0]" controls :poster="item[1]"></video>-->
            <el-popover title="" trigger="click">
              <img class="knowledge-img" slot="reference" :src="item[1]" @click="getMovieUrl(item)"
                   alt="该图片暂时无法显示"/>
              <video :src="item[0]" controls :poster="item[1]" width="500" height="270"></video>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {Viewer} from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import Config from "../../config";

export default {
  name: "knowledgeDialog",
  props: {
    showKnowledgeDialog: {
      type: Boolean,
      required: true,
    },
    sourceObj: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pictureShow: true,
      airPanoShow: false,
      panoShow: false,
      movieShow: false,
      airPanoUrl: '',
      panoUrl: '',
      airPanoViewer: "viewer",
      panoViewer: "viewer",
      AIRPSV: null,
      PSV: null,
      movieUrl: '',
    }
  },
  filters: {
    lineBreak: function (data) {
      var initialResult = data.replace(/&([^&;]+);/g, function (matchStr, b) {
        var entity = {
          quot: '"',
          lt: '<',
          gt: '>',
          apos: "'",
          amp: '&',
          ldquo: '“',
          rdquo: '”'
        };
        var r = entity[b];
        return typeof r === 'string' ? r : matchStr;
      });
      let dataBR = initialResult.replace(/<br>/g, '\n')
      let dataReplaceBR = dataBR.replace(/<br \/>/g, '\n')
      return dataReplaceBR;
    }
  },
  methods: {
    closeKnowledgeDialog() {
      this.$emit('update:showKnowledgeDialog', false)
    },
    closeAllPicture() {
      this.pictureShow = false
      this.airPanoShow = false
      this.panoShow = false
      this.movieShow = false
    },
    switchPictureShow(num) {
      this.closeAllPicture()
      if (num == 1) this.pictureShow = true
      else if (num == 2) this.airPanoShow = true
      else if (num == 3) this.panoShow = true;
      else if (num == 4) this.movieShow = true;
    },
    getAirPanoUrl(item) {
      this.airPanoUrl = item.titleurl
      // this.initAirPanoData()
      // console.log(this.airPanoUrl)
      window.open(this.airPanoUrl)
    },
    // initAirPanoData() {
    //   if (this.AIRPSV) {
    //     console.log("已经初始化")
    //     this.AIRPSV.setPanorama(
    //       this.airPanoUrl
    //     );
    //   } else {
    //     console.log("开始初始化")
    //     this.$nextTick(() => {
    //       this.initAirPhotoSphere();
    //     });
    //   }
    // },
    // initAirPhotoSphere() {
    //   console.log("装载")
    //   console.log("初始装载时，全景图地址：",this.airPanoUrl)
    //   this.AIRPSV = new Viewer({
    //     container: this.airPanoViewer,
    //     panorama: this.airPanoUrl,
    //     navbar: [
    //       'autorotate',
    //       'zoom',
    //       'move',
    //       'fullscreen',
    //     ],
    //   });
    // },
    getPanoUrl(item) {
      this.panoUrl = item.titleurl
      window.open(this.panoUrl)
    },
    getMovieUrl(item) {
      this.movieUrl = item[0]
      console.log(this.movieUrl)
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

.show-knowledge-dialog {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 610px;
  height: 620px;
  position: absolute;
  right: 340px;
  top: 126px;
}

.knowledge-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 10px;
}

.knowledge-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 8px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.knowledge-dialog-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.knowledge-dialog-right-bottom-decorate {
  position: absolute;
  bottom: -10px;
  right: -32px;
}

.knowledge-result {
  color: #ffffff;
  height: 550px;
  width: 577px;
  font-size: 16px;
  text-align: left;
  margin-left: 25px;
  line-height: 170%;
  white-space: pre-line;
  overflow-y: scroll;
  overflow-x: hidden;
}

.knowledge-dialog-name {
  color: #7dc7de;
  font-size: 16px;
  font-weight: bold;
}

.knowledge-dialog-font {
  color: #ffffff;
  font-size: 16px;
}

.knowledge-dialog-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  width: 130px;
}

.knowledge-img {
  width: 175px;
  height: 80px;
  display: flex;
  float: left;
  margin-top: 8px;
  margin-left: 8px;
  border: 2px solid #ffffff;
}

.knowledge-img:hover {
  box-shadow: 0 8px 8px 0 #5C5954;
  transform: translate(0, -2px);
}

</style>
