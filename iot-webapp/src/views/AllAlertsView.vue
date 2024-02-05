<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import AlertListCard from "@/components/AlertListCard.vue";
import Loader from '@/components/Loader.vue';
import { ref, onMounted } from "vue";
import getDashboard from "@/assets/api/getDashboard";
import router from "@/router";

const loading = ref(true);
const detections_list = ref([]);

onMounted(async () => {
    const response = await getDashboard();
    if (response != null) {
        detections_list.value = response;
        loading.value = false;
    } else router.push({ name: 'login' });
});
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section>
            <SectionTitle title="All alerts" />
            <div class="alerts-list">
                <AlertListCard v-for="detection in detections_list" :id="detection[0]" :date="detection[3]"
                    :name="detection[0]" :status="detection[2]" :detector="detection[1]" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.alerts-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    min-height: 30vh;
    max-height: 100vh;
    overflow-y: scroll;
    margin-top: 2rem;
    width: 50rem;
    margin: 1rem;
}
</style>