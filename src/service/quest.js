import { $ as $http, axios } from "./axios";

const { __helperUrl } = require("@jx3box/jx3box-common/data/jx3box.json");
const qs = require("qs");

function get_menus(params) {
    return $http.get(`${__helperUrl}api/quest/menus`, {
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function get_menu_list(params) {
    return $http.get(`${__helperUrl}api/quest/menu_list`, {
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function get_list(params) {
    return $http.get(`${__helperUrl}api/quests`, {
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function get_count() {
    return $http.get(`${__helperUrl}api/quests/count`, {
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { get_menus, get_menu_list, get_list, get_count };
