<template>
  <router-link class="m-quest-single" :to="{ name: 'view', params: { source_id: source.id } }">
    <div class="u-meta">
      <div v-if="!favEnable" class="u-id" v-text="`ID: ${source.id}`"></div>
      <Fav v-else post-type="quest" :post-id="source.id" />
    </div>
    <div class="m-name">
      <span class="u-name" v-text="source.Difficulty ? `【${source.Difficulty}】${source.Name}` : source.Name"></span>
      <span class="u-level" v-if="source.QuestLevel" v-text="` [ ${source.QuestLevel}级 ] `"></span>
      <span class="u-required" v-if="source.RequiredLevel" v-text="`需要${source.RequiredLevel}级`"></span>
      <span class="u-can" v-if="source.CanShare">可分享</span>
      <span class="u-can" v-if="source.CanRepeat">可重复完成</span>
      <span class="u-can" v-if="source.CanAssist">可协助完成</span>
    </div>
    <!-- <div class="u-objective" v-html="source.Objective"></div> -->
    <div class="m-complete">
      <div v-for="(item, key) in source.EndRequireItems" :key="key" v-text="`${item.Name}：0/${item.Amount}`"></div>
    </div>
    <div class="u-description">
      <div><i class="u-icon el-icon-star-on"></i>{{ desctxt }}</div>
    </div>
    <div class="m-start-end">
      <div class="u-start">
        <b>开始地图：</b>
        <span v-if="source.StartMapName" v-text="`${source.StartMapName}`"></span>
        <span v-if="source.StartNpcTemplateName" v-text="`- NPC（${source.StartNpcTemplateName}）`"></span>
        <span v-if="source.StartItemName" v-text="`- 物品（${source.StartItemName}）`"></span>
      </div>
      <div class="u-end">
        <b>结束地图：</b>
        <span v-if="source.EndMapName" v-text="`${source.EndMapName}`"></span>
        <span v-if="source.EndNpcTemplateName" v-text="`- NPC（${source.EndNpcTemplateName}）`"></span>
      </div>
    </div>
  </router-link>
</template>

<script>
import _ from 'lodash'
import { ts2str } from '@jx3box/jx3box-common/js/utils'
import Fav from '@jx3box/jx3box-common-ui/src/interact/Fav'

export default {
  name: 'SourceSingle',
  props: ['source', 'favEnable'],
  methods: {
    date_format: ts2str,
  },
  computed: {
    tags() {
      let tags = _.get(this, 'source.post.tags')
      return tags ? tags : null
    },
    updated() {
      let updated = _.get(this, 'source.post.updated')
      return updated ? updated : null
    },
    desctxt() {
      let a = this.source.Objective
      let txt = ''
      txt = a.replace(`<span style="margin-left:2em"></span>`, '')
      if (txt == '无效任务目标') {
        return '--'
      }
      return txt
    },
  },

  components: {
    Fav,
  },
}
</script>

<style lang="less">
@import '../assets/css/components/source-single.less';
</style>
