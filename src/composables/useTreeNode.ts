import { computed } from 'vue';

export function useTreeNode(props, emit) {
    const isExpanded = computed(() => props.expandedIds.includes(props.node.id));
    const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

    const toggle = () => {
        emit('toggle', props.node.id);
    };

    const PADDING_INCREMENT = 20;
    const paddingLeft = computed(() => props.level * PADDING_INCREMENT);

    const backgroundColor = computed(() => {
        const colors = ['#dcdcdc', '#ffffff'];
        return colors[props.colorIndex];
    });

    return {
        isExpanded,
        hasChildren,
        toggle,
        paddingLeft,
        backgroundColor
    };
}
