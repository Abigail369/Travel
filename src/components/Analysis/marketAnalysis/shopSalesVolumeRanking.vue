<template>
  <div class="shop-sale-volume-ranking">
    <div class="shop-sale-volume-ranking-table">
      <el-table
        :data="shopSaleVolumeData"
        :show-header="false"
        :row-style="{height:'27px'}"
        :cell-style="{padding:'0px',borderColor: 'rgba(0,0,0,0)'}">
        <el-table-column width="140" label="商户名" align="center" prop="shop" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column width="130" label="数量" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>销售量 {{ scope.row.count }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getShopSalesVolumeRanking} from "../../../api/shopAnalysis";

export default {
  name: "shopSalesVolumeRanking",
  data() {
    return {
      shopSaleVolumeData:[],
      // shopSaleVolumeData: [
      //   {
      //     shop: '明信片专卖店',
      //     count: 100,
      //   }, {
      //     shop: '蒙山纪念品专卖店',
      //     count: 90,
      //   }, {
      //     shop: '文创专卖店',
      //     count: 80,
      //   }, {
      //     shop: '特产专卖店',
      //     count: 70,
      //   }, {
      //     shop: '串珠专卖店',
      //     count: 50,
      //   },
      // ],
    }
  },
  mounted() {
    this.getShopSalesVolumeRanking()
  },
  methods: {
    getShopSalesVolumeRanking() {
      let data = {topNum: 5}
      getShopSalesVolumeRanking(data).then(res => {
        if (res.data.code == '00000') {
          this.shopSaleVolumeData = res.data.data
        }
      })
    }
  },
}
</script>

<style scoped>
.shop-sale-volume-ranking {
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 300px 150px;
  margin-top: 32px;
  margin-left: 20px;
}

.shop-sale-volume-ranking-table {
  width: 391px;
  margin-left: 100px;
}
</style>
