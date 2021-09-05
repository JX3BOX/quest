<template>
    <div class="m-wiki-wrapper">
        <Search />
        <SourceSingle
            v-if="wiki_post && wiki_post.source"
            :source="wiki_post.source"
            :fav-enable="true"
        />
        <div class="m-wiki" v-if="wiki_post && wiki_post.post">
            <WikiPanel class="m-quest-panel" :wiki-post="wiki_post">
                <template slot="head-title">
                    <img
                        class="u-icon"
                        svg-inline
                        src="../assets/img/quest.svg"
                    />
                    <span>任务攻略</span>
                </template>
                <template slot="head-actions">
                    <a
                        class="el-button el-button--primary"
                        :href="publish_url(`quest/${id}`)"
                    >
                        <i class="el-icon-edit"></i>
                        <span>完善任务百科</span>
                    </a>
                </template>
                <template slot="body">
                    <Article :content="wiki_post.post.content" />
                    <Thx
                        class="m-thx"
                        slot="single-append"
                        :postId="id"
                        postType="quest"
                        :userId="author_id"
                        :adminBoxcoinEnable="isRevision"
                        :userBoxcoinEnable="isRevision"
                    />
                </template>
            </WikiPanel>

            <WikiRevisions
                v-if="id"
                type="quest"
                :source-id="id"
                style="margin-bottom:35px"
            />

            <template v-if="id">
                <el-divider content-position="left">讨论</el-divider>
                <Comment :id="id" category="quest" />
            </template>
        </div>

        <div v-else class="m-wiki-null">
            <i class="el-icon-s-opportunity"></i>
            <span> 暂无内容，我要</span>
            <a class="s-link" :href="publish_url(`quest/${id}`)"
                >完善任务百科</a
            >
        </div>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import SourceSingle from "../components/SourceSingle";
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/WikiRevisions";
import Search from "../components/Search";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "Detail",
    props: [],
    data: function() {
        return {
            wiki_post: "",
        };
    },
    computed: {
        id: function() {
            return this.$route.params.source_id;
        },
        type: function() {
            return this.wiki_post.source.type;
        },
        isRevision: function () {
            return !!this.$route.params.post_id;
        },
        author_id: function () {
            return ~~this.wiki_post.post.user_id;
        },
    },
    methods: {
        publish_url: publishLink,
    },
    created: function() {
        if (this.id) {
            postStat("quest", this.id);
        }
    },
    components: {
        SourceSingle,
        Article,
        WikiPanel,
        WikiRevisions,
        Comment,
        Search,
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                // 获取最新攻略
                if (this.id) {
                    WikiPost.newest("quest", this.id)
                        .then((res) => {
                            res = res.data;
                            if (res.code === 200) {
                                this.wiki_post = res.data;
                                if (this.wiki_post.source)
                                    this.wiki_post.source.post = this.wiki_post.post;
                            }
                        })
                        .then(() => {
                            // 提交子统计
                            postStat(this.type, this.id);
                        });
                }
            },
        },
        "$route.params.post_id": {
            immediate: true,
            handler() {
                if (this.$route.params.post_id) {
                    // 获取指定攻略
                    WikiPost.view(this.$route.params.post_id)
                        .then((res) => {
                            res = res.data;
                            if (res.code === 200) {
                                this.wiki_post = res.data;
                                if (this.wiki_post.source)
                                    this.wiki_post.source.post = this.wiki_post.post;
                            }
                        })
                        .then(() => {
                            // 提交子统计
                            postStat(this.type, this.id);
                        });
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
