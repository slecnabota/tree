import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface TreeNode {
    id: number;
    title: string;
    parent_id: number | null;
    children: TreeNode[];
}

const useTreeView = () => {
    const data = ref<TreeNode[]>([]);
    const expandedIds = ref<number[]>(JSON.parse(localStorage.getItem('expandedIds') || '[]'));
    const openNodes = ref<Record<number, boolean>>({});

    const ROOT_PARENT_ID = null;
    const API_URL = 'https://64b4c8450efb99d862694609.mockapi.io/tree/items';

    const rootNodes = computed(() => data.value.filter(item => item.parent_id === ROOT_PARENT_ID));

    const organizeData = (data: TreeNode[]) => {
        const map = new Map<number, TreeNode>(data.map(item => [item.id, { ...item, children: [] }]));
        data.forEach(item => {
            if (item.parent_id !== null && map.has(item.parent_id)) {
                map.get(item.parent_id)!.children.push(map.get(item.id)!);
            }
        });
        return Array.from(map.values()).filter(item => item.parent_id === null);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            data.value = organizeData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleNode = (id: number) => {
        const index = expandedIds.value.indexOf(id);
        if (index !== -1) {
            expandedIds.value.splice(index, 1);
            delete openNodes.value[id];
        } else {
            expandedIds.value.push(id);
            openNodes.value[id] = true;
        }
        localStorage.setItem('expandedIds', JSON.stringify(expandedIds.value));
    };

    onMounted(fetchData);

    return {
        data,
        expandedIds,
        openNodes,
        rootNodes,
        fetchData,
        toggleNode,
    };
};

export default useTreeView;
export type { TreeNode };
