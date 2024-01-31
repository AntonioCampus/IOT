<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import AlertDataRow from '@/components/AlertDataRow.vue';
import openDeleteDetectorModal from '@/assets/js/openDeleteDetectorModal'
</script>

<template>
    <main>
        <section id="header">
            <SectionTitle title="test" />
            <div class="tools">
                <button class="danger" @click="openDeleteDetectorModal">
                    <font-awesome-icon :icon="['fas', 'trash']" /> Remove detector
                </button>
            </div>
            <div class="detector-info">
                <AlertDataRow :icon="['fas', 'robot']" label="ID" data="123vft5" />
                <AlertDataRow :icon="['fas', 'location-dot']" label="Coordinates" data=".." />
                <AlertDataRow :icon="['fas', 'clock-rotate-left']" label="Last activity" data=".." />
                <AlertDataRow :icon="['fas', 'camera']" label="Last result" data="No detection" />
                <AlertDataRow :icon="['fas', 'crow']" label="Detection rate" data="30%" />
                <AlertDataRow :icon="['fas', 'align-left']" label="Description"
                    data="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
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