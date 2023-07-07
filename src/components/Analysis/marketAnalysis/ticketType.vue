<template>
  <div>
    <div id="ticketType" style="width: 380px;height: 140px;margin-left: 50px;margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getTicketDetail} from "../../../api/ticket";

export default {
  name: "ticketType",
  data() {
    return {
      ticketTypeChart: undefined,
      ticketTypeArray: [],
      totalNum: 0,
    }
  },
  mounted() {
    this.getTicketTypeData()
  },
  methods: {
    getTicketTypeData(){
      const date = new Date()
      var today = date.toISOString().split('T')[0]
      let data = {
        // specificDate: today,
        specificDate: '2023-6-23',
      }
      getTicketDetail(data).then(res=>{
        if (res.data.code == '00000') {
          let ticketType = res.data.data.ticketTypeCount
          for (let key in ticketType) {
            let listObj = new Object()
            listObj.name = ticketType[key].ticketType
            listObj.value = ticketType[key].typeCount
            this.ticketTypeArray.push(listObj)
          }
          this.getTicketTypeEcharts()
        }
      })
    },
    getTicketTypeEcharts() {
      let option = {
        legend: {
          orient: 'vertical',
          left: 220,
          top: 25,
          padding: 2,
          textStyle: {
            color: 'white'
          }
        },

        series: [
          {
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['50%', '90%'],
            label: {
              show: true,
              position: 'center',
              color: '#4c4a4a',
              formatter: '{total|' + this.totalNum + '}' + '\n\r' + '{font|门票}',
              rich: {
                total: {
                  fontSize: 16,
                  color: '#ffffff',
                },
                font: {
                  fontSize: 16,
                  color: '#ffffff',
                },
              },
              emphasis: {
                show: true,
              }
            },
            data: this.ticketTypeArray
              // [
              // {
              //   value: 30,
              //   name: '老年票',
              //   itemStyle: {color: '#fc8251'},
              // },
              // {
              //   value: 20,
              //   name: '儿童票',
              //   itemStyle: {color: '#ecb518'},
              // },
              // {
              //   value: 30,
              //   name: '普通票',
              //   itemStyle: {color: '#65e8f5'},
              // },
              // {
              //   value: 20,
              //   name: '其他票',
              //   itemStyle: {color: '#73f565'},
              // }
            // ]
          }
        ]
      };
      this.ticketTypeChart = echarts.init(document.getElementById('ticketType'));
      this.ticketTypeChart.setOption(option)
    },
  },
}
</script>

<style scoped>

</style>
