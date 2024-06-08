<template>
  <div class="tree-view">
    <button class="tree-view__button" @click="fetchData">Refresh Tree</button>
    <ul class="tree-view__content">
      <TreeNode
          v-for="(node, index) in rootNodes"
          :key="node.id"
          :node="node"
          :expanded-ids="expandedIds"
          :open-nodes="openNodes"
          :level="0"
          :color-index="index % 2"
          @toggle="toggleNode"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import useTreeView from '@/composables/useTreeView';
import TreeNode from '../TreeNode/TreeNode.vue';

const {
  expandedIds,
  openNodes,
  rootNodes,
  fetchData,
  toggleNode,
} = useTreeView();
</script>

<style lang="scss" scoped>
@import 'styles';
</style>
