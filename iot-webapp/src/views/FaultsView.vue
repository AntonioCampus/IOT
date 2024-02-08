<script setup lang="ts">
import FaultCard from "@/components/FaultCard.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import getDashboard from "@/assets/api/getDashboard";
import { onMounted, ref } from "vue";
import Loader from "@/components/Loader.vue";
import Config from "@/config";
import Swal from "sweetalert2";
import router from "@/router";

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref(true);
const faulty_devices = ref([]);

function getFaulty(iterable: any) {
    /**
     * A device is faulty when it has not sent a detection in the last hour
     */
    return iterable.filter((detection: any) => {
        const lastDetection = new Date(detection[4]);
        const now = new Date();
        return (now.getTime() - lastDetection.getTime()) > Config.MAX_TIME_BEFORE_FAULT;
    });
}

function getUniqueDevices(iterable: any) {
    return new Set(iterable.map((detection: any) => detection[1]));
}

onMounted(async () => {
    const response = await getDashboard();
    if (response != null) {
        faulty_devices.value = getUniqueDevices(getFaulty(response));
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
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="header">
            <SectionTitle :title="t('faults.title')" />
        </section>
        <section id="faults">
            <div class="faults-list">
                <FaultCard v-for="faulty in faulty_devices" :id="faulty" />
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    flex-direction: column;
}

.faults-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    width: 90vw;
    min-height: 50vh;
    max-height: 70vh;
}
</style>