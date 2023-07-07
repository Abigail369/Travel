<template>
  <div>
    <div class="login-container">
      <el-form :model="loginForm" class="login-form">
        <img src="../../static/img/background/dialogDecorate.png" class="login-left-top-decorate">
        <img src="../../static/img/background/dialogDecorate.png" class="login-right-bottom-decorate">
        <div class="login-title">欢迎登录</div>
        <el-form-item class="login-input">
          <el-input style="color: #000000" prefix-icon="el-icon-s-custom" type="text" v-model="loginForm.account"
                    placeholder="用户名"/>
        </el-form-item>
        <el-form-item class="login-input">
          <el-input style="color: #000000" prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"
                    show-password
                    placeholder="密码"/>
        </el-form-item>
        <el-button class="login-btn" @click="commit">登录</el-button>
      </el-form>

    </div>
  </div>
</template>

<script>
import {login} from "../api/login"
import Config from "../config";
import CustomMessage from "../utils/customMessage";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      userToken: '',
      psw: true,
    };
  },

  methods: {
    commit() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空');
      } else {
        login(this.loginForm).then(res => {
          switch (res.data.code) {
            case Config.respCode.SUCCESS: //登录成功
              localStorage.setItem("accessToken", res.data.data.accessToken)
              localStorage.setItem("userRoleId", res.data.data.userInfo.userRoleId)
              localStorage.setItem("userName", res.data.data.userInfo.userName)
              this.$router.push('/home');
              CustomMessage({
                message: '登录成功',
                type: 'success'
              });
              break;
            case Config.respCode.USER_PASSWORD_ERR: //用户密码错误
              //其实此case也可以直接去掉，自动归到下面default，从而使用服务器传来的异常message。此处仅作为一个自定义message的例子
              CustomMessage({
                message: '用户密码错误，请重试',
                type: 'error'
              });
              break;
            default: //其他的
              CustomMessage({
                message: res.data.message,
                type: 'error'
              });
          }

        }).catch(error => {
          console.log(error);
        });

      }
    }
  }
};
</script>

<style>
.login-container {
  background: url('../../static/img/background/background.jpg') center center no-repeat;
  position: fixed;
  background-size: 100% 100%;
  width: 100%;
  min-height: 100vh;
}

.login-form {
  position: sticky;
  width: 400px;
  top: calc((100vh - 125px) / 2);
  left: calc((100vh - 15px));
  background: url('../../static/img/background/dialog.png') no-repeat;
  background-size: 400px 320px;
  border-radius: 8px 8px 8px 8px;
}

.login-title {
  top: 20px;
  line-height: 200%;
  text-overflow: ellipsis;
  text-align: center;
  padding-top: 15px;
  color: #ffffff;
  font-weight: bolder;
  letter-spacing: 2px;
}

.login-input {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
}

.login-btn {
  width: 75%;
  height: 50px;
  margin-left: 50px;
  margin-bottom: 30px;
  margin-right: 50px;
  background-color: #ffffff;
  color: rgb(58, 118, 146);
  font-size: 16px;
  font-weight: bolder;
  border: 0;
  border-radius: 5px;
}

.login-left-top-decorate {
  position: absolute;
  top: -6px;
  left: -28px;
  transform: rotate(180deg);
}

.login-right-bottom-decorate {
  position: absolute;
  bottom: -12px;
  right: -29px;
}
</style>
