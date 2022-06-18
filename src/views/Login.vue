<template>
  <a-layout>
    <a-layout-content>
      <a-row type="flex" class="content" justify="space-around" align="middle">
        <a-col :span="6"
          ><p class="title">用户登录</p>
          <a-input
            v-model:value="userName"
            placeholder="请输入用户名"
            allowClear
            :maxlength="10"
          >
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
          <a-alert
            message="用户名错误或不合法"
            type="error"
            show-icon
            closable
            v-if="isShowUserNameError"
            @close="onErrorClick"
          />
          <br />
          <br />
          <a-input-password
            v-model:value="password"
            placeholder="请输入密码"
            allowClear
            :maxlength="10"
          >
            <template #prefix><key-outlined /></template>
          </a-input-password>
          <a-alert
            v-if="isShowPasswordError"
            message="密码错误或不合法"
            type="error"
            show-icon
            closable
            @close="onErrorClick"
          />
          <br />
          <br />
          <a-button type="primary" @click="onLogin">登录</a-button>
          &nbsp; &nbsp;
          <a-button type="primary" @click="onToSignin">注册</a-button>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Alert,
  message,
} from "ant-design-vue";
import { UserOutlined, KeyOutlined } from "@ant-design/icons-vue";

import { useRouter } from "vue-router";
import { loginApi } from "@/api/request";
import { setLocal } from "@/utils/storage";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  components: {
    ALayout: Layout,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AInputPassword: Input.Password,
    AButton: Button,
    AAlert: Alert,
    UserOutlined,
    KeyOutlined,
  },
  setup() {
    const userName = ref<string>("");
    const password = ref<string>("");
    const isShowUserNameError = ref<boolean>(false);
    const isShowPasswordError = ref<boolean>(false);

    const router = useRouter();

    const store = useStore();

    // 简单判断账号密码是否符合规则
    const onLoginCheck = () => {
      const reg = /^[0-9a-zA-Z]*$/; // 只允许数字与字母
      isShowUserNameError.value =
        !reg.test(userName.value) || userName.value.length == 0;
      isShowPasswordError.value =
        !reg.test(password.value) || userName.value.length == 0;

      return !isShowUserNameError.value && !isShowPasswordError.value;
    };

    const onErrorClick = () => {
      isShowUserNameError.value = false;
      isShowPasswordError.value = false;
    };

    const onToSignin = () => {
      router.push("/signin");
    };
    const onLogin = () => {
      const loginCheck = onLoginCheck();
      if (loginCheck) {
        message.loading("正在登录。。。", 0);
        loginApi({
          username: userName.value,
          pwd: password.value,
        })
          .then((res) => {
            message.destroy();
            console.log("response", res);
            message.success("登录成功");
            // @ts-ignore
            const token = res.data.token;
            setLocal("userToken", token);
            store.commit("setUserToken", res.data.token);
            store.commit("setUserInfo", {
              id: res.data.id,
              username: res.data.username,
            });
            router.push("/consultation");
          })
          .catch((err) => {
            message.destroy();
            console.log(err);

            message.error(err.msg);
          });
      }
    };

    return {
      userName,
      password,
      isShowPasswordError,
      isShowUserNameError,
      onLogin,
      onErrorClick,
      onToSignin,
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  margin-bottom: 30px;
  height: 650px;
  .title {
    font-size: 30px;
  }
}
</style>
