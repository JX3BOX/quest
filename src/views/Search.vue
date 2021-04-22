<template>
  <div class="m-wiki-wrapper">
    <search-bar/>
    <!-- 列表 -->
    <div class="m-wiki-list" v-if="sources && sources.length">
      <SourceSingle v-for="(source, i) in sources" :key="i" :source="source" :fav-enable="false"/>
    </div>
    <el-pagination
        class="m-wiki-pages"
        background
        :total="sources_total"
        hide-on-single-page
        layout="prev, pager, next"
        :current-page.sync="page"
        :page-size="length"
        prev-html="&laquo;"
        next-html="&raquo;"
    ></el-pagination>
  </div>
</template>

<script>
  import {get_list} from "../service/quest";
  import Search from "../components/Search.vue";
  import SourceSingle from "../components/SourceSingle";
  import {ts2str} from "@jx3box/jx3box-common/js/utils";

  export default {
    name: "Search",
    props: [],
    data: function () {
      return {
        sources: [],
        sources_total: 0,
        page: 1,
        length: 15,

        date_format: ts2str,
      };
    },
    computed: {
      params() {
        return {
          limit: this.length,
          page: this.page,
          class_id: this.$store.state.sidebar.class_id,
        };
      },
    },
    methods: {
      loadData: function () {
        get_list({
          ids: this.$route.query.ids ? this.$route.query.ids.split(",") : [],
          keyword: this.$route.params.keyword,
          page: this.page,
          limit: this.length,
        }).then((data) => {
          data = data.data;
          if (data.code === 200) {
            this.sources = data.data.data;
            this.sources_total = data.data.total;
          } else {
            this.sources = [];
            this.sources_total = 0;
          }
        });
      },
    },
    components: {
      "search-bar": Search,
      SourceSingle,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.page = parseInt(this.$route.query.page) || 1;
          this.loadData()
        },
      },
      params: {
        deep: true,
        handler: function () {
          this.loadData()
        }
      }
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/normal.less";
</style>