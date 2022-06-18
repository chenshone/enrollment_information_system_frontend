<template>
  <a-layout>
    <a-layout-header><Header /></a-layout-header>
    <a-layout-content class="content"><router-view /></a-layout-content>
    <a-layout-footer><Footer /></a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Layout, message } from "ant-design-vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { getLocal } from "./utils/storage";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { loginTokenApi } from "./api/request";

export default defineComponent({
  components: {
    Header,
    Footer,
    ALayout: Layout,
  },
  setup() {
    const token = getLocal("userToken");
    const router = useRouter();
    const store = useStore();
    const route = useRoute();

    store.commit("setUserToken", token);

    onMounted(() => {
      if (!token) {
        router.push("/login");

        // console.log(router.currentRoute);
      } else {
        loginTokenApi({ myToken: token })
          .then((res) => {
            store.commit("setUserInfo", res.data);
            console.log(111, res);
          })
          .catch(() => {
            message.error("用户登录过期");
            router.push("/login");
          });
      }
    });
  },
});
</script>

<style lang="less" scoped>
.content {
  min-height: 745px;
}
</style>
