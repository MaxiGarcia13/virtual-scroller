<template>
  <div ref="observedComponent" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Element } from './types';

export default defineComponent({
  name: 'ObserveComponent',
  emits: ['visible'],
  setup: function (_, { emit }) {
    const observedComponent = ref<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.time > 1000) {
          emit('visible');
        }
      });
    });

    onMounted(() => {
      observer.observe(observedComponent.value as Element);
    });

    onUnmounted(() => observer.disconnect());

    return {
      baseClass: 'virtual-scroller',
      observedComponent,
    };
  }
});
</script>
