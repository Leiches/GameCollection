import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const firstName = ref('Patrick')
  const lastName = ref('Niebrzydowski')
  const fullName = computed(() => `${firstName.value} ${lastName.value}`)

  return {
    firstName,
    lastName,
    fullName,
  }
})
