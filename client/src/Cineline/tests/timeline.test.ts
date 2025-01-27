import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Timeline from '../components/Timeline.vue';

describe('Timeline', () => {
  it('should update yearGuess on mousemove', async () => {
    const wrapper = mount(Timeline, {
      props: {
        correctYear: 2023,
        currentRound: 1,
      },
    });

    const timeline = wrapper.find('.timeline');
    const mousemoveEvent = new MouseEvent('mousemove', { clientX: 100 });

    timeline.element.dispatchEvent(mousemoveEvent);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.yearGuess).toBeGreaterThanOrEqual(1900);
    expect(wrapper.vm.yearGuess).toBeLessThanOrEqual(2025);
  });

  it('should lock yearGuess and show difference on click', async () => {
    const wrapper = mount(Timeline, {
        props: {
          correctYear: 2023,
          currentRound: 1,
        },
      });

    const timeline = wrapper.find('.timeline');
    const clickEvent = new MouseEvent('click');
    timeline.element.dispatchEvent(clickEvent);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isLocked).toBe(true);
    expect(wrapper.vm.showDifference).toBe(true);
  });

});