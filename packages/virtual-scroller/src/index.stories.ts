import { StoryFn, Meta } from '@storybook/vue3';
import VirtualScroller from './index.component.vue';

const generateFakeItems = (num: number): Array<{ id: string }> =>
  new Array(num).fill('').map((_, i) => {
    return {
      id: `item-id-${i + 1}`
    };
  });

export default {
  title: 'virtual-scroller',
  component: VirtualScroller,
  args: {
    rowHeight: 60,
    items: generateFakeItems(1000)
  }
} as Meta<typeof VirtualScroller>;

const Template: StoryFn<typeof VirtualScroller> = (_, { allArgs }) => {
    return ({
    components: { VirtualScroller },
    setup: ()=> ({ props: allArgs }),
    template: `
      <VirtualScroller v-bind="props" style="padding: 16px">
        <template v-slot="{ itemsToShow }">
          <b style="position: absolute; top: 0; right: 0;">
            Rendered items {{itemsToShow.length}} of {{ props.items.length }}
          </b>

          <ul>
            <li v-for="item in itemsToShow" :key="item.id" style="height: 60px;">
              {{ item.id }}
            </li>
          </ul>
        </template>
      </VirtualScroller>
    `
  });
};

export const Vue3VirtualScroller = Template.bind({});
