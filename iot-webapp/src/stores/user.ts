import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('session', () => {
  const id = ref('')
  const isAdmin = computed(() => localStorage.getItem('is_admin') === '1')
  const userId = computed(() => id.value)

  function setAdmin(priv: boolean) {
    localStorage.setItem('is_admin', String(priv))
  }

  function setUserId(uid: string) {
    id.value = uid
  }

  return { isAdmin, setAdmin, userId, setUserId }
})
