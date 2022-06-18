<template>
  <div class="container">
    <div class="header">
      <a-row>
        <a-col :span="8"
          ><router-link to="/"
            ><div class="img_wrap">
              <img class="logo" src="../assets/img/logo.png" alt="logo" /></div
          ></router-link>
        </a-col>
        <a-col :span="4" :offset="12">
          <div class="tel">
            <p>电话：001-12345678</p>
            <p>传真：010-12345678</p>
            <p>招生官方QQ群：123456789</p>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="dropdown">
      <a-row type="flex" justify="center" align="middle" class="myrow"
        ><a-col
          ><a-space align="center" :size="150">
            <a-dropdown placement="bottomCenter">
              <a class="ant-dropdown-link" @click.prevent>
                走进紫大
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="onClick">
                  <a-menu-item key="1"
                    ><router-link to="/list/0/0"
                      >学校简介</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="2"
                    ><router-link to="/list/0/1"
                      >校园风光</router-link
                    ></a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown>

            <a-dropdown placement="bottomCenter">
              <a class="ant-dropdown-link" @click.prevent>
                院系专业
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="onClick">
                  <a-menu-item key="1"
                    ><router-link to="/list/1/0"
                      >智能制造学院</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="2"
                    ><router-link to="/list/1/1"
                      >电子工程与光电技术学院</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="3"
                    ><router-link to="/list/1/2"
                      >计算机学院</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="4"
                    ><router-link to="/list/1/3"
                      >商学院</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="5"
                    ><router-link to="/list/1/4"
                      >人文与社会科学学院</router-link
                    ></a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown>

            <a-dropdown placement="bottomCenter">
              <a class="ant-dropdown-link" @click.prevent>
                招生指南
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="onClick">
                  <a-menu-item key="1"
                    ><router-link to="/list/2/0"
                      >招生简章</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="2"
                    ><router-link to="/list/2/1"
                      >招生计划</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="4"
                    ><router-link to="/list/2/2"
                      >往年分数线</router-link
                    ></a-menu-item
                  >
                  <a-menu-item key="5"
                    ><router-link to="/list/2/3"
                      >志愿填报指南</router-link
                    ></a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown>

            <a-dropdown placement="bottomCenter">
              <a class="ant-dropdown-link" @click.prevent>
                在线咨询
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <router-link to="/consultation">在线咨询</router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { Row, Col, Dropdown, Menu, Space } from "ant-design-vue";

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: MouseEvent;
}

export default defineComponent({
  name: "Header",
  components: {
    ARow: Row,
    ACol: Col,
    DownOutlined,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASpace: Space,
  },
  setup() {
    const onClick = ({ key }: MenuInfo) => {
      console.log(`Click on item ${key}`);
    };
    return {
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  .header {
    background: url("../assets/img/header_bg.png");
    height: 100px;
    background-size: 100% 100%;
    .img_wrap {
      text-align: center;
      height: 100px;
      line-height: 100px;
      .logo {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .tel {
      color: #bbb;
      padding: 8px;
      line-height: 18px;
    }
  }
  .dropdown {
    background: #73116f;
    .ant-dropdown-link {
      color: white;
      font-size: 15px;
    }
    .myrow {
      height: 40px;
    }
  }
}
</style>
