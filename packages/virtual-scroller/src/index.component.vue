<template>
  <div ref="virtualScroller" @scroll="onScroll" :class="`${baseClass} scroll--y`">
    <div :style="wrapperStyles">
      <div :style="listStyles">
        <slot :itemsToShow="itemsToShow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType, onMounted, SetupContext } from 'vue';
import { VirtualScrollerConfig, Element } from './types';

const OFFSET_VISIBLE_NODES = 5;

export default defineComponent({
  name: 'VirtualScroller',
  props: {
    items: {
      type: Array as PropType<Array<unknown>>,
      required: true
    },
    rowHeight: {
      type: Number,
      default: 60
    },
    distance: {
      type: Number,
      default: undefined
    }
  },
  emits: ['almost-in-the-start', 'almost-in-the-end'],
  setup: function (props, { emit }: SetupContext) {
    const virtualScroller = ref<Element>();

    const config = ref<VirtualScrollerConfig>({
      startNode: 0,
      visibleNodes: 0
    });

    const wrapperStyles = computed(() => ({
      minHeight: `${props.items.length * props.rowHeight}px`
    }));

    const listStyles = computed(() => ({
      transform: `translateY(${config.value.startNode * props.rowHeight}px)`
    }));

    const itemsToShow = computed(() => {
      return props.items.slice(
        config.value.startNode,
        config.value.startNode + config.value.visibleNodes
      );
    });

    const handleEmits = (element: Element)=> {
      if(typeof props.distance === 'number') {
        if(config.value.startNode < props.distance) {
          emit('almost-in-the-start');
        }

        if(config.value.startNode * config.value.visibleNodes > element.scrollHeight - props.distance) {
          emit('almost-in-the-end');
        }
      }
    };

    const getConfig = (element: Element): VirtualScrollerConfig => {
      const startNode = Math.floor(element.scrollTop / props.rowHeight);
      const visibleNodes = Math.ceil(element.offsetHeight / props.rowHeight);

      return {
        startNode: Math.max(0, startNode),
        visibleNodes: visibleNodes + OFFSET_VISIBLE_NODES
      };
    };

    const updateConfig = (element?: Element): void => {
      if(element) {
        config.value = getConfig(element);
      }
    };

    const onScroll = (event: Event): void => {
      const element = event.target as Element;

      updateConfig(element);
      handleEmits(element);
    };

    onMounted(() => {
      updateConfig(virtualScroller.value);
    });

    watch(()=> props.items, () => updateConfig(virtualScroller.value));

    return {
      baseClass: 'virtual-scroller',
      wrapperStyles,
      listStyles,
      virtualScroller,
      itemsToShow,
      onScroll
    };
  }
});
</script>

<style scoped>
  .virtual-scroller {
    height: 100%;
    position: relative;
  }
</style>
