<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="3">
      <a-menu
        style="width: 200px"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item
          v-for="(item, index) in list"
          :key="index.toString()"
          @click="handleClick(index)"
          >{{ item }}</a-menu-item
        >
      </a-menu>
    </a-col>
    <a-col style="background-color: white" :span="10">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="list[nowChoose]"
      />
      <div class="info">
        <InfoItem
          :widthStyle="500"
          :topic="topic"
          :subTopic="list[nowChoose]"
        />
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Menu, Row, Col, PageHeader } from "ant-design-vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { topics, subTopics } from "@/data/names";
import InfoItem from "@/components/common/InfoItem.vue";

export default defineComponent({
  name: "List",
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ARow: Row,
    ACol: Col,
    // RouterView,
    APageHeader: PageHeader,
    InfoItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    let nowChoose = ref<number>(0);
    let selectedKeys = ref<string[]>(["0"]);

    let topic = ref<string>(topics[parseInt(route.params.topic as string)]);
    let list = ref<string[]>(subTopics[parseInt(route.params.topic as string)]);

    nowChoose.value = parseInt(route.params.subTopic as string);
    selectedKeys.value.shift();
    selectedKeys.value.push(route.params.subTopic as string);

    onBeforeRouteUpdate((to) => {
      // console.log("to///////", to);
      topic.value = topics[parseInt(to.params.topic as string)];
      list.value = subTopics[parseInt(to.params.topic as string)];
      nowChoose.value = parseInt(to.params.subTopic as string);
      selectedKeys.value.shift();
      selectedKeys.value.push(to.params.subTopic as string);
    });

    // console.log("q222", nowChoose.value);

    const handleClick = (no: number) => {
      nowChoose.value = no;
      router.push({
        name: "List",
        params: {
          topic: route.params.topic,
          subTopic: nowChoose.value,
        },
      });
    };
    return {
      list,
      topic,
      nowChoose,
      selectedKeys,
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.info {
  padding: 25px;
  padding-top: 0;
}
</style>
