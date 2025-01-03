import { mount } from '@vue/test-utils'
import App from '@/App.vue'

test('should render the appropriate heading', () => {
  const wrapper = mount(App)
  expect(wrapper.get('h1').text()).toEqual('Sudoku')
})
