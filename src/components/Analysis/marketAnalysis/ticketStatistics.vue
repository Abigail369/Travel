<template>
  <div>
    <div>
      <div class="market-analysis-today-ticket">
        <div class="market-analysis-ticket-font">{{ todayTicket }}张</div>
      </div>
      <div class="market-analysis-today-ticket-center"></div>
      <div class="market-analysis-today-ticket-bottom">
        <div class="market-analysis-ticket-font-bottom">今日售票</div>
      </div>
    </div>
    <div>
      <div class="market-analysis-today-ticket-refund">
        <div class="market-analysis-ticket-font" style="margin-left: 80px">{{ todayRefund }}张</div>
      </div>
      <div class="market-analysis-today-ticket-refund-center"></div>
      <div class="market-analysis-today-ticket-refund-bottom">
        <div class="market-analysis-ticket-font-bottom">今日退票</div>
      </div>
    </div>
    <div>
      <div class="market-analysis-today-ticket-total">
        <div class="market-analysis-ticket-total-font">{{ totalTicket }}张</div>
      </div>
      <div class="market-analysis-today-ticket-total-center"></div>
      <div class="market-analysis-today-ticket-total-bottom">
        <div class="market-analysis-ticket-font-bottom">总销售量</div>
      </div>
    </div>
    <div>
      <div class="market-analysis-today-ticket-sale-total">
        <div class="market-analysis-ticket-total-font">{{ totalSale }}元</div>
      </div>
      <div class="market-analysis-today-ticket-sale-total-center"></div>
      <div class="market-analysis-today-ticket-sale-total-bottom">
        <div class="market-analysis-ticket-font-bottom">总销售额</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTicketDetail} from "../../../api/ticket";

export default {
  name: "ticketStatistics",
  data() {
    return {
      todayTicket: 1593,
      todayRefund: 36,
      totalTicket: 5482,
      totalSale: 86974,
    }
  },
  mounted() {
    this.getTicketDetail()
  },
  methods: {
    getTicketDetail(){
      const date = new Date()
      var today = date.toISOString().split('T')[0]
      let data = {
        specificDate: today,
      }
      getTicketDetail(data).then(res=>{
        if (res.data.code == '00000') {
          this.todayTicket = res.data.data.ticketSum
          this.todayRefund = res.data.data.ticketRefundCount
        }
      })
    },
  },
}
</script>

<style scoped>

.market-analysis-today-ticket {
  background: linear-gradient(rgba(90, 229, 238, 0), rgba(90, 229, 238, 0.3));
  width: 200px;
  height: 40px;
  margin-top: 40px;
  margin-left: 25px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.market-analysis-today-ticket-center {
  background: rgba(90, 229, 238, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 75px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.market-analysis-today-ticket-bottom {
  background: linear-gradient(rgba(90, 229, 238, 0.8), rgba(90, 229, 238, 0));
  width: 100px;
  height: 30px;
  margin-left: 75px;
}

.market-analysis-today-ticket-refund {
  background: linear-gradient(rgba(90, 229, 238, 0), rgba(90, 229, 238, 0.3));
  width: 200px;
  height: 40px;
  margin-top: -70px;
  margin-left: 220px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.market-analysis-today-ticket-refund-center {
  background: rgba(90, 229, 238, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 270px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.market-analysis-today-ticket-refund-bottom {
  background: linear-gradient(rgba(90, 229, 238, 0.8), rgba(90, 229, 238, 0));
  width: 100px;
  height: 30px;
  margin-left: 270px;
}

.market-analysis-ticket-font {
  color: rgb(90, 229, 238);
  font-weight: bold;
  line-height: 200%;
  float: left;
}

.market-analysis-today-ticket-total {
  background: linear-gradient(rgba(251, 195, 83, 0), rgba(251, 195, 83, 0.3));
  width: 200px;
  height: 40px;
  margin-left: 25px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.market-analysis-today-ticket-total-center {
  background: rgba(251, 195, 83, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 75px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.market-analysis-today-ticket-total-bottom {
  background: linear-gradient(rgba(251, 195, 83, 0.8), rgba(251, 195, 83, 0));
  width: 100px;
  height: 30px;
  margin-left: 75px;
}

.market-analysis-today-ticket-sale-total {
  background: linear-gradient(rgba(251, 195, 83, 0), rgba(251, 195, 83, 0.3));
  width: 200px;
  height: 40px;
  margin-top: -70px;
  margin-left: 220px;
  clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
}

.market-analysis-today-ticket-sale-total-center {
  background: rgba(251, 195, 83, 0.4);
  width: 100px;
  height: 10px;
  margin-left: 270px;
  margin-top: -10px;
  clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
}

.market-analysis-today-ticket-sale-total-bottom {
  background: linear-gradient(rgba(251, 195, 83, 0.8), rgba(251, 195, 83, 0));
  width: 100px;
  height: 30px;
  margin-left: 270px;
}

.market-analysis-ticket-total-font {
  color: rgb(251, 195, 83);
  font-weight: bold;
  line-height: 200%;
  float: left;
  margin-left: 70px;
}

.market-analysis-ticket-font-bottom {
  color: #ffffff;
  line-height: 200%;
  font-size: 14px;
}

</style>
