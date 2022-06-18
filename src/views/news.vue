<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12" class="content">
      <h1 class="title">{{ article.title }}</h1>
      <div class="info">
        作者：<span>{{ article.author }}</span
        >&nbsp;&nbsp;&nbsp;日期：<span>{{
          dayjs(article.datetime).format("YYYY-MM-DD")
        }}</span>
      </div>
      <a-divider />
      <div v-if="article.isExcel">
        <a-table
          :columns="columns"
          :data-source="article.form"
          :pagination="false"
        >
          <template #headerCell="{ column }">
            <span>
              {{ column.name }}
            </span>
          </template>

          <template #bodyCell="{ column, record }">
            <div>
              {{ record[column.key] }}
            </div>
          </template>
        </a-table>
      </div>
      <div v-else class="message" v-html="article.content"></div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Row, Col, Divider, Table } from "ant-design-vue";
import { useRoute } from "vue-router";

import dayjs from "dayjs";

import { getArticleById } from "@/api/request";

interface ContentInfo {
  title: string;
  author: string;
  datetime: string;
  content?: any;
  isExcel: boolean;
  form?: Array<any>;
}

// let article: ContentInfo = {
//   title: "",
//   author: "",
//   datetime: "",
//   content: "",
// };
export default defineComponent({
  name: "News",
  components: {
    ARow: Row,
    ACol: Col,
    ADivider: Divider,
    ATable: Table,
  },
  setup() {
    const route = useRoute();
    let article = ref<ContentInfo>({
      title: "",
      author: "",
      datetime: "",
      content: "",
      isExcel: false,
    });
    let columns = ref([{}]);
    onMounted(async () => {
      const { data } = await getArticleById(route.params.id as string);
      console.log(data);

      article.value.title = data.article.title;
      article.value.author = data.article.author;
      article.value.datetime = data.article.datetime;
      article.value.content = data.article.content;
      article.value.isExcel = data.article.isExcel;
      //@ts-ignore
      article.value.form = data.article.form;

      if (article.value.isExcel) {
        const keys = Object.keys(data.article.form[0]);
        console.log("keys", keys);
        columns.value.shift();
        for (const v of keys) {
          columns.value.push({ name: v, dataIndex: v, key: v });
        }
      }
    });
    return { article, dayjs, columns };
  },
});
</script>

<style lang="less" scoped>
.content {
  .title,
  .info {
    text-align: center;
  }
}
</style>
