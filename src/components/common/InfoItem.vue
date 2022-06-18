<template>
  <a-list :data-source="articleIntros" item-layout="vertical">
    <template #renderItem="{ item }"
      ><a-list-item
        ><div
          class="wrap"
          :style="{ width: widthStyle + 'px' }"
          @click="onArticleHandle(item.id)"
        >
          <div>{{ item.title }}</div>
        </div>
        <template #extra>
          {{ dayjs(item.datetime).format("YYYY-MM-DD") }}
        </template>
      </a-list-item>
    </template>
  </a-list>
  <a-pagination
    v-model:current="currentPage"
    show-quick-jumper
    :total="total"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { List, Pagination } from "ant-design-vue";

import { onBeforeRouteUpdate, useRouter } from "vue-router";
import dayjs from "dayjs";

import { getArticleList } from "@/api/request";

import { newsIntro } from "@/interface";

export default defineComponent({
  name: "InfoItem",
  components: { AList: List, AListItem: List.Item, APagination: Pagination },
  props: {
    widthStyle: {
      type: Number,
      default: 250,
    },
    topic: String,
    subTopic: String,
  },
  setup(props) {
    let currentPage = ref<number>(1);
    let total = ref<number>(0);
    let articleIntros = ref<newsIntro[]>(new Array<newsIntro>());

    const router = useRouter();

    onMounted(async () => {
      await getArticleListHandle();
    });

    onBeforeRouteUpdate(async () => {
      await getArticleListHandle();
    });
    const onChange = async (pageNumber: number) => {
      await getArticleListHandle(pageNumber);
    };
    const getArticleListHandle = async (page = 1) => {
      const { data } = await getArticleList({
        page,
        topics: [props.topic, props.subTopic],
      });
      total.value = data.sum;
      articleIntros.value = data.articles;
    };

    const onArticleHandle = (id: string) => {
      router.push({
        name: "Article",
        params: {
          id,
        },
      });
    };

    return {
      articleIntros,
      currentPage,
      total,
      dayjs,
      onChange,
      onArticleHandle,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
