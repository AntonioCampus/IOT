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

const zones = ref([]);

onMounted(async () => {
    zones.value = await getZones();
});
</script>

<template>
    <main>
        <section id="detectors">
            <SectionTitle title="Detectors" />
            <NoResultCard v-if="false" label="No detectors found" />
            <div class="components-list">
                <DetectorCard />
                <DetectorCard />
                <DetectorCard />
                <DetectorCard />
                <DetectorCard />
                <DetectorCard />
                <EmptyDetectorCard @click="openAddDetectorModal" />
            </div>
        </section>
        <section id="actuators">
            <SectionTitle title="Actuators" />
            <NoResultCard v-if="false" label="No actuators found" />
            <div class="components-list" v-else>
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <EmptyActuatorCard @click="openAddActuatorModal" />
            </div>
        </section>
        <section id="actuators">
            <SectionTitle title="Zones" />
            <NoResultCard v-if="zones.length == 0" label="No zones found" />
            <div class="components-list" v-else>
                <ZoneCard v-for="zone in zones" :id="zone[0]" :description="zone[1]" />
                <EmptyZoneCard @click="openAddZoneModal" />
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