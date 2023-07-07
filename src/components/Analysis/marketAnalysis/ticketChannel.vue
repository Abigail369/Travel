<template>
  <div>
    <div id="ticketChannel" style="width: 380px;height: 140px;margin-left: 50px;margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getTicketDetail} from "../../../api/ticket";

export default {
  name: "ticketChannel",
  data() {
    return {
      ticketChannelChart: undefined,
      ticketChannelArray: [],
      totalNum: 0,
    }
  },
  mounted() {
    this.getTicketChannelData()
  },
  methods: {
    getTicketChannelData() {
      const date = new Date()
      var today = date.toISOString().split('T')[0]
      let data = {
        // specificDate: today,
        specificDate: '2023-6-23',
      }
      getTicketDetail(data).then(res => {
        if (res.data.code == '00000') {
          let ticketChannel = res.data.data.ticketChannelCount
          console.log(ticketChannel)
          for (let key in ticketChannel) {
            let listObj = new Object()
            listObj.name = ticketChannel[key].channel
            listObj.value = ticketChannel[key].channelCount
            this.ticketChannelArray.push(listObj)
          }
          this.getTicketChannelEcharts()
        }
      })
    },
    getTicketChannelEcharts() {
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
            data: this.ticketChannelArray,
            // data: [
            //   {
            //     value: 40,
            //     name: '自营',
            //     itemStyle: {color: '#fc8251'},
            //   },
            //   {
            //     value: 20,
            //     name: '小程序',
            //     itemStyle: {color: '#ecb518'},
            //   },
            //   {
            //     value: 60,
            //     name: '第三方平台',
            //     itemStyle: {color: '#65e8f5'},
            //   },
            //   {
            //     value: 20,
            //     name: '其他票',
            //     itemStyle: {color: '#73f565'},
            //   }
            // ]
          }
        ]
      };
      this.ticketChannelChart = echarts.init(document.getElementById('ticketChannel'));
      this.ticketChannelChart.setOption(option)
    },
  },
}
</script>

<style scoped>

</style>
