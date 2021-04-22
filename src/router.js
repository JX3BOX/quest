import Vue from "vue";
import VueRouter from "vue-router";

// ���������
const Home = () => import("./views/Home.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");
const Search = () => import("./views/Search.vue");

Vue.use(VueRouter);

const routes = [
    // ��ҳ
    { name: 'home', path: '/', component: Home },
    // �б�
    {name: 'normal', path: '/class/:class_id(\\d+)', component: Normal},
    // ��ҳ
    {name: 'view', path: '/view/:source_id(\\d+)/:post_id(\\d+)?', component: Detail},
    // ����
    {name: 'search', path: '/search/:keyword(.*)', component: Search},

    // Ĭ��ҳ�ض���
    {path: '*', redirect: 'home'}
];

export default new VueRouter({
    routes,
});
