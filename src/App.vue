<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

/*左侧图层栏,选中后颜色变化*/
.checkbox-spot-children .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffffff;
}

.checkbox-spot .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffffff;
}

.checkbox-camera .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #65dbbe;
}

.checkbox-broadcast .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #92d799;
}

.checkbox-uav .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #bfa6ef;
}

.checkbox-alarm .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #f37d7d;
}

.checkbox-road .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #debbbb;
}

.checkbox-passenger .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #e7e547;
}

/*菜单栏样式控制*/
.el-menu-item {
  font-size: 16px;
  font-family: 等线;
  font-weight: bolder;
  width: 125px;
}

.el-submenu__title {
  font-size: 16px;
  font-family: 等线;
  font-weight: bolder;
  width: 125px;
}

.el-menu--horizontal > .el-menu-item {
  line-height: 50px;
  border-bottom: none !important;
  text-decoration: none;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  line-height: 50px;
  height: 35px;
  border-bottom: none !important;
  text-decoration: none;
}

/*上方菜单栏下拉框宽度控制*/
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 100px !important;
  border-style: solid;
  border-width: 2px;
  border-color: #134374;
  background-color: rgb(18, 32, 47) !important;
}

/*el-menu鼠标悬停颜色*/
.el-menu-item:hover {
  background: rgba(0, 0, 0, 0) !important;
  color: #8df6ff !important;
}

.el-submenu__title:hover {
  background: rgba(0, 0, 0, 0) !important;
  /*background: #deaf48 !important;*/
  color: #8df6ff !important;
}

/*el-menu选中背景色*/
.el-menu-item.is-active {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #8df6ff !important;
}

.el-submenu.is-active .el-submenu__title {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #8df6ff !important;
}

.el-input__inner {
  background-color: rgba(255, 255, 255, 0.247);
  box-shadow: 0px 0px 4px #fafafa;
  color: #ffffff;
}

/*表格样式统一*/
.el-table {
  padding: 0px;
  text-align: center;
  color: #ffffff;
}

.el-table--border, .el-table--group {
  /*border: 0px solid #ffffff;*/
  box-shadow: 0px 0px 5px #a8a5a5; /*添加边框光影*/
}

/*背景调整透明*/
.el-table, .el-table__expanded-cell {
  background-color: transparent;
}

.el-table th, .el-table tr, .el-table td {
  background-color: transparent;
}

.el-table__cell {
  background-color: transparent;
  padding: 0px;
  font-size: 8px;
}

.market-analysis .el-table--border, .el-table--group {
  border: 0px;
  box-shadow: 0px 0px 0px transparent; /*添加边框光影*/
}

.market-analysis .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: transparent;
}

.market-analysis .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background-color: #0d2a78;
}

/*选中高亮颜色*/
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row > td {
  background-color: #a2a4a7 !important;
}

.el-table tbody tr:hover > td {
  background-color: #a2a4a7 !important;
}

.el-pagination {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0) !important;
  min-width: 310px;
  max-width: 310px;
}

.el-select-dropdown__item li {
  background-color: transparent !important;
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
  color: #ffffff;
  background: transparent !important;
  background-color: transparent !important;
}

.el-pagination button:disabled {
  background-color: transparent !important;
}

.el-pager li {
  background-color: transparent !important;
}

.el-pager li.active {
  color: #21d5e6 !important;
}


/*滚动条样式*/
::-webkit-scrollbar {
  width: 8px !important;
}

::-webkit-scrollbar-thumb {
  background-color: #ffffff !important;
  border-radius: 5px !important;
}

.file-doc::-webkit-scrollbar {
  width: 10px;
}

.file-doc::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border: 2px solid #283a42 !important;
  border-radius: 5px;
}

.docx-wrapper {
  background: transparent !important;
}

.el-tree-node__content:hover, .el-upload-list__item:hover {
  background-color: #2c3e50;
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #2c3e50;
}

.el-data-picker {
  width: 300px !important;
  color: #ffffff;
}

.el-popper {
  margin-left: -19px !important;
}

.el-date-picker__time-header .el-input__inner {
  color: #000000 !important;
}

</style>
