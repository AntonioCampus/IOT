<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import DetectorCard from '@/components/DetectorCard.vue';
import ActuatorCard from '@/components/ActuatorCard.vue';
import ZoneCard from '@/components/ZoneCard.vue';
import NoResultCard from '@/components/NoResultCard.vue';
import EmptyDetectorCard from '@/components/EmptyDetectorCard.vue';
import EmptyActuatorCard from '@/components/EmptyActuatorCard.vue';
import EmptyZoneCard from '@/components/EmptyZoneCard.vue';
import openAddActuatorModal from '@/assets/js/openAddActuatorModal';
import openAddDetectorModal from '@/assets/js/openAddDetectorModal';
import openAddZoneModal from '@/assets/js/openAddZoneModal';
import { onMounted, ref } from 'vue';
import getZones from '@/assets/api/getZones';
import { useUserStore } from '@/stores/user';
import getDetectors from '@/assets/api/getDetectors';
import Loader from '@/components/Loader.vue';
import getActuators from '@/assets/api/getActuators';
import Swal from 'sweetalert2';
import router from '@/router';

// @ts-ignore
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const zones = ref([]);
const is_admin = ref(useUserStore().isAdmin);
const detectors = ref([]);
const actuators = ref([]);
const loading = ref(true);

onMounted(async () => {
    zones.value = await getZones();
    if (zones.value != null) {
        detectors.value = await getDetectors();
        if (detectors.value != null) {
            actuators.value = await getActuators();
            if (actuators.value != null) {
                loading.value = false;
            }
        }
    }

    if (loading.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t("errors.fetch_data"),
        }).then(() => {
            router.push({ path: '/' });
        });
    }
});
</script>

<template>
    <Loader v-if="loading" />
    <main v-else>
        <section id="detectors">
            <SectionTitle :title="t('system.detectors')" />
            <NoResultCard v-if="detectors.length == 0" :label="t('system.no_detectors')" />
            <div class="components-list">
                <DetectorCard v-for="detector in detectors" :id="detector[0]" :name="detector[1]" />
                <EmptyDetectorCard @click="openAddDetectorModal" v-if="is_admin" :enabled="zones.length > 0" />
            </div>
        </section>
        <section id="actuators">
            <SectionTitle :title="t('system.actuators')" />
            <NoResultCard v-if="actuators.length == 0" :label="t('system.no_actuators')" />
            <div class="components-list">
                <ActuatorCard v-for="actuator in actuators" :id="actuator[0]" :name="actuator[1]" />
                <EmptyActuatorCard @click="openAddActuatorModal" v-if="is_admin" :enabled="zones.length > 0" />
            </div>
        </section>
        <section id="actuators">
            <SectionTitle :title="t('system.zones')" />
            <NoResultCard v-if="zones.length == 0" :label="t('system.no_zones')" />
            <div class="components-list">
                <ZoneCard v-for="zone in zones" :id="zone[0]" :description="zone[1]" />
                <EmptyZoneCard @click="openAddZoneModal" v-if="is_admin" />
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}

.components-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    min-height: 30vh;
    max-height: 50vh;
    overflow-y: scroll;
    margin-top: 2rem;
    min-width: 80vw;
}
</style>