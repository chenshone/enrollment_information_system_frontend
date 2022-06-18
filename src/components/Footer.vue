<template>
  <div class="container">
    <div class="footer">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="3"
          ><div class="tel">
            <p>地址：南京仙林大学城文澜路89号</p>
            <p>邮编：210023</p>
          </div>
        </a-col>
        <a-col :span="3"
          ><div class="dropdown">
            <link-outlined />
            <a-dropdown placement="topCenter">
              <a class="ant-dropdown-link" @click.prevent> 友情链接 </a>
              <template #overlay>
                <a-menu @click="onClick">
                  <a-menu-item key="1"
                    ><a href="http://www.miit.gov.cn/">工信部</a></a-menu-item
                  >
                  <a-menu-item key="2"
                    ><a href="http://www.moe.gov.cn/">教育部</a></a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LinkOutlined } from "@ant-design/icons-vue";
import { Row, Col, Dropdown, Menu } from "ant-design-vue";

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: MouseEvent;
}

export default defineComponent({
  name: "Footer",
  components: {
    ARow: Row,
    ACol: Col,
    LinkOutlined,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
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
  .footer {
    background: url("../assets/img/footer.png");
    height: 100px;
    background-size: 100% 100%;
    .tel {
      color: #bbb;
      padding-top: 25px;
      line-height: 18px;
    }
  }
  .dropdown {
    color: #bbb;
    .ant-dropdown-link {
      color: #bbb;
      font-size: 15px;
    }
  }
}
</style>
