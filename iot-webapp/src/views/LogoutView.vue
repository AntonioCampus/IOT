<script setup lang="ts">
import { removeToken } from '@/assets/js/token';
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
    removeToken();
    router.push({ path: '/' });
});
</script>