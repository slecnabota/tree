<template>
  <div class="tree-view">
    <button class="tree-view__button" @click="fetchData">Refresh Tree</button>
    <ul class="tree-view__content">
      <TreeNode
          v-for="node in rootNodes"
          :key="node.id"
          :node="node"
          :expanded-ids="expandedIds"
          :level="0"
          @toggle="toggleNode"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import TreeNode from './TreeNode.vue';

const data = ref([]);
const expandedIds = ref([]);

const ROOT_PARENT_ID = null;
const API_URL = 'https://64b4c8450efb99d862694609.mockapi.io/tree/items';

const rootNodes = computed(() => data.value.filter(item => item.parent_id === ROOT_PARENT_ID));

const organizeData = (data) => {
  const map = new Map(data.map(item => [item.id, { ...item, children: [] }]));
  data.forEach(item => {
    if (item.parent_id && map.has(item.parent_id)) {
      map.get(item.parent_id).children.push(map.get(item.id));
    }
  });
  return Array.from(map.values()).filter(item => !item.parent_id);
};

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    data.value = organizeData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const toggleNode = (id) => {
  const index = expandedIds.value.indexOf(id);
  if (index !== -1) {
    expandedIds.value.splice(index, 1);
  } else {
    expandedIds.value.push(id);
  }
};

onMounted(fetchData);
</script>

<style lang="scss" scoped>
.tree-view {
  &__button {
    margin-bottom: 10px;
    background: transparent;
    padding: 10px 30px;
    border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    transition: border .3s;

    &:hover {
      border-color: gray;
    }
  }

  &__content {
    list-style-type: none;
  }
}
</style>
