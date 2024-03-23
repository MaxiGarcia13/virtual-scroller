<template>
  <div ref="virtualScroller" @scroll="onScroll" class="virtual-scroller">
    <ObserveComponent @visible="onObserve('start')" class="observe-component" :style="{ top:`${distance}px` }"/>
    <div :style="wrapperStyles">
      <div :style="listStyles">
        <slot :itemsToShow="itemsToShow" />
      </div>
    </div>
    <ObserveComponent @visible="onObserve('end')" class="observe-component" :style="{ bottom:`${distance}px` }"/>
  </div>
</template>

<script lang="ts">
import { PropType, SetupContext, computed, defineComponent, onMounted, ref, watch } from 'vue';
import ObserveComponent from './observe.component.vue';
import { Element, VirtualScrollerConfig } from './types';

const OFFSET_VISIBLE_NODES = 5;

export default defineComponent({
  name: 'VirtualScroller',
  components: { ObserveComponent },
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
      default: 0
    }
  },
  emits: [
    /**
     * emit an event when the scroll is almost in the start
    */
    'almost-in-the-start',
    /**
     * emit an event when the scroll is almost in the end
    */
    'almost-in-the-end'
  ],
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

    const getConfig = (element: Element): VirtualScrollerConfig => {
      const startNode = Math.floor(element.scrollTop / props.rowHeight);
      const visibleNodes = Math.ceil(element.offsetHeight / props.rowHeight);

      return {
        startNode: Math.max(0, startNode),
        visibleNodes: visibleNodes + OFFSET_VISIBLE_NODES
      };
    };

    const updateConfig = (element?: Element): void => {
      if (element) {
        config.value = getConfig(element);
      }
    };

    const onScroll = (event: Event): void => {
      const element = event.target as Element;

      updateConfig(element);
    };

    const onObserve = (type: 'start' | 'end') => {
      emit(`almost-in-the-${type}`);
    };

    onMounted(() => {
      updateConfig(virtualScroller.value);
    });

    watch(() => props.items, () => updateConfig(virtualScroller.value));

    return {
      wrapperStyles,
      listStyles,
      virtualScroller,
      itemsToShow,
      onScroll,
      onObserve
    };
  }
});
</script>

<style scoped>
  .virtual-scroller {
    height: 100%;
    position: relative;
    overflow: auto;
  }

  .observe-component {
    position: relative;
  }
</style>
