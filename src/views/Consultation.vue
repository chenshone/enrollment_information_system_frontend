<template>
  <a-layout class="container">
    <a-layout-header class="header">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :span="4"><h1>信息咨询</h1></a-col>
        <a-col :span="6">
          <div v-if="isLogin">
            <div class="username">{{ username }}</div>
            &nbsp;
            <!-- <router-link to="/user">个人中心</router-link> -->
            &nbsp;
            <div class="commentButton">
              <a-button type="primary" @click="visible = true"
                >我要留言</a-button
              >
              <a-modal
                v-model:visible="visible"
                title="留言内容"
                ok-text="提交"
                cancel-text="取消"
                @ok="handleUpLoad"
              >
                <a-form
                  ref="formRef"
                  :model="formState"
                  layout="vertical"
                  name="form_in_modal"
                >
                  <a-form-item
                    :rules="[
                      {
                        required: true,
                        message: '请输入内容!',
                      },
                    ]"
                    name="description"
                    label="提问"
                  >
                    <a-textarea v-model:value="formState.description" />
                  </a-form-item>
                </a-form>
              </a-modal>
            </div>
            <a-button type="link" @click="handleLogout">退出</a-button>
          </div>
          <div v-else>
            <router-link to="/login">登录</router-link>
            &nbsp;
            <router-link to="/signin">注册</router-link>
          </div>
        </a-col>
      </a-row></a-layout-header
    >
    <a-layout-content>
      <div class="comment">
        <a-list
          class="comment-list"
          item-layout="horizontal"
          :data-source="comments"
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
                      :title="item.reply.datetime.format('YYYY-MM-DD HH:mm:ss')"
                    >
                      <span>{{ item.reply.datetime.fromNow() }}</span>
                    </a-tooltip>
                  </template>
                </a-comment>
              </a-comment>
            </a-list-item>
          </template>
        </a-list>
        <a-pagination
          v-model:current="currentPage"
          simple
          :total="totalComments"
          @change="handlePageChange(currentPage)"
        />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref, toRaw } from "vue";
import {
  Layout,
  Row,
  Col,
  Button,
  List,
  Comment,
  Tooltip,
  Modal,
  Form,
  Input,
  message,
  Pagination,
} from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { clearLocal } from "@/utils/storage";

import { upComment, getCommentsByPage } from "@/api/request";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { commentInfo } from "@/interface";

interface Values {
  description: string;
}

dayjs.extend(relativeTime);
export default defineComponent({
  name: "Consultation",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AList: List,
    AListItem: List.Item,
    AComment: Comment,
    ATooltip: Tooltip,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ATextarea: Input.TextArea,
    APagination: Pagination,
  },
  setup() {
    let isLogin = ref<boolean>(false);
    let username = ref<string>("username");
    const formRef = ref<FormInstance>();
    const visible = ref(false);
    const currentPage = ref<number>(1);
    const totalComments = ref<number>(0);
    const formState = reactive<Values>({
      description: "",
    });

    const comments = ref<Array<commentInfo>>(new Array<commentInfo>());

    const router = useRouter();
    const store = useStore();

    // 获取一页信息
    const getComment = async (page: number) => {
      const commentsData = (await getCommentsByPage(page)).data;
      comments.value = commentsData.comments;
      totalComments.value = commentsData.sum;
      comments.value.forEach((val) => {
        val.datetime = dayjs(val.datetime);
        if (val.reply != undefined) {
          val.reply.datetime = dayjs(val.reply.datetime);
        }
      });
    };

    // 下一页回调
    const handlePageChange = async (page: number) => {
      await getComment(page);
    };

    onMounted(async () => {
      if (!store.state.token) router.push("/login");
      else {
        isLogin.value = true;
        username.value = store.state.username;
        // 获取咨询信息数据
        await getComment(1);
      }
    });

    // 提交提问
    const handleUpLoad = () => {
      (formRef as Ref<FormInstance>).value
        .validateFields()
        .then((values) => {
          console.log("Received values of form: ", values);
          console.log("111", values.description);
          console.log("222", formState.description);
          console.log("formState: ", toRaw(formState));
          upComment({
            author: store.state.id,
            content: values.description,
          })
            .then((res) => {
              visible.value = false;
              (formRef as Ref<FormInstance>).value.resetFields();
              message.success("提问成功");
              console.log("res:", res);
              if (comments.value.length >= 10) comments.value.pop();
              comments.value.unshift({
                id: res.data.id,
                author: store.state.username,
                content: values.description,
                datetime: dayjs(res.data.datetime),
                reply: undefined,
              });
              totalComments.value++;
              // console.log("comments value: ", comments.value);
            })
            .catch((err) => {
              visible.value = false;
              (formRef as Ref<FormInstance>).value.resetFields();
              message.error(err.msg);
            });
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    const handleLogout = () => {
      clearLocal();
      store.commit("clearUserInfo");
      router.push("/login");
    };

    return {
      isLogin,
      username,
      formState,
      formRef,
      visible,
      comments,
      currentPage,
      totalComments,
      handleUpLoad,
      handleLogout,
      handlePageChange,

      // data: [
      //   {
      //     author: "张三",
      //     content: "老师我750能上贵校吗",
      //     datetime: dayjs().subtract(1, "days"),
      //     reply: {
      //       author: "李四",
      //       content: "可以冲一冲",
      //       datetime: dayjs().subtract(1, "days"),
      //     },
      //   },
      //   {
      //     author: "王五",
      //     content:
      //       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      //     datetime: dayjs().subtract(2, "days"),
      //     reply: {
      //       author: "abc",
      //       content:
      //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      //       datetime: dayjs().subtract(1, "days"),
      //     },
      //   },
      //   {
      //     author: "Han Solo",
      //     content:
      //       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      //     datetime: dayjs().subtract(2, "days"),
      //     reply: null,
      //   },
      // ],
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  .header {
    background: white;
    padding: 10px;
    height: auto;
    h1 {
      font-size: 30px;
    }
    .username,
    .commentButton {
      display: inline;
    }
  }
  .comment {
    padding: 10px;
    background-color: white;
  }
}

.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
