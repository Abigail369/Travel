<template>
  <div class="travel-mode">
    <div class="travel-mode-type">
      <div style="color:#00C3E2; margin-top: 55px;">
        自驾
      </div>
      <div style="color:#00C3E2; margin-top: 15px;">
        {{ selfPercentage.toFixed(2) }}%
      </div>
      <img
        src="../../../../static/img/tourist/bluecircle.png"
        alt=""
        class="travel-mode-type-bottom"
      />
    </div>

    <div class="travel-mode-type travel-mode-type-right">
      <div style="color:#00C3E2; margin-top: 55px;">
        跟团
      </div>
      <div style="color: #BF963F;margin-top: 15px;">
        {{ packPercentage.toFixed(2) }}%
      </div>
      <img
        src="../../../../static/img/tourist/yellowcircle.png"
        alt=""
        class="travel-mode-type-bottom"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "travelMode",
  props: {
    travellingWays: {
      type: Array,
      default: () => [0, 0]
    }
  },
  data() {
    return {
      selfPercentage: 0,
      packPercentage: 0
    };
  },
  watch: {
    travellingWays: {
      immediate: true,
      handler: function() {
        this.getTravelMode();
      }
    }
  },
  methods: {
    getTravelMode() {
      let data = this.$props.travellingWays;
      let total = this.$props.travellingWays[0] + this.$props.travellingWays[1];
      this.selfPercentage = (data[0] / total) * 100;
      this.packPercentage = (data[1] / total) * 100;
    }
  }
};
</script>

<style scoped>
.travel-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 140px;
  margin-left: 30px;
  margin-top: 30px;
}

.travel-mode-type-top {
  width: 20px;
}

.travel-mode-type-bottom {
  height: 50px;
  margin-top: 10px;
}

.travel-mode-type-right {
  margin-left: 40px;
}
</style>
