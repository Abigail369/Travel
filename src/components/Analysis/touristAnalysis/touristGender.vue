<template>
  <div class="tourist-gender">
    <div class="tourist-gender-type">
      <img
        src="../../../../static/img/tourist/male.png"
        alt=""
        class="tourist-gender-type-top"
      />
      <div style="color:#00C3E2; margin-bottom: 5px;">
        {{ malePercentage.toFixed(2) }}%
      </div>
      <img
        src="../../../../static/img/tourist/bluecircle.png"
        alt=""
        class="tourist-gender-type-bottom"
      />
    </div>

    <div class="tourist-gender-type tourist-gender-type-right">
      <img
        src="../../../../static/img/tourist/female.png"
        alt=""
        class="tourist-gender-type-top"
      />
      <div style="color: #BF963F;margin-bottom: 5px;">
        {{ femalePercentage.toFixed(2) }}%
      </div>
      <img
        src="../../../../static/img/tourist/yellowcircle.png"
        alt=""
        class="tourist-gender-type-bottom"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "touristGender",
  props: {
    genderCount: {
      type: Array,
      default: () => [0, 0]
    }
  },
  data() {
    return {
      malePercentage: 0,
      femalePercentage: 0
    };
  },
  watch: {
    genderCount: {
      immediate: true,
      handler: function() {
        this.getToristGender();
      }
    }
  },
  methods: {
    getToristGender() {
      let data = this.$props.genderCount;
      let total = this.$props.genderCount[0] + this.$props.genderCount[1];
      this.malePercentage = (data[0] / total) * 100;
      this.femalePercentage = (data[1] / total) * 100;
    }
  }
};
</script>

<style scoped>
.tourist-gender {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 140px;
  margin-left: 30px;
  margin-top: 30px;
}

.tourist-gender-type-top {
  width: 20px;
}

.tourist-gender-type-bottom {
  height: 50px;
}

.tourist-gender-type-right {
  margin-left: 40px;
}
</style>
