<template>
  <nav class="m-nav">
    <el-input class="u-keyword" v-model="keyword" placeholder="输入分类关键字"></el-input>
    <div class="m-menus-panel">
      <el-tree
          class="m-menus"
          :data="search_menus"
          node-key="id"
          ref="tree"
      >
        <router-link
            v-if="data.Name.indexOf(keyword)>=0"
            class="el-tree-node__label"
            slot-scope="{ node, data }"
            :to="menuLink(data, node)"
        >
          <span class="u-name" v-text="data.Name"></span>
          <em
              v-if="data.total"
              class="u-count"
              v-text="`(${data.total})`"
          ></em>
        </router-link>
      </el-tree>
    </div>
  </nav>
</template>

<script>
  import {get_menus} from "../service/quest";

  export default {
    name: "Nav",
    data: function () {
      return {
        keyword: '',
        menus: [],
      };
    },
    computed: {
      // 根据条件过滤菜单
      search_menus() {
        let menus = [];
        for (let index in this.menus) {
          let menu = this.menus[index];
          if (this.keyword && menu.Name.indexOf(this.keyword) === -1) continue;
          menus.push(menu);
        }
        return menus;
      }
    },
    methods: {
      menuLink(menu, node) {
        return {name: 'normal', params: menu.ID ? {class_id: menu.ID} : {}};
      },
    },
    created() {
      get_menus().then((data) => {
        data = data.data;
        if (data.code === 200) this.menus = data.data.menus;
      });
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/nav.less";
</style>
