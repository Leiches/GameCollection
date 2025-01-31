import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import GameBoard from '../components/GameBoard.vue'
import { Suspense } from 'vue'

vi.mock('axios')

describe('GameBoard with Suspense', () => {
  beforeEach(() => {
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: [
        { question: 'Q1', answer: 'HALLO' },
        { question: 'Q2', answer: 'TESTING' },
        { question: 'Q3', answer: 'ALTERNATIVE' },
        { question: 'Q4', answer: 'TEST' }
      ]
    })
  })

  it('renders a 15x15 grid', async () => {
    // Wrap GameBoard in a Suspense boundary
    const wrapper = mount(
      {
        components: { GameBoard, Suspense },
        template: `
          <Suspense>
            <GameBoard />
          </Suspense>
        `,
      },
      {
        global: {
          // If you don't want to deal with real Suspense fallback, you can stub it:
          stubs: {
            // turning off or on might help, try each approach
            Suspense: false
          }
        }
      }
    )

    // flush any pending Promises
    await flushPromises()

    // Now the component should be rendered
    const rows = wrapper.findAll('.row')
    expect(rows.length).toBe(15)
  })
})
