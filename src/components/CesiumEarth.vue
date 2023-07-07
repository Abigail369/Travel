<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import  'cesium/Widgets/widgets.css'
import CoordTransform from "../utils/coordTransform";
export default {
  name: "CesiumEarth",
  data() {
    return {
      myvar:null,
    };
  },
  mounted() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiM2NhNTMwNS01ZmE1LTQwODQtOTg3MC04OWJlNTIwZTJkYTciLCJpZCI6ODQ4OTUsImlhdCI6MTY0NjY1MDQ3M30.Mprx1Wb23hqev_CB-RkyBWRI_0wHt_0-Soxyv5JhWLI';
    const viewer = new Cesium.Viewer('cesiumContainer');
    viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
    //加载模型
    var tileset = new Cesium.Cesium3DTileset({
      url:"http://120.224.214.83:9003/model/gA5fTrIP/tileset.json",
      // url:"https://3d.sdu.edu.cn:9092/model/NewModels/softnew66/tileset.json",
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
      let newLatlng = CoordTransform.wgs84togcj02(lng,lat)
      // 将火星坐标转为笛卡尔坐标
      var offset = Cesium.Cartesian3.fromDegrees(newLatlng[0], newLatlng[1], 227.569);
      // 计算原中心点偏移到火星坐标的偏移量
      var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
      // 将模型进行偏移
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      // 修改模型的位置后，将模型添加到地图中
      viewer.scene.primitives.add(tileset);
      console.log(viewer)
      viewer.flyTo(tileset)
    }).otherwise(function (error) {
      console.log(error);
    });

  },
  methods:{


  }

};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
