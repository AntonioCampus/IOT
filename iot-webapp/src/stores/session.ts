import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const token = ref('')
  const getToken = computed(() => localStorage.getItem('user_token'))

  function setToken(new_token: string) {
    localStorage.setItem('user_token', new_token)
  }

  return { getToken, setToken }
})
