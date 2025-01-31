import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Crossword from '../components/GameBoard.vue' // Adjust path if different

describe('Crossword Component', () => {
  let wrapper : ReturnType<typeof mount>;

  beforeEach(() => {
    // mount a fresh instance before each test
    wrapper = mount(Crossword)
  })

  it('renders a 15x15 grid', () => {
    const rows = wrapper.findAll('.row')
    expect(rows.length).toBe(15)

    // check the first row’s cells
    const cells = rows[0].findAll('.cell')
    expect(cells.length).toBe(15)
  })

})
