<template>
  <div class="academic-ranking">
    <div class="academic-ranking-table">
      <div class="academic-ranking-table-row1" style="color: #8d9cc4">
        <div class="academic-ranking-table-row-type">
          {{ academicData[0].type }}
        </div>
        <div>{{ academicData[0].value }}</div>
      </div>
      <div class="academic-ranking-table-row2" style="color: #8d9cc4">
        <div class="academic-ranking-table-row-type">
          {{ academicData[1].type }}
        </div>
        <div>{{ academicData[1].value }}</div>
      </div>
      <div class="academic-ranking-table-row3" style="color: #8d9cc4">
        <div class="academic-ranking-table-row-type">
          {{ academicData[2].type }}
        </div>
        <div>{{ academicData[2].value }}</div>
      </div>
      <div class="academic-ranking-table-row4" style="color: #8d9cc4">
        <div class="academic-ranking-table-row-type">
          {{ academicData[3].type }}
        </div>
        <div>{{ academicData[3].value }}</div>
      </div>
      <div class="academic-ranking-table-row5" style="color: #8d9cc4">
        <div class="academic-ranking-table-row-type">
          {{ academicData[4].type }}
        </div>
        <div>{{ academicData[4].value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "academicRanking",
  data() {
    return {
      academicData: [
        {
          type: "本科",
          value: 261
        },
        {
          type: "专科",
          value: 197
        },
        {
          type: "高中",
          value: 180
        },
        {
          type: "硕士",
          value: 61
        },
        {
          type: "小学",
          value: 45
        }
      ]
    };
  }
};
</script>

<style scoped>
.academic-ranking {
  width: 305px;
  height: 155px;
  margin-top: 32px;
  margin-left: 30px;
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 100% 100%;
}

.academic-ranking-table-row1 {
  width: 100%;
  height: 29px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.academic-ranking-table-row2 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.academic-ranking-table-row3 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.academic-ranking-table-row4 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.academic-ranking-table-row5 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.academic-ranking-table-row1,
.academic-ranking-table-row2,
.academic-ranking-table-row3,
.academic-ranking-table-row4,
.academic-ranking-table-row5 {
  display: flex;
  align-items: center;
}
.academic-ranking-table-row-type {
  margin-left: 60px;
  margin-right: 110px;
}
</style>
