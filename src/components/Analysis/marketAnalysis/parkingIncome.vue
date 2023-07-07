<template>
  <div class="market-analysis">
    <el-table :data="parkingIncomeData"
              stripe
              border
              style="width:391px;margin-left:30px;"
              :row-style="{height:'35px',backgroundColor:'#092161',fontSize: '14px'}"
              :cell-style="{padding:'0px', borderColor: 'transparent'}"
              :header-cell-style="{backgroundColor:'#0d2a78', fontSize: '14px', color: '#ffffff', padding: '0px', borderColor: 'transparent'}"
              align="center">
      <el-table-column width="130" label="名称" align="center" prop="parkingName" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column width="130" label="进场数量" align="center" prop="vehicleInCount" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column width="130" label="总收入" align="center" prop="parkingIncomeTotal"
                       :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getParkingIncome} from "../../../api/marketAnalysis";

export default {
  name: "parkingIncome",
  data() {
    return {
      parkingIncomeData: [],
      vehicleInCount: 0,
      parkingIncomeTotal: 0,
      parkingName: '',
    }
  },
  mounted() {
    this.getParkingIncome()
  },
  methods: {
    getParkingIncome() {
      getParkingIncome().then(res => {
        if (res.data.code == '00000') {
          this.parkingIncomeData = res.data.data
        }
      })
    },
  },
}
</script>

<style scoped>
</style>
