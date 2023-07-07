<template>
  <div v-show="scenicOverviewShow" class="scenicOverviewBox">
    <img src="../../../../static/img/background/dialogDecorate.png" class="left-top-decorate">
    <div class="scenicOverview-title">沂蒙山天蒙旅游区</div>
    <el-button class="scenicOverview-cancel" icon="el-icon-close" @click="closeScenicOverview"></el-button>
    <div class="scenicOverview-font">
      <span style="margin-top: -20px;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沂蒙山天蒙旅游区地处沂蒙山山脉东段，位于山东省临沂市费县，是沂蒙山旅游的核心景区和重要组成部分。
      </span>
      <img src="../../../../static/img/overview/1.jpg" style="margin:8px 120px;" alt="图片暂时无法显示"/>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;旅游区规划总面积240平方公里，核心片区96平方公里，一期开发面积14.4平方公里，是一处集山地生态旅游、运动休闲旅游、民俗文化体验旅游、生态农业旅游和休闲度假旅游为一体的大型综合性人文生态旅游度假区。这里不仅是红色革命老区，是著名山东民歌《沂蒙山小调》的诞生地，还是东夷文化的发源地和东夷民族的核心生活集聚区。主要核心景点有沂蒙山小调活态博物馆、世界第一人行悬索桥、360°全景索道，江北第一文化栈道、望海楼、玉皇宫、塔山玻璃观景平台、葫芦崖瀑布等。
      </span>
      <img src="../../../../static/img/overview/2.jpg" style="margin:8px 120px" alt="图片暂时无法显示"/>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为山东省国资委新旧动能转换重点项目，主要是基于“好客山东”和“亲情沂蒙”省市文化旅游品牌建设背景，依托“沂蒙山小调诞生地”的红色文化资源和沂蒙山的绿色生态资源，综合运用“旅游 + ”的开发理念，通过培育经典、创造精品、传承基因、融合发展，全面构建新时代“大旅游、大市场、大产业”的大沂蒙山旅游目的地。
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在沂蒙山天蒙旅游区的开发建设中，天蒙公司始终坚持“高起点规划、高标准建设、规范化运作和专业化运营”，走出了一条创新发展的新路径。
      </span>
      <img src="../../../../static/img/overview/3.jpg" style="margin:8px 120px" alt="图片暂时无法显示"/>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一是进行了高起点的规划。先后聘请美国AECOM、北京大地风景等多家国内外一流规划设计单位，按国家5A级景区和国家级旅游度假区的双重标准进行了规划设计，仅规划设计费两千多万元。项目总规荣获中国最佳旅游项目规划设计奖。
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二是进行了高标准的建设。围绕“第一和唯一”的目标，打造了一批精品项目。其中“沂蒙山小调活态博物馆、世界第一人行悬索桥和江北第一悬崖栈道”三个项目被有关专家称为有可能成为遗产；“360度全景索道、望海楼和玉皇宫”三个项目被有关专家评价为三大精品工程。已建成的全国第一条高山无障碍游步道，实现了残障人士和老年人坐着轮椅游天蒙的梦想，中国残联领导多次到景区调研，给予了充分的肯定。同时高度重视文化传承，通过挖掘沂蒙山的文化资源，建成文化景点一百余处，形成了一条长达13公里的沂蒙文化长廊。另外还投资一千多万元打造了沂蒙山智慧景区系统，成为原国家旅游局“全域旅游信息服务系统”在山东的首个试点。
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三是进行了规范化的运作。先后办理了项目可研、环评、土地、水保、地灾等审批手续，使所有建设项目合法合规，在我省近几年的新建景区中手续最全。同时注重了和谐化开发。首先是注重人与自然的和谐。施工所用的石材全部外购，未动山上的一块石头。新增苗木50多万株，基本实现了三季有花、四季有叶。此外，还注重与当地政府和百姓的和谐相处，搬迁4个村200多户，实现了零上访和谐拆迁。
      </span>
      <img src="../../../../static/img/overview/4.jpg" style="margin:8px 120px" alt="图片暂时无法显示"/>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四是进行了专业化的运营。通过两年多的运营总结，形成了一整套山地旅游景区运管体系。目前省旅游协会正在该体系的基础上，编制面向全省旅游景区推广的标准化体系。同时还狠抓了优质服务工作，游客满意度95%以上，网络好评度4.9分。
      </span>
      <img src="../../../../static/img/overview/5.jpg" style="margin:8px 120px" alt="图片暂时无法显示"/>
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目先后被评选为2013年山东省重点建设项目、省服务业重点项目、省文化产业重点项目；2016年山东省服务名牌；2017年山东省最受欢迎的文化旅游景区；2018年山东省国资委新旧动能转换重点项目；2019年世界人行桥奖银奖、中国最佳自然生态旅游项目奖、山东省新旧动能转换重大工程重大课题攻关项目、山东省泰山产业领军人才工程、山东省旅游服务标准化试点项目、山东省省属企业文明单位、临沂市市长质量奖，起草了山东省地方标准《客运索道使用安全风险分级管控和事故隐患排查治理体系建设实施指南》；2020年荣获山东省服务业高端品牌培育企业、山东省重点文旅企业荣誉，通过省级标准化验收、索道安全服务质量5S、安全生产一级评审；完成全国旅游标准化试点城市景区专项验收，成为2022年冬奥会索道服务战略联盟单位，参与起草省地方标准制修订项目《山岳型旅游景区无障碍建设指南》；2021年入选国家级服务标准化试点项目；2021年底，成为国家重点研发课题《复杂山岳景区游客全域位置感知与精准服务应用示范》的示范景区。
      </span>
    </div>
    <div class="scenicOverview-bottom">
      <img src="../../../../static/img/background/dialogDecorate.png" class="right-bottom-decorate">
    </div>
  </div>
</template>

<script>
export default {
  name: "ScenicOverview",
  props: {
    scenicOverviewShow: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeScenicOverview() {
      this.$emit('update:scenicOverviewShow', false)
    },
  }
}
</script>

<style scoped>
.scenicOverviewBox {
  position: absolute;
  left: 30%;
  top: 18%;
  font-size: 12px;
  background: url('../../../../static/img/background/dialog.png') no-repeat;
  background-size: 125% 100%;
}

.scenicOverview-title {
  color: white;
  height: 35px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 800;
  letter-spacing: 5px;
  font-family: STXingkai;
  margin-top: 2%;
}

.scenicOverview-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: 0;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 20px;
  font-weight: 800;
}

.scenicOverview-font {
  color: #ffffff;
  height: 520px;
  width: 855px;
  font-size: 16px;
  text-align: left;
  margin-left: 25px;
  line-height: 170%;
  white-space: pre-line;
  overflow-y: scroll;
  overflow-x: hidden;
}

.left-top-decorate {
  position: absolute;
  top: 0px;
  left:-20px;
  transform: rotate(180deg);
}

.scenicOverview-bottom{
  height: 25px;
}

.right-bottom-decorate{
  position: absolute;
  bottom:0px;
  right: -33px;
}
</style>
