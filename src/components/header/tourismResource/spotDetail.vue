<template>
  <transition name="fade">
    <div v-show="spotDetailShow">
      <div class="spot-detail-box">
        <div class="spot-detail-border"></div>
        <div class="spot-title">景点列表({{ totalCount }})</div>
        <img src="../../../../static/img/background/decorate.png"
             style="width:330px;height: 35px;position:absolute; right: -16px;top:37px"/>
        <el-button class="spot-cancel" icon="el-icon-close" @click="closeSpotDetail"></el-button>
        <div class="spot-search-box">
          <el-input v-model="spotName" placeholder="请输入景点名称" size="mini" clearable
                    style="width:170px;font-size: 13px;position: absolute;left: 52px;top: 69px;"
                    @keyup.enter.native="reGetSpotDetailData"></el-input>
          <el-button icon="el-icon-search" type="primary" size="small"
                     class="spot-search-button" @click="reGetSpotDetailData">
            <span>搜索</span>
          </el-button>
        </div>
        <div class="spot-type-search-box">
          <el-select size="mini" v-model="spotType" clearable filterable multiple collapse-tags
                     placeholder="请选择景点类型"
                     style="width:253px; font-size: 15px;position: absolute;left: 52px;top: 105px;"
                     @change="getSpotList()">
            <el-option v-for="item in typeOptions" :key="item.spotId" :label="item.spotName"
                       :value="item.spotId"></el-option>
          </el-select>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="spotData"
                  border
                  style="width:317px;margin-left:24px;position: absolute;top:140px;"
                  :row-style="{height:'23px'}"
                  :cell-style="{padding:'0px',borderColor: '#868686'}"
                  :header-cell-style="{backgroundColor:'rgba(0,0,0,0)', fontSize: '12px', color: '#7dc7de', padding: '0px', borderColor: '#868686'}"
                  align="center"
                  highlight-current-row
                  @current-change="handleTableChange"
                  @row-click="handleRowClick">
          <el-table-column width="45" label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="98" label="名称" align="center" prop="spotName" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column width="58" label="类型" align="center" prop="spotType" style="font-size: 8px;"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.spotType | typeFilter }}
            </template>
          </el-table-column>
          <el-table-column width="58" label="知识点" align="center" prop="spotKnowledge"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column width="57" label="操作" align="center">
            <template slot-scope="scope">
              <button
                style="color:#8cf4fe;background-color:transparent;border:0;border-radius:5px;height:18px;font-size: 12px;vertical-algin:middle;margin-top: 3px;padding-top:0px"
                @click.stop="showDetail(scope.row)">查看
              </button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="position: absolute;bottom: 5px;left: 15px;"
                       :page-size="21"
                       :pager-count="5" layout="prev, pager, next"
                       :current-page.sync="currentPage"
                       :total="totalCount"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </transition>
</template>

<script>
import {getSpotInfo} from '../../../api/spot'
import {SPOT_TYPE_MAP} from "../../../config/spotMap"
import spotDialog from "../../dialog/spotDialog.vue";

export default {
  name: 'spotDetail',
  props: {
    spotDetailShow: {//用于改变父组件变量
      type: Boolean,
      required: true,
    },
    spotObjToShowDialog: {//用于改变父组件变量
      type: Object,
      required: true,
    },
    spotDialogShow: {//用于改变父组件变量
      type: Boolean,
      required: true,
    }
  },
  filters: {
    typeFilter(val) {
      return SPOT_TYPE_MAP[val]
    },
  },
  data() {
    return {
      loading: true,
      spotId: '',
      spotName: '',
      spotType: '',
      spotKnowledge: '',
      spotData: [],
      currentPage: 1,
      pageSize: 21,
      totalCount: 0,
      currentRow: null,
      SPOT_TYPE: [1, 2, 3, 4, 5, 6, 7, 9, 10],
      showSpotDialog: false,
      typeOptions: [],
    }
  },
  components: {spotDialog},
  watch: {},
  created() {
    this.getSpotTypeList()
    this.getSpotList()
  },
  methods: {
    handleRowClick(row) {
      this.$emit('update:spotDialogShow', false);
      this.$parent.flyToView(row.longitude, row.latitude);
    },
    getSpotTypeList() {
      this.typeOptions = []
      for (let key of this.SPOT_TYPE) {
        this.typeOptions.push({
          spotId: key,
          spotName: SPOT_TYPE_MAP[key],
        })
      }
    },
    reGetSpotDetailData() {
      this.currentPage = 1
      this.getSpotList()
    },
    getSpotList() {
      let selectType = []
      for (let i in this.spotType) {
        selectType.push(this.spotType[i])
      }
      let numSpotType = selectType.join(",")
      let data = {
        keyword: this.spotName,
        spotTypes: numSpotType,
        pageIndex: this.currentPage,
        pageTotal: this.pageSize
      }
      getSpotInfo(data).then(res => {
        if (res.data.code == '00000') {
          this.spotData = res.data.data.pageContent
          this.totalCount = res.data.data.totalMessage
        }
        this.loading = false
      })
    },

    closeSpotDetail() {
      this.$emit('update:spotDetailShow', false)
    },
    showDetail(row) {
      let tmpObj = {
        spotId: row.spotId,
        spotName: row.spotName,
      }
      this.$emit('update:spotObjToShowDialog', tmpObj);
      this.$emit('update:spotDialogShow', true);
      this.$parent.flyToView(row.longitude, row.latitude);
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSpotList(val)
    },
    handleTableChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.spot-detail-box {
  background: url('../../../../static/img/background/rightBar.png') no-repeat;
  width: 348px;
  height: 745px;
  position: absolute;
  right: 16px;
  top: 49px;
}

.spot-detail-border {
  background: transparent;
  box-shadow: 0px 0px 8px #0865b2;
  width: 330px;
  height: 723px;
  position: absolute;
  right: 0px;
  top: 21px;
}

.spot-title {
  color: #E5DB3AFF;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 20px;
}

.spot-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -14px;
  top: 10px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.spot-search-box {
  height: 40px;
}

.spot-search-button {
  color: rgb(58, 118, 146);
  background-color: #ffffff;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 28px;
  width: 70px;
  position: absolute;
  top: 69px;
  right: 42px;
}

.spot-type-search-box {
  height: 40px;
}

</style>
