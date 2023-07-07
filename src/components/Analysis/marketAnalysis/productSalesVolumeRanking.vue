<template>
  <div class="product-sale-volume-ranking">
    <div class="product-sale-volume-ranking-table">
      <el-table
        :data="productSaleVolumeData"
        :show-header="false"
        :row-style="{height:'27px'}"
        :cell-style="{padding:'0px',borderColor: 'rgba(0,0,0,0)'}">
        <el-table-column width="140" label="商品名" align="center" prop="product" :show-overflow-tooltip="true">
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
import {getProductSalesVolumeRanking} from "../../../api/productAnalysis";
export default {
  name: "productSalesVolumeRanking",
  data() {
    return {
      productSaleVolumeData: [],
      // productSaleVolumeData: [
      //   {
      //     product: '明信片',
      //     count: 100,
      //   }, {
      //     product: '蒙山纪念品',
      //     count: 90,
      //   }, {
      //     product: '文创杯子',
      //     count: 80,
      //   }, {
      //     product: '特产',
      //     count: 70,
      //   }, {
      //     product: '串珠',
      //     count: 50,
      //   },
      // ],
    }
  },
  mounted() {
    this.getProductSalesVolumeRanking()
  },
  methods: {
    getProductSalesVolumeRanking() {
      let data = {topNum: 5}
      getProductSalesVolumeRanking(data).then(res => {
        if (res.data.code == '00000') {
          this.productSaleVolumeData = res.data.data
        }
      })
    }
  },
}
</script>

<style scoped>
.product-sale-volume-ranking {
  background: url("../../../../static/img/analysis/raking.png") no-repeat;
  background-size: 300px 150px;
  margin-top: 32px;
  margin-left: 20px;
}

.product-sale-volume-ranking-table {
  width: 391px;
  margin-left: 90px;
}
</style>
