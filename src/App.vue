<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="任务百科"
            slug="quest"
            root="/quest"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('quest')" />
            <BreadcrumbInfo />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <!-- 路由页面内容 -->
            <router-view />
            <!-- 右侧咨询 -->
            <!-- <RightSidebar> -->
            <!-- </RightSidebar> -->
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import BreadcrumbInfo from "./components/BreadcrumbInfo.vue";
import { getRewrite, getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    components: {
        Nav,
        BreadcrumbInfo,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                if (typeof this.$route.params.class_id === "undefined") {
                    this.$store.state.sidebar.class_id = null;
                } else {
                    this.$store.state.sidebar.class_id = this.$route.params
                        .class_id
                        ? this.$route.params.class_id
                        : 0;
                }
            },
        },
    },
    methods : {
        getAppIcon
    }
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
