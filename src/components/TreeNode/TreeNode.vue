<template>
  <li class="tree-node__item">
    <div
        @click="toggle"
        :class="['tree-node__title', { 'tree-node__title--expandable': hasChildren }]"
        :style="{ paddingLeft: paddingLeft + 'px', backgroundColor }"
    >
      <span v-if="hasChildren" class="tree-node__arrow" :class="{ 'tree-node__arrow--expanded': isExpanded }">&#9658;</span>
      <span v-else class="tree-node__arrow">-</span>
      {{ node.title }}
    </div>
    <ul v-if="isExpanded" class="tree-node__list">
      <TreeNode
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :expanded-ids="expandedIds"
          :level="level + 1"
          :color-index="(colorIndex + index + 1) % 2"
          @toggle="$emit('toggle', $event)"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { useTreeNode } from '@/composables/useTreeNode';

const props = defineProps({
  node: Object,
  expandedIds: Array,
  level: Number,
  colorIndex: Number,
});

const emit = defineEmits(['toggle']);

const { isExpanded, hasChildren, toggle, paddingLeft, backgroundColor } = useTreeNode(props, emit);
</script>

<style lang="scss" scoped>
@import "styles";
</style>
