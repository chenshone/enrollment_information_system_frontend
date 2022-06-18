<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="container">
        <a-descriptions bordered title="用户信息">
          <!-- <template #extra>
            <a-button type="primary">修改</a-button>
          </template> -->
          <a-descriptions-item label="昵称" :span="3"
            ><a-input
              :disabled="true"
              v-model:value="name"
              placeholder="用户名必须小于等于10位，只能是数字或字母"
              :max-length="10"
              allow-clear
          /></a-descriptions-item>
          <a-descriptions-item label="年龄" :span="3"
            ><a-input-number :disabled="true" v-model:value="age" :min="10"
          /></a-descriptions-item>
          <a-descriptions-item label="性别" :span="3"
            ><a-radio-group :disabled="true" v-model:value="sex">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="0">女</a-radio>
            </a-radio-group></a-descriptions-item
          >
          <a-descriptions-item label="手机号" :span="3"
            ><a-input
              :disabled="true"
              v-model:value="tel"
              placeholder="无需输入+86"
              :max-length="11"
              allow-clear
          /></a-descriptions-item>
          <a-descriptions-item label="考生地区" :span="3"
            ><a-cascader
              :disabled="true"
              v-model:value="area"
              :options="areas"
              style="width: 100%"
          /></a-descriptions-item>
          <a-descriptions-item label="考生分数" :span="3"
            ><a-input-number :disabled="true" v-model:value="score" :max="1000"
          /></a-descriptions-item>
          <a-descriptions-item label="我的留言" :span="3">
            <a-list
              class="comment-list"
              :header="`${data.length}条留言`"
              item-layout="horizontal"
              :data-source="data"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-comment :author="item.author">
                    <template #content>
                      <p>
                        {{ item.content }}
                      </p>
                    </template>
                    <template #datetime>
                      <a-tooltip
                        :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')"
                      >
                        <span>{{ item.datetime.fromNow() }}</span>
                      </a-tooltip>
                    </template>
                    <a-comment v-if="item.reply" :author="item.reply.author">
                      <template #content>
                        <p>
                          {{ item.reply.content }}
                        </p>
                      </template>
                      <template #datetime>
                        <a-tooltip
                          :title="
                            item.reply.datetime.format('YYYY-MM-DD HH:mm:ss')
                          "
                        >
                          <span>{{ item.reply.datetime.fromNow() }}</span>
                        </a-tooltip>
                      </template>
                    </a-comment>
                  </a-comment>
                </a-list-item>
              </template>
            </a-list>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Row,
  Col,
  Descriptions,
  // Button,
  Input,
  InputNumber,
  Radio,
  Cascader,
  List,
  Comment,
  Tooltip,
} from "ant-design-vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { areas } from "@/data/cityDate";

dayjs.extend(relativeTime);
export default defineComponent({
  name: "User",
  components: {
    ARow: Row,
    ACol: Col,
    ADescriptions: Descriptions,
    // AButton: Button,
    ADescriptionsItem: Descriptions.Item,
    AInput: Input,
    AInputNumber: InputNumber,
    ARadioGroup: Radio.Group,
    ARadio: Radio,
    ACascader: Cascader,
    AList: List,
    AListItem: List.Item,
    AComment: Comment,
    ATooltip: Tooltip,
  },
  setup() {
    let name = ref<string>("admin");
    let age = ref<number>(18);
    let sex = ref<number>(1);
    let tel = ref<number>(12345678901);
    let score = ref<number>(480);
    let area = ref<string[]>(["北京市", "市辖区", "东城区"]);
    return {
      name,
      age,
      sex,
      tel,
      score,
      area,
      areas,
      data: [
        {
          author: "张三",
          content: "老师我750能上贵校吗",
          datetime: dayjs().subtract(1, "days"),
          reply: {
            author: "李四",
            content: "可以冲一冲",
            datetime: dayjs().subtract(1, "days"),
          },
        },
        {
          author: "王五",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: dayjs().subtract(2, "days"),
          reply: {
            author: "abc",
            content:
              "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
            datetime: dayjs().subtract(1, "days"),
          },
        },
        {
          author: "Han Solo",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: dayjs().subtract(2, "days"),
          reply: null,
        },
      ],
      // dayjs,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  padding-top: 20px;
  background-color: white;
}
</style>
