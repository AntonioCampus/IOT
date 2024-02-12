<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import AlertDataRow from '@/components/AlertDataRow.vue';
import openDeleteDetectorModal from '@/assets/js/openDeleteDetectorModal'
import { useUserStore } from '@/stores/user';
import getDetectors from '@/assets/api/getDetectors';
import getDashboard from '@/assets/api/getDashboard';
import getZones from '@/assets/api/getZones';
import Loader from '@/components/Loader.vue';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import router from '@/router';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const detector = ref([]);
const loading = ref(true);
const last_activity = ref('');
const last_result = ref('');
const detection_rate = ref('');
const zone = ref([]);

function getZoneById(zones: [], id: string) {
    return zones.find((zone) => zone[0] === id);
}

function getDetectorById(detectors: [], id: string) {
    return detectors.find((detector) => detector[0] == id);
}

function getLastActivity(alerts: [], id: string) {
    //get only the alerts from the detector with the given id
    const detector_alerts = alerts.filter((alert) => alert[2] == id);
    // order by alert[4] (date)
    detector_alerts.sort((a, b) => new Date(b[4]).getTime() - new Date(a[4]).getTime());
    if (detector_alerts.length > 0) {
        return detector_alerts[0];
    }
    return t('system.no_activity');
}

function getLastDetection(alerts: [], id: string) {
    //get only the alerts from the detector with the given id
    const detector_alerts = alerts.filter((alert) => alert[2] == id);
    // order by alert[4] (date)
    detector_alerts.sort((a, b) => new Date(b[4]).getTime() - new Date(a[4]).getTime());

    // get the first alert with status 1
    for (let i = 0; i < detector_alerts.length; i++) {
        if (detector_alerts[i][3] == 1) {
            return detector_alerts[i];
        }
    }
    return t('system.no_detection');
}

function getDetectionRate(alerts: [], id: string) {
    //get only the alerts from the detector with the given id
    const detector_alerts = alerts.filter((alert) => alert[2] == id);
    const total = detector_alerts.length;
    if (total == 0) {
        return t('system.no_detection');
    }
    const detected = detector_alerts.filter((alert) => alert[3] == 1).length;
    return (detected / total * 100).toFixed(2) + '%';
}


onMounted(async () => {
    const detectors = await getDetectors();
    if (detectors != null) {
        detector.value = getDetectorById(detectors, router.currentRoute.value.params.id as string);
        const alerts = await getDashboard();
        if (alerts != null) {
            last_activity.value = getLastActivity(alerts, router.currentRoute.value.params.id as string);
            last_result.value = getLastDetection(alerts, router.currentRoute.value.params.id as string);
            detection_rate.value = getDetectionRate(alerts, router.currentRoute.value.params.id as string);

            const zones = await getZones();
            if (zones != null) {
                zone.value = getZoneById(zones, detector.value[3]);
                loading.value = false;
            }
        }
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
            <SectionTitle :title="detector[1]" />
            <div class="tools" v-if="useUserStore().isAdmin">
                <button class="danger" @click="openDeleteDetectorModal(router.currentRoute.value.params.id as string)">
                    <font-awesome-icon :icon="['fas', 'trash']" /> {{ t('system.remove_detector') }}
                </button>
            </div>
            <div class="detector-info">
                <AlertDataRow :icon="['fas', 'robot']" label="ID" :data="detector[0]" />
                <AlertDataRow :icon="['fas', 'location-dot']" :label="t('common.zone')"
                    :data="zone[1] + ' (ID: ' + zone[0] + ')'" />
                <AlertDataRow :icon="['fas', 'clock-rotate-left']" :label="t('system.last_activity')"
                    :data="last_activity[4]" />
                <AlertDataRow :icon="['fas', 'camera']" :label="t('system.last_result')" :data="last_result[4]" />
                <AlertDataRow :icon="['fas', 'crow']" :label="t('system.detection_rate')" :data="detection_rate" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.detector-info {
    display: flex;
    flex-direction: column;
    padding: 4rem;
    background-color: var(--white);
    box-shadow: 0 0 1rem var(--black);
    margin: 1rem;
    border-radius: 0.5rem;
    width: 60vw;
}

.tools {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
}
</style>