import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const token = ref('')
  const getToken = computed(() => token.value)

  function setToken(new_token: string) {
    token.value = new_token
  }

  return { getToken, setToken }
})
