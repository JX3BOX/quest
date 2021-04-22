<template>
  <div class="m-info">
    <div class="u-stat">
      <span><em>收录任务数</em><b v-text="count.total"></b></span>
      <span><em>收录文章数</em><b v-text="count.posts_total"></b></span>
    </div>
  </div>
</template>

<script>
  import {get_count} from '../service/quest';

  export default {
    name: "BreadcrumbInfo",
    data: function () {
      return {
        count: {},
      };
    },
    created() {
      // 获取任务统计信息
      get_count().then(
          (data) => {
            data = data.data;
            if (data.code === 200) this.count = data.data;
          }
      );
    }
  };
</script>

<style lang="less">
  @import './../assets/css/components/info.less';
</style>
