import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewportComponent from '@/Crazychicken/components/ViewportComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';

describe('ViewportComponent - Screen Size Recognition', () => {
  let wrapper: any;
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  beforeEach(() => {

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 500,
      height: 1000,
    });

    wrapper = mount(ViewportComponent, {
      global: {
        plugins: [router],
      },
      attachTo: document.body,
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  it('should show the vertical warning when width < height', async () => {

    await wrapper.vm.$nextTick();

    const warning = wrapper.find('#vertical-warning');
    expect(warning.exists()).toBe(true);
    expect(warning.text()).toContain('This game works better in horizontal model');
  });

  it('should not show the vertical warning when width >= height', async () => {

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 500,
    });

    wrapper = mount(ViewportComponent, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();

    const warning = wrapper.find('#vertical-warning');
    expect(warning.exists()).toBe(false);
  });
});
