<template>
  <div class="shop-sale-ranking">
    <div class="shop-sale-ranking-table">
      <el-table
        :data="shopSaleData"
        :show-header="false"
        :row-style="{height:'27px'}"
        :cell-style="{padding:'0px',borderColor: 'rgba(0,0,0,0)'}">
        <el-table-column width="140" label="商户名" align="center" prop="shop" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="130" label="数量" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>销售额 {{ scope.row.countSum }}元</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getShopSalesRanking} from "../../../api/shopAnalysis";

export default {
  name: "shopSaleRanking",
  data() {
    return {
      shopSaleData: [],
      // shopSaleData: [
      //   {
      //     shop: '蒙山纪念品专卖店',
      //     countSum: 3500,
      //   }, {
      //     shop: '文创专卖店',
      //     countSum: 1600,
      //   }, {
      //     shop: '特产专卖店',
      //     countSum: 1400,
      //   }, {
      //     shop: '明信片专卖店',
      //     countSum: 1000,
      //   }, {
      //     shop: '串珠专卖店',
      //     countSum: 500,
      //   },
      // ],
    }
  },
  mounted() {
    this.getShopSalesRanking()
  },
  methods: {
    getShopSalesRanking() {
      let data = {topNum: 5}
      getShopSalesRanking(data).then(res => {
        if (res.data.code == '00000') {
          this.shopSaleData = res.data.data
        }
      })
    }
  },
}
</script>

<style scoped>
.shop-sale-ranking {
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 300px 150px;
  margin-top: 32px;
  margin-left: 20px;
}

.shop-sale-ranking-table {
  width: 391px;
  margin-left: 100px;
}

</style>
