import { StoryFn, Meta } from '@storybook/vue3';
import VirtualScroller from './index.component.vue';
import { ref } from 'vue';

const mapFakeItems = (_:unknown, index:number) => {
  return {
    id: `item-id-${index + 1}`
  };
};

const generateFakeItems = (num: number): Array<{ id: string }> =>
  new Array(num).fill('').map(mapFakeItems);

export default {
  title: 'virtual-scroller',
  component: VirtualScroller,
  args: {
    rowHeight: 60,
    items: generateFakeItems(1000),
    distance: 0
  }
} as Meta<typeof VirtualScroller>;

const Template: StoryFn<typeof VirtualScroller> = (_, { allArgs, loaded }) => {
  return ({
    components: { VirtualScroller },
    setup: () => {
      const items = ref(allArgs.items);

      const getMoreItems = () => {
        items.value = [
          ...items.value,
          ...loaded.getMoreItems()
        ].map(mapFakeItems);
      };

      return ({ props: allArgs, items, getMoreItems });
    },
    template: `
      <VirtualScroller
        @almostInTheEnd="getMoreItems"
        v-bind="props"
        :items="items"
        style="height: 600px; padding: 16px"
      >
        <template v-slot="{ itemsToShow }">
          <b style="position: absolute; top: 0; right: 0;">
            Rendered items {{itemsToShow.length}} of {{ props.items.length }}
          </b>
          <ul>
            <li v-for="item in itemsToShow" :key="item.id" style="height: 60px;">
              {{ item.id }}
            </li>
          <ul>
        </template>
      </VirtualScroller>
    `
  });
};

export const Vue3VirtualScroller = Template.bind({});

export const Vue3InfinityVirtualScroller = Template.bind({});

const items = generateFakeItems(24);

Vue3InfinityVirtualScroller.args = {
  rowHeight: 60,
  items,
  distance: 300
};

Vue3InfinityVirtualScroller.loaders = [
  () => ({
    getMoreItems: () => generateFakeItems(24),
  })
];
