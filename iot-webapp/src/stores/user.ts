import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('session', () => {
  const isAdmin = computed(() => localStorage.getItem('is_admin') === '1')
  const userId = computed(() => localStorage.getItem('user_id'))

  function setAdmin(priv: boolean) {
    localStorage.setItem('is_admin', String(priv))
  }

  function setUserId(uid: string) {
    localStorage.setItem('user_id', String(uid))
  }

  return { isAdmin, setAdmin, userId, setUserId }
})
