<template>
  <transition name="fade">
    <div v-if="quitDialogShow" class="quit-dialog-box">
      <img src="../../../static/img/background/dialogDecorate.png" class="quit-left-top-decorate">
      <div class="quit-dialog-title">退出</div>
      <el-button class="quit-dialog-cancel" icon="el-icon-close" @click="closeQuitDialog"></el-button>
      <img src="../../../static/img/background/dialogDecorate.png" class="quit-right-bottom-decorate">
      <div class="quit-dialog-font">是否退出系统？</div>
      <el-button class="cancel-going-to-quit" @click="closeQuitDialog"> 取 消</el-button>
      <el-button class="confirm-going-to-quit" @click="quit">确 定
      </el-button>
    </div>
  </transition>
</template>

<script>
import {logout} from "../../api/login";

export default {
  name: "quitDialog",
  props: {
    quitDialogShow: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeQuitDialog() {
      this.$emit('update:quitDialogShow', false)
    },
    quit() {
      logout().then(res => {
        this.$router.push('/login');
      }).catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .6s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.quit-dialog-box {
  background: url('../../../static/img/background/dialog.png') no-repeat;
  background-size: 730px 680px;
  width: 350px;
  height: 230px;
  position: fixed;
  right: 770px;
  top: 160px;
}

.quit-dialog-title {
  color: white;
  height: 35px;
  font-size: 16px;
  line-height: 35px;
  font-weight: 600;
  margin-top: 13px;
}

.quit-dialog-cancel {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: -4px;
  top: 4px;
  color: rgb(225, 225, 225);
  font-size: 16px;
  font-weight: 800;
}

.quit-left-top-decorate {
  position: absolute;
  top: 0px;
  left: -24px;
  transform: rotate(180deg);
}

.quit-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -33px;
}

.quit-dialog-font {
  color: #ffffff;
  font-size: 16px;
  margin-top: 45px;
  letter-spacing: 2px;
}

.cancel-going-to-quit {
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 14px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 35px;
  width: 70px;
  position: absolute;
  bottom: 40px;
  left: 80px;
}

.confirm-going-to-quit {
  background-color: #23af2a;
  color: #ffffff;
  font-size: 14px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
  height: 35px;
  width: 70px;
  position: absolute;
  bottom: 40px;
  left: 180px;
}
</style>
