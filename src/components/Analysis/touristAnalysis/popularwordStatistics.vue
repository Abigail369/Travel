<template>
  <div class="total">
    <div class="popularword-statistics">
      <div class="buttons">
        <div
          v-for="(item, i) in chooseList"
          :key="i"
          @click="chooseIndexChange(i)"
          class="button-item"
          :class="{ 'button-item-checked': chooseIndex == i }"
        >
          {{ item }}
        </div>
      </div>
      <div class="title">热门词统计</div>
    </div>
    <div
      id="test"
      style="width: 880px;height: 420px;margin-left: 30px;margin-top: 20px; "
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import WordCloud from "echarts-wordcloud";

export default {
  name: "popularwordStatistics",
  data() {
    return {
      chooseIndex: 0,
      chooseList: ["当天", "当月", "当年"]
    };
  },
  mounted() {
    this.getWords();
  },
  methods: {
    getWords() {
      let chart = echarts.init(document.getElementById("test"));
      let keywords = [];
      if (this.chooseIndex == 0) {
        keywords = [
          { name: "灵隐寺", value: 2.64 },
          { name: "河坊街", value: 4.03 },
          { name: "西溪湿地", value: 24.95 },
          { name: "苏堤", value: 4.04 },
          { name: "断桥", value: 5.27 },
          { name: "孤山", value: 5.8 },
          { name: "太子湾", value: 3.09 },
          { name: "千岛湖", value: 24.71 },
          { name: "钱塘江", value: 2.55 },
          { name: "雷峰塔", value: 8.04 },
          { name: "运河", value: 2.53 },
          { name: "杭州宋城", value: 2.49 },
          { name: "三潭印月", value: 3.25 },
          { name: "法喜寺", value: 9.93 },
          { name: "飞来峰", value: 3.65 }
        ];
      } else if (this.chooseIndex == 1) {
        keywords = [
          { name: "苏堤", value: 14.04 },
          { name: "断桥", value: 5.27 },
          { name: "孤山", value: 5.8 },
          { name: "太子湾", value: 31.09 },
          { name: "千岛湖", value: 24.71 },
          { name: "鲁迅故居", value: 6.33 },
          { name: "钱塘江", value: 21.55 },
          { name: "平湖秋月", value: 3.88 },
          { name: "雷峰塔", value: 18.04 },
          { name: "杭州博物馆", value: 5.87 },
          { name: "宋文化", value: 6.97 },
          { name: "运河", value: 2.53 },
          { name: "杭州宋城", value: 2.49 },
          { name: "故居", value: 11.91 },
          { name: "三潭印月", value: 13.25 },
          { name: "法喜寺", value: 19.93 },
          { name: "飞来峰", value: 13.65 }
        ];
      } else {
        keywords = [
          { name: "灵隐寺", value: 21.64 },
          { name: "河坊街", value: 14.03 },
          { name: "西溪湿地", value: 14.95 },
          { name: "苏堤", value: 14.04 },
          { name: "断桥", value: 15.27 },
          { name: "孤山", value: 5.8 },
          { name: "太子湾", value: 13.09 },
          { name: "千岛湖", value: 24.71 },
          { name: "运河", value: 2.53 },
          { name: "三潭印月", value: 3.25 },
          { name: "法喜寺", value: 19.93 },
          { name: "飞来峰", value: 13.65 }
        ];
      }

      let option = {
        series: [
          {
            type: "wordCloud",
            sizeRange: [15, 80],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 30,
            shape: "pentagon",
            width: "100%",
            height: "100%",
            layoutAnimation: true,
            textStyle: {
              color: function() {
                let colors = [
                  "#86D4FF",
                  "#FF8F6C",
                  "#2CF263",
                  "#9FA8F7",
                  "#1274FF",
                  "#E6613D",
                  "#FFC629",
                  "#FFAB2E",
                  "#F78289",
                  "#FF6C96",
                  "#45BFD4",
                  "#4E31FF",
                  "#31FBFB",
                  "#86D4FF",
                  "#BF8AFD",
                  "#FFF500",
                  "#DE58FF",
                  "#72ED7C",
                  "#0BEEB8",
                  "#931CFF",
                  "#3D25F2",
                  "#F995C8",
                  "#FBE9B4",
                  "#FF4AB6"
                ];
                return colors[parseInt(Math.random() * 10)];
              },
              fontFamily: "sans-serif",
              fontWeight: "normal",
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: keywords
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
    chooseIndexChange(index) {
      this.chooseIndex = index;
      // 重新生成chart
      this.getWords();
    }
  }
};
</script>

<style scoped>
.popularword-statistics {
  /* background: chartreuse; */
  /* height: 80px; */
  /* display: flex;
  justify-content: center; */
  display: flex;
  align-items: center;
  margin-top: 40px;
}

.title {
  font-size: 30px;
  background: linear-gradient(to right, #007afd, #08d5f1);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  margin-left: 115px;
}
.buttons {
  display: flex;
  margin-left: 30px;
}
.button-item {
  width: 78px;
  height: 34px;
  background: #002163;
  box-sizing: border-box;
  border: 1px #00437a solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 4px;
  color: #94a1c3;
}
.button-item-checked {
  /* 00a4be 00f0ea */
  color: #053166;
  background: linear-gradient(to bottom, #00a4be, #00f0ea);
}
</style>
