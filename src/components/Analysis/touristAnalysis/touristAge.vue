<template>
  <div class="tourist-age">
    <div class="age1 age">
      <div>40岁以下</div>
      <div class="percentage">[{{ age1Percentage }}%]</div>
    </div>
    <div class="age2 age">
      <div>40-50岁</div>
      <div class="percentage">[{{ age2Percentage }}%]</div>
    </div>
    <div class="age3 age">
      <div>50-65岁</div>
      <div class="percentage">[{{ age3Percentage }}%]</div>
    </div>
    <div class="age4 age">
      <div>65岁以上</div>
      <div class="percentage">[{{ age4Percentage }}%]</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "touristAge",
  props: {
    touristAge: {
      type: Array,
      default: () => [0, 0, 0, 0]
    }
  },
  data() {
    return {
      age1Percentage: 0,
      age2Percentage: 0,
      age3Percentage: 0,
      age4Percentage: 0
    };
  },
  watch: {
    touristAge: {
      handler: function() {
        this.getTouristAge();
      }
    }
  },
  methods: {
    getTouristAge() {
      let data = this.$props.touristAge;
      let sum = data.reduce((pre, cur) => {
        return pre + cur;
      });
      this.age1Percentage = ((data[0] / sum) * 100).toFixed(2);
      this.age2Percentage = ((data[1] / sum) * 100).toFixed(2);
      this.age3Percentage = ((data[2] / sum) * 100).toFixed(2);
      this.age4Percentage = ((data[3] / sum) * 100).toFixed(2);
    }
  }
};
</script>

<style scoped>
.tourist-age {
  width: 322px;
  height: 155px;
  margin-top: 30px;
  margin-left: 50px;
  background: url(../../../../static/img/tourist/triangle.png) no-repeat center
    center;
  background-size: 100% 100%;
  color: #a4c2e3;
  position: relative;
}
.age {
  width: 90px;
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
}
.percentage {
  color: #3187d6;
  font-size: 12px;
}
.age1 {
  right: -30px;
  bottom: 18px;
}
.age2 {
  left: 10px;
  bottom: 42px;
}
.age3 {
  right: 10px;
  top: 45px;
}
.age4 {
  left: 40px;
  top: 16px;
}
</style>
