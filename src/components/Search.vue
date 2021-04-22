<template>
    <div
        class="m-search-bar"
        :class="$route.name == 'view' ? 'can-return' : ''"
    >
        <div class="m-return">
            <el-button class="u-return-btn" @click="return_handle"
                >返回
            </el-button>
        </div>
        <div class="m-search">
            <el-input
                class="u-search-input"
                v-model="keyword"
                @keydown.enter.native="search_handle"
                placeholder="输入任务名称（可适配中括号形式）「回车」进行搜索"
            >
                <span slot="prepend">关键词</span>
            </el-input>
            <el-button
                class="u-search-btn"
                type="primary"
                plain
                @click="search_handle"
                >搜索
            </el-button>
        </div>
        <!-- <div class="m-add">
            <el-button
                class="u-add-btn"
                @click="add_handle"
                type="primary"
                icon="el-icon-plus"
                >参加修订</el-button
            >
        </div> -->
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "Search",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        publish_url: publishLink,
        return_handle() {
            history.back();
        },
        add_handle() {
            location.href = this.publish_url("quest");
        },
        search_handle() {
            this.$router.push({
                name: "search",
                params: { keyword: this.keyword },
            });
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/search.less";
</style>
