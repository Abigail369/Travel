<template>
  <div class="career-ranking">
    <div class="career-ranking-table">
      <div class="career-ranking-table-row1" style="color: #8d9cc4">
        <div class="career-ranking-table-row-type">
          {{ careerData[0].type }}
        </div>
        <div>{{ careerData[0].value }}</div>
      </div>
      <div class="career-ranking-table-row2" style="color: #8d9cc4">
        <div class="career-ranking-table-row-type">
          {{ careerData[1].type }}
        </div>
        <div>{{ careerData[1].value }}</div>
      </div>
      <div class="career-ranking-table-row3" style="color: #8d9cc4">
        <div class="career-ranking-table-row-type">
          {{ careerData[2].type }}
        </div>
        <div>{{ careerData[2].value }}</div>
      </div>
      <div class="career-ranking-table-row4" style="color: #8d9cc4">
        <div class="career-ranking-table-row-type">
          {{ careerData[3].type }}
        </div>
        <div>{{ careerData[3].value }}</div>
      </div>
      <div class="career-ranking-table-row5" style="color: #8d9cc4">
        <div class="career-ranking-table-row-type">
          {{ careerData[4].type }}
        </div>
        <div>{{ careerData[4].value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "careerRanking",
  data() {
    return {
      careerData: [
        {
          type: "老师",
          value: 169
        },
        {
          type: "律师",
          value: 108
        },
        {
          type: "白领",
          value: 93
        },
        {
          type: "退休",
          value: 71
        },
        {
          type: "无业",
          value: 62
        }
      ]
    };
  }
};
</script>

<style scoped>
.career-ranking {
  width: 305px;
  height: 155px;
  margin-top: 32px;
  margin-left: 30px;
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 100% 100%;
}

.career-ranking-table-row1 {
  width: 100%;
  height: 29px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.career-ranking-table-row2 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.career-ranking-table-row3 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.career-ranking-table-row4 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.career-ranking-table-row5 {
  width: 100%;
  height: 27px;
  box-sizing: border-box;
  transform: translate(90px, 2px);
}
.career-ranking-table-row1,
.career-ranking-table-row2,
.career-ranking-table-row3,
.career-ranking-table-row4,
.career-ranking-table-row5 {
  display: flex;
  align-items: center;
}
.career-ranking-table-row-type {
  margin-left: 60px;
  margin-right: 110px;
}
</style>
