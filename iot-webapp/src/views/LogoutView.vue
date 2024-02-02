<script setup lang="ts">
import { removeToken } from '@/assets/js/token';
import router from '@/router';
import { onMounted } from 'vue';
import doLogout from '@/assets/api/doLogout';

onMounted(async () => {
    const response = await doLogout();
    if (response) {
        removeToken();
        router.push({ path: '/' });
    }
});
</script>