<template>
  <div class="product-sale-ranking">
    <div class="product-sale-ranking-table">
      <el-table
        :data="productSaleData"
        :show-header="false"
        :row-style="{height:'27px'}"
        :cell-style="{padding:'0px',borderColor: 'rgba(0,0,0,0)'}">
        <el-table-column width="140" label="商品名" align="center" prop="product" :show-overflow-tooltip="true">
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
import {getProductSalesRanking} from "../../../api/productAnalysis";

export default {
  name: "productSaleRanking",
  data() {
    return {
      productSaleData: [],
      // productSaleData: [
      //   {
      //     product: '蒙山纪念品',
      //     countSum: 3500,
      //   }, {
      //     product: '文创杯子',
      //     countSum: 1600,
      //   }, {
      //     product: '特产',
      //     countSum: 1400,
      //   }, {
      //     product: '明信片',
      //     countSum: 1000,
      //   }, {
      //     product: '串珠',
      //     countSum: 500,
      //   },
      // ],
    }
  },
  mounted() {
    this.getProductSalesRanking()
  },
  methods: {
    getProductSalesRanking() {
      let data = {topNum: 5}
      getProductSalesRanking(data).then(res => {
        if (res.data.code == '00000') {
          this.productSaleData = res.data.data
        }
      })
    }
  },
}
</script>

<style scoped>
.product-sale-ranking {
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 300px 150px;
  margin-top: 32px;
  margin-left: 20px;
}

.product-sale-ranking-table {
  width: 391px;
  margin-left: 90px;
}
</style>
