<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import AlertListCard from "@/components/AlertListCard.vue";
import Loader from '@/components/Loader.vue';
import { ref, onMounted } from "vue";

const loading = ref(true);
const detections_list = ref([]);

onMounted(async () => {
    const response = await fetch("https://65b2b4d29bfb12f6eafe4e4f.mockapi.io/detections");
    if (response.ok) {
        detections_list.value = await response.json();
        loading.value = false;
    }
});
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section>
            <SectionTitle title="All alerts" />
            <div class="alerts-list">
                <AlertListCard v-for="detection in detections_list" :id="detection['id']" :date="detection['time']"
                    :name="detection['name']" :status="detection['status']" :detector="detection['detector']" />
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