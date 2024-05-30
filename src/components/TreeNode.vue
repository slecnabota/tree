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
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :expanded-ids="expandedIds"
          :level="level + 1"
          @toggle="$emit('toggle', $event)"
      />
    </ul>
  </li>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  node: Object,
  expandedIds: Array,
  level: Number,
});

const emit = defineEmits(['toggle']);

const isExpanded = computed(() => props.expandedIds.includes(props.node.id));
const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

const toggle = () => {
  emit('toggle', props.node.id);
};

const PADDING_INCREMENT = 20;
const paddingLeft = computed(() => props.level * PADDING_INCREMENT);

const backgroundColor = computed(() => {
  const colors = ['#dcdcdc', '#f0f0f0', '#ffffff'];
  return props.level === 0 ? colors[0] : colors[(props.level % 2) + 1];
});
</script>

<style lang="scss" scoped>
.tree-node {
  &__list {
    list-style-type: none;
    padding-left: 0;
  }

  &__item {
    .tree-node__title {
      padding: 5px;
      cursor: pointer;

      &--expandable {
        cursor: pointer;
      }

      .tree-node__arrow {
        display: inline-block;
        width: 1em;
        transition: transform 0.3s;

        &--expanded {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
