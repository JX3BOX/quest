<template>
  <div class="m-home-view">
    <Search/>

    <WikiPanel :border-none="true">
      <template slot="head-title">
        <i class="el-icon-collection"></i>
        <span> 热门任务</span>
      </template>
      <template slot="body">
        <div class="m-hot-slots">
          <el-carousel
              height="66px"
              direction="vertical"
              indicator-position="none"
              v-if="hots && hots.length"
          >
            <el-carousel-item v-for="(items, key) in hots" :key="key" class="m-carousel">
              <el-row :gutter="20">
                <template v-for="(item, k) in items">
                  <el-col :md="8" v-if="item" :key="k">
                    <router-link
                        class="u-item"
                        :to="{name:'view',params:{source_id:item.id}}"
                    >
                      <div class="u-icon">
                        <img :src="hot_icon"/>
                      </div>
                      <div class="m-carousel-content">
                        <div class="u-title" v-text="item.Name"></div>
                        <div class="u-desc">
                          <span>【{{item.EndMapName}}】</span>
                        </div>
                      </div>
                    </router-link>
                  </el-col>
                </template>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <div v-else style="text-align:center">😂 暂无热门任务</div>
        </div>
      </template>
    </WikiPanel>

    <WikiPanel :border-none="true">
      <template slot="head-title">
        <i class="el-icon-time"></i>
        <span> 最近更新</span>
      </template>
      <template slot="body">
        <div class="m-posts">
          <div class="m-post" v-for="(post, key) in newest_posts" :key="key">
            <div class="m-head">
              <div class="m-user">
                <div class="u-author">
                  <img class="u-icon" :src="post.user_avatar" :alt="post.user_nickname"/>
                  <a :href="post.user_id ? author_url(post.user_id) : null" class="u-name"
                     v-text="post.user_nickname"></a>
                </div>
                <div class="u-updated" v-text="ts2str(post.updated)"></div>
              </div>
              <div class="m-source">
                <div class="u-source">
                  <img class="u-icon" svg-inline src="../assets/img/quest.svg"/>
                  <router-link class="u-name" :to="{name: 'view', params: { source_id: post.source_id }}"
                               v-text="post.title"></router-link>
                </div>
                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
              </div>
            </div>
            <div class="m-body">
              <div class="u-excerpt" :to="{ name: 'view', params: { source_id: post.source_id } }"
                   v-html="ellipsis(post.excerpt)"></div>
            </div>
          </div>
        </div>
      </template>
    </WikiPanel>
  </div>
</template>

<script>
  const {JX3BOX} = require("@jx3box/jx3box-common");
  import {feedback} from "@jx3box/jx3box-common/data/jx3box.json";
  import Search from "../components/Search";
  import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
  import {WikiPost} from "@jx3box/jx3box-common/js/helper";
  import {get_list} from "../service/quest.js";
  import {getStatRank} from "@jx3box/jx3box-common/js/stat";
  import {authorLink, ts2str, iconLink} from "@jx3box/jx3box-common/js/utils";

  export default {
    name: "Home",
    props: [],
    data() {
      return {
        feedback,
        menu_groups: {},
        hots: null,
        hot_views: null,
        hot_icon: JX3BOX.__iconPath + "icon/388.png",
        jargons: [],
        newest_posts: null,
      };
    },
    methods: {
      icon_url: iconLink,
      author_url: authorLink,
      ts2str,
      chuck(arr, number = 3) {
        let output = [];
        for (let i = 0; i < arr.length; i += number) {
          output.push(arr.slice(i, i + number));
        }
        return output;
      },
      ellipsis(value) {
        value = value ? value.trim() : "";
        if (value.length > 100) {
          return value.slice(0, 100) + "...";
        }
        return value;
      },
      loadHotPlots: function () {
        getStatRank('quest', 'views', 18).then((res) => {
          res = res.data;
          this.hot_views = [];
          let source_ids = [];
          res.forEach((item) => {
            if (item.name.startsWith("quest")) {
              let id = item.name.split("-").pop();
              source_ids.push(id);
              this.hot_views[id] = item.value;
            }
          });

          get_list({ids: source_ids}).then((res) => {
            res = res.data;
            // 按照长度分批 
            if (res.code === 200) this.hots = this.chuck(Object.values(res.data.data));
          });
        });
      },
      loadNewestPost() {
        // 获取最新帖子列表
        WikiPost.newests('quest').then(
            (res) => {
              res = res.data;
              if (res.code === 200) this.newest_posts = res.data.newest;
            }
        );
      },
      loadData: function () {
        this.loadHotPlots();
        this.loadNewestPost();
      },
    },
    created() {
      this.loadData();
    },
    components: {
      Search,
      WikiPanel,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/home.less";
</style>
