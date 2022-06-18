<template>
  <a-layout>
    <a-layout-content>
      <a-row type="flex" class="content" justify="space-around" align="middle">
        <a-col :span="6"
          ><p class="title">用户注册</p>
          <a-input
            v-model:value="username"
            placeholder="用户名必须小于等于10位，只能是数组或字母"
            allowClear
            :maxlength="10"
          >
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
          <a-alert
            message="用户名不合法"
            type="error"
            show-icon
            closable
            v-if="isShowUserNameError"
            @close="onErrorClick"
          />
          <br />
          <br />
          <a-input-password
            v-model:value="pwd"
            placeholder="密码必须小于等于10位，只能是数组或字母"
            allowClear
            :maxlength="10"
          >
            <template #prefix><key-outlined /></template>
          </a-input-password>
          <a-alert
            v-if="isShowPasswordError"
            message="密码不合法"
            type="error"
            show-icon
            closable
            @close="onErrorClick"
          />
          <a-input-number addon-before="年龄" v-model:value="age" :min="10" />
          <br />
          <a-radio-group v-model:value="sex">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="0">女</a-radio>
          </a-radio-group>
          <a-input
            v-model:value="tel"
            addon-before="手机号"
            placeholder="无需输入+86"
            :maxlength="11"
            allow-clear
          />
          <a-cascader
            v-model:value="addr"
            placeholder="请选择考生所在地区"
            :options="areas"
            style="width: 100%"
          />
          <a-input-number
            addon-before="分数"
            v-model:value="score"
            :max="1000"
          />
          <br />
          <br /><a-button type="primary" @click="onToSignin">注册</a-button>
          &nbsp; &nbsp;
          <a-button type="primary" @click="onToLogin">登录</a-button>
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
  Radio,
  InputNumber,
  Cascader,
} from "ant-design-vue";
import { UserOutlined, KeyOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

import { signinApi } from "@/api/request";
import { areas } from "@/data/cityDate";

export default defineComponent({
  name: "Signin",
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
    AInputNumber: InputNumber,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ACascader: Cascader,
  },
  setup() {
    const username = ref<string>("");
    const pwd = ref<string>("");
    const isShowUserNameError = ref<boolean>(false);
    const isShowPasswordError = ref<boolean>(false);

    let age = ref<number>();
    let sex = ref<number>(1);
    let tel = ref<number>();
    let score = ref<number>();
    let addr = ref<string[]>(new Array<string>());

    const router = useRouter();

    // 简单判断注册数据是否符合规则
    const onSigninCheck = () => {
      let reg = /^[0-9a-zA-Z]*$/; // 只允许数字与字母
      isShowUserNameError.value =
        !reg.test(username.value) || username.value.length == 0;
      isShowPasswordError.value = !reg.test(pwd.value) || pwd.value.length == 0;

      return (
        !isShowUserNameError.value &&
        !isShowPasswordError.value &&
        !!age.value &&
        !!tel.value &&
        tel.value.toString().length == 11 &&
        !!score.value &&
        addr.value.length == 3
      );
    };

    const onToSignin = () => {
      const check = onSigninCheck();
      if (check) {
        message.loading("正在注册中。。。", 0);
        signinApi({
          username: username.value,
          pwd: pwd.value,
          age: age.value,
          sex: sex.value,
          tel: tel.value,
          addr: addr.value,
          score: score.value,
        })
          .then((res) => {
            message.destroy();
            // @ts-ignore
            message.success(res.msg, 1);
            router.push("/login");
          })
          .catch((err) => {
            message.destroy();
            console.log(err);

            message.error(err.msg);
          });
      } else {
        message.warning("数据填写不合法！！！请检查！！！", 3);
      }
    };

    const onErrorClick = () => {
      isShowUserNameError.value = false;
      isShowPasswordError.value = false;
    };

    const onToLogin = () => {
      router.push("/login");
    };
    return {
      username,
      pwd,
      age,
      sex,
      tel,
      addr,
      score,
      areas,
      isShowUserNameError,
      isShowPasswordError,
      onErrorClick,
      onToLogin,
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
