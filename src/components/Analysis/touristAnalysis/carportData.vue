<template>
  <div>
    <div>
      <div class="carport-data" style="margin-top:42px">
        <div class="carport-data-today">{{ vehicleToday }}</div>
      </div>
      <div class="carport-data-center"></div>
      <div class="carport-data-bottom">
        <div class="carport-data-today-bottom">今日车辆</div>
      </div>
    </div>
    <div>
      <div class="carport-data-inpark">
        <div class="carport-data-today">
          {{ vehicleInPark }}
        </div>
      </div>
      <div class="carport-data-inpark-center"></div>
      <div class="carport-data-inpark-bottom">
        <div class="carport-data-today-bottom">在园车辆</div>
      </div>
    </div>

    <div>
      <div class="carport-data-total">
        <div class="carport-data-ticket-total-font">{{ vehicleMonth }}</div>
      </div>
      <div class="carport-data-total-center"></div>
      <div class="carport-data-total-bottom">
        <div class="carport-data-today-bottom">本月累计车辆</div>
      </div>
    </div>
    <div>
      <div class="carport-data-sale-total">
        <div class="carport-data-ticket-total-font">{{ vehicleYear }}</div>
      </div>
      <div class="carport-data-sale-total-center"></div>
      <div class="carport-data-sale-total-bottom">
        <div class="carport-data-today-bottom">本年累计车辆</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCarportData } from "../../../api/touristAnalysis";

export default {
  name: "ticketStatistics",
  data() {
    return {
      vehicleToday: 0,
      vehicleInPark: 0,
      vehicleMonth: 0,
      vehicleYear: 0
    };
  },
  mounted() {
    this.getCarportData();
  },
  methods: {
    getCarportData() {
      getCarportData().then(res => {
        if (res.data.code == "00000") {
          let allData = res.data.data;
          this.vehicleToday = allData.vehicleToday;
          this.vehicleInPark = allData.vehicleInPark;
          this.vehicleMonth = allData.vehicleMonth;
          this.vehicleYear = allData.vehicleYear;
        }
      });
    }
  }
};
</script>

<style scoped>
.carport-data {
  background: linear-gradient(rgba(90, 229, 238, 0), rgba(90, 229, 238, 0.3));
  width: 200px;
  height: 40px;
  margin-top: 40px;
  margin-left: 25px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.carport-data-center {
  background: rgba(90, 229, 238, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 75px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.carport-data-bottom {
  background: linear-gradient(rgba(90, 229, 238, 0.8), rgba(90, 229, 238, 0));
  width: 100px;
  height: 30px;
  margin-left: 75px;
}

.carport-data-inpark {
  background: linear-gradient(rgba(90, 229, 238, 0), rgba(90, 229, 238, 0.3));
  width: 200px;
  height: 40px;
  margin-top: -70px;
  margin-left: 220px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.carport-data-inpark-center {
  background: rgba(90, 229, 238, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 270px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.carport-data-inpark-bottom {
  background: linear-gradient(rgba(90, 229, 238, 0.8), rgba(90, 229, 238, 0));
  width: 100px;
  height: 30px;
  margin-left: 270px;
}

.carport-data-today {
  color: rgb(90, 229, 238);
  font-weight: bold;
  line-height: 200%;
}

.carport-data-total {
  background: linear-gradient(rgba(251, 195, 83, 0), rgba(251, 195, 83, 0.3));
  width: 200px;
  height: 40px;
  margin-left: 25px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.carport-data-total-center {
  background: rgba(251, 195, 83, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 75px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.carport-data-total-bottom {
  background: linear-gradient(rgba(251, 195, 83, 0.8), rgba(251, 195, 83, 0));
  width: 100px;
  height: 30px;
  margin-left: 75px;
}

.carport-data-sale-total {
  background: linear-gradient(rgba(251, 195, 83, 0), rgba(251, 195, 83, 0.3));
  width: 200px;
  height: 40px;
  margin-top: -70px;
  margin-left: 220px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.carport-data-sale-total-center {
  background: rgba(251, 195, 83, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 270px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.carport-data-sale-total-bottom {
  background: linear-gradient(rgba(251, 195, 83, 0.8), rgba(251, 195, 83, 0));
  width: 100px;
  height: 30px;
  margin-left: 270px;
}

.carport-data-ticket-total-font {
  color: rgb(251, 195, 83);
  font-weight: bold;
  line-height: 200%;
}

.carport-data-today-bottom {
  color: #ffffff;
  line-height: 200%;
  font-size: 14px;
}
</style>
