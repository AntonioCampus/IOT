<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import AlertListCard from "@/components/AlertListCard.vue";
import Loader from '@/components/Loader.vue';
import { ref, onMounted, watch } from "vue";
import getDashboard from "@/assets/api/getDashboard";
import router from "@/router";
import Swal from "sweetalert2";
import NoResultCard from "@/components/NoResultCard.vue";

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref(true);
const detections_list = ref([]);
const only_checked = ref(false);

onMounted(async () => {
    const response = await getDashboard();
    if (response != null) {
        detections_list.value = response;
        loading.value = false;
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t('errors.fetch_data'),
        }).then(() => {
            router.push({ path: '/' });
        });
    }
});

watch(only_checked, async (value) => {
    if (value) {
        detections_list.value = detections_list.value.filter((detection) => detection[3] == 1);
    } else {
        const response = await getDashboard();
        if (response != null) {
            detections_list.value = response;
        }
    }
});
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section>
            <SectionTitle :title="t('all_alerts.title')" />
            <div class="filters">
                <input v-model="only_checked" type="checkbox" id="status" value="status" />
                <label for="status">{{ t('all_alerts.filter_lbl') }}</label>
            </div>
            <div class="alerts-list">
                <NoResultCard v-if="detections_list.length == 0" :label="t('all_alerts.no_alerts')" />
                <div v-else>
                    <AlertListCard v-for="detection in detections_list" :id="detection[0]" :date="detection[4]"
                        :zone="detection[1]" :status="detection[3]" :detector="detection[2]" />
                </div>
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

.filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    background-color: var(--white);
    margin: 1rem;
    color: var(--black);
}
</style>