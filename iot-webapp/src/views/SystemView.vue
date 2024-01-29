<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import DetectorCard from '@/components/DetectorCard.vue';
import ActuatorCard from '@/components/ActuatorCard.vue';
import EmptyDetectorCard from '@/components/EmptyDetectorCard.vue';
import EmptyActuatorCard from '@/components/EmptyActuatorCard.vue';
import openAddActuatorModal from '@/assets/js/openAddActuatorModal';
import openAddDetectorModal from '@/assets/js/openAddDetectorModal';
</script>

<template>
    <main>
        <section id="detectors">
            <SectionTitle title="Detectors" />
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
            <div class="components-list">
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <ActuatorCard />
                <EmptyActuatorCard @click="openAddActuatorModal" />
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
}
</style>