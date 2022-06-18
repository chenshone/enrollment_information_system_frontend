<template>
  <div class="home">
    <Banner :bannerList="bannerList" />
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="3" class="word"> Welcome to zj!</a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Row, Col } from "ant-design-vue";

import Banner from "@/components/home/Banner.vue";

export default defineComponent({
  name: "Home",
  components: {
    Banner,
    ARow: Row,
    ACol: Col,
  },
  data() {
    return {
      bannerList: [
        { src: require("@/assets/img/banner1.jpeg"), id: 0 },
        { src: require("@/assets/img/banner2.jpg"), id: 1 },
        { src: require("@/assets/img/banner3.jpg"), id: 2 },
        { src: require("@/assets/img/banner4.jpg"), id: 3 },
      ],
    };
  },
});
</script>
<style lang="less" scoped>
.word {
  font-size: 30px;
}
</style>
